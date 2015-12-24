(function () {
    'use strict';

    /** @ngInject*/
    class PeopleResource {
        constructor($resource, PEOPLE_ROUTE, CATEGORIES) {
            this.CATEGORIES = CATEGORIES;
            this.peopleResource = $resource(PEOPLE_ROUTE, {
                id: '@id',
                category: '@category',
                query: '@query',
                page: '@page',
                limit: '@limit'
            }, {
                query: {
                    isArray: false
                },
                update: {
                    method: 'PUT'
                }
            });
        }

        getItems(options) {
            return this.peopleResource.query(options).$promise;
        }

        getPeople(options) {
            return this.peopleResource.query(options).$promise;
        }

        getPerson(id) {
            return this.peopleResource.get({id: id}).$promise.then(this.getRequestSuccessHandler.bind(this));
        }

        getRequestSuccessHandler(res) {
            let personData = {
                id: res._id,
                name: res.name,
                email: res.email,
                availableAs: this._convertRoles(res.availableAs),
                groupActivity: this._convertActivity(res.groupActivity, res._id)
            };

            return {data: personData};
        }

        createPerson(data) {
            let submitData = this._collectData(data);
            return this.peopleResource.save(submitData).$promise;
        }

        updatePerson(data) {
            let submitData = this._collectData(data);

            return this.peopleResource.update({id: data.id}, submitData).$promise;
        }

        _collectData(data) {
            let submitData = angular.extend({}, data);
            submitData.availableAs = Object.keys(data.availableAs).filter((item) => {
                return data.availableAs[item];
            });

            submitData.groupActivity = data.groupActivity.map((value) => {
                return value.id;
            });

            return submitData;
        }

        _convertRoles(roles) {
            return roles.reduce((res, value) => {
                res[value] = true;
                return res;
            }, {});
        }

        _convertActivity(groupActivity, _id) {
            return groupActivity.map((group) => {
                let roles = [];
                if (group.mentees.indexOf(_id) >= 0) roles.push('Mentee');
                if (group.mentors.indexOf(_id) >= 0) roles.push('Mentor');
                return {
                    id: group._id,
                    name: group.name,
                    roles: roles
                };
            });
        }
    }

    angular
        .module('mentoringApp.people')
        .service('PeopleResource', PeopleResource);
})();
