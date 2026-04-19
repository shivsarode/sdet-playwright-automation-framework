# 🚀 SDET Playwright Automation Framework

![Playwright](https://img.shields.io/badge/Playwright-Automation-green)
![Cucumber](https://img.shields.io/badge/Cucumber-BDD-brightgreen)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)

## 🧠 Overview

A scalable and robust End-to-End Test Automation Framework built using Playwright with a Cucumber (BDD) approach.

This framework is designed using real-world industry standards focusing on:

- Clean architecture  
- Reusability  
- Maintainability  
- Debuggability (Screenshots, Video, Trace)  

🚧 Currently under active development with CI/CD and API automation enhancements planned.

---

## 🛠 Tech Stack

- 🎭 Playwright – UI Automation  
- 🥒 Cucumber (BDD) – Behavior Driven Testing  
- 🟨 JavaScript (ES6+) – Core Language  
- 🟢 Node.js – Runtime Environment  

---

## ⚙️ Framework Architecture

- 🧱 Page Object Model (POM) Design Pattern  
- ♻️ Reusable Utility Layer (Actions, Waits, Assertions)  
- 🧪 BDD Feature Files for readable scenarios  
- 📂 Clean separation of layers (Pages / Steps / Hooks / Utils)  
- 🧩 Hooks for setup & teardown  

---

## 🔥 Debugging Features

- 📸 Automatic Screenshot Capture on Failure  
- 🎥 Video Recording for each test execution  
- 🔍 Playwright Trace Viewer Integration  
- 📊 HTML Reporting using Cucumber HTML Reporter  

---

## 🧪 Test Coverage

- ✅ User Registration (Signup Flow)  
- ✅ Login (Valid & Invalid Scenarios)  
- ✅ UI Validations using Assertions  
- ✅ Functional Flow Testing  

---

## ▶️ Execution

### Run all tests

npm test

### Run tests with report

npm run test:report

### Run in headed mode (UI visible)

npm run test:headed

### Run with environment toggles (PowerShell)

Enable Video:
$env:VIDEO="true"; npm test

Enable Trace:
$env:TRACE="true"; npm test

Enable Screenshot (on failure):
$env:SCREENSHOT="true"; npm test

Run in headed mode:
$env:HEADLESS="false"; npm test

Run with all debug features:
$env:VIDEO="true"; $env:TRACE="true"; $env:SCREENSHOT="true"; $env:HEADLESS="false"; npm test

## 📊 Reports

HTML Report
reports/cucumber-report.html

Screenshots
reports/screenshots/

Videos (only when enabled)
reports/videos/

Trace (only when enabled)
reports/trace/

## 🚀 Key Highlights

✔ Scalable framework structure
✔ Cross-browser support (Chromium, Firefox, WebKit)
✔ Environment-based debug toggles (Video, Trace, Screenshot)
✔ Optimized execution (debug features disabled by default)
✔ CI/CD ready architecture
✔ Industry-standard BDD approach

## 🚀 Upcoming Enhancements

🛒 E-commerce flow (Add to Cart → Checkout)
🔌 API Automation Integration
📊 Allure Reporting
⚙️ CI/CD Pipeline (GitHub Actions / Jenkins)
⚡ Parallel Execution Support
🧠 Advanced Test Data Management Strategy

## 👨‍💻 Author

Shivam Sarode
QA Automation Engineer | SDET
Playwright | Selenium | JavaScript | API Testing

## ⭐ Note

This framework uses environment-based configuration and debug toggles to ensure clean, fast, and scalable automation execution. Debug features like video, trace, and screenshots are disabled by default and can be enabled when required.
