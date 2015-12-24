describe('lectureListController', function () {
    'use strict';

    let sut;
    let mockGetItemAtIndex;
    let mockGetLength;
    let mockPageResource;
    let mockDeleteItem;
    let mockPromise;
    let mockResponse;
    let mockLecturesListService;

    beforeEach(module('mentoringApp.lectureList'));
    beforeEach(() => {
        mockLecturesListService = {
            getLectures: jasmine.createSpy('get lectures'),
            getSectionTitle: jasmine.createSpy('section title')
        };
        mockResponse = 'mock response';
        mockPromise = jasmine.createSpy().and.returnValue(mockResponse);
        mockGetItemAtIndex = jasmine.createSpy();
        mockGetLength = jasmine.createSpy();
        mockDeleteItem = jasmine.createSpy().and.returnValue({
            'then': mockPromise
        });
        mockPageResource = jasmine.createSpy().and.returnValue({
            getItemAtIndex: mockGetItemAtIndex,
            getLength: mockGetLength,
            deleteItem: mockDeleteItem
        });
        module(function ($provide) {
            $provide.factory('dynamicPaginationService', () => {
                return mockPageResource;
            });
        });
    });
    beforeEach(inject(($controller) => {
        sut = $controller('LectureListController', {
            lectures: 'mock lectures',
            LecturesListService: mockLecturesListService
        });
    }));

    it('should have lectures property', function () {
        expect(sut.lectures).toBeDefined();
    });

    it('should call mockLecturesListService.getLectures when getLectures called', function () {
        sut.getLectures();
        expect(mockLecturesListService.getLectures).toHaveBeenCalled();
    });

    it('should call mockLecturesListService.getSectionTitle when getSectionTitle called', function () {
        sut.getSectionTitle();
        expect(mockLecturesListService.getSectionTitle).toHaveBeenCalled();
    });
});

