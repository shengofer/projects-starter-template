var gulp = require('gulp');

var path = require('path');

var plato = require('plato');
var del = require('del');

var config = require('./config');
var plugins = require('./plugins');
var utils = require('./utils');

// ---
// --- App:Plato
// ---

function runPlato(files, outDir, options) {
    return new Promise(function (fulfil, reject) {
        plato.inspect(files, outDir, options, function (err) {
            if (err) {
                reject(err);
            } else {
                fulfil();
            }
        });
    });
}

gulp.task('plato', function () {
    var files = path.join(config.app, '**/*.js');
    var tmpDir = path.join(config.build, 'metrics/.tmp');
    var reportFiles = path.join(tmpDir, '**/*.js');
    var reportDir = path.join(config.build, 'metrics/report');

    var stream = gulp.src(files)
        .pipe(plugins.babel())
        .pipe(gulp.dest(tmpDir));

    return utils.streamToPromise(stream)
        .then(runPlato(reportFiles, reportDir, {}))
        .then(function() {
            return del(tmpDir);
        });
});
