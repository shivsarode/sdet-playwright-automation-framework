const { Before, After } = require("@cucumber/cucumber");
const { chromium, firefox, webkit } = require("playwright");

let browser;

Before(async function () {
  const browserType = process.env.BROWSER || "chromium";

  const browserLaunchers = {
    chromium,
    firefox,
    webkit
  };

  const launch = browserLaunchers[browserType];

  browser = await launch.launch({ headless: false });

  const context = await browser.newContext();
  this.page = await context.newPage();

  console.log(`🚀 Running tests on: ${browserType}`);
});

After(async function (scenario) {
  if (scenario.result?.status === "FAILED") {
    await this.page.screenshot({
      path: `reports/screenshots/${scenario.pickle.name}.png`,
      fullPage: true
    });
  }

  await browser.close();
});