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
        phenomenon: 'Phenomenon',
        favoritesList: 'Favorites',
        importFavorites: 'Import',
        exportFavorites: 'Export',
        importExportHelp: 'Choose a file to import or export favorites',
        noFileSelected: 'No file selected'
    },
    chart: {
        noTimeseriesSelected: 'You have selected no timeseries or the selected timeseries have no values in the given time range.',
        outsideOfDataRange: 'Outside of data range!'
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
    "export": {
        label: 'get data as CSV-File'
    },
    timeSelection: {
        header: 'Time Range',
        presetsHeader: 'presets',
        presets: {
            lastHour: 'last hour',
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
            create: 'Create a permalink as',
            inWindow: 'link in a new window',
            inMail: 'link in an email',
            inClipboard: 'Link to clipboard',
            clipboardInfo: 'Copy to clipboard: Ctrl+C, Enter',
            inQrCode: 'as QR-Code',
            favorite: 'Status as favorite entry'
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
    },
    favorite: {
        firstValueAt: 'First value at',
        lastValueAt: 'Last value at',
        edit: {
            header: "Edit favorite"
        },
        group: {
            add: "The status '{0}' is added to the favorite list.",
            exists: "This status still exists.",
            noTimeseries: "Currently no timeseries are selected."
        },
        single: {
            add: "A new favorite '{0}' is added to the list.",
            remove: "The favorite '{0}' is removed.",
            exists: "This favorite still exists."
        },
        lastValueAt: 'Last value at'
    },
    inform: {
        error: "An error occured: ",
        warn: "Please remember that: "
    }
};