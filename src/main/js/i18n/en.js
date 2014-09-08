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
i18n.en = {
    ok: 'OK',
    main: {
        legend: 'Legend',
        diagram: 'Diagram',
        mapView: 'Map view',
        settings: 'Settings',
        stationSelection: 'Select a station',
        chartView: 'Chart view',
        phenomena: 'Phenomena',
        phenomenon: 'Phenomenon'
    },
    chart: {
        noTimeseriesSelected: 'You have selected no timeseries or the selected timeseries have no values in the given time range.'
    },
    map: {
        userLocation: 'Here is your current location',
        stationSelection: {
            station: 'Station',
            selectAllTimeseries: 'select all timeseries'
        },
        stationLocation: {
            station: 'Station',
            timeseries: 'Timeseries',
            provider: 'Provider'
        },
        providerList: {
            provider: 'Provider',
            stations: 'Stations',
            timeseries: 'Timeseries',
            phenomena: 'Phenomena'
        },
        search: {
            label: 'search for address ...',
            noResult: 'Sorry, that address could not be found.'
        }
    },
    listSelection: {
        header: 'Select timeseries by list',
        headers: {
            category: 'Category',
            station: 'Station',
            phenomenon: 'Phenomenon',
            procedure: 'Sensor'
        },
        warning: {
            moreThanOneTimeseries: 'found more than one timeseries'
        }
    },
    legend: {
        entry: {
            noData: 'no Data available',
            jumpToLastValue: 'jump to last value',
            firstValueAt: 'First value at',
            lastValueAt: 'Last value at'
        }
    },
    export: {
        label: 'get data as CSV-File'
    },
    timeSelection: {
        header: 'Time Range',
        presetsHeader: 'presets',
        presets: {
            today: 'today',
            yesterday: 'yesterday',
            todayYesterday: 'today & yesterday',
            thisWeek: 'this week',
            lastWeek: 'last week',
            thisMonth: 'this month',
            lastMonth: 'last month',
            thisYear: 'this year',
            lastYear: 'last year'
        },
        custom: {
            header: 'custom',
            start: 'Start date',
            end: 'End date'
        },
        warning: {
            startBeforeEnd: 'The start date can not be greater then the end date',
            maxTimeRange: 'The time range can not be greater then one year'
        }
    },
    styleChange: {
        header: 'Change style',
        currentColor: 'Current color',
        selectColor: 'Select a new color',
        selectBarInterval: 'Select the bar interval',
        barChartInterval: {
            hour: 'Hour',
            day: 'Day',
            week: 'Week',
            month: 'Month'
        },
        zeroScaled: 'zero scaled Y-axis',
        groupedAxis: 'grouped axis'
    },
    settings: {
        header: 'Settings',
        resetStatus: 'Reset status',
        permalink: {
            create: 'Create a permalink as:',
            inWindow: 'link in a new window',
            inMail: 'link in an email',
            inClipboard: 'Link to clipboard',
            clipboardInfo: 'Copy to clipboard: Ctrl+C, Enter',
            inQrCode: 'as QR-Code'
        },
        clusterMarker: 'cluster marker',
        markerWithLastInfo: {
            header: 'marker with last value information',
            label: 'attention - some data provider are very slow'
        },
        saveStatus: 'save status',
        generalizeData: 'generalize Data',
        imprint: {
            header: 'Imprint',
            github: 'Find this project at <a href="https://github.com/52North/js-sensorweb-client" target="_blank">GitHub</a>',
            text: '<p><a href="http://52north.org" target="_blank">52&deg;North GmbH</a> is responsible for this website.</p><p>52&deg;North Initiative for Geospatial Open Source Software GmbH<br>Martin-Luther-King-Weg 24<br>48155 Muenster, Germany</p>'
        }
    },
    permalink: {
        noMatchingTimeseriesFound: 'No matching timeseries is found.'
    },
    guide: {
        step1: {
            header: 'JavaScript Client - Guided Tour',
            text: 'This tour gives in a few steps an overview how to use this client. First we add a timeseries from the map.'
        },
        step2: {
            header: 'Go to the map',
            text: 'Here we switch the view to get a map.'
        },
        step3: {
            header: 'Map view',
            text: 'This is the map view. In the map you can see markers or markergroups.'
        },
        step4: {
            header: 'Change Provider',
            text: 'Here you can select another timeseries provider.'
        },
        step5: {
            header: 'Show location',
            text: 'And here you can locate your device on the map.'
        },
        step6: {
            header: 'List selection',
            text: 'Here you can select a timeseries out of ordered lists.'
        },
        step7: {
            header: 'Select a station',
            text: 'Please select now a station on the map.'
        },
        step8: {
            header: 'Select timeseries',
            text: 'Select this checkbox. If there is only one timeseries for this station, the checkbox is already checked. Now you can go on with the "OK" button to load the timeseries.'
        },
        step9: {
            header: 'Legend entry',
            text: 'Here you see the added time series. You can delete or locate the time series or change the color.'
        },
        step10: {
            header: 'Chart',
            text: 'This is the chart of the selected time series.'
        },
        step11: {
            header: 'Change time',
            text: 'Here you can change the time extent for your selected time series.'
        },
        step12: {
            header: 'Table View',
            text: 'Here you get a table of the raw data values to your selected time series.'
        },
        step13: {
            header: 'Finished',
            text: 'Well done!<br> This client is a product of <a href="http://52north.org" target="_blank">52&deg;North GmbH</a>. You can find the source code on <a href="https://github.com/52North/js-sensorweb-client" target="_blank">GitHub</a>.'
        }
    }
};