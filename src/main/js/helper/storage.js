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
var Storage = {
    generateKey: function(postfix) {
        var loc = window.location;
        if (!loc.origin) {
            loc.origin = loc.protocol + "//" + loc.hostname
                    + (loc.port ? ':' + loc.port : '');
        }
        return loc.origin + loc.pathname + postfix;
    },
    saveObject: function(key, object) {
        if (Settings.saveStatusPossible) {
            try {
                $.totalStorage(key, object);
            } catch (e) {
                Settings.saveStatusPossible = false;
                // safari mobile in private mode???
                // http://davidwalsh.name/quota_exceeded_err
                // alert("No Status saving possible.");
            }
        }
    },
    load: function(key) {
        return $.totalStorage(key);
    }
};