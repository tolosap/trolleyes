'use strict';
moduloSistema.controller('LoginController', ['$scope', '$routeParams', '$location', 'serverService', 'sessionService',
    function ($scope, $routeParams, $location, serverService, sessionService) {
        $scope.title = "Formulario de entrada al sistema";
        $scope.icon = "fa-file-text-o";
        $scope.user = {};
        if (serverService.debugging()) {
            $scope.user.username = 'rafael';
            $scope.user.password = 'rafael';
            //$scope.user.password = '79063E8037FFF16D297A1FE65136F1251126CDDB2CC9870ECF8D653835538E85';
        }
        $scope.login = function () {
            serverService.getLoginPromise($scope.user.username, $scope.user.password).then(function (response) {
                if (response.status == 200) {
                    sessionService.setSessionActive();
                    sessionService.setSessionInfo(response.data.message);                   
                    $location.path('home');
                } else {
                    sessionService.setSessionInactive();       
                    return false;
                }
            }, function errorCallback(response, status) {
                sessionService.setSessionInactive();         
                return false;
            });
        };

    }]);


