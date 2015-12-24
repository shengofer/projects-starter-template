(function () {
    'use strict';
    /** @ngInject*/
    class PersonEditController {
        constructor(pageTitle, personData, PeopleResource, $state, CATEGORIES) {
            this.$state = $state;
            this.categories = CATEGORIES.items;
            this.pageTitle = pageTitle;
            this.isNewPerson = true;
            this.resource = PeopleResource;
            this.setPerson(personData);
        }

        setPerson(personData) {
            this.person = {};

            if (personData !== null) {
                this.isNewPerson = false;
                this.person = personData.data;
            }
        }

        submit() {
            this.resource[this.isNewPerson ? 'createPerson' : 'updatePerson'](this.person);
            this.$state.go('people');
        }
    }

    angular
        .module('mentoringApp.personEdit')
        .controller('PersonEditController', PersonEditController);
})();
