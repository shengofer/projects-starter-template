describe('lectureListRoutes', function () {
    'use strict';

    const lectureListState = 'lectureList';
    const lectureUrl = '/lectures';
    const lectureTemplate = 'components/lecture/list/lectureListView.html';

    let stateConfig;
    let mockResponse;
    let mockLectureResource;
    let mockLectureListService;
    let mockStateParams;

    beforeEach(module('mentoringApp.lectureList'));

    beforeEach(function () {
        mockResponse = 'fakeResponse';
        mockLectureListService = {
            getLectures: jasmine.createSpy('getLecture')
        };
        mockStateParams = {
            type: 'Workshop'
        };
        mockLectureResource = {
            getLectures: jasmine.createSpy().and.returnValue(mockResponse)
        };

        module(function ($provide) {
            $provide.value('LectureResource', mockLectureResource);
        });
    });

    beforeEach(function () {
        inject(function ($state) {
            stateConfig = $state.get(lectureListState);
        });
    });
    it('should be defined', function () {
        expect(stateConfig).not.toBe(null);
    });

    it('should have right controller and controllerAs properties', function () {
        expect(stateConfig.controller).toEqual('LectureListController');
        expect(stateConfig.controllerAs).toEqual('lectureListCtrl');
    });


    it('should have right url', function () {
        expect(stateConfig.url).toEqual(lectureUrl);
    });

    it('should have right template', function () {
        expect(stateConfig.templateUrl).toEqual(lectureTemplate);
    });

    it('should call LectureListService.getLecture', () => {
        stateConfig.resolve.lectures(mockLectureListService, mockStateParams);
        expect(mockLectureListService.getLectures).toHaveBeenCalledWith(mockStateParams);
    });
});
