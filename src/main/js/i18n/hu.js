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
i18n.hu = {
  fullName: 'Angol',
  ok: 'Rendben',
  main: {
    legend: 'Legenda',
    diagram: 'Diagram',
    mapView: 'Térkép nézet',
    favoriteView: 'Kedvencek',
    settings: 'Beállítások',
    stationSelection: 'Válasszon ki egy állomást',
    chartView: 'Diagram nézet',
    allPhenomena: 'Minden jelenség',
    phenomenon: 'Jelenség',
    favoritesList: 'Kedvencek',
    importFavorites: 'Import',
    exportFavorites: 'Export',
    importExportHelp: 'Fájl importálásához, válasszon egy exportált fájlt előtt.',
    noFileSelected: 'Nincs fájl kiválasztva'
  },
  chart: {
    noTimeseriesSelected: 'Nem választott ki előre definiált, a kiválasztott előre definiált nincs értékeket az adott időben tartomány vagy a előre definiált rejtett.',
    outsideOfDataRange: 'Kívül adatok körét!',
    annotation: 'Az adatok garancia nélkül!',
    monthNames: [ 'Január', 'Február', 'Elront', 'Április', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December' ]
  },
  table: {
    time: 'Idő'
  },
  map: {
    userLocation: 'Itt az aktuális tartózkodási helyét',
    stationSelection: {
      station: 'Állomás',
      selectAllTimeseries: 'jelölje ki az összes előre definiált'
    },
    stationLocation: {
      station: 'Állomás',
      timeseries: 'Előre definiált',
      provider: 'Ellátó',
      jumpBackToChart: 'Vissza a chart'
    },
    providerList: {
      provider: 'Ellátó',
      stations: 'Állomások',
      timeseries: 'Előre definiált',
      phenomena: 'Jelenségek'
    },
    search: {
      label: 'címkereséshez ...',
      noResult: 'Sajnáljuk, hogy címet nem található.'
    }
  },
  listSelection: {
    header: 'Válassza ki az előre definiált tömbök által lista',
    headers: {
      category: 'Kategória',
      station: 'Állomás',
      phenomenon: 'Jelenség',
      procedure: 'Érzékelő'
    },
    warning: {
      moreThanOneTimeseries: 'találtak több mint egy előre definiált'
    }
  },
  legend: {
    entry: {
      noData: 'nincs adat',
      jumpToLastValue: 'utolsó értéket',
      firstValueAt: 'Első érték',
      lastValueAt: 'Utolsó érték'
    }
  },
  export: {
    label: 'Az adatok CSV (Zip archívum)'
  },
  timeSelection: {
    header: 'Idő Tartomány',
    presetsHeader: 'előre beállított',
    presets: {
      lastHour: 'az elmúlt órában',
      today: 'ma',
      yesterday: 'tegnap',
      todayYesterday: 'Ma &amp; tegnap',
      thisWeek: 'ezen a héten',
      lastWeek: 'a múlt héten',
      thisMonth: 'ebben a hónapban',
      lastMonth: 'az utolsó hónapban',
      thisYear: 'ebben az évben',
      lastYear: 'tavaly'
    },
    custom: {
      header: 'szokás',
      start: 'Kezdési időpont',
      end: 'A befejezés dátuma'
    },
    warning: {
      startBeforeEnd: 'A kezdő dátum nem lehet nagyobb, mint a befejezés dátumát',
      maxTimeRange: 'Az idő tartomány nem lehet nagyobb, mint egy év'
    }
  },
  styleChange: {
    header: 'Stílus',
    currentColor: 'Jelenlegi színe',
    selectColor: 'Válasszon egy új színt',
    selectBarInterval: 'Válassza ki a vonalat intervallum',
    barChartInterval: {
      hour: 'Óra',
      day: 'Nap',
      week: 'Hét',
      month: 'Hónap'
    },
    zeroScaled: 'zéró pikkelyes Y-tengely',
    groupedAxis: 'csoportosítva tengely'
  },
  settings: {
    header: 'Beállítások',
    chooseLanguage: 'Switch nyelven',
    requiresRestart: 'Újra kell indítani!',
    permalink: {
      create: 'Hozzon létre egy permalink mint',
      inWindow: 'Link új ablakban',
      inMail: 'linkre egy e-mailt',
      inClipboard: 'Hivatkoznak a vágólapra',
      clipboardInfo: 'Másolás a vágólapra:',
      inQrCode: 'mint QR-kód',
      favorite: 'Mentsd munkakörnyezet kedvencként bejegyzés'
    },
    clusterMarker: 'cluster marker',
    markerWithLastInfo: {
      header: 'marker utolsó értéket információk',
      label: 'Figyelem - néhány adatszolgáltató nagyon lassúak'
    },
    saveStatus: {
      header: 'Save környezet',
      label: 'Minden előre definiált, a kiválasztott időtávot és a beállítások mentése folyamatos.'
    },
    resetStatus: 'Reset környezet',
    generalizeData: 'általánosítani adatok',
    imprint: {
      header: 'Impresszum',
      github: 'Keresd meg ezt a projektet <a href="https://github.com/52North/js-sensorweb-client" target="_blank">GitHub</a>',
      text: '<p> <a href="http://52north.org" target="_blank">52 ° North GmbH</a> felelős ezen a weboldalon. </p><p> 52 ° North Initiative for térinformatikai nyílt forráskódú szoftver GmbH <br> Martin-Luther-King-Weg 24 <br> 48155 Münster, Németország </p>'
    }
  },
  permalink: {
    noMatchingTimeseriesFound: 'Nem illő előre definiált található.'
  },
  guide: {
    start: {
      request: 'Amikor elindítja ezt az útmutatót, az a jelenlegi állapot visszaáll.'
    },
    step1: {
      header: 'JavaScript Client - Tárlatvezetés',
      text: 'Ez a túra ad néhány lépésben áttekintést, hogyan kell használni ezt a kliens. Először adjunk hozzá egy előre definiált a térképről.'
    },
    step2: {
      header: 'Menj a térképen',
      text: 'Itt váltani a nézetet, hogy a térképet.'
    },
    step3: {
      header: 'Térkép nézet',
      text: 'Ez a térkép nézet. A térképen látható markerek vagy markergroups.'
    },
    step4: {
      header: 'Change Provider',
      text: 'Itt választhatunk más előre definiált szolgáltatót.'
    },
    step5: {
      header: 'Show location',
      text: 'És itt keresse meg a készülék a térképen.'
    },
    step6: {
      header: 'Lista kiválasztása',
      text: 'Itt lehet kiválasztani a előre definiált ki rendezett listák.'
    },
    step7: {
      header: 'Válasszon ki egy állomást',
      text: 'Kérjük, válasszon most egy állomás a térképen.'
    },
    step8: {
      header: 'Válassza ki az előre definiált tömbök',
      text: 'Válassza ki ezt a jelölőnégyzetet. Ha csak egy előre definiált ennek az állomásnak, a négyzetet bejelölve. Most lehet menni az &quot;OK&quot; gombot betölteni az előre definiált.'
    },
    step9: {
      header: 'Legend bejegyzés',
      text: 'Itt láthatja a hozzá idősorok. Törölheti, vagy keresse az idősor, vagy változtatni a színét.'
    },
    step10: {
      header: 'Táblázat',
      text: 'Ez az ábra a kiválasztott idősorok.'
    },
    step11: {
      header: 'Váltási idő',
      text: 'Itt lehet megváltoztatni az időt mértékben az Ön által választott idősorok.'
    },
    step12: {
      header: 'Táblázat megtekintése',
      text: 'Most itt van egy táblázat a nyers adatok értékeket a kiválasztott idősorok.'
    },
    step13: {
      header: 'Kedvenc menedzsment',
      text: 'A legenda bejegyzések / előre definiált meg lehetne menteni a kedvencek. Ebben a nézetben az összes kedvenc vannak felsorolva, és fenn lehet tartani.'
    },
    step14: {
      header: 'Kész',
      text: 'Szép munka! <br> Ez a kliens egy olyan termék a <a href="http://52north.org" target="_blank">52 ° North GmbH</a> . Megtalálható a forráskódot <a href="https://github.com/52North/js-sensorweb-client" target="_blank">GitHub</a> .'
    }
  },
  favorite: {
    firstValueAt: 'Első érték',
    lastValueAt: 'Utolsó érték',
    label: 'kedvenc',
    edit: {
      header: 'Kedvenc szerkesztése'
    },
    group: {
      add: 'A status &#39;{0}&#39; hozzáadódik a kedvenceid közé.',
      exists: 'Ez az állapot továbbra is fennáll.',
      noTimeseries: 'Jelenleg nincs előre definiált kerülnek kiválasztásra.',
      notSupported: 'A szolgáltató a bejegyzést a status &#39;{0}&#39; nem támogatott és nem lehet betölteni.'
    },
    single: {
      add: 'Egy új kedvenc &quot;{0}&quot; hozzáadódik a listához.',
      remove: 'A kedvenc &#39;{0}&#39; eltávolítása.',
      exists: 'Ez a kedvenc még mindig létezik.',
      notSupported: 'A szolgáltató a kedvenc &#39;{0}&#39; nem támogatott és nem lehet betölteni.'
    },
    import: {
      override: 'Szeretné, hogy felülbírálja az aktuális kedvencek?',
      wrongFile: 'Nem sikerült beolvasni a fájlt',
      noValidJson: 'A JSON fájl nem érvényes!',
      header: 'Import kedvencekhez',
      text: 'Itt lehet importálni az exportált kedvenceket. Csak illessze be a JSON ezen a beviteli mezőbe:'
    },
    export: {
      header: 'Export kedvencekhez',
      text: 'Itt tudja exportálni a kedvenceit. Csak másolja a JSON ki ezt a szövegdobozba, és mentse el egy fájlba importálni később:'
    },
    error: {
      fileApiNotSupported: 'A File API-k nem támogatják maradéktalanul ezt a böngészőt.'
    }
  },
  inform: {
    error: 'Hiba történt:',
    warn: 'Kérjük, ne feledje, hogy:'
  }
};
