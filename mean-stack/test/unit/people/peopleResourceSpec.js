describe('Person edit Service', ()=> {
    'use strict';

    let sut;
    let mockResource;
    let mockGet;
    let mockUpdate;
    let mockSave;
    let mockPromise;
    let personID = 0;
    let groupActivityServerMentor = [{_id: 1, name: 'Test Group', mentors: [1], mentees: []}];
    let groupActivityServerMentee = [{_id: 1, name: 'Test Group', mentors: [], mentees: [1]}];
    let groupActivityServerMentorMentee = [{_id: 1, name: 'Test Group', mentors: [1], mentees: [1]}];
    let groupActivityServerNone = [{_id: 1, name: 'Test Group', mentors: [], mentees: []}];
    let groupActivityMentor = [{id: 1, name: 'Test Group', roles: ['Mentor']}];
    let groupActivityMentee = [{id: 1, name: 'Test Group', roles: ['Mentee']}];
    let groupActivityMentorMentee = [{id: 1, name: 'Test Group', roles: ['Mentee', 'Mentor']}];
    let groupActivityNone = [{id: 1, name: 'Test Group', roles: []}];
    let mockPersonData = {id: 1, name: 'Test User', email: 'email@a.a', availableAs: {lector: true}, groupActivity: []};
    let mockSubmitData = {id: 1, name: 'Test User', email: 'email@a.a', availableAs: ['lector'], groupActivity: []};
    let mockServerPayload = {_id: 1, name: 'Test User', email: 'email@a.a', availableAs: ['lector'], groupActivity: []};
    let $q;
    let $rootScope;
    let getDeferred;
    let mockGetPeoplePromise;
    let mockThen;
    let mockGetPeopleQuery;
    let mockPeopleListUrl;

    beforeEach(()=> {
        module('mentoringApp.people');
    });

    beforeEach(()=> {
        mockPeopleListUrl = '/api/people/:id';
        mockPromise = 'mockPromise';
        mockGet = function () {
            getDeferred = $q.defer();
            return {$promise: getDeferred.promise};
        };
        mockThen = jasmine.createSpy();
        mockGetPeoplePromise = {then: mockThen};
        mockUpdate = jasmine.createSpy().and.returnValue({$promise: mockPromise});
        mockSave = jasmine.createSpy().and.returnValue({$promise: mockPromise});
        mockGetPeopleQuery = jasmine.createSpy().and.returnValue({$promise: mockGetPeoplePromise});
        mockResource = jasmine.createSpy().and.returnValue({
            get: mockGet,
            update: mockUpdate,
            save: mockSave,
            query: mockGetPeopleQuery
        });

        module(($provide)=> {
            $provide.value('$resource', mockResource);
        });
    });

    beforeEach(()=> {
        inject((_PeopleResource_, _$q_, _$rootScope_)=> {
            $q = _$q_;
            $rootScope = _$rootScope_;
            sut = _PeopleResource_;
        });
    });

    describe('PeopleList resource', () => {
        it('will create resource and point it to people endpoint url', () => {
            expect(mockResource).toHaveBeenCalledWith(mockPeopleListUrl, {
                id: '@id',
                category: '@category',
                query: '@query',
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

        describe('getPeople method', () => {
            it('should call query in resource when calls getPeople method', () => {
                sut.getPeople();
                expect(mockGetPeopleQuery).toHaveBeenCalled();
            });

            it('should return promise when called getPeople', () => {
                expect(sut.getPeople()).toBe(mockGetPeoplePromise);
            });
        });

        describe('getItems method', () => {
            it('should call query in resource when calls getItems method', () => {
                sut.getItems();
                expect(mockGetPeopleQuery).toHaveBeenCalled();
            });

            it('should return promise when called getItems', () => {
                expect(sut.getItems()).toBe(mockGetPeoplePromise);
            });
        });

        describe('getPerson method', () => {
            it('getPerson method should call getRequestSuccessHandler on success resource', () => {
                spyOn(sut, 'getRequestSuccessHandler');
                sut.getPerson(personID);
                getDeferred.resolve(mockServerPayload);
                $rootScope.$apply();
                expect(sut.getRequestSuccessHandler).toHaveBeenCalled();
            });

            it('getRequestSuccessHandler method should parse get response', () => {
                expect(sut.getRequestSuccessHandler(mockServerPayload)).toEqual({
                    data: mockPersonData
                });
            });

            it('should convert array of available roles to object of them', ()=> {
                expect(sut._convertRoles(mockServerPayload.availableAs)).toEqual(mockPersonData.availableAs);
            });
        });

        describe('getPerson method converting groupActivity', () => {
            it('should convert array of group activity to {id: id, name:name, roles[\'Mentor\']} if mentor', ()=> {
                expect(sut._convertActivity(groupActivityServerMentor, mockServerPayload._id)).toEqual(groupActivityMentor);
            });
            it('should convert array of group activity to {id: id, name:name, roles[\'Mentee\']} if mentee', ()=> {
                expect(sut._convertActivity(groupActivityServerMentee, mockServerPayload._id)).toEqual(groupActivityMentee);
            });
            it('should convert array of group activity to {id: id, name:name, roles[\'Mentor\', \'Mentee\']} if mentor and mentee', ()=> {
                expect(sut._convertActivity(groupActivityServerMentorMentee, mockServerPayload._id)).toEqual(groupActivityMentorMentee);
            });
            it('should convert array of group activity to {id: id, name:name, roles[]} if none', ()=> {
                expect(sut._convertActivity(groupActivityServerNone, mockServerPayload._id)).toEqual(groupActivityNone);
            });
        });

        describe('createPerson method', () => {
            it('createPerson method should call save method on resource', () => {
                sut.createPerson(mockPersonData);
                expect(mockSave).toHaveBeenCalled();
            });

            it('createPerson method will return $promise', () => {
                expect(sut.createPerson(mockPersonData)).toBe(mockPromise);
            });

            it('should convert person data to request payload', ()=> {
                expect(sut._collectData(mockPersonData)).toEqual(mockSubmitData);
            });
        });

        describe('updatePerson method', () => {
            it('updatePerson method should call update method on resource', ()=> {
                sut.updatePerson(mockPersonData);
                expect(mockUpdate).toHaveBeenCalled();
            });

            it('updatePerson method will return $promise', ()=> {
                expect(sut.updatePerson(mockPersonData)).toBe(mockPromise);
            });
        });
    });
});
