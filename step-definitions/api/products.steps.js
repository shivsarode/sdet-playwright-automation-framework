const { When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const ApiClient = require('../../api/clients/apiClient');
const apiValidator = require('../../api/utils/apiValidator');
const schemaValidator = require('../../api/utils/schemaValidator');
const productSchema = require('../../api/schemas/productSchema');

setDefaultTimeout(60000);

let apiClient, response, responseBody, responseTime;

When('user sends GET request to all products API', async function () {
    apiClient = new ApiClient();
    await apiClient.init();

    const startTime = Date.now();
    response = await apiClient.get('/api/productsList');
    responseTime = Date.now() - startTime;

    responseBody = await apiValidator.getResponseBody(response);
    console.log(`Products API Status: ${response.status()} | Response Time: ${responseTime}ms`);
});

Then('products API response status should be {int}', async function (expectedStatus) {
    await apiValidator.verifyStatus(response, expectedStatus);
});

Then('products API response should contain products', async function () {
    await apiValidator.verifyResponseCode(response, 200);
    await apiValidator.verifyFieldExists(responseBody, 'products');
    await apiValidator.verifyArray(responseBody, 'products');
    await apiValidator.verifyArrayNotEmpty(responseBody, 'products');
});

Then('products API response should contain valid product details', async function () {
    const product = responseBody.products[0];
    schemaValidator.validate(product, productSchema);
    await apiValidator.verifyObjectFields(product, ['id', 'name', 'price', 'brand', 'category']);
    console.log(`Product Schema Validation: PASSED | Product: ${product.name}`);
});

Then('products API response content type should be {string}', async function (expectedType) {
    await apiValidator.verifyContentType(response, expectedType);
});

Then('products API response should be received within {int} milliseconds', async function (maxTime) {
    await apiValidator.verifyResponseTime(responseTime, maxTime);
});