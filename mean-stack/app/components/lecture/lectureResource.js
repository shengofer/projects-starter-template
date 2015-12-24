(function () {
    'use strict';
    /** @ngInject*/
    class LectureResource {
        constructor($resource, LECTURE_LIST_ROUTE) {
            let actions = {
                query: {
                    isArray: false
                },
                update: {
                    method: 'PUT'
                }
            };
            this.$resource = $resource(LECTURE_LIST_ROUTE, {
                id: '@_id',
                page: '@page',
                limit: '@limit'
            }, actions);
        }

        getLectures(options) {
            return this.$resource.query(options).$promise;
        }

        addLecture(lecture) {
            return this.$resource.save(lecture).$promise;
        }

        editLecture(lecture) {
            return this.$resource.update(lecture).$promise;
        }

        getLecture(id) {
            return this.$resource.get({id: id}).$promise;
        }

        getItems(options) {
            return this.$resource.query(options).$promise;
        }

    }

    angular.module('mentoringApp.lecture')
        .service('LectureResource', LectureResource);
})();
