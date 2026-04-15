const elementUtils = require('../utils/elementUtils');
const waitUtils = require('../utils/waitUtils');
const assertUtils = require('../utils/assertUtils');
const screenshotUtils = require('../utils/screenshotUtils');

class LoginPage {
  constructor(page) {
    this.page = page;

    this.loginLink = 'a[href="/login"]';
    this.email = '[data-qa="login-email"]';
    this.password = '[data-qa="login-password"]';
    this.loginBtn = '[data-qa="login-button"]';
    this.logoutBtn = 'a[href="/logout"]';
    this.loggedText = 'text=Logged in as';
    this.errorText = 'text=Your email or password is incorrect!';
  }

  async openLogin() {
    await elementUtils.click(this.page, this.loginLink);
  }

  async login(email, password) {
    await elementUtils.type(this.page, this.email, email);
    await elementUtils.type(this.page, this.password, password);
    await elementUtils.click(this.page, this.loginBtn);
  }

  async logout() {
    await elementUtils.click(this.page, this.logoutBtn);
  }

  async verifyLogin() {
    await waitUtils.waitForElement(this.page, this.loggedText);
    await assertUtils.verifyVisible(this.page, this.loggedText);

    // 📸 screenshot on success
    await screenshotUtils.takeScreenshot(this.page, 'login_success');
  }

  async enterInvalidCredentials(email, password) {
    await elementUtils.type(this.page, this.email, email);
    await elementUtils.type(this.page, this.password, password);
  }

  async clickLogin() {
    await elementUtils.click(this.page, this.loginBtn);
  }

  async verifyErrorMessage() {
    await waitUtils.waitForElement(this.page, this.errorText);
    await assertUtils.verifyVisible(this.page, this.errorText);

    // 📸 screenshot on error
    await screenshotUtils.takeScreenshot(this.page, 'login_error');
  }
}

module.exports = LoginPage;