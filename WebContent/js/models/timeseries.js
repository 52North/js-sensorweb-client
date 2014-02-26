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
function TimeSeries(tsId, meta, apiUrl) {

	debugger;
	var internalId = tsId + "__" + Settings.restApiUrls[apiUrl];
	var values = [];
	var refValues = {};
	var synced = false;
	var zeroScaled = false;
	$.each(meta.referenceValues, $.proxy(function(index, elem) {
		refValues[elem.referenceValueId] = new ReferenceValue(elem.referenceValueId, elem.label);
	}, this));
	var style = {};
	if(meta.hasOwnProperty('renderingHints')) {
		var chartType = meta.renderingHints.chartType;
		var width = meta.renderingHints.properties.width;
		var color = meta.renderingHints.properties.color;
		var interval = meta.renderingHints.properties.interval;
		style = new TimeseriesStyle(chartType, width, color, interval);
	} else {
		style = TimeseriesStyle.createDefault(tsId);
	}

	this.getTsId = function() {
		return tsId;
	};
	
	this.getInternalId = function() {
		return internalId;
	};

	this.getStyle = function() {
		return style;
	};
	
	this.isZeroScaled = function() {
		return zeroScaled;
	};
	
	this.setZeroScaled = function(bool) {
		zeroScaled = bool;
	};
	
	this.isSynced = function() {
		return synced;
	};
	
	this.getUom = function() {
		return meta.uom;
	};
	
	this.unSynced = function() {
		synced = false;
	};
	
	this.getValues = function() {
		return values;
	};
	
	this.hasData = function() {
		return values.length != 0; 
	};
	
	this.getRefValuesForId = function(id) {
		if (refValues.hasOwnProperty(id)) {
			return refValues[id];
		}
		return [];
	};
	
	this.getRefValues = function(id) {
		return refValues;
	};
	
	this.getMetadata = function() {
		return meta;
	};
	
	this.persist = function() {
		return {
			style : style.persist(),
			apiUrl : apiUrl,
			tsId : tsId
		};
	};

	this.fetchData = function(timespan, complete) {
		var promise = Rest.tsData(tsId, apiUrl, timespan);
		var that = this;
		promise.done(function(data, refdata) {
			values = data;
			$.each(refdata, function(id, elem) {
				refValues[id].setValues(elem);
			});
			synced = true;
			complete(that);
		});
		return promise;
	};

}