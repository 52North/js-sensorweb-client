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
var ExportController = {
		
	init : function() {
		var version = this.msieversion();
		if(version == null || version > 9) {
			EventManager.subscribe('timeseries:add', $.proxy(this.loadTimeseries, this));
		}
	},

	loadTimeseries : function(event, ts) {
		tsId = ts.getInternalId();
		var button = $('<div class="additionalLegendEntry"><span class="glyphicon glyphicon-download"></span><span> get data as CSV-File</span></div>');
		$('.legendItem[data-id="' + tsId + '"]').find('.collapseLegendEntry').append(button);
		button.on('click', $.proxy(function() {
			this.createCSVforTS(ts);
		}, this));
	},
	
	createCSVforTS : function(ts) {
		// create header
		var csvContent = 'Sensor Station;Sensor Phenomenon;Date;Value\n';
		// create value body
		$.each(ts.getValues(), function(idx, valueTuple) {
			// add station
			csvContent += ts.getStationLabel() + ';';
			// add phenomenon
			csvContent += ts.getPhenomenonLabel() + ' (' + ts.getUom() + ');';
			// add timestamp
			csvContent += moment(valueTuple[0]).format() + ';';
			// add value
			csvContent += valueTuple[1];
			csvContent += '\n';
		});
		this.triggerDownload(csvContent,ts.getLabel());
	},
	
	triggerDownload : function(content, suggestedFilename) {
		var filename = suggestedFilename;
		if (!filename) {
			filename = 'export.csv';
		}
		if (filename.indexOf('.csv') == -1) {
			filename += '.csv';
		}
		if (navigator.msSaveBlob) {
			// IE 10 or greater...
			var blob = new Blob([content],{
			    type: 'text/csv;charset=utf-8;'
			});
			navigator.msSaveBlob(blob, filename);
		} else {
			// FF, Chrome ...
			var a = document.createElement('a');
			a.href     = 'data:attachment/csv,' + encodeURI(content);
			a.target   = '_blank';
			a.download = filename;
			document.body.appendChild(a);
			a.click();
		}
	},
	
	msieversion : function() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");
        if (msie > 0)      // If Internet Explorer, return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)));
    }
};