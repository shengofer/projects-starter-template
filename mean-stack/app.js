'use strict';

var init = require('./config/init')(),
    config = require('./config/config'),
    mongoose = require('mongoose');

mongoose.Promise = require('q').Promise;

// Bootstrap db connection
var db = mongoose.connect(config.db);

// Init the express application
var app = require('./config/express')(db);

app.listen(config.port, (err) => {
    err ? console.error(err) : console.log('Express server listening on port ' + config.port);
});

//exports = module.exports = app;
