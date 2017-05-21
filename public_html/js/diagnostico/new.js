/* 
 * Copyright (c) 2015 by Rafael Angel Aznar Aparici (rafaaznar at gmail dot com)
 * 
 * sisane: The stunning micro-library that helps you to develop easily 
 *             AJAX web applications by using Angular.js 1.x & sisane-server
 * sisane is distributed under the MIT License (MIT)
 * Sources at https://github.com/rafaelaznar/
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */

'use strict';

moduloDiagnostico.controller('DiagnosticoNewController', ['$scope', '$routeParams', '$location', 'serverService', 'diagnosticoService', 'sharedSpaceService', '$filter', '$uibModal',
    function ($scope, $routeParams, $location, serverService, diagnosticoService, sharedSpaceService, $filter, $uibModal) {
        $scope.fields = diagnosticoService.getFields();
        $scope.obtitle = diagnosticoService.getObTitle();
        $scope.icon = diagnosticoService.getIcon();
        $scope.ob = diagnosticoService.getTitle();
        $scope.title = "Creando un nuevo " + $scope.obtitle;
        $scope.op = "plist";
        $scope.status = null;
        $scope.error = true;
        $scope.debugging = serverService.debugging();
        $scope.bean = {};
        //----

        $scope.bean.obj_tipodiagnostico = {"id": 0};
        if ($routeParams.id_tipodiagnostico) {
            serverService.promise_getOne('tipodiagnostico', $routeParams.id_tipousuario).then(function (response) {
                if (response.data.message.id != 0) {
                    $scope.bean.obj_tipodiagnostico = response.data.message;
                    $scope.show_obj_tipodiagnostico = false;
                    $scope.title = "Nuevo diagnostico del tipo" + $scope.bean.obj_tipodiagnostico.descripcion;
                }
            });
        } else {
            $scope.show_obj_tipodiagnostico = true;
        }

        $scope.bean.obj_episodio = {"id": 0};
        if ($routeParams.id_episodio) {
            serverService.promise_getOne('episodio', $routeParams.id_episodio).then(function (response) {
                if (response.data.message.id != 0) {
                    $scope.bean.obj_episodio = response.data.message;
                    $scope.show_obj_episodio = false;
                    $scope.title = "Nuevo episodio con informe " + $scope.bean.obj_tipodiagnostico.informe;
                }
            });
        } else {
            $scope.show_obj_episodio = true;
        }

        $scope.save = function () {
            var arrinputdate = $scope.bean.fecha.split(" ");
            var partes = arrinputdate[0].split("/");
            var newDate = new Date(partes[2], partes[1] - 1, partes[0]);
            $scope.bean.fecha = $filter('date')(newDate, "dd/MM/yyyy HH:mm");

            var jsonToSend = {json: JSON.stringify(serverService.array_identificarArray($scope.bean))};
            serverService.promise_setOne($scope.ob, jsonToSend).then(function (response) {
                if (response.status == 200) {
                    if (response.data.status == 200) {
                        $scope.response = response;
                        $scope.status = "El registro " + $scope.obtitle + " se ha creado con id = " + response.data.message;
                        $scope.bean.id = response.data.message;
                    } else {
                        $scope.status = "Error en la recepción de datos del servidor";
                    }
                } else {
                    $scope.status = "Error en la recepción de datos del servidor";
                }
            }).catch(function (data) {
                $scope.status = "Error en la recepción de datos del servidor";
            });
            ;
        };
        $scope.back = function () {
            window.history.back();
        };
        $scope.close = function () {
            $location.path('/home');
        };
        $scope.plist = function () {
            $location.path('/' + $scope.ob + '/plist');
        };
        
    }]);

