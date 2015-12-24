(function () {
    'use strict';
    angular.module('mentoringApp.people', [
        'ui.router',
        'mentoringApp.peopleList',
        'mentoringApp.personEdit'
    ])
        .constant('PEOPLE_ROUTE', '/api/people/:id')
        .constant('CATEGORIES', Object.freeze({
            items: ['Mentor', 'Mentee', 'Lector'],
            title: 'category'
        }))
        .constant('PAGE_SIZE', 5);
})();
