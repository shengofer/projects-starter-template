(function () {
    'use strict';
    angular.module('mentoringApp.lectureEdit')
        .config(function ($stateProvider) {
            $stateProvider
                .state('addLecture', {
                    url: '/lecture/add',
                    templateUrl: 'components/lecture/edit/lectureEditView.html',
                    controller: 'LectureEditController',
                    controllerAs: 'lectureEditCtrl',
                    resolve: {
                        lecture() {
                            return {};
                        }
                    }
                })
                .state('editLecture', {
                    url: '/lecture/edit/:id',
                    templateUrl: 'components/lecture/edit/lectureEditView.html',
                    controller: 'LectureEditController',
                    controllerAs: 'lectureEditCtrl',
                    resolve: {
                        lecture(LectureResource, $stateParams) {
                            return LectureResource.getLecture($stateParams.id);
                        }
                    }
                });
        });
})();
