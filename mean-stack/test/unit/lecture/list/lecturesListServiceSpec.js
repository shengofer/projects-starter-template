describe('LecturesListService', ()=> {
    'use strict';
    let sut;
    let mockConfig;
    let mockLectureResource;
    let mockDynamicPaginationService;
    let mockGetPaginationConfig;
    let mockLocation;

    beforeEach(module('mentoringApp.lectureList'));

    beforeEach(()=> {
        mockLectureResource = 'mockLectureResource';
        mockLocation = {
            search: jasmine.createSpy('search').and.returnValue({})
        };
        mockDynamicPaginationService = jasmine.createSpy('mockDynamicPaginationService');
        mockConfig = 'config';
        mockGetPaginationConfig = jasmine.createSpy('mockGetPaginationConfig').and.returnValue(mockConfig);
        module(($provide) => {
            $provide.value('LectureResource', mockLectureResource);
            $provide.value('$location', mockLocation);
            $provide.value('dynamicPaginationService', mockDynamicPaginationService);
        });
    });

    beforeEach(
        inject((_LecturesListService_)=> {
            sut = _LecturesListService_;
        })
    );

    describe('getPaginationConfig', ()=> {
        it('should return config with additionalParameters', ()=> {
            let type = {type: 'cat'};
            expect(sut.getPaginationConfig(type)).toEqual({
                resource: sut.LectureResource,
                pageSize: sut.PAGE_SIZE,
                additionalParameters: type
            });
        });
    });

    describe('getSectionTitle', ()=> {
        it('should return sectionTitle', ()=> {
            expect(sut.getSectionTitle()).toEqual('All lectures');
        });
    });

    describe('getLectures', ()=> {
        it('should call getPaginationConfig', ()=> {
            let type = 'type';
            sut.getPaginationConfig = mockGetPaginationConfig;
            sut.getLectures(type);
            expect(mockGetPaginationConfig).toHaveBeenCalledWith(type);
        });

        it('should call dynamicPaginationService', ()=> {
            let type = 'type';
            sut.getPaginationConfig = mockGetPaginationConfig;
            sut.getLectures(type);
            expect(mockDynamicPaginationService).toHaveBeenCalledWith(mockConfig);
        });
    });
});
