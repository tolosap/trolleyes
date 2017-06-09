'use strict';
moduloSistema.controller('NewalumnoController', ['$http', '$scope', '$routeParams', '$location', 'serverService', 'sessionService', '$rootScope',
    function ($http, $scope, $routeParams, $location, serverService, sessionService, $rootScope) {
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
                    $http.get(serverService.getAppUrl() + '?ob=usuario&op=checklogin&login=' + $scope.bean.login, 'GET', '').then(function (response) {
                        if (response.status == 200) {
                            if (response.data.message == "OK") {
                                $rootScope.outerForm.login.$setValidity('repetido', false);
                                $scope.fase = 2;
                            }
                        } else {
                            $rootScope.outerForm.login.$setValidity('repetido', true);
                            return false;
                        }
                    }, function errorCallback(response, status) {
                        $rootScope.outerForm.login.$setValidity('repetido', true);
                        return false;
                    });
                }
            }
        }

    }
]);


