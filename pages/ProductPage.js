const elementUtils = require('../utils/elementUtils');
const waitUtils = require('../utils/waitUtils');
const env = require('../config/env');

class ProductPage {
  constructor(page) {
    this.page = page;

    // Navigation
    this.productsBtn = page.locator('a[href="/products"]').first();
    this.firstProductAddBtn = page.locator('a.add-to-cart').first();
    this.viewCartBtn = page.getByText('View Cart').first();

    // Cart
    this.cartPageText = page.getByText('Shopping Cart').first();
    this.productPrice = page.locator('.cart_price p').first();
    this.productQuantity = page.locator('.cart_quantity button').first();
    this.productTotal = page.locator('.cart_total_price').first();
    this.productModal = page.locator('.modal-content').first();
  }

  async openApp() {
    await this.page.goto(env.baseURL);
  }

  async goToProducts() {
    await elementUtils.click(this.page, this.productsBtn);
  }

  async addFirstProduct() {
    await elementUtils.click(this.page, this.firstProductAddBtn);
    await waitUtils.waitForElement(this.page, this.productModal);
  }

  async goToCart() {
    await elementUtils.click(this.page, this.viewCartBtn);
    await waitUtils.waitForElement(this.page, this.cartPageText);
  }

  async verifyProductAddedToCart() {
    await this.page.locator('#cart_info_table').waitFor({
      state: 'visible'
    });

    const product = this.page.locator('#cart_info_table tbody tr').first();

    if (!(await product.isVisible())) {
      throw new Error('Product was not added to cart');
    }

    console.log('Product verified in cart successfully');
  }

  async getProductPrice() {
    return (await this.productPrice.innerText()).trim();
  }

  async getProductQuantity() {
    return (await this.productQuantity.innerText()).trim();
  }

  async getProductTotal() {
    return (await this.productTotal.innerText()).trim();
  }
}

module.exports = ProductPage;