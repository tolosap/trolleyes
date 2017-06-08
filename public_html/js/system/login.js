'use strict';
moduloSistema.controller('LoginController', ['$http', '$scope', '$routeParams', '$location', 'serverService', 'sessionService',
    function ($http, $scope, $routeParams, $location, serverService, sessionService) {
        $scope.title = "Formulario de entrada al sistema";
        $scope.icon = "fa-file-text-o";
        $scope.user = {};
        $scope.session_info = sessionService.getSessionInfo();
        $scope.isSessionActive = sessionService.isSessionActive();
        $scope.debugging = serverService.debugging();
        $scope.checkGrupoStatusMsg = "";
        $scope.fill = function (nombre) {
            if (serverService.debugging()) {
                $scope.user.username = nombre;
                $scope.user.password = nombre;
            }
        }
        $scope.fillRegistro = function (cod) {
            if (serverService.debugging()) {
                $scope.user.key = cod;
            }
        }
        $scope.checkGrupo = function () {
            if ($scope.user.key) {
                $http.get(serverService.getAppUrl() + '?ob=usuario&op=checkgrupo&codigo=' + $scope.user.key, 'GET', '').then(function (response) {
                    if (response.status == 200) {
                        if (response.data.message == "OK") {
                            $location.path('/newalumno/' + $scope.user.key);
                        }
                    } else {
                        $scope.checkGrupoStatusMsg = "Error: el grupo no es correcto.";
                        return false;
                    }
                }, function errorCallback(response, status) {
                    $scope.checkGrupoStatusMsg = "Error: el grupo no es correcto.";
                    return false;
                    return false;
                });
            }
        }
        $scope.login = function () {
            serverService.getLoginPromise($scope.user.username, $scope.user.password).then(function (response) {
                if (response.status == 200) {
                    sessionService.setSessionActive();
                    sessionService.setSessionInfo(response.data.message);
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
    }]);


