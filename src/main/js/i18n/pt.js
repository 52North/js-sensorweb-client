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
i18n.pt = {
  fullName: 'Português',
  ok: 'ESTÁ BEM',
  main: {
    legend: 'Lenda',
    diagram: 'Diagrama',
    mapView: 'Ver o mapa',
    favoriteView: 'Favoritos',
    settings: 'Definições',
    stationSelection: 'Selecione uma estação',
    chartView: 'Vista Gráfico',
    allPhenomena: 'Todos os Fenômenos',
    phenomenon: 'Fenómeno',
    favoritesList: 'Favoritos',
    importFavorites: 'Importação',
    exportFavorites: 'Exportação',
    importExportHelp: 'Para importar um arquivo, por favor, escolha um arquivo exportado antes.',
    noFileSelected: 'No arquivo selecionado'
  },
  chart: {
    noTimeseriesSelected: 'Você selecionou nenhum timeseries, os timeseries selecionados têm nenhum valor no intervalo de tempo determinado ou os timeseries estão ocultas.',
    outsideOfDataRange: 'Fora do intervalo de dados!',
    annotation: 'Dados sem garantia!',
    monthNames: [ 'Jan', 'Fevereiro', 'Estragar', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ]
  },
  table: {
    time: 'Tempo'
  },
  map: {
    userLocation: 'Aqui está a sua localização actual',
    stationSelection: {
      station: 'Estação',
      selectAllTimeseries: 'selecionar todos os timeseries'
    },
    stationLocation: {
      station: 'Estação',
      timeseries: 'Timeseries',
      provider: 'Provedor',
      jumpBackToChart: 'de volta ao gráfico'
    },
    providerList: {
      provider: 'Provedor',
      stations: 'Estações',
      timeseries: 'Timeseries',
      phenomena: 'Fenómenos'
    },
    search: {
      label: 'procurar endereço ...',
      noResult: 'Desculpe, o endereço não pôde ser encontrado.'
    }
  },
  listSelection: {
    header: 'Selecione timeseries por lista',
    headers: {
      category: 'Categoria',
      station: 'Estação',
      phenomenon: 'Fenómeno',
      procedure: 'Sensor'
    },
    warning: {
      moreThanOneTimeseries: 'encontrado mais de um timeseries'
    }
  },
  legend: {
    entry: {
      noData: 'Não há dados disponíveis',
      jumpToLastValue: 'Ir para o último valor',
      firstValueAt: 'Primeiro valor em',
      lastValueAt: 'Última valor em'
    }
  },
  export: {
    label: 'Dados como CSV (arquivo ZIP)'
  },
  timeSelection: {
    header: 'Intervalo de tempo',
    presetsHeader: 'presets',
    presets: {
      lastHour: 'última hora',
      today: 'hoje',
      yesterday: 'ontem',
      todayYesterday: 'hoje e ontem',
      thisWeek: 'esta semana',
      lastWeek: 'semana passada',
      thisMonth: 'este mês',
      lastMonth: 'mês passado',
      thisYear: 'este ano',
      lastYear: 'ano passado'
    },
    custom: {
      header: 'personalizado',
      start: 'Data de início',
      end: 'A data de término'
    },
    warning: {
      startBeforeEnd: 'A data de início não pode ser maior que a data final',
      maxTimeRange: 'O intervalo de tempo não pode ser maior que um ano'
    }
  },
  styleChange: {
    header: 'Mude o estilo',
    currentColor: 'Cor atual',
    selectColor: 'Selecione uma nova cor',
    selectBarInterval: 'Selecione o intervalo de bar',
    barChartInterval: {
      hour: 'Hora',
      day: 'Dia',
      week: 'Semana',
      month: 'Mês'
    },
    zeroScaled: 'eixo Y em escala de zero',
    groupedAxis: 'eixo agrupados'
  },
  settings: {
    header: 'Definições',
    chooseLanguage: 'Switch language',
    requiresRestart: 'Necessidades Restart!',
    permalink: {
      create: 'Criar um permalink como',
      inWindow: 'link em uma nova janela',
      inMail: 'link em um e-mail',
      inClipboard: 'Link para a área de transferência',
      clipboardInfo: 'Copiar para a área de transferência:',
      inQrCode: 'como QR-Code',
      favorite: 'Salve ambiente de trabalho como entrada favorito'
    },
    clusterMarker: 'marcador de cluster',
    markerWithLastInfo: {
      header: 'marcador com informações último valor',
      label: 'atenção - alguns provedor de dados são muito lentos'
    },
    saveStatus: {
      header: 'Salvar ambiente',
      label: 'Todos os timeseries, o período de tempo selecionado e as configurações são salvas contínua.'
    },
    resetStatus: 'Ambiente de redefinição',
    generalizeData: 'generalizar dados',
    imprint: {
      header: 'Cunho',
      github: 'Encontre este projeto no <a href="https://github.com/52North/js-sensorweb-client" target="_blank">GitHub</a>',
      text: '<p> <a href="http://52north.org" target="_blank">52 ° Norte GmbH</a> é responsável por este site. </p><p> 52 ° Iniciativa do Norte para a Open Source Geospatial Software GmbH <br> Martin-Luther-King-Weg 24 <br> 48155 Muenster, Alemanha </p>'
    }
  },
  permalink: {
    noMatchingTimeseriesFound: 'Nenhum timeseries correspondente for encontrado.'
  },
  guide: {
    start: {
      request: 'Quando você iniciar este guia, o estado atual será reiniciado.'
    },
    step1: {
      header: 'JavaScript Cliente - Visita Guiada',
      text: 'Esse passeio dá em poucos passos uma visão geral como usar este cliente. Primeiro vamos adicionar timeseries do mapa.'
    },
    step2: {
      header: 'Ir para o mapa',
      text: 'Aqui vamos alterar a vista para obter um mapa.'
    },
    step3: {
      header: 'Ver o mapa',
      text: 'Esta é a visualização do mapa. No mapa você pode ver marcadores ou markergroups.'
    },
    step4: {
      header: 'Mudança Provider',
      text: 'Aqui você pode selecionar outro provedor timeseries.'
    },
    step5: {
      header: 'Mostrar localização',
      text: 'E aqui você pode localizar o seu dispositivo no mapa.'
    },
    step6: {
      header: 'Lista seleção',
      text: 'Aqui você pode selecionar um timeseries fora de listas ordenadas.'
    },
    step7: {
      header: 'Selecione uma estação',
      text: 'Por favor, selecione agora uma estação no mapa.'
    },
    step8: {
      header: 'Select timeseries',
      text: 'Selecione esta caixa de seleção. Se houver apenas um timeseries para esta estação, a caixa de seleção já está marcada. Agora você pode ir em frente com o botão &quot;OK&quot; para carregar os timeseries.'
    },
    step9: {
      header: 'Entrada Legend',
      text: 'Aqui você vê a série temporal acrescentou. Você pode excluir ou localizar a série de tempo ou mudar a cor.'
    },
    step10: {
      header: 'Gráfico',
      text: 'Este é o gráfico da série de tempo selecionado.'
    },
    step11: {
      header: 'Alterar o tempo',
      text: 'Aqui você pode alterar a extensão do tempo para a sua série de tempo selecionado.'
    },
    step12: {
      header: 'Table View',
      text: 'Aqui você tem uma tabela com os valores de dados brutos para sua série de tempo selecionado.'
    },
    step13: {
      header: 'Gestão Favorita',
      text: 'As entradas de legenda / timeseries poderiam ser salvos como favoritos. Neste ponto de vista todos os favoritos são listados e poderia ser mantida.'
    },
    step14: {
      header: 'Terminado',
      text: 'Bem feito! <br> Este cliente é um produto de <a href="http://52north.org" target="_blank">52 ° Norte GmbH</a> . Você pode encontrar o código fonte no <a href="https://github.com/52North/js-sensorweb-client" target="_blank">GitHub</a> .'
    }
  },
  favorite: {
    firstValueAt: 'Primeiro valor em',
    lastValueAt: 'Última valor em',
    label: 'favorito',
    edit: {
      header: 'Editar favorito'
    },
    group: {
      add: 'O status &#39;{0}&#39; é adicionado à lista de favoritos.',
      exists: 'Esse status ainda existe.',
      noTimeseries: 'Atualmente não há timeseries são selecionados.',
      notSupported: 'O provedor de uma entrada do status &#39;{0}&#39; não é suportada e não pode ser carregado.'
    },
    single: {
      add: 'Um novo favorito &#39;{0}&#39; é adicionado à lista.',
      remove: 'O favorito &#39;{0}&#39; é removido.',
      exists: 'Este favorito ainda existe.',
      notSupported: 'O provedor do favorito &#39;{0}&#39; não é suportado e não pode ser carregado.'
    },
    import: {
      override: 'Você quer substituir seus favoritos atuais?',
      wrongFile: 'Não foi possível ler o arquivo',
      noValidJson: 'O arquivo JSON não é válido!',
      header: 'Importar favoritos',
      text: 'Aqui você pode importar seus favoritos exportados. Basta colar o JSON neste campo de texto:'
    },
    export: {
      header: 'Exportar favoritos',
      text: 'Aqui você pode exportar seus favoritos. Basta copiar o JSON fora desta caixa de texto e salvá-lo em um arquivo para importá-lo mais tarde:'
    },
    error: {
      fileApiNotSupported: 'As APIs de arquivos não são totalmente suportados neste browser.'
    }
  },
  inform: {
    error: 'Ocorreu um erro:',
    warn: 'Lembre-se que:'
  }
};
