'use strict';

moduloTecnica.controller('TecnicaPListController', ['$scope', '$routeParams', '$location', 'serverService', 'tecnicaService', '$uibModal',
    function ($scope, $routeParams, $location, serverService, tecnicaService, $uibModal) {

        $scope.fields = tecnicaService.getFields();
        $scope.obtitle = tecnicaService.getObTitle();
        $scope.icon = tecnicaService.getIcon();
        $scope.ob = tecnicaService.getTitle();
        $scope.title = "Listado de " + $scope.obtitle;
        $scope.op = "plist";
        $scope.numpage = serverService.checkDefault(1, $routeParams.page);
        $scope.rpp = serverService.checkDefault(10, $routeParams.rpp);
        $scope.neighbourhood = serverService.getGlobalNeighbourhood();
        $scope.order = "";
        $scope.ordervalue = "";
        $scope.filter = "id";
        $scope.filteroperator = "like";
        $scope.filtervalue = "";
        $scope.filterParams = serverService.checkNull($routeParams.filter)
        $scope.orderParams = serverService.checkNull($routeParams.order)
        $scope.sfilterParams = serverService.checkNull($routeParams.sfilter)
        $scope.filterExpression = serverService.getFilterExpression($routeParams.filter, $routeParams.sfilter);
        $scope.status = null;
        $scope.debugging = serverService.debugging();

        $scope.url = $scope.ob + '/' + $scope.op;
        function getDataFromServer() {
            serverService.promise_getCount($scope.ob, $scope.filterExpression).then(function (response) {
                if (response.status == 200) {
                    $scope.registers = response.data.message;
                    $scope.pages = serverService.calculatePages($scope.rpp, $scope.registers);
                    if ($scope.numpage > $scope.pages) {
                        $scope.numpage = $scope.pages;
                    }
                    return serverService.promise_getPage($scope.ob, $scope.rpp, $scope.numpage, $scope.filterExpression, $routeParams.order);
                } else {
                    $scope.status = "Error en la recepción de datos del servidor1";
                }
            }).then(function (response) {
                if (response.status == 200) {
                    $scope.page = response.data.message;
                    $scope.status = "";
                } else {
                    $scope.status = "Error en la recepción de datos del servidor2";
                }
            }).catch(function (data) {
                $scope.status = "Error en la recepción de datos del servidor3";
            });
        }
        getDataFromServer();
    }]);


