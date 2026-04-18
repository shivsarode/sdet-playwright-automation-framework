require("dotenv").config();

const env = {
    baseUrl: process.env.BASE_URL || "https://automationexercise.com",
    apiUrl: process.env.API_URL
};

module.exports = env;