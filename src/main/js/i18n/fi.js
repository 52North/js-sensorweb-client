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
i18n.fi = {
  fullName: 'Englanti',
  ok: 'Kunnossa',
  main: {
    legend: 'Legenda',
    diagram: 'Kaavio',
    mapView: 'Kartta näkymä',
    favoriteView: 'Suosikit',
    settings: 'Asetukset',
    stationSelection: 'Valitse asema',
    chartView: 'Kuvionäyttöä',
    allPhenomena: 'Kaikki ilmiöt',
    phenomenon: 'Ilmiö',
    favoritesList: 'Suosikit',
    importFavorites: 'Tuonti',
    exportFavorites: 'Vienti',
    importExportHelp: 'Jos haluat tuoda tiedoston, valitse tiedosto viedä ennen.',
    noFileSelected: 'Ei tiedostoa valittuna'
  },
  chart: {
    noTimeseriesSelected: 'Et ole valinnut Palkat, valittu Palkat ei ole arvoja tietyn ajan alue tai Palkat ovat piilossa.',
    outsideOfDataRange: 'Ulkopuolella tietojen valikoima!',
    annotation: 'Tiedot ilman takuuta!',
    monthNames: [ 'Tammikuu', 'Helmikuu', 'Maaliskuu', 'Huhtikuu', 'Toukokuu', 'Kesäkuu', 'Heinäkuu', 'Elokuu', 'Syyskuu', 'Lokakuu', 'Marraskuu', 'Joulukuu' ]
  },
  table: {
    time: 'Aika'
  },
  map: {
    userLocation: 'Tässä on nykyinen sijainti',
    stationSelection: {
      station: 'Asema',
      selectAllTimeseries: 'Valitse kaikki Palkat'
    },
    stationLocation: {
      station: 'Asema',
      timeseries: 'Palkat',
      provider: 'Toimittaja',
      jumpBackToChart: 'takaisin kaavioon'
    },
    providerList: {
      provider: 'Toimittaja',
      stations: 'Asemat',
      timeseries: 'Palkat',
      phenomena: 'Ilmiöt'
    },
    search: {
      label: 'etsi osoite ...',
      noResult: 'Anteeksi, että osoitetta ei löytynyt.'
    }
  },
  listSelection: {
    header: 'Valitse Palkat mukaan lista',
    headers: {
      category: 'Luokka',
      station: 'Asema',
      phenomenon: 'Ilmiö',
      procedure: 'Anturi'
    },
    warning: {
      moreThanOneTimeseries: 'havaittu useampi kuin yksi Palkat'
    }
  },
  legend: {
    entry: {
      noData: 'tietoja ei ole käytettävissä',
      jumpToLastValue: 'Siirry viimeiselle arvo',
      firstValueAt: 'Ensimmäinen arvo',
      lastValueAt: 'Viimeinen arvo'
    }
  },
  export: {
    label: 'Data CSV (Zip-arkisto)'
  },
  timeSelection: {
    header: 'Aikaväli',
    presetsHeader: 'esiasetukset',
    presets: {
      lastHour: 'viimeisen tunnin',
      today: 'tänään',
      yesterday: 'eilen',
      todayYesterday: 'tänään &amp; eilen',
      thisWeek: 'tällä viikolla',
      lastWeek: 'viime viikolla',
      thisMonth: 'tässä kuussa',
      lastMonth: 'viime kuussa',
      thisYear: 'tänä vuonna',
      lastYear: 'viime vuonna'
    },
    custom: {
      header: 'asiakassuhde',
      start: 'Aloituspäivä',
      end: 'Päättymispäivä'
    },
    warning: {
      startBeforeEnd: 'Alkamispäivä ei voi olla suurempi silloin lopetuspäivä',
      maxTimeRange: 'Aikaväli ei voi olla suurempi silloin yksi vuosi'
    }
  },
  styleChange: {
    header: 'Muuta tyyliä',
    currentColor: 'Nykyinen väri',
    selectColor: 'Valitse uusi väri',
    selectBarInterval: 'Valitse bar aikaväli',
    barChartInterval: {
      hour: 'Tunti',
      day: 'Päivä',
      week: 'Viikko',
      month: 'Kuukausi'
    },
    zeroScaled: 'nolla skaalata Y-akselilla',
    groupedAxis: 'ryhmitelty akseli'
  },
  settings: {
    header: 'Asetukset',
    chooseLanguage: 'Vaihda kieltä',
    requiresRestart: 'Tarvitsee Restart!',
    permalink: {
      create: 'Luo permalink kuin',
      inWindow: 'linkki uuteen ikkunaan',
      inMail: 'linkki sähköpostitse',
      inClipboard: 'Linkki leikepöydälle',
      clipboardInfo: 'Kopioi leikepöydälle:',
      inQrCode: 'kuten QR-koodi',
      favorite: 'Säästä työympäristöä suosikkikohdetta'
    },
    clusterMarker: 'klusterin merkki',
    markerWithLastInfo: {
      header: 'markkeri viime arvotiedon',
      label: 'huomiota - joidenkin tietojen toimittaja ovat hyvin hitaita'
    },
    saveStatus: {
      header: 'Tallenna ympäristö',
      label: 'Kaikki Palkat, valittu aikajänne ja asetukset tallennetaan jatkuvasti.'
    },
    resetStatus: 'Nollaa ympäristö',
    generalizeData: 'yleistää Data',
    imprint: {
      header: 'Jälki',
      github: 'Etsi tätä hanketta <a href="https://github.com/52North/js-sensorweb-client" target="_blank">GitHub</a>',
      text: '<p> <a href="http://52north.org" target="_blank">52 ° North GmbH</a> vastaa tällä sivustolla. </p><p> 52 ° North aloitteen Geospatiaalinen Open Source Software GmbH <br> Martin-Luther-King-Weg 24 <br> 48155 Münster, Saksa </p>'
    }
  },
  permalink: {
    noMatchingTimeseriesFound: 'Ei vastaavia Palkat löytyy.'
  },
  guide: {
    start: {
      request: 'Kun käynnistät tämän oppaan, nykytilaa nollataan.'
    },
    step1: {
      header: 'JavaScript Client - Opastettu kierros',
      text: 'Tämä kiertue tarjoaa muutaman askeleen yleiskuvan miten käyttää tätä asiakkaalle. Ensin lisätään Palkat kartalta.'
    },
    step2: {
      header: 'Siirry kartalla',
      text: 'Täällä vaihtaa näkymän saada kartan.'
    },
    step3: {
      header: 'Kartta näkymä',
      text: 'Tämä on karttanäkymässä. Vuonna karttaa näet markkereita tai markergroups.'
    },
    step4: {
      header: 'Muuta Provider',
      text: 'Täällä voit valita toisen Palkat tarjoaja.'
    },
    step5: {
      header: 'Näytä sijainti',
      text: 'Ja täällä voit paikantaa laitteen kartalta.'
    },
    step6: {
      header: 'Luettelo valinta',
      text: 'Täällä voit valita Palkat ulos tilata luetteloita.'
    },
    step7: {
      header: 'Valitse asema',
      text: 'Valitse nyt asema kartalla.'
    },
    step8: {
      header: 'Valitse Palkat',
      text: 'Valitse tämä valintaruutu. Jos on vain yksi Palkat tämän aseman, valintaruutu on jo valittuna. Nyt voit mennä &quot;OK&quot; -painiketta ladataksesi Palkat.'
    },
    step9: {
      header: 'Legend merkintä',
      text: 'Täällä näet lisätty aikasarjoja. Voit poistaa tai paikantaa aikasarjan tai muuttaa väriä.'
    },
    step10: {
      header: 'Kaavio',
      text: 'Tämä on kaavio aikasarjaotoksen.'
    },
    step11: {
      header: 'Muuta aikaa',
      text: 'Täällä voit muuttaa aikaa määrin valitsemallesi aikasarjoja.'
    },
    step12: {
      header: 'Table View',
      text: 'Täältä saat taulukko raakadatan arvoja valitsemasi aikasarjoja.'
    },
    step13: {
      header: 'Suosikki hallinta',
      text: 'Legenda merkinnät / Palkat voitaisiin suosikeiksi. Tässä näkymässä kaikki suosikit on lueteltu ja voidaan säilyttää.'
    },
    step14: {
      header: 'Valmiit',
      text: 'Hyvin tehty! <br> Tämä asiakas on tuotteen <a href="http://52north.org" target="_blank">52 ° North GmbH</a> . Löydät lähdekoodia <a href="https://github.com/52North/js-sensorweb-client" target="_blank">GitHub</a> .'
    }
  },
  favorite: {
    firstValueAt: 'Ensimmäinen arvo',
    lastValueAt: 'Viimeinen arvo',
    label: 'suosikki',
    edit: {
      header: 'Muokkaa suosikki'
    },
    group: {
      add: 'Tila &quot;{0}&quot; lisätään suosikkilistan.',
      exists: 'Tämä asema on edelleen olemassa.',
      noTimeseries: 'Tällä hetkellä ei ole Palkat valitaan.',
      notSupported: 'Tarjoajan tulon tila &quot;{0}&quot; ei tueta, eikä sitä voi ladata.'
    },
    single: {
      add: 'Uusi suosikki &quot;{0}&quot; on lisätty luetteloon.',
      remove: 'Suosikki &quot;{0}&quot; on poistettu.',
      exists: 'Tämä suosikki on edelleen olemassa.',
      notSupported: 'Tarjoaja suosikki &quot;{0}&quot; ei tueta, eikä sitä voi ladata.'
    },
    import: {
      override: 'Haluatko ohittaa nykyisen suosikkeja?',
      wrongFile: 'Ei voitu lukea tiedostoa',
      noValidJson: 'JSON-tiedosto ei kelpaa!',
      header: 'Tuo suosikit',
      text: 'Täällä voit tuoda viedä suosikkeja. Vain liitä JSON tällä tekstikenttään:'
    },
    export: {
      header: 'Vie suosikit',
      text: 'Täällä voit viedä suosikkisi. Kopioi JSON pois tässä kentässä ja tallentaa sen tiedostoon tuoda sen myöhemmin:'
    },
    error: {
      fileApiNotSupported: 'File API eivät täysin tue tätä selainta.'
    }
  },
  inform: {
    error: 'Virhe:',
    warn: 'Muista, että:'
  }
};
