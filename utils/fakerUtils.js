const { faker } = require('@faker-js/faker');

class FakerUtils {

    generateUser() {

        return {

            name: faker.person.fullName(),

            email: faker.internet.email(),

            password: faker.internet.password(),

            city: faker.location.city(),

            phone: faker.phone.number()
        };
    }
}

module.exports = new FakerUtils();