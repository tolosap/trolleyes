/*
 * Copyright (c) 2015 by Rafael Angel Aznar Aparici (rafaaznar at gmail dot com)
 *
 * sisane: The stunning micro-library that helps you to develop easily
 *             AJAX web applications by using Angular.js 1.x & sisane-server
 * sisane is distributed under the MIT License (MIT)
 * Sources at https://github.com/rafaelaznar/sisane
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
//-------------
var sisane = angular.module('myApp', [
    'ngRoute',
    'Filters',
    'Services',
    'Directives',
    'systemControllers',   
    'usuarioControllers',   
    'ngSanitize',
    'chart.js'
]);
//-------------
sisane.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.html5Mode({
            //requireBase: false,
            enabled: true
        });
    }]);
//-------------
sisane.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    }]);
//-------------
var anyAuthenticationPromise = function (sessionService) {
    return sessionService.anyAuthenticationPromise();
};
var authenticationAdministratorPromise = function (sessionService) {
    return sessionService.authenticationPromise(1);
};
var authenticationClientPromise = function (sessionService) {
    return sessionService.authenticationPromise(2);
};
sisane.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {templateUrl: 'js/system/home.html', controller: 'HomeController', resolve: {auth: anyAuthenticationPromise}});
        //------------
        $routeProvider.when('/login', {templateUrl: 'js/system/login.html', controller: 'LoginController', resolve: {auth: anyAuthenticationPromise}});
        $routeProvider.when('/profile', {templateUrl: 'js/system/profile.html', controller: 'ProfileController', resolve: {auth: anyAuthenticationPromise}});
        $routeProvider.when('/logout', {templateUrl: 'js/system/logout.html', controller: 'LogoutController', resolve: {auth: anyAuthenticationPromise}});
        $routeProvider.when('/home', {templateUrl: 'js/system/home.html', controller: 'HomeController', resolve: {auth: anyAuthenticationPromise}});
        $routeProvider.when('/license', {templateUrl: 'js/system/license.html', controller: 'LicenseController', resolve: {auth: anyAuthenticationPromise}});
        $routeProvider.when('/passchange', {templateUrl: 'js/system/passchange.html', controller: 'PasschangeController', resolve: {auth: anyAuthenticationPromise}});                
        //------------
        $routeProvider.when('/usuario/1/view/:id', {templateUrl: 'js/usuario/1/view.html', controller: 'UsuarioView1Controller', resolve: {auth: authenticationAdministratorPromise}});
        $routeProvider.when('/usuario/1/new/:id?', {templateUrl: 'js/usuario/1/new.html', controller: 'UsuarioNew1Controller', resolve: {auth: authenticationAdministratorPromise}});
        $routeProvider.when('/usuario/1/edit/:id', {templateUrl: 'js/usuario/1/edit.html', controller: 'UsuarioEdit1Controller', resolve: {auth: authenticationAdministratorPromise}});
        $routeProvider.when('/usuario/1/remove/:id', {templateUrl: 'js/usuario/1/remove.html', controller: 'UsuarioRemove1Controller', resolve: {auth: authenticationAdministratorPromise}});
        $routeProvider.when('/usuario/1/plist/:page?/:rpp?', {templateUrl: 'js/usuario/1/plist.html', controller: 'UsuarioPList1Controller', resolve: {auth: authenticationAdministratorPromise}});                
        //------------
        $routeProvider.otherwise({redirectTo: '/'});
    }]);
//-------------
sisane.run(function ($rootScope, $location, sessionService) {
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        //here's where we notify the auth service with the
        //url where user wants to go
        //sessionservice will let or not it go depending on the
        //call to the server sessionstatus
        sessionService.setNextURL(next.$$route.originalPath);
    });
});
//-------------
var moduloSistema = angular.module('systemControllers', []);
var moduloUsuario = angular.module('usuarioControllers', []);
//-------------
var moduloDirectivas = angular.module('Directives', []);
var moduloServicios = angular.module('Services', []);
var moduloFiltros = angular.module('Filters', []);
