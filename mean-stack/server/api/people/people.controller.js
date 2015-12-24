'use strict';

const path = require('path');
const Person = require('./person.model');
const BaseController = require(path.resolve('./server/shared/base.controller'));
const PeopleService = require('./people.service');

class PeopleController extends BaseController {
    constructor() {
        super(Person);
    }

    get(req, res) {
        return PeopleService.get(req, res);
    }

    getById(req, res) {
        return PeopleService.getById(req, res);
    }
}
module.exports = PeopleController;
