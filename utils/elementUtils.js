
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
            const locator = this.getLocator(page, candidates[index]);

            try {
                const count = await locator.count();

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

    /**
     * Discovers conservative alternatives from the page DOM.
     * Only candidates with a unique, visible match are returned.
     */
    async discoverFallbackLocators(page, primaryLocator) {
        if (typeof primaryLocator !== 'string') {
            logger.warn(
                'Automatic discovery skipped: primary locator is not a string.'
            );
            return [];
        }

        const selector = primaryLocator.trim();
        const candidates = [];

        try {
            // A stale ID can sometimes be recovered using its meaningful name.
            const idMatch = selector.match(/^#([a-zA-Z][\w-]*)$/);

            if (idMatch) {
                const id = idMatch[1];

                candidates.push(
                    page.getByRole('button', {
                        name: id.replace(/[-_]/g, ' '),
                        exact: true
                    }),
                    page.getByRole('link', {
                        name: id.replace(/[-_]/g, ' '),
                        exact: true
                    }),
                    page.getByText(id.replace(/[-_]/g, ' '), {
                        exact: true
                    })
                );
            }

            // For a missing test ID, inspect common accessible alternatives.
            const testIdMatch = selector.match(
                /^\[data-testid=["']([^"']+)["']\]$/
            );

            if (testIdMatch) {
                const name = testIdMatch[1]
                    .replace(/[-_]/g, ' ')
                    .trim();

                candidates.push(
                    page.getByRole('button', { name, exact: true }),
                    page.getByRole('link', { name, exact: true }),
                    page.getByLabel(name, { exact: true })
                );
            }

            const validCandidates = [];

            for (const candidate of candidates) {
                try {
                    if (
                        await candidate.count() === 1 &&
                        await candidate.isVisible()
                    ) {
                        validCandidates.push(candidate);
                    }
                } catch (error) {
                    logger.debug?.(
                        `Discovery candidate rejected: ${error.message}`
                    );
                }
            }

            if (validCandidates.length === 1) {
                logger.info(
                    'Automatic recovery discovered one unique, visible candidate.'
                );
                return validCandidates;
            }

            logger.warn(
                `Automatic recovery could not identify one unambiguous candidate. Matches: ${validCandidates.length}.`
            );

            return [];
        } catch (error) {
            logger.warn(
                `Automatic locator discovery failed: ${error.message}`
            );
            return [];
        }
    }

    async click(page, locator, fallbackLocators = []) {
        try {
            const element = await this.getVisibleLocator(
                page,
                locator,
                fallbackLocators
            );

            await element.click();
            return;
        } catch (originalError) {
            logger.warn(
                `Initial click attempt failed: ${originalError.message}`
            );

            const discovered = await this.discoverFallbackLocators(
                page,
                locator
            );

            if (discovered.length !== 1) {
                throw new Error(
                    `Click recovery failed safely. No unique replacement was found. Original error: ${originalError.message}`
                );
            }

            const recoveredElement = discovered[0];

            await recoveredElement.click();

            logger.info(
                'Self-healing click succeeded using a discovered locator.'
            );
        }
    }

    async type(page, locator, text, fallbackLocators = []) {
        const element = await this.getVisibleLocator(
            page,
            locator,
            fallbackLocators
        );

        await element.fill(text);
    }

    async clearAndType(page, locator, text, fallbackLocators = []) {
        const element = await this.getVisibleLocator(
            page,
            locator,
            fallbackLocators
        );

        await element.fill('');
        await element.fill(text);
    }

    async getText(page, locator, fallbackLocators = []) {
        const element = await this.getVisibleLocator(
            page,
            locator,
            fallbackLocators
        );

        return await element.textContent();
    }

    async isVisible(page, locator) {
        const element = this.getLocator(page, locator);
        return await element.isVisible();
    }

    async waitForElement(page, locator, fallbackLocators = []) {
        return await this.getVisibleLocator(
            page,
            locator,
            fallbackLocators
        );
    }

    async selectDropdownByValue(page, locator, value) {
        const element = this.getLocator(page, locator);
        await element.selectOption(value);
    }

    async hover(page, locator, fallbackLocators = []) {
        const element = await this.getVisibleLocator(
            page,
            locator,
            fallbackLocators
        );

        await element.hover();
    }

    async doubleClick(page, locator, fallbackLocators = []) {
        const element = await this.getVisibleLocator(
            page,
            locator,
            fallbackLocators
        );

        await element.dblclick();
    }

    async getAttribute(page, locator, attribute) {
        const element = this.getLocator(page, locator);
        return await element.getAttribute(attribute);
    }
}

module.exports = new ElementUtils();
