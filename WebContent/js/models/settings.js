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
var Settings = {
	
	// The entries in this list will be removed from the provider list offered to the user
	providerBlackList : [
	{
		serviceID : 'srv_6d9ccea8d609ecb74d4a512922bb7cee', // ircel
		apiUrl : 'http://sensorweb.demo.52north.org/sensorwebclient-webapp-stable/api/v1/'
	},
	{
		serviceID : 'srv_7cabc8c30a85fab035c95882df6db343', // BfG sos
		apiUrl : 'http://sensorweb.demo.52north.org/sensorwebclient-webapp-stable/api/v1/'
	}
	],
	
	// A list of timeseries-API urls and an appropriate identifier to create internal timeseries ids 
	restApiUrls : {
//		'http://192.168.1.135:8080/sensorwebclient-webapp/api/v1/' : 'localhost'
//		'http://localhost:8090/sensorwebclient-webapp-3.3.0-SNAPSHOT/api/v1/' : 'localhost'
		'http://sensorweb.demo.52north.org/sensorwebclient-webapp-stable/api/v1/' : '52nSensorweb', 
		'http://sosrest.irceline.be/api/v1/' : 'irceline',
		'http://www.fluggs.de/sos2/api/v1/' : 'fluggs'
	},
	
	// default selected provider
	defaultProvider : {
		serviceID : 'srv_738111ed219f738cfc85be0c8d87843c',
		apiUrl : 'http://sensorweb.demo.52north.org/sensorwebclient-webapp-stable/api/v1/'
	},
	
	// zoom level in the map, used for user location and station position
	zoom : 13,
	
	// date/time format which is used on several places
	dateformat: 'DD.MM.YY HH:mmZ',
		
	// duration after which latest values shall be ignored when rendering marker in the map
	ignoreAfterDuration : moment.duration(1, 'y'),
	
	// duration buffer for time series request
	timeseriesDataBuffer : moment.duration(2, 'h'),
	
	// default color for circled marker, when last value is older than 'ignoreAfterDuration' or the timeseries has no last value
	defaultMarkerColor : '#123456',
	
	// default scaling of loaded diagram
	defaultZeroScale : false,
	
	// additional parameters which are append to the request urls
	additionalParameters : {
		locale : 'de'
	},
	
	// should saving the status be possible, 
	saveStatusPossible : true,
	
	// entries on a page for the values table
	pagesize : 20
};