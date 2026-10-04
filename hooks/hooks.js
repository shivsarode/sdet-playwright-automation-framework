require('dotenv').config();

const { Before, After, BeforeAll, AfterAll } = require('@cucumber/cucumber');
const { chromium, firefox, webkit } = require('playwright');
const logger = require('../utils/logger');

let browser;

BeforeAll(async function () {
  const browsers = { chromium, firefox, webkit };
  const browserType = process.env.BROWSER || 'chromium';

  browser = await browsers[browserType].launch({
    headless: process.env.HEADLESS !== 'false',
    slowMo: Number(process.env.SLOW_MO) || 0
  });

  logger.info(`Browser launched: ${browserType}`);
});

Before(async function (scenario) {
  logger.info(`Scenario Started: ${scenario.pickle.name}`);

  this.browser = browser;

  this.context = await browser.newContext({
    storageState: './auth/auth.json',
    viewport: null
  });

  this.page = await this.context.newPage();
});

After(async function (scenario) {
  if (scenario.result?.status === 'FAILED' && this.page) {
    logger.error(`Scenario FAILED: ${scenario.pickle.name}`);
    await this.page.screenshot({
      path: `logs/${Date.now()}-failure.png`,
      fullPage: true
    });
  }

  await this.page?.close();
  await this.context?.close();

  logger.info(`Scenario Finished: ${scenario.pickle.name}`);
});

AfterAll(async function () {
  await browser?.close();
  logger.info('Browser closed');
});