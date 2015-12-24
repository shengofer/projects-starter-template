(function () {
    'use strict';
    angular.module('mentoringApp.peopleList')
        .config(function ($stateProvider) {
            $stateProvider.state('people', {
                url: '/people',
                templateUrl: 'components/people/list/peopleListView.html',
                controller: 'PeopleListController',
                controllerAs: 'peopleListCtrl',
                data: {
                    primaryNavOptions: {
                        order: 2,
                        displayName: 'People'
                    }
                },
                resolve: {
                    people: (PeopleListService)=> {
                        return PeopleListService.getPeople();
                    }
                }
            });
        });
})();
