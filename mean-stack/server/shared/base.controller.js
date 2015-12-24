'use strict';

const mongoose = require('mongoose');
const _lodash = require('lodash');
const RESPONSES = require('./responses/responses.status');

class BaseController {

    constructor(model) {
        if (model instanceof mongoose.Schema) {
            throw new Error('Model should be a mongoose.Schema instance');
        }
        this._model = model;
    }

    getModel() {
        return this._model;
    }

    getModelInstance(config) {
        return new this._model(config);
    }

    parsePopulateQuery(query) {
        if (!query) return [];
        return query.split(',');
    }

    get(req, res) {
        const model = this.getModel();
        let skip = null;
        let limit = null;
        if (req.query.page && req.query.limit) {
            limit = parseInt(req.query.limit, 10);
            skip = parseInt(req.query.page, 10) * limit;
        }

        return model.find(req.params).skip(skip).limit(limit)
            .then((results) => {
                res.status(RESPONSES.STATUS.OK).json({
                    status: 'success',
                    responses: results
                });
            }).catch((err) => {
                res.status(RESPONSES.STATUS.NOT_FOUND).json(err);
            });
    }

    add(req, res) {
        const modelInstance = this.getModelInstance(req.body);
        return modelInstance.save()
            .then((result) => {
                res.status(RESPONSES.STATUS.CREATED).json({
                    status: 'success',
                    response: result
                });
            })
            .catch((err) => {
                res.send(err);
            });
    }

    getById(req, res) {
        const model = this.getModel();
        let populateQuery;

        if (req.query && req.query.populate) {
            populateQuery = this.parsePopulateQuery(req.query.populate);
        }
        return model.findById(req.params.id)
            .deepPopulate(populateQuery)
            .then((result) => {
                res.status(RESPONSES.STATUS.OK).json(result);
            })
            .catch((err) => {
                res.status(RESPONSES.STATUS.NOT_FOUND).json(err);
            });
    }

    update(req, res) {
        const model = this.getModel();
        return model.findById(req.params.id)
            .then((modelInstance) => {
                const updatedInstance = _lodash.extend(modelInstance, req.body);
                return updatedInstance.save();
            })
            .then((result) => {
                res.status(RESPONSES.STATUS.OK).json({
                    status: 'success',
                    response: result
                });
            })
            .catch((err) => {
                res.status(RESPONSES.STATUS.NOT_FOUND).json(err);
            });
    }

    delete(req, res) {
        const model = this.getModel();
        return model.remove({_id: req.params.id})
            .then((result)=> {
                res.json({
                    status: 'success',
                    response: result
                });
            })
            .catch((err) => {
                res.send(err);
            });
    }
}

module.exports = BaseController;
