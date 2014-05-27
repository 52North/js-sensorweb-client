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
var Status = (function() {
	var status = {

		key : 'settings',
		defaultValues : {
			'provider' : Settings.defaultProvider,
			'clusterStations' : true,
			'generalizeData' : false,
			'timeseries' : {},
			'timespan' : Time.isoTimespan('today'),
			'saveStatus' : true,
			'concentrationMarker' : false
		},
		
		init : function() {
			this.load();
			if(!this.get('saveStatus')) {
				this.reset();
			}
		},
		
		isSet : function() {
			if($.totalStorage(this.key)) {
				return true;
			} else {
				return false;
			}
		},
		
		load : function() {
			if (this.isSet()) {
				this.current = $.totalStorage(this.key);
			} else {
				this.current = this.defaultValues;
				this.save();
			}
		},
		
		save : function() {
			if(Settings.saveStatusPossible) {
				try {
					$.totalStorage(this.key, this.current);
				} catch (e) {
					Settings.saveStatusPossible = false;
					// safari mobile in private mode???
					// http://davidwalsh.name/quota_exceeded_err
//					alert("No Status saving possible.");
				}
			}
		},
		
		reset : function() {
			this.current = this.defaultValues;
			this.save();
			EventManager.publish("resetStatus");
		},
		
		set : function(key, value) {
			this.current[key] = value;
			this.save();
		},
		
		get : function(key) {
			if(this.current[key] == undefined) {
				return this.defaultValues[key];
			}
			return this.current[key];
		},
		
		addTimeseries : function(ts) {
			this.current.timeseries[ts.getInternalId()] = ts.persist();
			this.save();
		},
		
		addTimeseriesById : function(id) {
			var ids = id.split("__");
			var apiUrl = null;
			$.each(Settings.restApiUrls, function(url,id){
				if(id == ids[1]) {
					apiUrl = url;
					return;
				}
			});
			if(apiUrl) {
				this.current.timeseries[id] = {
						apiUrl : apiUrl,
						tsId : ids[0]
				};
				this.save();
			}
		},
		
		clearTimeseries : function() {
			this.current.timeseries = {};
			this.save();
		},
		
		removeTimeseries : function(ts) {
			delete this.current.timeseries[ts.getInternalId()];
			this.save();
		},
		
		hasTimeseriesWithId : function(id) {
			return this.current.timeseries[id] != null;
		},
		
		getTimeseriesWithId : function(id) {
			return this.current.timeseries[id];
		},
		
		getTimeseries : function() {
			return this.current.timeseries;
		},
		
		hasTimeseries : function() {
			return $.isEmptyObject(this.current.timeseries) ? false : true; 
		}
	};

	status.init();
	return status;
})();