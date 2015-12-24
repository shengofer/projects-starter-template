(function () {
    'use strict';
    angular.module('mentoringApp.personEdit')
        .config(($stateProvider)=> {
            $stateProvider
                .state('addPerson', {
                    url: '/people/add',
                    templateUrl: 'components/people/edit/personEditView.html',
                    controller: 'PersonEditController',
                    controllerAs: 'personEditCtrl',
                    resolve: {
                        personData: ()=> {
                            return null;
                        },
                        pageTitle: 'addPersonPageTitle'
                    }
                })
                .state('editPerson', {
                    url: '/people/edit/:personId',
                    templateUrl: 'components/people/edit/personEditView.html',
                    controller: 'PersonEditController',
                    controllerAs: 'personEditCtrl',
                    resolve: {
                        personData: (PeopleResource, $stateParams)=> {
                            return PeopleResource.getPerson($stateParams.personId);
                        },
                        pageTitle: 'editPersonPageTitle'
                    }
                });
        });
})();
