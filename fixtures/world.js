const { setWorldConstructor } = require('@cucumber/cucumber');

const ProductPage = require('../pages/ProductPage');

class CustomWorld {

  constructor() {

    // Playwright objects
    this.browser = null;
    this.context = null;
    this.page = null;

    // Page Objects
    this.productPage = null;

    // Test Data
    this.testData = require('../test-data/login.json');
  }

  initializePageObjects() {

    this.productPage = new ProductPage(this.page);
  }
}

setWorldConstructor(CustomWorld);