const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

setDefaultTimeout(60000);

let browser, page;

// invalid credentials
const invalidEmail = `wrong${Date.now()}@mail.com`;
const invalidPassword = "WrongPass@123";

// OPEN APP
Given('user navigates to the application', async function () {
  browser = await chromium.launch({ headless: true });
  page = await browser.newPage();
  await page.goto('https://automationexercise.com');
});

// GO TO LOGIN PAGE
When('user navigates to login screen', async function () {
  await page.click('a[href="/login"]');
});

// ENTER WRONG CREDENTIALS
When('user submits incorrect email and password', async function () {
  await page.fill('[data-qa="login-email"]', invalidEmail);
  await page.fill('[data-qa="login-password"]', invalidPassword);
});

// CLICK LOGIN
When('user attempts to login', async function () {
  await page.click('[data-qa="login-button"]');
});

// VERIFY ERROR
Then('system should display authentication error message', async function () {
  await page.waitForSelector('text=Your email or password is incorrect!');
  console.log("🔥 ERROR MESSAGE VERIFIED");

  await browser.close();
});