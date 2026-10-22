const { When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const ApiClient = require('../../api/clients/apiClient');
const apiValidator = require('../../api/utils/apiValidator');
const accountTestData = require('../../api/test-data/accountTestData');

setDefaultTimeout(60000);

let apiClient;
let response;

async function createTestUser() {
    const user = accountTestData.generateUser();

    apiClient = new ApiClient();
    await apiClient.init();

    const createResponse = await apiClient.post('/api/createAccount', {
        form: user
    });

    const createBody = await createResponse.json();

    if (createBody.responseCode !== 201) {
        throw new Error(
            `Test user creation failed: ${JSON.stringify(createBody)}`
        );
    }

    return user;
}

async function sendDeleteAccountRequest(payload) {
    response = await apiClient.delete('/api/deleteAccount', {
        form: payload
    });
}

When('user sends DELETE request to delete account API with valid credentials',
    async function () {
        const user = await createTestUser();

        await sendDeleteAccountRequest({
            email: user.email,
            password: user.password
        });
    });

When('user sends DELETE request to delete account API with invalid credentials',
    async function () {
        apiClient = new ApiClient();
        await apiClient.init();

        await sendDeleteAccountRequest({
            email: 'invaliduser@example.com',
            password: 'Invalid@12345'
        });
    });

When('user sends DELETE request to delete account API without email',
    async function () {
        apiClient = new ApiClient();
        await apiClient.init();

        const user = accountTestData.generateUser();

        await sendDeleteAccountRequest({
            password: user.password
        });
    });

When('user sends DELETE request to delete account API without password',
    async function () {
        apiClient = new ApiClient();
        await apiClient.init();

        const user = accountTestData.generateUser();

        await sendDeleteAccountRequest({
            email: user.email
        });
    });

Then('delete account API should return response code {int}',
    async function (expectedCode) {
        await apiValidator.verifyResponseCode(response, expectedCode);
    });

Then('delete account API should contain account deleted message',
    async function () {
        await apiValidator.verifyMessage(response, 'Account deleted!');
    });

Then('delete account API should contain account not found message',
    async function () {
        await apiValidator.verifyMessage(response, 'Account not found!');
    });

Then('delete account API should contain missing email message',
    async function () {
        await apiValidator.verifyMessage(
            response,
            'Bad request, email parameter is missing in DELETE request.'
        );
    });

Then('delete account API should contain missing password message',
    async function () {
        await apiValidator.verifyMessage(
            response,
            'Bad request, password parameter is missing in DELETE request.'
        );
    });