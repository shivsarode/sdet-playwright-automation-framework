# SDET Playwright Automation Framework

A UI and API test automation framework built with **Playwright, JavaScript, and Cucumber BDD**. This project demonstrates reusable automation architecture, Page Object Model (POM), dynamic test data, API validation, and automated test reporting.

## Tech Stack

- **Automation:** Playwright, JavaScript (ES6+), Node.js
- **BDD:** Cucumber
- **Design Pattern:** Page Object Model (POM)
- **API Validation:** AJV JSON schema validation
- **Test Data:** Faker.js
- **Reporting:** Allure Report
- **Version Control:** Git and GitHub
- **CI/CD:** GitHub Actions and Jenkins pipeline configuration

## Key Features

- Reusable page objects and browser utilities
- Cucumber feature files and step definitions
- Positive and negative test scenarios
- UI and REST API automation
- HTTP status, response body, headers, and response-time validation
- JSON schema validation using AJV
- Dynamic test data generation using Faker.js
- Environment-based configuration
- Playwright Storage State authentication support
- Execution logging and failure screenshots
- Video and trace artifact capture when enabled
- Allure test reporting

## Automation Coverage

### UI Automation

- Registration and login workflows
- Negative login testing
- Logout and authenticated session handling
- Product navigation and product detail validation
- Add-to-cart and cart quantity validation
- Cart price and total price validation
- Product search and category filtering

**Status:** Implemented. Latest reported full regression: **62 scenarios passed, 196 steps passed**.

### API Automation

- Products and brands listing
- Product search and missing-parameter validation
- Login validation with valid and invalid credentials
- Account creation, duplicate email, and missing-field validation
- Account update and deletion
- User details retrieval
- Unsupported HTTP method validation
- Response status, message, content-type, and response-time checks
- JSON schema and required-field validation

**Status:** Implemented. Individual API scenarios have passed; complete API-specific coverage and regression verification remain **Pending**.

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

- **Page Object Model:** Separates page locators and actions from test steps.
- **Reusable Utilities:** Centralizes common browser operations and helper functions.
- **API Validation:** Supports reusable request handling and response assertions.
- **Schema Validation:** Validates API response structures against defined schemas.
- **Dynamic Test Data:** Uses Faker.js to generate test data.
- **Environment Configuration:** Supports configurable URLs and browser settings.
- **Test Diagnostics:** Captures logs and failure artifacts to support debugging.

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

Use feature paths and tags that exist in the repository.

## Allure Reporting

Generate the HTML report after a test run:

```bash
npm run report:generate
```

Open the generated report:

```bash
npm run report:open
```

Alternatively, serve the report from the raw results:

```bash
npm run report:serve
```

**Status:** Allure results generation and report rendering have been verified locally. A screenshot showed 62 test cases with a 100% pass rate. The final reporting configuration and clean end-to-end verification remain **Pending**.

## Authentication

The framework supports Playwright Storage State for authenticated sessions.

```bash
node auth/setupAuth.js
```

Complete the login flow when prompted. Keep generated authentication state, credentials, and secrets out of version control.

**Status:** Implementation present; standalone setup verification remains **Pending**.

## CI/CD

- **GitHub Actions:** Workflow configuration is present in the repository.
- **Jenkins:** A `Jenkinsfile` is present.

**Status:** End-to-end CI execution, artifact publishing, and pipeline validation remain **Pending**.

## Project Status

| Area | Status |
|---|---|
| Playwright UI automation | Implemented; latest reported regression passed |
| Cucumber BDD and POM | Implemented |
| Reusable utilities and Faker.js | Implemented |
| API automation | Implemented; API-specific full regression Pending |
| API schema and response validation | Implemented; complete coverage verification Pending |
| Logging and failure screenshots | Implemented |
| Video and trace artifacts | Configurable; final verification Pending |
| Allure reporting | Basic report generation verified; final configuration verification Pending |
| GitHub Actions | Workflow present; execution verification Pending |
| Jenkins pipeline | File present; validation Pending |
| Docker-based execution | Pending |
| Playwright MCP / AI-assisted testing | Pending |
| Architecture diagram and portfolio evidence | Pending |
| Freelance portfolio and case study | Pending |

## Roadmap

1. Complete framework hardening and verify test execution configuration.
2. Verify Allure reporting and test artifact generation from a clean run.
3. Complete API-specific regression and coverage checks.
4. Validate GitHub Actions execution and artifact publishing.
5. Validate the Jenkins pipeline.
6. Add and verify Docker-based execution.
7. Explore Playwright MCP and AI-assisted testing with a working demonstration.
8. Publish architecture documentation and genuine test evidence.
9. Polish the GitHub repository and prepare a freelance portfolio case study.

## Project Highlights

This project demonstrates hands-on work with UI and API automation, Cucumber BDD, reusable framework design, dynamic test data, negative testing, response validation, and test reporting.

Implementation status is documented transparently. Items marked **Pending** will be completed and verified in subsequent development phases.

## Author

**Shivam Sarode**  
QA Automation Engineer | SDET

- **GitHub:** https://github.com/shivsarode
- **Project Repository:** https://github.com/shivsarode/sdet-playwright-automation-framework
- **LinkedIn:** https://www.linkedin.com/in/shivam-sarode-778443319/
