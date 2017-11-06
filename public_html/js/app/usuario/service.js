'use strict';
moduloUsuario.factory('usuarioService', ['regexService', function (regexService) {
        return {
            getFields: function () {
                return [
                    {name: "id", shortname: "ID", longname: "Identificador", visible: true, type: "id"},
                    {name: "dni", shortname: "DNI", longname: "DNI", visible: true, type: "text"},
                    {name: "nombre", shortname: "Nombre", longname: "Nombre", visible: true, type: "text", required: true, maxlength: 255, pattern: regexService.getRegExpr("nombre"), help: regexService.getRegExpl("nombre")},
                    {name: "primerapellido", shortname: "Apellido 1", longname: "Primer Apellido", visible: true, type: "text", required: true, maxlength: 255, pattern: regexService.getRegExpr("nombre"), help: regexService.getRegExpl("nombre")},
                    {name: "segundoapellido", shortname: "Apellido 2", longname: "Segundo Apellido", visible: true, type: "text", required: true, maxlength: 255, pattern: regexService.getRegExpr("nombre"), help: regexService.getRegExpl("nombre")},
                    {name: "login", shortname: "Login", longname: "Login", visible: true, type: "text", required: true, maxlength: 255, pattern: ""},
                    {name: "email", shortname: "Email", longname: "Email", visible: false, type: "text", required: true, maxlength: 255, pattern: regexService.getRegExpr("email"), help: regexService.getRegExpl("email")},
                    {name: "obj_tipousuario", shortname: "Perfil", longname: "Tipo de usuario", visible: true, type: "foreign", reference: "tipousuario", descforeign: "descripcion"}                    
                ];
            },
            getIcon: function () {
                return "fa-user";
            },
            getName: function () {
                return "usuario";
            },
            getTitle: function () {
                return "Usuario";
            }
        };
    }]);


