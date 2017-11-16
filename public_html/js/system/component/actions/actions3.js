moduloDirectivas.component('actions3', {
    templateUrl: "js/system/component/actions/actions3.html",
    controllerAs: 'act',
    controller: actions3,
    bindings:
            {
                id: '<',
                name: '<'
            }
});
function actions3(constantService, sessionService) {
    var self = this;
    //self.idforeign.id = obj.obj_usuario.id;
    self.appurl = constantService.getCAppUrl();
    self.session_info = sessionService.getSessionInfo();
    self.isSessionActive = sessionService.isSessionActive();
}