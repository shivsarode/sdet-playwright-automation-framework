
const elementUtils = require('../utils/elementUtils');
const waitUtils = require('../utils/waitUtils');
const assertUtils = require('../utils/assertUtils');

class ProductDetailsPage {
    constructor(page) {
        this.page = page;

        // Navigation
        this.productsLink = 'a[href="/products"]';

        // Products Section
        this.productsPageTitle = '.features_items';
        this.productsList = '.features_items';
        this.firstProductViewBtn = '(//a[contains(text(),"View Product")])[1]';

        // Product Details
        this.productName = '.product-information h2';
        this.productCategory = '.product-information p:has-text("Category")';
        this.productPrice = '.product-information span span';
        this.productAvailability = '.product-information p:has-text("Availability")';
        this.productCondition = '.product-information p:has-text("Condition")';
        this.productBrand = '.product-information p:has-text("Brand")';

        // Quantity & Cart
        this.quantityInput = '#quantity';
        this.addToCartBtn = 'button:has-text("Add to cart")';
        this.viewCartBtn = 'a:has-text("View Cart")';
        this.cartQuantity = '#cart_info_table tbody tr:first-child .cart_quantity button';
    }

    async navigateToProductsSection() {
        await elementUtils.click(this.page, this.productsLink);
        await waitUtils.waitForElement(this.page, this.productsPageTitle);
    }

    async verifyProductsListDisplayed() {
        await assertUtils.verifyVisible(this.page, this.productsList);
    }

    async selectFirstProduct() {
        await this.page.locator(this.firstProductViewBtn).click({ force: true });
        await waitUtils.waitForElement(this.page, this.productName);
    }

    async verifyProductDetailPageLoaded() {
        await waitUtils.waitForElement(this.page, this.productName);
    }

    async verifyCompleteProductInformation() {
        await assertUtils.verifyVisible(this.page, this.productName);
        await assertUtils.verifyVisible(this.page, this.productCategory);
        await assertUtils.verifyVisible(this.page, this.productPrice);
        await assertUtils.verifyVisible(this.page, this.productAvailability);
        await assertUtils.verifyVisible(this.page, this.productCondition);
        await assertUtils.verifyVisible(this.page, this.productBrand);
    }

    async setProductQuantity(quantity) {
        await this.page.locator(this.quantityInput).fill(String(quantity));
    }

    async addProductToCart() {
        await this.page.locator(this.addToCartBtn).click({ force: true });
        await waitUtils.waitForElement(this.page, this.viewCartBtn);
    }

    async openCart() {
        await elementUtils.click(this.page, this.viewCartBtn);
        await waitUtils.waitForElement(this.page, 'text=Shopping Cart');
    }

    async getCartQuantity() {
        return await this.page.locator(this.cartQuantity).innerText();
    }

    async getProductDetails() {
        const name = await this.page.textContent(this.productName);
        const category = await this.page.textContent(this.productCategory);
        const price = await this.page.textContent(this.productPrice);

        return {
            name: name?.trim(),
            category: category?.trim(),
            price: price?.trim()
        };
    }
}

module.exports = ProductDetailsPage;
