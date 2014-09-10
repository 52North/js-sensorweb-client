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
// list of services where the ensemble mechanism should work
var serviceIDs = ["srv_cbe54f275d9d993b376783216ff9f431"];

var oldOpenStationWindow = $.proxy(Map.openStationWindow, Map);
Map.openStationWindow = $.proxy(function(id, url) {
    if ($.inArray(Status.get('provider').serviceID, serviceIDs) > -1) {
        Rest.stations(id, url).done($.proxy(function(results) {
            var phenomena = {};
            var ensembleGroups = {};
            $.each(results.properties.timeseries, function(id, elem) {
                /////////// to test only the CMA-ENS1 //////
//                if (id != "ts_da3a67b4b8b642a036ed30cdb83cca2") {
//                    return;
//                }
                /////////// to test only the CMA-ENS1 //////
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
            Modal.show("station-ensemble", {
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
                    $('.ensemble-station-loading').show();
                    $.each($('.tsItem').has('.checkbox :checked'), function(id, elem) {
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
                                Map.timeseriesCache[elem.internalId].setResultTime(resultTime);
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
            + (id == null ? "" : id) + "/extras", {
        request: "resultTime",
        start: moment(TimeController.currentTimespan.from).format(),
        end: moment(TimeController.currentTimespan.till).format()
    }, function(promise, result) {
        promise.resolve(result);
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

    this.getResultTime = function() {
        return resultTime;
    };

    this.fetchData = function(timespan, complete) {
        var from = moment(timespan.from).subtract(this.getTimeBuffer());
        var till = moment(timespan.till).add(this.getTimeBuffer());
        timespan = Time.getRequestTimespan(from, till);
        this.promise = Rest.tsData(this.getTsId(), this.getApiUrl(), timespan, this.getInternalId(), {'resultTime': resultTime});
        this.promise.done($.proxy(this.fetchedDataFinished, {context: this, complete: complete}));
        return this.promise;
    };

    return result;
};

var oldCreatePermalink = $.proxy(PermalinkController.createPermalink, PermalinkController);
PermalinkController.createPermalink = $.proxy(function() {
    var permalink = oldCreatePermalink();
    var resultTime = "";
    $.each(TimeSeriesController.getTimeseriesCollection(), function(idx, item) {
        resultTime = item.getResultTime();
    });
    if (resultTime) {
        permalink = permalink + "&resultTime=" + resultTime;
    }
    return permalink;
}, PermalinkController);

var oldInit = $.proxy(PermalinkController.init, PermalinkController);
var ensembleResultTime = "";
PermalinkController.init = $.proxy(function() {
    ensembleResultTime = this.evaluateParameter("resultTime");
    oldInit();
}, PermalinkController);

TimeSeriesController.loadSavedTimeseries = function() {
    $.each(Status.getTimeseries(), $.proxy(function(internalId, elem) {
        var promise = Rest.timeseries(elem.tsId, elem.apiUrl);
        var that = this;
        promise.done(function(ts) {
            ts.setResultTime(ensembleResultTime);
            if (elem.style) {
                var style = ts.getStyle();
                style.setColor(elem.style.color);
                style.setChartType(elem.style.chartType);
                style.setIntervalByHours(elem.style.interval);
            }
            that.addTS(ts);
        });
    }, this));
};