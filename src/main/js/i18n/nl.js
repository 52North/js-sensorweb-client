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
i18n.nl = {
  fullName: 'Nederlands',
  ok: 'OK',
  main: {
    legend: 'Legende',
    diagram: 'Diagram',
    mapView: 'Kaartweergave',
    favoriteView: 'Favorieten',
    settings: 'Instellingen',
    stationSelection: 'Selecteer een zender',
    chartView: 'Kaartweergave',
    allPhenomena: 'Alle Phenomena',
    phenomenon: 'Fenomeen',
    favoritesList: 'Favorieten',
    importFavorites: 'Import',
    exportFavorites: 'Export',
    importExportHelp: 'Om een ​​bestand te importeren, kies dan een bestand dat u eerder geëxporteerd.',
    noFileSelected: 'Geen bestand geselecteerd'
  },
  chart: {
    noTimeseriesSelected: 'Je hebt geen tijdreeks geselecteerd, worden de geselecteerde tijdreeksen hebben geen waarden in de gegeven tijd bereik of de tijdreeksen zijn verborgen.',
    outsideOfDataRange: 'Buitenkant van data range!',
    annotation: 'Gegevens zonder garantie!',
    monthNames: [ 'Jan', 'Februari', 'Ontsieren', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December' ]
  },
  table: {
    time: 'Tijd'
  },
  map: {
    userLocation: 'Hier is uw huidige locatie',
    stationSelection: {
      station: 'Station',
      selectAllTimeseries: 'Alles selecteren tijdreeks'
    },
    stationLocation: {
      station: 'Station',
      timeseries: 'Tijdreeks',
      provider: 'Leverancier',
      jumpBackToChart: 'terug naar overzicht'
    },
    providerList: {
      provider: 'Leverancier',
      stations: 'Stations',
      timeseries: 'Tijdreeks',
      phenomena: 'Fenomenen'
    },
    search: {
      label: 'zoeken naar het adres ...',
      noResult: 'Sorry, dat adres kon niet worden gevonden.'
    }
  },
  listSelection: {
    header: 'Kies een tijdreeks door lijst',
    headers: {
      category: 'Categorie',
      station: 'Station',
      phenomenon: 'Fenomeen',
      procedure: 'Sensor'
    },
    warning: {
      moreThanOneTimeseries: 'Er voldeden meer dan één tijdreeks'
    }
  },
  legend: {
    entry: {
      noData: 'geen gegevens beschikbaar',
      jumpToLastValue: 'Ga naar de laatste waarde',
      firstValueAt: 'Eerste waarde',
      lastValueAt: 'Laatste waarde bij'
    }
  },
  export: {
    label: 'Gegevens als CSV (zip-archief)'
  },
  timeSelection: {
    header: 'Time Range',
    presetsHeader: 'presets',
    presets: {
      lastHour: 'afgelopen uur',
      today: 'vandaag',
      yesterday: 'gisteren',
      todayYesterday: 'vandaag en gisteren',
      thisWeek: 'deze week',
      lastWeek: 'vorige week',
      thisMonth: 'deze maand',
      lastMonth: 'vorige maand',
      thisYear: 'dit jaar',
      lastYear: 'vorig jaar'
    },
    custom: {
      header: 'gewoonte',
      start: 'Startdatum',
      end: 'Einddatum'
    },
    warning: {
      startBeforeEnd: 'De startdatum kan niet groter zijn dan de einddatum',
      maxTimeRange: 'De tijd bereik kan niet groter zijn dan één jaar'
    }
  },
  styleChange: {
    header: 'Stijl wijzigen',
    currentColor: 'Huidige kleur',
    selectColor: 'Selecteer een nieuwe kleur',
    selectBarInterval: 'Selecteer de bar interval',
    barChartInterval: {
      hour: 'Uur',
      day: 'Dag',
      week: 'Week',
      month: 'Maand'
    },
    zeroScaled: 'zero geschaald Y-as',
    groupedAxis: 'gegroepeerd as'
  },
  settings: {
    header: 'Instellingen',
    chooseLanguage: 'Andere talen',
    requiresRestart: 'Moet Restart!',
    permalink: {
      create: 'Maak een permalink als',
      inWindow: 'link in een nieuw venster',
      inMail: 'link in een e-mail',
      inClipboard: 'Link naar het klembord',
      clipboardInfo: 'Kopiëren naar het klembord:',
      inQrCode: 'als QR-Code',
      favorite: 'Opslaan werkomgeving als favoriet binnenkomst'
    },
    clusterMarker: 'cluster marker',
    markerWithLastInfo: {
      header: 'marker met de laatste waarde informatie',
      label: 'aandacht - enkele data provider zijn erg traag'
    },
    saveStatus: {
      header: 'Opslaan milieu',
      label: 'Alle tijdreeks, in de geselecteerde periode en de instellingen worden continu opgeslagen.'
    },
    resetStatus: 'Reset milieu',
    generalizeData: 'generaliseren Gegevens',
    imprint: {
      header: 'Afdruk',
      github: 'Vind dit project op <a href="https://github.com/52North/js-sensorweb-client" target="_blank">GitHub</a>',
      text: '<p> <a href="http://52north.org" target="_blank">52 ° Noord GmbH</a> is verantwoordelijk voor deze website. </p><p> 52 ° Noord initiatief voor Geospatial Open Source Software GmbH <br> Martin-Luther-King-Weg 24 <br> 48155 Münster, Duitsland </p>'
    }
  },
  permalink: {
    noMatchingTimeseriesFound: 'Geen bijpassende tijdreeksen wordt gevonden.'
  },
  guide: {
    start: {
      request: 'Wanneer je deze handleiding beginnen, zal de de huidige stand gereset.'
    },
    step1: {
      header: 'JavaScript Client - Guided Tour',
      text: 'Deze tour geeft in een paar stappen een overzicht hoe u deze client gebruiken. Eerste voegen we een tijdreeks van de kaart.'
    },
    step2: {
      header: 'Ga naar de kaart',
      text: 'Hier wisselen we het oog op een kaart te krijgen.'
    },
    step3: {
      header: 'Kaartweergave',
      text: 'Dit is de kaartweergave. In de kaart kunt u markeringen of markergroups zien.'
    },
    step4: {
      header: 'Verandering Provider',
      text: 'Hier kunt u een andere tijdreeksen provider te kiezen.'
    },
    step5: {
      header: 'Toon locatie',
      text: 'En hier kunt u uw apparaat op de kaart.'
    },
    step6: {
      header: 'Lijst selectie',
      text: 'Hier kunt u een tijdreeks kiezen uit geordende lijsten.'
    },
    step7: {
      header: 'Selecteer een zender',
      text: 'Selecteer nu een zender op de kaart.'
    },
    step8: {
      header: 'Kies een tijdreeks',
      text: 'Schakel dit vakje. Als er slechts één tijdreeks voor dit station, wordt het selectievakje is ingeschakeld. Nu kun je verder gaan met de &quot;OK&quot; knop om de tijdreeksen te laden.'
    },
    step9: {
      header: 'Legende binnenkomst',
      text: 'Hier zie je de toegevoegde tijdreeksen. U kunt verwijderen of zoek de tijdreeks of de kleur.'
    },
    step10: {
      header: 'Tabel',
      text: 'Dit is de grafiek van de geselecteerde tijdreeksen.'
    },
    step11: {
      header: 'Tijd wijzigen',
      text: 'Hier kunt u de tijd die mate veranderen voor uw geselecteerde tijdreeksen.'
    },
    step12: {
      header: 'Table View',
      text: 'Hier krijg je een tabel van de ruwe data waarden aan uw geselecteerde tijdreeksen.'
    },
    step13: {
      header: 'Favoriete beheer',
      text: 'De legende inzendingen / tijdreeks kan worden opgeslagen als favorieten. In deze visie alle favorieten zijn opgenomen en kon worden gehandhaafd.'
    },
    step14: {
      header: 'Afgewerkt',
      text: 'Goed gedaan! <br> Deze opdrachtgever is een product van <a href="http://52north.org" target="_blank">52 ° Noord GmbH</a> . U kunt de broncode op zoek <a href="https://github.com/52North/js-sensorweb-client" target="_blank">GitHub</a> .'
    }
  },
  favorite: {
    firstValueAt: 'Eerste waarde',
    lastValueAt: 'Laatste waarde bij',
    label: 'favoriet',
    edit: {
      header: 'Favoriet bewerken'
    },
    group: {
      add: 'De status &#39;{0}&#39; wordt toegevoegd aan de lijst met favorieten.',
      exists: 'Deze status bestaat nog steeds.',
      noTimeseries: 'Geen tijdreeksen worden geselecteerd.',
      notSupported: 'De aanbieder van een vermelding van de status &#39;{0}&#39; wordt niet ondersteund en kan niet worden geladen.'
    },
    single: {
      add: 'Een nieuwe favoriet &#39;{0}&#39; wordt toegevoegd aan de lijst.',
      remove: 'De favoriete &#39;{0}&#39; is verwijderd.',
      exists: 'Deze favoriete bestaat nog steeds.',
      notSupported: 'De aanbieder van de favoriete &#39;{0}&#39; wordt niet ondersteund en kan niet worden geladen.'
    },
    import: {
      override: 'Wilt u uw huidige favorieten overschrijven?',
      wrongFile: 'Kon het bestand niet lezen',
      noValidJson: 'De JSON-bestand is niet geldig!',
      header: 'Favorieten import',
      text: 'Hier kunt u uw geëxporteerde favorieten importeren. Net plak de JSON in dit tekstveld:'
    },
    export: {
      header: 'Favorieten export',
      text: 'Hier kunt u uw favorieten exporteren. Kopieer de JSON uit dit tekstvak en opslaan in een bestand om het later te importeren:'
    },
    error: {
      fileApiNotSupported: 'De File API&#39;s worden niet volledig ondersteund in deze browser.'
    }
  },
  inform: {
    error: 'Er is een fout opgetreden:',
    warn: 'Vergeet niet dat:'
  }
};
