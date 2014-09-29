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
    servicesParam: 'services',
    featuresParam: 'features',
    offeringsParam: 'offerings',
    proceduresParam: 'procedures',
    phenomenaParam: 'phenomena',
    init: function() {
        this.checkTimespan();
        this.checkTimeseries();
        this.checkConstellation();
    },
    evaluateParameter: function(parameterName, evaluateParameter) {
        var value = this.getParameter(parameterName);
        if (!$.isEmptyObject(value)) {
            evaluateParameter(value);
        }
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
        var constellations = this.createConstellationParameterArray();
        if (constellations.length > 0) {
            Pages.navigateToChart();
            Status.clearTimeseries();
            var requestLength = 0;
            var foundTimeseriesId;
            var foundService;
            $.each(Settings.restApiUrls, function(url, serviceId) {
                $.each(constellations, function(idx, constellation) {
                    requestLength++;
                    Rest.search(url, constellation.join(',')).done($.proxy(function(result) {
                        if (result.length > 0) {
                            var timeseries = $.grep(result, function(n, i) {
                                return n.type === "timeseries" ? true : false;
                            });
                            if (!$.isEmptyObject(timeseries[0])) {
                                foundTimeseriesId = timeseries[0].id;
                                foundService = url;
                                TimeSeriesController.addTSbyId(foundTimeseriesId, foundService);
                            }
                        }
                        requestLength--;
                        if (requestLength === 0) {
                            if ($.isEmptyObject(foundTimeseriesId)) {
                                window.alert(_('permalink.noMatchingTimeseriesFound'));
                            }
                        }
                    }, this));
                });
            });
        }
    },
    createConstellationParameterArray: function() {
        var constellations = [];
        var services = this.getParameterArray(this.servicesParam);
        var features = this.getParameterArray(this.featuresParam);
        var offerings = this.getParameterArray(this.offeringsParam);
        var procedures = this.getParameterArray(this.proceduresParam);
        var phenomena = this.getParameterArray(this.phenomenaParam);
        if (services && features && offerings && procedures && phenomena) {
            if ((services.length == features.length) &&
                    (services.length == offerings.length) &&
                    (services.length == procedures.length) &&
                    (services.length == phenomena.length)) {
                for (i = 0; i < services.length; i++) {
                    var constellation = [];
                    constellation.push(services[i]);
                    constellation.push(features[i]);
                    constellation.push(offerings[i]);
                    constellation.push(procedures[i]);
                    constellation.push(phenomena[i]);
                    constellations.push(constellation);
                }
            } else {
                window.alert(_('permalink.wrongCombinationSize'));
            }
        }
        return constellations;
    },
    getParameterArray: function(param) {
        var array = this.getParameter(param)
        if (!$.isEmptyObject(array)) {
            return array.split(',');
        }
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
        url = url + "&" + this.createTimeseriesParam();
        return url;
    }
};