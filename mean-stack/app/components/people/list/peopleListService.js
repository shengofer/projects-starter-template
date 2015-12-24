(function () {
    'use strict';

    /** @ngInject*/
    class PeopleListService {
        constructor(PAGE_SIZE, dynamicPaginationService, PeopleResource, $stateParams, DebounceService, DEBOUNCE_PARAMETERS) {
            this.PAGE_SIZE = PAGE_SIZE;
            this.PeopleResource = PeopleResource;
            this.dynamicPaginationService = dynamicPaginationService;
            this.$stateParams = $stateParams;
            this.debounceService = DebounceService;
            this.cooldown = DEBOUNCE_PARAMETERS.timeout;
            this.queryLength = DEBOUNCE_PARAMETERS.minLength;
        }

        getPeople() {
            let config = this.getPaginationConfig();
            return this.dynamicPaginationService(config);
        }

        getPeopleWithDebounce() {
            if (this.$stateParams.query.length > this.queryLength) {
                let config = this.getPaginationConfig();
                return this.debounceService.debounce(() =>
                    this.dynamicPaginationService(config), this.cooldown);
            }
        }

        getPaginationConfig() {
            return {
                resource: this.PeopleResource,
                pageSize: this.PAGE_SIZE,
                additionalParameters: this.$stateParams
            };
        }

        getSectionTitle() {
            let options = this.$stateParams;
            return options.category ? options.category + 's' : 'All people';
        }
    }

    angular
        .module('mentoringApp.peopleList')
        .service('PeopleListService', PeopleListService);
})();
