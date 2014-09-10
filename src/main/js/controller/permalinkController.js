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
var PermalinkController = {
    timespanParam: 'timespan',
    timeseriesParam: 'timeseries',
    serviceParam: 'service',
    featureParam: 'feature',
    offeringParam: 'offering',
    procedureParam: 'procedure',
    phenomenonParam: 'phenomenon',
    init: function() {
        this.checkTimespan();
        this.checkTimeseries();
        this.checkConstellation();
    },
    evaluateParameter: function(parameterName, evaluate) {
        var value = this.getParameter(parameterName);
        if (!$.isEmptyObject(value) && evaluate) {
            evaluate(value);
        } else return value;
    },
    getParameter: function(parameterName) {
        var value = Permalink.getUrlParameter(parameterName);
        return value;
    },
    checkTimespan: function() {
        this.evaluateParameter(this.timespanParam, function(timespan) {
            Status.set('timespan', Time.createTimespan(timespan));
        });
    },
    checkTimeseries: function() {
        this.evaluateParameter(this.timeseriesParam, function(timeseries) {
            Status.clearTimeseries();
            $.each(timeseries.split(','), function(idx, id) {
                Status.addTimeseriesById(id);
            });
        });
    },
    checkConstellation: function() {
        var params = this.createConstellationParameterArray();
        if (params.length > 0) {
            Pages.navigateToChart();
            Status.clearTimeseries();
            var requestLength = 0;
            var foundTimeseriesId;
            var foundService;
            $.each(Settings.restApiUrls, function(url, serviceId) {
                requestLength++;
                Rest.search(url, params.join(',')).done($.proxy(function(result) {
                    if (result.length > 0) {
                        var timeseries = $.grep(result, function(n, i) {
                            return n.type === "timeseries" ? true : false;
                        });
                        if (!$.isEmptyObject(timeseries[0])) {
                            foundTimeseriesId = timeseries[0].id;
                            foundService = url;
                        }
                    }
                    requestLength--;
                    if (requestLength === 0) {
                        if (!$.isEmptyObject(foundTimeseriesId)) {
                            TimeSeriesController.addTSbyId(foundTimeseriesId, foundService);
                        } else {
                            window.alert(_('permalink.noMatchingTimeseriesFound'));
                        }
                    }
                }, this));
            });
        }
    },
    createConstellationParameterArray: function() {
        var params = [];
        var service = this.getParameter(this.serviceParam);
        if (!$.isEmptyObject(service)) {
            params.push(service);
        }
        var feature = this.getParameter(this.featureParam);
        if (!$.isEmptyObject(feature)) {
            params.push(feature);
        }
        var offering = this.getParameter(this.offeringParam);
        if (!$.isEmptyObject(offering)) {
            params.push(offering);
        }
        var procedure = this.getParameter(this.procedureParam);
        if (!$.isEmptyObject(procedure)) {
            params.push(procedure);
        }
        var phenomenon = this.getParameter(this.phenomenonParam);
        if (!$.isEmptyObject(phenomenon)) {
            params.push(phenomenon);
        }
        return params;
    },
    createTimespanParam: function() {
        var timespan = TimeController.currentTimespan;
        return this.timespanParam + "=" + Time.getRequestTimespan(timespan.from, timespan.till);
    },
    createTimeseriesParam: function() {
        var tsList = $.map(TimeSeriesController.getTimeseriesCollection(), function(ts, id) {
            return id;
        });
        if (tsList.length > 0) {
            var timeseries = tsList.join(",");
            return this.timeseriesParam + "=" + timeseries;
        }
        return "";
    },
    createPermalink: function() {
        var loc = window.location;
        if (!loc.origin) {
            loc.origin = loc.protocol + "//" + loc.hostname
                    + (loc.port ? ':' + loc.port : '');
        }
        var url = loc.origin + loc.pathname + "?";
        url = url + this.createTimespanParam();
        var timeseries = this.createTimeseriesParam();
        if (timeseries) {
            url = url + "&" + timeseries;
        }
        return url;
    }
};