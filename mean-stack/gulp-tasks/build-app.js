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
// --- App:Clean:Scripts
// ---

function cleanScripts() {
    var moduleFile = utils.moduleName() + '.js';
    var files = [path.join(config.build, 'bundles', '**/*.js'), path.join(config.build, moduleFile)];

    return del(files, {force: true});
}

// ---
// --- App:Clean:Styles
// ---

function cleanStyles() {
    var moduleFile = utils.moduleName() + '.css';
    var files = [path.join(config.build, 'bundles', '**/*.css'), path.join(config.build, moduleFile)];

    return del(files, {force: true});
}

// ---
// --- App:Build:Scripts
// ---

function lazyTemplateTask(templateName) {
    var pipe = lazypipe()
        .pipe(plugins.htmlmin, {collapseWhitespace: true})
        .pipe(plugins.ngTemplates, {
            path: function (file) {
                return path.relative(config.app, file);
            },
            module: templateName
        });

    return pipe();
}

function lazyNgTask(destFile) {
    var cacheName = 'app.build.scripts.' + destFile;

    var pipe = lazypipe()
        .pipe(plugins.sourcemaps.init)
        .pipe(plugins.cached, cacheName)
        .pipe(plugins.babel)
        .pipe(plugins.ngAnnotate)
        .pipe(plugins.remember, cacheName)
        .pipe(plugins.concat, destFile)
        .pipe(function () {
            return plugins.if(config.isProduction, plugins.uglify());
        })
        .pipe(plugins.sourcemaps.write);

    return pipe();
}

function scriptsTask(bundleName, tplFiles, scriptFiles, destDir) {
    var templateName = bundleName + '.tpls';
    var destFile = bundleName + '.js';

    return gulp.src(tplFiles)
        .pipe(lazyTemplateTask(templateName))
        .pipe(plugins.addSrc(scriptFiles))
        .pipe(lazyNgTask(destFile))
        .pipe(plugins.insert.transform(function (contents) {
            return utils.injectDependency(contents, templateName);
        }))
        .pipe(gulp.dest(destDir));
}

function scriptsPerBundleTask() {
    var componentsDir = path.join(config.app, 'components');
    var folders = globby.sync([path.join(componentsDir, '**/'), '!' + componentsDir]);

    var bundles = folders.map(function (folder) {
        var baseName = path.relative(componentsDir, folder);

        var tplsFiles = path.join(folder, '*.html');
        var jsFiles = [path.join(folder, '*Config.js'), path.join(folder, '*.js')];

        var bundleName = utils.moduleName(utils.camelCase(baseName));

        var destDir = path.join(config.build, 'bundles', baseName);

        return scriptsTask(bundleName, tplsFiles, jsFiles, destDir);
    });

    return es.merge(bundles);
}

function scriptsPerAppTask() {
    var tplsFiles = path.join(config.app, '**/*.html');
    var jsFiles = [path.join(config.app, '**/*Config.js'), path.join(config.app, '**/*.js')];

    return scriptsTask(utils.moduleName(), tplsFiles, jsFiles, config.build);
}

gulp.task('app:build:scripts', function () {
    return cleanScripts()
        .then(function () {
            var bundles = utils.streamToPromise(scriptsPerBundleTask());
            var app = utils.streamToPromise(scriptsPerAppTask());

            return Promise.all([bundles, app])
        });
});

// ---
// --- App:Build:Styles
// ---

function lazyLessTask(destFile) {
    var cacheName = 'app.build.styles.' + destFile;

    var pipe = lazypipe()
        .pipe(plugins.cached, cacheName)
        .pipe(plugins.less)
        .pipe(plugins.sourcemaps.init)
        .pipe(plugins.concat, destFile)
        .pipe(plugins.remember, cacheName)
        .pipe(function () {
            return plugins.if(config.isProduction, plugins.minifyCss());
        })
        .pipe(plugins.sourcemaps.write);

    return pipe();
}

function stylesTask(bundleName, styleFiles, destDir) {
    var destFile = bundleName + '.css';

    return gulp.src(styleFiles)
        .pipe(lazyLessTask(destFile))
        .pipe(gulp.dest(destDir));
}

function stylesPerBundleTask() {
    var componentsDir = path.join(config.app, 'components');
    var folders = globby.sync([componentsDir + '/**/', '!' + componentsDir]);

    var styles = folders.map(function (folder) {
        var baseName = path.relative(componentsDir, folder);
        var styleFiles = path.join(folder, '*.less');

        var bundleName = utils.moduleName(utils.camelCase(baseName));

        var destDir = path.join(config.build, 'bundles', baseName);

        return stylesTask(bundleName, styleFiles, destDir);
    });

    return es.merge(styles);
}

function stylesPerAppTask() {
    var styleFiles = path.join(config.app, '**/*.less');

    return stylesTask(utils.moduleName(), styleFiles, config.build);
}

gulp.task('app:build:styles', function () {
    return cleanStyles()
        .then(function () {
            var bundles = utils.streamToPromise(stylesPerBundleTask());
            var app = utils.streamToPromise(stylesPerAppTask());

            return Promise.all([bundles, app]);
        });
});
