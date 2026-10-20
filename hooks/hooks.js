
require('dotenv').config();

const fs = require('fs');
const path = require('path');
const {
    BeforeAll,
    Before,
    After,
    AfterAll
} = require('@cucumber/cucumber');

const { chromium, firefox, webkit } = require('playwright');
const logger = require('../utils/logger');

const browsers = { chromium, firefox, webkit };
const browserName = (process.env.BROWSER || 'chromium').toLowerCase();

if (!Object.hasOwn(browsers, browserName)) {
    throw new Error(
        `Invalid BROWSER="${browserName}". Use chromium, firefox, or webkit.`
    );
}

const videoDir = path.resolve('logs/videos');
const traceDir = path.resolve('logs/traces');
const screenshotDir = path.resolve('logs/screenshots');

[videoDir, traceDir, screenshotDir].forEach((dir) => {
    fs.mkdirSync(dir, { recursive: true });
});

let browser;

BeforeAll(async function () {
    browser = await browsers[browserName].launch({
        headless: process.env.HEADLESS !== 'false',
        slowMo: Number(process.env.SLOW_MO) || 0
    });

    logger.info(`Browser launched: ${browserName}`);
});

Before(async function () {
    this.apiClients = [];

    this.context = await browser.newContext({
        ...(process.env.VIDEO === 'true' && {
            recordVideo: { dir: videoDir }
        })
    });

    this.page = await this.context.newPage();

    if (process.env.TRACE === 'true') {
        await this.context.tracing.start({
            screenshots: true,
            snapshots: true
        });
    }
});

After(async function (scenario) {
    const failed = scenario.result?.status === 'FAILED';
    const scenarioName = scenario.pickle.name.replace(/[^a-z0-9]/gi, '_');
    const artifactId = `${Date.now()}-${scenarioName}`;

    if (failed && this.page) {
        await this.page.screenshot({
            path: path.join(screenshotDir, `${artifactId}.png`),
            fullPage: true
        }).catch((error) => {
            logger.error(`Screenshot capture failed: ${error.message}`);
        });
    }

    if (process.env.TRACE === 'true' && this.context) {
        await this.context.tracing.stop({
            path: path.join(traceDir, `${artifactId}.zip`)
        }).catch((error) => {
            logger.error(`Trace capture failed: ${error.message}`);
        });
    }

    await this.page?.close().catch((error) => {
        logger.error(`Page cleanup failed: ${error.message}`);
    });

    await this.context?.close().catch((error) => {
        logger.error(`Browser context cleanup failed: ${error.message}`);
    });

    for (const client of this.apiClients || []) {
        await client.dispose().catch((error) => {
            logger.error(`API client cleanup failed: ${error.message}`);
        });
    }

    logger.info(`Scenario finished: ${scenario.pickle.name}`);
});

AfterAll(async function () {
    await browser?.close();
    logger.info('Browser closed');
});
