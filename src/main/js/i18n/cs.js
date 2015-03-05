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
i18n.cs = {
  fullName: 'Angličtina',
  ok: 'OK',
  main: {
    legend: 'Legenda',
    diagram: 'Diagram',
    mapView: 'Zobrazení mapy',
    favoriteView: 'Oblíbené',
    settings: 'Nastavení',
    stationSelection: 'Vyberte stanici',
    chartView: 'Pohled Chart',
    allPhenomena: 'Všechny jevy',
    phenomenon: 'Jev',
    favoritesList: 'Oblíbené',
    importFavorites: 'Import',
    exportFavorites: 'Export',
    importExportHelp: 'Chcete-li importovat soubor, vyberte soubor, který jste exportovali dříve.',
    noFileSelected: 'Nebyl vybrán žádný soubor'
  },
  chart: {
    noTimeseriesSelected: 'Vybrali jste žádné TimeSeries, vybrané TimeSeries nemají hodnoty v daném časovém rozmezí nebo TimeSeries jsou skryté.',
    outsideOfDataRange: 'Mimo oblast dat!',
    annotation: 'Údaje bez záruky!',
    monthNames: {
      0: 'Leden',
      1: 'Únor',
      2: 'Kazit',
      3: 'Dubna',
      4: 'Květen',
      5: 'Června',
      6: 'Července',
      7: 'Srpna',
      8: 'Sep',
      9: 'Říjen',
      10: 'Listopad',
      11: 'Prosince'
    }
  },
  table: {
    time: 'Čas'
  },
  map: {
    userLocation: 'Tady je vaše aktuální poloha',
    stationSelection: {
      station: 'Stanice',
      selectAllTimeseries: 'vybrat všechny TimeSeries'
    },
    stationLocation: {
      station: 'Stanice',
      timeseries: 'TimeSeries',
      provider: 'Poskytovatel',
      jumpBackToChart: 'zpět do grafu'
    },
    providerList: {
      provider: 'Poskytovatel',
      stations: 'Stanice',
      timeseries: 'TimeSeries',
      phenomena: 'Jevy'
    },
    search: {
      label: 'hledat adresu ...',
      noResult: 'Je nám líto, že adresa nebyla nalezena.'
    }
  },
  listSelection: {
    header: 'Vyberte TimeSeries podle seznamu',
    headers: {
      category: 'Kategorie',
      station: 'Stanice',
      phenomenon: 'Jev',
      procedure: 'Senzor'
    },
    warning: {
      moreThanOneTimeseries: 'nalezeno více než jeden TimeSeries'
    }
  },
  legend: {
    entry: {
      noData: 'k dispozici žádné údaje',
      jumpToLastValue: 'skok na poslední hodnotě',
      firstValueAt: 'První hodnota v',
      lastValueAt: 'Poslední hodnota při'
    }
  },
  export: {
    label: 'Data ve formátu CSV (Zip archiv)'
  },
  timeSelection: {
    header: 'Časový rozsah',
    presetsHeader: 'Předvolby',
    presets: {
      lastHour: 'Poslední hodina',
      today: 'dnes',
      yesterday: 'včera',
      todayYesterday: 'dnes a včera',
      thisWeek: 'tento týden',
      lastWeek: 'minulý týden',
      thisMonth: 'tento měsíc',
      lastMonth: 'minulý měsíc',
      thisYear: 'tento rok',
      lastYear: 'loni'
    },
    custom: {
      header: 'zvyk',
      start: 'Datum zahájení',
      end: 'Datum ukončení'
    },
    warning: {
      startBeforeEnd: 'Datum zahájení nemůže být větší, než je datum ukončení',
      maxTimeRange: 'Časový rozsah nemůže být větší než jeden rok'
    }
  },
  styleChange: {
    header: 'Změnit styl',
    currentColor: 'Aktuální barva',
    selectColor: 'Vyberte nové barvy',
    selectBarInterval: 'Vyberte bar interval',
    barChartInterval: {
      hour: 'Hodina',
      day: 'Den',
      week: 'Týden',
      month: 'Měsíc'
    },
    zeroScaled: 'nula šupinatý osa y',
    groupedAxis: 'seskupené osa'
  },
  settings: {
    header: 'Nastavení',
    chooseLanguage: 'Přepnout jazyk',
    requiresRestart: 'Potřebuje Restart!',
    permalink: {
      create: 'Vytvořit Permalink jako',
      inWindow: 'odkaz v novém okně',
      inMail: 'odkaz v e-mailu',
      inClipboard: 'Odkaz do schránky',
      clipboardInfo: 'Kopírovat do schránky:',
      inQrCode: 'as QR-Code',
      favorite: 'Uložit pracovní prostředí jako oblíbené položky'
    },
    clusterMarker: 'klastr značka',
    markerWithLastInfo: {
      header: 'značkovač s informacemi poslední hodnotu',
      label: 'pozor - některé poskytovatele dat je velmi pomalé'
    },
    saveStatus: {
      header: 'Save prostředí',
      label: 'Všechny TimeSeries, vybraný OBDOBÍ a nastavení jsou uloženy kontinuální.'
    },
    resetStatus: 'Obnovit prostředí',
    generalizeData: 'zobecnit dat',
    imprint: {
      header: 'Otisk',
      github: 'Najít tento projekt na <a href="https://github.com/52North/js-sensorweb-client" target="_blank">GitHub</a>',
      text: '<p> <a href="http://52north.org" target="_blank">52 ° severní GmbH</a> je zodpovědný za tuto webovou stránku. </p><p> 52 ° severní Initiative for Geospatial Open Source Software GmbH <br> Martin-Luther-King-Weg 24 <br> 48155 Münster, Německo </p>'
    }
  },
  permalink: {
    noMatchingTimeseriesFound: 'Bez odpovídající TimeSeries je nalezen.'
  },
  guide: {
    start: {
      request: 'Při spuštění tohoto průvodce, bude současný stav obnovit.'
    },
    step1: {
      header: 'JavaScript Client - Komentovaná prohlídka',
      text: 'Tato prohlídka poskytuje v několika krocích přehled, jak používat tuto klienta. Nejprve přidáme TimeSeries z mapy.'
    },
    step2: {
      header: 'Přejít na mapu',
      text: 'Zde se přepnout zobrazení získat mapy.'
    },
    step3: {
      header: 'Zobrazení mapy',
      text: 'To je zobrazení mapy. V mapě si můžete prohlédnout značky nebo markergroups.'
    },
    step4: {
      header: 'Změna dodavatele',
      text: 'Zde si můžete vybrat jiný TimeSeries provozovatele.'
    },
    step5: {
      header: 'Show umístění',
      text: 'A zde si můžete najít svůj přístroj na mapě.'
    },
    step6: {
      header: 'Výběr Seznam',
      text: 'Zde si můžete vybrat TimeSeries z objednaných seznamů.'
    },
    step7: {
      header: 'Vyberte stanici',
      text: 'Vyberte nyní stanici na mapě.'
    },
    step8: {
      header: 'Vybrat TimeSeries',
      text: 'Zaškrtněte toto políčko. Pokud je pouze jeden TimeSeries na této stanici, políčko je již kontrolována. Nyní můžete jít na tlačítkem &quot;OK&quot; načíst TimeSeries.'
    },
    step9: {
      header: 'Vstup Legend',
      text: 'Zde vidíte přidané časové řady. Můžete odstranit nebo najít časovou řadu, nebo změnit barvu.'
    },
    step10: {
      header: 'Graf',
      text: 'To je schéma vybrané časové řady.'
    },
    step11: {
      header: 'Změnit čas',
      text: 'Zde si můžete změnit rozsah času pro zvolené časové řady.'
    },
    step12: {
      header: 'Table View',
      text: 'Zde máte tabulku surových datových hodnot k vybranému časové řady.'
    },
    step13: {
      header: 'Oblíbený řízení',
      text: 'Položky Legenda / TimeSeries mohou být uloženy jako oblíbené. V tomto pohledu jsou všechny oblíbené uvedeny a může být zachována.'
    },
    step14: {
      header: 'Dokončeno',
      text: 'Výborně! <br> Tento klient je produkt <a href="http://52north.org" target="_blank">52 ° severní GmbH</a> . Zde můžete najít zdrojový kód na <a href="https://github.com/52North/js-sensorweb-client" target="_blank">GitHub</a> .'
    }
  },
  favorite: {
    firstValueAt: 'První hodnota v',
    lastValueAt: 'Poslední hodnota při',
    label: 'oblíbený',
    edit: {
      header: 'Upravit oblíbené'
    },
    group: {
      add: 'Stav &#39;{0}&#39; je přidán do seznamu oblíbených.',
      exists: 'Tento stav stále existuje.',
      noTimeseries: 'V současné době jsou vybrány žádné TimeSeries.',
      notSupported: 'Poskytovatel zápisu stavu &#39;{0}&#39; není podporováno a nelze načíst.'
    },
    single: {
      add: 'Nový oblíbený &#39;{0}&#39; je přidán do seznamu.',
      remove: 'Oblíbené &#39;{0}&#39; se odstraní.',
      exists: 'Tento oblíbený stále existuje.',
      notSupported: 'Poskytovatel favorita &#39;{0}&#39; není podporováno a nelze načíst.'
    },
    import: {
      override: 'Chcete přepsat aktuální oblíbené?',
      wrongFile: 'Nelze přečíst soubor',
      noValidJson: 'Soubor JSON není platný!',
      header: 'Importovat oblíbené',
      text: 'Zde si můžete importovat exportované oblíbené. Stačí vložit JSON v tomto textovém poli:'
    },
    export: {
      header: 'Export oblíbené',
      text: 'Zde si můžete exportovat své oblíbené. Stačí pouze zkopírovat JSON z tohoto textového pole a uložit do souboru, aby ji později importovat:'
    },
    error: {
      fileApiNotSupported: 'API souborů nejsou plně podporovány v tomto prohlížeči.'
    }
  },
  inform: {
    error: 'Došlo k chybě:',
    warn: 'Mějte prosím na paměti, že:'
  }
};
