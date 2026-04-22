const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const ProductDetailsPage = require('../pages/ProductDetailsPage');
const config = require('../config/env');

setDefaultTimeout(60000);

let productPage;

Given('user launches the application', async function () {
  productPage = new ProductDetailsPage(this.page);
  await this.page.goto(config.baseURL);
});

When('user navigates to the products section', async function () {
  await productPage.navigateToProductsSection();
});

When('user verifies the products list is displayed', async function () {
  await productPage.verifyProductsListDisplayed();
});

When('user selects the first product to view details', async function () {
  await productPage.selectFirstProduct();
});

Then('user should see complete product information', async function () {
  await productPage.verifyProductDetailPageLoaded();
  await productPage.verifyCompleteProductInformation();
  console.log(" ..🔥Product detail page verified successfully");
});