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
var TimeSeriesController = {
    timeseries: {},
    init: function() {
        EventManager.subscribe("resetStatus", $.proxy(this.removeAllTS, this));
        EventManager.subscribe("timeextent:change", $.proxy(this.changeTimeExtent, this));
        EventManager.subscribe("timeseries:changeStyle", $.proxy(this.updateTS, this));
        EventManager.subscribe("timeseries:zeroScaled", $.proxy(this.updateTS, this));
        this.loadSavedTimeseries();
    },
    loadSavedTimeseries: function() {
        $.each(Status.getTimeseries(), $.proxy(function(internalId, elem) {
            var promise = Rest.timeseries(elem.tsId, elem.apiUrl);
            var that = this;
            promise.done(function(ts) {
                ts.setStyle(TimeseriesStyle.createStyleOfPersisted(elem.style));
                that.addTS(ts);
            });
        }, this));
    },
    addTSbyId: function(tsId, apiUrl) {
        var promise = Rest.timeseries(tsId, apiUrl);
        var that = this;
        promise.done(function(ts) {
            that.addTS(ts);
        });
    },
    /*----- add timeseries -----*/
    addTS: function(ts) {
        Status.addTimeseries(ts);
        EventManager.publish("timeseries:add", [ts]);
        this.timeseries[ts.getInternalId()] = ts;
        // request data
        var from = TimeController.currentTimespan.from;
        var till = TimeController.currentTimespan.till;
        this.loadTsData(ts, {
            from: from,
            till: till
        });
    },
    updateTS: function(evt, ts) {
        Status.addTimeseries(ts);
    },
    loadTsData: function(ts, timespan) {
        EventManager.publish("timeseries:data:load", [ts]);
        ts.fetchData(timespan, $.proxy(this.finishedGetData, this));
    },
    finishedGetData: function(ts) {
        EventManager.publish("timeseries:data:loadfinished", [ts]);
        this.checkSyncedStatus();
    },
    checkSyncedStatus: function() {
        var syncedComplete = true;
        $.each(this.timeseries, function(index, elem) {
            if (!elem.isSynced()) {
                syncedComplete = false;
                return;
            }
        });
        if (syncedComplete) {
            EventManager.publish("timeseries:synced", [this.timeseries]);
        }
    },
    /*----- update timeextent -----*/
    changeTimeExtent: function(event, timeExtent) {
        this.unsyncTimeseries();
        $.each(this.timeseries, $.proxy(function(index, elem) {
            this.loadTsData(elem, timeExtent);
        }, this));
    },
    unsyncTimeseries: function() {
        $.each(this.timeseries, function(index, elem) {
            elem.unSynced();
        });
    },
    /*----- remove timeseries -----*/
    removeTS: function(ts) {
        ts.destroy();
        Status.removeTimeseries(ts);
        delete this.timeseries[ts.getInternalId()];
        EventManager.publish("timeseries:remove", [ts]);
    },
    /*----- remove all timeseries -----*/
    removeAllTS: function() {
        this.timeseries = {};
        EventManager.publish("timeseries:removeAll");
    },
    getTimeseriesCollection: function() {
        return this.timeseries;
    },
    getMaxTimeExtent: function() {
        var earliestStart;
        var latestEnd;
        $.each(this.timeseries, $.proxy(function(index,elem) {
            if (elem.getFirstValue() || elem.getLastValue()) {
                var start = moment(elem.getFirstValue().timestamp);
                var end = moment(elem.getLastValue().timestamp);
                if ( !earliestStart || start.isAfter(earliestStart)) {
                    earliestStart = start;
                }
                if ( !latestEnd || end.isBefore(latestEnd)) {
                    latestEnd = end;
                }
            }
        }));
        return {
            from : earliestStart,
            till: latestEnd
        };
    }
};