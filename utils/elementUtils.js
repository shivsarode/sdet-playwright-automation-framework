
const logger = require('./logger');

class ElementUtils {
    getLocator(page, locator) {
        return typeof locator === 'string'
            ? page.locator(locator)
            : locator;
    }

    async getVisibleLocator(page, primaryLocator, fallbackLocators = []) {
        const candidates = [primaryLocator, ...fallbackLocators];

        for (let index = 0; index < candidates.length; index++) {
            const candidate = candidates[index];
            const locator = this.getLocator(page, candidate);

            try {
                const count = await locator.count();

                // Avoid clicking an ambiguous locator.
                if (count !== 1) {
                    logger.warn(
                        `Locator candidate ${index + 1}: expected 1 element, found ${count}.`
                    );
                    continue;
                }

                if (await locator.isVisible()) {
                    if (index > 0) {
                        logger.warn(
                            `Locator fallback succeeded at candidate ${index + 1}.`
                        );
                    }

                    return locator;
                }

                logger.warn(
                    `Locator candidate ${index + 1} is not visible.`
                );
            } catch (error) {
                logger.warn(
                    `Locator candidate ${index + 1} failed: ${error.message}`
                );
            }
        }

        throw new Error(
            `No unique, visible element found among ${candidates.length} locator candidate(s).`
        );
    }

    async click(page, locator, fallbackLocators = []) {
        const element = await this.getVisibleLocator(
            page, locator, fallbackLocators
        );
        await element.click();
    }

    async type(page, locator, text, fallbackLocators = []) {
        const element = await this.getVisibleLocator(
            page, locator, fallbackLocators
        );
        await element.fill(text);
    }

    async clearAndType(page, locator, text, fallbackLocators = []) {
        const element = await this.getVisibleLocator(
            page, locator, fallbackLocators
        );
        await element.fill('');
        await element.fill(text);
    }

    async getText(page, locator, fallbackLocators = []) {
        const element = await this.getVisibleLocator(
            page, locator, fallbackLocators
        );
        return await element.textContent();
    }

    async isVisible(page, locator) {
        const element = this.getLocator(page, locator);
        return await element.isVisible();
    }

    async waitForElement(page, locator, fallbackLocators = []) {
        return await this.getVisibleLocator(
            page, locator, fallbackLocators
        );
    }

    async selectDropdownByValue(page, locator, value) {
        const element = this.getLocator(page, locator);
        await element.selectOption(value);
    }

    async hover(page, locator, fallbackLocators = []) {
        const element = await this.getVisibleLocator(
            page, locator, fallbackLocators
        );
        await element.hover();
    }

    async doubleClick(page, locator, fallbackLocators = []) {
        const element = await this.getVisibleLocator(
            page, locator, fallbackLocators
        );
        await element.dblclick();
    }

    async getAttribute(page, locator, attribute) {
        const element = this.getLocator(page, locator);
        return await element.getAttribute(attribute);
    }
}

module.exports = new ElementUtils();
