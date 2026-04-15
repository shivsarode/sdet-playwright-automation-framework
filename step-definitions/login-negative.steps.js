const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const LoginPage = require('../pages/LoginPage');
const { baseURL } = require('../config/env');
const data = require('../test-data/loginData.json');

setDefaultTimeout(60000);

let loginPage;

// OPEN APP
Given('user navigates to the application', async function () {
  await this.page.goto(baseURL);
  loginPage = new LoginPage(this.page);
});

// GO TO LOGIN PAGE
When('user navigates to login screen', async function () {
  await loginPage.openLogin();
});

// ENTER WRONG CREDENTIALS
When('user submits incorrect email and password', async function () {
  await loginPage.login(
    data.invalidUser.email,
    data.invalidUser.password
  );
});

// VERIFY ERROR
Then('system should display authentication error message', async function () {
  await loginPage.verifyLoginError();
  console.log("🔥 ERROR MESSAGE VERIFIED");
});