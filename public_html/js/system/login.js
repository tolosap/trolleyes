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
//                    sessionService.setSessionActive();
//                    sessionService.setUsername(response.data.login);
//                    sessionService.setId(response.data.id);

                    sessionService.setSessionActive();
                    sessionService.setUsername(response.data.message.login);
                    sessionService.setId(response.data.message.id);
                    sessionService.setNombre(response.data.message.nombre);
                    sessionService.setPrimer_apellido(response.data.message.primer_apellido);
                    sessionService.setSegundo_apellido(response.data.message.segundo_apellido);
                    sessionService.setEmail(response.data.message.email);
                    sessionService.setActivo(response.data.message.activo);
                    sessionService.setValidado(response.data.message.validado);
                    sessionService.setFecha_alta(response.data.message.fecha_alta);
                    sessionService.setId_tipousuario(response.data.message.obj_tipousuario.id);
                    sessionService.setDesc_tipousuario(response.data.message.obj_tipousuario.descripcion);

                    $location.path('home');
                } else {
                    sessionService.setSessionInactive();       
                    return false;
                }
            }, function errorCallback(response, status) {
                sessionService.setSessionInactive();
                sessionService.setUsername('');
                return false;
            });
        };

    }]);


