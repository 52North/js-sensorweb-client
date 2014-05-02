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
var oldOpenStationWindow = $.proxy(Map.openStationWindow, Map);
Map.openStationWindow = $.proxy(function(id, url) {
	if (Status.get('provider').serviceID == "srv_cbe54f275d9d993b376783216ff9f431") {
		Rest.stations(id, url).done($.proxy(function(results) {
			var phenomena = {};
			var ensembleGroups = {};
			$.each(results.properties.timeseries, function(id, elem) {
				if(Map.selectedPhenomenon == null || Map.selectedPhenomenon == elem.phenomenon.id) {
					if(!phenomena.hasOwnProperty(elem.phenomenon.id)) {
						phenomena[elem.phenomenon.id] = {};
						phenomena[elem.phenomenon.id].timeseries = [];
						phenomena[elem.phenomenon.id].label = elem.phenomenon.label;
					}
				}
				var procLabel = elem.procedure.label;
				var ensemble = procLabel.substring(0, procLabel.indexOf('-'));
				if (!ensembleGroups.hasOwnProperty(ensemble)) {
					ensembleGroups[ensemble] = [];
				}
				ensembleGroups[ensemble].push({
					'id' : id,
					'internalId' : TimeSeries.createInternalId(id, url) 
				});
			});
			this.loading(false);
			Modal.show("station-ecmwf", {
				"name" : results.properties.label,
				"ensemble" : $.map(ensembleGroups, function(timeseries, label) {
					return {
						"label" : label,
						"count" : timeseries.length
					};
				})
			});
			$('#confirmTimeseriesSelection').on('click', function() {
				$.each($('.tsItem').has(':checked'), function(id, elem) {
					$.each(ensembleGroups[$(this).data('ensemble')], function(idx, elem) {
						if (Map.timeseriesCache[elem.internalId] == null) {
							Rest.timeseries(elem.id, url).done(function(timeseries) {
								Map.timeseriesCache[timeseries.getInternalId()] = timeseries;
								Map.addTimeseries(timeseries);
							});
						} else {
							Map.addTimeseries(Map.timeseriesCache[elem.internalId]);
						}
					});
				});
			});
			EventManager.publish("map:stationLoaded");
		}, this));
	} else {
		oldOpenStationWindow(id, url);
	}
},Map);