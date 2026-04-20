module.exports = {
  default: {
    require: [
      'step-definitions/*.js',
      'hooks/*.js'
    ],
    format: [
      'progress',
      'json:reports/cucumber-report.json'
    ],
    paths: [
      'features/**/*.feature'
    ],
    parallel: 2,
    publishQuiet: true
  }
};