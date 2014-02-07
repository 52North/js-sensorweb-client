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
var Map = {

	timeseriesCol : [],

	init : function() {
		$(document).ready(function() {
			$('[data-action="provider"]').click(function() {
				Map.openProviderList();
			});
			$('[data-action="locate"]').click(function() {
				Map.locateUser();
			});
		});
		if ($("#map").length > 0) {
			var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', cloudmadeAttribution = '&copy; OpenStreetMap &amp; Contributors', cloudmade = L
					.tileLayer(cloudmadeUrl, {
						maxZoom : 17,
						attribution : false
					}), latlng = L.latLng(50, 10);
			L.Icon.Default.imagePath = 'images';

			this.map = L.map('map', {
				center : latlng,
				zoom : 5,
				layers : [ cloudmade ]
			});
		}

		// load stations for default provider
		this.loadStations();

		// locate user methods
		this.map.on('locationfound', this.onLocationFound);
		this.map.on('locationerror', this.onLocationError);

		EventManager.subscribe("resetStatus", $.proxy(this.loadStations, this));
		EventManager.subscribe("timeseries:showInMap", $.proxy(this.showTsInMap, this));
	},

	/*----- stations -----*/
	loadStations : function() {
		Rest.stations(null, {
			service : Status.get('provider')
		}).done($.proxy(function(result) {
			this.createStationMarker(result, Status.get('clusterStations'));
		}, this));
		// load phenomena list
		Rest.phenomena(null, {
			service : Status.get('provider')
		}).done($.proxy(this.fillPhenomenaList, this));
	},

	createStationMarker : function(results, clustering) {
		if (this.stationMarkers != null) {
			this.map.removeLayer(this.stationMarkers);
		}
		if (results.length > 0) {
			var firstElemCoord = results[0].geometry.coordinates;
			var topmost = firstElemCoord[1];
			var bottommost = firstElemCoord[1];
			var leftmost = firstElemCoord[0];
			var rightmost = firstElemCoord[0];
			if(clustering) {
				this.stationMarkers = new L.MarkerClusterGroup();
			} else {
				this.stationMarkers = new L.LayerGroup(); 
			};
			that = this;
			$.each(results, $.proxy(function(n, elem) {
				var geom = elem.geometry.coordinates;
				if (!isNaN(geom[0]) || !isNaN(geom[1])) {
					if (geom[0] > rightmost) {
						rightmost = geom[0];
					}
					if (geom[0] < leftmost) {
						leftmost = geom[0];
					}
					if (geom[1] > topmost) {
						topmost = geom[1];
					}
					if (geom[1] < bottommost) {
						bottommost = geom[1];
					}
//					var marker = new L.circleMarker([ geom[1], geom[0] ], {
//						id : elem.properties.id,
//						fillColor: "#000",
//					    color: "#000",
//					    opacity: 1,
//					    weight: 1,
//					    fillOpacity: 0.2
//					});
					var marker = new L.marker([ geom[1], geom[0] ], {
						id : elem.properties.id,
					});
					marker.on('click', that.markerClicked);
					this.stationMarkers.addLayer(marker);
				}
			}, this));
			this.map.addLayer(this.stationMarkers);
			this.map.fitBounds([
					[ parseFloat(bottommost), parseFloat(leftmost) ],
					[ parseFloat(topmost), parseFloat(rightmost) ] ]);
		}
	},

	markerClicked : function(marker) {
		Rest.stations(marker.target.options.id).done(function(results) {
			var tsList = $.map(results.properties.timeseries, function (elem, tsId) {
				if (Map.selectedPhenomenon == null || Map.selectedPhenomenon == elem.phenomenon.id) {
					return tsId;
				}
			});
			if (tsList.length == 1) {
				if (Map.timeseriesCol[tsList[0]] == null) {
					Rest.timeseriesById(tsList[0]).done(function(timeseries) {
						Map.addTimeseries(timeseries);
					});
				} else {
					Map.addTimeseries(Map.timeseriesCol[tsList[0]]);
				}
			} else {
				var phenomena = {};
				$.each(results.properties.timeseries, function(id, elem) {
					if(!phenomena.hasOwnProperty(elem.phenomenon.id)) {
						phenomena[elem.phenomenon.id] = {};
						phenomena[elem.phenomenon.id].timeseries = [];
						phenomena[elem.phenomenon.id].label = elem.phenomenon.label;
					}
					phenomena[elem.phenomenon.id].timeseries.push({
						id : id,
						selected : Status.hasTimeseriesWithId(id),
						procedure : elem.procedure.label
					});
				});
				Modal.show("station", {
					"name" : results.properties.label,
					"phenomena" : $.map(phenomena, function(id, elem) {
						return id;
					})
				});
				$('#confirmTimeseriesSelection').on('click', function(){
					$.each($('.tsItem').has(':checked'), function(id, elem) {
						Map.addTimeseries(Map.timeseriesCol[$(this).data('id')]);
					});
				});
				$.each(results.properties.timeseries, function(id) {
					if (Map.timeseriesCol[id] == null) {
						Rest.timeseriesById(id).done(function(timeseries) {
							Map.addTimeseriesToList(timeseries);
						});
					} else {
						Map.addTimeseriesToList(Map.timeseriesCol[id]);
					}
				});
			}
		});
	},

	addTimeseriesToList : function(timeseries) {
		$('[data-id=' + timeseries.getId() + ']').addClass('loaded').find(':input').prop('disabled', false);
		Map.timeseriesCol[timeseries.getId()] = timeseries;
	},
	
	addTimeseries : function(timeseries) {
		Pages.navigateToChart();
		TimeSeriesController.addTS(timeseries);
	},

	/*----- stations -----*/
	fillPhenomenaList : function(results) {
		$('.phenomena-entry').empty();
		this.createDefaultPhenomenaEntry();
		$.each(results, $.proxy(function(index, elem) {
			var html = this.createPhenomenaEntry(elem);
			$('.phenomena-entry').append(html);
			$('[data-id=' + elem.id + ']').click($.proxy(function(event){
				$('.phenomena-entry').find('.selected').removeClass('selected');
				$('[data-id=' + elem.id + ']').find('.item').addClass('selected');
				this.selectedPhenomenon = elem.id;
				Rest.stations(null, {
					service : Status.get('provider'),
					phenomenon : elem.id
				}).done($.proxy(function(result){
					$('.phenomena').removeClass('active');
					this.createStationMarker(result, false);
				}, this));
			}, this));
		}, this));
	},
	
	createPhenomenaEntry : function(phenomenon) {
		this.selectedPhenomenon = null;
		var html = Template.createHtml("phenomenon-entry", {
			id : phenomenon.id,
			label : phenomenon.label
		});
		return html;
	},
	
	createDefaultPhenomenaEntry : function() {
		$('.phenomena-entry').append(this.createPhenomenaEntry({
			id : "all",
			label : "All phenomenons"
		}));
		$('[data-id=all]').click($.proxy(function(event, bla){
			$('.phenomena-entry').find('.selected').removeClass('selected');
			$('[data-id=all]').find('.item').addClass('selected');
			Map.loadStations();
		}));
		$('[data-id=all]').find('.item').addClass('selected');
	},
	
	/*----- provider list -----*/
	openProviderList : function() {
		Rest.services().done(this.createProviderList);
	},

	createProviderList : function(results) {
		var data = {
			"providers" : $.map(results, function(elem) {
				var provider = Settings.providerBlackList[elem.id];
				if (provider == null || !provider) {
					return {
						"name" : elem.label,
						"version" : elem.version,
						"stations" : elem.quantities.stations,
						"timeseries" : elem.quantities.timeseries,
						"url" : elem.serviceUrl,
						"id" : elem.id,
						"selected" : Status.get('provider') == elem.id,
						"type" : elem.type
					};
				}
			})
		};
		Modal.show('providers', data);
		$('.providerItem').on('click', function() {
			var id = $(this).data('id');
			Status.set('provider', id);
			Map.loadStations();
			Modal.hide();
		});
	},

	/*----- locate user -----*/
	locateUser : function() {
		this.map.locate({
			setView : true,
			maxZoom : Settings.zoom
		});
	},

	onLocationFound : function(e) {
//		if (Map.location != null) {
//			this.removeLayer(Map.location);
//		}
//		Map.location = new L.marker(e.latlng, {
//			draggable : false
//		});
//		
//		this.addLayer(Map.location);
		var popup = L.popup().setLatLng(e.latlng).setContent('<p>Here is your current location</p>');
		Map.map.openPopup(popup);
	},

	onLocationError : function(e) {
		alert(e.message);
	},
	
	showTsInMap : function(event, ts) {
		Pages.navigateToMap();
		var coords = ts.getMetadata().station.geometry.coordinates,
		pos = L.latLng(coords[1], coords[0]),
		popup = L.popup().setLatLng(pos);
		var content = Template.createHtml("station-popup", {
			station : ts.getMetadata().station.properties.label,
			timeseries : ts.getMetadata().label,
			service : ts.getMetadata().parameters.service.label
		});
		popup.setContent(content);
		popup.openOn(Map.map);
		Map.map.setZoom(Settings.zoom);
		Map.map.panTo(pos);
	}
};