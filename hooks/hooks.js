require('dotenv').config();

const { Before, After, BeforeAll, AfterAll } = require('@cucumber/cucumber');
const { chromium, firefox, webkit } = require('playwright');
const logger = require('../utils/logger');

let browser;

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
    viewport: null
  });

  this.page = await this.context.newPage();
});

After(async function (scenario) {

  if (scenario.result.status === 'FAILED') {
    logger.error(`FAILED: ${scenario.pickle.name}`);
  }

  await this.page.close();
  await this.context.close();

  logger.info(`Scenario End: ${scenario.pickle.name}`);
});

AfterAll(async () => {

  logger.info('Browser closed');

  await browser.close();
});