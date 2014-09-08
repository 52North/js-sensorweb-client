/*
 * Copyright (C) 2014-2014 52°North Initiative for Geospatial Open Source
 * Software GmbH
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 as published
 * by the Free Software Foundation.
 *
 * If the program is linked with libraries which are licensed under one of
 * the following licenses, the combination of the program with the linked
 * library is not considered a "derivative work" of the program:
 *
 *     - Apache License, version 2.0
 *     - Apache Software License, version 1.0
 *     - GNU Lesser General Public License, version 3
 *     - Mozilla Public License, versions 1.0, 1.1 and 2.0
 *     - Common Development and Distribution License (CDDL), version 1.0
 *
 * Therefore the distribution of the program linked with libraries licensed
 * under the aforementioned licenses, is permitted by the copyright holders
 * if the distribution is compliant with both the GNU General Public
 * License version 2 and the aforementioned licenses.
 *
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General
 * Public License for more details.
 */
var i18n = {};

function _(key) {
    var lang = Permalink.getUrlParameter('lang') || navigator.language || navigator.userLanguage;
    var text = readI18n(lang, key) || readI18n("en", key);
    if ($.isEmptyObject(text)) {
        return key;
    } else {
        return text;
    }
}

function readI18n(lang, key) {
    try {
        var keyArray = key.split('.');
        var value = i18n[lang];
        while (keyArray.length != 0) {
            var property = keyArray.splice(0, 1);
            value = read_prop(value, property[0]);
        }
        if ($.isEmptyObject(value)) {
            console.error("Don't find the i18n key '" + key + "' for language " + lang);
        }
        return value;
    } catch (ex) {
        console.error("Don't find the i18n key '" + key + "' for language " + lang);
    }
}

function read_prop(obj, prop) {
    return obj[prop];
}