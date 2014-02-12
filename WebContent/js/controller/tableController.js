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
var TableController = {
		
	isVisible : false,

	init : function() {
		$('[data-action="dataTable"]').show();
		$('[data-action="dataTable"]').on('click', $.proxy(function(){
			if(this.isVisible == false) {
				this.isVisible = true;
				$('#tableView').show();
				EventManager.publish("navigation:open","table");
			} else {
				this.isVisible = false;
				$('#tableView').hide();
				EventManager.publish("navigation:close","table");
			}
		}, this));
		EventManager.subscribe("navigation:open", $.proxy(this.createTable, this));
		EventManager.subscribe("timeseries:synced", $.proxy(this.createTable, this));
		EventManager.subscribe("timeseries:remove", $.proxy(this.createTable, this));
		EventManager.subscribe("timeseries:changeColor", $.proxy(this.changeColor, this));
	},
	
	changeColor : function(event, ts) {
		this.createTable();
	},

	createTable : function(event) {
		if(this.isVisible) {
			$('#tableView').empty();
			var array = this.createValueArray();
			var colorArray = this.createColorArray();
			$('#tableView').html(this.createHtmlTable(array, colorArray));
			// activate sort option for the data table
			var table = $('table.sortable')[0];
			sorttable.makeSortable(table);
		}
	},
	
	createColorArray : function() {
		var array = [];
		$.each(TimeSeriesController.getTimeseriesCollection(), function(index, ts){
			array.push(ts.getColor());
		});
		return array;
	},
	
	createValueArray : function() {
		var array = [];
		$.each(TimeSeriesController.getTimeseriesCollection(), function(index, ts){
			var values = ts.getValues();
			var uom = ts.getMetadata().uom;
			var i = (array[0] != null && array[0].length > 0) ? array[0].length : 0;
			var arrayindex = 0;
			$.each(values, function(idx, tvpair) {
				var time = tvpair[0];
				var value = tvpair[1] + " " + uom;
				if(i == 0) {
					array.push([time,value]);
				} else {
					while (array[arrayindex] != null && array[arrayindex][0] < time) {
						array[arrayindex][i] = "-";
						arrayindex++;
					}
					if (array[arrayindex] != null && array[arrayindex][0] == time) {
						array[arrayindex][i] = value;
					} else {
						var entry = [];
						entry.push(time);
						for (var j = 1; j < i; j++) {
							entry.push("-");
						}
						entry.push(value);
						array.splice(arrayindex,0,entry);
					}
					arrayindex++;
				}
			});
		});
		return array;
	},
	
	createHtmlTable : function(array, colorArray) {
		var table = $('<table></table>').addClass('sortable').addClass('table').addClass('table-condensed');
		var cArray = colorArray;
		// create header
		var header = $('<thead></thead>');
		var headerrow = $('<tr></tr>');
		headerrow.append($('<th></th>').text('Time'));
		$.each(TimeSeriesController.getTimeseriesCollection(), function(index, elem, test){
			headerrow.append($('<th></th>').text(elem.getMetadata().label));
		});
		table.append(header.append(headerrow));
		// create content
		$.each(array, function(tsIndex, elem) {
//			if(tsIndex <= 10) {
				var row = $('<tr></tr>');
				$.each(elem, function(index, value) {
					if(index == 0) {
						row.append($('<td></td>').text(moment(value).format("DD-MM-YYYY HH:mm:ss")));
					} else {
						row.append($('<td></td>').css('color', '#' + cArray[index-1]).append($('<b></b>').text(value)));
					}
				});
				table.append(row);
//			}
		});
		return table;
	}
};