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
i18n.it = {
  fullName: 'Italiano',
  ok: 'OK',
  main: {
    legend: 'Leggenda',
    diagram: 'Diagramma',
    mapView: 'Guarda la mappa',
    favoriteView: 'Preferiti',
    settings: 'Impostazioni',
    stationSelection: 'Selezionare una stazione',
    chartView: 'Vista Mappa',
    allPhenomena: 'Tutti i fenomeni',
    phenomenon: 'Fenomeno',
    favoritesList: 'Preferiti',
    importFavorites: 'Importazione',
    exportFavorites: 'Esportazione',
    importExportHelp: 'Per importare un file, si prega di scegliere un file esportato prima.',
    noFileSelected: 'Nessun file selezionato'
  },
  chart: {
    noTimeseriesSelected: 'Hai selezionato non timeseries, le serie storica selezionati non hanno valori nella determinato intervallo di tempo o le serie temporali sono nascosti.',
    outsideOfDataRange: 'Al di fuori del campo di dati!',
    annotation: 'Dati senza garanzia!',
    monthNames: [ 'Jan', 'Febbraio', 'Mar', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre' ]
  },
  table: {
    time: 'Tempo'
  },
  map: {
    userLocation: 'Ecco la posizione corrente',
    stationSelection: {
      station: 'Stazione',
      selectAllTimeseries: 'selezionare tutte le serie temporali'
    },
    stationLocation: {
      station: 'Stazione',
      timeseries: 'TimeSeries',
      provider: 'Provider',
      jumpBackToChart: 'Torna alla lista'
    },
    providerList: {
      provider: 'Provider',
      stations: 'Stazioni',
      timeseries: 'TimeSeries',
      phenomena: 'Fenomeni'
    },
    search: {
      label: 'cercare l&#39;indirizzo ...',
      noResult: 'Siamo spiacenti, questo indirizzo non è stato trovato.'
    }
  },
  listSelection: {
    header: 'Selezionare timeseries elenco',
    headers: {
      category: 'Categoria',
      station: 'Stazione',
      phenomenon: 'Fenomeno',
      procedure: 'Sensor'
    },
    warning: {
      moreThanOneTimeseries: 'trovato più di una serie storica'
    }
  },
  legend: {
    entry: {
      noData: 'Non sono disponibili dati',
      jumpToLastValue: 'Continua all&#39;ultimo valore',
      firstValueAt: 'Primo valore',
      lastValueAt: 'Ultimo valore'
    }
  },
  export: {
    label: 'I dati in formato CSV (Zip Archive)'
  },
  timeSelection: {
    header: 'Intervallo di tempo',
    presetsHeader: 'preset',
    presets: {
      lastHour: 'ultima ora',
      today: 'oggi',
      yesterday: 'ieri',
      todayYesterday: 'oggi e ieri',
      thisWeek: 'questa settimana',
      lastWeek: 'la settimana scorsa',
      thisMonth: 'questo mese',
      lastMonth: 'il mese scorso',
      thisYear: 'quest&#39;anno',
      lastYear: 'l&#39;anno scorso'
    },
    custom: {
      header: 'abitudine',
      start: 'Data di inizio',
      end: 'Data di fine'
    },
    warning: {
      startBeforeEnd: 'La data di inizio non può essere superiore alla data di fine',
      maxTimeRange: 'L&#39;intervallo di tempo non può essere maggiore di uno anno'
    }
  },
  styleChange: {
    header: 'Cambia stile',
    currentColor: 'Colore corrente',
    selectColor: 'Selezionare un nuovo colore',
    selectBarInterval: 'Selezionare l&#39;intervallo bar',
    barChartInterval: {
      hour: 'Ora',
      day: 'Giorno',
      week: 'Settimana',
      month: 'Mese'
    },
    zeroScaled: 'a zero in scala dell&#39;asse Y',
    groupedAxis: 'Asse raggruppati'
  },
  settings: {
    header: 'Impostazioni',
    chooseLanguage: 'Cambia lingua',
    requiresRestart: 'Needs Restart!',
    permalink: {
      create: 'Creare un permalink come',
      inWindow: 'link in una nuova finestra',
      inMail: 'link in una e-mail',
      inClipboard: 'Collegare negli appunti',
      clipboardInfo: 'Copia nella clipboard:',
      inQrCode: 'come QR-Code',
      favorite: 'Salva ambiente di lavoro come voce dei preferiti'
    },
    clusterMarker: 'indicatore di cluster',
    markerWithLastInfo: {
      header: 'marcatore con l&#39;ultimo valore informazioni',
      label: 'attenzione - alcuni provider di dati sono molto lenti'
    },
    saveStatus: {
      header: 'Salva l&#39;ambiente',
      label: 'Tutte le serie storica, il periodo scelto e le impostazioni vengono salvate continuo.'
    },
    resetStatus: 'Ambiente di ripristino',
    generalizeData: 'generalizzare dati',
    imprint: {
      header: 'Impronta',
      github: 'Trova questo progetto <a href="https://github.com/52North/js-sensorweb-client" target="_blank">GitHub</a>',
      text: '<p> <a href="http://52north.org" target="_blank">52 ° Nord GmbH</a> è responsabile di questo sito. </p><p> 52 ° Nord Initiative for Open Source Geospatial Software GmbH <br> Martin-Luther-King-Weg 24 <br> 48155 Muenster, Germania </p>'
    }
  },
  permalink: {
    noMatchingTimeseriesFound: 'Nessun timeseries viene trovato.'
  },
  guide: {
    start: {
      request: 'Quando si avvia questa guida, lo stato attuale viene azzerato.'
    },
    step1: {
      header: 'JavaScript Client - Visita guidata',
      text: 'Questo tour dà in pochi passi una panoramica sull&#39;utilizzo di questo client. Prima aggiungiamo un timeseries dalla mappa.'
    },
    step2: {
      header: 'Vai alla mappa',
      text: 'Qui si passa il fine di ottenere una mappa.'
    },
    step3: {
      header: 'Guarda la mappa',
      text: 'Questa è la visualizzazione della mappa. Nella mappa è possibile vedere i marcatori o markergroups.'
    },
    step4: {
      header: 'Cambio Provider',
      text: 'Qui è possibile selezionare un altro provider timeseries.'
    },
    step5: {
      header: 'Mostra localizzazione',
      text: 'E qui è possibile individuare il dispositivo sulla mappa.'
    },
    step6: {
      header: 'Selezione List',
      text: 'Qui è possibile selezionare una serie storica su liste ordinate.'
    },
    step7: {
      header: 'Selezionare una stazione',
      text: 'Seleziona ora una stazione sulla mappa.'
    },
    step8: {
      header: 'Seleziona timeseries',
      text: 'Seleziona questa casella. Se vi è un solo timeseries per questa stazione, la casella è già selezionata. Ora si può andare avanti con il tasto &quot;OK&quot; per caricare le serie temporali.'
    },
    step9: {
      header: 'Ingresso leggenda',
      text: 'Qui si vede la serie storica aggiunto. È possibile eliminare o individuare la serie storica o cambiare il colore.'
    },
    step10: {
      header: 'Grafico',
      text: 'Questo è il grafico della serie storica selezionata.'
    },
    step11: {
      header: 'Cambia il tempo',
      text: 'Qui è possibile modificare il tempo di misura per la serie del tempo selezionato.'
    },
    step12: {
      header: 'Table View',
      text: 'Qui si ottiene una tabella con i valori dei dati grezzi per la vostra serie tempo selezionato.'
    },
    step13: {
      header: 'Gestione Favorite',
      text: 'Le voci di legenda / timeseries potrebbero essere salvati come preferiti. In quest&#39;ottica tutti i favoriti sono elencati e possono essere mantenute.'
    },
    step14: {
      header: 'Finito',
      text: 'Ben fatto! <br> Questo client è un prodotto di <a href="http://52north.org" target="_blank">52 ° Nord GmbH</a> . È possibile trovare il codice sorgente su <a href="https://github.com/52North/js-sensorweb-client" target="_blank">GitHub</a> .'
    }
  },
  favorite: {
    firstValueAt: 'Primo valore',
    lastValueAt: 'Ultimo valore',
    label: 'favorito',
    edit: {
      header: 'Modifica preferito'
    },
    group: {
      add: 'Lo stato &#39;{0}&#39; è aggiunto all&#39;elenco dei preferiti.',
      exists: 'Questo stato esiste ancora.',
      noTimeseries: 'Attualmente non sono selezionate timeseries.',
      notSupported: 'Il fornitore di una voce dello stato di &#39;{0}&#39; non è supportata e non può essere caricato.'
    },
    single: {
      add: 'Un nuovo preferito &#39;{0}&#39; viene aggiunto alla lista.',
      remove: 'Il favorito &#39;{0}&#39; è stato rimosso.',
      exists: 'Questo preferito esiste ancora.',
      notSupported: 'Il fornitore del favorito &#39;{0}&#39; non è supportata e non può essere caricato.'
    },
    import: {
      override: 'Vuoi sostituire i tuoi preferiti?',
      wrongFile: 'Impossibile leggere il file',
      noValidJson: 'Il file JSON non è valido!',
      header: 'Importa preferiti',
      text: 'Qui è possibile importare i preferiti esportate. Basta incollare il JSON in questo campo di testo:'
    },
    export: {
      header: 'Favoriti Export',
      text: 'Qui è possibile esportare i preferiti. Basta copiare il JSON di questo campo testo e salvarlo in un file da importare in un secondo momento:'
    },
    error: {
      fileApiNotSupported: 'Le API di file non sono completamente supportate in questo browser.'
    }
  },
  inform: {
    error: 'Errore:',
    warn: 'Si ricorda che:'
  }
};
