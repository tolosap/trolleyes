'use strict';
moduloDirectivas.component('cplistfilter', {
    restrict: 'E',
    bindings: {
        url: '<',
        fields: '<',
        rpp: '<',
        numpage: '<',
        orderparams: '<',
        filterparams: '<'        
    },
    templateUrl: 'js/system/component/plist/cplistfilterbystring.html',
    controllerAs: 'filterbystring',
    controller:
            ['$location',
                function ($location) {
                    var self = this;
                    self.field = "";
                    self.operator = "";
                    self.value = "";
                    self.dofilter = function () {                      
                            if (self.filter.text.field != "" && self.filter.text.operator != "" && self.filter.text.value != "") {
                                var newFilter = self.filterParams + "+and," + self.filter.text.field + "," + self.filter.text.operator + "," + self.filter.text.value;
                                if (self.orderParams) {
                                    $location.path(self.url + '/' + self.numpage + '/' + self.rpp).search('filter', newFilter).search('order', self.orderParams);
                                } else {
                                    $location.path(self.url + '/' + self.numpage + '/' + self.rpp).search('filter', newFilter);
                                }
                            }                       
                        return false;
                    };
                }
            ]
});


