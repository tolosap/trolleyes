'use strict';
moduloSistema.controller('ProfileController', ['$scope', '$routeParams', '$location', 'sessionService',
    function ($scope, $routeParams, $location, sessionService) {
        $scope.title = "Perfil de usuario";
        $scope.icon = "fa-user";

        $scope.session_info = sessionService.getSessionInfo();
        $scope.isSessionActive = sessionService.isSessionActive();

        $scope.back = function () {
            window.history.back();
        };

    }]);


