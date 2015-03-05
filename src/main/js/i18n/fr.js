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
i18n.fr = {
  fullName: 'Anglais',
  ok: 'D&#39;ACCORD',
  main: {
    legend: 'Légende',
    diagram: 'Diagramme',
    mapView: 'Voir la carte',
    favoriteView: 'Favoris',
    settings: 'Paramètres',
    stationSelection: 'Sélectionnez une station',
    chartView: 'vue graphique',
    allPhenomena: 'Tous les phénomènes',
    phenomenon: 'Phénomène',
    favoritesList: 'Favoris',
    importFavorites: 'Importation',
    exportFavorites: 'Exportation',
    importExportHelp: 'Pour importer un fichier, se il vous plaît choisir un fichier que vous avez exporté auparavant.',
    noFileSelected: 'Aucun fichier sélectionné'
  },
  chart: {
    noTimeseriesSelected: 'Vous avez sélectionné aucun timeseries, les séries chronologiques sélectionnées ne ont pas de valeurs dans l&#39;intervalle de temps donné ou les séries chronologiques sont cachés.',
    outsideOfDataRange: 'En dehors de la plage de données!',
    annotation: 'Données sans garantie!',
    monthNames: [ 'Jan', 'Février', 'Mar', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre' ]
  },
  table: {
    time: 'Temps'
  },
  map: {
    userLocation: 'Voici votre position actuelle',
    stationSelection: {
      station: 'Station',
      selectAllTimeseries: 'sélectionner toutes les séries chronologiques'
    },
    stationLocation: {
      station: 'Station',
      timeseries: 'Timeseries',
      provider: 'Fournisseur',
      jumpBackToChart: 'Retour au tableau'
    },
    providerList: {
      provider: 'Fournisseur',
      stations: 'Stations',
      timeseries: 'Timeseries',
      phenomena: 'Phénomènes'
    },
    search: {
      label: 'Recherche d&#39;adresse ...',
      noResult: 'Désolé, cette adresse n&#39;a pu être trouvée.'
    }
  },
  listSelection: {
    header: 'Sélectionnez timeseries par liste',
    headers: {
      category: 'Catégorie',
      station: 'Station',
      phenomenon: 'Phénomène',
      procedure: 'Capteur'
    },
    warning: {
      moreThanOneTimeseries: 'trouvé plus d&#39;un timeseries'
    }
  },
  legend: {
    entry: {
      noData: 'Aucune donnée disponible',
      jumpToLastValue: 'sauter à la dernière valeur',
      firstValueAt: 'Première valeur à',
      lastValueAt: 'Dernière valeur au'
    }
  },
  export: {
    label: 'Les données au format CSV (Archive Zip)'
  },
  timeSelection: {
    header: 'Plage de temps',
    presetsHeader: 'presets',
    presets: {
      lastHour: 'dernière heure',
      today: 'aujourd&#39;hui',
      yesterday: 'hier',
      todayYesterday: 'aujourd&#39;hui et hier',
      thisWeek: 'cette semaine',
      lastWeek: 'la semaine dernière',
      thisMonth: 'ce mois-ci',
      lastMonth: 'mois dernier',
      thisYear: 'cette année',
      lastYear: 'l&#39;année dernière'
    },
    custom: {
      header: 'coutume',
      start: 'Date de début',
      end: 'Date de fin'
    },
    warning: {
      startBeforeEnd: 'La date de début ne peut pas être supérieur à la date de fin',
      maxTimeRange: 'La plage de temps ne peut pas être supérieur à un année'
    }
  },
  styleChange: {
    header: 'Changer le style',
    currentColor: 'Couleur actuelle',
    selectColor: 'Sélectionnez une nouvelle couleur',
    selectBarInterval: 'Sélectionnez l&#39;intervalle de bar',
    barChartInterval: {
      hour: 'Heure',
      day: 'Jour',
      week: 'Semaine',
      month: 'Mois'
    },
    zeroScaled: 'zéro axe Y mises à l&#39;échelle',
    groupedAxis: 'axe regroupés'
  },
  settings: {
    header: 'Paramètres',
    chooseLanguage: 'Changer de langue',
    requiresRestart: 'Redémarrer besoins!',
    permalink: {
      create: 'Créez un permalien que',
      inWindow: 'lien dans une nouvelle fenêtre',
      inMail: 'lien dans un email',
      inClipboard: 'Lien vers le presse-papiers',
      clipboardInfo: 'Copier dans le presse-papiers:',
      inQrCode: 'que QR-Code',
      favorite: 'Enregistrer environnement de travail que l&#39;entrée préférée'
    },
    clusterMarker: 'marqueur pôle',
    markerWithLastInfo: {
      header: 'marqueur des informations de dernière valeur',
      label: 'attention - certains fournisseurs de données sont très lents'
    },
    saveStatus: {
      header: 'Sauvegarder l&#39;environnement',
      label: 'Toutes les séries chronologiques, le laps de temps sélectionné et les paramètres sont enregistrés en continu.'
    },
    resetStatus: 'Réinitialiser environnement',
    generalizeData: 'généraliser données',
    imprint: {
      header: 'Empreinte',
      github: 'Trouvez ce projet à <a href="https://github.com/52North/js-sensorweb-client" target="_blank">GitHub</a>',
      text: '<p> <a href="http://52north.org" target="_blank">52 ° Nord GmbH</a> est responsable de ce site. </p><p> 52 ° Initiative du Nord pour Geospatial Open Source Software GmbH <br> Martin-Luther-King-Weg 24 <br> 48155 Münster, Allemagne </p>'
    }
  },
  permalink: {
    noMatchingTimeseriesFound: 'Pas de séries chronologiques est trouvé.'
  },
  guide: {
    start: {
      request: 'Lorsque vous démarrez ce guide, le l&#39;état actuel sera réinitialisé.'
    },
    step1: {
      header: 'JavaScript client - Visite guidée',
      text: 'Cette visite donne en quelques étapes un aperçu comment utiliser ce client. D&#39;abord, nous ajoutons un timeseries de la carte.'
    },
    step2: {
      header: 'Accéder à la carte',
      text: 'Ici, nous passons la vue pour obtenir une carte.'
    },
    step3: {
      header: 'Voir la carte',
      text: 'Ce est la vue de la carte. Dans la carte vous pouvez voir des marqueurs ou markergroups.'
    },
    step4: {
      header: 'Changer de fournisseur',
      text: 'Ici vous pouvez choisir un autre fournisseur de séries chronologiques.'
    },
    step5: {
      header: 'Montrer emplacement',
      text: 'Et là, vous pouvez localiser votre appareil sur la carte.'
    },
    step6: {
      header: 'Sélection d&#39;une liste',
      text: 'Ici vous pouvez sélectionner un timeseries sur les listes ordonnées.'
    },
    step7: {
      header: 'Sélectionnez une station',
      text: 'Se il vous plaît sélectionnez maintenant une station sur la carte.'
    },
    step8: {
      header: 'Sélectionnez timeseries',
      text: 'Cochez cette case. Se il ya seulement une séries chronologiques pour cette station, la case est déjà cochée. Maintenant vous pouvez aller avec le bouton &quot;OK&quot; pour charger les séries chronologiques.'
    },
    step9: {
      header: 'Légende entrée',
      text: 'Ici, vous voyez la série de temps additionnel. Vous pouvez supprimer ou de localiser la série de temps ou de modifier la couleur.'
    },
    step10: {
      header: 'Graphique',
      text: 'Ce est le tableau de la série de temps sélectionné.'
    },
    step11: {
      header: 'Changer temps',
      text: 'Ici vous pouvez changer la mesure de temps pour votre série de temps sélectionné.'
    },
    step12: {
      header: 'Table View',
      text: 'Ici, vous obtenez un tableau des valeurs de données brutes à votre série de temps sélectionné.'
    },
    step13: {
      header: 'Gestion des Signets',
      text: 'Les entrées de légende / séries chronologiques pourraient être enregistrés comme favoris. Dans ce point de vue tous les favoris sont répertoriés et peuvent être maintenues.'
    },
    step14: {
      header: 'Fini',
      text: 'Bravo! <br> Ce client est un produit de <a href="http://52north.org" target="_blank">52 ° Nord GmbH</a> . Vous pouvez trouver le code source sur <a href="https://github.com/52North/js-sensorweb-client" target="_blank">GitHub</a> .'
    }
  },
  favorite: {
    firstValueAt: 'Première valeur à',
    lastValueAt: 'Dernière valeur au',
    label: 'favori',
    edit: {
      header: 'Modifier préférée'
    },
    group: {
      add: 'Le statut &#39;{0}&#39; est ajouté à la liste des favoris.',
      exists: 'Ce statut existe toujours.',
      noTimeseries: 'Actuellement aucun timeseries sont sélectionnés.',
      notSupported: 'Le fournisseur d&#39;une entrée de l&#39;état &#39;{0}&#39; ne est pas supporté et ne peut pas être chargé.'
    },
    single: {
      add: 'Un nouveau favori &#39;{0}&#39; est ajouté à la liste.',
      remove: 'Le favori &#39;{0}&#39; est retiré.',
      exists: 'Ce favori existe toujours.',
      notSupported: 'Le fournisseur de la favorite &#39;{0}&#39; ne est pas supporté et ne peut pas être chargé.'
    },
    import: {
      override: 'Voulez-vous remplacer vos favoris actuels?',
      wrongFile: 'Impossible de lire le fichier',
      noValidJson: 'Le fichier JSON est pas valide!',
      header: 'favoris d&#39;importation',
      text: 'Ici vous pouvez importer vos favoris exportés. Il suffit de coller l&#39;JSON dans ce champ de texte:'
    },
    export: {
      header: 'Exporter les favoris',
      text: 'Ici vous pouvez exporter vos favoris. Il suffit de copier le JSON sortir de cette zone de texte et l&#39;enregistrer dans un fichier à importer plus tard:'
    },
    error: {
      fileApiNotSupported: 'Les API de fichiers ne sont pas entièrement pris en charge dans ce navigateur.'
    }
  },
  inform: {
    error: 'Une erreur est survenue:',
    warn: 'Se il vous plaît ne oubliez pas que:'
  }
};
