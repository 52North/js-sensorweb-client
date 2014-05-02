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
var TimeController = {

	dateformat: "DD.MM.YY",
	currentTimespan : {},
	timeRangeData : {
		presets: [
		          {label: 'today', value: 'today'},
		          {label: 'yesterday', value: 'yesterday'},
		          {label: 'today & yesterday', value: 'today&yesterday'},
		          {label: 'this week', value: 'thisWeek'},
		          {label: 'last week', value: 'lastWeek'},
		          {label: 'this month', value: 'thisMonth'},
		          {label: 'last month', value: 'lastMonth'},
		          {label: 'this year', value: 'thisYear'},
		          {label: 'last year', value: 'lastYear'}
		        ]
	},

	init : function(timespan) {
		// get last save timespan
		this.currentTimespan = Status.get('timespan');
		$(document).ready(function() {
			$('[data-action=before]').click($.proxy(function() {
				TimeController.prevPeriode();
			}, this));
			$('[data-action=after]').click($.proxy(function() {
				TimeController.nextPeriode();
			}, this));
			$('[data-action=timeextent]').click($.proxy(function() {
				Modal.show("time-range-settings", TimeController.timeRangeData);
				var from = moment(TimeController.currentTimespan.from);
				var till = moment(TimeController.currentTimespan.till);
				$('#startPicker').text(from.format(Settings.dateformat));
				$('#endPicker').text(till.format(Settings.dateformat));
				$('#startPicker').data('date', from.format("YYYY-MM-DD"));
				$('#endPicker').data('date', till.format("YYYY-MM-DD"));
				$('#alertTimeExtent').hide();
				
				$('#startPicker').datepicker({position:'above'}).on('changeDate', TimeController.evaluateDate);
				$('#endPicker').datepicker({position:'above'}).on('changeDate', TimeController.evaluateDate);
				
				$('#confirmTimeExtent').click(function(event){
					var from = moment($('#startPicker').data('date')).startOf('day');
					var till = moment($('#endPicker').data('date')).endOf('day');
					TimeController.currentTimespan = {
						from : from,
						till : till,
						mode : "range"
					};
					TimeController.updateTimeExtent();
				});
				
				$('.preset-btn').click(function(event) {
					var btn = $(event.currentTarget);
					TimeController.setPreset(btn.data('preset-value'));
				});
				
			}, this));
		});
		this.setLabel();
		EventManager.subscribe("timeseries:data:load", $.proxy(this.disableButtons, this));
		EventManager.subscribe("timeseries:synced", $.proxy(this.enableButtons, this));
		EventManager.subscribe("time:start:change", $.proxy(this.startChanged, this));
		EventManager.subscribe("time:end:change", $.proxy(this.endChanged, this));
		EventManager.subscribe("timeseries:update:complete", $.proxy(this.updateTimeExtent, this));
	},

	startChanged : function(event, start) {
		var diff = this.getCurrentDiff();
		this.currentTimespan.from = moment(start).startOf('day');
		this.currentTimespan.till = moment(start).add(diff).add('s', 1).startOf('day').subtract('ms', 1);
		this.updateTimeExtent();
	},
	
	endChanged : function(event, end) {
		var diff = this.getCurrentDiff();
		this.currentTimespan.from = moment(end).subtract(diff).endOf('day').add('ms', 1);
		this.currentTimespan.till = moment(end).endOf('day');
		this.updateTimeExtent();
	},	

	getCurrentDiff : function() {
		var from = moment(this.currentTimespan.from);
		var till = moment(this.currentTimespan.till);
		return till.diff(from);
	},
	
	getCurrentStartAsMillis : function() {
		return moment(this.currentTimespan.from).unix() * 1000; 
	},
	
	getCurrentEndAsMillis : function() {
		return moment(this.currentTimespan.till).unix() * 1000;
	},

	updateTimeExtent : function() {
		EventManager.publish("timeextent:change", Time.getRequestTimespan(this.currentTimespan.from, this.currentTimespan.till));
		Status.set('timespan', this.currentTimespan);
		this.setLabel();
	},
	
	disableButtons : function() {
		$('[data-action="before"]').addClass('disabled');
		$('[data-action="after"]').addClass('disabled');
		$('[data-action="timeextent"]').addClass('disabled');
	},
	
	enableButtons : function() {
		$('[data-action="before"]').removeClass('disabled');
		$('[data-action="after"]').removeClass('disabled');
		$('[data-action="timeextent"]').removeClass('disabled');
	},
	
	setLabel : function () {
		var label = moment(this.currentTimespan.from).format(this.dateformat) + " - " + moment(this.currentTimespan.till).format(this.dateformat);  
		$('[data-action=timeextent]').text(label);
	},

	prevPeriode : function() {
		this.getNearbyPeriode('subtract');
		this.updateTimeExtent();
	},

	nextPeriode : function() {
		this.getNearbyPeriode('add');
		this.updateTimeExtent();
	},
	
	setPreset : function(type) {
		this.currentTimespan = Time.isoTimespan(type);
		this.updateTimeExtent();
		Modal.hide();
	},
	
	evaluateDate : function (ev) {
		if(ev.viewMode == "days"){
			var id = "#" + ev.currentTarget.id;
			if (moment($('#startPicker').data('date')).isAfter($('#endPicker').data('date'))) {
				$('#alertTimeExtent').show();
				$('#confirmTimeExtent').addClass('disabled');
				$('#alertTimeExtent').text('The start date can not be greater then the end date');
			} else if (Math.abs(moment($('#startPicker').data('date')).diff($('#endPicker').data('date'), 'years', true)) > 1) {
				$('#alertTimeExtent').show();
				$('#confirmTimeExtent').addClass('disabled');
				$('#alertTimeExtent').text('The time range can not be greater then one year');
			} else {
				$('#alertTimeExtent').hide();
				$('#confirmTimeExtent').removeClass('disabled');
				startDate = new Date(ev.date);
			}
			$(id).text(moment($(id).data('date')).format(Settings.dateformat));
			$(id).datepicker('hide');
		}
	},

	getNearbyPeriode : function(method) {
		var mode = this.currentTimespan.mode;
		var from = moment(this.currentTimespan.from);
		var till = moment(this.currentTimespan.till);

		var newFrom, newTill;

		switch (mode) {
		case 'range':
			var diff = till.diff(from);
			newFrom = from[method](diff).startOf('day');
			newTill = till[method](diff).startOf('day');
			break;
		case 'day':
			newFrom = from[method]('days', 1).startOf('day');
			newTill = till[method]('days', 1).endOf('day');
			break;
		case 'month':
			newFrom = from[method]('months', 1).startOf('month');
			newTill = till[method]('months', 1).endOf('month');
			break;
		case 'week':
			newFrom = from[method]('weeks', 1).startOf('week');
			newTill = till[method]('weeks', 1).endOf('week');
			break;
		case 'year':
			newFrom = from[method]('years', 1).startOf('year');
			newTill = till[method]('years', 1).endOf('year');
			break;
		default:
			newFrom = from;
			newTill = till;
			break;
		}
		this.currentTimespan = {
			'from' : newFrom,
			'till' : newTill,
			'mode' : mode
		};
	}
};
