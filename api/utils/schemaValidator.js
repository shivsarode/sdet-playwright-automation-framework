const Ajv = require('ajv');
const addFormats = require('ajv-formats');

class SchemaValidator {

    constructor() {
        this.ajv = new Ajv({
            allErrors: true
        });

        addFormats(this.ajv);
    }

    validate(data, schema) {
        const validate = this.ajv.compile(schema);
        const valid = validate(data);

        if (!valid) {
            throw new Error(
                `Schema validation failed:\n${JSON.stringify(validate.errors, null, 2)}`
            );
        }

        return true;
    }
}

module.exports = new SchemaValidator();