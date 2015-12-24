(function () {
    'use strict';

    function primaryNavigation() {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'components/shared/navigation/navigationView.html',
            controller: 'NavigationController',
            controllerAs: 'navigationCtrl'
        };
    }

    angular
        .module('mentoringApp')
        .directive('primaryNav', primaryNavigation);
})();
