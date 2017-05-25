'use strict';

moduloDirectivas.directive('plistvisiblefields', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/system/components/plist/plistvisiblefields.html'
    };
});

moduloSistema.controller('plistvisiblefieldsController', ['$scope', 'serverService', function ($scope, serverService) {
//        $scope.Fields = $scope.$parent.Fields;      
    }]);