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
var TimeSeriesController = {

	timeseries : {},

	init : function() {
		EventManager.subscribe("resetStatus", $.proxy(this.removeAllTS, this));
		EventManager.subscribe("timeextent:change", $.proxy(this.changeTimeExtent, this));
		this.loadSavedTimeseries();
	},
	
	loadSavedTimeseries : function() {
		$.each(Status.getTimeseries(), $.proxy(function(internalId, elem) {
			var promise = Rest.timeseries(elem.tsId, elem.apiUrl);
			var that = this;
			promise.done(function(ts){
				if(elem.style) {
					var style = ts.getStyle();
					style.setColor(elem.style.color);
					style.setChartType(elem.style.chartType);
					style.setIntervalByHours(elem.style.interval);
				}
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
	addTS : function(ts) {
		Status.addTimeseries(ts);
		EventManager.publish("timeseries:add", [ ts ]);
		this.timeseries[ts.getInternalId()] = ts;
		// request data
		var from = TimeController.currentTimespan.from;
		var till = TimeController.currentTimespan.till;
		this.loadTsData(ts, {
			from: from,
			till: till
		});
	},

	loadTsData : function(ts, timespan) {
		EventManager.publish("timeseries:data:load", [ ts ]);
		ts.fetchData(timespan, $.proxy(this.finishedGetData, this)).fail($.proxy(function(id){
			this.removeTS(this.timeseries[id]);
			this.checkSyncedStatus();
		}, this));
	},
	
	finishedGetData : function(ts) {
		EventManager.publish("timeseries:data:loadfinished", [ ts ]);
		this.checkSyncedStatus();
	},
	
	checkSyncedStatus : function() {
		var syncedComplete = true;
		$.each(this.timeseries, function (index, elem) {
			if (!elem.isSynced()) {
				syncedComplete = false;
				return;
			}
		});
		if (syncedComplete) {
			EventManager.publish("timeseries:synced", [ this.timeseries ]);
		}
	},
	
	/*----- update timeextent -----*/
	changeTimeExtent : function(event, timeExtent) {
		this.unsyncTimeseries();
		$.each(this.timeseries, $.proxy(function(index, elem){
			this.loadTsData(elem, timeExtent);
		}, this));
	},
	
	unsyncTimeseries : function(){
		$.each(this.timeseries, function(index, elem){
			elem.unSynced();
		});
	},

	/*----- remove timeseries -----*/
	removeTS : function(ts) {
		ts.destroy();
		Status.removeTimeseries(ts);
		delete this.timeseries[ts.getInternalId()];
		EventManager.publish("timeseries:remove", [ ts ]);
	},

	/*----- remove all timeseries -----*/
	removeAllTS : function() {
		this.timeseries = {};
		EventManager.publish("timeseries:removeAll");
	},
	
	getTimeseriesCollection : function() {
		return this.timeseries;
	}
};