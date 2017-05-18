moduloDirectivas.component('bfKey', {
    templateUrl: "js/system/components/bfkey/bfkey.html",
    controllerAs: 'bfk',
    controller: bfkey,
    bindings:
            {
                bean: '=',
                name: '<',
                reference: '<',
                fname: '<'
            }

});

function bfkey(serverService, $uibModal, metaService)
{
    var self = this;

    self.icon = function (iname) {
        return  metaService.getMeta()[iname].icon;
    };

    self.chooseOne = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'js/system/templates/selection.html',
            // templateUrl: 'js/' + self.reference + '/selection.html',
            controller: serverService.capitalizeWord(self.reference) + "SelectionController",
            size: 'lg'
        }).result.then(function (modalResult)
        {
            // Pendiente de desarrollo en el servidor de un servicio específico de lectura y mofificación de ajenas 

            self.bean["obj_" + self.reference].id = modalResult;
            var jsonToSend = {json: angular.toJson(serverService.array_identificarArray(self.bean))};
            serverService.promise_setOne(self.name, jsonToSend).then(function (response) {
                 $rootScope.$broadcast('reloadEvent');
               // location.reload();
            })
        });
    };

}