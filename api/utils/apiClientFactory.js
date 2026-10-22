
const ApiClient = require('../clients/apiClient');

async function createApiClient(world, options = {}) {
    if (!world || typeof world !== 'object') {
        throw new Error(
            'A valid Cucumber World is required to create an API client.'
        );
    }

    world.apiClients = world.apiClients || [];

    const client = new ApiClient(options.baseURL);

    try {
        await client.init(options.requestOptions || {});
        world.apiClients.push(client);

        return client;
    } catch (error) {
        await client.dispose().catch(() => {});
        throw error;
    }
}

module.exports = { createApiClient };
