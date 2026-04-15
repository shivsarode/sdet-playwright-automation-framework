class WaitUtils {

    async waitForElement(page, locator) {
        await page.locator(locator).waitFor({ state: 'visible' });
    }

    async waitForClickable(page, locator) {
        await page.locator(locator).waitFor({ state: 'attached' });
    }

    async waitForURL(page, url) {
        await page.waitForURL(url);
    }

}

module.exports = new WaitUtils();