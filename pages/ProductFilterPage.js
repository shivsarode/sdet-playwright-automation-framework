const elementUtils = require('../utils/elementUtils');
const waitUtils = require('../utils/waitUtils');
const assertUtils = require('../utils/assertUtils');

class ProductFilterPage {

  constructor(page) {
    this.page = page;

    // Category
    this.womenCategory = page.locator('a[href="#Women"]');
    this.dressCategory = page.locator('a[href="/category_products/1"]');

    // Results
    this.productList = page.locator('.features_items');
    this.productCards = page.locator('.productinfo');
  }

  async openWomenDressCategory() {
    await elementUtils.click(this.page, this.womenCategory);
    await elementUtils.click(this.page, this.dressCategory);
  }

  async verifyFilteredProducts() {
    await waitUtils.waitForElement(this.page, this.productList);
    await assertUtils.verifyVisible(this.page, '.features_items');

    const count = await this.productCards.count();

    if (count === 0) {
      throw new Error('No products displayed for selected category');
    }

    console.log(`FILTER SUCCESSFUL: ${count} products displayed`);
  }
}

module.exports = ProductFilterPage;