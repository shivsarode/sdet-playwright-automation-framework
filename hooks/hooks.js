require('dotenv').config();

const { Before, After, BeforeAll, AfterAll } = require('@cucumber/cucumber');
const { chromium, firefox, webkit } = require('playwright');
const logger = require('../utils/logger');

let browser;

const VIDEO = process.env.VIDEO === 'true';
const TRACE = process.env.TRACE === 'true';
const SLOW_MO = Number(process.env.SLOW_MO) || 0;

BeforeAll(async () => {

  const type = process.env.BROWSER || 'chromium';

  browser = await ({ chromium, firefox, webkit })[type].launch({
    headless: process.env.HEADLESS === 'true',
    slowMo: SLOW_MO
  });

  logger.info(`Browser launched: ${type}`);
});

Before(async function (scenario) {

  logger.info(`Scenario Start: ${scenario.pickle.name}`);

  this.context = await browser.newContext({
    recordVideo: VIDEO ? { dir: 'reports/videos/' } : undefined,
    viewport: null
  });

  if (TRACE)
    await this.context.tracing.start({
      screenshots: true,
      snapshots: true
    });

  this.page = await this.context.newPage();
});

After(async function (scenario) {

  const name = scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, '_');

  if (scenario.result.status === 'FAILED') {

    logger.error(`FAILED: ${scenario.pickle.name}`);

    const path = `reports/screenshots/${name}.png`;

    const img = await this.page.screenshot({ path, fullPage: true });

    await this.attach(img, 'image/png');
  }

  if (TRACE)
    await this.context.tracing.stop({
      path: `reports/trace/${name}.zip`
    });

  await this.page.close();
  await this.context.close();

  logger.info(`Scenario End: ${scenario.pickle.name}`);
});

AfterAll(async () => {

  logger.info('Browser closed');

  await browser.close();
});