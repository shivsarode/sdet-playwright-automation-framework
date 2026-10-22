const { When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const ApiClient = require('../../api/clients/apiClient');
const apiValidator = require('../../api/utils/apiValidator');
const accountTestData = require('../../api/test-data/accountTestData');

setDefaultTimeout(60000);

let apiClient;
let response;

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

async function updateAccount(payload) {
    response = await apiClient.put('/api/updateAccount', {
        form: payload
    });
}

When('user sends PUT request to update account API with valid user data',
    async function () {
        await initClient();
        const user = await createTestUser();
        user.city = 'Mumbai';
        user.state = 'Maharashtra';
        await updateAccount(user);
    });

When('user sends PUT request to update account API with invalid credentials',
    async function () {
        await initClient();
        const user = accountTestData.generateUser();
        await updateAccount({
            ...user,
            email: 'invaliduser@example.com',
            password: 'Invalid@12345'
        });
    });

When('user sends PUT request to update account API without email',
    async function () {
        await initClient();
        const user = accountTestData.generateUser();
        delete user.email;
        await updateAccount(user);
    });

When('user sends PUT request to update account API without password',
    async function () {
        await initClient();
        const user = accountTestData.generateUser();
        delete user.password;
        await updateAccount(user);
    });

Then('update account API should return response code {int}',
    async function (expectedCode) {
        await apiValidator.verifyResponseCode(response, expectedCode);
    });

Then('update account API should contain account updated message',
    async function () {
        await apiValidator.verifyMessage(response, 'User updated!');
    });

Then('update account API should contain account not found message',
    async function () {
        await apiValidator.verifyResponseCode(response, 404);
    });

Then('update account API should contain missing email message',
    async function () {
        await apiValidator.verifyResponseCode(response, 400);
    });

Then('update account API should contain missing password message',
    async function () {
        await apiValidator.verifyResponseCode(response, 400);
    });