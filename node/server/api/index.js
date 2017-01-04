'use strict';
const path = require('path');

module.exports = function apiBootstrap(app) {
    app.get('/*', function(req, res){
        res.sendFile(path.resolve('src/index.html'));
    });
    app
        .use(require('./static'))
        .use('/api', require('./hello'));

    return app
};

