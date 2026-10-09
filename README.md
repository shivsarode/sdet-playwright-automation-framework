
# SDET Playwright Automation Framework

A maintainable UI and API test automation framework built with Playwright, JavaScript and Cucumber BDD. Designed to demonstrate practical QA automation practices, reusable architecture, functional testing and CI/CD integration.

## Tech Stack

- Playwright — UI and API automation
- JavaScript (ES6+) and Node.js
- Cucumber BDD
- Page Object Model (POM)
- AJV — JSON schema validation
- Faker.js — dynamic test data
- Git and GitHub
- GitHub Actions — CI/CD
- Selenium WebDriver with Java — additional automation experience

## Key Features

- UI automation with reusable page objects
- Cucumber BDD scenarios and step definitions
- Positive and negative testing
- Reusable API client and response validators
- API response code, message, field and schema validation
- Dynamic test data generation with Faker.js
- Playwright Storage State authentication
- Configurable browser execution
- Logging and failure screenshots
- Environment-based configuration
- GitHub Actions integration

## Automation Coverage

### UI Automation

Automated workflows include:

- Registration, login and negative login scenarios
- Logout and authenticated session handling
- Product navigation and product details
- Add-to-cart and cart quantity validation
- Cart price and total price validation
- Product search and category filtering

### API Automation

API coverage is being expanded using Playwright API request capabilities and Cucumber BDD.

Current coverage includes:

- Products and brands listing
- Product search and missing-parameter validation
- Login validation, including invalid credentials and unsupported methods
- Account creation, duplicate email and missing-field validation
- Account update and deletion
- User details retrieval
- Response codes, messages, content types and response-time checks
- JSON schema and required-field validation

API scenarios are being finalized and will be regression-verified before the suite is marked complete.

## Framework Architecture

```text
sdet-playwright-automation-framework/
├── api/
│   ├── clients/
│   ├── schemas/
│   ├── test-data/
│   └── utils/
├── auth/
├── config/
├── features/
├── fixtures/
├── hooks/
├── pages/
├── step-definitions/
├── test-data/
├── utils/
├── .github/workflows/
├── .env
├── .gitignore
├── cucumber.js
├── package.json
├── Jenkinsfile
└── README.md
```

## Design & Test Data

- **Page Object Model:** separates page locators and actions from test steps.
- **Reusable utilities:** centralizes common browser interactions and assertions.
- **API client and validators:** reduce duplicated request and response-validation code.
- **Faker.js:** generates dynamic test data for account workflows.
- **Environment configuration:** supports configurable execution settings.
- **AJV schema validation:** validates API response structures against defined schemas.

## Getting Started

### Install dependencies

```bash
npm install
```

Install the required Playwright browser if it is not already available:

```bash
npx playwright install chromium
```

### Run all tests

```bash
npm test
```

### Run a specific feature

```bash
npm test -- features/login.feature
```

### Run tagged scenarios

```bash
npx cucumber-js --tags "@login"
```

### Run in headed mode (PowerShell)

```powershell
$env:HEADLESS="false"; npm test
```

Use the feature path that matches the feature you want to execute.

## Authentication

The framework supports Playwright Storage State for authenticated sessions.

```bash
node auth/setupAuth.js
```

Complete the manual login when prompted. The generated authentication state is stored locally and should not be committed to GitHub.

## CI/CD

GitHub Actions integration is present for automated test execution.

The framework also contains a Jenkins pipeline file. Further pipeline validation and reporting improvements remain part of the enhancement roadmap.

## Project Status

| Area | Status |
|---|---|
| Playwright UI automation | Implemented |
| Cucumber BDD and POM | Implemented |
| Reusable utilities | Implemented |
| Positive and negative UI testing | Implemented |
| Dynamic test data with Faker.js | Implemented |
| API automation | Implemented; final regression pending |
| API schema and response validation | Implemented |
| Logging and failure screenshots | Implemented |
| GitHub Actions | Integrated |
| Jenkins pipeline | Present; further validation pending |
| Allure reporting | Planned |
| Docker-based execution | Planned |
| Playwright MCP / AI-assisted testing | Planned |
| Architecture documentation and portfolio evidence | In progress |

## Roadmap

- Complete and verify API regression coverage
- Stabilize remaining UI tests and protect the green baseline
- Improve test reporting and execution artifacts
- Validate CI/CD workflows end to end
- Add Docker-based execution
- Explore Playwright MCP and AI-assisted testing
- Publish architecture documentation and execution evidence

## Project Highlights

This project demonstrates practical implementation of UI and API automation, reusable framework design, BDD, dynamic test data, negative testing, response validation and CI/CD integration.

## Author

**Shivam Sarode**  
QA Automation Engineer | SDET

GitHub: [sdet-playwright-automation-framework](https://github.com/shivsarode/sdet-playwright-automation-framework)  
LinkedIn: [Shivam Sarode](https://www.linkedin.com/in/shivam-sarode-778443319/)
