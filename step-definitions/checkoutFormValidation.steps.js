const {
  When,
  Then,
  setDefaultTimeout
} = require('@cucumber/cucumber');

const CheckoutPage = require('../pages/CheckoutPage');

setDefaultTimeout(60000);

When('user opens cart for checkout', async function () {
  await this.productPage.goToCart();
});

When('user proceeds to checkout', async function () {
  this.checkoutPage = new CheckoutPage(this.page);
  await this.checkoutPage.proceedToCheckout();
});

Then('login prompt should be displayed', async function () {
  await this.checkoutPage.verifyCheckoutLoginPrompt();
});