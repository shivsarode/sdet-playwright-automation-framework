const { Before, After, BeforeAll, AfterAll } = require("@cucumber/cucumber");
const { chromium, firefox, webkit } = require("playwright");

let browser;

// 🔥 TOGGLES (env based)
const isVideo = process.env.VIDEO === "true";
const isTrace = process.env.TRACE === "true";
const isScreenshot = process.env.SCREENSHOT === "true";

BeforeAll(async function () {
  const browserType = process.env.BROWSER || "chromium";

  const launchOptions = {
    headless: false,
    slowMo: 500
  };

  if (browserType === "firefox") {
    browser = await firefox.launch(launchOptions);
  } else if (browserType === "webkit") {
    browser = await webkit.launch(launchOptions);
  } else {
    browser = await chromium.launch(launchOptions);
  }
});

Before(async function () {
  this.context = await browser.newContext({
    ...(false ? { recordVideo: { dir: "reports/videos/" } } : {}), // ✅ VIDEO OFF
    viewport: null
  });

  if (isTrace) {
    await this.context.tracing.start({
      screenshots: true,
      snapshots: true
    });
  }

  this.page = await this.context.newPage();
});

After(async function (scenario) {
  const scenarioName = scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, "_");

  if (isScreenshot && scenario.result.status === "FAILED") {
    const screenshot = await this.page.screenshot();
    await this.attach(screenshot, "image/png");
  }

  if (isTrace) {
    await this.context.tracing.stop({
      path: `reports/trace/${scenarioName}.zip`
    });
  }

  await this.page.close();
  await this.context.close();
});

AfterAll(async function () {
  await browser.close();
});