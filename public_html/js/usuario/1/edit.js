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
moduloUsuario.controller('UsuarioEdit1Controller', ['$scope', '$routeParams', '$location', 'serverService', 'sharedSpaceService', '$filter', '$uibModal', 'sessionService',
    function ($scope, $routeParams, $location, serverService, sharedSpaceService, $filter, $uibModal, sessionService) {
        $scope.ob = "usuario";
        $scope.profile = 1;
        $scope.op = "edit";
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
        $scope.id = $routeParams.id;
        serverService.promise_getOne($scope.ob, $scope.id).then(function (response) {
            if (response.status == 200) {
                if (response.data.status == 200) {
                    $scope.status = null;

                    $scope.bean = response.data.message.data;
                    $scope.metaobj = response.data.message.metaobj;
                    $scope.metaprops = response.data.message.metaprops;

                    $scope.icon = $scope.metaobj.icon;
                    $scope.obtitle = $scope.metaobj.name;
                    $scope.ob = $scope.metaobj.name;
                    $scope.title = "Modificación de " + $scope.obtitle;

                } else {
                    $scope.status = "Error en la recepción de datos del servidor";
                }
            } else {
                $scope.status = "Error en la recepción de datos del servidor";
            }
        }).catch(function (data) {
            $scope.status = "Error en la recepción de datos del servidor";
        });
        $scope.save = function () {
//            $scope.bean.creation = $filter('date')($scope.bean.creation, "dd/MM/yyyy");
//            $scope.bean.modification = $filter('date')($scope.bean.modification, "dd/MM/yyyy");
//            if ($scope.bean.obj_tipousuario.id <= 0) {
//                $scope.bean.obj_tipousuario.id = null;
//            }
//            if ($scope.bean.obj_medico.id <= 0) {
//                $scope.bean.obj_medico.id = null;
//            }
            var jsonToSend = {json: JSON.stringify(serverService.array_identificarArray($scope.bean))};
            serverService.promise_setOne($scope.ob, jsonToSend).then(function (response) {
                if (response.status == 200) {
                    if (response.data.status == 200) {
                        $scope.response = response;
                        $scope.status = "El registro de " + $scope.obtitle + " con id=" + $scope.bean.id + " se ha modificado.";
                        $scope.bean.id = $scope.bean.id;
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
    }]);