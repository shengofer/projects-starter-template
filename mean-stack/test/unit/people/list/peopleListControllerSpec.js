describe('PeopleListController', () => {
    'use strict';
    let sut;
    let mockPeople;
    let mockPeopleListService;

    beforeEach(module('mentoringApp.peopleList'));

    beforeEach(() => {
        mockPeople = [{name: 'cat'}, {name: 'dog'}];
        mockPeopleListService = {
            getPeople: jasmine.createSpy('get people'),
            getSectionTitle: jasmine.createSpy('get section title'),
            getPeopleWithDebounce: jasmine.createSpy('getPeopleWithDebounce').and.returnValue({then: jasmine.createSpy('mockThen')})
        };
    });

    beforeEach(inject(($controller) => {
        sut = $controller('PeopleListController', {
            people: mockPeople,
            PeopleListService: mockPeopleListService
        });
    }));

    it('should load people in resolve', () => {
        expect(sut.people).toBe(mockPeople);
    });

    it('should call get people from people list service', () => {
        sut.getPeople();
        expect(mockPeopleListService.getPeople).toHaveBeenCalled();
    });

    it('should call peopleListService.getSectionTitle when getSectionTitle have been called', () => {
        sut.getSectionTitle();
        expect(mockPeopleListService.getSectionTitle).toHaveBeenCalled();
    });

    it('should call getPeopleWithDebounce from people list service', () => {
        sut.getPeopleWithDebounce();
        expect(mockPeopleListService.getPeopleWithDebounce).toHaveBeenCalled();
    });
});
