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
var SettingsController = {

	init : function() {
		$(document).ready(function() {
			$('[data-target="#settings"]').click(function() {
				Modal.show("settings");
				// reset status
				$('.resetStatus').on('click', function() {
					Status.reset();
					Modal.hide();
				});
				// cluster station option
				$('.clusteringStations input').attr('checked', Status.get('clusterStations'));
				$('.clusteringStations').on('change', function(e) {
					var clustering;
					if ($(e.currentTarget).has(':checked').length == 1) {
						clustering = true;
					} else {
						clustering = false;
					}
					Status.set('clusterStations', clustering);
					EventManager.publish("clusterStations", clustering);
					Modal.hide();
				});
				// save status
				$('.saveStatus input').attr('checked', Status.get('saveStatus'));
				$('.saveStatus').on('change', function(e) {
					var save;
					if ($(e.currentTarget).has(':checked').length == 1) {
						save = true;
					} else {
						save = false;
					}
					Status.set('saveStatus', save);
					Modal.hide();
				});
				// save status
				$('.generalizeData input').attr('checked', Status.get('generalizeData'));
				$('.generalizeData').on('change', function(e) {
					var save;
					if ($(e.currentTarget).has(':checked').length == 1) {
						save = true;
					} else {
						save = false;
					}
					Status.set('generalizeData', save);
					EventManager.publish("timeseries:update:complete");
					Modal.hide();
				});
				// permalink
				$('.permalink .item').on('click', function() {
					// url
					var url = window.location.href;
					// create timespan
					var timespan = TimeController.currentTimespan;
					url = url + "?timespan=" + Time.getRequestTimespan(timespan.from, timespan.till);
					// create timeseries id list
					var tsList = $.map(TimeSeriesController.getTimeseriesCollection(), function(ts, id){
						return id;
					});
					if (tsList.length > 0) {
						var timeseries = tsList.join(",");
						url = url + "&timeseries=" + timeseries;
					};
					$('.permalink .link').attr('href', url).show();
					var mailLink = "mailto:?body=" + encodeURIComponent(url); 
					$('.permalink .mail').attr('href', mailLink).show();
				});
				// imprint
			});
		});
	}

};