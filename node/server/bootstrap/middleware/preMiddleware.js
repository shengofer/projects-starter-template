'use strict';

var cors = require('cors');
var bodyParser = require('body-parser');

module.exports = function preMiddleware(app) {
    return app
        .use(cors())
        .use(bodyParser.json())
        .use(bodyParser.urlencoded({
            extended: true
        }));
};
