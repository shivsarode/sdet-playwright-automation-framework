class ElementUtils {

    async click(page, locator) {
        await page.locator(locator).click();
    }

    async type(page, locator, text) {
        await page.locator(locator).fill(text);
    }

    async clearAndType(page, locator, text) {
        await page.locator(locator).fill('');
        await page.locator(locator).fill(text);
    }

}

module.exports = new ElementUtils();