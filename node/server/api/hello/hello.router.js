'use strict';

const HelloController = require('./hello.controller');
const HELLO_ENDPOINT = '/hello';
const router = require('express').Router();

router
    .get(HELLO_ENDPOINT, (req, res) => {
        HelloController.greet(req, res)
    });


module.exports = router;