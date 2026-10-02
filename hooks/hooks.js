require('dotenv').config();

const {
  Before,
  After,
  BeforeAll,
  AfterAll
} = require('@cucumber/cucumber');

const {
  chromium,
  firefox,
  webkit
} = require('playwright');

const logger = require('../utils/logger');

let browser;

const SLOW_MO = Number(process.env.SLOW_MO) || 0;

BeforeAll(async function () {

  const browserType = process.env.BROWSER || 'chromium';

  const browsers = {
    chromium,
    firefox,
    webkit
  };

  if (!browsers[browserType]) {
    throw new Error(
      `Unsupported browser: ${browserType}. Use chromium, firefox or webkit.`
    );
  }

  browser = await browsers[browserType].launch({
    headless: process.env.HEADLESS !== 'false',
    slowMo: SLOW_MO
  });

  logger.info(`Browser launched: ${browserType}`);
});

Before(async function (scenario) {

  logger.info(`Scenario Started: ${scenario.pickle.name}`);

  this.browser = browser;

  this.context = await browser.newContext({
    viewport: null
  });

  this.page = await this.context.newPage();
});

After(async function (scenario) {

  if (scenario.result?.status === 'FAILED') {
    logger.error(`Scenario FAILED: ${scenario.pickle.name}`);

    if (this.page) {
      await this.page.screenshot({
        path: `logs/${Date.now()}-failure.png`,
        fullPage: true
      });
    }
  }

  if (this.page) {
    await this.page.close();
  }

  if (this.context) {
    await this.context.close();
  }

  logger.info(`Scenario Finished: ${scenario.pickle.name}`);
});

AfterAll(async function () {

  if (browser) {
    await browser.close();
  }

  logger.info('Browser closed');
});