var gulp = require('gulp');

var runSequence = require('run-sequence');

// ---
// --- Build
// ---

gulp.task('build', function(done) {
    runSequence(
        ['app:vendor:build:scripts', 'app:vendor:build:styles'],
        ['app:build:scripts', 'app:build:styles'],
        done
    );
});
