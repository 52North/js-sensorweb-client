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

	request : function(url, data, success, fail) {
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
			url : url,
			data : data,
			type : "GET",
			dataType : "json",
			success : function(result) {
				success(promise, result);
			},
			error : function(error) {
				Rest.requestFailed(error);
				if(fail != null) {
					fail(promise, error);
				}
			}
		});
		return promise;
	},

	requestFailed : function(error) {
		if (error.responseJSON && error.responseJSON.userMessage) {
			alert(error.responseJSON.userMessage);
		}
	},

	tsData : function(id, apiUrl, timespan, internalId, extendedData) {
		var data = {
			timespan : timespan,
			generalize : Status.get('generalizeData'),
			expanded : true
		};
		if(extendedData) {
			data = $.extend(data, extendedData);
		}
		return this.request(apiUrl + "timeseries/" + id
				+ "/getData", data, function(promise, result) {
			values = [];
			$.each(result[id].values, function(index, elem) {
				values.push([ elem.timestamp, elem.value ]);
			});
			refs = {};
			if (result[id].extra != null
					&& result[id].extra.referenceValues != null) {
				$.each(result[id].extra.referenceValues, function(id, elem) {
					refvalues = [];
					$.each(elem.values, function(index, elem) {
						refvalues.push([ elem.timestamp, elem.value ]);
					});
					refs[id] = refvalues;
				});
			}
			promise.resolve(values, refs);
		}, function(promise, error) {
			promise.reject(internalId);
		});
	},

	stations : function(id, apiUrl, data) {
		return Rest.request(apiUrl + "stations/"
				+ (id == null ? "" : id), data, function(promise, result) {
			promise.resolve(result);
		});
	},

	features : function(id, apiUrl, data) {
		return Rest.request(apiUrl + "features/"
				+ (id == null ? "" : id), data, function(promise, result) {
			promise.resolve(result);
		});
	},

	timeseries : function(id, apiUrl, data) {
		if(data == null) {
			data = {};
		}
		data.expanded = true;
		data.rendering_hints = true;
		return Rest.request(apiUrl + "timeseries/"
				+ (id == null ? "" : id), data, function(promise, result) {
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

	categories : function(id, apiUrl, data) {
		return Rest.request(apiUrl + "categories/"
				+ (id == null ? "" : id), data, function(promise, result) {
			promise.resolve(result);
		});
	},

	phenomena : function(id, apiUrl, data) {
		return Rest.request(apiUrl + "phenomena/"
				+ (id == null ? "" : id), data, function(promise, result) {
			promise.resolve(result);
		});
	},

	procedures : function(id, apiUrl, data) {
		return Rest.request(apiUrl + "procedures/"
				+ (id == null ? "" : id), data, function(promise, result) {
			promise.resolve(result);
		});
	},

	services : function(apiUrl) {
		return Rest.request(apiUrl + "services", {
			expanded : true
		}, function(promise, result) {
			promise.resolve(result);
		});
	},
	
	abortRequest : function(promise) {
		if (promise && promise.state() == "pending") {
			promise.reject();
		}
	}

};