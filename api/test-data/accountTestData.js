const { faker } = require('@faker-js/faker');

class AccountTestData {

    generateUser() {
        return {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password({ length: 12 }),
            title: 'Mr',
            birth_date: '10',
            birth_month: '5',
            birth_year: '1995',
            firstname: faker.person.firstName(),
            lastname: faker.person.lastName(),
            company: faker.company.name(),
            address1: faker.location.streetAddress(),
            address2: faker.location.secondaryAddress(),
            country: 'India',
            zipcode: faker.location.zipCode(),
            state: 'Maharashtra',
            city: 'Pune',
            mobile_number: faker.phone.number()
        };
    }
}

module.exports = new AccountTestData();