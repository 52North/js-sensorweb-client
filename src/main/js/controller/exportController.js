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
        var version = this.msieversion();
        if (!version || version > 9) {
            EventManager.subscribe('timeseries:add', $.proxy(this.loadTimeseries, this));
        }
    },
    loadTimeseries: function(event, ts) {
        tsId = ts.getInternalId();
        var button = $('<div class="additionalLegendEntry"><span class="glyphicon glyphicon-download"></span><span> ' + _('export.label') + '</span></div>');
        $('.legendItem[data-id="' + tsId + '"]').find('.collapseLegendEntry').append(button);
        button.on('click', $.proxy(function() {
            this.createCSVforTS(ts);
        }, this));
    },
    createCSVforTS: function(ts) {
        // create header
        var csvContent = 'Sensor Station;Sensor Phenomenon;Date;Value\n';
        // create value body
        $.each(ts.getValues(), function(idx, valueTuple) {
            // add station
            csvContent += ts.getStationLabel() + ';';
            // add phenomenon
            csvContent += ts.getPhenomenonLabel() + ' (' + ts.getUom() + ');';
            // add timestamp
            csvContent += moment(valueTuple[0]).format() + ';';
            // add value
            csvContent += valueTuple[1];
            csvContent += '\n';
        });
        this.triggerDownload(csvContent, ts.getLabel());
    },
    triggerDownload: function(content, suggestedFilename) {
        var filename = suggestedFilename;
        if (!filename) {
            filename = 'export.csv';
        }
        if (filename.indexOf('.csv') == -1) {
            filename += '.csv';
        }
        if (navigator.msSaveBlob) {
            // IE 10 or greater...
            var blob = new Blob([content], {
                type: 'text/csv;charset=utf-8;'
            });
            navigator.msSaveBlob(blob, filename);
        } else {
            // FF, Chrome ...
            var a = document.createElement('a');
            a.href = 'data:attachment/csv,' + encodeURI(content);
            a.target = '_blank';
            a.download = filename;
            document.body.appendChild(a);
            a.click();
        }
    },
    msieversion: function() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");
        if (msie > 0)      // If Internet Explorer, return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)));
    }
};