sisane.controller('IndexController', ['$scope', '$location', 'serverService', 'sessionService',
    function ($scope, $location, serverService, sessionService) {
        
        
        $scope.session_info = sessionService.getSessionInfo();     
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
        $scope.isSessionActive = function () {
            if (sessionService.isSessionActive()) {                       
                return true;
            } else {
                return false;
            }
        };
    }]);