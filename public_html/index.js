sisane.controller('IndexController', ['$scope', '$location', 'serverService', 'sessionService',
    function ($scope, $location, serverService, sessionService) {
        $scope.username = "";
        $scope.desc_tipousuario="";
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
        $scope.isSessionActive = function () {
            if (sessionService.isSessionActive()) {
                console.log("executing index...");
                $scope.username = sessionService.getUsername();
                $scope.desc_tipousuario = sessionService.getDesc_tipousuario();
                $scope.nombre = sessionService.getNombre_completo();
                return true;
            } else {
                return false;
            }
        };       
    }]);