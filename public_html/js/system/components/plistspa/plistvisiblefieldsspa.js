'use strict';

moduloDirectivas.directive('plistvisiblefieldsspa', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/system/components/plistspa/plistvisiblefieldsspa.html'
    };
});

moduloSistema.controller('plistvisiblefieldsspaController', ['$scope', function ($scope) {
//        $scope.Fields = $scope.$parent.Fields;      
    }]);