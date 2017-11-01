'use strict';
moduloSistema.controller('LogoutController', ['$scope', '$routeParams', '$location', 'sessionServerCallService', 'sessionService',
    function ($scope, $routeParams, $location, sessionServerCallService, sessionService) {
        $scope.title = "Bye";
        $scope.icon = "fa-sign-out";
        $scope.session_info = sessionService.getSessionInfo();
        $scope.isSessionActive = sessionService.isSessionActive();
        sessionServerCallService.getLogoutPromise().then(function (response) {
            if (response.status == 200) {
                if (response.data.status == 200) {
                    sessionService.setSessionInactive();
                    $scope.session_info = sessionService.getSessionInfo();
                    $scope.isSessionActive = sessionService.isSessionActive();
                    $scope.status = "Has salido del sistema";
                    //$location.path('home');
                } else {
                    $scope.status = "Error en la recepción de datos del servidor";
                }
            } else {
                $scope.status = "Error en la recepción de datos del servidor";
            }
        }).catch(function (data) {
            $scope.status = "Error en la recepción de datos del servidor";
        });
    }]);


