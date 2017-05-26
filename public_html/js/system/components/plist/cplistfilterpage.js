'use strict';
moduloDirectivas.component('cplistfilterpage', {
    restrict: 'E',
    bindings: {
        url: '<',
        fields: '<',
        rpp: '<',
        numpage: '<',
        order: '<',
        filter: '<',
        sfilter: '<'
    },
    templateUrl: 'js/system/components/plist/cplistfilterpage.html',
    controllerAs: 'cf',
    controller: ['serverService', '$location', function (serverService, $location) {
            var self = this;
            self.bean = {};
            self.filter_array = [];
            self.dofilter = function ()
            {
                
                for (var key in  self.bean) {

                    //console.log(key, self.bean[key]);
                    if (key.startsWith('opt')) {
                        var campo = key.split('_').pop(-1);
                        //console.log("OPT " + campo);
                        for (var key2 in  self.bean) {
                            if (key2.startsWith('text')) {
                                var campo2 = key2.split('_').pop(-1);
                                if (campo === campo2) {
                                    self.filter_array.push(self.dameFiltro(campo, self.bean[key], self.bean[key2]));
                                }
                            }
                        }




                    }
                }
//                if (self.filter && self.filteroperator && self.filtervalue) {
//                    if (self.filterParams) {
//                        self.filterExpression = self.filterParams + '+and,' + self.filter + ',' + self.filteroperator + ',' + self.filtervalue;
//                    } else {
//                        self.filterExpression = 'and,' + self.filter + ',' + self.filteroperator + ',' + self.filtervalue;
//                    }
//                    $location.path(self.url + '/' + self.numpage + '/' + self.rpp).search('filter', self.filterExpression).search('sfilter', self.sfilter).search('order', self.order);
//                }
                return false;
            }
            self.dameFiltro = function (campo, operador, valor) {
                return '+and,' + campo + ',' + operador + ',' + valor;
            }
        }]
});


