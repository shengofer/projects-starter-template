(function () {
    'use strict';
    angular.module('mentoringApp.lecture', [
        'ui.router',
        'mentoringApp.lectureList',
        'mentoringApp.lectureEdit'
    ])
    .constant('LECTURE_LIST_ROUTE', '/api/lectures/:id')
    .constant('LECTURE_TYPES', {
        items: ['Lecture', 'Workshop'],
        title: 'type'
    });
})();
