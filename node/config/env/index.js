'use strict';

const
    loadEnv = require('./load'),
    getenv = require('getenv');

loadEnv('.env');

module.exports = {
    ui: {
        isDevelopmentMode: getenv.bool('DEVELOPMENT_MODE', false),
        backOfficeBaseUrl: getenv('BACK_OFFICE_BASE_URL', '/api/v1/pos')
    },
    webpackServer: {
        host: getenv('WEBPACK_SERVER_HOST', 'localhost'),
        port: getenv.int('WEBPACK_SERVER_PORT', 9002)
    },
    fakeApiServer: {
        port: getenv.int('FAKE_API_SERVER_PORT', 9003)
    }
};
