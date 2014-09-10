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
var tsHelper = {
    createInternalId: function(tsId, apiUrl) {
        return tsId + "__" + Settings.restApiUrls[apiUrl];
    },
    createDataOfResult: function(result, tsId) {
        // kvp format of the timeseries-api
        if (result[tsId] && result[tsId].values) {
            return this._createValues(result[tsId].values);
        }
        // highchart format of the timeseries-api
        var values = [];
        if (result instanceof Array) {
            var that = this;
            $.each(result, function(idx, elem) {
                if (elem.name == tsId) {
                    values = that._createValues(elem.data);
                }
            });
        }
        return values;
    },
    createRefDataOfResult: function(result, id) {
        var refs = {};
        var that = this;
        // kvp format of the timeseries-api
        if (result[id] && result[id].extra && result[id].extra.referenceValues) {
            $.each(result[id].extra.referenceValues, function(id, elem) {
                refs[id] = that._createValues(elem.values);
            });
        }
        // flot format of the timeseries-api
        if (result[id] && result[id].referenceValues) {
            $.each(result[id].referenceValues, function(id, values) {
                refs[id] = that._createValues(values);
            });
        }
        // highchart format of the timeseries-api
        if (result instanceof Array){
            $.each(result, function(idx, elem) {
                if (elem.name.indexOf('ref_') == 0) {
                    refs[elem.name] = that._createValues(elem.data);
                }
            });
        }
        return refs;
    },
    _createValues: function(array) {
        var values = [];
        if (array[0] instanceof Array) {
            return array;
        } else {
            $.each(array, function(index, elem) {
                values.push([elem.timestamp, elem.value]);
            });
        }
        return values;
    }
};