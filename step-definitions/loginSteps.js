const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const SignupPage = require('../pages/SignupPage');
const LoginPage = require('../pages/LoginPage');

setDefaultTimeout(60000);

let signupPage, loginPage;

// dynamic data
const email = `shivam${Date.now()}@mail.com`;
const password = "Test@123";

Given('user opens website', async function () {
  await this.page.goto('https://automationexercise.com');

  signupPage = new SignupPage(this.page);
  loginPage = new LoginPage(this.page);
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
  await loginPage.verifyLogin();
  console.log("🔥 LOGIN SUCCESSFUL");
});