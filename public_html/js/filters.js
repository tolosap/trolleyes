/*
 * Copyright (c) 2015 by Rafael Angel Aznar Aparici (rafaaznar at gmail dot com)
 * 
 * sisane: The stunning micro-library that helps you to develop easily 
 *             AJAX web applications by using Angular.js 1.x & sisane-server
 * sisane is distributed under the MIT License (MIT)
 * Sources at https://github.com/rafaelaznar/sisane
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

moduloFiltros
        .filter('interpolate', ['version', function (version) {
                return function (text) {
                    return String(text).replace(/\%VERSION\%/mg, version);
                }
            }])
        .filter('showForeign', function ($filter)
        {
            return function (input)
            {
                if (input == null) {
                    return "";
                }
                return input[0] + ':' + input[1];
            };
        })
        .filter('getForeignDescription', function ($filter) {
            return function (foreignObject)
            {
                var arrayLength = foreignObject.metaprops.length;
                var description = "";
                for (var i = 0; i < arrayLength; i++) {
                    if (foreignObject.metaprops[i].foreigndescription) {
                        description += foreignObject.data[foreignObject.metaprops[i].name];
                    }
                }
                return description;
            };
        })

        .filter('clipString', function ($filter)
        {
            return function (input)
            {
                if (input == null) {
                    return "";
                }

                if (input.length > 40) {
                    return input.substr(0, 30).trim() + " ...";

                } else {
                    return input;
                }

            };
        })
        .filter('clipString2', function ($filter)
        {
            return function (input)
            {
                if (input == null) {
                    return "";
                }

                if (input.length > 50) {
                    return input.substr(0, 25).trim() + " ...";

                } else {
                    return input;
                }

            };
        })


        .filter('booleanizate', function ($filter)
        {
            return function (input)
            {
                if (input == null) {
                    return "";
                }

                if (input == true) {
                    return '<i class="fa fa-check"></i>';
                } else {
                    return '<i class="fa fa-times"></i>';
                }

            };
        })
        .filter('breakFilter', function () {
            return function (text) {
                if (typeof text == 'string')
                    return text.replace(/\n/g, '<br />');
            };
        })

        .filter('fechaformateada', function ($filter)
        {
            return function (input) {
                if (input == null || input == "" || input.length != 10)
                {
                    return "";
                }
                var arr = input.split("/"); // formato dd/mm/aaaa
                var mm = parseInt(arr[1]);
                mm -= 1;
                var newDate = new Date(arr[2], mm, arr[0]);
                var formatedDate = $filter('date')(newDate, 'EEEE, dd \'de\' MMMM \'de\' yyyy');
                return formatedDate;
            };
        });
;

//angular.module('Filters').filter('uppercaseo', function ($filter)
//{
//    return function (input)
//    {
//        if (input == null) {
//            return "";
//        }
//
//
//
//        return input.toUpperCase();
//
//    };
//});

//angular.module('myApp.filters', []).
//        filter('uppercaseo', ['version', function (version) {
//                return function (input)
//                {
//                    if (input == null) {
//                        return "";
//                    }
//                    return input.toUpperCase();
//                };
//            }]);
