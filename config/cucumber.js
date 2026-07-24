module.exports = {
  default: {
    require: [
      'step-definitions/*.js',
      'hooks/*.js'
    ],
    format: [
      'progress'
    ],
    paths: [
      'features/**/*.feature'
    ],
    parallel: 2,
    publishQuiet: true
  }
};