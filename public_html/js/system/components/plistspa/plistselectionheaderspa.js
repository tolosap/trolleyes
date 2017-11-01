'use strict';

moduloDirectivas.directive('plistselectionheaderspa', function () {
    return {
        restrict: 'A',
        templateUrl: 'js/system/components/plistspa/plistselectionheaderspa.html'
    };
});

moduloSistema.controller('plistSelectionHeaderSpaController', ['$scope', '$rootScope', function ($scope, $rootScope) {
        $scope.dosortSelection = function (field, mode)
        {
            $scope.uorder = field + ',' + mode;
            $rootScope.$broadcast('orderSelectionEvent', $scope.uorder);
            return false;
        }
    }]);