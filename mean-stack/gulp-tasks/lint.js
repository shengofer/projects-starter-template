var gulp = require('gulp');

var path = require('path');
var del = require('del');
var globby = require('globby');
var lazypipe = require('lazypipe');
var es = require('event-stream');

var plugins = require('./plugins');
var utils = require('./utils');
var config = require('./config');

// ---
// --- App:Lint:Scripts
// ---

function jsLintTask() {
    var pipe = lazypipe()
        .pipe(plugins.cached, 'app.lint.scripts')
        .pipe(plugins.eslint)
        .pipe(plugins.eslint.format)
        .pipe(plugins.eslint.failAfterError)
        .pipe(plugins.remember, 'app.lint.scripts');

    return pipe();
}

// ---
// --- App:Lint:Scripts
// ---

gulp.task('app:lint:scripts', function() {
    var files = path.join(config.app, '/**/*.js');

    return gulp.src(files)
        .pipe(jsLintTask());
});

// ---
// --- App:Lint:Test
// ---

gulp.task('app:lint:tests', function() {
    var files = path.join(config.test, '/**/*.js');

    return gulp.src(files)
        .pipe(jsLintTask());
});

// ---
// --- Server:Lint:Test
// ---

gulp.task('server:lint:scripts', function() {
    var files = path.join(config.server, '/**/*.js');

    return gulp.src(files)
        .pipe(jsLintTask());
});


// ---
// --- Lint:Test
// ---

gulp.task('lint', ['app:lint:scripts', 'app:lint:tests', 'server:lint:scripts']);
