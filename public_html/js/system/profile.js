'use strict';
moduloSistema.controller('ProfileController', ['$scope', '$routeParams', '$location', 'serverService', 'sessionService',
    function ($scope, $routeParams, $location, serverService, sessionService) {
        $scope.title = "Perfil de usuario";
        $scope.icon = "fa-user";

        $scope.session_info = sessionService.getSessionInfo();

        console.log("LOADING PROFILE");

    

//        isSessionActive = false;
//        username = "";
//        id = 0;
//        nombre = "";
//        primer_apellido = "";
//        segundo_apellido = "";
//        email = "";
//        activo = false;
//        validado = false;
//        fecha_alta = "";
//        id_tipousuario = "";
//        desc_tipousuario = "";
        $scope.back = function () {
            window.history.back();
        };
//        $scope.passchange = function () {
//            serverService.getPasswordChangePromise($scope.old, $scope.new).then(function (response) {
//                $scope.response = response;
//                if (response.status == 200) {
//                    if (response.data.status == 200) {
//                        $scope.status = "El password se ha cambiado";
//                        $scope.result = response.data.message;
//
//                    } else {
//                        $scope.status = "No se ha cambiado el password";
//                    }
//                } else {
//                    $scope.status = "No se ha cambiado el password";
//                }
//            }).catch(function (data) {
//                $scope.status = "No se ha cambiado el password";
//            });
//        }
    }]);


