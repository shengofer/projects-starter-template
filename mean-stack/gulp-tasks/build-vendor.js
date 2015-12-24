var gulp = require('gulp');

var path = require('path');
var del = require('del');
var globby = require('globby');
var lazypipe = require('lazypipe');
var bowerFiles = require('main-bower-files');

var plugins = require('./plugins');
var utils = require('./utils');
var config = require('./config');

// ---
// --- Vendor:Clean:Scripts
// ---

function cleanScripts() {
    var files = path.join(config.build, 'vendors.js');

    return del(files, {force: true});
}


// ---
// --- Vendor:Clean:Styles
// ---

function cleanStyles() {
    var files = path.join(config.build, 'vendors.css');

    return del(files, {force: true});
}

// ---
// --- Vendor:Build:Scripts
// ---

function lazyJsTask(destFile) {
    var pipe = lazypipe()
        .pipe(plugins.sourcemaps.init)
        .pipe(plugins.concat, destFile)
        .pipe(function () {
            return plugins.if(config.isProduction, plugins.uglify());
        })
        .pipe(plugins.sourcemaps.write);

    return pipe();
}

function generateScripts() {
    var files = bowerFiles({filter: '**/*.js'});
    var destFile = 'vendors.js';

    var stream = gulp.src(files)
        .pipe(lazyJsTask(destFile))
        .pipe(gulp.dest(config.build));

    return utils.streamToPromise(stream);
}

gulp.task('app:vendor:build:scripts', function () {
    return cleanScripts().then(generateScripts);
});

// ---
// --- Vendor:Build:Styles
// ---

function lazyCssTask(destFile) {
    var pipe = lazypipe()
        .pipe(plugins.sourcemaps.init)
        .pipe(plugins.concat, destFile)
        .pipe(function () {
            return plugins.if(config.isProduction, plugins.minifyCss());
        })
        .pipe(plugins.sourcemaps.write);

    return pipe();
}

function generateStyles() {
    var files = bowerFiles({
        filter: '**/*.css',
        overrides: {
            angular: {main: ['./*.css']}
        }
    });
    var destFile = 'vendors.css';

    var stream = gulp.src(files)
        .pipe(lazyCssTask(destFile))
        .pipe(gulp.dest(config.build));

    return utils.streamToPromise(stream);
}

gulp.task('app:vendor:build:styles', function () {
    return cleanStyles().then(generateStyles);
});
