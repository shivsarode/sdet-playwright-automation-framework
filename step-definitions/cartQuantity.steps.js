const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

const ProductDetailsPage = require('../pages/ProductDetailsPage');

When('user sets the product quantity to 2', async function () {
    this.productDetailsPage = new ProductDetailsPage(this.page);

    await this.productDetailsPage.setProductQuantity(2);
});

When('user adds the product to the cart', async function () {
    await this.productDetailsPage.addProductToCart();
});

When('user opens the cart', async function () {
    await this.productDetailsPage.openCart();
});

Then('the product quantity should be 2', async function () {
    const quantity = await this.productDetailsPage.getCartQuantity();

    expect(quantity).toBe('2');
});