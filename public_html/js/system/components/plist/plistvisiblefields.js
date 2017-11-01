'use strict';

moduloDirectivas.directive('plistvisiblefields', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/system/components/plist/plistvisiblefields.html'
    };
});

moduloSistema.controller('plistvisiblefieldsController',
        ['$scope',
            function ($scope) {
//        $scope.Fields = $scope.$parent.Fields;      
            }]);