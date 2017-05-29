'use strict';
moduloDirectivas.component('cplistfilterpage', {
    restrict: 'E',
    bindings: {
        url: '<',
        fields: '<',
        rpp: '<',
        numpage: '<',
        order: '<',
        filter: '<'
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
                        var fini_field = key.substring(key.indexOf('_') + 1, key.length);

                        var fini_value = self.bean[key].replace(/ /g, "+").replace(/\//g, "-");
                        self.filter_array.push(self.dameFiltro(fini_field, 'gequ', "'" + fini_value + "'"));
                    }
                    if (key.startsWith('fend_')) {


                        var fend_field = key.substring(key.indexOf('_') + 1, key.length);

                        var fend_value = self.bean[key].replace(/ /g, "+").replace(/\//g, "-");





//                        var arrfechahora = fend_value.split(" ");
//                        var arrfecha = arrfechahora[0].split("/");
//                        var arrhora = arrfechahora[1].split(":");
//                        var newDate = new Date(arrfecha[2], arrfecha[1], arrfecha[0], arrhora[1], arrhora[0]);
//                        $scope.bean.fecha = $filter('date')(newDate, "dd/MM/yyyy-HH:mm");






                        self.filter_array.push(self.dameFiltro(fend_field, 'lequ', "'" + fend_value + "'"));
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
                    strFilter = "?" + strFilter.substring(0, strFilter.length - 1);
                }
                //self.strFilter = window.encodeURIComponent(self.url + '/' + self.numpage + '/' + self.rpp + strFilter);
                self.strFilter = self.url + '/' + self.numpage + '/' + self.rpp + strFilter;
                $location.path(self.strFilter).search('order', self.order);


                return false;
            }
            self.dameFiltro = function (campo, operador, valor) {
                return 'filter=and,' + campo + ',' + operador + ',' + valor;
            }
        }]
});


