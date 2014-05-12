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

	var internalId = tsHelper.createInternalId(tsId, apiUrl);
	var values = [];
	var refValues = {};
	var synced = false;
	var zeroScaled = Settings.defaultZeroScale;
	$.each(meta.referenceValues, $.proxy(function(index, elem) {
		refValues[elem.referenceValueId] = new ReferenceValue(elem.referenceValueId, elem.label);
	}, this));
	var style = {};
	if(meta.hasOwnProperty('renderingHints')) {
		var chartType = meta.renderingHints.chartType;
		var width = meta.renderingHints.properties.width;
		var color = meta.renderingHints.properties.color;
		var interval = meta.renderingHints.properties.interval;
		var lineType = meta.renderingHints.properties.type;
		style = new TimeseriesStyle(chartType, width, color, interval, lineType);
	} else {
		style = TimeseriesStyle.createDefault(tsId);
	}

	this.getTsId = function() {
		return tsId;
	};
	
	this.getInternalId = function() {
		return internalId;
	};
	
	this.getApiUrl = function() {
		return apiUrl;
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
	
	this.getLabel = function() {
		return meta.label;
	};
	
	this.unSynced = function() {
		synced = false;
	};
	
	this.getValues = function() {
		return values;
	};
	
	this.getLastValue = function() {
		if (meta && meta.lastValue) {
			return meta.lastValue;
		}
		return null;
	};
	
	this.isCurrent = function() {
		return this.getLastValue() != null && moment().subtract(Settings.ignoreAfterDuration).isBefore(moment(this.getLastValue().timestamp));
	};
	
	this.getLastValueFormatted = function() {
		if (meta && meta.lastValue) {
			return meta.lastValue.value + " " + meta.uom + " (" + moment(meta.lastValue.timestamp).format(Settings.dateformat) + ")";
		}
		return null;
	};
	
	this.getFirstValue = function() {
		if (meta && meta.firstValue) {
			return meta.firstValue;
		}
		return null;
	};
	
	this.getFirstValueFormatted = function() {
		if (meta && meta.firstValue) {
			return meta.firstValue.value + " " + meta.uom + " (" + moment(meta.firstValue.timestamp).format(Settings.dateformat) + ")";
		}
		return null;
	};
	
	this.getCoordinates = function() {
		return meta.station.geometry.coordinates;
	};
	
	this.getStationId = function() {
		return meta.station.properties.id;
	};
	
	this.getStationLabel = function() {
		return meta.station.properties.label;
	};
	
	this.getServiceLabel = function() {
		return meta.parameters.service.label;
	};
	
	this.getPhenomenonLabel = function() {
		return meta.parameters.phenomenon.label;
	};
	
	this.getProcedureLabel = function() {
		return meta.parameters.procedure.label;
	};
	
	this.getCategoryLabel = function() {
		if (meta.parameters.category && (meta.parameters.phenomenon.label != meta.parameters.category.label)) {
			return meta.parameters.category.label;
		}
		return "";
	};
	
	this.getStatusIntervals = function() {
		return meta.statusIntervals;
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
	
	this.persist = function() {
		return {
			style : style.persist(),
			apiUrl : apiUrl,
			tsId : tsId
		};
	};

	this.fetchData = function(timespan, complete) {
		this.promise = Rest.tsData(tsId, apiUrl, timespan, internalId);
		this.promise.done($.proxy(this.fetchedDataFinished, {context:this, complete:complete}));
		return this.promise;
	};
	
	this.fetchedDataFinished = function(data, refdata) {
		values = data;
		$.each(refdata, function(id, elem) {
			if(refValues[id]) {
				refValues[id].setValues(elem);
			}
		});
		synced = true;
		this.complete(this.context);
	}; 
	
	this.destroy = function() {
		this.promise.reject(internalId);
	};
};