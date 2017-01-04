const preMiddleware = require('./middleware/preMiddleware');
const apiBootstrap = require('../api');

module.exports = function bootstrap(app, config) {

    preMiddleware(app, config);
    apiBootstrap(app, config);

    return app;
};
