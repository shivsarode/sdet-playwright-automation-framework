const elementUtils = require('../utils/elementUtils');
const waitUtils = require('../utils/waitUtils');
const assertUtils = require('../utils/assertUtils');

class CheckoutPage {

  constructor(page) {
    this.page = page;

    this.proceedToCheckoutBtn = 'a:has-text("Proceed To Checkout")';
    this.loginPrompt = 'a:has-text("Register / Login")';
  }

  async proceedToCheckout() {
    await elementUtils.click(this.page, this.proceedToCheckoutBtn);
    await waitUtils.waitForElement(this.page, this.loginPrompt);
  }

  async verifyCheckoutLoginPrompt() {
    await waitUtils.waitForElement(this.page, this.loginPrompt);
    await assertUtils.verifyVisible(this.page, this.loginPrompt);
  }
}

module.exports = CheckoutPage;