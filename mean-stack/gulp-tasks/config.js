var bowerJson = require('../bower.json');

var node_env = process.env.NODE_ENV;
var isProduction = node_env === 'production';

module.exports = {
    cwd: process.cwd(),
    app: bowerJson.appPath,
    isProduction: isProduction,
    test: 'test',
    server: 'server',
    build: 'build',
    dist: 'dist',
    templates: [bowerJson.appPath + '/**/*.html', '!' + bowerJson.appPath + '/**/index.html'],
    baseUrl: 'http://127.0.0.1:8000/',
    seleniumDir: './node_modules/gulp-protractor/node_modules/protractor/selenium/'
};
