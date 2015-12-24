(function () {
    'use strict';

    /** @ngInject*/
    class PeopleListController {
        constructor(people, PeopleListService, CATEGORIES) {
            this.PeopleListService = PeopleListService;
            this.people = people;
            this.availableAs = CATEGORIES;
        }

        getSectionTitle() {
            return this.PeopleListService.getSectionTitle();
        }

        getPeople() {
            this.people = this.PeopleListService.getPeople();
        }

        getPeopleWithDebounce() {
            let people = this.PeopleListService.getPeopleWithDebounce();
            if (people) {
                people.then(paginator => {
                    this.people = paginator;
                }
                );
            }
        }
    }

    angular
        .module('mentoringApp.peopleList')
        .controller('PeopleListController', PeopleListController);
})();
