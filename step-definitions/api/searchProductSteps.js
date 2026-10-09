const { When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const ApiClient = require('../../api/clients/apiClient');
const apiValidator = require('../../api/utils/apiValidator');
const schemaValidator = require('../../api/utils/schemaValidator');
const productSchema = require('../../api/schemas/productSchema');

setDefaultTimeout(60000);

let apiClient;
let response;
let responseBody;
let responseTime;

When('user sends POST request to search product API with {string}', async function (searchProduct) {
    apiClient = new ApiClient();
    await apiClient.init();

    const startTime = Date.now();

    response = await apiClient.post('/api/searchProduct', {
        form: {
            search_product: searchProduct
        }
    });

    responseTime = Date.now() - startTime;
    responseBody = await apiValidator.getResponseBody(response);

    console.log(`Search Product API | Status: ${response.status()} | Response Time: ${responseTime}ms`);
});

When('user sends POST request to search product API without search parameter',
    async function () {
        apiClient = new ApiClient();
        await apiClient.init();

        const startTime = Date.now();

        response = await apiClient.post('/api/searchProduct', {
            form: {}
        });

        responseTime = Date.now() - startTime;
        responseBody = await apiValidator.getResponseBody(response);

        console.log(
            `Search Product Negative API | HTTP: ${response.status()} | Time: ${responseTime}ms | Response: ${JSON.stringify(responseBody)}`
        );
    });

Then('search product API response status should be {int}', async function (expectedStatus) {
    await apiValidator.verifyStatus(response, expectedStatus);
});

Then('search product API response should contain searched products', async function () {
    await apiValidator.verifyResponseCode(response, 200);
    await apiValidator.verifyFieldExists(responseBody, 'products');
    await apiValidator.verifyArray(responseBody, 'products');
    await apiValidator.verifyArrayNotEmpty(responseBody, 'products');
});

Then('search product API response should contain valid product details', async function () {
    const product = responseBody.products[0];

    schemaValidator.validate(product, productSchema);
    await apiValidator.verifyObjectFields(product, [
        'id',
        'name',
        'price',
        'brand',
        'category'
    ]);

    console.log(`Product Schema Validation: PASSED | Product: ${product.name}`);
});

Then('search product API response content type should be {string}', async function (expectedType) {
    await apiValidator.verifyContentType(response, expectedType);
});

Then('search product API response should be received within {int} milliseconds', async function (maxTime) {
    await apiValidator.verifyResponseTime(responseTime, maxTime);
});

Then('search product API should return the actual error response',
    async function () {
        console.log(
            `Actual Search Product Error Response: ${JSON.stringify(responseBody)}`
        );

        if (!responseBody.responseCode && !responseBody.message) {
            throw new Error(
                `Unexpected error response: ${JSON.stringify(responseBody)}`
            );
        }
    });