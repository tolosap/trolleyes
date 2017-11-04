moduloDirectivas.component('menu', {
    templateUrl: "js/system/component/menu/menu.html",
    controllerAs: 'mn',
    controller: menuCtrl
});

function menuCtrl(sessionService) {
    var self = this;
    self.session_info = sessionService.getSessionInfo();
    self.isSessionActive = sessionService.isSessionActive();
}
