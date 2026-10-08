const { When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const ApiClient = require('../../api/clients/apiClient');
const apiValidator = require('../../api/utils/apiValidator');
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

async function createTestUser() {
    const user = accountTestData.generateUser();

    const createResponse = await apiClient.post('/api/createAccount', {
        form: user
    });

    const body = await createResponse.json();

    if (body.responseCode !== 201) {
        throw new Error(`User creation failed: ${JSON.stringify(body)}`);
    }

    return user;
}

async function getUserDetails(email) {
    const startTime = Date.now();

    response = await apiClient.get('/api/getUserDetailByEmail', {
        params: { email }
    });

    responseTime = Date.now() - startTime;
    responseBody = await apiValidator.getResponseBody(response);
}

When('user sends GET request to get user detail API with valid email',
    async function () {
        await initClient();
        const user = await createTestUser();
        await getUserDetails(user.email);
    });

When('user sends GET request to get user detail API with invalid email',
    async function () {
        await initClient();
        await getUserDetails('invaliduser@example.com');
    });

When('user sends GET request to get user detail API without email',
    async function () {
        await initClient();
        response = await apiClient.get('/api/getUserDetailByEmail');
        responseBody = await apiValidator.getResponseBody(response);
    });

When('user sends GET request to get user detail API with empty email',
    async function () {
        await initClient();
        await getUserDetails('');
    });

Then('get user detail API should return response code {int}',
    async function (expectedCode) {
        await apiValidator.verifyResponseCode(response, expectedCode);
    });

Then('get user detail API should contain valid user details',
    async function () {
        await apiValidator.verifyResponseCode(response, 200);
        await apiValidator.verifyFieldExists(responseBody, 'user');
    });

Then('get user detail API should contain required user fields',
    async function () {
        await apiValidator.verifyObjectFields(responseBody.user, [
            'id',
            'name',
            'email',
            'title',
            'birth_day',
            'birth_month',
            'birth_year',
            'first_name',
            'last_name',
            'company',
            'address1',
            'country',
            'zipcode',
            'state',
            'city'
        ]);
    });

Then('get user detail API response should be received within {int} milliseconds',
    async function (maxTime) {
        await apiValidator.verifyResponseTime(responseTime, maxTime);
    });

Then('get user detail API should return the actual error response',
    async function () {
        if (!responseBody.responseCode && !responseBody.message) {
            throw new Error(
                `Unexpected error response: ${JSON.stringify(responseBody)}`
            );
        }
    });