'use strict';
moduloSistema.controller('PasschangeController',
        ['$scope', '$routeParams', '$location', 'constantService', 'sessionService', 'sessionServerCallService',
            function ($scope, $routeParams, $location, constantService, sessionService, sessionServerCallService) {
                $scope.title = "Formulario de cambio de password";
                $scope.icon = "fa-key";

                $scope.session_info = sessionService.getSessionInfo();
                $scope.isSessionActive = sessionService.isSessionActive();
                $scope.debugging = constantService.debugging();
                $scope.status = null;
                $scope.old = '';
                $scope.new = '';
                $scope.passchange = function () {
                    sessionServerCallService.getPasswordChangePromise($scope.old, $scope.new).then(function (response) {
                        $scope.response = response;
                        if (response.status == 200) {
                            if (response.data.status == 200) {
                                $scope.status = "El password se ha cambiado";
                                $scope.result = response.data.message;
                            } else {
                                $scope.status = "No se ha cambiado el password";
                            }
                        } else {
                            $scope.status = "No se ha cambiado el password";
                        }
                    }).catch(function (data) {
                        $scope.status = "No se ha cambiado el password";
                    });
                }
            }
        ]);


