(function () {
    'use strict';

    /** @ngInject*/
    class NavigationController {
        constructor(orderByFilter, NavigationService, $state) {
            this.stat = $state;
            this.navService = NavigationService;
            this.items = orderByFilter(this.navService.getNavigationItems(), 'order');
        }

        isCurrent(state) {
            return this.navService.isCurrent(state);
        }

        reloading(currentItem) {
            if (this.isCurrent(currentItem)) {
                this.stat.reload();
            }
        }
    }

    angular
        .module('mentoringApp')
        .controller('NavigationController', NavigationController);
})();
