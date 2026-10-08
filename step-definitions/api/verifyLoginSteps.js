const { When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const ApiClient = require('../../api/clients/apiClient');
const apiValidator = require('../../api/utils/apiValidator');
const requestData = require('../../api/utils/requestData');

setDefaultTimeout(60000);

let apiClient;
let response;
let responseBody;

async function sendLoginRequest(payload) {
    apiClient = new ApiClient();
    await apiClient.init();

    response = await apiClient.post('/api/verifyLogin', {
        form: payload
    });

    responseBody = await apiValidator.getResponseBody(response);

    console.log(
        `Verify Login API | HTTP Status: ${response.status()} | Response: ${JSON.stringify(responseBody)}`
    );
}

When('user sends POST request to verify login API with invalid credentials', async function () {
    await sendLoginRequest(requestData.getInvalidLoginPayload());
});

When('user sends POST request to verify login API without email parameter', async function () {
    await sendLoginRequest(requestData.getMissingEmailPayload());
});

When('user sends DELETE request to verify login API', async function () {
    apiClient = new ApiClient();
    await apiClient.init();

    response = await apiClient.delete('/api/verifyLogin');
    responseBody = await apiValidator.getResponseBody(response);

    console.log(
        `Verify Login DELETE | HTTP Status: ${response.status()} | Response: ${JSON.stringify(responseBody)}`
    );
});

Then('verify login API response status should be {int}', async function (expectedStatus) {
    await apiValidator.verifyStatus(response, expectedStatus);
});

Then('verify login API response should contain user not found message', async function () {
    await apiValidator.verifyResponseCode(response, 404);
    await apiValidator.verifyMessage(response, 'User not found!');
});

Then('verify login API response should contain missing parameter message', async function () {
    await apiValidator.verifyResponseCode(response, 400);
    await apiValidator.verifyMessage(
        response,
        'Bad request, email or password parameter is missing in POST request.'
    );
});

Then('verify login API response should contain method not supported message', async function () {
    await apiValidator.verifyResponseCode(response, 405);
    await apiValidator.verifyMessage(response, 'This request method is not supported.');
});