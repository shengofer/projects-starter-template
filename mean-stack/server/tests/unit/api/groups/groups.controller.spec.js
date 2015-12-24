'use strict';

const path = require('path');
let GroupsController = require(path.resolve('./server/api/groups/groups.controller'));
const proxyquire = require('proxyquire');

let ProgramServiceStub;
let baseControllerStub;
let superGetByIdStub;
let sut;
let promise;

describe('Programs Controller Unit Tests:', function () {
    beforeEach(() => {
        promise = {
            then: jasmine.createSpy().andCallFake(function () {
                return promise;
            }),
            populate: jasmine.createSpy().andCallFake(function () {
                return promise;
            }),
            catch: jasmine.createSpy().andCallFake(function () {
                return promise;
            })
        };
        ProgramServiceStub = {
            getFullProgramById: jasmine.createSpy().andReturn(promise)
        };
        baseControllerStub = class {
            getById(req, res) {
                superGetByIdStub(req, res);
            }
        };
        superGetByIdStub = jasmine.createSpy();
    });


    beforeEach(() => {
        GroupsController = proxyquire(path.resolve('./server/api/groups/groups.controller'),
            {
                '../programs/program.service': ProgramServiceStub,
                [path.resolve('./server/shared/base.controller')]: baseControllerStub
            });
        sut = new GroupsController;
    });

    it('should exist', () => {
        expect(sut).toBeDefined();
    });

    describe('_getProgramByGroup', () => {
        it('should call getFullProgramById method of ProgramService service with right id', () => {
            let group = {programId: 'sss111'};
            sut._getProgramByGroup(group);
            expect(ProgramServiceStub.getFullProgramById).toHaveBeenCalledWith(group.programId);
        });
    });
});
