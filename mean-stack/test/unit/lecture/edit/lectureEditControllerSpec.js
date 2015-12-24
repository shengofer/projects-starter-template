describe('LectureEditController', () => {
    'use strict';

    let sut;
    let lecture;
    let mockLectureService;

    beforeEach(module('mentoringApp.lectureEdit'));

    beforeEach(() => {
        lecture = {};
        mockLectureService = {
            submitLecture: jasmine.createSpy()
        };
    });

    beforeEach(() => {
        inject(($controller) => {
            sut = $controller('LectureEditController', {
                LectureService: mockLectureService,
                $state: {
                    go: jasmine.createSpy()
                },
                LECTURE_TYPES: {
                    items: []
                },
                lecture: lecture
            });
        });
    });

    it('lecture types should be defined', () => {
        expect(sut.lectureTypes).not.toBe(undefined);
    });

    it('lecture should be defined', () => {
        expect(sut.lecture).not.toBe(undefined);
    });

    describe('submit method', () => {
        it('should call submitLecture method from service', () => {
            sut.lecture = lecture;
            sut.submit();
            expect(sut.service.submitLecture).toHaveBeenCalledWith(lecture);
        });
    });
});
