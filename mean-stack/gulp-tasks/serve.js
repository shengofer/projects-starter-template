var gulp = require('gulp');

var plugins = require('./plugins');
var config = require('./config');

var server;

gulp.task('serve', function () {
    server = plugins.liveServer(['--harmony', 'app.js']);

    return server.start();
});

process.on('exit', function () {
    if (server) {
        server.stop();
    }
});
