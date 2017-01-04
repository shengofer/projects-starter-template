'use strict';

const
    express = require('express'),
    bootstrap = require('./bootstrap'),
    env = require('../config/env');

bootstrap(express()).listen(9003, () => {
    console.log(`Server running on port 9003`);
});
