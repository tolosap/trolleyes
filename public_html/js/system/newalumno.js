'use strict';
moduloSistema.controller('NewalumnoController', ['$http', '$scope', '$routeParams', '$location', 'serverService', 'sessionService',
    function ($http, $scope, $routeParams, $location, serverService, sessionService) {
        $scope.title = "Registro de alumno para el curso " + $routeParams.codigo;        
        $scope.isSessionActive = sessionService.isSessionActive();
        $scope.status = null;
        $scope.debugging = serverService.debugging();
        $scope.bean = {};
        $scope.codigoGrupo = $routeParams.codigo;


    }]);


