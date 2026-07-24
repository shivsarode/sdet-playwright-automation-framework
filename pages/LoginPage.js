const elementUtils = require('../utils/elementUtils');
const waitUtils = require('../utils/waitUtils');
const assertUtils = require('../utils/assertUtils');

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

  async verifyLoginSuccess() {
    await waitUtils.waitForElement(this.page, this.loggedText);
    await assertUtils.verifyVisible(this.page, this.loggedText);
  }

  async verifyLoginError() {
    await waitUtils.waitForElement(this.page, this.errorText);
    await assertUtils.verifyVisible(this.page, this.errorText);
  }
}

module.exports = LoginPage;