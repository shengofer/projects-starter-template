'use strict';
const path = require('path');
const proxyquire = require('proxyquire');

describe('People Controller Unit Tests:', function () {
    let sut;
    let constructor;
    let mockGet;
    let mockService;
    let req;
    let res;
    beforeEach(() => {
        mockGet = jasmine.createSpy('mockGet');
        mockService = {
            get: mockGet
        };
        constructor = proxyquire(path.resolve('./server/api/people/people.controller'), {'./people.service': mockService});
        sut = new constructor();
        req = {test: 'test req'};
        res = {test: 'test res'};
    });

    it('should exist', () => {
        expect(sut).toBeDefined();
    });

    it('should call mockService get method with req and res', () => {
        sut.get(req, res);
        expect(mockGet).toHaveBeenCalledWith(req, res);
    });
});

