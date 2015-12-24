(function () {
    'use strict';
    /** @ngInject*/
    class LectureEditController {
        constructor(lecture, $state, LectureService, LECTURE_TYPES) {
            this.lecture = lecture;
            this.$state = $state;
            this.lectureTypes = LECTURE_TYPES.items;
            this.service = LectureService;
        }

        submit() {
            this.service.submitLecture(this.lecture);
        }
    }

    angular
        .module('mentoringApp.lectureEdit')
        .controller('LectureEditController', LectureEditController);
})();
