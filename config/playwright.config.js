// Basic Playwright configuration (future-ready)
module.exports = {
  use: {
    headless: false, // browser visible
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10000,
    ignoreHTTPSErrors: true
  },

  timeout: 60000, // max test timeout

  retries: 0
};