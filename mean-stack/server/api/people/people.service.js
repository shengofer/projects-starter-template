'use strict';

const path = require('path');
const Person = require('./person.model');
const RESPONSES = require(path.resolve('./server/shared/responses/responses.status'));


exports.get = function (req, res) {
    let query = {};
    if (req.query.query) {
        query.name = new RegExp(req.query.query, 'i');
    }
    if (req.query.category) {
        query.availableAs = {$elemMatch: {$eq: req.query.category}};
    }
    let skip = null;
    let limit = null;
    if (req.query.page && req.query.limit) {
        limit = parseInt(req.query.limit, 10);
        skip = parseInt(req.query.page, 10) * limit;
    }

    return Person.find(query).skip(skip).limit(limit)
        .then((result) => {
            res.status(RESPONSES.STATUS.OK).json({
                status: 'success',
                responses: result
            });
        })
        .catch((err) => {
            res.status(RESPONSES.STATUS.NOT_FOUND).json(err);
        });
};

exports.getById = function (req, res) {
    return Person.findById(req.params.id)
        .populate('groupActivity')
        .then((result) => {
            res.status(RESPONSES.STATUS.OK).json(result);
        })
        .catch((err) => {
            res.status(RESPONSES.STATUS.NOT_FOUND).json(err);
        });
};
