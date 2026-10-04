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

    // Cart quantity
    this.quantityElement = '#cart_info_table tbody tr:first-child .cart_quantity button';
  }

  // Open application
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

  // Increase Product Quantity
  async increaseProductQuantity() {
    const quantityElement = this.page.locator(this.quantityElement);

    await quantityElement.waitFor({ state: 'visible' });

    const currentQuantity = await quantityElement.innerText();

    if (currentQuantity !== '2') {
      throw new Error(`Expected initial quantity to be 2, but found ${currentQuantity}`);
    }

    await quantityElement.click();
  }

  // Get Product Quantity
  async getProductQuantity() {
    return await this.page
      .locator(this.quantityElement)
      .innerText();
  }
}

module.exports = ProductPage;