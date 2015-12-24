describe('lectureEditRouts', () => {
    'use strict';

    const lectureAddState = 'addLecture';
    const lectureEditState = 'editLecture';
    const lectureAddUrl = '/lecture/add';
    const lectureEditUrl = '/lecture/edit/:id';
    const lectureEditTemplate = 'components/lecture/edit/lectureEditView.html';
    let addLectureStateConfig;
    let editLectureStateConfig;
    let mockLectureResource;
    let $injector;

    beforeEach(module('mentoringApp.lectureEdit'));

    beforeEach(()=> {
        mockLectureResource = {
            getLecture: jasmine.createSpy()
        };
        module(($provide) => {
            $provide.value('LectureResource', mockLectureResource);
        });
    });

    beforeEach(inject(($state, _$injector_) => {
        addLectureStateConfig = $state.get(lectureAddState);
        editLectureStateConfig = $state.get(lectureEditState);
        $injector = _$injector_;
    }));

    it('should have resolve data', ()=> {
        expect(editLectureStateConfig.resolve.lecture).toBeDefined();
        expect(addLectureStateConfig.resolve.lecture).toBeDefined();
    });

    describe('add lecture route', () => {
        it('should resolve lecture', ()=> {
            expect(addLectureStateConfig.resolve.lecture()).toEqual({});
        });

        it('state addLecture should be defined', () => {
            expect(addLectureStateConfig).not.toBe(null);
        });

        it('state addLecture should have right url', () => {
            expect(addLectureStateConfig.url).toBe(lectureAddUrl);
        });

        it('state addLecture should have right template', () => {
            expect(addLectureStateConfig.templateUrl).toBe(lectureEditTemplate);
        });
    });

    describe('edit lecture route', () => {
        it('should resolve lecture', ()=> {
            $injector.invoke(editLectureStateConfig.resolve.lecture);
            expect(mockLectureResource.getLecture).toHaveBeenCalled();
        });

        it('state editLecture should be defined', () => {
            expect(editLectureStateConfig).not.toBe(null);
        });

        it('state editLecture should have right url', () => {
            expect(editLectureStateConfig.url).toBe(lectureEditUrl);
        });

        it('state editLecture should have right template', () => {
            expect(editLectureStateConfig.templateUrl).toBe(lectureEditTemplate);
        });
    });
});
