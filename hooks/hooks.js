require('dotenv').config();

const { Before, After, BeforeAll, AfterAll } = require("@cucumber/cucumber");
const { chromium, firefox, webkit } = require("playwright");
const logger = require('../utils/logger');

let browser;

const isVideo = process.env.VIDEO === "true";
const isTrace = process.env.TRACE === "true";

BeforeAll(async function () {

  const browserType = process.env.BROWSER || "chromium";

  const launchOptions = {
    headless: process.env.HEADLESS !== "false",
    slowMo: 200
  };

  logger.info(`Launching Browser: ${browserType}`);

  const browsers = { chromium, firefox, webkit };

  browser = await browsers[browserType].launch(launchOptions);
});

Before(async function (scenario) {

  logger.info(`Starting Scenario: ${scenario.pickle.name}`);

  this.context = await browser.newContext({
    ...(isVideo && { recordVideo: { dir: "reports/videos/" } }),
    viewport: null
  });

  // Start trace if enabled
  if (isTrace) {
    await this.context.tracing.start({
      screenshots: true,
      snapshots: true
    });

    logger.info("Trace Started");
  }

  this.page = await this.context.newPage();
});

After(async function (scenario) {

  const scenarioName = scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, "_");

  // Capture failure evidence
  if (scenario.result.status === "FAILED") {

    logger.error(`Scenario Failed: ${scenario.pickle.name}`);

    const screenshot = await this.page.screenshot({
      path: `reports/screenshots/${scenarioName}.png`,
      fullPage: true
    });

    await this.attach(screenshot, "image/png");

    logger.info("Failure Screenshot Captured");
  }

  // Stop trace if enabled
  if (isTrace) {

    await this.context.tracing.stop({
      path: `reports/trace/${scenarioName}.zip`
    });

    logger.info("Trace File Generated");
  }

  logger.info(`Scenario Completed: ${scenario.pickle.name}`);

  await this.page.close();
  await this.context.close();
});

AfterAll(async function () {

  logger.info("Closing Browser");

  await browser.close();
});