class WaitUtils {

    getLocator(page, locator) {
        if (typeof locator === 'string') {
            return page.locator(locator);
        }

        return locator;
    }

    async waitForElement(page, locator) {
        const element = this.getLocator(page, locator);
        await element.waitFor({ state: 'visible' });
    }

    async waitForElementHidden(page, locator) {
        const element = this.getLocator(page, locator);
        await element.waitFor({ state: 'hidden' });
    }

}

module.exports = new WaitUtils();