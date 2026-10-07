const { request } = require('@playwright/test');

class ApiClient {

    constructor() {
        this.context = null;
    }

    async init() {
        this.context = await request.newContext({
            baseURL: 'https://automationexercise.com'
        });
    }

    async get(endpoint, options = {}) {
        return await this.context.get(endpoint, options);
    }

    async post(endpoint, options = {}) {
        return await this.context.post(endpoint, options);
    }

    async put(endpoint, options = {}) {
        return await this.context.put(endpoint, options);
    }

    async delete(endpoint, options = {}) {
        return await this.context.delete(endpoint, options);
    }

    async dispose() {
        if (this.context) {
            await this.context.dispose();
            this.context = null;
        }
    }
}

module.exports = ApiClient;