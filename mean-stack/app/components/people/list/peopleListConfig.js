(function () {
    'use strict';

    angular.module('mentoringApp.peopleList', ['ui.router', 'ngMaterial', 'mentoringApp.people'])
        .config(function ($mdIconProvider) {
            $mdIconProvider.iconSet('people', '/assets/people-icons.svg', 24);
        });
})();
