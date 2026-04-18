const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const ProductPage = require('../pages/ProductPage');
const { loadFixture } = require('../utils/fixtureLoader');

setDefaultTimeout(60000);

let productPage;

const config = loadFixture("config.json");

Given('user opens automation exercise website', async function () {
  productPage = new ProductPage(this.page);
  await this.page.goto(config.baseUrl);
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
  console.log("🔥 ADD TO CART SUCCESSFUL");
});