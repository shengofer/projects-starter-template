describe('LectureService', () => {
    'use strict';
    let sut;
    let lectureObj;
    let mockLectureResource;
    let mockResponse;
    let mockStateProvider;
    let mockThen;
    let $rootScope;

    beforeEach(module('mentoringApp.lecture'));

    beforeEach(function () {
        lectureObj = {
            description: 'THIS is angular desk',
            duration: 7200,
            status: 'PLANNED',
            title: 'Angular',
            type: 'WORKSHOP'
        };
        mockThen = jasmine.createSpy();
        mockResponse = {then: mockThen};
        mockLectureResource = {
            addLecture: jasmine.createSpy().and.returnValue(mockResponse),
            editLecture: jasmine.createSpy().and.returnValue(mockResponse)
        };
        mockStateProvider = {
            go: jasmine.createSpy()
        };
        module(function ($provide) {
            $provide.value('LectureResource', mockLectureResource);
            $provide.value('$state', mockStateProvider);
        });
    });

    beforeEach(function () {
        inject(function (LectureService, _$rootScope_) {
            sut = LectureService;
            $rootScope = _$rootScope_;
        });
    });
    describe('submitLecture', () => {
        it('should call addLecture method of resource if no id', function () {
            sut.submitLecture(lectureObj);
            expect(mockLectureResource.addLecture).toHaveBeenCalledWith(lectureObj);
        });

        it('should call editLecture method of resource if there is id', function () {
            lectureObj._id = '555';
            sut.submitLecture(lectureObj);
            expect(mockLectureResource.editLecture).toHaveBeenCalledWith(lectureObj);
        });

        it('should return promise', () => {
            expect(sut.submitLecture(lectureObj)).toBe(mockResponse);
        });

        it('should call backToLectures method', function () {
            spyOn(sut, 'backToLectures');
            sut.submitLecture(lectureObj);
            mockThen.calls.argsFor(0)[0]({responses: {}});
            $rootScope.$digest();
            expect(sut.backToLectures).toHaveBeenCalled();
        });
    });


    describe('backToLectures method', () => {
        it('should call go method of $state provider with right state', function () {
            sut.backToLectures();
            expect(mockStateProvider.go).toHaveBeenCalledWith('lectureList');
        });
    });
});
