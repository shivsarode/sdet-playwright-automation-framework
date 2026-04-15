const { expect } = require('@playwright/test');

class AssertUtils {

    async verifyVisible(page, locator) {
        await expect(page.locator(locator)).toBeVisible();
    }

    async verifyText(page, locator, expectedText) {
        await expect(page.locator(locator)).toHaveText(expectedText);
    }

}

module.exports = new AssertUtils();