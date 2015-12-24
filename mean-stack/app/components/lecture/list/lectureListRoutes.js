(function () {
    'use strict';
    angular.module('mentoringApp.lectureList')
        .config(function ($stateProvider) {
            $stateProvider.state('lectureList', {
                url: '/lectures',
                templateUrl: 'components/lecture/list/lectureListView.html',
                controller: 'LectureListController',
                controllerAs: 'lectureListCtrl',
                data: {
                    primaryNavOptions: {
                        order: 1,
                        displayName: 'Lectures'
                    }
                },
                resolve: {
                    lectures: (LecturesListService, $stateParams) => {
                        return LecturesListService.getLectures($stateParams);
                    }
                }
            });
        });
})();
