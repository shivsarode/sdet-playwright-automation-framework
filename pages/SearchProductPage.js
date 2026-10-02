const elementUtils = require('../utils/elementUtils');
const waitUtils = require('../utils/waitUtils');
const assertUtils = require('../utils/assertUtils');

class SearchProductPage {

  constructor(page) {
    this.page = page;

    this.productsBtn = 'a[href="/products"]';
    this.searchInput = '#search_product';
    this.searchButton = '#submit_search';
    this.searchResults = '.features_items';
    this.productNames = '.productinfo p';
  }

  async goToProducts() {
    await elementUtils.click(this.page, this.productsBtn);
    await waitUtils.waitForElement(this.page, this.searchInput);
  }

  async searchProduct(productName) {
    await this.page.locator(this.searchInput).fill(productName);
    await elementUtils.click(this.page, this.searchButton);
  }

  async verifySearchResults() {
    await waitUtils.waitForElement(this.page, this.searchResults);
    await assertUtils.verifyVisible(this.page, this.searchResults);
  }

 async verifyProductVisible(productName) {
  const productSelector = `.productinfo p:has-text("${productName}")`;

  await waitUtils.waitForElement(this.page, productSelector);
  await assertUtils.verifyVisible(this.page, productSelector);
}
}

module.exports = SearchProductPage;