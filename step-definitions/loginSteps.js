const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');

const SignupPage = require('../pages/SignupPage');
const LoginPage = require('../pages/LoginPage');

const config = require('../config/env');
const logger = require('../utils/logger');

setDefaultTimeout(60000);

let signupPage, loginPage;
let email;

const password = "Test@123";

Given('user opens website', async function () {

    logger.info('Launching application');

    await this.page.goto(config.baseURL);

    signupPage = new SignupPage(this.page);
    loginPage = new LoginPage(this.page);

    email = `shivam${Date.now()}@mail.com`;

    logger.info(`Generated email: ${email}`);
});

When('user signs up with new email', async function () {

    logger.info('Opening signup page');

    await signupPage.openLogin();

    logger.info('Performing signup');

    await signupPage.signup('Shivam', email);

    logger.info('Signup completed');
});

When('user creates account', async function () {

    logger.info('Creating account with personal details');

    await signupPage.fillAccountDetails(password);

    logger.info('Account created successfully');
});

When('user logs out', async function () {

    logger.info('Logging out user');

    await loginPage.logout();

    logger.info('Logout successful');
});

When('user logs in with same credentials', async function () {

    logger.info('Opening login page');

    await loginPage.openLogin();

    logger.info('Logging in with created credentials');

    await loginPage.login(email, password);

    logger.info('Login action completed');
});

Then('user should be logged in successfully', async function () {

    logger.info('Verifying successful login');

    await loginPage.verifyLoginSuccess();

    logger.info('LOGIN SUCCESSFUL');
});