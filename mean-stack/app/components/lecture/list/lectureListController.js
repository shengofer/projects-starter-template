(function () {
    'use strict';

    class LectureListController {
        constructor(lectures, LecturesListService, LECTURE_TYPES) {
            this.LecturesListService = LecturesListService;
            this.lectures = lectures;
            this.types = LECTURE_TYPES;
        }

        getLectures(options) {
            this.lectures = this.LecturesListService.getLectures(options);
        }

        getSectionTitle() {
            return this.LecturesListService.getSectionTitle();
        }
    }

    angular.module('mentoringApp.lectureList')
        .controller('LectureListController', LectureListController);
})();
