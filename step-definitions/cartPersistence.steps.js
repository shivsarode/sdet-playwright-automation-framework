const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

const ProductDetailsPage = require('../pages/ProductDetailsPage');

When('user records the cart product name and quantity', async function () {
    this.productDetailsPage = new ProductDetailsPage(this.page);
    this.expectedCartProduct = {
        name: await this.productDetailsPage.getCartProductName(),
        quantity: await this.productDetailsPage.getCartQuantity()
    };
});

When('user refreshes the page and returns to the cart if needed', async function () {
    await this.page.reload({ waitUntil: 'domcontentloaded' });
    await this.productDetailsPage.returnToCartIfNeeded();
});

Then('the same product and quantity should remain in the cart', async function () {
    expect(await this.productDetailsPage.getCartProductName()).toBe(
        this.expectedCartProduct.name
    );
    expect(await this.productDetailsPage.getCartQuantity()).toBe(
        this.expectedCartProduct.quantity
    );
});
