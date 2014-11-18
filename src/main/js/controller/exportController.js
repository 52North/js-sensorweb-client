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
var ExportController = {
    init: function() {
        EventManager.subscribe('timeseries:add', $.proxy(this.loadTimeseries, this));
    },
    loadTimeseries: function(event, ts) {
        tsId = ts.getInternalId();
        var button = $('<div class="additionalLegendEntry"><span class="glyphicon glyphicon-download"></span><span> ' + _('export.label') + '</span></div>');
        $('.legendItem[data-id="' + tsId + '"]').find('.collapseLegendEntry').append(button);
        button.on('click', $.proxy(function() {
            window.open(this.createCsvDownloadLink(ts));
        }, this));
    },
    createCsvDownloadLink: function(ts) {
        var from = TimeController.currentTimespan.from;
        var till = TimeController.currentTimespan.till;
        var timespan = moment(from).format() + "/" + moment(till).format();

        var kvp = "?generalize=" + Settings.generalizeData;
        kvp = kvp + "&timespan=" + encodeURIComponent(timespan);
        kvp = kvp + "&locale=" + currentLanguage();
        kvp = kvp + "&bom=true";

        var tsId = ts.getTsId();
        var apiUrl = ts.getApiUrl();
        return apiUrl + "/timeseries/" + tsId + "/getData.csv" + kvp;
    }
};