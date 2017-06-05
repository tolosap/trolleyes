sisane.controller('IndexController', ['$scope', '$location', 'serverService', 'sessionService',
    function ($scope, $location, serverService, sessionService) {
        sessionService.authenticationPromise().then(function () {
            $scope.session_info = sessionService.getSessionInfo();
            //$scope.isActive = sessionService.isSessionActive;
            $scope.isSessionActive= sessionService.isSessionActive;
        })
//        $scope.isActive = function (viewLocation) {
//            return viewLocation === $location.path();
//        };
//        $scope.isSessionActive = function () {
//            if (sessionService.isSessionActive()) {
//                return true;
//            } else {
//                return false;
//            }
//        };
    }]);