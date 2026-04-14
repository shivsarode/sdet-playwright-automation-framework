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
    await this.page.click(this.loginLink);
  }

  async login(email, password) {
    await this.page.fill(this.email, email);
    await this.page.fill(this.password, password);
    await this.page.click(this.loginBtn);
  }

  async logout() {
    await this.page.click(this.logoutBtn);
  }

  async verifyLogin() {
    await this.page.waitForSelector(this.loggedText);
  }

  async enterInvalidCredentials(email, password) {
    await this.page.fill(this.email, email);
    await this.page.fill(this.password, password);
  }

  async clickLogin() {
    await this.page.click(this.loginBtn);
  }

  async verifyErrorMessage() {
    await this.page.waitForSelector(this.errorText);
  }
}

module.exports = LoginPage;