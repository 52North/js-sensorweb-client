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
function TimeSeries(tsId, meta, apiUrl) {

    var internalId = tsHelper.createInternalId(tsId, apiUrl);
    var values = [];
    var refValues = {};
    var synced = false;
    var zeroScaled = Settings.defaultZeroScale;
    var groupedAxis = Settings.defaultGroupedAxis;
    var timeBuffer = Settings.timeseriesDataBuffer || moment.duration(2, 'h');
    $.each(meta.referenceValues, $.proxy(function(index, elem) {
        refValues[elem.referenceValueId] = new ReferenceValue(elem.referenceValueId, elem.label);
    }, this));
    var style = {};
    if (meta.hasOwnProperty('renderingHints')) {
        var chartType = meta.renderingHints.chartType;
        var width = meta.renderingHints.properties.width;
        var color = meta.renderingHints.properties.color;
        var interval = meta.renderingHints.properties.interval;
        var lineType = meta.renderingHints.properties.type;
        style = new TimeseriesStyle(chartType, width, color, interval, lineType);
    } else {
        style = TimeseriesStyle.createDefault(tsId);
    }

    this.getTsId = function() {
        return tsId;
    };

    this.getInternalId = function() {
        return internalId;
    };

    this.getApiUrl = function() {
        return apiUrl;
    };

    this.getStyle = function() {
        return style;
    };

    this.isZeroScaled = function() {
        return zeroScaled;
    };

    this.setZeroScaled = function(bool) {
        zeroScaled = bool;
    };
    
    this.isGroupedAxis = function(){
        return groupedAxis;
    };
    
    this.setGroupedAxis = function(bool) {
        groupedAxis = bool;
    };

    this.isSynced = function() {
        return synced;
    };

    this.getUom = function() {
        return meta.uom;
    };

    this.getLabel = function() {
        return meta.label;
    };

    this.unSynced = function() {
        synced = false;
    };

    this.getValues = function() {
        return values;
    };

    this.getLastValue = function() {
        if (meta && meta.lastValue) {
            return meta.lastValue;
        }
        return null;
    };

    this.isCurrent = function() {
        return this.getLastValue() != null && moment().subtract(Settings.ignoreAfterDuration).isBefore(moment(this.getLastValue().timestamp));
    };

    this.getLastValueFormatted = function() {
        if (meta && meta.lastValue) {
            return meta.lastValue.value + " " + meta.uom + " (" + moment(meta.lastValue.timestamp).format(Settings.dateformat) + ")";
        }
        return null;
    };

    this.getFirstValue = function() {
        if (meta && meta.firstValue) {
            return meta.firstValue;
        }
        return null;
    };

    this.getFirstValueFormatted = function() {
        if (meta && meta.firstValue) {
            return meta.firstValue.value + " " + meta.uom + " (" + moment(meta.firstValue.timestamp).format(Settings.dateformat) + ")";
        }
        return null;
    };

    this.getCoordinates = function() {
        return meta.station.geometry.coordinates;
    };

    this.getStationId = function() {
        return meta.station.properties.id;
    };

    this.getStationLabel = function() {
        return meta.station.properties.label;
    };

    this.getServiceLabel = function() {
        return meta.parameters.service.label;
    };

    this.getPhenomenonLabel = function() {
        return meta.parameters.phenomenon.label;
    };

    this.getProcedureLabel = function() {
        return meta.parameters.procedure.label;
    };

    this.getCategoryLabel = function() {
        if (meta.parameters.category && (meta.parameters.phenomenon.label != meta.parameters.category.label)) {
            return meta.parameters.category.label;
        }
        return "";
    };

    this.getStatusIntervals = function() {
        return meta.statusIntervals;
    };

    this.hasData = function() {
        return values.length != 0;
    };

    this.getRefValuesForId = function(id) {
        if (refValues.hasOwnProperty(id)) {
            return refValues[id];
        }
        return [];
    };

    this.getRefValues = function(id) {
        return refValues;
    };

    this.persist = function() {
        return {
            style: style.persist(),
            apiUrl: apiUrl,
            tsId: tsId
        };
    };

    this.fetchData = function(timespan, complete) {
        var from = moment(timespan.from).subtract(timeBuffer);
        var till = moment(timespan.till).add(timeBuffer);
        timespan = Time.getRequestTimespan(from, till);
        this.promise = Rest.tsData(tsId, apiUrl, timespan, internalId);
        this.promise.done($.proxy(this.fetchedDataFinished, {context: this, complete: complete}));
        return this.promise;
    };

    this.fetchedDataFinished = function(data, refdata) {
        this.context.createTimeBuffer(data);
        values = data;
        $.each(refdata, function(id, elem) {
            if (refValues[id]) {
                refValues[id].setValues(elem);
            }
        });
        synced = true;
        this.complete(this.context);
    };

    this.createTimeBuffer = function(data) {
        if (data.length >= 2) {
            timeBuffer = moment.duration(data[1][0] - data[0][0]);
        }
    };

    this.destroy = function() {
        this.promise.reject(internalId);
    };
}
;