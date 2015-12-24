(function () {
    'use strict';
    angular.module('mentoringApp.personEdit', ['ui.router', 'mentoringApp.people'])
        .value('editPersonPageTitle', 'Edit Person')
        .value('addPersonPageTitle', 'Add Person');
})();
