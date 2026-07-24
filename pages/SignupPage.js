const elementUtils = require('../utils/elementUtils');
const waitUtils = require('../utils/waitUtils');
const assertUtils = require('../utils/assertUtils');

class SignupPage {
  constructor(page) {
    this.page = page;

    // Login / Signup
    this.loginLink = 'a[href="/login"]';
    this.signupName = '[data-qa="signup-name"]';
    this.signupEmail = '[data-qa="signup-email"]';
    this.signupBtn = '[data-qa="signup-button"]';

    // Account Information
    this.gender = '#id_gender1';
    this.password = '#password';
    this.days = '#days';
    this.months = '#months';
    this.years = '#years';

    // Address Information
    this.firstName = '#first_name';
    this.lastName = '#last_name';
    this.address = '#address1';
    this.country = '#country';
    this.state = '#state';
    this.city = '#city';
    this.zipcode = '#zipcode';
    this.mobile = '#mobile_number';

    // Buttons
    this.createAccountBtn = '[data-qa="create-account"]';
    this.continueBtn = '[data-qa="continue-button"]';

    // Success Message
    this.accountCreatedText = 'text=Account Created!';
  }

  async openLogin() {
    await elementUtils.click(this.page, this.loginLink);
  }

  async signup(name, email) {
    await elementUtils.type(this.page, this.signupName, name);
    await elementUtils.type(this.page, this.signupEmail, email);
    await elementUtils.click(this.page, this.signupBtn);
  }

  async fillAccountDetails(password) {
    await elementUtils.click(this.page, this.gender);
    await elementUtils.type(this.page, this.password, password);

    await this.page.selectOption(this.days, '10');
    await this.page.selectOption(this.months, '5');
    await this.page.selectOption(this.years, '1995');

    await elementUtils.type(this.page, this.firstName, 'Shivam');
    await elementUtils.type(this.page, this.lastName, 'Sarode');
    await elementUtils.type(this.page, this.address, 'Pune');
    await this.page.selectOption(this.country, 'India');
    await elementUtils.type(this.page, this.state, 'MH');
    await elementUtils.type(this.page, this.city, 'Pune');
    await elementUtils.type(this.page, this.zipcode, '411001');
    await elementUtils.type(this.page, this.mobile, '9999999999');

    await elementUtils.click(this.page, this.createAccountBtn);
  }

  async verifyAccountCreated() {
    await waitUtils.waitForElement(this.page, this.accountCreatedText);
    await assertUtils.verifyVisible(this.page, this.accountCreatedText);
  }

  async clickContinue() {
    await elementUtils.click(this.page, this.continueBtn);
  }
}

module.exports = SignupPage;