require('dotenv').config();

const env = process.env.ENV || "qa"; // 🔥 env selector

const config = {
  qa: {
    baseURL: process.env.QA_BASE_URL || "https://automationexercise.com",
  },
  dev: {
    baseURL: process.env.DEV_BASE_URL || "https://dev.automationexercise.com",
  },
  prod: {
    baseURL: process.env.PROD_BASE_URL || "https://automationexercise.com",
  }
};

module.exports = {
  ...config[env],
  browser: process.env.BROWSER || "chromium",
  headless: process.env.HEADLESS !== "false"
};