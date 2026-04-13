const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

setDefaultTimeout(60000); // IMPORTANT FIX
let browser, page;

// dynamic user data
const email = `shivam${Date.now()}@mail.com`;
const password = "Test@123";

Given('user opens website', async function () {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  await page.goto('https://automationexercise.com');
});

// CLICK SIGNUP / LOGIN
When('user signs up with new email', async function () {
  await page.click('a[href="/login"]');
  await page.fill('[data-qa="signup-name"]', 'Shivam');
  await page.fill('[data-qa="signup-email"]', email);
  await page.click('[data-qa="signup-button"]');
});

// CREATE ACCOUNT FULL FORM
When('user creates account', async function () {
  await page.click('#id_gender1');
  await page.fill('#password', password);

  await page.selectOption('#days', '10');
  await page.selectOption('#months', '5');
  await page.selectOption('#years', '1995');

  await page.check('#newsletter');
  await page.check('#optin');

  await page.fill('#first_name', 'Shivam');
  await page.fill('#last_name', 'Sarode');
  await page.fill('#address1', 'Pune');
  await page.selectOption('#country', 'India');
  await page.fill('#state', 'MH');
  await page.fill('#city', 'Pune');
  await page.fill('#zipcode', '411001');
  await page.fill('#mobile_number', '9999999999');

  await page.click('[data-qa="create-account"]');
  await page.click('[data-qa="continue-button"]');
});

// LOGOUT
When('user logs out', async function () {
  await page.click('a[href="/logout"]');
});

// LOGIN AGAIN
When('user logs in with same credentials', async function () {
  await page.click('a[href="/login"]');
  await page.fill('[data-qa="login-email"]', email);
  await page.fill('[data-qa="login-password"]', password);
  await page.click('[data-qa="login-button"]');
});

// VERIFY LOGIN
Then('user should be logged in successfully', async function () {
  await page.waitForSelector('text=Logged in as');
  console.log("🔥 LOGIN SUCCESSFUL");
  await browser.close();
});