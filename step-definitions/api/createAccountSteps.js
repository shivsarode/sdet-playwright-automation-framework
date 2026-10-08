const { When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const ApiClient = require('../../api/clients/apiClient');
const apiValidator = require('../../api/utils/apiValidator');
const accountTestData = require('../../api/test-data/accountTestData');

setDefaultTimeout(60000);

let apiClient;
let response;
let responseBody;
let responseTime;

async function sendCreateAccountRequest(payload) {
    apiClient = new ApiClient();
    await apiClient.init();

    const startTime = Date.now();

    response = await apiClient.post('/api/createAccount', {
        form: payload
    });

    responseTime = Date.now() - startTime;
    responseBody = await apiValidator.getResponseBody(response);

    console.log(
        `Create Account API | HTTP: ${response.status()} | Time: ${responseTime}ms | Response: ${JSON.stringify(responseBody)}`
    );
}

async function sendUserWithoutField(field) {
    const user = accountTestData.generateUser();
    delete user[field];

    await sendCreateAccountRequest(user);
}

When('user sends POST request to create account API with unique user data', async function () {
    accountTestData.currentUser = accountTestData.generateUser();
    await sendCreateAccountRequest(accountTestData.currentUser);
});

When('user sends POST request to create account API with existing user email', async function () {
    const user = accountTestData.generateUser();

    await sendCreateAccountRequest({
        ...user,
        email: accountTestData.currentUser.email
    });
});

When('user sends POST request to create account API without email', async function () {
    await sendUserWithoutField('email');
});

When('user sends POST request to create account API without password', async function () {
    await sendUserWithoutField('password');
});

When('user sends POST request to create account API without name', async function () {
    await sendUserWithoutField('name');
});

When('user sends POST request to create account API without first name', async function () {
    await sendUserWithoutField('firstname');
});

When('user sends POST request to create account API without last name', async function () {
    await sendUserWithoutField('lastname');
});

When('user sends POST request to create account API without country', async function () {
    await sendUserWithoutField('country');
});

When('user sends POST request to create account API without zipcode', async function () {
    await sendUserWithoutField('zipcode');
});

When('user sends POST request to create account API without mobile number', async function () {
    await sendUserWithoutField('mobile_number');
});

Then('create account API should return response code {int}', async function (expectedCode) {
    await apiValidator.verifyResponseCode(response, expectedCode);
});

Then('create account API should contain user created message', async function () {
    await apiValidator.verifyMessage(response, 'User created!');
});

Then('create account API should contain duplicate email message', async function () {
    await apiValidator.verifyMessage(response, 'Email already exists!');
});

Then('create account API should contain missing email message', async function () {
    await apiValidator.verifyMessage(
        response,
        'Bad request, email parameter is missing in POST request.'
    );
});

Then('create account API should contain missing password message', async function () {
    await apiValidator.verifyMessage(
        response,
        'Bad request, password parameter is missing in POST request.'
    );
});

Then('create account API should contain validation failure message', async function () {
    if (responseBody.responseCode !== 400) {
        throw new Error(
            `Expected validation responseCode 400 but received ${responseBody.responseCode}`
        );
    }

});

Then('create account API response time should be within {int} milliseconds', async function (maxTime) {
    await apiValidator.verifyResponseTime(responseTime, maxTime);
});