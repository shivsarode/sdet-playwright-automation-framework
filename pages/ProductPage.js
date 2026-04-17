const elementUtils = require('../utils/elementUtils');
const waitUtils = require('../utils/waitUtils');
const assertUtils = require('../utils/assertUtils');
const screenshotUtils = require('../utils/screenshotUtils');
const env = require('../config/env');

class ProductPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.productsBtn = 'a[href="/products"]';
    this.firstProductAddBtn = '(//a[contains(text(),"Add to cart")])[1]';
    this.viewCartBtn = 'a:has-text("View Cart")';
    this.cartPageText = 'text=Shopping Cart';
    this.productModal = '.modal-content'; // modal after add to cart
  }

  // Open application using ENV
  async openApp() {
    await this.page.goto(env.baseURL);
  }

  async goToProducts() {
    await elementUtils.click(this.page, this.productsBtn);
  }

  async addFirstProduct() {
    await elementUtils.click(this.page, this.firstProductAddBtn);

    // Wait for modal (real site behavior)
    await waitUtils.waitForElement(this.page, this.productModal);
  }

  async goToCart() {
    await elementUtils.click(this.page, 'a:has-text("View Cart")');
}

  async verifyProductAddedToCart() {
    await waitUtils.waitForElement(this.page, this.cartPageText);
    await assertUtils.verifyVisible(this.page, this.cartPageText);

    await screenshotUtils.takeScreenshot(this.page, 'product_added');
  }
}

module.exports = ProductPage;