/*
 * Copyright (C) 2014-2014 52°North Initiative for Geospatial Open Source
 * Software GmbH
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var Settings = {
    // For more informations about the settings options, please check: http://52north.github.io/js-sensorweb-client
    // The entries in this list will be removed from the provider list offered to the user
    providerBlackList: [
        {
            serviceID: 'srv_6d9ccea8d609ecb74d4a512922bb7cee', // ircel
            apiUrl: 'http://sensorweb.demo.52north.org/sensorwebclient-webapp-stable/api/v1/'
        },
        {
            serviceID: 'srv_7cabc8c30a85fab035c95882df6db343', // BfG sos
            apiUrl: 'http://sensorweb.demo.52north.org/sensorwebclient-webapp-stable/api/v1/'
        },
        {
            serviceID: 'srv_7cabc8c30a85fab035c95882df6db343', // Wupperverbands-SOS
            apiUrl: 'http://sensorweb.demo.52north.org/sensorwebclient-webapp-stable/api/v1/'
        }
    ],
    // A list of timeseries-API urls and an appropriate identifier to create internal timeseries ids
    restApiUrls: {
//		'http://192.168.1.135:8080/sensorwebclient-webapp/api/v1/' : 'localhost'
//		'http://localhost:8090/sensorwebclient-webapp-3.3.0-SNAPSHOT/api/v1/' : 'localhost'
        'http://sensorweb.demo.52north.org/sensorwebclient-webapp-stable/api/v1/': '52nSensorweb',
        'http://sosrest.irceline.be/api/v1/': 'irceline',
        'http://www.fluggs.de/sos2/api/v1/': 'fluggs',
        'http://sensors.geonovum.nl/sos/api/v1/': 'geonovum'
    },
    // default selected provider
    defaultProvider: {
        serviceID: 'srv_738111ed219f738cfc85be0c8d87843c',
        apiUrl: 'http://sensorweb.demo.52north.org/sensorwebclient-webapp-stable/api/v1/'
    },
    // default setting for clustering stations
    clusterStations: true,
    // default setting for generalization of the data
    generalizeData: false,
    // default setting for save status
    saveStatus: false,
    // default setting for concentration marker
    concentrationMarker: false,
    // zoom level in the map, used for user location and station position
    zoom: 13,
    // date/time format which is used on several places
    dateformat: 'DD.MM.YY HH:mmZ',
    shortDateformat: 'DD.MM.YY',
    // duration after which latest values shall be ignored when rendering marker in the map
    ignoreAfterDuration: moment.duration(1, 'y'),
    // duration buffer for time series request
    timeseriesDataBuffer: moment.duration(2, 'h'),
    // default color for circled marker, when last value is older than 'ignoreAfterDuration' or the timeseries has no last value
    defaultMarkerColor: '#123456',
    // default scaling of loaded diagram
    defaultZeroScale: false,
    // default grouping timeseries with same uom
    defaultGroupedAxis: true,
    // additional parameters which are append to the request urls
    additionalParameters: {
        locale: 'de'
    },
    // default language for i18n
    defaultLanguage: 'en',
    // should saving the status be possible,
    saveStatusPossible: true,
    // entries on a page for the values table
    pagesize: 20,
    // line width for selected timeseries
    selectedLineWidth: 5,
    // common line width for unselected timeseries
    commonLineWidth: 2,
    // chart styling options see for more details: https://github.com/flot/flot/blob/master/API.md
    chartOptions: {},
    // colorlist to select for a different timeseries color
    colorList: ['#1abc9c', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50', '#f1c40f',
        '#d35400', '#c0392b', '#7f8c8d'],
    // interval to display the timeseries in a bar diagram with label and value in hours
    intervalList: [
        {label: _('styleChange.barChartInterval.hour'), value: 1},
        {label: _('styleChange.barChartInterval.day'), value: 24},
        {label: _('styleChange.barChartInterval.week'), value: 7 * 24},
        {label: _('styleChange.barChartInterval.month'), value: 30 * 24}
    ],
    timeRangeData: {
        presets: [
            {
                name: 'lastHour',
                label: _('timeSelection.presets.lastHour'),
                interval: {
                    from: moment().subtract('hours', 1),
                    till: moment(),
                    mode: 'minutes'
                }
            },
            {
                name: 'today',
                label: _('timeSelection.presets.today'),
                interval: {
                    from: moment().startOf('day'),
                    till: moment().endOf('day'),
                    mode: 'day'
                }
            },
            {
                name: 'yesterday',
                label: _('timeSelection.presets.yesterday'),
                interval: {
                    from: moment().subtract('days', 1).startOf('day'),
                    till: moment().subtract('days', 1).endOf('day'),
                    mode: 'day'
                }
            },
            {
                name: 'todayYesterday',
                label: _('timeSelection.presets.todayYesterday'),
                interval: {
                    from: moment().subtract('days', 1).startOf('day'),
                    //till: moment(),
                    mode: 'day'
                }
            },
            {
                name: 'thisWeek',
                label: _('timeSelection.presets.thisWeek'),
                interval: {
                    from: moment().subtract('weeks', 1).startOf('week'),
                    till: moment().subtract('weeks', 1).endOf('week'),
                    mode: 'week'
                }
            },
            {
                name: 'lastWeek',
                label: _('timeSelection.presets.lastWeek'),
                interval: {
                    from: moment().startOf('week'),
                    //till: moment(),
                    mode: 'week'
                }
            },
            {
                name: 'thisMonth',
                label: _('timeSelection.presets.thisMonth'),
                interval: {
                    from: moment().subtract('months', 1).startOf('month'),
                    till: moment().subtract('months', 1).endOf('month'),
                    mode: 'month'
                }
            },
            {
                name: 'lastMonth',
                label: _('timeSelection.presets.lastMonth'),
                interval: {
                    from: moment().startOf('month'),
                    //till: moment(),
                    mode: 'month'
                }
            },
            {
                name: 'thisYear',
                label: _('timeSelection.presets.thisYear'),
                interval: {
                    from: moment().startOf('year'),
                    //till: moment(),
                    mode: 'year'
                }
            },
            {
                name: 'lastYear',
                label: _('timeSelection.presets.lastYear'),
                interval: {
                    from: moment().subtract('years', 1).startOf('year'),
                    till: moment().subtract('years', 1).endOf('year'),
                    mode: 'year'
                }
            }
        ]
    },
    wmsLayer: [],
    // configuration for the tile layer in the leaflet map (see for more information: http://leafletjs.com/reference.html#tilelayer )
    tileLayerUrl: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
    tileLayerOptions: {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    },
    enableGeoSearch: true
};