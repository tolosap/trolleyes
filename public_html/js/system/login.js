'use strict';
moduloSistema.controller('LoginController',
        ['$scope', '$location', 'constantService', 'sessionServerCallService', 'sessionService',
            function ($scope, $location, constantService, sessionServerCallService, sessionService) {
                $scope.title = "Formulario de entrada al sistema";
                $scope.icon = "fa-file-text-o";
                $scope.user = {};
                $scope.session_info = sessionService.getSessionInfo();
                $scope.isSessionActive = sessionService.isSessionActive();
                $scope.debugging = constantService.debugging();
                $scope.checkGrupoStatusMsg = "";
                $scope.fill = function (nombre) {
                    if (constantService.debugging()) {
                        $scope.user.username = nombre;
                        $scope.user.password = nombre;
                    }
                }
                $scope.fillRegistro = function (cod) {
                    if (constantService.debugging()) {
                        $scope.user.key = cod;
                    }
                }
                $scope.login = function () {
                    sessionServerCallService.getLoginPromise($scope.user.username, $scope.user.password).then(function (response) {
                        if (response.status == 200) {
                            sessionService.setSessionActive();
                            sessionService.setSessionInfo(response.data.json);
                            $scope.session_info = sessionService.getSessionInfo();
                            $scope.isSessionActive = sessionService.isSessionActive();
                            $location.path('home');
                        } else {
                            sessionService.setSessionInactive();
                            $scope.session_info = sessionService.getSessionInfo();
                            $scope.isSessionActive = sessionService.isSessionActive();
                            return false;
                        }
                    }, function errorCallback(response, status) {
                        sessionService.setSessionInactive();
                        $scope.session_info = sessionService.getSessionInfo();
                        $scope.isSessionActive = sessionService.isSessionActive();
                        return false;
                    });
                };
            }
        ]);


