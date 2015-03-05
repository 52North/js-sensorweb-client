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
i18n.da = {
  fullName: 'Engelsk',
  ok: 'OK',
  main: {
    legend: 'Legend',
    diagram: 'Diagram',
    mapView: 'Kortvisning',
    favoriteView: 'Foretrukne',
    settings: 'Indstillinger',
    stationSelection: 'Vælg en station',
    chartView: 'Kortvisning',
    allPhenomena: 'Alle fænomener',
    phenomenon: 'Phenomenon',
    favoritesList: 'Foretrukne',
    importFavorites: 'Import',
    exportFavorites: 'Eksport',
    importExportHelp: 'For at importere en fil, skal du vælge en fil, du eksporterede før.',
    noFileSelected: 'Ingen fil er valgt'
  },
  chart: {
    noTimeseriesSelected: 'Du har valgt ikke Timeseries, de valgte Timeseries har ingen værdier i det givne tidsinterval eller Timeseries er skjult.',
    outsideOfDataRange: 'Uden for dataområde!',
    annotation: 'Data uden garanti!',
    monthNames: {
      0: 'Jan',
      1: 'Februar',
      2: 'Mar',
      3: 'April',
      4: 'Maj',
      5: 'Juni',
      6: 'Juli',
      7: 'August',
      8: 'September',
      9: 'Oktober',
      10: 'November',
      11: 'December'
    }
  },
  table: {
    time: 'Tid'
  },
  map: {
    userLocation: 'Her er din aktuelle placering',
    stationSelection: {
      station: 'Station',
      selectAllTimeseries: 'vælge alle Timeseries'
    },
    stationLocation: {
      station: 'Station',
      timeseries: 'Timeseries',
      provider: 'Provider',
      jumpBackToChart: 'Tilbage til diagram'
    },
    providerList: {
      provider: 'Provider',
      stations: 'Stationer',
      timeseries: 'Timeseries',
      phenomena: 'Phenomena'
    },
    search: {
      label: 'søge efter adresse ...',
      noResult: 'Beklager, kunne denne adresse ikke findes.'
    }
  },
  listSelection: {
    header: 'Vælg Timeseries ved liste',
    headers: {
      category: 'Kategori',
      station: 'Station',
      phenomenon: 'Phenomenon',
      procedure: 'Sensor'
    },
    warning: {
      moreThanOneTimeseries: 'fundet mere end én Timeseries'
    }
  },
  legend: {
    entry: {
      noData: 'Ingen data til rådighed',
      jumpToLastValue: 'springe til sidste værdi',
      firstValueAt: 'Første værdi på',
      lastValueAt: 'Sidste værdi på'
    }
  },
  export: {
    label: 'Data, som CSV (zip arkiv)'
  },
  timeSelection: {
    header: 'Time Range',
    presetsHeader: 'forudindstillinger',
    presets: {
      lastHour: 'sidste time',
      today: 'i dag',
      yesterday: 'i går',
      todayYesterday: 'i dag &amp; i går',
      thisWeek: 'denne uge',
      lastWeek: 'sidste uge',
      thisMonth: 'denne måned',
      lastMonth: 'sidste måned',
      thisYear: 'år',
      lastYear: 'sidste år'
    },
    custom: {
      header: 'skik',
      start: 'Startdato',
      end: 'Slutdato'
    },
    warning: {
      startBeforeEnd: 'Startdatoen kan ikke være større end slutdatoen',
      maxTimeRange: 'Tidsintervallet kan ikke være større end et år'
    }
  },
  styleChange: {
    header: 'Skift stil',
    currentColor: 'Nuværende farve',
    selectColor: 'Vælg en ny farve',
    selectBarInterval: 'Vælg bar interval',
    barChartInterval: {
      hour: 'Time',
      day: 'Dag',
      week: 'Uge',
      month: 'Måned'
    },
    zeroScaled: 'nul skaleret Y-akse',
    groupedAxis: 'grupperede akse'
  },
  settings: {
    header: 'Indstillinger',
    chooseLanguage: 'Skift sprog',
    requiresRestart: 'Behov Genstart!',
    permalink: {
      create: 'Opret en permalink som',
      inWindow: 'link i et nyt vindue',
      inMail: 'link i en e-mail',
      inClipboard: 'Link til udklipsholder',
      clipboardInfo: 'Kopier til udklipsholder:',
      inQrCode: 'som QR-kode',
      favorite: 'Gem arbejdsmiljø som favorit post'
    },
    clusterMarker: 'klynge markør',
    markerWithLastInfo: {
      header: 'markør med sidste værdi information',
      label: 'opmærksomhed - nogle dataleverandør er meget langsom'
    },
    saveStatus: {
      header: 'Gem miljø',
      label: 'Alle Timeseries, den valgte timespan og indstillingerne gemmes kontinuerligt.'
    },
    resetStatus: 'Reset miljø',
    generalizeData: 'generalisere data',
    imprint: {
      header: 'Imprint',
      github: 'Find dette projekt på <a href="https://github.com/52North/js-sensorweb-client" target="_blank">GitHub</a>',
      text: '<p> <a href="http://52north.org" target="_blank">52 ° North GmbH</a> er ansvarlig for dette websted. </p><p> 52 ° North initiativ for Geospatial Open Source Software GmbH <br> Martin-Luther-King-Weg 24 <br> 48155 Muenster, Tyskland </p>'
    }
  },
  permalink: {
    noMatchingTimeseriesFound: 'Ingen matchende Timeseries er fundet.'
  },
  guide: {
    start: {
      request: 'Når du starter denne vejledning, vil den aktuelle tilstand nulstilles.'
    },
    step1: {
      header: 'JavaScript klient - Guided Tour',
      text: 'Denne tur giver i et par skridt overblik, hvordan du bruger denne klient. Først tilføjer vi en Timeseries fra kortet.'
    },
    step2: {
      header: 'Gå til kortet',
      text: 'Her skifter vi udsigten til at få et kort.'
    },
    step3: {
      header: 'Kortvisning',
      text: 'Dette er kortet. I kortet kan du se markører eller markergroups.'
    },
    step4: {
      header: 'Skift Provider',
      text: 'Her kan du vælge en anden Timeseries udbyder.'
    },
    step5: {
      header: 'Vis beliggenhed',
      text: 'Og her kan du finde din enhed på kortet.'
    },
    step6: {
      header: 'Valgliste',
      text: 'Her kan du vælge en Timeseries ud af ordnede lister.'
    },
    step7: {
      header: 'Vælg en station',
      text: 'Vælg nu en station på kortet.'
    },
    step8: {
      header: 'Vælg Timeseries',
      text: 'Marker dette afkrydsningsfelt. Hvis der kun er én Timeseries til denne station, er afkrydsningsfeltet allerede er markeret. Nu kan du gå videre med &quot;OK&quot; -knappen for at indlæse Timeseries.'
    },
    step9: {
      header: 'Legend post',
      text: 'Her ses serien den ekstra tid. Du kan slette eller finde tidsserien eller ændre farven.'
    },
    step10: {
      header: 'Chart',
      text: 'Dette er diagram af serien den valgte tid.'
    },
    step11: {
      header: 'Skift tid',
      text: 'Her kan du ændre tidspunktet omfang til serie valgte tid.'
    },
    step12: {
      header: 'Table View',
      text: 'Her får du en oversigt over de rå dataværdier til serie valgte tid.'
    },
    step13: {
      header: 'Favorit ledelse',
      text: 'Legenden indgange / Timeseries kunne gemmes som favoritter. I denne visning alle favoritter er opført og kunne opretholdes.'
    },
    step14: {
      header: 'Færdig',
      text: 'Godt gået! <br> Denne klient er et produkt af <a href="http://52north.org" target="_blank">52 ° North GmbH</a> . Du kan finde kildekoden på <a href="https://github.com/52North/js-sensorweb-client" target="_blank">GitHub</a> .'
    }
  },
  favorite: {
    firstValueAt: 'Første værdi på',
    lastValueAt: 'Sidste værdi på',
    label: 'favorit',
    edit: {
      header: 'Rediger favorit'
    },
    group: {
      add: 'Status &#39;{0}&#39; føjes til favoritlisten.',
      exists: 'Denne status stadig eksisterer.',
      noTimeseries: 'I øjeblikket ingen Timeseries er valgt.',
      notSupported: 'Udbyderen af ​​en post af status &#39;{0}&#39; er ikke understøttet og kan ikke indlæses.'
    },
    single: {
      add: 'En ny favorit &#39;{0}&#39; er føjet til listen.',
      remove: 'Den foretrukne &#39;{0}&#39; er fjernet.',
      exists: 'Denne favorit eksisterer stadig.',
      notSupported: 'Udbyderen af ​​foretrukne &#39;{0}&#39; er ikke understøttet og kan ikke indlæses.'
    },
    import: {
      override: 'Har du lyst til at tilsidesætte dine nuværende favoritter?',
      wrongFile: 'Kunne ikke læse filen',
      noValidJson: 'Den JSON fil er ikke gyldig!',
      header: 'Importer favoritter',
      text: 'Her kan du importere dine eksporterede favoritter. Bare indsæt JSON i dette tekstfelt:'
    },
    export: {
      header: 'Eksport favoritter',
      text: 'Her kan du eksportere dine favoritter. Bare kopiere JSON ud af dette tekstfelt og gemme det i en fil til at importere det senere:'
    },
    error: {
      fileApiNotSupported: 'Filen API&#39;er er ikke fuldt understøttet i denne browser.'
    }
  },
  inform: {
    error: 'Der opstod en fejl:',
    warn: 'Husk, at:'
  }
};
