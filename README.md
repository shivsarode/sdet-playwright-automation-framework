# SDET Playwright Automation Framework

A UI and API test automation framework built with **Playwright, JavaScript and Cucumber BDD**. The project demonstrates reusable automation architecture, Page Object Model (POM), dynamic test data, API validation and CI/CD integration.

## Tech Stack

- Playwright — browser and API automation
- JavaScript (ES6+) and Node.js
- Cucumber BDD
- Page Object Model (POM)
- AJV — JSON schema validation
- Faker.js — dynamic test data
- Git and GitHub
- GitHub Actions
- Jenkins pipeline file

## Key Features

- Reusable page objects and browser utilities
- Cucumber feature files and step definitions
- Positive and negative test scenarios
- Reusable API client and response validators
- HTTP status, response body, headers and response-time checks
- JSON schema validation using AJV
- Dynamic test data using Faker.js
- Playwright Storage State authentication
- Environment-based configuration
- Logging and failure screenshots

## Automation Coverage

### UI Automation

- Registration, login and negative login scenarios
- Logout and authenticated session handling
- Product navigation and product detail validation
- Add-to-cart and cart quantity validation
- Cart price and total price validation
- Product search and category filtering

**Status:** Implemented; remaining UI failures and full regression verification are pending.

### API Automation

- Products and brands listing
- Product search and missing-parameter validation
- Login validation, including valid and invalid credentials
- Account creation, duplicate email and missing-field validation
- Account update and deletion
- User details retrieval
- Unsupported HTTP method validation
- Response code, message, content-type and response-time checks
- JSON schema and required-field validation

**Status:** Implemented; final regression and coverage verification are pending.

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
├── .github/
│   └── workflows/
├── .gitignore
├── cucumber.js
├── package.json
├── Jenkinsfile
└── README.md
```

## Design Approach

- **POM:** separates page locators and actions from test steps.
- **Reusable utilities:** centralizes common browser operations and assertions.
- **API client:** keeps request execution reusable across API scenarios.
- **Schema validation:** validates response structures against defined schemas.
- **Test data management:** combines reusable data and Faker.js-generated values.
- **Configuration:** supports configurable test execution and browser settings.

## Getting Started

### 1. Install dependencies

```bash
npm install
npx playwright install chromium
```

### 2. Run all scenarios

```bash
npm test
```

### 3. Run a specific feature

```bash
npm test -- features/login.feature
```

### 4. Run tagged scenarios

```bash
npx cucumber-js --tags "@login"
```

### 5. Run in headed mode (PowerShell)

```powershell
$env:HEADLESS="false"; npm test
```

### 6. Rerun failed scenarios

```bash
npm run test:rerun
```

Use a feature path that exists in the repository when running an individual feature.

## Authentication

The framework supports Playwright Storage State for authenticated sessions.

```bash
node auth/setupAuth.js
```

Complete the login flow when prompted. Keep generated authentication state and credentials out of version control.

## CI/CD

- **GitHub Actions:** workflow files are present; end-to-end execution and final status require verification.
- **Jenkins:** `Jenkinsfile` is present; pipeline validation is pending.

## Project Status

| Area | Status |
|---|---|
| Playwright UI automation | Implemented; regression pending |
| Cucumber BDD and POM | Implemented |
| Reusable utilities and Faker.js | Implemented |
| API automation | Implemented; final regression pending |
| API schema and response validation | Implemented; regression verification pending |
| Logging and failure screenshots | Implemented |
| GitHub Actions | Integrated; final verification pending |
| Jenkins pipeline | Present; validation pending |
| Allure reporting | Setup and execution verification pending |
| Docker-based execution | Pending |
| Playwright MCP / AI-assisted testing | Pending |
| Architecture diagram and portfolio evidence | Pending |

## Roadmap

1. Fix the remaining UI failures and rerun regression.
2. Verify the complete API suite and record the actual results.
3. Configure and validate reporting artifacts.
4. Verify GitHub Actions and Jenkins execution.
5. Add Docker-based execution.
6. Explore Playwright MCP and AI-assisted testing.
7. Publish architecture documentation and genuine execution evidence.
8. Polish the repository for job applications and freelance clients.

## Project Highlights

This project demonstrates practical UI and API automation, BDD, reusable framework design, dynamic test data, negative testing, response validation and CI/CD integration. Work in progress is explicitly identified in the project status and roadmap.

## Author

**Shivam Sarode**  
QA Automation Engineer | SDET

- GitHub: https://github.com/shivsarode
- Project: https://github.com/shivsarode/sdet-playwright-automation-framework
- LinkedIn: https://www.linkedin.com/in/shivam-sarode-778443319/
