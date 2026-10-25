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
    this.deleteAccountBtn = 'a[href="/delete_account"]';
    this.loggedText = 'text=Logged in as';
    this.deleteAccountText = 'text=Account Deleted!';
    this.deleteAccountMessage = 'text=Your account has been permanently deleted!';
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

  async deleteAccount() {
    await elementUtils.click(this.page, this.deleteAccountBtn);
  }

  async verifyDeleteAccountSuccess() {
    await waitUtils.waitForElement(this.page, this.deleteAccountText);
    await assertUtils.verifyVisible(this.page, this.deleteAccountText);
    await assertUtils.verifyVisible(this.page, this.deleteAccountMessage);
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