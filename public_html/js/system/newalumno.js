'use strict';
moduloSistema.controller('NewalumnoController', ['$http', '$scope', '$routeParams', '$location', 'serverService', 'sessionService',
    function ($http, $scope, $routeParams, $location, serverService, sessionService) {
        $scope.title = "Registro de alumno para el curso " + $routeParams.codigo;
        $scope.isSessionActive = sessionService.isSessionActive();
        $scope.status = null;
        $scope.debugging = serverService.debugging();
        $scope.bean = {};
        $scope.codigoGrupo = $routeParams.codigo;

        $scope.fase = 1;

        $scope.validausuario = function () {
            if ($scope.fase == 1) {
                if ($scope.bean.login) {
                    $http.get(serverService.getAppUrl() + '?ob=usuario&op=checkloginnotexists&login=' + $scope.bean.login, 'GET', '').then(function (response) {
                        if (response.status == 200) {
                            if (response.data.message == "OK") {
                                $scope.fase = 2;
                            }
                        } else {
                            
                            return false;
                        }
                    }, function errorCallback(response, status) {
                        $scope.checkGrupoStatusMsg = "Error: el grupo no es correcto.";
                        return false;
                        return false;
                    });
                }
            }
        }

    }]);


