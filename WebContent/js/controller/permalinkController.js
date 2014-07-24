/*
 * Copyright (C) 2014-2014 52°North Initiative for Geospatial Open Source
 * Software GmbH
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 as published
 * by the Free Software Foundation.
 *
 * If the program is linked with libraries which are licensed under one of
 * the following licenses, the combination of the program with the linked
 * library is not considered a "derivative work" of the program:
 *
 *     - Apache License, version 2.0
 *     - Apache Software License, version 1.0
 *     - GNU Lesser General Public License, version 3
 *     - Mozilla Public License, versions 1.0, 1.1 and 2.0
 *     - Common Development and Distribution License (CDDL), version 1.0
 *
 * Therefore the distribution of the program linked with libraries licensed
 * under the aforementioned licenses, is permitted by the copyright holders
 * if the distribution is compliant with both the GNU General Public
 * License version 2 and the aforementioned licenses.
 *
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General
 * Public License for more details.
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
                    };
                    requestLength--;
                    if (requestLength === 0) {
                        if (!$.isEmptyObject(foundTimeseriesId)) {
                            TimeSeriesController.addTSbyId(foundTimeseriesId, foundService);
                        } else {
                            window.alert("No matching timeseries is found.");
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
        url = url + "&" + this.createTimeseriesParam();
        return url;
    }
};