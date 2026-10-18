require('dotenv').config();

const fs = require('fs');
const path = require('path');
const {
  Before,
  After,
  BeforeAll,
  AfterAll
} = require('@cucumber/cucumber');

const { chromium, firefox, webkit } = require('playwright');
const logger = require('../utils/logger');

const browserTypes = { chromium, firefox, webkit };

const logsDir = path.resolve('logs');
const videosDir = path.join(logsDir, 'videos');
const tracesDir = path.join(logsDir, 'traces');
const screenshotsDir = path.join(logsDir, 'screenshots');

[logsDir, videosDir, tracesDir, screenshotsDir].forEach(dir => {
  fs.mkdirSync(dir, { recursive: true });
});

const videoEnabled = process.env.VIDEO === 'true';
const traceEnabled = process.env.TRACE === 'true';

let browser;

BeforeAll(async function () {
  const browserType = process.env.BROWSER || 'chromium';

  if (!browserTypes[browserType]) {
    throw new Error(`Unsupported browser: ${browserType}`);
  }

  browser = await browserTypes[browserType].launch({
    headless: process.env.HEADLESS !== 'false',
    slowMo: Number(process.env.SLOW_MO) || 0
  });

  logger.info(`Browser launched: ${browserType}`);
});

Before(async function (scenario) {
  logger.info(`Scenario Started: ${scenario.pickle.name}`);

  this.browser = browser;

  const authPath = path.resolve('auth/auth.json');

  const contextOptions = {
    viewport: null,
    ...(fs.existsSync(authPath)
      ? { storageState: authPath }
      : {})
  };

  if (videoEnabled) {
    contextOptions.recordVideo = {
      dir: videosDir,
      size: { width: 1280, height: 720 }
    };
  }

  this.context = await browser.newContext(contextOptions);
  this.page = await this.context.newPage();

  if (traceEnabled) {
    await this.context.tracing.start({
      screenshots: true,
      snapshots: true,
      sources: true
    });
  }
});

After(async function (scenario) {
  const failed = scenario.result?.status === 'FAILED';
  const safeName = scenario.pickle.name
    .replace(/[^a-z0-9-_]/gi, '_')
    .slice(0, 80);

  const uniqueId = `${Date.now()}-${process.pid}`;
  const screenshotPath = path.join(
    screenshotsDir,
    `${uniqueId}-${safeName}.png`
  );
  const tracePath = path.join(
    tracesDir,
    `${uniqueId}-${safeName}.zip`
  );
  const videoPath = path.join(
    videosDir,
    `${uniqueId}-${safeName}.webm`
  );

  try {
    if (failed && this.page) {
      logger.error(`Scenario FAILED: ${scenario.pickle.name}`);

      await this.page.screenshot({
        path: screenshotPath,
        fullPage: true
      });

      if (typeof this.attach === 'function') {
        await this.attach(fs.readFileSync(screenshotPath), 'image/png');
      }
    }

    if (traceEnabled && this.context) {
      await this.context.tracing.stop({
        path: tracePath
      });

      if (failed && typeof this.attach === 'function') {
        await this.attach(
          fs.readFileSync(tracePath),
          'application/zip'
        );
      }
    }
  } catch (error) {
    logger.error(`Artifact capture failed: ${error.message}`);
  } finally {
    try {
      await this.page?.close();
      await this.context?.close();

      if (videoEnabled && this.page) {
        const video = this.page.video();

        if (video) {
          await video.saveAs(videoPath);

          if (failed && typeof this.attach === 'function') {
            await this.attach(
              fs.readFileSync(videoPath),
              'video/webm'
            );
          }
        }
      }
    } catch (error) {
      logger.error(`Artifact finalization failed: ${error.message}`);
    }

    logger.info(`Scenario Finished: ${scenario.pickle.name}`);
  }
});

AfterAll(async function () {
  await browser?.close();
  logger.info('Browser closed');
});