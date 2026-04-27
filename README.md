# 🚀 SDET Playwright Automation Framework

![Playwright](https://img.shields.io/badge/Playwright-Automation-green)
![Cucumber](https://img.shields.io/badge/Cucumber-BDD-brightgreen)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![CI/CD](https://img.shields.io/badge/GitHub-Actions-blue)

---

## 🧠 Overview

A scalable and robust End-to-End Test Automation Framework built using **Playwright + Cucumber (BDD)**.

This framework is designed using real-world industry standards focusing on:

- Clean Architecture  
- Reusability  
- Maintainability  
- Debuggability (Screenshots, Video, Trace)  
- CI/CD Integration  

🚧 Currently enhanced with GitHub Actions CI/CD pipeline and API automation expansion.

---

## 🛠 Tech Stack

- 🎭 Playwright – UI Automation  
- 🥒 Cucumber (BDD) – Behavior Driven Testing  
- 🟨 JavaScript (ES6+) – Core Language  
- 🟢 Node.js – Runtime Environment  
- ⚙️ GitHub Actions – CI/CD Pipeline  

---

## ⚙️ Framework Architecture

- 🧱 Page Object Model (POM) Design Pattern  
- ♻️ Reusable Utility Layer (Actions, Waits, Assertions)  
- 🧪 BDD Feature Files (Readable Scenarios)  
- 📂 Clean Separation of Layers:
  - Pages  
  - Step Definitions  
  - Hooks  
  - Utils  
  - Config  
- 🧩 Hooks for Setup & Teardown  

---

## 🔥 Debugging Features

- 📸 Screenshot Capture on Failure  
- 🎥 Video Recording (Configurable)  
- 🔍 Playwright Trace Viewer  
- 📊 HTML Cucumber Report  

---

## 🧪 Test Coverage

- ✅ User Registration Flow  
- ✅ Login (Valid & Invalid Scenarios)  
- ✅ UI Validations  
- ✅ Functional End-to-End Scenarios  

---

## ▶️ Execution

### Run all tests
```bash

npm test

Run tests with report
npm run test:report

Run in headed mode (UI visible)
npm run test:headed

## ⚙️ Environment Toggles (PowerShell)

# 🎥 Enable Video Recording
$env:VIDEO="true"; npm run test

# 🔍 Enable Trace
$env:TRACE="true"; npm run test

# 📸 Enable Screenshot on Failure
$env:SCREENSHOT="true"; npm run test

# 🖥️ Run in Headed Mode (Browser Visible)
$env:HEADLESS="false"; npm run test

# 🔥 Full Debug Mode (All Enabled)
$env:VIDEO="true"; $env:TRACE="true"; $env:SCREENSHOT="true"; $env:HEADLESS="false"; npm run test
```

---

## 🚀 Test Execution Commands

# ▶️ Run All Tests (Default - Headless)
npm test

# 🖥️ Run in Headed Mode
npm  test:headed

# 🔁 Run Failed Scenarios Only
npm test:rerun

# 📊 Run Tests + Generate Report
npm test:report
```
---

## 📊 Reports & Artifacts

* 📄 HTML Report: `reports/cucumber-report.html`
* 📸 Screenshots: `reports/screenshots/`
* 🎥 Videos: `reports/videos/`
* 🔍 Trace Files: `reports/trace/`


🚀 CI/CD (GitHub Actions)

This framework is integrated with GitHub Actions CI/CD pipeline.

✔ Features:
Auto trigger on every push
Headless execution in CI
Test reports as artifacts
Screenshot upload on failure
🔥 Key Highlights

✔ Scalable enterprise-style framework
✔ Cross-browser support (Chromium, Firefox, WebKit)
✔ CI/CD integration (GitHub Actions)
✔ Debug toggles (Video, Trace, Screenshot)
✔ Parallel execution ready
✔ Clean BDD architecture

🚀 Upcoming Enhancements
🛒 E-commerce End-to-End Flow
🔌 API Automation Integration
📊 Allure Reporting
⚙️ Jenkins Pipeline Integration
🧠 Test Data Management Strategy


👨‍💻 Author
Shivam Sarode
QA Automation Engineer | SDET
Playwright | Selenium | JavaScript | API Testing

⭐ Note

This automation framework is built following industry-standard best practices with a strong focus on scalability, maintainability, and CI/CD integration.
It supports environment-based configuration for debugging (Video, Trace, Screenshots), which are disabled by default to ensure faster and optimized test execution in CI pipelines.
The framework is designed to be production-ready and easily extendable for real-world enterprise automation needs.