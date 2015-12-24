'use strict';

/**
 * Module dependencies.
 */
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const config = require('./config');
const path = require('path');

module.exports = function () {
    // Initialize express app
    const app = express();

    // Setting application local variables
    app.locals.title = config.app.title;
    app.locals.description = config.app.description;

    // Passing the request url to environment locals
    app.use(function (req, res, next) {
        res.locals.url = req.protocol + ':// ' + req.headers.host + req.url;
        next();
    });

    // Showing stack errors
    app.set('showStackError', true);

    // Environment dependent middleware
    if (process.env.NODE_ENV === 'development') {
        // Enable logger (morgan)
        app.use(morgan('dev'));
    }

    // Request body parsing middleware should be above methodOverride
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    // app.use(bodyParser.json({type: 'application/vnd.api+json'}));

    // Enable jsonp
    app.enable('jsonp callback');

    app.use('/', express.static(path.resolve('./app')));
    app.use('/build', express.static(path.resolve('./build')));

    app.use('/api/people', require(path.resolve('./server/api/people')));
    app.use('/api/programs', require(path.resolve('./server/api/programs')));
    app.use('/api/lectures', require(path.resolve('./server/api/lectures')));
    app.use('/api/programInstances', require(path.resolve('./server/api/programInstances')));
    app.use('/api/lectureInstances', require(path.resolve('./server/api/lectureInstances')));
    app.use('/api/modules', require(path.resolve('./server/api/modules')));

    app.use('/api/groups', require(path.resolve('./server/api/groups')));
    app.get('/', function (req, res) {
        res.sendFile('./index.html');
    });

    app.get('*', (req, res) => {
        res.status(404).json({'err': 'page not found'});
    });

    app.use(function (err) {
        if (err) {
            console.error(err);
        }
    });
    return app;
};
