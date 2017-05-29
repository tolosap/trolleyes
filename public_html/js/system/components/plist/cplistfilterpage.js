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

            self.dofilter = function ()
            {
                self.filter_array = [];
                for (var key in  self.bean) {

                    //console.log(key, self.bean[key]);
                    if (key.startsWith('opt')) {
                        var campo = key.split('_').pop(-1);
                        //console.log("OPT " + campo);
                        for (var key2 in  self.bean) {
                            if (self.bean[key2]) {
                                if (key2.startsWith('text')) {
                                    var campo2 = key2.split('_').pop(-1);
                                    if (campo === campo2) {
                                        self.filter_array.push(self.dameFiltro(campo, self.bean[key], self.bean[key2]));
                                    }
                                }
                            }
                        }




                    }

                    if (key.startsWith('id_')) {
                        var id_value = self.bean[key]['id'];
                        self.filter_array.push(self.dameFiltro(key, 'equa', id_value));
                    }
                    if (key.startsWith('fini_')) {
                        var fini_field = key.split('_').pop(-1);
                        var fini_value = self.bean[key];
                        self.filter_array.push("'" + self.dameFiltro(fini_field, 'gequ', fini_value) + "'");
                    }
                    if (key.startsWith('fend_')) {
                        var fini_field = key.split('_').pop(-1);
                        var fini_value = self.bean[key];
                        self.filter_array.push("'" + self.dameFiltro(fini_field, 'lequ', fini_value) + "'");
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


                var arrayLength = self.filter_array.length;
                var strFilter = "";
                for (var i = 0; i < arrayLength; i++) {
                    strFilter += self.filter_array[i] + "&";
                }
                if (strFilter) {
                    strFilter = strFilter.substring(0, strFilter.length - 1);
                }
                self.strFilter = window.encodeURIComponent(strFilter);
                $location.path(self.url + '/' + self.numpage + '/' + self.rpp + "&" + strFilter).search('sfilter', self.sfilter).search('order', self.order);


                return false;
            }
            self.dameFiltro = function (campo, operador, valor) {
                return 'filter=and,' + campo + ',' + operador + ',' + valor;
            }
        }]
});


