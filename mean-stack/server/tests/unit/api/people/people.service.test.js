'use strict';
const path = require('path');
const proxyquire = require('proxyquire');

describe('People Service :', ()=> {
    let sut;
    let PersonMock;
    let req;
    let find;

    beforeEach(() => {
        find = jasmine.createSpy('find').andReturn({
            then: jasmine.createSpy('find.then').andReturn({
                catch: jasmine.createSpy('find.catch')
            })
        });
        PersonMock = {
            find: find
        };
        sut = proxyquire(path.resolve('./server/api/people/people.service'), {'./person.model': PersonMock});
        req = {
            query: {}
        };
    });

    it('should exist', ()=> {
        expect(sut).toBeDefined();
    });
    describe('method get', ()=> {
        it('should be defined', ()=> {
            expect(sut.get).toBeDefined();
        });

        it('should be called find with empty object', ()=> {
            sut.get(req);
            expect(find).toHaveBeenCalledWith({});
        });

        it('should be called find with query', ()=> {
            req.query.query = 'test';
            sut.get(req);
            expect(find).toHaveBeenCalledWith({name: new RegExp(req.query.query, 'i')});
        });

        it('should be called find with category', ()=> {
            req.query.category = 'test';
            sut.get(req);
            expect(find).toHaveBeenCalledWith({availableAs: {$elemMatch: {$eq: req.query.category}}});
        });

        it('should be called find with query and category', ()=> {
            req.query.query = 'test';
            req.query.category = 'test';
            sut.get(req);
            expect(find).toHaveBeenCalledWith({
                name: new RegExp(req.query.query, 'i'),
                availableAs: {$elemMatch: {$eq: req.query.category}}
            });
        });
    });
});
