const elementUtils = require('../utils/elementUtils');
const waitUtils = require('../utils/waitUtils');
const assertUtils = require('../utils/assertUtils');
const screenshotUtils = require('../utils/screenshotUtils');

class ProductDetailsPage {
  constructor(page) {
    this.page = page;

    // navigation
    this.productsLink = 'a[href="/products"]';

    // products section
    this.productsPageTitle = 'text=All Products';
    this.productsList = '.features_items';
    this.firstProductViewBtn = '(//a[contains(text(),"View Product")])[1]';

    // product details (fixed locators)
    this.productName = '.product-information h2';
    this.productCategory = '.product-information p:has-text("Category")';
    this.productPrice = '.product-information span span';
    this.productAvailability = '.product-information p:has-text("Availability")';
    this.productCondition = '.product-information p:has-text("Condition")';
    this.productBrand = '.product-information p:has-text("Brand")';
  }

  // navigate to products section
  async navigateToProductsSection() {
    await elementUtils.click(this.page, this.productsLink);
    await waitUtils.waitForElement(this.page, this.productsPageTitle);
  }

  // verify products list displayed
  async verifyProductsListDisplayed() {
    await assertUtils.verifyVisible(this.page, this.productsList);
  }

  // select first product
  async selectFirstProduct() {
    await elementUtils.click(this.page, this.firstProductViewBtn);
  }

  // verify product detail page loaded
  async verifyProductDetailPageLoaded() {
    await waitUtils.waitForElement(this.page, this.productName);
  }

  // verify complete product information
  async verifyCompleteProductInformation() {
    await assertUtils.verifyVisible(this.page, this.productName);
    await assertUtils.verifyVisible(this.page, this.productCategory);
    await assertUtils.verifyVisible(this.page, this.productPrice);
    await assertUtils.verifyVisible(this.page, this.productAvailability);
    await assertUtils.verifyVisible(this.page, this.productCondition);
    await assertUtils.verifyVisible(this.page, this.productBrand);

    await screenshotUtils.takeScreenshot(this.page, 'product_details_verified');
  }

  // get product details data
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