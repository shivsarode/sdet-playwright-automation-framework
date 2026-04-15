const { Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const screenshotUtils = require('../utils/screenshotUtils');

let browser;

Before(async function () {
  browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  this.page = await context.newPage();
});

After(async function (scenario) {
  // screenshot on failure
  if (scenario.result.status === 'FAILED') {
    await screenshotUtils.takeScreenshot(this.page, 'failed_step');
  }

  await browser.close();
});