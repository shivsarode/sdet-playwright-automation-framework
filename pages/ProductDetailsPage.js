
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
        this.firstProductViewBtn =
            '(//a[contains(text(),"View Product")])[1]';

        // Product Details
        this.productName = '.product-information h2';
        this.productCategory =
            '.product-information p:has-text("Category")';
        this.productPrice = '.product-information span span';
        this.productAvailability =
            '.product-information p:has-text("Availability")';
        this.productCondition =
            '.product-information p:has-text("Condition")';
        this.productBrand =
            '.product-information p:has-text("Brand")';

        // Quantity & Cart
        this.quantityInput = '#quantity';
        this.addToCartBtn = 'button:has-text("Add to cart")';
        this.viewCartBtn = '.modal.show a[href="/view_cart"]';
        this.cartProductName =
            '#cart_info_table tbody tr:first-child .cart_description h4 a';
        this.cartQuantity =
            '#cart_info_table tbody tr:first-child .cart_quantity button';
    }

    // Navigate to Products section
    async navigateToProductsSection() {
        await elementUtils.click(this.page, this.productsLink);

        await waitUtils.waitForElement(
            this.page,
            this.productsPageTitle
        );
    }

    // Verify products list is displayed
    async verifyProductsListDisplayed() {
        await assertUtils.verifyVisible(
            this.page,
            this.productsList
        );
    }

    // Select first product
    async selectFirstProduct() {
        await elementUtils.click(
            this.page,
            this.firstProductViewBtn
        );

        await this.page
            .waitForLoadState('domcontentloaded')
            .catch(() => {});

        await waitUtils.waitForElement(
            this.page,
            this.productName
        );
    }

    // Verify Product Details page is loaded
    async verifyProductDetailPageLoaded() {
        await waitUtils.waitForElement(
            this.page,
            this.productName
        );
    }

    // Verify all product information
    async verifyCompleteProductInformation() {
        await assertUtils.verifyVisible(
            this.page,
            this.productName
        );

        await assertUtils.verifyVisible(
            this.page,
            this.productCategory
        );

        await assertUtils.verifyVisible(
            this.page,
            this.productPrice
        );

        await assertUtils.verifyVisible(
            this.page,
            this.productAvailability
        );

        await assertUtils.verifyVisible(
            this.page,
            this.productCondition
        );

        await assertUtils.verifyVisible(
            this.page,
            this.productBrand
        );
    }

    // Set product quantity
    async setProductQuantity(quantity) {
        await this.page
            .locator(this.quantityInput)
            .fill(String(quantity));
    }

    // Add product to cart
    async addProductToCart() {
        await this.page
            .locator(this.addToCartBtn)
            .click({ force: true });

        await waitUtils.waitForElement(
            this.page,
            this.viewCartBtn
        );
    }

    // Open cart from modal
    async openCart() {
        const viewCart = await elementUtils.getVisibleLocator(
            this.page,
            this.viewCartBtn,
            ['a[href="/view_cart"]:visible']
        );

        await viewCart.click();

        await waitUtils.waitForElement(
            this.page,
            'text=Shopping Cart'
        );
    }

    // Get cart quantity
    async getCartQuantity() {
        return (
            await this.page
                .locator(this.cartQuantity)
                .innerText()
        ).trim();
    }

    // Get cart product name
    async getCartProductName() {
        return (
            await this.page
                .locator(this.cartProductName)
                .innerText()
        ).trim();
    }

    // Return to cart if not already there
    async returnToCartIfNeeded() {
        if (new URL(this.page.url()).pathname !== '/view_cart') {
            await elementUtils.click(
                this.page,
                'a[href="/view_cart"]'
            );
        }

        await waitUtils.waitForElement(
            this.page,
            '#cart_info_table tbody tr:first-child'
        );
    }

    // Get basic product details
    async getProductDetails() {
        const name = await this.page.textContent(
            this.productName
        );

        const category = await this.page.textContent(
            this.productCategory
        );

        const price = await this.page.textContent(
            this.productPrice
        );

        return {
            name: name?.trim(),
            category: category?.trim(),
            price: price?.trim()
        };
    }
}

module.exports = ProductDetailsPage;
