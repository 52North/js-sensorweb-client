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
i18n.hr = {
  fullName: 'Engleski',
  ok: 'OK',
  main: {
    legend: 'Legenda',
    diagram: 'Dijagram',
    mapView: 'Prikaz karte',
    favoriteView: 'Omiljene',
    settings: 'Postavke',
    stationSelection: 'Odaberite stanicu',
    chartView: 'Prikaz grafikona',
    allPhenomena: 'Sve pojave',
    phenomenon: 'Pojava',
    favoritesList: 'Omiljene',
    importFavorites: 'Uvoz',
    exportFavorites: 'Izvoz',
    importExportHelp: 'Za uvoz datoteke, odaberite datoteku koju izvozi prije.',
    noFileSelected: 'Ne odabrane datoteke'
  },
  chart: {
    noTimeseriesSelected: 'Odabrali ste ne timeseries, odabrani timeseries nemaju vrijednosti u određenom vremenskom rasponu ili timeseries su skriveni.',
    outsideOfDataRange: 'Izvan raspona podataka!',
    annotation: 'Podaci bez jamstva!',
    monthNames: [ 'Jan', 'Veljače', 'Pokvariti', 'Travnja', 'Svibanj', 'Lipnja', 'Srpnja', 'Kolovoz', 'Rujna', 'Listopada', 'Studeni', 'Prosinca' ]
  },
  table: {
    time: 'Vrijeme'
  },
  map: {
    userLocation: 'Ovdje je vaš trenutni položaj',
    stationSelection: {
      station: 'Stanica',
      selectAllTimeseries: 'odaberite sve timeseries'
    },
    stationLocation: {
      station: 'Stanica',
      timeseries: 'Timeseries',
      provider: 'Davatelj',
      jumpBackToChart: 'Povratak na grafikonu'
    },
    providerList: {
      provider: 'Davatelj',
      stations: 'Postaje',
      timeseries: 'Timeseries',
      phenomena: 'Fenomeni'
    },
    search: {
      label: 'tražiti adrese ...',
      noResult: 'Žao nam je, da je adresa se ne može naći.'
    }
  },
  listSelection: {
    header: 'Odaberite timeseries po popisu',
    headers: {
      category: 'Kategorija',
      station: 'Stanica',
      phenomenon: 'Pojava',
      procedure: 'Senzor'
    },
    warning: {
      moreThanOneTimeseries: 'naći više od jednog timeseries'
    }
  },
  legend: {
    entry: {
      noData: 'nema raspoloživih podataka',
      jumpToLastValue: 'skočiti na posljednjem vrijednost',
      firstValueAt: 'Prvo vrijednost na',
      lastValueAt: 'Zadnja vrijednost na'
    }
  },
  export: {
    label: 'Podaci kao CSV (Zip arhiva)'
  },
  timeSelection: {
    header: 'Vrijeme Raspon',
    presetsHeader: 'Zadane postavke',
    presets: {
      lastHour: 'posljednji čas',
      today: 'danas',
      yesterday: 'jučer',
      todayYesterday: 'Danas i jučer',
      thisWeek: 'ovaj tjedan',
      lastWeek: 'prošlog tjedna',
      thisMonth: 'ovaj mjesec',
      lastMonth: 'prošli mjesec',
      thisYear: 'Ove godine',
      lastYear: 'prošle godine'
    },
    custom: {
      header: 'običaj',
      start: 'Datum početka',
      end: 'Datum završetka'
    },
    warning: {
      startBeforeEnd: 'Datum početka ne može biti veći od datuma završetka',
      maxTimeRange: 'Vremensko razdoblje ne može biti veći od jedne godine'
    }
  },
  styleChange: {
    header: 'Promjena stila',
    currentColor: 'Trenutna boja',
    selectColor: 'Odaberite novu boju',
    selectBarInterval: 'Odaberite bar interval',
    barChartInterval: {
      hour: 'Sat',
      day: 'Dan',
      week: 'Tjedan',
      month: 'Mjesec'
    },
    zeroScaled: 'nula krljuštima Y-os',
    groupedAxis: 'grupirani os'
  },
  settings: {
    header: 'Postavke',
    chooseLanguage: 'Prebacivanje jezika',
    requiresRestart: 'Potrebno Restart!',
    permalink: {
      create: 'Napravite Permalink kao',
      inWindow: 'karika u novom prozoru',
      inMail: 'Veza na e-mail',
      inClipboard: 'Veza u međuspremnik',
      clipboardInfo: 'Kopiraj u međuspremnik:',
      inQrCode: 'kao QR-Code',
      favorite: 'Spremite radnu okolinu kao omiljeni stupanja'
    },
    clusterMarker: 'cluster marker',
    markerWithLastInfo: {
      header: 'marker s prošlom informacije vrijednosti',
      label: 'pozornost - neki pružatelj podaci su vrlo sporo'
    },
    saveStatus: {
      header: 'Spremi okoliš',
      label: 'Svi timeseries, odabranog razdoblja i postavke se spremaju kontinuirano.'
    },
    resetStatus: 'Reset okoliš',
    generalizeData: 'generalizirati podataka',
    imprint: {
      header: 'Otisak',
      github: 'Nađi ovaj projekt na <a href="https://github.com/52North/js-sensorweb-client" target="_blank">GitHub</a>',
      text: '<p> <a href="http://52north.org" target="_blank">52 ° North GmbH</a> je odgovorna za ove web stranice. </p><p> 52 ° North Inicijativa geoprostornih Open Source Software GmbH <br> Martin Luther--kralj-Weg 24 <br> 48155 Münster, Njemačka </p>'
    }
  },
  permalink: {
    noMatchingTimeseriesFound: 'Nema podudaranje timeseries pronađen.'
  },
  guide: {
    start: {
      request: 'Kada pokrenete ovaj vodič, trenutno stanje će se vratiti.'
    },
    step1: {
      header: 'JavaScript Klijent - vodič',
      text: 'Ovaj izlet daje u nekoliko koraka pregled kako koristiti ovu stranku. Prvo ćemo dodati timeseries s karte.'
    },
    step2: {
      header: 'Idi na karti',
      text: 'Ovdje smo se prebacili u pogledu dobiti kartu.'
    },
    step3: {
      header: 'Prikaz karte',
      text: 'Ovo je prikaz karte. U karti možete vidjeti markere ili markergroups.'
    },
    step4: {
      header: 'Promjena usluga',
      text: 'Ovdje možete odabrati drugi timeseries usluga.'
    },
    step5: {
      header: 'Pokaži položaj',
      text: 'I ovdje možete pronaći svoj uređaj na karti.'
    },
    step6: {
      header: 'Izbor popis',
      text: 'Ovdje možete odabrati timeseries od naručenih liste.'
    },
    step7: {
      header: 'Odaberite stanicu',
      text: 'Odaberite sada postaju na karti.'
    },
    step8: {
      header: 'Odaberite timeseries',
      text: 'Odaberite ovaj okvir. Ako postoji samo jedna timeseries za ovu stanicu, okvir je već provjerio. Sada možete nastaviti s &quot;OK&quot; gumb za učitavanje timeseries.'
    },
    step9: {
      header: 'Unos Legenda',
      text: 'Ovdje možete vidjeti dodanu vremenske serije. Možete brisati ili pronaći vremenske serije ili promijeniti boju.'
    },
    step10: {
      header: 'Grafikon',
      text: 'To je shema odabranom vremenskom nizu.'
    },
    step11: {
      header: 'Promjena vremena',
      text: 'Ovdje možete promijeniti vremensku mjeru za vaše odabrane vremenske serije.'
    },
    step12: {
      header: 'Tablica Pogledaj',
      text: 'Ovdje možete dobiti stol od sirovih vrijednosti podataka o odabranom vremenskom nizu.'
    },
    step13: {
      header: 'Omiljeni upravljanje',
      text: 'Legenda unosi / timeseries mogu se spremiti kao favorite. U tom pogledu svi favoriti su navedeni i mogu se održavati.'
    },
    step14: {
      header: 'Gotovi',
      text: 'Bravo! <br> Ovaj klijent je produkt <a href="http://52north.org" target="_blank">52 ° sjeverne GmbH</a> . Možete pronaći izvorni kod na <a href="https://github.com/52North/js-sensorweb-client" target="_blank">GitHub</a> .'
    }
  },
  favorite: {
    firstValueAt: 'Prvo vrijednost na',
    lastValueAt: 'Zadnja vrijednost na',
    label: 'omiljen',
    edit: {
      header: 'Uredi omiljene'
    },
    group: {
      add: 'Status &#39;{0}&#39; je dodana na popis omiljenih.',
      exists: 'Ovaj status i dalje postoji.',
      noTimeseries: 'Trenutno nema timeseries su izabrani.',
      notSupported: 'Pružatelj upis statusa &#39;{0}&#39; nije podržana i ne može se učitati.'
    },
    single: {
      add: 'Nova omiljena &#39;{0}&#39; je dodan na popis.',
      remove: 'Omiljena &#39;{0}&#39; je uklonjen.',
      exists: 'Ova omiljena i dalje postoji.',
      notSupported: 'Pružatelj favorita &#39;{0}&#39; nije podržana i ne može se učitati.'
    },
    import: {
      override: 'Želite li poništiti svoje trenutne favorite?',
      wrongFile: 'Ne mogu pročitati datoteku',
      noValidJson: 'JSON datoteka nije valjana!',
      header: 'Uvoz favoriti',
      text: 'Ovdje možete uvesti svoje favorite izvozi. Samo zalijepite JSON u ovom tekstnom polju:'
    },
    export: {
      header: 'Izvoz favoriti',
      text: 'Ovdje možete izvoziti svoje favorite. Samo kopirajte JSON iz ove tekstom i spremite ga u datoteku to uvesti kasnije:'
    },
    error: {
      fileApiNotSupported: 'API-ja datoteke nisu u potpunosti podržan u ovom pregledniku.'
    }
  },
  inform: {
    error: 'Došlo je do pogreške:',
    warn: 'Imajte na umu da:'
  }
};
