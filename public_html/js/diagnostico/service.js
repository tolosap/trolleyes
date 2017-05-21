'use strict';
moduloDiagnostico.factory('diagnosticoService', ['serverService', function (serverService) {
        return {
            getFields: function () {
                return [
                    {name: "id", shortname: "ID", longname: "Identificador", visible: true, type: "id"},
                    {name: "fecha", shortname: "fecha", longname: "Fecha", visible: true, type: "date", required: true, maxlength: 255, pattern: ""},
                    {name: "obj_episodio", shortname: "Episodio", longname: "Episodio", visible: true, type: "foreign", reference: "episodio",descforeign: "fecha"},
                    {name: "obj_tipodiagnostico", shortname: "tipo diagnostico", longname: "Tipo de diagnostico", visible: true, type: "foreign", reference: "tipodiagnostico",descforeign: "descripcion"}

                ];
            },
            getIcon: function () {
                return "fa-list-alt";
            },
            getObTitle: function () {
                return "diagnostico";
            },
            getTitle: function () {
                return "diagnostico";
            }
        };
    }]);


