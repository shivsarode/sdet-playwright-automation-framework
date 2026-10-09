
const { When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const ApiClient = require('../../api/clients/apiClient');
const apiValidator = require('../../api/utils/apiValidator');
const requestData = require('../../api/utils/requestData');
const accountTestData = require('../../api/test-data/accountTestData');

setDefaultTimeout(60000);

let apiClient;
let response;
let responseBody;
let responseTime;

async function initClient() {
    apiClient = new ApiClient();
    await apiClient.init();
}

async function sendLoginRequest(payload) {
    await initClient();

    const startTime = Date.now();

    response = await apiClient.post('/api/verifyLogin', {
        form: payload
    });

    responseTime = Date.now() - startTime;
    responseBody = await apiValidator.getResponseBody(response);

    console.log(
        `Verify Login API | HTTP: ${response.status()} | Time: ${responseTime}ms | Response: ${JSON.stringify(responseBody)}`
    );
}

async function createTestUser() {
    const user = accountTestData.generateUser();

    const createResponse = await apiClient.post('/api/createAccount', {
        form: user
    });

    const createBody = await apiValidator.getResponseBody(createResponse);

    if (createBody.responseCode !== 201) {
        throw new Error(
            `Test user creation failed: ${JSON.stringify(createBody)}`
        );
    }

    return user;
}

When('user sends POST request to verify login API with invalid credentials',
    async function () {
        await sendLoginRequest(requestData.getInvalidLoginPayload());
    });

When('user sends POST request to verify login API without email parameter',
    async function () {
        await sendLoginRequest(requestData.getMissingEmailPayload());
    });

When('user sends DELETE request to verify login API',
    async function () {
        await initClient();

        response = await apiClient.delete('/api/verifyLogin');
        responseBody = await apiValidator.getResponseBody(response);

        console.log(
            `Verify Login DELETE | HTTP: ${response.status()} | Response: ${JSON.stringify(responseBody)}`
        );
    });

When('user creates an account and logs in with valid credentials',
    async function () {
        await initClient();

        const user = await createTestUser();

        const startTime = Date.now();

        response = await apiClient.post('/api/verifyLogin', {
            form: {
                email: user.email,
                password: user.password
            }
        });

        responseTime = Date.now() - startTime;
        responseBody = await apiValidator.getResponseBody(response);

        console.log(
            `Valid Login API | HTTP: ${response.status()} | Time: ${responseTime}ms | Response: ${JSON.stringify(responseBody)}`
        );
    });

Then('verify login API response status should be {int}',
    async function (expectedStatus) {
        await apiValidator.verifyStatus(response, expectedStatus);
    });

Then('verify login API response should contain user not found message',
    async function () {
        await apiValidator.verifyResponseCode(response, 404);
        await apiValidator.verifyMessage(response, 'User not found!');
    });

Then('verify login API response should contain missing parameter message',
    async function () {
        await apiValidator.verifyResponseCode(response, 400);
        await apiValidator.verifyMessage(
            response,
            'Bad request, email or password parameter is missing in POST request.'
        );
    });

Then('verify login API response should contain method not supported message',
    async function () {
        await apiValidator.verifyResponseCode(response, 405);
        await apiValidator.verifyMessage(
            response,
            'This request method is not supported.'
        );
    });

Then('verify login API should contain user exists message',
    async function () {
        await apiValidator.verifyResponseCode(response, 200);
        await apiValidator.verifyMessage(response, 'User exists!');
    });

Then('verify login API response content type should be {string}',
    async function (expectedType) {
        await apiValidator.verifyContentType(response, expectedType);
    });

Then('verify login API response should be received within {int} milliseconds',
    async function (maxTime) {
        await apiValidator.verifyResponseTime(responseTime, maxTime);
    });
