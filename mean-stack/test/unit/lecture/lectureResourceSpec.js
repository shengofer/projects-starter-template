describe('LectureResource', () => {
    'use strict';

    const lectureEndpointUrl = '/api/lectures/:id';
    let sut;
    let mockResource;
    let mockActions;
    let mockResponse;
    let lectureObj;

    beforeEach(module('mentoringApp.lecture'));

    beforeEach(function () {
        mockResponse = {$promise: {}};
        mockActions = {
            save: jasmine.createSpy().and.returnValue(mockResponse),
            update: jasmine.createSpy().and.returnValue(mockResponse),
            query: jasmine.createSpy().and.returnValue(mockResponse),
            get: jasmine.createSpy().and.returnValue(mockResponse)
        };
        mockResource = jasmine.createSpy().and.returnValue(mockActions);

        module(function ($provide) {
            $provide.value('$resource', mockResource);
        });
    });

    beforeEach(function () {
        inject(function (_LectureResource_) {
            sut = _LectureResource_;
        });
    });

    it('should be defined', function () {
        expect(sut).toBeDefined();
    });

    it('should create resource and point it to groups endpoint url', () => {
        expect(mockResource).toHaveBeenCalledWith(lectureEndpointUrl, {
            id: '@_id',
            page: '@page',
            limit: '@limit'
        }, {
            query: {
                isArray: false
            },
            update: {
                method: 'PUT'
            }
        });
    });

    describe('addLecture method', function () {
        beforeEach(() => {
            lectureObj = {};
        });

        it('should call save method of resource with lecture object', function () {
            sut.addLecture(lectureObj);
            expect(mockActions.save).toHaveBeenCalledWith(lectureObj);
        });

        it('should return promise', function () {
            expect(sut.addLecture(lectureObj)).toBe(mockResponse.$promise);
        });
    });

    describe('editLecture method', function () {
        beforeEach(() => {
            lectureObj = {
                _id: '564c53e3e4b03655d6ed0e76',
                description: 'THIS is angular desk',
                duration: 7200,
                status: 'PLANNED',
                title: 'Angular',
                type: 'WORKSHOP'
            };
        });

        it('should call edit method of resource with lecture object', function () {
            sut.editLecture(lectureObj);
            expect(mockActions.update).toHaveBeenCalledWith(lectureObj);
        });

        it('should return promise', function () {
            expect(sut.editLecture(lectureObj)).toBe(mockResponse.$promise);
        });
    });

    describe('getLectures', function () {
        it('should use query action', function () {
            sut.getLectures();
            expect(mockActions.query).toHaveBeenCalled();
        });

        it('should return promise', function () {
            expect(sut.getLectures()).toEqual(mockResponse.$promise);
        });
    });

    describe('getLecture', function () {
        it('should use get action', function () {
            let id = 'aaa222';
            sut.getLecture(id);
            expect(mockActions.get).toHaveBeenCalledWith({id: id});
        });

        it('should return promise', function () {
            expect(sut.getLecture('aaa555')).toEqual(mockResponse.$promise);
        });
    });

    describe('getItems', function () {
        it('should use query action', function () {
            let options = 'options';
            sut.getItems(options);
            expect(mockActions.query).toHaveBeenCalledWith(options);
        });

        it('should return promise', function () {
            expect(sut.getItems()).toEqual(mockResponse.$promise);
        });
    });
});
