'use strict';
moduloSistema.controller('LoginController', ['$scope', '$routeParams', '$location', 'serverService', 'sessionService',
    function ($scope, $routeParams, $location, serverService, sessionService) {
        $scope.title = "Formulario de entrada al sistema";
        $scope.icon = "fa-file-text-o";
        $scope.user = {};
        $scope.session_info = sessionService.getSessionInfo();
        $scope.isSessionActive = sessionService.isSessionActive();
        $scope.debugging = serverService.debugging();
        $scope.fill = function (nombre) {
            if (serverService.debugging()) {
                $scope.user.username = nombre;
                $scope.user.password = nombre;
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


