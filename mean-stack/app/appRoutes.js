(function () {
    'use strict';
    angular
        .module('mentoringApp')
        .config(function ($urlRouterProvider) {
            $urlRouterProvider.otherwise('/');
        });
})();
