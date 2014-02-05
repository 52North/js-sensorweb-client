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
var Rest = {
	url : "http://sensorweb.demo.52north.org/sensorwebclient-webapp-stable/api/v1/",
//	url : "http://sosrest.irceline.be/api/v1/timeseries",
//	url : "http://192.168.1.135:8090/sensorwebclient-webapp-3.3.0-SNAPSHOT/api/v1/",
//	url : "http://localhost:8090/sensorwebclient-webapp-3.3.0-SNAPSHOT/api/v1/",
		
	timeseriesById : function(id) {
		var promise = $.Deferred();
		$.ajax({
			url : this.url + "timeseries/" + id,
			type : "GET",
			dataType : "json",
			success : function(result) {
				promise.resolve(new TimeSeries(id, result));
			}
		});
		return promise;
	},
	
	tsData : function(id, timespan) {
		var promise = $.Deferred();
		$.ajax({
			url : this.url + "timeseries/" + id + "/getData",
			data : {
				timespan : timespan,
				expanded : true
			},
			type : "GET",
			dataType : "json",
			success : function(result) {
				values = [];
				$.each(result[id].values, function(index, elem) {
					values.push([ elem.timestamp, elem.value ]);
				});
				refs = {};
				if(result[id].extra != null && result[id].extra.referenceValues != null) {
					$.each(result[id].extra.referenceValues, function(id, elem) {
						refvalues = [];
						$.each(elem.values, function(index, elem) {
							refvalues.push([ elem.timestamp, elem.value ]);
						});
						refs[id] = refvalues;
					});
				}
				promise.resolve(values, refs);
			},
			error : function(error) {
				Rest.requestFailed(error.responseText);
				promise.reject(id);
			}
		});
		return promise;
	},
	
	stations : function(id, data) {
		var promise = $.Deferred();
		$.ajax({
			url : this.url + "stations/" + (id == null ? "" : id),
			type : "GET",
			dataType : "json",
			data : data,
			success : function(result) {
				promise.resolve(result);
			}
		});
		return promise;
	},
	
	timeseries : function(id, data) {
		var promise = $.Deferred();
		data.expanded = true;
		data.force_last_values = true;
		$.ajax({
			url : this.url + "timeseries/" + (id == null ? "" : id),
			type : "GET",
			dataType : "json",
			data : data,
			success : function(result) {
				promise.resolve(result);
			}
		});
		return promise;
	},
	
	categories : function(id, data) {
		var promise = $.Deferred();
		$.ajax({
			url : this.url + "categories/" + (id == null ? "" : id),
			type : "GET",
			dataType : "json",
			data : data,
			success : function(result) {
				promise.resolve(result);
			}
		});
		return promise;
	},
	
	phenomena : function(id, data) {
		var promise = $.Deferred();
		$.ajax({
			url : this.url + "phenomena/" + (id == null ? "" : id),
			type : "GET",
			dataType : "json",
			data : data,
			success : function(result) {
				promise.resolve(result);
			}
		});
		return promise;
	},
	
	procedures : function(id, data) {
		var promise = $.Deferred();
		$.ajax({
			url : this.url + "procedures/" + (id == null ? "" : id),
			type : "GET",
			dataType : "json",
			data : data,
			success : function(result) {
				promise.resolve(result);
			}
		});
		return promise;
	},
	
	services : function() {
		var promise = $.Deferred();
		$.ajax({
			url : this.url + "services",
			data : {
				expanded : true
			},
			type : "GET",
			dataType : "json",
			success : function(result) {
				promise.resolve(result);
			}	
		});
		return promise;
	},
	
	requestFailed : function(text) {
		alert(text);
	}
	
};