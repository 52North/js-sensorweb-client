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
var Status = (function() {
    var generateKey = function() {
        var loc = window.location;
        if (!loc.origin) {
            loc.origin = loc.protocol + "//" + loc.hostname
                    + (loc.port ? ':' + loc.port : '');
        }
        return loc.origin + loc.pathname + "settings";
    };
    var status = {
        key: generateKey(),
        defaultValues: {
            'provider': Settings.defaultProvider,
            'clusterStations': Settings.clusterStations,
            'generalizeData': Settings.generalizeData,
            'timeseries': {},
            'timespan': Time.isoTimespan('today'),
            'saveStatus': Settings.saveStatus,
            'concentrationMarker': Settings.concentrationMarker
        },
        init: function() {
            this.load();
            if (!this.get('saveStatus')) {
                this.reset();
            }
        },
        isSet: function() {
            if ($.totalStorage(this.key)) {
                return true;
            } else {
                return false;
            }
        },
        load: function() {
            if (this.isSet()) {
                this.current = $.totalStorage(this.key);
            } else {
                this.current = this.defaultValues;
                this.save();
            }
        },
        save: function() {
            if (Settings.saveStatusPossible) {
                try {
                    $.totalStorage(this.key, this.current);
                } catch (e) {
                    Settings.saveStatusPossible = false;
                    // safari mobile in private mode???
                    // http://davidwalsh.name/quota_exceeded_err
//					alert("No Status saving possible.");
                }
            }
        },
        reset: function() {
            this.current = this.defaultValues;
            this.save();
            EventManager.publish("resetStatus");
        },
        set: function(key, value) {
            this.current[key] = value;
            this.save();
        },
        get: function(key) {
            if (!this.current[key]) {
                return this.defaultValues[key];
            }
            return this.current[key];
        },
        addTimeseries: function(ts) {
            this.current.timeseries[ts.getInternalId()] = ts.persist();
            this.save();
        },
        addTimeseriesById: function(id) {
            var ids = id.split("__");
            var apiUrl = null;
            $.each(Settings.restApiUrls, function(url, id) {
                if (id == ids[1]) {
                    apiUrl = url;
                    return;
                }
            });
            if (apiUrl) {
                this.current.timeseries[id] = {
                    apiUrl: apiUrl,
                    tsId: ids[0]
                };
                this.save();
            }
        },
        clearTimeseries: function() {
            this.current.timeseries = {};
            this.save();
        },
        removeTimeseries: function(ts) {
            delete this.current.timeseries[ts.getInternalId()];
            this.save();
        },
        hasTimeseriesWithId: function(id) {
            return !!this.current.timeseries[id];
        },
        getTimeseriesWithId: function(id) {
            return this.current.timeseries[id];
        },
        getTimeseries: function() {
            return this.current.timeseries;
        },
        hasTimeseries: function() {
            return $.isEmptyObject(this.current.timeseries) ? false : true;
        }
    };

    status.init();
    return status;
})();