var gulp = require('gulp');

var path = require('path');
var fs = require('fs');

var karma = require('karma');
var e2e = require('gulp-protractor');

var utils = require('./utils');
var config = require('./config');
var plugins = require('./plugins');

// ---
// --- App:Tests:Unit
// ---


gulp.task('app:tests:unit', function () {
    return utils.runKarma({
        configFile: path.join(config.cwd, 'karma.conf.js'),
        singleRun: true
    });
});

// ---
// --- App:Tests:E2E
// ---

function updateWebDriver() {
    return new Promise(function (fulfil, reject) {
        e2e.webdriver_update(function (err) {
            if (err) {
                reject(err);
            } else {
                fulfil();
            }
        });
    });
}

function getSeleniumJar() {
    return fs.readdirSync(config.seleniumDir).find(function (fileName) {
        return fileName.indexOf('selenium-server-standalone') !== -1;
    });
}

function runProtractor() {
    var stream;
    var files = path.join(config.test, 'e2e/**/*.js');

    var seleniumJar = getSeleniumJar();

    if (!seleniumJar) {
        return Promise.reject(new Error('Selenium jar not found.'));
    }

    stream = gulp.src(files, {read: false})
        .pipe(e2e.protractor({
            configFile: path.join(config.cwd, 'karma-e2e.conf.js'),
            args: [
                '--baseUrl', config.baseUrl,
                '--seleniumServerJar', config.seleniumDir + '/' + seleniumJar
            ]
        }));

    return utils.streamToPromise(stream);
}

gulp.task('app:tests:e2e', function () {
    return updateWebDriver().then(runProtractor());
});

// ---
// --- Server:Tests:Unit
// ---

gulp.task('server:tests:unit', function () {
    process.env.NODE_ENV = 'test';

    gulp.src(['app.js','server/tests/**/*.js'])
        .pipe(plugins.jasmineNode({
            timeout: 10000
        }));
});

// ---
// --- Tests
// ---

gulp.task('test', ['app:tests:unit']);
