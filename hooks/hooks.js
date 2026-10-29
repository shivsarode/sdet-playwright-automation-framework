
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
const ApiClient = require('../api/clients/apiClient');
const logger = require('../utils/logger');

const browsers = { chromium, firefox, webkit };
const browserName = (process.env.BROWSER || 'chromium').toLowerCase();

const isCI = process.env.CI === 'true';
const isDocker = fs.existsSync('/.dockerenv');
const headless = isCI || isDocker
    ? true
    : process.env.HEADLESS !== 'false';

if (!Object.hasOwn(browsers, browserName)) {
    throw new Error(
        `Invalid BROWSER="${browserName}". Use chromium, firefox, or webkit.`
    );
}

const artifactDirs = {
    videos: path.resolve('logs/videos'),
    traces: path.resolve('logs/traces'),
    screenshots: path.resolve('logs/screenshots')
};

Object.values(artifactDirs).forEach((dir) => {
    fs.mkdirSync(dir, { recursive: true });
});

const videoEnabled = process.env.VIDEO === 'true';
const traceEnabled = process.env.TRACE === 'true';
const keepSuccessfulVideos = process.env.KEEP_SUCCESS_VIDEOS === 'true';

let browser;

BeforeAll(async function () {
    browser = await browsers[browserName].launch({
        headless,
        slowMo: headless ? 0 : Number(process.env.SLOW_MO) || 0
    });

    logger.info(
        `Browser launched: ${browserName} | Headless: ${headless} | CI: ${isCI} | Docker: ${isDocker}`
    );
});

Before(async function () {
    this.traceStarted = false;
    this.apiClients = [];

    this.context = await browser.newContext({
        ...(videoEnabled && {
            recordVideo: { dir: artifactDirs.videos }
        })
    });

    this.page = await this.context.newPage();

    if (traceEnabled) {
        await this.context.tracing.start({
            screenshots: true,
            snapshots: true,
            sources: true
        });

        this.traceStarted = true;
    }
});

After(async function (scenario) {
    const failed = scenario.result?.status === 'FAILED';
    const scenarioName = scenario.pickle.name.replace(/[^a-z0-9]/gi, '_');
    const artifactId = `${Date.now()}-${scenarioName}`;

    let video = null;

    try {
        video = this.page?.video() || null;
    } catch (error) {
        logger.error(`Video retrieval failed: ${error.message}`);
    }

    try {
        if (failed && this.page) {
            await this.page.screenshot({
                path: path.join(
                    artifactDirs.screenshots,
                    `${artifactId}.png`
                ),
                fullPage: true
            });
        }
    } catch (error) {
        logger.error(`Screenshot capture failed: ${error.message}`);
    }

    try {
        if (this.traceStarted && this.context) {
            if (failed) {
                await this.context.tracing.stop({
                    path: path.join(
                        artifactDirs.traces,
                        `${artifactId}.zip`
                    )
                });
            } else {
                await this.context.tracing.stop();
            }

            this.traceStarted = false;
        }
    } catch (error) {
        logger.error(`Trace handling failed: ${error.message}`);
    }

    try {
        await this.page?.close();
    } catch (error) {
        logger.error(`Page cleanup failed: ${error.message}`);
    }

    try {
        await this.context?.close();
    } catch (error) {
        logger.error(`Browser context cleanup failed: ${error.message}`);
    }

    if (video) {
        try {
            const sourcePath = await video.path();
            const shouldKeep = failed || keepSuccessfulVideos;

            if (shouldKeep) {
                const destinationPath = path.join(
                    artifactDirs.videos,
                    `${artifactId}.webm`
                );

                await video.saveAs(destinationPath);

                if (
                    sourcePath !== destinationPath &&
                    fs.existsSync(sourcePath)
                ) {
                    fs.unlinkSync(sourcePath);
                }
            } else if (fs.existsSync(sourcePath)) {
                fs.unlinkSync(sourcePath);
            }
        } catch (error) {
            logger.error(`Video handling failed: ${error.message}`);
        }
    }

    try {
        const cleanupErrors = await ApiClient.disposeAll();

        cleanupErrors.forEach((error) => {
            logger.error(`API client cleanup failed: ${error.message}`);
        });
    } catch (error) {
        logger.error(`API client disposal failed: ${error.message}`);
    }

    logger.info(
        `Scenario finished: ${scenario.pickle.name} | Status: ${failed ? 'FAILED' : 'PASSED'}`
    );
});

AfterAll(async function () {
    try {
        await browser?.close();
    } catch (error) {
        logger.error(`Browser shutdown failed: ${error.message}`);
    } finally {
        browser = null;
        logger.info('Browser closed');
    }
});
