module.exports = {
  default: {
    require: ['step-definitions/*.js', 'hooks/*.js'],
    format: [
      'progress',
      'json:reports/cucumber-report.json'
    ],
    parallel: 2
  }
};