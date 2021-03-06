'use strict';

moduloCarrito.controller('CarritoRemove1Controller',
        ['$scope', '$routeParams', '$location', 'serverCallService', '$filter', '$uibModal', 'sessionService', '$route', 'toolService', 'constantService', 'objectService',
            function ($scope, $routeParams, $location, serverCallService, $filter, $uibModal, sessionService, $route, toolService, constantService, objectService) {
                $scope.ob = "carrito";
                $scope.op = "remove";
                $scope.profile = 1;
                $scope.id = $routeParams.id_producto;
                //---
                $scope.status = null;
                $scope.debugging = constantService.debugging();
                $scope.url = $scope.ob + '/' + $scope.profile + '/' + $scope.op;
                //---
                //---
                $scope.objectService = objectService;
                //---
                function getDataFromServer() {
                    serverCallService.getRemove($scope.ob,$scope.id).then(function () {
                        //$location.path('/home');
                        window.history.back();
                    })
                }
                
                getDataFromServer();
            }
        ]);

