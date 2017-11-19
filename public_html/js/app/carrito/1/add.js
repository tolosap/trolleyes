'use strict';

moduloCarrito.controller('CarritoAdd1Controller',
        ['$scope', '$routeParams', '$location', 'serverCallService', '$filter', '$uibModal', 'sessionService', '$route', 'toolService', 'constantService', 'objectService',
            function ($scope, $routeParams, $location, serverCallService, $filter, $uibModal, sessionService, $route, toolService, constantService, objectService) {
                $scope.ob = "carrito";
                $scope.op = "add";
                $scope.profile = 1;
                $scope.id = $routeParams.id_producto;
                $scope.cantidad = $routeParams.cantidad;
                //---
                $scope.status = null;
                $scope.debugging = constantService.debugging();
                $scope.url = $scope.ob + '/' + $scope.profile + '/' + $scope.op;
                //---
                $scope.bean = {};
                $scope.bean.obj_producto = {"id": 0};
                //---
                $scope.objectService = objectService;
                //---
                function getDataFromServer() {
                    serverCallService.getAdd($scope.ob,$scope.id,$scope.cantidad).then(function () {
                        //$location.path('/home');
                        window.history.back();
                    })
                }
                
                getDataFromServer();
            }
        ]);

