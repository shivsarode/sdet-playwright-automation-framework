class ElementUtils {

    getLocator(page, locator) {
        if (typeof locator === 'string') {
            return page.locator(locator);
        }

        return locator;
    }

    async click(page, locator) {
        const element = this.getLocator(page, locator);
        await element.waitFor({ state: 'visible' });
        await element.click();
    }

    async type(page, locator, text) {
        const element = this.getLocator(page, locator);
        await element.waitFor({ state: 'visible' });
        await element.fill(text);
    }

    async clearAndType(page, locator, text) {
        const element = this.getLocator(page, locator);
        await element.waitFor({ state: 'visible' });
        await element.fill('');
        await element.fill(text);
    }

    async getText(page, locator) {
        const element = this.getLocator(page, locator);
        await element.waitFor({ state: 'visible' });
        return await element.textContent();
    }

    async isVisible(page, locator) {
        const element = this.getLocator(page, locator);
        return await element.isVisible();
    }

    async waitForElement(page, locator) {
        const element = this.getLocator(page, locator);
        await element.waitFor({ state: 'visible' });
    }

    async selectDropdownByValue(page, locator, value) {
        const element = this.getLocator(page, locator);
        await element.selectOption(value);
    }

    async hover(page, locator) {
        const element = this.getLocator(page, locator);
        await element.hover();
    }

    async doubleClick(page, locator) {
        const element = this.getLocator(page, locator);
        await element.dblclick();
    }

    async getAttribute(page, locator, attribute) {
        const element = this.getLocator(page, locator);
        return await element.getAttribute(attribute);
    }

}

module.exports = new ElementUtils();