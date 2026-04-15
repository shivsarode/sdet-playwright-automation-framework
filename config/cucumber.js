module.exports = {
  default: {
    require: ["step-definitions/*.js", "hooks/*.js"],
    format: [
      "progress",
      "html:reports/html-report/report.html"
    ],
    parallel: 2
  }
};