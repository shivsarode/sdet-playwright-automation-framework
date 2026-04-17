const { Before, After } = require("@cucumber/cucumber");
const { chromium, firefox, webkit } = require("playwright");

let browser;

Before(async function () {
  const browserType = process.env.BROWSER || "chromium";

  if (browserType === "firefox") {
    browser = await firefox.launch({ headless: false });
  } else if (browserType === "webkit") {
    browser = await webkit.launch({ headless: false });
  } else {
    browser = await chromium.launch({ headless: false });
  }

  this.context = await browser.newContext();
  this.page = await this.context.newPage();
});

After(async function (scenario) {
  if (scenario.result.status === "FAILED") {
    await this.page.screenshot({ path: "reports/failure.png" });
  }

  await this.page.close();
  await this.context.close();
  await browser.close();
});