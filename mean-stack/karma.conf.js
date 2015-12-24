module.exports = function (config) {
    'use strict';
    config.set({
        browsers: ['PhantomJS2'],
        frameworks: ['jasmine'],
        reporters: ['dots', 'coverage'],
        files: [
            'build/vendors.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'app/**/*Config.js',
            'app/**/*Routes.js',
            'app/**/*.js',
            'test/unit/**/*.js'
        ],
        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            'app/**/*.js': ['coverage', 'babel'],
            'test/**/*.js': ['babel']
        },
        coverageReporter: {
            type: 'html',
            dir: 'build/coverage/'
        }
    });
};
