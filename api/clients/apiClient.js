
const { request } = require('@playwright/test');

const DEFAULT_BASE_URL = 'https://automationexercise.com';

class ApiClient {
    constructor(baseURL = process.env.API_BASE_URL || DEFAULT_BASE_URL) {
        this.baseURL = baseURL;
        this.context = null;
    }

    async init(options = {}) {
        if (this.context) {
            return this.context;
        }

        this.context = await request.newContext({
            baseURL: this.baseURL,
            ...options
        });

        return this.context;
    }

    getContext() {
        if (!this.context) {
            throw new Error(
                'API client is not initialized. Call apiClient.init() before making requests.'
            );
        }

        return this.context;
    }

    async get(endpoint, options = {}) {
        return this.getContext().get(endpoint, options);
    }

    async post(endpoint, options = {}) {
        return this.getContext().post(endpoint, options);
    }

    async put(endpoint, options = {}) {
        return this.getContext().put(endpoint, options);
    }

    async delete(endpoint, options = {}) {
        return this.getContext().delete(endpoint, options);
    }

    async dispose() {
        if (this.context) {
            await this.context.dispose();
            this.context = null;
        }
    }
}

module.exports = ApiClient;
