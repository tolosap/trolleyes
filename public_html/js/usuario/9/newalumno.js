'use strict';
moduloUsuario.controller('Newalumno9Controller', ['$http', '$scope', '$routeParams', '$location', 'serverService', 'sessionService', '$rootScope',
    function ($http, $scope, $routeParams, $location, serverService, sessionService, $rootScope) {
        $scope.title = "Registro de alumno para el grupo " + $routeParams.codigo;
        $scope.profile = 9;
        $scope.isSessionActive = sessionService.isSessionActive();

        $scope.status = null;
        $scope.debugging = serverService.debugging();
        $scope.bean = {};
        $scope.codigoGrupo = $routeParams.codigo;
        $scope.fase = 1;


        //obtener información del profesor y del curso y del centro a partir del código de centro
        $http.get(serverService.getAppUrl() + '?ob=usuario&op=getidcurso&codigo=' + $routeParams.codigo, 'GET', '').then(function (response) {
            if (response.status == 200) {
                //if (response.data.message == "OK") {
                //$scope.outerForm.login.$setValidity('repetido', false);
                $scope.fase = 1;
                $scope.grupo = response.data.message;
                //}
            } else {
                //$scope.outerForm.login.$setValidity('repetido', true);
                return false;
            }
        }, function errorCallback(response, status) {
            //$scope.outerForm.login.$setValidity('repetido', true);
            return false;
        });

        $scope.back = function () {
            window.history.back();
        };

        $scope.validausuario = function (field) {
            if ($scope.fase == 1) {
                if ($scope.bean.login) {
                    $http.get(serverService.getAppUrl() + '?ob=usuario&op=checklogin&login=' + $scope.bean.login, 'GET', '').then(function (response) {
                        if (response.status == 200) {
                            if (response.data.message == "OK") {
                                //$scope.outerForm.login.$setValidity('repetido', false);
                                $scope.fase = 2;
                            }
                        } else {
                            //$scope.outerForm.login.$setValidity('repetido', true);
                            return false;
                        }
                    }, function errorCallback(response, status) {
                        //$scope.outerForm.login.$setValidity('repetido', true);
                        return false;
                    });
                }
            }
        }
        $scope.checkPass = function () {
            if ($scope.bean.password == $scope.bean.password2) {
                return false;
            } else {
                return true;
            }
        }
        $scope.validaContrasenya = function () {
            $scope.fase = 3;
        }
//        $scope.anyInvalid = function (form) {
//            for (var prop in form) {
//                if (form.hasOwnProperty(prop)) {
//                    if (form[prop].$invalid) {
//                        return true;
//                    }
//                }
//            }
//            return false;
//        };
//        $scope.anyDirtyAndInvalid = function (form) {
//            for (var prop in form) {
//                if (form.hasOwnProperty(prop)) {
//                    if (form[prop].$dirty && form[prop].$invalid) {
//                        return true;
//                    }
//                }
//            }
//            return false;
//        };

        $scope.send = function () {
//            $scope.bean.creation = $filter('date')($scope.bean.creation, "dd/MM/yyyy");
//            $scope.bean.modification = $filter('date')($scope.bean.modification, "dd/MM/yyyy");
//            if (!$scope.bean.obj_medico.id > 0) {
//                $scope.bean.obj_medico.id = null;
//            }
            delete $scope.bean.password2;
            $scope.bean.id_grupo = $scope.grupo.obj_curso.id;
            $scope.bean.id_centro = $scope.grupo.obj_usuario.obj_centro.id;
            $scope.bean.id_centrosanitario = $scope.grupo.obj_usuario.obj_centrosanitario.id;
            $scope.bean.password = forge_sha256($scope.bean.password).toUpperCase();
            var jsonToSend = {json: JSON.stringify(serverService.array_identificarArray($scope.bean))};
            $http.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';

            $http.get(serverService.getAppUrl() + '?ob=usuario&op=setalumno', {params: jsonToSend}).then(function (response) {
                if (response.status == 200) {
                    if (response.data.status == 200) {
                        $scope.response = response;
                        $scope.fase = 4;
                        $scope.status = "Tus datos han sido grabados. Ahora tu profesor debe activar tu cuenta para que puedas entrar en el sistema.";
                        $scope.bean.id = response.data.message;
                    } else {
                        $scope.status = "Error en la recepción de datos del servidor. Indica el error al administrador del sistema.";
                    }
                } else {
                    $scope.status = "Error en la recepción de datos del servidor. Indica el error al administrador del sistema.";
                }
            }).catch(function (data) {
                $scope.status = "Error en la recepción de datos del servidor. Indica el error al administrador del sistema.";
            });
            ;
        };
    }
]);


