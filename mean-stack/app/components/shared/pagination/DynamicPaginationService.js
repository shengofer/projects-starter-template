(function () {
    'use strict';

    class Paginator {
        constructor(config) {
            this.PAGE_SIZE = config.pageSize || 5;
            this.resource = config.resource;
            this.additionalParameters = config.additionalParameters || {};
            this.loadedItems = [];
            this.numItems = 0;
            this.fetchPage(0);
            this.isLoaded = false;
        }

        getItemAtIndex(index) {
            let pageNumber = Math.floor(index / this.PAGE_SIZE);
            if (this.loadedItems[index]) {
                return this.loadedItems[index];
            } else if (this.loadedItems[index] !== null) {
                this.fetchPage(pageNumber);
            }
        }

        getLength() {
            if (this.isLoaded) {
                return this.numItems;
            }
            return this.numItems + 1;
        }

        deleteItem(itemId) {
            this.resource.deleteItem(itemId).then(() => {
                this.reduceLoadedItems(itemId);
            });
        }

        reduceLoadedItems(itemId) {
            this.loadedItems.some((item, ind, array) => {
                if (item._id === itemId) {
                    array.splice(ind, 1);
                    this.numItems--;
                    return true;
                }
            });
        }

        fetchPage(pageNumber) {
            let from = pageNumber * this.PAGE_SIZE;
            let to = from + this.PAGE_SIZE;
            for (let ind = from; ind < to; ind++) {
                this.loadedItems[ind] = null;
            }

            let options = this.additionalParameters;
            options.page = pageNumber;
            options.limit = this.PAGE_SIZE;

            this.resource.getItems(options).then((res)=> {
                this.addLoadedItems(res.responses, from);
            });
        }

        addLoadedItems(responses, from) {
            for (let ind = 0; ind < responses.length; ind++) {
                this.loadedItems[ind + from] = responses[ind];
            }
            this.numItems += responses.length;
            if (responses.length !== this.PAGE_SIZE) {
                this.isLoaded = true;
            }
        }
    }

    /** @ngInject*/
    function dynamicPaginationService() {
        return function (config) {
            return new Paginator(config);
        };
    }

    angular
        .module('mentoringApp')
        .factory('dynamicPaginationService', dynamicPaginationService);
})();
