
const { request } = require('@playwright/test');

const DEFAULT_BASE_URL = 'https://automationexercise.com';

class ApiClient {
    static activeClients = new Set();

    constructor(baseURL = process.env.API_BASE_URL || DEFAULT_BASE_URL) {
        this.baseURL = baseURL;
        this.context = null;
        this.disposed = false;

        ApiClient.activeClients.add(this);
    }

    async init(options = {}) {
        if (this.disposed) {
            throw new Error(
                'Cannot initialize a disposed API client. Create a new instance.'
            );
        }

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
        if (this.disposed) {
            throw new Error('API client has already been disposed.');
        }

        if (!this.context) {
            throw new Error(
                'API client is not initialized. Call init() before making requests.'
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
        if (this.disposed) {
            return;
        }

        this.disposed = true;
        ApiClient.activeClients.delete(this);

        const context = this.context;
        this.context = null;

        if (context) {
            await context.dispose();
        }
    }

    static async disposeAll() {
        const clients = [...ApiClient.activeClients];

        const results = await Promise.allSettled(
            clients.map((client) => client.dispose())
        );

        return results
            .filter((result) => result.status === 'rejected')
            .map((result) => result.reason);
    }
}

module.exports = ApiClient;
