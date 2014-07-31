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
var oldOpenStationWindow = $.proxy(Map.openStationWindow, Map);
Map.openStationWindow = $.proxy(function(id, url) {
    if (Status.get('provider').serviceID == "srv_cbe54f275d9d993b376783216ff9f431") {
        Rest.stations(id, url).done($.proxy(function(results) {
            var phenomena = {};
            var ensembleGroups = {};
            $.each(results.properties.timeseries, function(id, elem) {
                if (Map.selectedPhenomenon == null || Map.selectedPhenomenon == elem.phenomenon.id) {
                    if (!phenomena.hasOwnProperty(elem.phenomenon.id)) {
                        phenomena[elem.phenomenon.id] = {};
                        phenomena[elem.phenomenon.id].timeseries = [];
                        phenomena[elem.phenomenon.id].label = elem.phenomenon.label;
                    }
                }
                var procLabel = elem.procedure.label;
                var ensemble = procLabel.substring(0, procLabel.indexOf('-'));
                if (!ensembleGroups.hasOwnProperty(ensemble)) {
                    ensembleGroups[ensemble] = [];
                }
                ensembleGroups[ensemble].push({
                    'id': id,
                    'internalId': tsHelper.createInternalId(id, url)
                });
            });
            // load result time options
            $.each(ensembleGroups, function(id, array) {
                Rest.resulttime(array[0].id, url).done($.proxy(function(result) {
                    $('[data-ensemble="' + id + '"] .resultTimeSelection').empty();
                    var select = $('<select class="form-control"></div>');
                    $.each(result, function(id, elem) {
                        select.append('<option data-time="' + elem + '">' + moment(elem).format(Settings.dateformat) + '</option>');
                    });
                    $('[data-ensemble="' + id + '"] .resultTimeSelection').append(select);
                }, this));
            });
            this.loading(false);
            Modal.show("station-ecmwf", {
                "name": results.properties.label,
                "ensemble": $.map(ensembleGroups, function(timeseries, label) {
                    return {
                        "label": label,
                        "count": timeseries.length
                    };
                })
            });
            $('#confirmTimeseriesSelection').on('click', function() {
                // show loading info
                if ($('.tsItem').has('.checkbox :checked').length > 0) {
                    $('.ecmwf-station-loading').show();
                    $.each($('.tsItem').has('.checkbox :checked'), function(id, elem) {
                        debugger;
                        var resultTime = $(elem).find('.form-control :selected').data('time');
                        // TODO check the selected result time
                        $.each(ensembleGroups[$(this).data('ensemble')], $.proxy(function(idx, elem) {
                            if (Map.timeseriesCache[elem.internalId] == null) {
                                Rest.timeseries(elem.id, url).done(function(timeseries) {
                                    timeseries.setResultTime(resultTime);
                                    Map.timeseriesCache[timeseries.getInternalId()] = timeseries;
                                    Map.addTimeseries(timeseries);
                                });
                            } else {
                                Map.addTimeseries(Map.timeseriesCache[elem.internalId]);
                            }
                        }, this));
                    });
                } else {
                    Modal.hide();
                }
            });
            EventManager.publish("map:stationLoaded");
        }, this));
    } else {
        oldOpenStationWindow(id, url);
    }
}, Map);

Rest.resulttime = function(id, apiUrl, data) {
    return Rest.request(apiUrl + "timeseries/"
            + (id == null ? "" : id), data, function(promise, result) {
        // TODO update with real request
        promise.resolve([1399413600000, 1399435200000, 1399456800000, 1399478400000]);
    });
};

var oldTimeSeries = TimeSeries;

TimeSeries = function() {
    console.log('Before');
    var result = oldTimeSeries.apply(this, arguments);

    var resultTime;
    this.setResultTime = function(rt) {
        resultTime = rt;
    };

    this.fetchData = function(timespan, complete) {
        this.promise = Rest.tsData(this.getTsId(), this.getApiUrl(), timespan, this.getInternalId(), {'resultTime': resultTime});
        this.promise.done($.proxy(this.fetchedDataFinished, {context: this, complete: complete}));
        return this.promise;
    };

    return result;
};
