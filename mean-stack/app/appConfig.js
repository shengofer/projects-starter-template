(function () {
    'use strict';
    let app = angular.module('mentoringApp', [
        'ngMaterial',
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ui.router',
        'ngSanitize',
        'ngTouch',
        'pascalprecht.translate',
        'mentoringApp.group',
        'mentoringApp.lecture',
        'mentoringApp.people',
        'mentoringApp.program',
        'mentoringApp.programDetails',
        'mentoringApp.programList',
        'mentoringApp.programEdit',
        'mentoringApp.peopleList',
        'mentoringApp.personEdit',
        'mentoringApp.lectureList',
        'mentoringApp.lectureEdit',
        'mentoringApp.groupList',
        'mentoringApp.groupEdit',
        'mentoringApp.groupCalendar',
        'mentoringApp.groupStaffing',
        'mentoringApp.groupDetails',
        'mentoringApp.programInstances'
    ]);

    app.config(function ($mdIconProvider, $translateProvider) {
        $mdIconProvider.iconSet('core', '/assets/core-icons.svg', 24);

        $translateProvider.useSanitizeValueStrategy('sanitize');
        $translateProvider.translations('en', {
            submit: 'submit',
            reset: 'reset',
            cancel: 'cancel',
            title: 'Title',
            titleRequired: 'Title is required',
            dragAndDropZoneText: 'Drag & drop files here...',
            lectures: 'Lectures'
        });

        $translateProvider.translations('ru', {
            submit: 'РїРѕРґС‚РІРµСЂРґРёС‚СЊ',
            reset: 'РѕС‡РёСЃС‚РёС‚СЊ',
            cancel: 'РѕС‚РјРµРЅР°'
        });

        $translateProvider.preferredLanguage('en');
    });
})();
