'use strict';
const path = require('path');
const GroupService = require(path.resolve('./server/api/groups/groups.service'));
describe('Group Service :', ()=> {
    let sut;
    beforeEach((done) => {
        sut = GroupService;
        done();
    });
    it('should exist', ()=> {
        expect(sut).toBeDefined();
    });
    describe('method getGroupByID', ()=> {
        it('should exist', ()=> {
            expect(sut.getGroupByID).toBeDefined();
        });

        it('should return promise', ()=> {
            expect(sut.getGroupByID()).toBeDefined();
        });
    });

    describe('method saveGroup', ()=> {
        it('should exist', ()=> {
            expect(sut.saveGroup).toBeDefined();
        });
    });
});
