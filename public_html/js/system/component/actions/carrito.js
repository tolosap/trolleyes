moduloDirectivas.component('carrito', {
    templateUrl: "js/system/component/actions/carrito.html",
    controllerAs: 'act',
    controller: carrito,
    bindings:
            {
                id: '<',
                name: '<',
                producto: '<'
            }
});
function carrito(constantService, sessionService) {
    var self = this;
    self.appurl = constantService.getCAppUrl();
    self.session_info = sessionService.getSessionInfo();
    self.isSessionActive = sessionService.isSessionActive();
}