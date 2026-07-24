const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');

const ProductDetailsPage = require('../pages/ProductDetailsPage');
const config = require('../config/env');
const logger = require('../utils/logger');

setDefaultTimeout(60000);

let productPage;

Given('user launches the application', async function () {

    logger.info('Launching Automation Exercise application');

    productPage = new ProductDetailsPage(this.page);

    await this.page.goto(config.baseURL);

    await this.page.waitForLoadState('networkidle');

    logger.info(`Application launched: ${await this.page.url()}`);
});

When('user navigates to the products section', async function () {

    logger.info('Navigating to Products page');

    await productPage.navigateToProductsSection();

    logger.info(`Current URL: ${await this.page.url()}`);
});

When('user verifies the products list is displayed', async function () {

    logger.info('Verifying products list');

    await productPage.verifyProductsListDisplayed();

    logger.info('Products list verified successfully');
});

When('user selects the first product to view details', async function () {

    logger.info('Opening first product details');

    await productPage.selectFirstProduct();

    logger.info(`Current URL: ${await this.page.url()}`);
});

Then('user should see complete product information', async function () {

    logger.info('Verifying Product Details page');

    await productPage.verifyProductDetailPageLoaded();

    await productPage.verifyCompleteProductInformation();

    logger.info('Product details verified successfully');

    console.log('🔥 Product Details Page verified successfully');
});