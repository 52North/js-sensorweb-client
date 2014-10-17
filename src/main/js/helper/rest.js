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
var Rest = {
    request: function(url, data, success, fail) {
        var promise = $.Deferred();
        if (Settings.additionalParameters) {
            if (!data) {
                data = {};
            }
            $.each(Settings.additionalParameters, function(key, value) {
                data[key] = value;
            });
        }
        $.ajax({
            url: url,
            data: data,
            type: "GET",
            dataType: "json",
            success: function(result) {
                success(promise, result);
            },
            error: function(error) {
                Rest.requestFailed(error);
                if (fail) {
                    fail(promise, error);
                }
            }
        });
        return promise;
    },
    requestFailed: function(error) {
        if (error.responseJSON && error.responseJSON.userMessage) {
            Inform.error(error.responseJSON.userMessage);
        }
    },
    tsData: function(id, apiUrl, timespan, internalId, extendedData) {
        var data = {
            timespan: timespan,
            generalize: Status.get('generalizeData'),
            expanded: true,
            format: 'flot'
        };
        if (extendedData) {
            data = $.extend(data, extendedData);
        }
        return this.request(apiUrl + "timeseries/" + id
                + "/getData", data, function(promise, result) {
                    var values = tsHelper.createDataOfResult(result, id);
                    var refValues = tsHelper.createRefDataOfResult(result, id);
                    promise.resolve(values, refValues);
                }, function(promise, error) {
            promise.reject(internalId);
        });
    },
    stations: function(id, apiUrl, data) {
        return Rest.request(apiUrl + "stations/"
                + this._createIdString(id), data, function(promise, result) {
            promise.resolve(result);
        });
    },
    features: function(id, apiUrl, data) {
        return Rest.request(apiUrl + "features/"
                + Rest._createIdString(id), data, function(promise, result) {
            promise.resolve(result);
        });
    },
    timeseries: function(id, apiUrl, data) {
        if ($.isEmptyObject(data)) {
            data = {};
        }
        data.expanded = true;
        data.rendering_hints = true;
        return Rest.request(apiUrl + "timeseries/"
                + this._createIdString(id), data, function(promise, result) {
            if ($.isArray(result)) {
                var timeseriesList = $.map(result, function(elem) {
                    return new TimeSeries(elem.id, elem, apiUrl);
                });
                promise.resolve(timeseriesList);
            } else {
                promise.resolve(new TimeSeries(result.id, result, apiUrl));
            }
        });
    },
    categories: function(id, apiUrl, data) {
        return Rest.request(apiUrl + "categories/"
                + Rest._createIdString(id), data, function(promise, result) {
            promise.resolve(result);
        });
    },
    phenomena: function(id, apiUrl, data) {
        return Rest.request(apiUrl + "phenomena/"
                + Rest._createIdString(id), data, function(promise, result) {
            promise.resolve(result);
        });
    },
    procedures: function(id, apiUrl, data) {
        return Rest.request(apiUrl + "procedures/"
                + Rest._createIdString(id), data, function(promise, result) {
            promise.resolve(result);
        });
    },
    services: function(apiUrl) {
        return Rest.request(apiUrl + "services", {
            expanded: true
        }, function(promise, result) {
            promise.resolve(result);
        });
    },
    search: function(apiUrl, params) {
        return Rest.request(apiUrl + "search", {
            q: params
        }, function(promise, result) {
            promise.resolve(result);
        });
    },
    abortRequest: function(promise) {
        if (promise && promise.state() === "pending") {
            promise.reject();
        }
    },
    _createIdString: function(id) {
        return (id === null ? "" : id);
    }
};