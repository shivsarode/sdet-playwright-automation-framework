class ElementUtils {

    async click(page, locator) {
        await page.locator(locator).waitFor({ state: 'visible' });
        await page.locator(locator).click();
    }

    async type(page, locator, text) {
        await page.locator(locator).waitFor({ state: 'visible' });
        await page.locator(locator).fill(text);
    }

    async clearAndType(page, locator, text) {
        await page.locator(locator).waitFor({ state: 'visible' });
        await page.locator(locator).fill('');
        await page.locator(locator).fill(text);
    }

    async getText(page, locator) {
        await page.locator(locator).waitFor({ state: 'visible' });
        return await page.locator(locator).textContent();
    }

    async isVisible(page, locator) {
        return await page.locator(locator).isVisible();
    }

    async waitForElement(page, locator) {
        await page.locator(locator).waitFor({ state: 'visible' });
    }

    async selectDropdownByValue(page, locator, value) {
        await page.locator(locator).selectOption(value);
    }

    async hover(page, locator) {
        await page.locator(locator).hover();
    }

    async doubleClick(page, locator) {
        await page.locator(locator).dblclick();
    }

    async getAttribute(page, locator, attribute) {
        return await page.locator(locator).getAttribute(attribute);
    }

}

module.exports = new ElementUtils();