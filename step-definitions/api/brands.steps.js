const { When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const ApiClient = require('../../api/clients/apiClient');
const apiValidator = require('../../api/utils/apiValidator');
const schemaValidator = require('../../api/utils/schemaValidator');
const brandSchema = require('../../api/schemas/brandSchema');

setDefaultTimeout(60000);

let apiClient, response, responseBody, responseTime;

When('user sends GET request to all brands API', async function () {
    apiClient = new ApiClient();
    await apiClient.init();

    const startTime = Date.now();
    response = await apiClient.get('/api/brandsList');
    responseTime = Date.now() - startTime;

    responseBody = await apiValidator.getResponseBody(response);
    console.log(`Brands API Status: ${response.status()} | Response Time: ${responseTime}ms`);
});

Then('brands API response status should be {int}', async function (expectedStatus) {
    await apiValidator.verifyStatus(response, expectedStatus);
});

Then('brands API response should contain brands', async function () {
    await apiValidator.verifyResponseCode(response, 200);
    await apiValidator.verifyFieldExists(responseBody, 'brands');
    await apiValidator.verifyArray(responseBody, 'brands');
    await apiValidator.verifyArrayNotEmpty(responseBody, 'brands');
});

Then('brands API response should contain valid brand details', async function () {
    const brand = responseBody.brands[0];
    schemaValidator.validate(brand, brandSchema);
    await apiValidator.verifyObjectFields(brand, ['id', 'brand']);
    console.log(`Brand Schema Validation: PASSED | Brand: ${brand.brand}`);
});

Then('brands API response content type should be {string}', async function (expectedType) {
    await apiValidator.verifyContentType(response, expectedType);
});

Then('brands API response should be received within {int} milliseconds', async function (maxTime) {
    await apiValidator.verifyResponseTime(responseTime, maxTime);
});