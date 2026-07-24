const elementUtils = require('../utils/elementUtils');
const waitUtils = require('../utils/waitUtils');
const assertUtils = require('../utils/assertUtils');

class ProductDetailsPage {
  constructor(page) {
    this.page = page;

    // Navigation
    this.productsLink = 'a[href="/products"]';

    // Products Section
    this.productsPageTitle = 'text=All Products';
    this.productsList = '.features_items';
    this.firstProductViewBtn = '(//a[contains(text(),"View Product")])[1]';

    // Product Details
    this.productName = '.product-information h2';
    this.productCategory = '.product-information p:has-text("Category")';
    this.productPrice = '.product-information span span';
    this.productAvailability = '.product-information p:has-text("Availability")';
    this.productCondition = '.product-information p:has-text("Condition")';
    this.productBrand = '.product-information p:has-text("Brand")';
  }

  // Navigate to Products Page
  async navigateToProductsSection() {
    await elementUtils.click(this.page, this.productsLink);
    await waitUtils.waitForElement(this.page, this.productsPageTitle);
  }

  // Verify Products List
  async verifyProductsListDisplayed() {
    await assertUtils.verifyVisible(this.page, this.productsList);
  }

  // Open First Product
  async selectFirstProduct() {
    await elementUtils.click(this.page, this.firstProductViewBtn);
  }

  // Verify Product Details Page
  async verifyProductDetailPageLoaded() {
    await waitUtils.waitForElement(this.page, this.productName);
  }

  // Verify Complete Product Information
  async verifyCompleteProductInformation() {
    await assertUtils.verifyVisible(this.page, this.productName);
    await assertUtils.verifyVisible(this.page, this.productCategory);
    await assertUtils.verifyVisible(this.page, this.productPrice);
    await assertUtils.verifyVisible(this.page, this.productAvailability);
    await assertUtils.verifyVisible(this.page, this.productCondition);
    await assertUtils.verifyVisible(this.page, this.productBrand);
  }

  // Get Product Details
  async getProductDetails() {
    const name = await this.page.textContent(this.productName);
    const category = await this.page.textContent(this.productCategory);
    const price = await this.page.textContent(this.productPrice);

    return {
      name: name?.trim(),
      category: category?.trim(),
      price: price?.trim()
    };
  }
}

module.exports = ProductDetailsPage;