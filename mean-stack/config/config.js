'use strict';

/**
 * Module dependencies.
 */
const _lodash = require('lodash');

/**
 * Load app configurations
 */
module.exports = _lodash.extend(
    require('./env/all'),
    require('./env/' + process.env.NODE_ENV) || {}
);
