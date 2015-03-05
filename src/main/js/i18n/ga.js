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
i18n.ga = {
  fullName: 'Béarla',
  ok: 'OK',
  main: {
    legend: 'Finscéal',
    diagram: 'Léaráid',
    mapView: 'Léarscáil dearcadh',
    favoriteView: 'Favorites',
    settings: 'Socruithe',
    stationSelection: 'Roghnaigh stáisiún',
    chartView: 'Dearcadh Cairt',
    allPhenomena: 'Gach feiniméin',
    phenomenon: 'Feiniméan',
    favoritesList: 'Favorites',
    importFavorites: 'Iompórtáil',
    exportFavorites: 'Easpórtáil',
    importExportHelp: 'A allmhairiú comhad, le do thoil a roghnú comhad a onnmhairíodh tú roimh.',
    noFileSelected: 'Níl comhad roghnaithe'
  },
  chart: {
    noTimeseriesSelected: 'Tá tú a roghnaigh aon timeseries, tá na timeseries roghnaithe bith luachanna sa réimse am ar leith nó na timeseries bhfolach.',
    outsideOfDataRange: 'Taobh amuigh de raon sonraí!',
    annotation: 'Sonraí gan bharántas!',
    monthNames: [ 'Jan', 'Feabhra', 'Mar', 'Aibreán', 'Bealtaine', 'Meitheamh', 'Iúil', 'Lúnasa', 'Meán Fómhair', 'Deireadh Fómhair', 'Samhain', 'Nollaig' ]
  },
  table: {
    time: 'Am'
  },
  map: {
    userLocation: 'Seo é do suíomh reatha',
    stationSelection: {
      station: 'Stáisiún',
      selectAllTimeseries: 'roghnú go léir timeseries'
    },
    stationLocation: {
      station: 'Stáisiún',
      timeseries: 'Timeseries',
      provider: 'Soláthraí',
      jumpBackToChart: 'ar ais go dtí chairt'
    },
    providerList: {
      provider: 'Soláthraí',
      stations: 'Stáisiúin',
      timeseries: 'Timeseries',
      phenomena: 'Feiniméin'
    },
    search: {
      label: 'cuardach a dhéanamh ar seoladh ...',
      noResult: 'Tá brón orainn, ní fhéadfadh an seoladh sin a fháil.'
    }
  },
  listSelection: {
    header: 'Roghnaigh timeseries le liosta',
    headers: {
      category: 'Catagóir',
      station: 'Stáisiún',
      phenomenon: 'Feiniméan',
      procedure: 'Braiteoir'
    },
    warning: {
      moreThanOneTimeseries: 'Fuair ​​timeseries níos mó ná aon'
    }
  },
  legend: {
    entry: {
      noData: 'Níl aon sonraí ar fáil',
      jumpToLastValue: 'léim go luach deiridh',
      firstValueAt: 'An chéad luach ag',
      lastValueAt: 'Luach Last ag'
    }
  },
  export: {
    label: 'Sonraí mar CSV (Zip Cartlann)'
  },
  timeSelection: {
    header: 'Am Raon',
    presetsHeader: 'réamhshocruithe',
    presets: {
      lastHour: 'uair dheireanach',
      today: 'lá atá inniu ann',
      yesterday: 'inné',
      todayYesterday: 'lá atá inniu ann agus an lae inné',
      thisWeek: 'an tseachtain seo',
      lastWeek: 'an tseachtain seo caite',
      thisMonth: 'an mhí seo',
      lastMonth: 'an mhí seo caite',
      thisYear: 'i mbliana',
      lastYear: 'na bliana seo caite'
    },
    custom: {
      header: 'saincheaptha',
      start: 'Dáta tosaithe',
      end: 'Dáta deiridh'
    },
    warning: {
      startBeforeEnd: 'Ní féidir leis an dáta tosaigh a bheith níos mó ansin an dáta deiridh',
      maxTimeRange: 'Ní féidir leis an raon ama a bheith níos mó ansin aon bhliain amháin'
    }
  },
  styleChange: {
    header: 'Athraigh stíl',
    currentColor: 'Dath atá ann faoi láthair',
    selectColor: 'Roghnaigh dath nua',
    selectBarInterval: 'Roghnaigh an t-eatramh barra',
    barChartInterval: {
      hour: 'Uair',
      day: 'Lá',
      week: 'Seachtain',
      month: 'Month'
    },
    zeroScaled: 'náid scála Y-ais',
    groupedAxis: 'ais grúpáilte'
  },
  settings: {
    header: 'Socruithe',
    chooseLanguage: 'Teanga Athraigh',
    requiresRestart: 'Atosaigh Riachtanais!',
    permalink: {
      create: 'Cruthaigh permalink mar',
      inWindow: 'nasc i bhfuinneog nua',
      inMail: 'nasc sa ríomhphost',
      inClipboard: 'Nasc a gearrthaisce',
      clipboardInfo: 'Cóipeáil go gearrthaisce:',
      inQrCode: 'mar QR-Cód',
      favorite: 'Timpeallacht oibre mar iontráil is fearr leat Sábháil'
    },
    clusterMarker: 'marcóir braisle',
    markerWithLastInfo: {
      header: 'marcóir le faisnéis luach deiridh',
      label: 'aird - tá roinnt soláthraí sonraí an-mhall'
    },
    saveStatus: {
      header: 'Sábháil timpeallacht',
      label: 'Gach timeseries, an méid ama maidir roghnaithe agus na socruithe a shábháil leanúnach.'
    },
    resetStatus: 'Timpeallacht Athshocraigh',
    generalizeData: 'ghinearálú Sonraí',
    imprint: {
      header: 'Imprint',
      github: 'Faigh an tionscadal seo ag <a href="https://github.com/52North/js-sensorweb-client" target="_blank">GitHub</a>',
      text: '<p> <a href="http://52north.org" target="_blank">52 ° GmbH Thuaidh</a> freagrach as an suíomh gréasáin seo. </p><p> 52 ° Tionscnamh Thuaidh do geospáis Foinse Oscailte Bogearraí GmbH <br> Martin Luther--King-Weg 24 <br> 48,155 MUENSTER, An Ghearmáin </p>'
    }
  },
  permalink: {
    noMatchingTimeseriesFound: 'Níl timeseries meaitseáil fáil.'
  },
  guide: {
    start: {
      request: 'Nuair a thosaíonn tú an treoir, beidh an staid reatha a athshocrú.'
    },
    step1: {
      header: 'JavaScript Cliant - Treoraithe Turas',
      text: 'Tugann an turas seo i roinnt céimeanna forbhreathnú conas é a úsáid seo a cliant. An Chéad muid add timeseries ón léarscáil.'
    },
    step2: {
      header: 'Téigh go dtí an léarscáil',
      text: 'Anseo táimid ag aistriú an dearcadh a fháil ar léarscáil.'
    },
    step3: {
      header: 'Léarscáil dearcadh',
      text: 'Is é seo an dearcadh léarscáil. Sa an léarscáil is féidir leat a fheiceáil marcóirí nó markergroups.'
    },
    step4: {
      header: 'Athraigh Soláthraí',
      text: 'Anseo is féidir leat a roghnú soláthraí eile timeseries.'
    },
    step5: {
      header: 'Taispeáin suíomh',
      text: 'Agus is anseo is féidir leat a aimsiú do gléas ar an léarscáil.'
    },
    step6: {
      header: 'Liosta roghnú',
      text: 'Anseo is féidir leat a roghnú timeseries as liostaí ordaigh.'
    },
    step7: {
      header: 'Roghnaigh stáisiún',
      text: 'Roghnaigh le do thoil anois stáisiún ar an léarscáil.'
    },
    step8: {
      header: 'Roghnaigh timeseries',
      text: 'Roghnaigh an ticbhosca seo. Mura bhfuil ach aon timeseries don stáisiún, tá an ticbhosca sheiceáil cheana féin. Anois is féidir leat dul ar aghaidh leis an cnaipe &quot;OK&quot; a luchtú an timeseries.'
    },
    step9: {
      header: 'Iontráil finscéal',
      text: 'Anseo a fheiceann tú ar an tsraith ama leis. Is féidir leat a scriosadh nó a lonnú ar an tsraith ama nó a athrú ar an dath.'
    },
    step10: {
      header: 'Cairt',
      text: 'Is é seo an chairt ar an tsraith ama roghnaithe.'
    },
    step11: {
      header: 'Athraigh am',
      text: 'Anseo is féidir leat athrú ar an méid ama do do chuid shraith ama roghnaithe.'
    },
    step12: {
      header: 'Radharc an Tábla',
      text: 'Anseo gheobhaidh tú tábla na luachanna sonraí amh le do shraith ama roghnaithe.'
    },
    step13: {
      header: 'Bainistíocht Favorite',
      text: 'D&#39;fhéadfadh na hiontrálacha finscéal / timeseries a shábháil mar Favorites. Sa dearcadh seo go léir Favorites liostaithe agus d&#39;fhéadfadh a chothabháil.'
    },
    step14: {
      header: 'Críochnaithe',
      text: 'Maith thú! <br> Is é seo an cliant a táirge de <a href="http://52north.org" target="_blank">52 ° GmbH Thuaidh</a> . Is féidir leat teacht ar an cód foinse ar <a href="https://github.com/52North/js-sensorweb-client" target="_blank">GitHub</a> .'
    }
  },
  favorite: {
    firstValueAt: 'An chéad luach ag',
    lastValueAt: 'Luach Last ag',
    label: 'is fearr leat',
    edit: {
      header: 'Cuir fearr leat'
    },
    group: {
      add: 'Stádas &#39;{0}&#39; a chur leis an liosta is fearr leat.',
      exists: 'Seo an stádas ann go fóill.',
      noTimeseries: 'Faoi láthair níl aon timeseries a roghnú.',
      notSupported: 'An soláthraí iontráil ar stádas &#39;{0}&#39; Níl tacaíocht agus ní féidir iad a luchtú.'
    },
    single: {
      add: 'A is fearr leat nua &#39;{0}&#39; a chur leis an liosta.',
      remove: 'Is é an fearr leat &#39;{0}&#39; bhaint.',
      exists: 'Seo is fearr leat ann go fóill.',
      notSupported: 'An soláthraí an fearr leat &#39;{0}&#39; Níl tacaíocht agus ní féidir iad a luchtú.'
    },
    import: {
      override: 'Ar mhaith leat a shárú do Favorites reatha?',
      wrongFile: 'Níorbh fhéidir an comhad a léamh',
      noValidJson: 'Níl an comhad JSON bailí!',
      header: 'Favorites Iompórtáil',
      text: 'Anseo is féidir leat a allmhairiú do Favorites a onnmhairíodh. Just a ghreamú ar an JSON sa réimse téacs:'
    },
    export: {
      header: 'Favorites Easpórtáil',
      text: 'Anseo is féidir leat a onnmhairiú do rogha pearsanta. Just a chóipeáil an JSON as an textbox agus é a shábháil i gcomhad a allmhairiú níos déanaí:'
    },
    error: {
      fileApiNotSupported: 'Níl na APIs Comhad tacaíocht iomlán sa bhrabhsálaí.'
    }
  },
  inform: {
    error: 'Tharla earráid:',
    warn: 'Cuimhnigh go:'
  }
};
