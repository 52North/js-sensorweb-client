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
	
	tableButton : $('[data-action="dataTable"]'),
	
	tableView : $('#tableView'),
	
	pageStart : 0,
	
	pageSize : Settings.pagesize || 10,

	init : function() {
		this.tableButton.show();
		this.tableButton.on('click', $.proxy(function(event){
			var button = $(event.currentTarget);
			var legendButton = $('[data-toggle="legend"]');
			if(this.isVisible == false) {
				this.isVisible = true;
				this.tableView.show();
				Button.setNewIcon(button, 'glyphicon-stats');
				legendButton.hide();
				EventManager.publish("navigation:open","table");
			} else {
				this.isVisible = false;
				this.tableView.hide();
				legendButton.show();
				Button.removeNewIcon(button, 'glyphicon-stats');
				EventManager.publish("navigation:close","table");
			}
		}, this));
		EventManager.subscribe("navigation:open", $.proxy(this.createTable, this));
		EventManager.subscribe("timeseries:synced", $.proxy(this.createTable, this));
		EventManager.subscribe("timeseries:remove", $.proxy(this.createTable, this));
		EventManager.subscribe("timeseries:changeStyle", $.proxy(this.updateTable, this));
	},
	
	createTable : function() {
		if(this.isVisible) {
			this.tableView.empty();
			this.sortingFunc = null;
			this.pageStart = 0;
			this.createHtmlTableHeader();
			this.tableView.append(this.htmltable);
			this.updateTable();
			this.createHeaderClickHandler();
		}
	},

	updateTable : function() {
		if(this.isVisible) {
			var array = this.createValueArray();
			if (this.sortingFunc) {
				array.sort(this.sortingFunc);
			}
			if (array.length > 0) {
				var colorArray = this.createColorArray();
				this.createHtmlTable(array, colorArray);
			}
			this.createPaging(array.length, this.pageSize, this.pageStart);
			this.createPagingClickHandler(array.length);
		}
	},
	
	createHeaderClickHandler : function() {
		$('.table th').on('click', $.proxy(function(event) {
			var target = $(event.currentTarget);
			var index = target.data('index');
			if (target.hasClass('sortedUp')) {
				target.removeClass('sortedUp').addClass('sortedDown');
				this.changeSortLabel(target, false);
				this.sortingFunc = this.downsort(index);
			} else if (target.hasClass('sortedDown')) {
				target.removeClass('sortedDown').addClass('sortedUp');
				this.changeSortLabel(target, true);
				this.sortingFunc = this.upsort(index);
			} else {
				$('.table th').removeClass('sortedUp').removeClass('sortedDown');
				target.addClass('sortedUp');
				this.changeSortLabel(target, true);
				this.sortingFunc = this.upsort(index);
			}
			this.updateTable();
		}, this));
	},
	
	changeSortLabel : function(target, up) {
		$('#sorting').remove();
		var span = $('<span>').attr('id', 'sorting');
		if(up) {
			span.html('&nbsp;&#x25BE;');
		} else {
			span.html('&nbsp;&#x25B4;');
		}
		target.append(span);
	},
	
	createPagingClickHandler : function(length) {
		$('.pagination li a').on('click', $.proxy(function(event) {
			var start = $(event.target).data('start');
			if (typeof(start) !== "undefined" && start >= 0 && start <= length) {
				this.pageStart = start;
				this.updateTable();
			} 
		}, this));
	},
	
	createPaging : function(arraylength, pagesize, pagestart) {
		this.tableView.find('div.paging').remove();
		var div = $('<div class="paging"></div>'),
		paging = $('<ul class="pagination"></ul>');
		paging.append(this.pageButton('&laquo;', 0));
		paging.append(this.pageButton('&lsaquo;', pagestart - pagesize));
		paging.append(this.pageButton(Math.ceil((pagestart + 1)/pagesize) + '/' + Math.ceil(arraylength/pagesize)));
		paging.append(this.pageButton('&rsaquo;', pagestart + pagesize));
		paging.append(this.pageButton('&raquo;', Math.floor(arraylength / pagesize) * pagesize));
		div.append(paging);
		this.tableView.append(div);
	},
	
	pageButton : function(label, start) {
		var elem = $('<li></li>'),
		a = $('<a>' + label + '</a>');
		a.data('start', start);
		elem.append(a);
		return elem;
	},
	
	createColorArray : function() {
		var array = [];
		$.each(TimeSeriesController.getTimeseriesCollection(), function(index, ts){
			array.push(ts.getStyle().getColor());
		});
		return array;
	},
	
	createValueArray : function() {
		var array = [];
		$.each(TimeSeriesController.getTimeseriesCollection(), function(index, ts){
			var values = ts.getValues();
			var i = (array[0] != null && array[0].length > 0) ? array[0].length : 0;
			var arrayindex = 0;
			$.each(values, function(idx, tvpair) {
				var time = tvpair[0];
				var value = tvpair[1];
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
						array.splice(arrayindex, 0 ,entry);
					}
					arrayindex++;
				}
			});
		});
		return array;
	},
	
	upsort : function(id) {
		return function(a,b) {
			if(isNaN(a[id]) && isNaN(b[id])) return 0;
			if(isNaN(a[id])) return -1;
			if(isNaN(b[id])) return 1;
			return a[id] - b[id];
		};
	},
	
	downsort : function(id) {
		return function(a,b) {
			if(isNaN(a[id]) && isNaN(b[id])) return 0;
			if(isNaN(a[id])) return 1;
			if(isNaN(b[id])) return -1;
			return b[id] - a[id];
		};
	},
	
	createHtmlTableHeader : function() {
		this.htmltable = $('<table></table>').addClass('table').addClass('table-condensed');
		var header = $('<thead></thead>');
		var headerrow = $('<tr></tr>');
		headerrow.append($('<th></th>').data('index', 0).text('Time'));
		var index = 1;
		$.each(TimeSeriesController.getTimeseriesCollection(), function(id, elem){
			var title = $('<div></div>').text(elem.getStationLabel());
			var subtitle = $('<span></span>').text(elem.getPhenomenonLabel() + " (" + elem.getUom() + ")");
			headerrow.append($('<th></th>').data('index', index++).append(title).append(subtitle));
		});
		this.htmltable.append(header.append(headerrow));
	},
	
	createHtmlTable : function(array, colorArray) {
		this.htmltable.find('tbody tr').remove();
		var cArray = colorArray;
		$.each(array, $.proxy(function(tsIndex, elem) {
			if(tsIndex < this.pageStart || tsIndex >= (this.pageStart + this.pageSize)) {
				return;
			}
			var row = $('<tr></tr>');
			$.each(elem, function(index, value) {
				if (index == 0) {
					row.append($('<td></td>').text(
							moment(value).format(Settings.dateformat)));
				} else {
					row.append($('<td></td>').css('color', cArray[index - 1])
							.append($('<b></b>').text(value)));
				}
			});
			this.htmltable.append(row);
		}, this));
		return this.htmltable;
	}
};