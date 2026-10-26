🎭 Playwright UI & API Automation Framework
🚀 End-to-End Test Automation with JavaScript, Playwright, Cucumber BDD & Page Object Model








A practical test automation framework for validating e-commerce user journeys and REST APIs using Playwright, JavaScript, Cucumber BDD, Page Object Model (POM), and reusable automation utilities.

🔗 GitHub Repository: https://github.com/shivsarode/sdet-playwright-automation-framework
📑 Table of Contents
- 📖 About the Project
- ✨ Key Features
- 🧰 Technology Stack
- 🏗️ Framework Architecture
- 📂 Project Structure
- ⚙️ Getting Started
- 🧪 UI Automation Coverage
- 🌐 API Automation Coverage
- 🥒 Cucumber BDD Workflow
- 🧱 Page Object Model
- 🎲 Dynamic Test Data
- ▶️ Test Execution
- 📊 Reporting & Debugging
- 🔐 Configuration & Security
- 🤖 Playwright MCP
- 🔄 CI/CD Integration
- 🐳 Docker
- 🛠️ Troubleshooting
- 📚 Documentation
- 👨‍💻 Author
📖 About the Project
This repository demonstrates how UI and API automation can be organized into a reusable, maintainable test automation framework.

The framework uses Playwright for browser and API automation, Cucumber for readable BDD scenarios, and Page Object Model to separate page interactions from test steps.
✨ Key Features
- 🎭 Playwright browser automation
- 🟨 JavaScript and CommonJS modules
- 🥒 Cucumber BDD with Gherkin feature files
- 🏷️ Tag-based execution using @smoke and @regression
- ⚡ Parallel scenario execution configured with up to four Cucumber workers
- 🧱 Page Object Model (POM)
- 🛒 E-commerce UI workflow automation
- 🌐 REST API testing
- 🔍 Positive and negative test scenarios
- 🧪 API response and status validation
- 📋 JSON schema validation utilities where configured
- 🎲 Dynamic test data generation with Faker.js
- 🧰 Reusable fixtures, hooks and utilities
- 🔐 Authentication and account workflow testing
- 📸 Screenshots, video and trace configuration
- 📊 Allure reporting scripts
- ⚙️ Environment-based configuration
- 🔄 Git and GitHub Actions workflow integration
- 🤖 Playwright MCP browser-inspection setup in VS Code
- 🐳 Docker-compatible execution can be added for reproducible environments
🧰 Technology Stack
Technology	Purpose
JavaScript	Automation scripting
Playwright	Browser and API automation
Cucumber	BDD test execution
Gherkin	Business-readable scenarios
Page Object Model	Reusable page interactions
Faker.js	Dynamic test data
AJV	JSON schema validation
dotenv	Environment configuration
Allure	Test reporting
Git & GitHub	Version control
GitHub Actions	CI workflow
Jenkins	CI/CD execution where configured
VS Code	Development environment
Playwright MCP	AI-assisted browser inspection
Docker	Optional containerized execution environment


🏗️ Framework Architecture
The framework separates test scenarios, step definitions, page objects and reusable utilities.
Gherkin Feature Files
        |
        v
Cucumber Step Definitions
        |
        v
Page Objects / API Helpers
        |
        v
Playwright Browser / API
        |
        v
Application Under Test
        |
        v
Assertions + Execution Results
        |
        v
Logs / Screenshots / Trace / Reports
🧩 Design Principles
- Separation of concerns: Feature files describe scenarios; step definitions implement the steps.
- Reusability: Common interactions and test data logic are kept in reusable modules.
- Maintainability: Page-specific selectors and actions are organized into page objects.
- Debuggability: Execution output and available test artifacts help investigate failures.
- Readable tests: Gherkin describes user workflows in a business-readable format.
📂 Project Structure
The following is a high-level view of the framework. Refer to the repository for the exact current file list.
sdet-playwright-automation-framework/
│
├── .github/
│   └── workflows/                 # GitHub Actions workflows
│
├── .vscode/
│   └── mcp.json                   # Playwright MCP configuration
│
├── features/                      # Gherkin scenarios
│   ├── addToCart.feature
│   ├── cartQuantity.feature
│   ├── cartTotalPrice.feature
│   ├── cartPersistence.feature
│   ├── checkoutFormValidation.feature
│   ├── completeOrder.feature
│   ├── login.feature
│   ├── login-negative.feature
│   ├── productDetails.feature
│   ├── productFilter.feature
│   ├── searchProduct.feature
│   └── endToEndAccountLifecycle.feature
│
├── pages/                         # Page Object Model classes
│   ├── LoginPage.js
│   └── ProductDetailsPage.js
│
├── step-definitions/              # Cucumber step implementations
│   ├── loginSteps.js
│   └── cartPersistence.steps.js
│
├── fixtures/                      # Shared test context and fixtures
│   └── world.js
│
├── utils/                          # Reusable helper utilities
│   └── FakerUtils.js
│
├── package.json
├── package-lock.json
├── .env                            # Local configuration; do not commit
├── .gitignore
└── README.md
Additional API, configuration, support, reporting and utility files may exist in their respective folders. This is a high-level view, not a guarantee that every file is listed.
⚙️ Getting Started
Prerequisites
Install:
- Node.js and npm
- Git
- VS Code or another JavaScript editor
- Playwright-supported browser binaries
- Allure CLI, if generating or opening Allure reports
  Verify the installations:
node --version
npm --version
git --version
1. Clone the repository
git clone https://github.com/shivsarode/sdet-playwright-automation-framework.git
2. Open the project directory
cd sdet-playwright-automation-framework
3. Install dependencies
npm install
4. Install the Playwright browser
npx playwright install chromium
For Linux CI environments, when required:
npx playwright install --with-deps chromium
5. Configure the environment
Check the existing configuration files and .env example, if present. Add only the environment variables required by the current framework.

Security: Keep passwords, tokens, API keys and other secrets out of Git. Do not commit your local .env file.
6. Run the tests
npm test
🧪 UI Automation Coverage
The UI scenarios focus on practical e-commerce workflows.
Feature	What it validates
login.feature	Login workflow
login-negative.feature	Negative login scenarios
searchProduct.feature	Product search
productDetails.feature	Product details
productFilter.feature	Product filtering
addToCart.feature	Add-to-cart workflow
cartQuantity.feature	Cart quantity behavior
cartTotalPrice.feature	Cart total calculation
cartPersistence.feature	Cart behavior after refresh
checkoutFormValidation.feature	Checkout form validation
completeOrder.feature	Order completion workflow
endToEndAccountLifecycle.feature	Account registration, login and deletion lifecycle


⭐ Featured End-to-End Scenarios
1. Cart persistence after refresh
Validates a product and its quantity in the cart across a page refresh.

Reported individual feature run:
1 scenario passed
9 steps passed
2. End-to-end account lifecycle
Exercises account creation, logout, login with the created credentials and account deletion.

Reported individual feature run:
1 scenario passed
8 steps passed
These are results from the respective individual feature runs, not a claim that every scenario in the complete regression suite passes.
🌐 API Automation Coverage
The repository also contains API-oriented feature files covering product endpoints and account-related operations.

Examples include:
- Product list retrieval
- Product list submission
- Brand list retrieval and update workflows
- Search product API
- Account creation and update
- Login verification
- User detail retrieval
- Account deletion
  Relevant feature files include products.feature, postProductsList.feature, putBrandsList.feature, getUserDetail.feature, verifyLogin.feature, createAccount.feature and updateAccount.feature.
🔎 API Validation Approach
API tests can validate the aspects implemented in their step definitions and helper utilities, including:
- HTTP response status
- Response body fields
- Expected success or error behavior
- Negative input scenarios
- JSON structure and schema, where schema validation is configured
  The exact assertions depend on each scenario's implementation.
🥒 Cucumber BDD Workflow
Cucumber makes test scenarios readable through Given, When and Then steps. The framework uses tags such as @smoke and @regression to select scenarios, and config/cucumber.js sets parallel: 4 for parallel scenario execution.

Example:
Feature: Product search
  Scenario: Search for a product
    Given the user opens the application
    When the user searches for a product
    Then matching products should be displayed
The execution flow is:
1. Cucumber reads the .feature file.
2. It matches each Gherkin step to a step definition.
3. The step definition invokes the relevant page object or helper.
4. Playwright interacts with the application or API.
5. Assertions determine whether the expected behavior occurred.
The example illustrates the BDD format. Its wording must match implemented step definitions before it can run.
🧱 Page Object Model (POM)
Page Object Model keeps page-specific interactions separate from Gherkin step implementations.

For example, LoginPage.js contains login-related page behavior, while step definitions coordinate the workflow.
Example: Page Object
The following is an illustrative example of the pattern, not a claim that these exact methods or selectors exist in the repository.
class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailInput = page.locator('[data-qa="login-email"]');
        this.passwordInput = page.locator('[data-qa="login-password"]');
        this.loginButton = page.locator('[data-qa="login-button"]');
    }
    async login(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}
module.exports = LoginPage;
Example: Cucumber Step Definition
This illustrates how a step can call a page object. Adapt it to the framework's existing shared context and setup.
const { Given, When } = require('@cucumber/cucumber');
Given('the user opens the login page', async function () {
    await this.page.goto(this.baseURL);
});
When(
    'the user logs in with {string} and {string}',
    async function (email, password) {
        await this.loginPage.login(email, password);
    }
);
How the pieces work together
Feature File
    |
    v
Step Definition
    |
    v
Page Object Method
    |
    v
Playwright Locators
    |
    v
Browser Interaction
    |
    v
Assertion
Benefits
- Reduces duplicated selector and interaction logic.
- Makes page changes easier to maintain.
- Keeps scenarios easier to read.
- Encourages reusable page methods.
- Separates business workflow steps from UI implementation details.
🎲 Dynamic Test Data
The framework uses Faker.js utilities to generate test data where required.

Typical uses include generating unique email addresses and account information for registration scenarios.

Example:
const { faker } = require('@faker-js/faker');
const email = faker.internet.email();
Generated data helps reduce collisions between repeated test runs. Tests should still handle cleanup and application-specific data constraints appropriately.
▶️ Test Execution Commands
Run commands from the project root. The test, test:headless, and test:rerun npm scripts explicitly load config/cucumber.js.
Run the complete configured test suite
npm test
Run an individual feature
npm test -- features/cartPersistence.feature
npm test -- features/endToEndAccountLifecycle.feature
npm test -- features/login.feature
npm test -- features/searchProduct.feature
Run scenarios by Cucumber tag
Run smoke scenarios:
npm test -- --tags "@smoke"
Run regression scenarios:
npm test -- --tags "@regression"
Run scenarios matching either tag:
npm test -- --tags "@smoke or @regression"
Run in headless mode
npm run test:headless
Rerun failed scenarios
npm run test:rerun
The rerun command expects rerun.txt to exist and contain failed scenario locations.
Recent configuration verification
The combined tagged run below passed with 2 scenarios and 15 steps. The configured parallel run showed four browser launches at the same timestamp. This verifies the selected scenarios only, not the full regression suite.
npm test -- features/cartPersistence.feature features/login.feature --tags "@smoke or @regression"
The login smoke scenario was also reported as passing on Chromium, Firefox, and WebKit. Full QA/DEV/PROD environment switching has not yet been completely verified.
Check available project scripts
npm run
This lists the scripts actually defined in the project. Use it to confirm the available regression, rerun and reporting commands.
📊 Reporting & Debugging
The framework includes reporting and browser-debugging configuration. The exact artifacts produced depend on the test configuration and execution path.
Allure reporting
If the existing package.json provides the reporting scripts, run:
npm run report:generate
npm run report:open
If those scripts are unavailable, inspect package.json and use the configured Allure CLI commands instead.
Playwright debugging
Useful artifacts when configured include:
- 📸 Screenshots
- 🎥 Browser video
- 🧵 Playwright traces
- 📝 Console and test execution logs
- 📊 Allure results
Practical debugging workflow
1. Identify the failing feature and scenario.
2. Read the first meaningful error in the execution output.
3. Inspect the relevant step definition and page object.
4. Check the locator and the application's actual state.
5. Use a screenshot or trace when available.
6. Correct the root cause and rerun the affected feature.
🔐 Configuration & Test Safety
Use the project's existing configuration and environment utilities rather than hardcoding environment-specific values in test steps. The .env file stores settings such as ENV, application URLs, BROWSER, and HEADLESS; config/env.js loads and selects the configured environment and exports values such as baseURL, browser, and headless. pages/ProductPage.js imports this configuration and uses env.baseURL to open the application.
- Keep credentials in environment variables or a secure CI secret store.
- Exclude .env and generated execution artifacts from version control.
- Use unique test data when the application requires it.
- Avoid printing access tokens or passwords in logs.
- Clean up test-created accounts and data where appropriate.
- Never use production credentials in a public repository.
  Authentication behavior should be described according to the implementation of the individual tests; do not assume every scenario reuses saved browser authentication state.
🤖 Playwright MCP — AI-Assisted Browser Inspection
This repository includes a VS Code MCP configuration for Playwright.

Configuration file: .vscode/mcp.json
{
  "servers": {
    "playwright": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest"]
    }
  }
}
What was demonstrated
- Configuring the Playwright MCP server in VS Code.
- Connecting the MCP server and exposing its browser tools.
- Using an AI assistant to inspect a practice website.
- Exploring page content and navigation through browser tools.
MCP versus Playwright Test
Playwright MCP	Playwright Test
Exposes browser interaction tools to an AI assistant	Runs deterministic automated tests
Useful for assisted browser exploration and inspection	Useful for repeatable assertions and regression testing
Tool use depends on the assistant and task	Test execution follows the written test and configured runner
Does not automatically prove a workflow is regression-tested	Produces test results from the assertions that execute
Scope: The MCP browser-inspection demonstration is separate from the existing Cucumber regression suite. The MCP configuration alone does not mean tests are generated automatically, self-healing is implemented, or MCP runs in CI.	


🔄 CI/CD Integration
GitHub Actions
The repository has a GitHub Actions workflow, and successful workflow results have been reported for the project.

Workflow runs:

https://github.com/shivsarode/sdet-playwright-automation-framework/actions

To verify a build, check its commit SHA, executed jobs, test output and final status.

The top GitHub Actions badge is a static link-style badge. To display the actual live workflow status, use the workflow-status badge with the exact workflow filename in .github/workflows/.
Jenkins
Jenkins can execute the framework through a configured job or pipeline. Verify the actual Jenkins job and its latest build before claiming that a particular push triggered a successful run.
CI verification checklist
- Install the required Node.js version.
- Install npm dependencies.
- Install the required Playwright browser.
- Configure CI environment variables and secrets.
- Run the intended test command.
- Preserve useful reports and failure artifacts.
- Check the final pipeline status and test results.
🐳 Docker
Docker can provide a consistent environment for running automation across developer machines and CI agents.

Current scope: Docker is documented as an optional execution approach. Do not treat Docker execution as implemented until a Dockerfile or Compose configuration has been added, verified and tested.

A typical future container setup may include:
- A Node.js base image
- Project dependency installation
- Required Playwright browser binaries
- Environment variables supplied securely
- A test command as the container entry point
- Optional report and test-artifact output
  Official references:
- Docker Get Started
- Playwright Docker documentation
🛠️ Troubleshooting
Problem	What to check
npm install fails	Node.js/npm version, network access and dependency errors
Browser executable missing	Run npx playwright install chromium
Feature file cannot run	Confirm the file path and configured Cucumber command
Undefined step	Check Gherkin wording against available step definitions
Duplicate step definition	Search for overlapping step expressions
Locator timeout	Inspect the current page, selector and element state
Strict mode violation	Narrow the locator to the intended element
Test data collision	Check whether generated account data must be unique
API assertion fails	Inspect the response status, body and expected values
Allure report unavailable	Confirm report generation completed and the output directory exists
MCP server unavailable	Check .vscode/mcp.json, VS Code MCP status and server output
GitHub Actions fails	Inspect the workflow log, browser installation and environment variables


📚 Useful Documentation
- 🎭 Playwright Documentation
- 🌐 Playwright API Testing
- 🧪 Playwright Assertions
- 🧵 Playwright Trace Viewer
- 🥒 Cucumber Documentation
- 🧱 Page Object Model — Playwright Guide
- 🔄 GitHub Actions Documentation
- 📊 Allure Documentation
- 🤖 Playwright MCP Repository
- 🐳 Docker Documentation
👨‍💻 Author
Shivam Sarode

QA Automation Engineer | SDET

🔗 GitHub: https://github.com/shivsarode/sdet-playwright-automation-framework

🔗 LinkedIn: https://www.linkedin.com/in/shivam-sarode-778443319/
⭐ Project Summary
A JavaScript-based Playwright automation framework combining UI workflows, API scenarios, Cucumber BDD, Page Object Model, reusable test utilities, reporting configuration and an initial Playwright MCP browser-inspection setup.

Built around practical automation, readable scenarios, maintainable code and evidence-based test results.
Made with ❤️ by Shivam Sarode