describe('add/edit person states: ', ()=> {
    'use strict';

    let stateProvider;
    let editPersonState = 'editPerson';
    let addPersonState = 'addPerson';
    let stateConfig;
    let injector;
    let passPromise = true;
    let mockPeopleResource;

    beforeEach(() => {
        module('mentoringApp.personEdit');
    });

    beforeEach(() => {
        module(($provide) => {
            $provide.service('PeopleResource', function ($q) {
                this.getPerson = jasmine.createSpy('getPerson').and.callFake(() => {
                    return passPromise ? $q.when({
                        data: true
                    }) : $q.reject(null);
                });
            });
        });
    });

    beforeEach(() => {
        inject(($state, $injector, PeopleResource) => {
            stateProvider = $state;
            injector = $injector;
            mockPeopleResource = PeopleResource;
        });
    });

    describe('"addPerson" state', () => {
        beforeEach(() => {
            stateConfig = stateProvider.get(addPersonState);
        });

        it('should be defined', () => {
            expect(stateConfig).not.toBe(null);
        });

        it('should have right controller and a resolve block', () => {
            expect(stateConfig.controller).toEqual('PersonEditController');
            expect(stateConfig.resolve.personData).toBeDefined();
            expect(stateConfig.resolve.pageTitle).toBeDefined();
        });

        it('should resolve personData', () => {
            let personData = injector.invoke(stateConfig.resolve.personData);
            expect(personData).toBeNull();
        });

        it('should resolve pageTitle', () => {
            let pageTtl = injector.get(stateConfig.resolve.pageTitle);
            expect(typeof pageTtl === 'string').toBe(true);
        });
    });

    describe('"editPerson" state', ()=> {
        beforeEach(() => {
            stateConfig = stateProvider.get(editPersonState);
        });

        it('should be defined', () => {
            expect(stateConfig).not.toBe(null);
        });

        it('should have right controller and a resolve block', () => {
            expect(stateConfig.controller).toEqual('PersonEditController');
            expect(stateConfig.resolve.personData).toBeDefined();
            expect(stateConfig.resolve.pageTitle).toBeDefined();
        });

        it('should resolve personData', () => {
            injector.invoke(stateConfig.resolve.personData);
            expect(mockPeopleResource.getPerson).toHaveBeenCalled();
        });

        it('should resolve pageTitle', () => {
            let pageTtl = injector.get(stateConfig.resolve.pageTitle);
            expect(typeof pageTtl === 'string').toBe(true);
        });
    });
});
