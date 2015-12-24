'use strict';

let sut;
let testModel;

const path = require('path');
const BaseController = require(path.resolve('./server/shared/base.controller'));
const httpMocks = require('node-mocks-http');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const $q = require('q');
let promise;
let deepPopulateStub;

describe('Base Controller Unit Tests:', function () {
    beforeEach((done) => {
        const testSchema = new Schema({title: String});
        testModel = mongoose.model('testSchema', testSchema);
        deepPopulateStub = jasmine.createSpy().andCallFake(function () {
            return promise;
        });
        promise = {
            then: jasmine.createSpy().andCallFake(function () {
                return promise;
            }),
            deepPopulate: deepPopulateStub,
            catch: jasmine.createSpy().andCallFake(function () {
                return promise;
            }),
            skip: jasmine.createSpy().andCallFake(function () {
                return promise;
            }),
            limit: jasmine.createSpy().andCallFake(function () {
                return promise;
            })
        };
        testModel.findById = jasmine.createSpy().andReturn(promise);
        testModel.find = jasmine.createSpy().andReturn(promise);
        sut = new BaseController(testModel);
        done();
    });

    describe('parsePopulateQuery', () => {
        it('should return empty array if query string is undefined', () => {
            expect(sut.parsePopulateQuery()).toEqual([]);
        });

        it('should return parsed array if query string is defined', () => {
            expect(sut.parsePopulateQuery('field1,field2')).toEqual(['field1', 'field2']);
        });

        it('should return parsed array if query string includes nested fields', () => {
            expect(sut.parsePopulateQuery('field1.subfiled1,field2')).toEqual(['field1.subfiled1', 'field2']);
        });
    });

    describe('Method get', function () {
        it('return expected object on get, if success result', function (done) {
            const findPromise = $q.fcall(function () {
                return [{'test': 'test'}];
            });
            testModel.find.andReturn(findPromise);
            const request = httpMocks.createRequest({
                method: 'GET',
                url: '/',
                params: {id: 42}
            });
            const response = httpMocks.createResponse();
            sut.get(request, response)
                .then(() => {
                    const data = JSON.parse(response._getData());
                    expect(response.statusCode).toBe(200);
                    expect(data.status).toBe('success');
                    expect(data.total).toBe(1);
                    expect(data.responses).toEqual([{
                        'test': 'test'
                    }]);
                    expect(testModel.find).toHaveBeenCalledWith({id: 42});
                    done();
                });
        });

        it('return error on get, if exception', function (done) {
            const findPromise = $q.reject({'msg': 'some error'});
            testModel.find.andReturn(findPromise);
            const request = httpMocks.createRequest({
                method: 'GET',
                url: '/',
                params: {id: 4}
            });
            const response = httpMocks.createResponse();
            sut.get(request, response)
                .then(() => {
                    const data = JSON.parse(response._getData());
                    expect(response.statusCode).toBe(404);
                    expect(data).toEqual({'msg': 'some error'});
                    expect(testModel.find).toHaveBeenCalledWith({id: 4});
                    done();
                });
        });
    });

    describe('Method getById', () => {
        let request;
        beforeEach(() => {
            request = {
                method: 'GET',
                params: {id: 42},
                query: {populate: 'query1,query2'}

            };
        });
        it('should call parsePopulateQuery if populate query is defined', () => {
            spyOn(sut, 'parsePopulateQuery');
            sut.getById(request);
            expect(sut.parsePopulateQuery).toHaveBeenCalledWith(request.query.populate);
        });
        it('should call deepPopulate method if populate query is defined', () => {
            sut.getById(request);
            expect(deepPopulateStub).toHaveBeenCalledWith(['query1', 'query2']);
        });
    });


    afterEach(() => {
        delete mongoose.models.testSchema;
    });
});
