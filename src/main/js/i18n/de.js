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
i18n.de = {
    ok: 'OK',
    main: {
        legend: 'Legende',
        diagram: 'Diagramm',
        mapView: 'Kartenansicht',
        settings: 'Einstellungen',
        stationSelection: 'Wähle eine Station aus',
        chartView: 'Diagrammansicht',
        phenomena: 'Phänomene',
        phenomenon: 'Phänomen',
        favoritesList: 'Favoriten',
        importFavorites: 'Importieren',
        exportFavorites: 'Exportieren',
        importExportHelp: 'Datei für den Im- oder Exportieren wählen',
        noFileSelected: 'Keine Datei ausgewählt'
    },
    chart: {
        noTimeseriesSelected: 'Sie haben keine Zeitreihe ausgewählt oder die gewählten Zeitreihen haben keine Werte in dem derzeitigen Zeitraum.',
        outsideOfDataRange: 'Außerhalb des Datenbereichs!'
    },
    map: {
        userLocation: 'Hier ist ihr Standort',
        stationSelection: {
            station: 'Station',
            selectAllTimeseries: 'wähle alle Zeitreihen'
        },
        stationLocation: {
            station: 'Station',
            timeseries: 'Zeitreihe',
            provider: 'Datenanbieter'
        },
        providerList: {
            provider: 'Datenanbieter',
            stations: 'Stationen',
            timeseries: 'Zeitreihen',
            phenomena: 'Phänomene'
        },
        search: {
            label: 'suche Addresse ...',
            noResult: 'Sorry, es konnte keine Adresse gefunden werden.'
        }
    },
    listSelection: {
        header: 'Listenbasierte Zeitreihenauswahl',
        headers: {
            category: 'Kategorie',
            station: 'Station',
            phenomenon: 'Phänomen',
            procedure: 'Sensor'
        },
        warning: {
            moreThanOneTimeseries: 'Mehr als eine Zeitreihe gefunden'
        }
    },
    legend: {
        entry: {
            noData: 'keine Daten verfügbar',
            jumpToLastValue: 'Springe zur letzten Messung',
            firstValueAt: 'Erster Wert bei',
            lastValueAt: 'Letzter Wert bei'
        }
    },
    "export": {
        label: 'Daten als CSV-File'
    },
    timeSelection: {
        header: 'Zeitraum',
        presetsHeader: 'Vordefiniert',
        presets: {
            lastHour: 'letzte Stunde',
            today: 'heute',
            yesterday: 'gestern',
            todayYesterday: 'heute & gestern',
            thisWeek: 'diese Woche',
            lastWeek: 'letzte Woche',
            thisMonth: 'diesen Monat',
            lastMonth: 'letzten Monat',
            thisYear: 'dieses Jahr',
            lastYear: 'letztes Jahr'
        },
        custom: {
            header: 'Freidefiniert',
            start: 'Startzeitpunkt',
            end: 'Endzeitpunkt'
        },
        warning: {
            startBeforeEnd: 'Der Startzeitpunkt darf nicht größer als der Endzeitpunkt sein',
            maxTimeRange: 'Der ausgewählte Zeitraum darf nicht größer als ein Jahr sein'
        }
    },
    styleChange: {
        header: 'Ändern der Zeitreihengestaltung',
        currentColor: 'Derzeitige Farbe',
        selectColor: 'Wähle neue Farbe',
        selectBarInterval: 'Wähle Balkeninterval',
        barChartInterval: {
            hour: 'Stunde',
            day: 'Tag',
            week: 'Woche',
            month: 'Monat'
        },
        zeroScaled: 'Nullbasierte Y-Achse',
        groupedAxis: 'gruppierte Achse'
    },
    settings: {
        header: 'Einstellungen',
        resetStatus: 'Lösche den Status',
        permalink: {
            create: 'Erstelle Permalink',
            inWindow: 'öffnen im neuen Fenster',
            inMail: 'öffnen in leerer Mail',
            inClipboard: 'Link in die Zwischenablage',
            clipboardInfo: 'Kopiere in die Zwischenablage: Ctrl+C, Enter',
            inQrCode: 'als QR-Code',
            favorite: 'Status in die Favoritenliste übernehmen'
        },
        clusterMarker: 'Marker gruppieren',
        markerWithLastInfo: {
            header: 'Marker mit Wert der letzten Messung',
            label: 'Achtung - dies kann bei einigen Providern zu langen Afragen führen'
        },
        saveStatus: 'Status mitzeichnen',
        generalizeData: 'Daten generalisiert abfragen',
        imprint: {
            header: 'Impressum',
            github: 'Zur <a href="https://github.com/52North/js-sensorweb-client" target="_blank">GitHub</a>-Seite dieses Projekts',
            text: '<p><a href="http://52north.org" target="_blank">52&deg;North GmbH</a> ist für diese Website verantwortlich.</p><p>52&deg;North Initiative for Geospatial Open Source Software GmbH<br>Martin-Luther-King-Weg 24<br>48155 Muenster, Deutschland</p>'
        }
    },
    permalink: {
        noMatchingTimeseriesFound: 'Keine passende Zeitreihe gefunden.'
    },
    guide: {
        step1: {
            header: 'JavaScript Client - Geführte Tour',
            text: 'Die Tour gibt in ein paar Schritten einen Überblick über den Client. Zuerst fügen wir eine Zeitreihe von der Karte hinzu.'
        },
        step2: {
            header: 'Zur Karte',
            text: 'Hier kann man die zur Kartenansicht wechseln.'
        },
        step3: {
            header: 'Karten Ansicht',
            text: 'In der Karte siehst du die Stationen als Marker oder Markergruppen.'
        },
        step4: {
            header: 'Änder den Datenanbieter',
            text: 'Hier kannst du aus einer Liste von Datenanbieter auswählen.'
        },
        step5: {
            header: 'Eigene Position',
            text: 'Hier kannst du dich lokalisieren lassen.'
        },
        step6: {
            header: 'Listenauswahl',
            text: 'Hier ist einen Zeitreihenauswahl durch geortnete Listen möglich.'
        },
        step7: {
            header: 'Auswahl einer Station',
            text: 'Bitte wähle eine Station auf der Karte aus.'
        },
        step8: {
            header: 'Zeitreihe auswählen',
            text: 'Wähle einen Zeitreihe durch anklicken der Checkbox. Liegt an dieser Station nur eine Zeitreihe vor, ist diese direkt angewählt. Durch klicken des OK-Buttons wird die Zeitreihe eingeladen.'
        },
        step9: {
            header: 'Legendeneintrag',
            text: 'Hier wird die zugefügte Zeitreihe angezeigt. Du kannst die Zeitreihe hier wieder entfernen oder den Style ändern.'
        },
        step10: {
            header: 'Diagramm',
            text: 'Dies ist das Diagramm der gewählten Zeitreihen.'
        },
        step11: {
            header: 'Zeit ändern',
            text: 'Hier kann der Zeitraum angepasst werden.'
        },
        step12: {
            header: 'Tabellenansicht',
            text: 'Hier bekommt man die Rohdaten in einer Tabelle präsentiert.'
        },
        step13: {
            header: 'Fertig',
            text: 'Super!<br> Dieser Client ist ein Produkt von <a href="http://52north.org" target="_blank">52&deg;North GmbH</a>. Auf <a href="https://github.com/52North/js-sensorweb-client" target="_blank">GitHub</a> findest du den aktuellen Entwicklungsstand.'
        }
    },
    favorite:{
        firstValueAt: 'Erster Wert bei',
        lastValueAt: 'Letzter Wert bei',
        edit: {
            header: "Favorit editieren"
        },
        group:{
            add: "Der Status wird mit dem Name '{0}' in den Favoriten abgelegt.",
            noTimeseries: "Derzeit sind keine Zeitreihen ausgewählt.",
            exists: "Dieser Status existiert bereits."
        },
        single: {
            add: "Einer neuer Favorit mit dem Name '{0}' ist abgelegt worden.",
            remove: "Der Favorit '{0}' ist entfernt worden.",
            exists: "Dieser Favorit existiert bereits."
        },
        lastValueAt: 'Letzter Wert bei'
    },
    inform: {
        error: "Ein Fehler ist aufgetreten: ",
        warn: "Bitte beachten Sie: "
    }
};