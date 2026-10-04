const elementUtils = require('../utils/elementUtils');
const waitUtils = require('../utils/waitUtils');
const env = require('../config/env');

class ProductPage {
  constructor(page) {
    this.page = page;

    // Navigation
    this.productsBtn = page.getByRole('link', { name: 'Products' });
    this.firstProductAddBtn = page.getByText('Add to cart').first();
    this.viewCartBtn = page.getByText('View Cart');

    // Cart
    this.cartPageText = page.getByText('Shopping Cart');
    this.productPrice = page.locator('.cart_price p').first();
    this.productQuantity = page.locator('.cart_quantity button').first();
    this.productTotal = page.locator('.cart_total_price').first();
    this.productModal = page.locator('.modal-content');
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