i18n.et = {
  fullName: 'Inglise',
  ok: 'Korras',
  main: {
    legend: 'Legend',
    diagram: 'Skeem',
    mapView: 'Kaart vaade',
    favoriteView: 'Lemmikud',
    settings: 'Seaded',
    stationSelection: 'Valige jaama',
    chartView: 'Graafiku vaade',
    allPhenomena: 'Kõik Nähtused',
    phenomenon: 'Nähtus',
    favoritesList: 'Lemmikud',
    importFavorites: 'Import',
    exportFavorites: 'Eksport',
    importExportHelp: 'Faili importimiseks, palun vali fail, mida eksporditakse varem.',
    noFileSelected: 'Faili pole valitud'
  },
  chart: {
    noTimeseriesSelected: 'Oled valinud ei timeseries, valitud timeseries pole väärtused antud aja piires või timeseries on peidetud.',
    outsideOfDataRange: 'Väljaspool andmete valikut!',
    annotation: 'Andmed ilma garantii!',
    monthNames: {
      0: 'Jan',
      1: 'Veebruar',
      2: 'Moonutama',
      3: 'Aprill',
      4: 'Mai',
      5: 'Juuni',
      6: 'Juuli',
      7: 'August',
      8: 'September',
      9: 'Oktoober',
      10: 'November',
      11: 'Detsember'
    }
  },
  table: {
    time: 'Aeg'
  },
  map: {
    userLocation: 'Siin on teie praegune asukoht',
    stationSelection: {
      station: 'Jaam',
      selectAllTimeseries: 'vali kõik timeseries'
    },
    stationLocation: {
      station: 'Jaam',
      timeseries: 'Timeseries',
      provider: 'Tarnija',
      jumpBackToChart: 'tagasi skeem'
    },
    providerList: {
      provider: 'Tarnija',
      stations: 'Jaamad',
      timeseries: 'Timeseries',
      phenomena: 'Nähtused'
    },
    search: {
      label: 'otsi aadress ...',
      noResult: 'Vabandame, et aadress ei leitud.'
    }
  },
  listSelection: {
    header: 'Vali timeseries nimekirja järgi',
    headers: {
      category: 'Kategooria',
      station: 'Jaam',
      phenomenon: 'Nähtus',
      procedure: 'Andur'
    },
    warning: {
      moreThanOneTimeseries: 'leidis rohkem kui üks timeseries'
    }
  },
  legend: {
    entry: {
      noData: 'andmed ei ole kättesaadavad',
      jumpToLastValue: 'Viimasele väärtus',
      firstValueAt: 'Esiteks väärtus',
      lastValueAt: 'Viimati väärtus'
    }
  },
  export: {
    label: 'Andmed CSV (Zip Archive)'
  },
  timeSelection: {
    header: 'Ajavahemik',
    presetsHeader: 'presets',
    presets: {
      lastHour: 'Viimase tunni jooksul',
      today: 'täna',
      yesterday: 'eile',
      todayYesterday: 'täna ja eile',
      thisWeek: 'Sel nädalal',
      lastWeek: 'Eelmisel nädalal',
      thisMonth: 'sel kuul',
      lastMonth: 'viimase kuu jooksul',
      thisYear: 'Sel aastal',
      lastYear: 'mullu'
    },
    custom: {
      header: 'tava',
      start: 'Alguskuupäev',
      end: 'Lõppkuupäev'
    },
    warning: {
      startBeforeEnd: 'Alguskuupäev ei tohi olla suurem kui lõppkuupäev',
      maxTimeRange: 'Ajavahemik ei tohi olla suurem kui üks aasta'
    }
  },
  styleChange: {
    header: 'Muuda stiili',
    currentColor: 'Praegune värv',
    selectColor: 'Vali uus värv',
    selectBarInterval: 'Vali baar intervalli',
    barChartInterval: {
      hour: 'Tund',
      day: 'Päev',
      week: 'Nädal',
      month: 'Kuu'
    },
    zeroScaled: 'null korrastatakse Y-telg',
    groupedAxis: 'grupeeritud telje'
  },
  settings: {
    header: 'Seaded',
    chooseLanguage: 'Vaheta keelt',
    requiresRestart: 'Vajab Restart!',
    permalink: {
      create: 'Loo permalink kui',
      inWindow: 'link uues aknas',
      inMail: 'link e-posti',
      inClipboard: 'Link lõikelauale',
      clipboardInfo: 'Kopeeri lõikelauale:',
      inQrCode: 'nagu QR-kood',
      favorite: 'Säästa töökeskkonda lemmiktöö'
    },
    clusterMarker: 'klastri marker',
    markerWithLastInfo: {
      header: 'marker eelmise väärtuse kohta',
      label: 'tähelepanu - mõned andmed pakkuja on väga aeglane'
    },
    saveStatus: {
      header: 'Save keskkond',
      label: 'Kõik timeseries, valitud ajavahemiku ja sätted salvestatakse pidevalt.'
    },
    resetStatus: 'Taasta keskkond',
    generalizeData: 'üldistada andmed',
    imprint: {
      header: 'Jälg',
      github: 'Leia selle projekti juures <a href="https://github.com/52North/js-sensorweb-client" target="_blank">github</a>',
      text: '<p> <a href="http://52north.org" target="_blank">52 ° North GmbH</a> vastutab sellel veebilehel. </p><p> 52 ° North algatus Geospatial Open Source Software GmbH <br> Martin-Luther-King-Weg 24 <br> 48155 Münster, Saksamaa </p>'
    }
  },
  permalink: {
    noMatchingTimeseriesFound: 'Vastavaid timeseries leitakse.'
  },
  guide: {
    start: {
      request: 'Kui hakkad seda juhendit, hetkeseisu nullitakse.'
    },
    step1: {
      header: 'JavaScript Klient - tutvustust',
      text: 'See ekskursioon annab mõne sammu ülevaate, kuidas kasutada seda kliendile. Esiteks lisame timeseries kaardilt.'
    },
    step2: {
      header: 'Mine kaart',
      text: 'Siin me vahetada, et saada kaart.'
    },
    step3: {
      header: 'Kaart vaade',
      text: 'See on kaardi vaade. Kaardil näed markerid või markergroups.'
    },
    step4: {
      header: 'Muuda Provider',
      text: 'Siin saab valida mõne muu timeseries poole.'
    },
    step5: {
      header: 'Näita asukohta',
      text: 'Ja siin võite leida oma seadme kaardil.'
    },
    step6: {
      header: 'Eesti valik',
      text: 'Siin saab valida timeseries välja tellitud nimekirja.'
    },
    step7: {
      header: 'Valige jaama',
      text: 'Palun valige nüüd jaam kaardil.'
    },
    step8: {
      header: 'Vali timeseries',
      text: 'Valige see märkeruut. Kui on ainult üks timeseries selle jaama kast on märkimata. Nüüd võite minna koos &quot;OK&quot; nuppu, et laadida timeseries.'
    },
    step9: {
      header: 'Legend kirje',
      text: 'Siin on näha lisatud aegread. Saate kustutada või leida aegrea või muuta värvi.'
    },
    step10: {
      header: 'Skeem',
      text: 'See on skeem, mis on valitud aegread.'
    },
    step11: {
      header: 'Muuda aeg',
      text: 'Siin saab muuta aega määral Valitud aegread.'
    },
    step12: {
      header: 'Table View',
      text: 'Siin saad tabel algandmed väärtused valitud aegread.'
    },
    step13: {
      header: 'Lemmik juhtimine',
      text: 'Legend sissekanded / timeseries saab salvestada lemmikuid. Seda silmas pidades kõik lemmikutesse loetletud ja mida saab säilitada.'
    },
    step14: {
      header: 'Lõpetas',
      text: 'Hästi tehtud! <br> See klient on toode <a href="http://52north.org" target="_blank">52 ° North GmbH</a> . Leiate lähtekoodi <a href="https://github.com/52North/js-sensorweb-client" target="_blank">github</a> .'
    }
  },
  favorite: {
    firstValueAt: 'Esiteks väärtus',
    lastValueAt: 'Viimati väärtus',
    label: 'lemmik',
    edit: {
      header: 'Edit lemmik'
    },
    group: {
      add: 'Status &#39;{0}&#39; on lisatud lemmikute nimekirja.',
      exists: 'See seisund on endiselt olemas.',
      noTimeseries: 'Praegu ei ole timeseries on valitud.',
      notSupported: 'Pakkuja kandmise staatuse &quot;{0}&quot; ei toetata ja ei saa laadida.'
    },
    single: {
      add: 'Uus lemmik &quot;{0}&quot; on loendisse lisatud.',
      remove: 'Lemmik &#39;{0}&#39; on eemaldatud.',
      exists: 'See lemmik on endiselt olemas.',
      notSupported: 'Pakkuja lemmik &quot;{0}&quot; ei toetata ja ei saa laadida.'
    },
    import: {
      override: 'Kas soovite tühistada oma praeguse nimekirja?',
      wrongFile: 'Ei saa lugeda faili',
      noValidJson: 'JSON faili ei kehti!',
      header: 'Import nimekirja',
      text: 'Siin saate importida oma eksporditud lemmikud. Just kleebi JSON selles tekstiväli:'
    },
    export: {
      header: 'Ekspordi lemmikud',
      text: 'Siin saate eksportida oma lemmikuks. Lihtsalt kopeeri JSON läbi selle tekstikasti ja salvestage see fail importida seda hiljem:'
    },
    error: {
      fileApiNotSupported: 'Faili API ei ole täielikult toetatud selles brauserit.'
    }
  },
  inform: {
    error: 'Tekkis viga:',
    warn: 'Pidage meeles, et:'
  }
};
