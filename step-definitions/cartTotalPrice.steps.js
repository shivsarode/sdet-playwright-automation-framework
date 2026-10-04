const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

const ProductPage = require('../pages/ProductPage');

When('user adds a product to the cart for price verification', async function () {
    this.productPage = new ProductPage(this.page);

    await this.productPage.addFirstProduct();
});

When('user opens the cart for price verification', async function () {
    await this.productPage.goToCart();
});

Then('the product price should be displayed', async function () {
    const price = await this.productPage.getProductPrice();

    expect(price).toMatch(/^Rs\.\s*\d+$/);
});

Then('the product quantity should be displayed', async function () {
    const quantity = await this.productPage.getProductQuantity();

    expect(quantity).toBe('1');
});

Then('the total price should be calculated correctly', async function () {
    const price = await this.productPage.getProductPrice();
    const quantity = await this.productPage.getProductQuantity();
    const total = await this.productPage.getProductTotal();

    const productPrice = Number(price.replace('Rs.', '').trim());
    const productQuantity = Number(quantity);
    const totalPrice = Number(total.replace('Rs.', '').trim());

    expect(totalPrice).toBe(productPrice * productQuantity);
});