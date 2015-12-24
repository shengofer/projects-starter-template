describe('PeopleListService', ()=> {
    'use strict';
    let sut;
    let mockConfig;
    let mockPeopleResource;
    let mockDynamicPaginationService;
    let mockGetPaginationConfig;
    let mockStateParams;
    let mockDebounceService;
    let mockDebounceParameters;

    beforeEach(module('mentoringApp.people'));

    beforeEach(()=> {
        mockDebounceService = {
            debounce: jasmine.createSpy('debounce')
        };
        mockDebounceParameters = {
            timeout: 1000,
            minLength: 2
        };
        mockPeopleResource = 'mockPeopleResource';
        mockStateParams = {};
        mockDynamicPaginationService = jasmine.createSpy('mockDynamicPaginationService');
        mockConfig = 'config';
        mockGetPaginationConfig = jasmine.createSpy('mockGetPaginationConfig').and.returnValue(mockConfig);
        module(($provide) => {
            $provide.value('PeopleResource', mockPeopleResource);
            $provide.value('$stateParams', mockStateParams);
            $provide.value('dynamicPaginationService', mockDynamicPaginationService);
            $provide.value('DebounceService', mockDebounceService);
            $provide.value('DEBOUNCE_PARAMETERS', mockDebounceParameters);
        });
    });

    beforeEach(
        inject((_PeopleListService_)=> {
            sut = _PeopleListService_;
        })
    );

    describe('getPaginationConfig', ()=> {
        it('should return config with additionalParameters', ()=> {
            expect(sut.getPaginationConfig()).toEqual({
                resource: sut.PeopleResource,
                pageSize: sut.PAGE_SIZE,
                additionalParameters: sut.$stateParams
            });
        });
    });

    describe('getSectionTitle', ()=> {
        it('should return sectionTitle', ()=> {
            expect(sut.getSectionTitle()).toEqual('All people');
        });
    });

    describe('getPeople', ()=> {
        it('should call getPaginationConfig', ()=> {
            sut.getPaginationConfig = mockGetPaginationConfig;
            sut.getPeople();
            expect(mockGetPaginationConfig).toHaveBeenCalled();
        });

        it('should call dynamicPaginationService', ()=> {
            sut.getPaginationConfig = mockGetPaginationConfig;
            sut.getPeople();
            expect(mockDynamicPaginationService).toHaveBeenCalledWith(mockConfig);
        });
    });

    describe('getPeopleWithDebounce', () => {
        beforeEach(() => {
            sut.getPaginationConfig = jasmine.createSpy('getPaginationConfig');
        });

        it('should not do anything if query length is less than three characters long', () => {
            sut.$stateParams.query = 'ab';
            expect(sut.getPeopleWithDebounce()).toBeUndefined();
        });

        it('should call getPaginationConfig', () => {
            sut.$stateParams.query = 'abc';
            sut.getPeopleWithDebounce();
            expect(sut.getPaginationConfig).toHaveBeenCalled();
        });

        it('should call debounceService.debounce', () => {
            sut.$stateParams.query = 'abc';
            sut.getPeopleWithDebounce();
            expect(mockDebounceService.debounce).toHaveBeenCalled();
        });
    });
});
