describe('Person edit Controller', ()=> {
    'use strict';

    describe('On adding person', ()=> {
        let sut;
        let mockPeopleResource;
        let mockCreatePerson;
        const mockperson = {
            'name': 'Don',
            'availableAs': []

        };
        beforeEach(()=> {
            module('mentoringApp.personEdit');

            module(()=> {
                let mockPromise = 'mockPromise';
                mockCreatePerson = jasmine.createSpy().and.returnValue({$promise: mockPromise});
                mockPeopleResource = {
                    createPerson: mockCreatePerson
                };
            });

            inject(($controller) => {
                sut = $controller('PersonEditController', {
                    pageTitle: 'title',
                    personData: null,
                    PeopleResource: mockPeopleResource
                });
            });
        });

        it('should set page Title', ()=> {
            expect(sut.pageTitle).toBeDefined();
        });

        it('should set person data to empty object', ()=> {
            expect(sut.person).toEqual({});
        });

        it('should set isNewPerson', ()=> {
            expect(sut.isNewPerson).toBeTruthy();
        });

        it('should call createPerson on the PeopleResource service when submit is called', () => {
            sut.person = mockperson;
            sut.submit();
            expect(mockPeopleResource.createPerson).toHaveBeenCalledWith(mockperson);
        });
    });

    describe('On edit person', ()=> {
        let sut;
        let mockPeopleResource;
        let mockUpdatePerson;
        const mockperson = {
            'name': 'Don',
            'availableAs': [],
            'groupActivity': []
        };
        beforeEach(()=> {
            module('mentoringApp.personEdit');

            let mockPromise = 'mockPromise';
            mockUpdatePerson = jasmine.createSpy().and.returnValue({$promise: mockPromise});

            mockPeopleResource = {
                updatePerson: mockUpdatePerson
            };

            inject(($controller) => {
                sut = $controller('PersonEditController', {
                    pageTitle: 'title',
                    personData: mockperson,
                    PeopleResource: mockPeopleResource
                });
            });
        });

        it('should set page Title', ()=> {
            expect(sut.pageTitle).toBeDefined();
        });

        it('should set isNewPerson', ()=> {
            expect(sut.isNewPerson).toBeFalsy();
        });

        it('should call updatePerson on the PeopleResource service when submit is called', () => {
            sut.person = mockperson;
            sut.submit();
            expect(mockPeopleResource.updatePerson).toHaveBeenCalledWith(mockperson);
        });
    });
});
