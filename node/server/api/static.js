const express = require('express');
const staticRouter = express.Router();

staticRouter
    .use(express.static(__dirname + '../../src'));

module.exports = staticRouter;