(function () {
    'use strict';

    /** @ngInject*/
    class LecturesListService {
        constructor(PAGE_SIZE, dynamicPaginationService, LectureResource, $stateParams) {
            this.PAGE_SIZE = PAGE_SIZE;
            this.LectureResource = LectureResource;
            this.dynamicPaginationService = dynamicPaginationService;
            this.$stateParams = $stateParams;
        }

        getLectures(options) {
            let config = this.getPaginationConfig(options);
            return this.dynamicPaginationService(config);
        }

        getPaginationConfig(options) {
            let config = {
                resource: this.LectureResource,
                pageSize: this.PAGE_SIZE,
                additionalParameters: options
            };
            return config;
        }

        getSectionTitle() {
            let options = this.$stateParams;
            return options.type ? options.type + 's' : 'All lectures';
        }
    }

    angular
        .module('mentoringApp.lectureList')
        .service('LecturesListService', LecturesListService);
})();
