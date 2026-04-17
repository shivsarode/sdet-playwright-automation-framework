const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const SignupPage = require('../pages/SignupPage');
const LoginPage = require('../pages/LoginPage');
const { baseURL } = require('../config/env');

setDefaultTimeout(60000);

let signupPage, loginPage;

// dynamic data (declared first, assigned later)
let email;
const password = "Test@123";

Given('user opens website', async function () {
  await this.page.goto(baseURL);

  signupPage = new SignupPage(this.page);
  loginPage = new LoginPage(this.page);

  // assign dynamic email here (better control + per scenario freshness)
  email = `shivam${Date.now()}@mail.com`;
});

When('user signs up with new email', async function () {
  await signupPage.openLogin();
  await signupPage.signup('Shivam', email);
});

When('user creates account', async function () {
  await signupPage.fillAccountDetails(password);
});

When('user logs out', async function () {
  await loginPage.logout();
});

When('user logs in with same credentials', async function () {
  await loginPage.openLogin();
  await loginPage.login(email, password);
});

Then('user should be logged in successfully', async function () {
  await loginPage.verifyLoginSuccess();
  console.log("🔥 LOGIN SUCCESSFUL");
});