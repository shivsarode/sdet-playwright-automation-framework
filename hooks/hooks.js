const { Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

let browser;

Before(async function () {
  browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  this.page = await context.newPage();
});

After(async function () {
  await browser.close();
});