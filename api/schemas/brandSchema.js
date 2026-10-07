module.exports = {
    type: 'object',
    required: ['id', 'brand'],
    properties: {
        id: { type: 'integer' },
        brand: { type: 'string' }
    }
};