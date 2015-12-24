describe('"people" state', () => {
    'use strict';

    let peopleListState = 'people';
    let stateConfig;
    let mockPeopleListService;

    beforeEach(
        module('mentoringApp.peopleList')
    );

    beforeEach(() => {
        mockPeopleListService = {
            getPeople: jasmine.createSpy('getPeople')
        };
    });

    beforeEach(() => {
        inject(($state) => {
            stateConfig = $state.get(peopleListState);
        });
    });

    it('should be defined', () => {
        expect(stateConfig).not.toBe(null);
    });

    it('should have PeopleListController controller', () => {
        expect(stateConfig.controller).toEqual('PeopleListController');
    });

    it('should call PeopleListService.getPeople', () => {
        stateConfig.resolve.people(mockPeopleListService);
        expect(mockPeopleListService.getPeople).toHaveBeenCalled();
    });
});
