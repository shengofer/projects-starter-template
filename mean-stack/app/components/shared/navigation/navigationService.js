(function () {
    'use strict';

    /** @ngInject*/
    class NavigationService {
        constructor($state) {
            this.$state = $state;
        }

        getNavigationItems() {
            let states = this.$state.get();
            let items = [];

            states.forEach((state) => {
                if (state.data && state.data.primaryNavOptions) {
                    items.push(angular.extend({
                        url: state.url,
                        name: state.name
                    }, state.data.primaryNavOptions));
                }
            });

            return items;
        }

        isCurrent(state) {
            return this.$state.current.name === state.name;
        }
    }

    angular
        .module('mentoringApp')
        .service('NavigationService', NavigationService);
})();
