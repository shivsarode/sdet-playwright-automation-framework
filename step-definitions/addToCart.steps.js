const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');

const ProductPage = require('../pages/ProductPage');
const config = require('../config/env');

setDefaultTimeout(60000);

Given('user opens automation exercise website', async function () {

  this.productPage = new ProductPage(this.page);

  await this.productPage.openApp();

});

When('user navigates to products page', async function () {

  await this.productPage.goToProducts();

});

When('user adds first product to cart', async function () {

  await this.productPage.addFirstProduct();

});

Then('product should be added to cart successfully', async function () {

  await this.productPage.goToCart();

  await this.productPage.verifyProductAddedToCart();

  console.log('ADD TO CART SUCCESSFUL');

});