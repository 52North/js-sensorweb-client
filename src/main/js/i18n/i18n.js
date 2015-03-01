/*
 * Copyright (C) 2014-2014 52°North Initiative for Geospatial Open Source
 * Software GmbH
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var i18n = {};
var languageChooser;
function _(key) {
    var lang = currentLanguage();
    var text = readI18n(lang, key) || readI18n("en", key);
    if ($.isEmptyObject(text)) {
        return key;
    } else {
        return text;
    }
}

function currentLanguage() {
    var lang = Permalink.getUrlParameter('lang') || Permalink.getUrlParameter('locale') || navigator.language || navigator.userLanguage;
    if(lang.indexOf('-') > -1) {
        lang.substring(0, lang.indexOf('-'));
    }
    return lang;
}

function languagesAvailable() {
    return Object.keys(i18n);
}

function createLanguageChooser() {
    var options = $(".language-chooser-box ul");
    createFlagImage = function(code) {
        return $("<img />", {
            src: "../images/blank.gif",
            name: readI18n(code, 'fullName')
        })
                .addClass("flag flag-" + code)
                .addClass("pull-right");
    };
    //$(".language-chooser-box button").append(createFlagImage(currentLanguage()));
    $.each(languagesAvailable(), function(idx, code) {
        if (code.indexOf('_') === -1 && currentLanguage().indexOf(code) !== 0) {
            var item = $("<li />", {
                role: "menuitem"
            })
                    .append(readI18n(code, 'fullName'))
                    .append(createFlagImage(code))
                    .on("click", function() {
                        var ok = window.confirm(_("settings.requiresRestart"));
                        if (ok) {
                            Settings.additionalParameters.locale = code;
                            window.location = PermalinkController.createPermalink() + "&locale=" + code;
                        }
                    });

            options.append(item);
        }
    });
}

function readI18n(lang, key) {
    try {
        var keyArray = key.split('.');
        var value = i18n[lang];
        if (!value) {
            var langParts = lang.split('-');
            // convert lang to 'en_US' as 'en-US' not allowed
            var value = i18n[langParts[0] + "_" + langParts[1]];
            if (!value && langParts.length > 1) {
// no subregion, try e.g. en-US => en
                value = i18n[langParts[0]];
            }
        }
        while (keyArray.length) {
            var property = keyArray.splice(0, 1);
            value = read_prop(value, property[0]);
        }
        if ($.isEmptyObject(value)) {
            console.error("Missing i18n key '" + key + "' for language " + lang);
        }
        return value;
    } catch (ex) {
        console.error("Don't find the i18n key '" + key + "' for language " + lang);
    }
}

function read_prop(obj, prop) {
    return obj[prop];
}