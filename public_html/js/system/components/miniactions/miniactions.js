moduloDirectivas.component('miniactions', {
    templateUrl: "js/system/components/miniactions/miniactions.html",
    controllerAs: 'act',
    controller: miniactions,
    bindings:
            {
                id: '<',
                name: '<'
            }

});
function miniactions(constantService)
{
    var self = this;
    self.appurl = constantService.getCAppUrl();
}