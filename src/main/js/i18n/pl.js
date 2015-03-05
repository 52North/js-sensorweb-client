i18n.pl = {
  fullName: 'Angielski',
  ok: 'W porządku',
  main: {
    legend: 'Legenda',
    diagram: 'Schemat',
    mapView: 'Widok mapy',
    favoriteView: 'Ulubione',
    settings: 'Ustawienia',
    stationSelection: 'Wybierz stację',
    chartView: 'Widok Wykres',
    allPhenomena: 'Wszystkie zjawiska',
    phenomenon: 'Zjawisko',
    favoritesList: 'Ulubione',
    importFavorites: 'Import',
    exportFavorites: 'Eksport',
    importExportHelp: 'Aby zaimportować plik, wybierz plik wyeksportowany wcześniej.',
    noFileSelected: 'Nie wybrano pliku'
  },
  chart: {
    noTimeseriesSelected: 'Wybrałeś nie timeseries, wybrane timeseries nie mają wartości w danym przedziale czasowym lub timeseries są ukryte.',
    outsideOfDataRange: 'Poza zakresem danych!',
    annotation: 'Dane bez gwarancji!',
    monthNames: {
      0: 'Jan',
      1: 'Lutego',
      2: 'Zniszczyć',
      3: 'Kwietnia',
      4: 'Maj',
      5: 'Czerwca',
      6: 'Lipca',
      7: 'Sierpień',
      8: 'Września',
      9: 'Październik',
      10: 'Listopada',
      11: 'Grudzień'
    }
  },
  table: {
    time: 'Czas'
  },
  map: {
    userLocation: 'Oto aktualna lokalizacja',
    stationSelection: {
      station: 'Stacja',
      selectAllTimeseries: 'wybierz wszystkie timeseries'
    },
    stationLocation: {
      station: 'Stacja',
      timeseries: 'Timeseries',
      provider: 'Dostawca',
      jumpBackToChart: 'powrót do tabeli'
    },
    providerList: {
      provider: 'Dostawca',
      stations: 'Stacje',
      timeseries: 'Timeseries',
      phenomena: 'Zjawiska'
    },
    search: {
      label: 'szukaj adresu ...',
      noResult: 'Przykro nam, że adres nie został znaleziony.'
    }
  },
  listSelection: {
    header: 'Wybierz timeseries według listy',
    headers: {
      category: 'Kategoria',
      station: 'Stacja',
      phenomenon: 'Zjawisko',
      procedure: 'Czujnik'
    },
    warning: {
      moreThanOneTimeseries: 'Znaleziono więcej niż jedną timeseries'
    }
  },
  legend: {
    entry: {
      noData: 'Brak danych',
      jumpToLastValue: 'przejść do ostatniej wartości',
      firstValueAt: 'Pierwsza wartość w',
      lastValueAt: 'Ostatnia wartość w'
    }
  },
  export: {
    label: 'Dane w formacie CSV (Kod Archiwum)'
  },
  timeSelection: {
    header: 'Zakres czasu',
    presetsHeader: 'presetów',
    presets: {
      lastHour: 'ostatnia godzina',
      today: 'dzisiaj',
      yesterday: 'wczoraj',
      todayYesterday: 'Wczoraj i dziś',
      thisWeek: 'w tym tygodniu',
      lastWeek: 'w zeszłym tygodniu',
      thisMonth: 'w tym miesiącu',
      lastMonth: 'w zeszłym miesiącu',
      thisYear: 'w tym roku',
      lastYear: 'w ubiegłym roku'
    },
    custom: {
      header: 'zwyczaj',
      start: 'Data rozpoczęcia',
      end: 'Data zakończenia'
    },
    warning: {
      startBeforeEnd: 'Data rozpoczęcia nie może być większa niż daty zakończenia',
      maxTimeRange: 'Zakres czasu nie może być większa niż jeden rok'
    }
  },
  styleChange: {
    header: 'Zmień styl',
    currentColor: 'Obecny kolor',
    selectColor: 'Wybierz nowy kolor',
    selectBarInterval: 'Wybierz przedział bar',
    barChartInterval: {
      hour: 'Godzina',
      day: 'Dzień',
      week: 'Tydzień',
      month: 'Miesiąc'
    },
    zeroScaled: 'zerowe skalowane osi Y',
    groupedAxis: 'Oś zgrupowane'
  },
  settings: {
    header: 'Ustawienia',
    chooseLanguage: 'Przełącznik języka',
    requiresRestart: 'Wymaga ponownego uruchomienia!',
    permalink: {
      create: 'Tworzenie odnośnika jako',
      inWindow: 'Link w nowym oknie',
      inMail: 'Link w e-mailu',
      inClipboard: 'Link do schowka',
      clipboardInfo: 'Skopiuj do schowka:',
      inQrCode: 'QR-Code, jak',
      favorite: 'Zapisz środowiska pracy jako ulubionej pozycji'
    },
    clusterMarker: 'Znacznik klaster',
    markerWithLastInfo: {
      header: 'Marker z ostatniej informacji wartości',
      label: 'uwaga - niektóre dostawca danych jest bardzo powolny'
    },
    saveStatus: {
      header: 'Zapisz środowiska',
      label: 'Wszystkie timeseries, skumulowanie i wybrane ustawienia są zapisywane w sposób ciągły.'
    },
    resetStatus: 'Resetowanie środowiska',
    generalizeData: 'uogólnienie danych',
    imprint: {
      header: 'Odcisk',
      github: 'Znajdź projekt na <a href="https://github.com/52North/js-sensorweb-client" target="_blank">GitHub</a>',
      text: '<p> <a href="http://52north.org" target="_blank">52 ° Północna GmbH</a> jest odpowiedzialny za tę stronę. </p><p> 52 ° Północna Inicjatywa na rzecz Open Source Geospatial Software GmbH <br> Martin-Luther-King-Weg 24 <br> 48155 Muenster, Niemcy </p>'
    }
  },
  permalink: {
    noMatchingTimeseriesFound: 'Brak dopasowania timeseries znajduje.'
  },
  guide: {
    start: {
      request: 'Po uruchomieniu tej instrukcji, obecny stan zostanie zresetowany.'
    },
    step1: {
      header: 'JavaScript Klient - wycieczka z przewodnikiem',
      text: 'Ta wycieczka daje w kilku krokach przegląd jak używać tego klienta. Najpierw musimy dodać timeseries z mapy.'
    },
    step2: {
      header: 'Przejdź do mapy',
      text: 'Tutaj możemy przełączyć widok, aby uzyskać mapę.'
    },
    step3: {
      header: 'Widok mapy',
      text: 'To jest mapa. Na mapie widać markery lub markergroups.'
    },
    step4: {
      header: 'Zmiana dostawcy',
      text: 'Tutaj można wybrać innego usługodawcy timeseries.'
    },
    step5: {
      header: 'Pokaż lokalizację',
      text: 'I tu można zlokalizować urządzenie na mapie.'
    },
    step6: {
      header: 'Wybór listy',
      text: 'Tutaj możesz wybrać timeseries z zamówionych list.'
    },
    step7: {
      header: 'Wybierz stację',
      text: 'Wybierz teraz stację na mapie.'
    },
    step8: {
      header: 'Wybierz timeseries',
      text: 'Zaznacz to pole wyboru. Jeśli jest tylko jeden timeseries dla tej stacji, pole wyboru jest już zaznaczone. Teraz można przejść za pomocą przycisku &quot;OK&quot;, aby załadować timeseries.'
    },
    step9: {
      header: 'Wpis Legenda',
      text: 'Tu zobaczysz dodatkową szeregów czasowych. Możesz usunąć lub zlokalizować szereg czasowy lub zmienić kolor.'
    },
    step10: {
      header: 'Wykres',
      text: 'Jest to wykres wybranego cyklu czasowego.'
    },
    step11: {
      header: 'Zmiana czasu',
      text: 'Tutaj możesz zmienić zakres czasowy dla wybranego szeregu czasowego.'
    },
    step12: {
      header: 'Tabela Zobacz',
      text: 'Tutaj masz stolik surowych wartości danych do wybranego szeregu czasowego.'
    },
    step13: {
      header: 'Ulubiona zarządzanie',
      text: 'Wpisy legendy / timeseries można zapisać jako ulubione. Z tego punktu widzenia wszystkie ulubione są wymienione i mogą być utrzymane.'
    },
    step14: {
      header: 'Ukończony',
      text: 'Well done! <br> Ten klient jest produktem <a href="http://52north.org" target="_blank">52 ° Północnej GmbH</a> . Można znaleźć kod źródłowy na <a href="https://github.com/52North/js-sensorweb-client" target="_blank">GitHub</a> .'
    }
  },
  favorite: {
    firstValueAt: 'Pierwsza wartość w',
    lastValueAt: 'Ostatnia wartość w',
    label: 'ulubiony',
    edit: {
      header: 'Edycja ulubiona'
    },
    group: {
      add: 'Stan &#39;{0}&#39; jest dodawany do listy ulubionych.',
      exists: 'Status ten nadal istnieje.',
      noTimeseries: 'Obecnie nie ma timeseries wybiera.',
      notSupported: 'Dostawcą wpisu statusu &#39;{0}&#39; nie jest obsługiwany i nie może być załadowany.'
    },
    single: {
      add: 'Nowy ulubiony &#39;{0}&#39; jest dodawane do listy.',
      remove: 'Ulubiona &#39;{0}&#39; jest usuwana.',
      exists: 'To ulubiona nadal istnieje.',
      notSupported: 'Udzielający ulubionych &#39;{0}&#39; nie jest obsługiwany i nie może być załadowany.'
    },
    import: {
      override: 'Czy chcesz zastąpić bieżące ulubione?',
      wrongFile: 'Nie można odczytać pliku',
      noValidJson: 'Plik JSON nie jest ważny!',
      header: 'Importowanie ulubionych',
      text: 'Tutaj można importować wyeksportowane ulubionych. Wystarczy wkleić JSON w polu tekstowym:'
    },
    export: {
      header: 'Eksport ulubionych',
      text: 'Tutaj można eksportować swoje ulubione. Wystarczy skopiować JSON z tego pola tekstowego i zapisać go w pliku, aby go importować później:'
    },
    error: {
      fileApiNotSupported: 'API plików nie są w pełni obsługiwane w tej przeglądarce.'
    }
  },
  inform: {
    error: 'Wystąpił błąd:',
    warn: 'Proszę pamiętać, że:'
  }
};
