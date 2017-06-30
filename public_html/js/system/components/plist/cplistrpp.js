'use strict';
moduloDirectivas.component('cplistrpp', {
    restrict: 'E',
    bindings: {
        url: '<',
        numpage: '<',
        rpp: '<',
        orderparams: '<',
        filterparams: '<',
        sfilterparams: '<'
    },
    templateUrl: 'js/system/components/plist/cplistrpp.html',
    controllerAs: 'crpp',
    controller: ['$location', function ($location) {
            var self = this;
            self.repaginate = function (rpp) {
                $location.path(self.url + '/' + self.numpage + '/' + rpp).search('filter', filtro).search('sfilter', self.sfilterparams).search('order', self.orderparams);
                return false;
            };
        }]
});
