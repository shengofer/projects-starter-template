'use strict';

const express = require('express');
const ControllerClass = require('./groups.controller');
const controller = new ControllerClass();
const router = express.Router();

router.route('')
    .get(controller.get.bind(controller))
    .post(controller.addNewGroup.bind(controller));

router.route('/:id')
    .get(controller.getById.bind(controller))
    .put(controller.updateGroup.bind(controller))
    .delete(controller.delete.bind(controller));

router.route('/:id/start-staffing')
    .post(controller.startStaffing.bind(controller));

module.exports = router;
