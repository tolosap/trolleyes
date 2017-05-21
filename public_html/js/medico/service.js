'use strict';
moduloMedico.factory('medicoService', ['serverService', function (serverService) {
        return {
            getFields: function () {
                return [
                    {name: "id", shortname: "ID", longname: "Identificador", visible: true, type: "id"},
                    {name: "obj_servicio", shortname: "Servicio", longname: "Servicio", visible: true, type: "foreign", reference: "servicio", descforeign: "descripcion"},
                    {name: "obj_especialidad", shortname: "Especialidad", longname: "Especialidad", visible: true, type: "foreign", reference: "especialidad", descforeign: "descripcion"}
                ];
            },
            getIcon: function () {
                return "fa-user-md";
            },
            getObTitle: function () {
                return "médico";
            },
            getTitle: function () {
                return "medico";
            }
        };
    }]);


