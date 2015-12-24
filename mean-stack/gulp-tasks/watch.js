var gulp = require('gulp');

var path = require('path');

var config = require('./config');

// ---
// --- App:Watch
// ---

gulp.task('app:watch', function () {
    var scriptFiles = path.join(config.app, '**/*.js');
    var templateFiles = path.join(config.app, '**/*.html');
    var testFiles = path.join(config.test, '**/*.js');
    var styleFiles = path.join(config.app, '**/*.less');
    var vendorFiles = '.bower.json';

    gulp.watch(scriptFiles, ['app:lint:scripts', 'app:build:scripts']);

    gulp.watch(templateFiles, ['app:build:scripts']);

    gulp.watch(testFiles, ['app:lint:tests']);

    gulp.watch(styleFiles, ['app:build:styles']);

    gulp.watch(vendorFiles, ['app:vendor:build:scripts', 'app:vendor:build:styles']);
});

// ---
// --- Server:Watch
// ---

gulp.task('server:watch', function () {
    var scriptFiles = path.join(config.server, '**/*.js');

    gulp.watch(scriptFiles, ['server:lint:scripts']);
});
