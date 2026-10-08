const authTestData = require('../test-data/authTestData');

class RequestData {

    getValidLoginPayload() {
        return {
            email: authTestData.validUser.email,
            password: authTestData.validUser.password
        };
    }

    getInvalidLoginPayload() {
        return {
            email: authTestData.invalidUser.email,
            password: authTestData.invalidUser.password
        };
    }

    getMissingEmailPayload() {
        return {
            password: authTestData.missingEmailUser.password
        };
    }

    getInvalidCredentials() {
        return {
            email: 'invaliduser@example.com',
            password: 'Invalid@12345'
        };
    }
}

module.exports = new RequestData();