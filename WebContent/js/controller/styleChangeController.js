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
var StyleChangeController = {

	colorList : [ '#1abc9c', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50', '#f1c40f',
			'#d35400', '#c0392b', '#7f8c8d' ],
			
	intervalList : [ 
	    { label : 'Hour', value : 1 },
	    { label : 'Day', value : 24 },
	    { label : 'Week', value : 7*24 },
	    { label : 'Month', value : 30*24 }
	],
		
	init : function() {
	},

	open : function(ts) {
		var style = ts.getStyle();
		var data = {
			currentColor : style.getColor(),
			colorList : this.colorList,
			zeroScaled : ts.isZeroScaled()
		};
		if (style.isBarChart()) {
			data.bar = true;
			data.interval = this.intervalList;
		};
		Modal.show("style-change", data);
		$('.colorButton').on('click', function(e){
			var color = $(e.target).data('color');
			if (style.getColor() != color) {
				style.setColor(color);
				EventManager.publish("timeseries:changeStyle", ts);
			}
		});
		$('.intervalButton').on('click', function(e){
			var interval = $(e.target).data('interval');
			if (style.getIntervalByHours() != interval) {
				style.setIntervalByHours(interval);
				EventManager.publish("timeseries:changeStyle", ts);
			}; 
		});
		$('.zeroScaled').on('click', function(e){
			var zeroScaled = Button.switchToggleButton(e.target);
			ts.setZeroScaled(zeroScaled);
			EventManager.publish("timeseries:zeroScaled", ts);
		});
	}
};