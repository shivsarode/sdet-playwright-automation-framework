const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const LoginPage = require('../pages/LoginPage');
const { loadFixture } = require('../utils/fixtureLoader');

setDefaultTimeout(60000);

let loginPage;

const config = loadFixture("config.json");
const users = loadFixture("users.json");

Given('user navigates to the application', async function () {
  await this.page.goto(config.baseUrl);
  loginPage = new LoginPage(this.page);
});

When('user navigates to login screen', async function () {
  await loginPage.openLogin();
});

When('user submits incorrect email and password', async function () {
  await loginPage.login(
    users.invalidUser1.email,
    users.invalidUser1.password
  );
});

Then('system should display authentication error message', async function () {
  await loginPage.verifyLoginError();
  console.log("🔥 ERROR MESSAGE VERIFIED");
});