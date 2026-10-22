
const { expect } = require('@playwright/test');

class ApiValidator {
    async verifyStatus(response, expectedStatus) {
        this.ensureResponse(response);
        expect(response.status()).toBe(expectedStatus);
    }

    async verifyResponseCode(response, expectedCode) {
        const body = await this.getResponseBody(response);
        expect(body).toHaveProperty('responseCode', expectedCode);
    }

    async verifyMessage(response, expectedMessage) {
        const body = await this.getResponseBody(response);
        expect(body).toHaveProperty('message', expectedMessage);
    }

    async getResponseBody(response) {
        this.ensureResponse(response);

        try {
            return await response.json();
        } catch (error) {
            const status = response.status();
            const contentType =
                response.headers()['content-type'] || 'unknown';

            throw new Error(
                `Unable to parse API response as JSON. ` +
                `Status: ${status}; Content-Type: ${contentType}; ` +
                `Cause: ${error.message}`
            );
        }
    }

    async verifyErrorResponse(body) {
        expect(body).toBeDefined();
        expect(body).not.toBeNull();
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty('responseCode');
        expect(Number.isInteger(body.responseCode)).toBe(true);
        expect(body).toHaveProperty('message');
        expect(typeof body.message).toBe('string');
        expect(body.message.trim().length).toBeGreaterThan(0);
    }


    async verifyFieldExists(body, fieldName) {
        expect(body).toHaveProperty(fieldName);
    }

    async verifyArray(body, fieldName) {
        expect(body).toHaveProperty(fieldName);
        expect(body[fieldName]).toBeInstanceOf(Array);
    }

    async verifyArrayNotEmpty(body, fieldName) {
        await this.verifyArray(body, fieldName);
        expect(body[fieldName].length).toBeGreaterThan(0);
    }

    async verifyObjectFields(object, fields) {
        expect(object).toBeDefined();
        expect(object).not.toBeNull();

        fields.forEach((field) => {
            expect(object).toHaveProperty(field);
        });
    }

    async verifyContentType(response, expectedType = 'application/json') {
        this.ensureResponse(response);

        const contentType = response.headers()['content-type'] || '';
        expect(contentType).toContain(expectedType);
    }

    async verifyResponseTime(responseTime, maxTime = 3000) {
        expect(Number.isFinite(responseTime)).toBe(true);
        expect(responseTime).toBeLessThanOrEqual(maxTime);
    }

    ensureResponse(response) {
        if (!response || typeof response.status !== 'function') {
            throw new Error(
                'Invalid API response: expected a Playwright APIResponse.'
            );
        }
    }
}

module.exports = new ApiValidator();
