'use strict';

moduloCarrito.controller('CarritoBuy1Controller',
        ['$scope', '$routeParams', '$location', 'serverCallService', '$filter', '$uibModal', 'sessionService', '$route', 'toolService', 'constantService', 'objectService',
            function ($scope, $routeParams, $location, serverCallService, $filter, $uibModal, sessionService, $route, toolService, constantService, objectService) {
                $scope.ob = "carrito";
                $scope.op = "buy";
                $scope.profile = 1;
                //---
                $scope.status = null;
                $scope.debugging = constantService.debugging();
                $scope.url = $scope.ob + '/' + $scope.profile + '/' + $scope.op;
                //---
                //---
                $scope.objectService = objectService;
                //---
                function getDataFromServer() {
                    serverCallService.getBuy($scope.ob).then(function (response) {
                        if (response.status == 200) {
                            $scope.obj = response.data.json;                            
                        }
                        //window.history.back();
                    });
                }
                
                getDataFromServer();
            }
        ]);

