/* Copyright (c) 2017 by Rafael Angel Aznar Aparici (rafaaznar at gmail dot com)
 * 
 * gesane is a medical pilot web application that shows an environment
 *        for easily developing AJAX web applications
 *        
 * Sources at https://github.com/rafaelaznar/
 * 
 * gesane is distributed under the MIT License (MIT)
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
 */

'use strict';

moduloMedico.controller('UsuarioPList1Controller', ['$scope', '$routeParams', '$location', 'serverService', '$uibModal', 'sessionService',
    function ($scope, $routeParams, $location, serverService, $uibModal, sessionService) {
        $scope.ob = "usuario";
        $scope.source = "usuario";
        $scope.op = "plist";
        $scope.profile = 1;
        //----
        $scope.session_info = sessionService.getSessionInfo();
        $scope.isSessionActive = sessionService.isSessionActive();
        $scope.numpage = serverService.checkDefault(1, $routeParams.page);
        $scope.rpp = serverService.checkDefault(10, $routeParams.rpp);
        $scope.neighbourhood = serverService.getGlobalNeighbourhood();
        $scope.status = null;
        $scope.debugging = serverService.debugging();
        $scope.url = $scope.ob + '/' + $scope.profile + '/' + $scope.op;
        $scope.orderParams = serverService.checkNull($routeParams.order);
        $scope.filterParams = serverService.getFilter($routeParams.filter);
        function getDataFromServer() {
            serverService.promise_getCount($scope.source, $scope.filterParams).then(function (response) {
                if (response.status == 200) {
                    $scope.registers = response.data.message;
                    $scope.pages = serverService.calculatePages($scope.rpp, $scope.registers);
                    if ($scope.numpage > $scope.pages) {
                        $scope.numpage = $scope.pages;
                    }
                    return serverService.promise_getPage($scope.source, $scope.rpp, $scope.numpage, $scope.filterParams, $routeParams.order);
                } else {
                    $scope.status = "Error en la recepción de datos del servidor";
                }
            }).then(function (response) {
                if (response.status == 200) {
                    $scope.page = response.data.message.data;
                    $scope.metaobj = response.data.message.metaobj;
                    $scope.metaprops = response.data.message.metaprops;
                    //
                    $scope.icon = $scope.metaobj.icon;
                    $scope.obtitle = $scope.metaobj.name;
                    $scope.title = "Listado de " + $scope.obtitle;
                    $scope.status = "";
                } else {
                    $scope.status = "Error en la recepción de datos del servidor";
                }
            }).catch(function (data) {
                $scope.status = "Error en la recepción de datos del servidor";
            });
        }
        $scope.close = function () {
            $location.path('/home');
        };
        getDataFromServer();
    }]);


