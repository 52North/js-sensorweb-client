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
i18n.ro = {
  fullName: 'Engleză',
  ok: 'BINE',
  main: {
    legend: 'Legendă',
    diagram: 'Diagramă',
    mapView: 'Vizualizare hartă',
    favoriteView: 'Favorite',
    settings: 'Setări',
    stationSelection: 'Selectați o stație',
    chartView: 'Vizualizare Grafic',
    allPhenomena: 'Toate fenomenele',
    phenomenon: 'Fenomen',
    favoritesList: 'Favorite',
    importFavorites: 'Import',
    exportFavorites: 'Export',
    importExportHelp: 'Pentru a importa un fișier, vă rugăm să alegeți un fișier exportat înainte.',
    noFileSelected: 'Nici un fișier selectat'
  },
  chart: {
    noTimeseriesSelected: 'Ați selectat nici timeseries, de timeseries selectate nu au valori în intervalul de timp dat sau timeseries sunt ascunse.',
    outsideOfDataRange: 'În afara din gama de date!',
    annotation: 'Datele fără garanție!',
    monthNames: [ 'Jan', 'Februarie', 'Strica', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie' ]
  },
  table: {
    time: 'Timp'
  },
  map: {
    userLocation: 'Iată locația curentă',
    stationSelection: {
      station: 'Stație',
      selectAllTimeseries: 'selecteaza toate timeseries'
    },
    stationLocation: {
      station: 'Stație',
      timeseries: 'Timeseries',
      provider: 'Furnizor',
      jumpBackToChart: 'înapoi la diagramă'
    },
    providerList: {
      provider: 'Furnizor',
      stations: 'Stații',
      timeseries: 'Timeseries',
      phenomena: 'Fenomene'
    },
    search: {
      label: 'caută adresa ...',
      noResult: 'Ne pare rău, că adresa nu a putut fi găsit.'
    }
  },
  listSelection: {
    header: 'Selectați timeseries de listă',
    headers: {
      category: 'Categorie',
      station: 'Stație',
      phenomenon: 'Fenomen',
      procedure: 'Senzor'
    },
    warning: {
      moreThanOneTimeseries: 'a găsit mai mult de un timeseries'
    }
  },
  legend: {
    entry: {
      noData: 'Nu sunt date disponibile',
      jumpToLastValue: 'sări la ultima valoare',
      firstValueAt: 'Primul valoare la',
      lastValueAt: 'Ultima valoare la'
    }
  },
  export: {
    label: 'Datele în format CSV (arhivă)'
  },
  timeSelection: {
    header: 'Intervalul de timp',
    presetsHeader: 'presetări',
    presets: {
      lastHour: 'Ultima oră',
      today: 'astăzi',
      yesterday: 'ieri',
      todayYesterday: 'azi &amp; ieri',
      thisWeek: 'în această săptămână',
      lastWeek: 'săptămâna trecută',
      thisMonth: 'în această lună',
      lastMonth: 'în ultima lună',
      thisYear: 'anul acesta',
      lastYear: 'anul trecut'
    },
    custom: {
      header: 'obicei',
      start: 'Data de început',
      end: 'Data de încheiere'
    },
    warning: {
      startBeforeEnd: 'Data de începere nu poate fi mai mare decât data de sfârșit',
      maxTimeRange: 'Intervalul de timp nu poate fi mai mare decât o ani'
    }
  },
  styleChange: {
    header: 'Schimbarea de stil',
    currentColor: 'Culoare actual',
    selectColor: 'Selectați o culoare nouă',
    selectBarInterval: 'Selectați intervalul de bare',
    barChartInterval: {
      hour: 'Oră',
      day: 'Zi',
      week: 'Săptămână',
      month: 'Lună'
    },
    zeroScaled: 'scalate axa Y la zero',
    groupedAxis: 'Axa grupate'
  },
  settings: {
    header: 'Setări',
    chooseLanguage: 'Schimbă limba',
    requiresRestart: 'Are nevoie de Restart!',
    permalink: {
      create: 'Creați un permalink ca',
      inWindow: 'legătură într-o fereastră nouă',
      inMail: 'link dintr-un e-mail',
      inClipboard: 'Link la clipboard',
      clipboardInfo: 'Copiere în clipboard:',
      inQrCode: 'ca QR-Code',
      favorite: 'Salvați mediul de lucru ca intrare favorit'
    },
    clusterMarker: 'îi trimită grup',
    markerWithLastInfo: {
      header: 'îi trimită cu ultimul informații valoare',
      label: 'atenție - unii furnizor de date sunt foarte lente'
    },
    saveStatus: {
      header: 'Salvați mediu',
      label: 'Toate timeseries, durata de timp selectată și setările sunt salvate continuu.'
    },
    resetStatus: 'Mediu Reset',
    generalizeData: 'generală de date',
    imprint: {
      header: 'Imprima',
      github: 'Găsiți acest proiect la <a href="https://github.com/52North/js-sensorweb-client" target="_blank">GitHub</a>',
      text: '<p> <a href="http://52north.org" target="_blank">52 ° nord GmbH</a> este responsabil pentru acest site. </p><p> 52 ° Inițiativa nord de geospațiale Open Source Software GmbH <br> Martin Luther--King-Weg 24 <br> 48155 Muenster, Germania </p>'
    }
  },
  permalink: {
    noMatchingTimeseriesFound: 'Nu timeseries potrivite este găsit.'
  },
  guide: {
    start: {
      request: 'Când porniți acest ghid, starea actuală va fi resetat.'
    },
    step1: {
      header: 'JavaScript client - Tur',
      text: 'Acest turneu oferă în câțiva pași o imagine de ansamblu modul de utilizare a acestui client. În primul rând vom adăuga o timeseries de pe harta.'
    },
    step2: {
      header: 'Du-te la harta',
      text: 'Aici vom trece vizualizarea pentru a obține o hartă.'
    },
    step3: {
      header: 'Vizualizare hartă',
      text: 'Acesta este punctul de vedere hartă. In harta puteti vedea markere sau markergroups.'
    },
    step4: {
      header: 'Schimbarea Furnizor',
      text: 'Aici puteți selecta un alt furnizor timeseries.'
    },
    step5: {
      header: 'Afișare locație',
      text: 'Și aici puteți localiza dispozitivul pe hartă.'
    },
    step6: {
      header: 'Selecție Listă',
      text: 'Aici puteți selecta un timeseries din liste ordonate.'
    },
    step7: {
      header: 'Selectați o stație',
      text: 'Vă rugăm să selectați acum o stație de pe hartă.'
    },
    step8: {
      header: 'Selectați timeseries',
      text: 'Selectați această casetă. Dacă există un singur timeseries pentru acest post, pe caseta este deja bifată. Acum poti merge mai departe cu butonul &quot;OK&quot; pentru a încărca timeseries.'
    },
    step9: {
      header: 'Intrare Legenda',
      text: 'Aici veți vedea seriile de timp adăugat. Puteți șterge sau localiza seriile de timp sau schimba culoarea.'
    },
    step10: {
      header: 'Diagramă',
      text: 'Aceasta este graficul de seriilor de timp selectat.'
    },
    step11: {
      header: 'Schimbarea timp',
      text: 'Aici puteți schimba măsura de timp pentru seriile de timp selectat.'
    },
    step12: {
      header: 'Tabelul Vezi',
      text: 'Aici veti gasi un tabel de valori de date brute pentru seriile de timp selectat.'
    },
    step13: {
      header: 'Management preferate',
      text: 'Intrările Legenda / timeseries ar putea fi salvate ca favorite. În acest punct de vedere toate favorite sunt listate și ar putea fi menținute.'
    },
    step14: {
      header: 'A terminat pe locul',
      text: 'Bine făcut! <br> Acest client este un produs de <a href="http://52north.org" target="_blank">52 ° nord GmbH</a> . Puteți găsi codul sursă pe <a href="https://github.com/52North/js-sensorweb-client" target="_blank">GitHub</a> .'
    }
  },
  favorite: {
    firstValueAt: 'Primul valoare la',
    lastValueAt: 'Ultima valoare la',
    label: 'favorit',
    edit: {
      header: 'Editați favorit'
    },
    group: {
      add: 'Statutul &quot;{0}&quot; se adaugă la lista de favorite.',
      exists: 'Acest statut încă mai există.',
      noTimeseries: 'În prezent, nu sunt selectate timeseries.',
      notSupported: 'Furnizorul de o intrare a statutului &quot;{0}&quot; nu este acceptată și nu poate fi încărcat.'
    },
    single: {
      add: 'Un nou favorit &quot;{0}&quot; se adaugă la lista.',
      remove: 'Favoritul &quot;{0}&quot; este eliminat.',
      exists: 'Acest favorit încă mai există.',
      notSupported: 'Furnizorul de favorit &quot;{0}&quot; nu este acceptată și nu poate fi încărcat.'
    },
    import: {
      override: 'Vrei să suprascrie favorite curente?',
      wrongFile: 'Nu se poate citi fișierul',
      noValidJson: 'Fișierul JSON nu este valid!',
      header: 'Import favorite',
      text: 'Aici puteți importa favorite exportate. Doar paste JSON în acest domeniu de text:'
    },
    export: {
      header: 'Export favorite',
      text: 'Aici puteți exporta favorite. Doar copiați JSON din aceasta casuta și salvați-o într-un fișier pentru al importa mai târziu:'
    },
    error: {
      fileApiNotSupported: 'API-urile de fișiere nu sunt pe deplin susținute în acest browser.'
    }
  },
  inform: {
    error: 'A apărut o eroare:',
    warn: 'Vă rugăm să rețineți că:'
  }
};
