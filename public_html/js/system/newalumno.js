'use strict';
moduloSistema.controller('NewalumnoController', ['$http', '$scope', '$routeParams', '$location', 'serverService', 'sessionService',
    function ($http, $scope, $routeParams, $location, serverService, sessionService) {
        $scope.ob = "usuario";
        $scope.op = "newalumno";
        $scope.session_info = sessionService.getSessionInfo();
        $scope.isSessionActive = sessionService.isSessionActive();
        $scope.status = null;
        $scope.debugging = serverService.debugging();
        $scope.bean = {};
//        //---
//        $scope.bean.obj_tipousuario = {"id": null};
//        $scope.show_obj_tipousuario = true;
//        //---
//        $scope.bean.obj_medico = {"id": null};
//        $scope.show_obj_medico = true;
//        //---
        $scope.codigoGrupo = $routeParams.codigo;


    }]);


