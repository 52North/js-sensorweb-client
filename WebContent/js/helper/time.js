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
var Time = {

	isoTimespan : function(type) {
		/*
		 * a) Start and end, such as "2007-03-01T13:00:00Z/2008-05-11T15:30:00Z"
		 * b) Start and duration, such as "2007-03-01T13:00:00Z/P1Y2M10DT2H30M"
		 * c) Duration and end, such as "P1Y2M10DT2H30M/2008-05-11T15:30:00Z"
		 */
		// return obj: {from, till, mode}
		var from = moment().startOf('day');
		var till = moment().endOf('day');
		var mode = null;

		switch (type) {
		case 'today':
			from = from.startOf('day');
			mode = 'day';
			break;
		case 'yesterday':
			from = from.subtract('days', 1).startOf('day');
			till = till.subtract('days', 1).endOf('day');
			mode = 'day';
			break;
		case 'lastWeek':
			from = from.subtract('weeks', 1).startOf('week');
			till = till.subtract('weeks', 1).endOf('week');
			mode = 'week';
			break;
		case 'thisWeek':
			from = from.startOf('week');
			mode = 'week';
			break;
		case 'lastMonth':
			from = from.subtract('months', 1).startOf('month');
			till = till.subtract('months', 1).endOf('month');
			mode = 'month';
			break;
		case 'thisMonth':
			from = from.startOf('month');
			mode = 'month';
			break;
		case 'thisYear':
			from = from.startOf('year');
			mode = 'year';
			break;
		case 'lastYear':
			from = from.subtract('years', 1).startOf('year');
			till = till.subtract('years', 1).endOf('year');
			mode = 'year';
			break;
		}

		return {
			'from' : from,
			'till' : till,
			'mode' : mode
		};
	},
	
	getRequestTimespan : function (from, till) {
		return moment(from).format('YYYY-MM-DDTHH:mm:ss') + '/' + moment(till).format('YYYY-MM-DDTHH:mm:ss');
	},
	
	createTimespan : function (string) {
		var timespan = string.split('/');
		if (timespan.length = 2 && moment.isMoment(timespan[0])
				&& moment.isMoment(timespan[1])) {
			return {
				from : moment(timespan[0]),
				till : moment(timespan[1]),
				mode : 'day'
			};
		} else {
			return this.isoTimespan(string);
		}
	},
	
	getFormatedTime : function (timestamp) {
		return moment(timestamp).format(Settings.dateformat);
	}
	
};