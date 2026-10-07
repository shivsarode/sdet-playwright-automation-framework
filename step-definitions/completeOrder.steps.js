const {
  Given,
  When,
  Then,
  setDefaultTimeout
} = require('@cucumber/cucumber');

const SignupPage = require('../pages/SignupPage');
const LoginPage = require('../pages/LoginPage');
const ProductDetailsPage = require('../pages/ProductDetailsPage');
const ProductPage = require('../pages/ProductPage');

const config = require('../config/env');
const fakerUtils = require('../utils/fakerUtils');

setDefaultTimeout(60000);

let signupPage;
let loginPage;
let productDetailsPage;

Given('user logs in successfully', async function () {
  const user = fakerUtils.generateUser();

  await this.page.goto(config.baseURL, {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  signupPage = new SignupPage(this.page);
  loginPage = new LoginPage(this.page);

  await signupPage.openLogin();
  await signupPage.signup(user.name, user.email);
  await signupPage.fillAccountDetails(user.password);
  await signupPage.verifyAccountCreated();
  await signupPage.clickContinue();

  await loginPage.verifyLoginSuccess();
  await loginPage.logout();

  await loginPage.openLogin();
  await loginPage.login(user.email, user.password);
  await loginPage.verifyLoginSuccess();

  this.productPage = new ProductPage(this.page);
});

When('user opens the searched product', async function () {
  productDetailsPage = new ProductDetailsPage(this.page);

  await productDetailsPage.selectFirstProduct();
  await productDetailsPage.verifyProductDetailPageLoaded();
});

Then('the product should be displayed with correct quantity and price', async function () {
  const quantity = await productDetailsPage.getCartQuantity();

  if (quantity !== '2') {
    throw new Error(
      `Expected product quantity to be 2, but found ${quantity}`
    );
  }

  console.log('PRODUCT CART VALIDATION SUCCESSFUL');
});