var gulp = require('gulp');

var path = require('path');

var runSequence = require('run-sequence');

var utils = require('./utils');
var config = require('./config');

// ---
// --- Dev
// ---


gulp.task('dev', function (done) {
    runSequence('lint', 'test', 'build', ['app:watch', 'server:watch'], ['serve'], done);
});

// ---
// --- TDD
// ---

gulp.task('tdd', function() {
    return utils.runKarma({
        configFile: path.join(config.cwd, 'karma.conf.js')
    });
});
