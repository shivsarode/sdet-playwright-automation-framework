# SDET Playwright Automation Framework

A maintainable end-to-end test automation framework built with **Playwright, JavaScript and Cucumber BDD**, designed to demonstrate real-world QA automation practices.

The framework covers UI automation, reusable Page Object Model design, test data management, authentication using Playwright Storage State, failure debugging, reporting and CI/CD integration.

---

## Tech Stack

- Playwright
- JavaScript (ES6+)
- Cucumber BDD
- Node.js
- Page Object Model (POM)
- Git & GitHub
- GitHub Actions
- Faker.js
- REST API Automation (In Progress)

---

## Key Features

- UI automation using Playwright
- BDD automation using Cucumber
- Page Object Model architecture
- Reusable utility classes
- Cross-browser support
- Positive and negative test scenarios
- Dynamic test data using Faker.js
- Playwright Storage State authentication
- Screenshot capture on failure
- Configurable browser execution
- Retry failed scenarios
- Logging and debugging support
- CI/CD with GitHub Actions
- API automation expansion

---

## Automation Coverage

### UI Automation

Current automated workflows include:

- User Registration
- Login
- Negative Login Scenarios
- Logout
- Product Navigation
- Product Details
- Cart Operations
- Cart Quantity Verification
- Cart Price Verification
- End-to-End E-commerce Scenarios

### Authentication

The framework supports **Playwright Storage State** for reusing authenticated sessions.

```text
auth/
├── setupAuth.js
└── auth.json

auth.json contains local authentication/session data and should not be committed to GitHub.
API Automation
API automation is being added using Playwright API capabilities.
Planned coverage includes:
- GET requests
- POST requests
- Request and response validation
- Status code validation
- Positive API scenarios
- Negative API scenarios
- JSON response validation
- API test data management
Framework Architecture
sdet-playwright-automation-framework/
│
├── auth/
│   ├── setupAuth.js
│   └── auth.json
│
├── config/
│   └── env.js
│
├── features/
│   ├── login.feature
│   ├── login-negative.feature
│   ├── cartQuantity.feature
│   ├── cartTotalPrice.feature
│   └── ...
│
├── hooks/
│   └── hooks.js
│
├── pages/
│   ├── LoginPage.js
│   ├── SignupPage.js
│   ├── ProductPage.js
│   ├── ProductDetailsPage.js
│   └── ...
│
├── step-definitions/
│   ├── loginSteps.js
│   ├── cartQuantity.steps.js
│   ├── cartTotalPrice.steps.js
│   └── ...
│
├── utils/
│   ├── elementUtils.js
│   ├── waitUtils.js
│   ├── assertUtils.js
│   ├── fakerUtils.js
│   └── logger.js
│
├── test-data/
│   └── loginData.json
│
├── logs/
├── reports/
├── .env
├── .gitignore
├── cucumber.js
├── package.json
└── README.md

Page Object Model
The framework follows the Page Object Model (POM) design pattern.
Each application page has its own class containing:
- Locators
- Page actions
- Reusable methods
- Validation methods
This improves maintainability, reusability, readability and scalability.

Reusable Utilities
Common Playwright operations are centralized inside the utility layer.
Examples:
- Click
- Type / Fill
- Clear and Type
- Get Text
- Visibility Checks
- Wait for Element
- Dropdown Selection
- Hover
- Double Click
- Get Attribute
This keeps step definitions clean and reduces duplicate automation code.

Test Data
Test data is managed separately from test logic.
Current framework uses:
- JSON test data
- Faker.js for dynamic data generation
- Environment variables using .env
test-data/
└── loginData.json

Browser Support
The framework supports:
- Chromium
- Firefox
- WebKit
Browser can be configured using:
BROWSER=chromium

Execution
Install Dependencies
npm install

Run All Tests
npm test

Run a Specific Feature
npm test -- features/login.feature

Run a Specific Scenario Using Tags
npx cucumber-js --tags "@login"

Run Tests in Headed Mode
PowerShell:
$env:HEADLESS="false"; npm test

Run Failed Scenarios
npm run test:rerun

Authentication Setup
Create the Playwright authenticated storage state using:
node auth/setupAuth.js

The browser will open for manual authentication.
After successful login, press ENTER in the terminal.
The authentication state will be saved to:
auth/auth.json

auth/auth.json should remain excluded through .gitignore.
Debugging & Reporting
The framework supports:
- Failure screenshots
- Application logs
- Cucumber reports
- Playwright debugging
- Retry mechanism
Failure screenshots are automatically captured when a scenario fails.

CI/CD
GitHub Actions is integrated for automated test execution.
The pipeline supports:
- Automated test execution
- Headless browser execution
- Test result reporting
- Failure debugging artifacts

Current Project Status
Area	Status
Playwright UI Automation	Completed
Cucumber BDD	Completed
Page Object Model	Completed
Reusable Utilities	Completed
Positive Testing	Completed
Negative Testing	Completed
Cart Automation	Completed
Storage State Authentication	Completed
Dynamic Test Data	Completed
Logging	Completed
Failure Screenshots	Completed
GitHub Actions	Integrated
API Automation	In Progress
Allure Reporting	Planned
Jenkins Integration	Planned


Future Enhancements
- Expand REST API automation
- API + UI end-to-end scenarios
- Allure reporting
- Jenkins pipeline
- Advanced test data management
- Parallel execution optimization
- Additional API negative and security scenarios

Project Highlights
This project demonstrates practical experience with:
- Playwright UI automation
- Cucumber BDD
- JavaScript automation
- Page Object Model
- Reusable automation architecture
- Authentication state management
- Functional and negative testing
- Test data generation
- CI/CD automation
- Debugging and reporting
- API automation

Author
Shivam Sarode
QA Automation Engineer | SDET
Skills: Playwright | Selenium | Java | JavaScript | TypeScript | Cucumber | API Testing | Jenkins | GitHub Actions