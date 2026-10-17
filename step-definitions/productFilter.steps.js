const {
  Given,
  When,
  Then,
  setDefaultTimeout
} = require('@cucumber/cucumber');

const ProductFilterPage = require('../pages/ProductFilterPage');
const ProductPage = require('../pages/ProductPage');

setDefaultTimeout(60000);

Given('user opens automation exercise website for product filtering', async function () {

  this.productPage = new ProductPage(this.page);

  await this.productPage.openApp();

});

When('user navigates to products page for filtering', async function () {

  await this.productPage.goToProducts();

});

When('user selects Women Dress category', async function () {

  this.productFilterPage = new ProductFilterPage(this.page);

  await this.productFilterPage.openWomenDressCategory();

});

Then('filtered products should be displayed', async function () {

  await this.productFilterPage.verifyFilteredProducts();

});