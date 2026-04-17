const reporter = require('cucumber-html-reporter');

const options = {
  theme: 'bootstrap',
  jsonFile: 'reports/cucumber-report.json',
  output: 'reports/cucumber-report.html',
  reportSuiteAsScenarios: true,
  launchReport: true,

  metadata: {
    "App": "SDET Playwright Framework",
    "Release": "1.0",
    "Browser": "Playwright",
    "Platform": process.platform,
    "Executed": "Local"
  }
};

reporter.generate(options);