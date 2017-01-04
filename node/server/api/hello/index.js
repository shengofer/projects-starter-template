const helloRouter = require('express').Router();

module.exports = helloRouter
    .use(require('./hello.router'));
