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
				if(Settings.saveStatusPossible){
					// reset status
					$('.resetStatus').on('click', function() {
						Status.reset();
					});
					// save status
					Button.setToggleButton('.saveStatus', Status.get('saveStatus'));
					$('.saveStatus').on('click', function(e) {
						var save = Button.switchToggleButton(e.currentTarget); 
						Status.set('saveStatus', save);
					});
				} else {
					$('.resetStatus').remove();
					$('.saveStatus').remove();
				}
				// cluster station option
				Button.setToggleButton('.clusteringStations', Status.get('clusterStations'));
				$('.clusteringStations').on('click', function(e) {
					var clustering = Button.switchToggleButton(e.currentTarget);
					Status.set('clusterStations', clustering);
					EventManager.publish("clusterStations", clustering);
				});
				// generalize data
				Button.setToggleButton('.generalizeData', Status.get('generalizeData'));
				$('.generalizeData').on('click', function(e) {
					var generalize = Button.switchToggleButton(e.currentTarget);
					Status.set('generalizeData', generalize);
					EventManager.publish("timeseries:update:complete");
				});
				// show concentration marker
				Button.setToggleButton('.concentrationMarker', Status.get('concentrationMarker'));
				$('.concentrationMarker').on('click', function(e) {
					var concentMarker = Button.switchToggleButton(e.currentTarget);
					Status.set('concentrationMarker', concentMarker);
				});
				// permalink
				$('.permalink .link').on('click', function(){
					window.open(PermalinkController.createPermalink(), '_blank');
				}).show();
				$('.permalink .mail').on('click', function(){
					window.location.href = "mailto:?body=" + encodeURIComponent(PermalinkController.createPermalink()); 
				}).show();
				$('.permalink .clipboard').on('click', function(){
					window.prompt("Copy to clipboard: Ctrl+C, Enter", PermalinkController.createPermalink()); 
				}).show();
				// imprint
			});
		});
	}

};