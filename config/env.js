require('dotenv').config();

module.exports = {
  baseURL: process.env.BASE_URL || "https://automationexercise.com",
  browser: process.env.BROWSER || "chromium",
  headless: process.env.HEADLESS !== "false"
};