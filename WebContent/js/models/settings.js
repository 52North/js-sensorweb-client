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
	
	providerBlackList : {
		srv_cbe54f275d9d993b376783216ff9f431 : true,
		srv_a2f1df1e1f15ecf1ac3ef032fd17602a : true,  // GeoViqua
		srv_7cabc8c30a85fab035c95882df6db343 : true,  // BfG
		srv_c39c9f8358d8ea0e728d3efba6777145 : true,  // GRDC
		srv_5174ab6feff1caf74f92a4f12d2b773e : true,  // Kisters
		srv_75ca5910f9bc20619895032ea01c7e0c : true,  // Meraka
		srv_1a5bde0a6d702f193f7be463402ec12f : true,  // pegelonline
		srv_6d9ccea8d609ecb74d4a512922bb7cee : false, // ircel
		srv_738111ed219f738cfc85be0c8d87843c : false  // Wupperverband
	},
	
	timeseriesUrl : "http://sensorweb.demo.52north.org/sensorwebclient-webapp-stable/api/v1/",
//	timeseriesUrl : "http://sosrest.irceline.be/api/v1/",
//	timeseriesUrl : "http://www.fluggs.de/sos2/api/v1/",
//	timeseriesUrl : "http://192.168.1.135:8090/sensorwebclient-webapp-3.3.0-SNAPSHOT/api/v1/",
//	timeseriesUrl : "http://localhost:8090/sensorwebclient-webapp-3.3.0-SNAPSHOT/api/v1/",
	
	zoom : 13,
	
	dateformat: "DD.MM.YY",
		
	saveStatusPossible : true	
	
};