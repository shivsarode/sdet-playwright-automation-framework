const { When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const ApiClient = require('../../api/clients/apiClient');
const apiValidator = require('../../api/utils/apiValidator');

setDefaultTimeout(60000);

let apiClient;
let response;
let responseBody;
let responseTime;

async function sendProductsListRequest() {
    apiClient = new ApiClient();
    await apiClient.init();

    const startTime = Date.now();

    response = await apiClient.post('/api/productsList');

    responseTime = Date.now() - startTime;
    responseBody = await apiValidator.getResponseBody(response);

    console.log(
        `POST Products List API | HTTP: ${response.status()} | Time: ${responseTime}ms | Response: ${JSON.stringify(responseBody)}`
    );
}

When('user sends POST request to products list API',
    async function () {
        await sendProductsListRequest();
    });

Then('products list API response status should be {int}',
    async function (expectedStatus) {
        await apiValidator.verifyStatus(response, expectedStatus);
    });

Then('products list API should return response code {int}',
    async function (expectedCode) {
        await apiValidator.verifyResponseCode(response, expectedCode);
    });

Then('products list API should return method not supported response',
    async function () {
        await apiValidator.verifyResponseCode(response, 405);
        await apiValidator.verifyMessage(
            response,
            'This request method is not supported.'
        );
    });

Then('products list API should contain method not supported message',
    async function () {
        await apiValidator.verifyMessage(
            response,
            'This request method is not supported.'
        );
    });

Then('products list API response content type should be {string}',
    async function (expectedType) {
        await apiValidator.verifyContentType(response, expectedType);
    });

Then('products list API response should be received within {int} milliseconds',
    async function (maxTime) {
        await apiValidator.verifyResponseTime(responseTime, maxTime);
    });

Then('products list API should return the actual error response',
    async function () {
        if (!responseBody.responseCode && !responseBody.message) {
            throw new Error(
                `Unexpected error response: ${JSON.stringify(responseBody)}`
            );
        }

        console.log(
            `Actual Error Response: ${JSON.stringify(responseBody)}`
        );
    });