const { Given, When, Then } = require('@cucumber/cucumber');
const ProductPage = require('../pages/ProductPage');

let productPage;

Given('user opens automation exercise website', async function () {
  productPage = new ProductPage(this.page);
  await productPage.openApp();
});

When('user navigates to products page', async function () {
  await productPage.goToProducts();
});

When('user adds first product to cart', async function () {
  await productPage.addFirstProduct();
});

Then('product should be added to cart successfully', async function () {
  await productPage.goToCart();
  await productPage.verifyProductAddedToCart();
});