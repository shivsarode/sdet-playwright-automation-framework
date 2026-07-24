const elementUtils = require('../utils/elementUtils');
const waitUtils = require('../utils/waitUtils');
const assertUtils = require('../utils/assertUtils');
const env = require('../config/env');

class ProductPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.productsBtn = 'a[href="/products"]';
    this.firstProductAddBtn = '(//a[contains(text(),"Add to cart")])[1]';
    this.viewCartBtn = 'a:has-text("View Cart")';
    this.cartPageText = 'text=Shopping Cart';
    this.productModal = '.modal-content';
  }

  // Open application using ENV
  async openApp() {
    await this.page.goto(env.baseURL);
  }

  // Navigate to Products
  async goToProducts() {
    await elementUtils.click(this.page, this.productsBtn);
  }

  // Add First Product
  async addFirstProduct() {
    await elementUtils.click(this.page, this.firstProductAddBtn);
    await waitUtils.waitForElement(this.page, this.productModal);
  }

  // Open Cart
  async goToCart() {
    await elementUtils.click(this.page, this.viewCartBtn);
  }

  // Verify Product Added
  async verifyProductAddedToCart() {
    await waitUtils.waitForElement(this.page, this.cartPageText);
    await assertUtils.verifyVisible(this.page, this.cartPageText);
  }
}

module.exports = ProductPage;