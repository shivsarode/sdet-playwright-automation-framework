
module.exports = {
    default: {
        require: [
            'step-definitions/**/*.js',
            'hooks/**/*.js'
        ],
        format: ['progress'],
        parallel: 4,
        publishQuiet: true
    }
};
