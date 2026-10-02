const {
  When,
  Then,
  setDefaultTimeout
} = require('@cucumber/cucumber');

const SearchProductPage = require('../pages/SearchProductPage');

setDefaultTimeout(60000);

When('user searches for {string}', async function (productName) {

  this.searchProductPage = new SearchProductPage(this.page);

  await this.searchProductPage.searchProduct(productName);

});

Then('searched products should be displayed', async function () {

  await this.searchProductPage.verifySearchResults();

});

Then('product {string} should be visible in search results', async function (productName) {

  await this.searchProductPage.verifyProductVisible(productName);

  console.log(`SEARCH SUCCESSFUL: ${productName}`);

});