(function () {
    'use strict';
    angular.module('mentoringApp.lectureList', [
        'ui.router',
        'ngMaterial',
        'ngResource',
        'ngMessages',
        'mentoringApp.lecture'
    ])
        .constant('PAGE_SIZE', 5)
        .config(function ($mdIconProvider) {
            $mdIconProvider.iconSet('lectures', '/assets/lectures-icons.svg', 24);
        });
})();
