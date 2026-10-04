const { chromium } = require('playwright');

const config = require('../config/env');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(config.baseURL);

  console.log('Login manually in the browser.');
  console.log('After successful login, press ENTER here to save storage state.');

  process.stdin.once('data', async () => {
    await context.storageState({
      path: './auth/auth.json'
    });

    console.log('Storage state saved: ./auth/auth.json');

    await browser.close();
    process.exit(0);
  });
})();