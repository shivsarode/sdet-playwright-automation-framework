const { expect } = require('@playwright/test');

class ApiValidator {

    async verifyStatus(response, expectedStatus) {
        expect(response.status()).toBe(expectedStatus);
    }

    async verifyResponseCode(response, expectedCode) {
        const body = await response.json();
        expect(body.responseCode).toBe(expectedCode);
    }

    async verifyMessage(response, expectedMessage) {
        const body = await response.json();
        expect(body.message).toBe(expectedMessage);
    }

    async getResponseBody(response) {
        return await response.json();
    }

    async verifyFieldExists(body, fieldName) {
        expect(body).toHaveProperty(fieldName);
    }

    async verifyArray(body, fieldName) {
        expect(body[fieldName]).toBeInstanceOf(Array);
    }

    async verifyArrayNotEmpty(body, fieldName) {
        expect(body[fieldName].length).toBeGreaterThan(0);
    }

    async verifyObjectFields(object, fields) {
        fields.forEach(field => expect(object).toHaveProperty(field));
    }

    async verifyContentType(response, expectedType = 'application/json') {
        expect(response.headers()['content-type']).toContain(expectedType);
    }

    async verifyResponseTime(responseTime, maxTime = 3000) {
        expect(responseTime).toBeLessThanOrEqual(maxTime);
    }
}

module.exports = new ApiValidator();