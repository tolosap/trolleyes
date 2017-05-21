'use strict';
moduloCargo.factory('cargoService', ['serverService', function (serverService) {
        return {
            getFields: function () {
                return [
                    {name: "id", shortname: "ID", longname: "Identificador", visible: true, type: "id"},
                    {name: "date", shortname: "fecha", longname: "Fecha", visible: true, type: "date", required: true, maxlength: 255, pattern: ""},
                    {name: "obj_documento", shortname: "Documento", longname: "Documento", visible: true, type: "foreign", required: true, maxlength: 255, pattern: "", reference: "documento", descforeign: "descripcion"}
                ];
            },
            getIcon: function () {
                return "fa fa-fw fa-credit-card";
            },
            getObTitle: function () {
                return "cargo";
            },
            getTitle: function () {
                return "cargo";
            }
        };
    }]);


