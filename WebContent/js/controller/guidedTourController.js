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
var GuidedTourController = (function() {
	/*
	 * every step has the following options:
	 * 
	 * mandatory: 
	 * 		"anchor" : existing anchor in the document to connect the popup window  
	 */
	var steps = [
			{
				anchor : '.navbar-header.chart',
				title : 'JavaScript Client - Guided Tour',
				text : 'This is the JavaScript Client of 52°North. This tour gives in a few steps an overview how to use this client. First we add a timeseries from the map.',
				initStep : function() {
					Pages.navigateToChart();
				}
			},
			{
				anchor : '[data-target="#map"]',
				title : 'Go to the map',
				text : 'Here we switch the view to get a map.',
				arrow : true,
				initStep : function() {
					Pages.navigateToChart();
				}
			},
			{
				anchor : '.navbar-header.map',
				title : 'Map view',
				text : 'This is the map view. In the map you can see markers or markergroups.',
				initStep : function() {
					Pages.navigateToMap();
				}
			},
			{
				anchor : '[data-action="provider"]',
				title : 'Change Provider',
				text : 'Here you can select another timeseries provider.',
				arrow : true,
				initStep : function() {
				}
			},
			{
				anchor : '[data-action="locate"]',
				title : 'Show location',
				text : 'And here you can locate your device on the map.',
				arrow : true,
				initStep : function() {
				}
			},
			{
				anchor : '[data-action="listSelection"]',
				title : 'List selection',
				text : 'Here you can select a timeseries out of ordered lists.',
				arrow : true,
				initStep : function() {
				}
			},
			{
				anchor : '.navbar-header.map',
				title : 'Select a station',
				text : 'Please select now a station on the map.',
				next: false,
				initStep : function(context) {
					EventManager.subscribe("map:stationLoaded", $.proxy(
							function() {
								EventManager.unsubscribe("map:stationLoaded");
								setTimeout($.proxy(function() {
									this.showNext();
								}, this), 200);
							}, context));
				}
			},
			{
				anchor : '.tsItem input',
				title : 'Select timeseries',
				text : 'Select this checkbox. If there is only one timeseries for this station, the checkbox is already checked. Now you can go on with the "OK" button to load the timeseries.',
				previous : false,
				next : false,
				arrow : true,
				initStep : function() {
				}
			},
			{
				anchor : '',
				title : 'Select timeseries',
				text : 'Select this checkbox. If there is only one timeseries for this station, the checkbox is already checked. Now you can go on with the "OK" button to load the timeseries.',
				arrow : true,
				initStep : function() {
				}
			} ];

	var template = '<div class="popover guidedtour"><div class="popover-content"></div></div>';
	var arrowtemplate = '<div class="popover guidedtour"><div class="arrow"></div><div class="popover-content"></div></div>';

	return {
		init : function() {
			// initialize button
			$(document).ready(function() {
				$('[data-target="#tour"]').click(function() {
					GuidedTourController.start();
				});
			});
			// start by permalink
			debugger;
			if (Permalink.getUrlParameter('tour') === "true") {
				GuidedTourController.start();
			}
			// TODO check if the client is loaded the first time, then start the
			// guidedtour
		},

		start : function() {
			this.show(1);
			Status.reset();
		},

		showNext : function() {
			this.closeLast();
			this.show(this.idx + 1);
		},

		closeLast : function() {
			this.gtWindow.popover('destroy');
		},

		show : function(idx) {
			this.idx = idx;
			var step = steps[idx - 1];
			step.initStep(this);
			this.gtWindow = $(step.anchor + ':first').popover({
				html : true,
				template : step.arrow ? arrowtemplate : template,
				content : Template.createHtml('guidedtour', {
					title : step.title,
					text : step.text,
					previous : idx - 1 >= 1 && step.previous != false ? idx - 1 : null,
					step : idx,
					next : idx + 1 <= steps.length && step.next != false ? idx + 1 : null,
					steps : steps.length
				}),
				placement : 'auto'
			});
			$(step.anchor).popover('show');
			$('.paging.guidedtour li a').on('click', $.proxy(function(target) {
				var idx = parseInt(target.currentTarget.dataset.step);
				if (!isNaN(idx)) {
					this.closeLast();
					this.show(idx);
				}
			}, this));
			$('.guidedtour .close').on('click', $.proxy(function() {
				this.closeLast();
			}, this));
			this.gtWindow.on('hidden.bs.popover', $.proxy(function() {
				this.closeLast();
			}, this));
		}
	};
})();