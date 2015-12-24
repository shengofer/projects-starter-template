(function () {
    'use strict';

    /** @ngInject*/
    class LectureService {
        constructor(LectureResource, $state) {
            this.resource = LectureResource;
            this.$state = $state;
        }

        submitLecture(lecture) {
            let promise;
            if (lecture._id) {
                promise = this.resource.editLecture(lecture);
            } else {
                promise = this.resource.addLecture(lecture);
            }
            promise.then(() => {
                this.backToLectures();
            });
            return promise;
        }

        backToLectures() {
            const lectureListState = 'lectureList';
            this.$state.go(lectureListState);
        }
    }

    angular
        .module('mentoringApp.lecture')
        .service('LectureService', LectureService);
})();
