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
i18n.el = {
  fullName: 'Αγγλικά',
  ok: 'OK',
  main: {
    legend: 'Θρύλος',
    diagram: 'Διάγραμμα',
    mapView: 'Προβολή χάρτη',
    favoriteView: 'Αγαπημένα',
    settings: 'Ρυθμίσεις',
    stationSelection: 'Επιλέξτε ένα σταθμό',
    chartView: 'Προβολή γραφήματος',
    allPhenomena: 'Όλα τα Φαινόμενα',
    phenomenon: 'Φαινόμενο',
    favoritesList: 'Αγαπημένα',
    importFavorites: 'Εισαγωγή',
    exportFavorites: 'Εξαγωγή',
    importExportHelp: 'Για να εισαγάγετε ένα αρχείο, επιλέξτε ένα αρχείο που εξάγονται πριν.',
    noFileSelected: 'Δεν έχει επιλεγεί αρχείο'
  },
  chart: {
    noTimeseriesSelected: 'Έχετε επιλέξει δεν χρονοσειρών, οι επιλεγμένες χρονοσειρών δεν έχουν τιμές στο δεδομένο χρονικό διάστημα ή οι χρονοσειρές είναι κρυφό.',
    outsideOfDataRange: 'Έξω από την περιοχή δεδομένων!',
    annotation: 'Τα στοιχεία χωρίς εγγύηση!',
    monthNames: {
      0: 'Ιαν',
      1: 'Φεβρουάριος',
      2: 'Mar',
      3: 'Απρίλιος',
      4: 'Μάιος',
      5: 'Ιούνιος',
      6: 'Ιούλιος',
      7: 'Αύγουστος',
      8: 'Σεπτέμβριος',
      9: 'Οκτώβριο',
      10: 'Νοέμβριος',
      11: 'Δεκέμβριος'
    }
  },
  table: {
    time: 'Ώρα'
  },
  map: {
    userLocation: 'Εδώ είναι η τρέχουσα τοποθεσία σας',
    stationSelection: {
      station: 'Σταθμός',
      selectAllTimeseries: 'επιλέξετε όλες τις χρονοσειρές'
    },
    stationLocation: {
      station: 'Σταθμός',
      timeseries: 'Χρονοσειρά',
      provider: 'Προμηθευτής',
      jumpBackToChart: 'πίσω στο διάγραμμα'
    },
    providerList: {
      provider: 'Προμηθευτής',
      stations: 'Σταθμοί',
      timeseries: 'Χρονοσειρά',
      phenomena: 'Φαινόμενα'
    },
    search: {
      label: 'αναζήτηση διεύθυνσης ...',
      noResult: 'Λυπούμαστε, αλλά αυτή η διεύθυνση δεν θα μπορούσε να βρεθεί.'
    }
  },
  listSelection: {
    header: 'Επιλέξτε χρονοσειρές από λίστα',
    headers: {
      category: 'Κατηγορία',
      station: 'Σταθμός',
      phenomenon: 'Φαινόμενο',
      procedure: 'Αισθητήρας'
    },
    warning: {
      moreThanOneTimeseries: 'βρέθηκαν περισσότερες από μία χρονοσειρά'
    }
  },
  legend: {
    entry: {
      noData: 'Δεν υπάρχουν διαθέσιμα στοιχεία',
      jumpToLastValue: 'άλμα στην τελευταία τιμή',
      firstValueAt: 'Πρώτη αξία σε',
      lastValueAt: 'Τελευταία αξία σε'
    }
  },
  export: {
    label: 'Τα δεδομένα ως CSV (Zip Αρχείο)'
  },
  timeSelection: {
    header: 'Χρονικό διάστημα',
    presetsHeader: 'προεπιλογές',
    presets: {
      lastHour: 'τελευταία ώρα',
      today: 'σήμερα',
      yesterday: 'εχθές',
      todayYesterday: 'σήμερα και χθες',
      thisWeek: 'αυτή την εβδομάδα',
      lastWeek: 'την περασμένη εβδομάδα',
      thisMonth: 'Αυτό το μήνα',
      lastMonth: 'τον περασμένο μήνα',
      thisYear: 'φέτος',
      lastYear: 'πέρυσι'
    },
    custom: {
      header: 'έθιμο',
      start: 'Ημερομηνία έναρξης',
      end: 'Ημερομηνία λήξης'
    },
    warning: {
      startBeforeEnd: 'Η ημερομηνία έναρξης δεν μπορεί να είναι μεγαλύτερη από την ημερομηνία λήξης',
      maxTimeRange: 'Το εύρος του χρόνου δεν μπορεί να είναι μεγαλύτερη του ενός έτους'
    }
  },
  styleChange: {
    header: 'Αλλαγή στυλ',
    currentColor: 'Τρέχουσα χρώμα',
    selectColor: 'Επιλέξτε ένα νέο χρώμα',
    selectBarInterval: 'Επιλέξτε το διάστημα μπαρ',
    barChartInterval: {
      hour: 'Ώρα',
      day: 'Ημέρα',
      week: 'Εβδομάδα',
      month: 'Μήνας'
    },
    zeroScaled: 'μηδέν κλίμακα Y-άξονα',
    groupedAxis: 'ομαδοποιούνται άξονα'
  },
  settings: {
    header: 'Ρυθμίσεις',
    chooseLanguage: 'Αλλαγή γλώσσας',
    requiresRestart: 'Ανάγκες Επανεκκίνηση!',
    permalink: {
      create: 'Δημιουργήστε ένα permalink ως',
      inWindow: 'σύνδεσμο σε νέο παράθυρο',
      inMail: 'σύνδεσμο σε ένα μήνυμα ηλεκτρονικού ταχυδρομείου',
      inClipboard: 'Σύνδεση στο πρόχειρο',
      clipboardInfo: 'Αντιγραφή στο πρόχειρο:',
      inQrCode: 'ως QR-Code',
      favorite: 'Αποθήκευση εργασιακό περιβάλλον ως αγαπημένο είσοδο'
    },
    clusterMarker: 'σύμπλεγμα δείκτη',
    markerWithLastInfo: {
      header: 'δείκτη με πληροφορίες τελευταία τιμή',
      label: 'προσοχή - κάποια υπηρεσία παροχής δεδομένων είναι πολύ αργή'
    },
    saveStatus: {
      header: 'Αποθήκευση περιβάλλον',
      label: 'Όλες οι χρονοσειρές, η επιλεγμένη χρονικού διαστήματος και οι ρυθμίσεις που έχουν αποθηκευτεί συνεχής.'
    },
    resetStatus: 'Επαναφορά περιβάλλον',
    generalizeData: 'γενίκευση των δεδομένων',
    imprint: {
      header: 'Αποτύπωμα',
      github: 'Βρείτε αυτό το έργο στο <a href="https://github.com/52North/js-sensorweb-client" target="_blank">GitHub</a>',
      text: '<p> <a href="http://52north.org" target="_blank">52 ° Βόρεια GmbH</a> είναι υπεύθυνη για αυτή την ιστοσελίδα. </p><p> 52 ° Βόρεια Πρωτοβουλία για Γεωχωρικών Λογισμικό Ανοικτού Κώδικα GmbH <br> Martin-Luther-King-Weg 24 <br> 48155 Μούνστερ, Γερμανία </p>'
    }
  },
  permalink: {
    noMatchingTimeseriesFound: 'Δεν ταιριάζουν χρονοσειρά βρίσκεται.'
  },
  guide: {
    start: {
      request: 'Όταν ξεκινάτε αυτόν τον οδηγό, η η σημερινή κατάσταση θα μηδενιστεί.'
    },
    step1: {
      header: 'JavaScript Πελάτης - Ξενάγηση',
      text: 'Αυτή η περιήγηση δίνει σε λίγα βήματα μια επισκόπηση πώς να χρησιμοποιήσετε αυτόν τον πελάτη. Πρώτα προσθέτουμε ένα χρονοσειρές από το χάρτη.'
    },
    step2: {
      header: 'Μετάβαση στο χάρτη',
      text: 'Εδώ αλλάξετε την προβολή για να πάρετε ένα χάρτη.'
    },
    step3: {
      header: 'Προβολή χάρτη',
      text: 'Αυτή είναι η προβολή χάρτη. Στο χάρτη μπορείτε να δείτε δείκτες ή markergroups.'
    },
    step4: {
      header: 'Αλλαγή Provider',
      text: 'Εδώ μπορείτε να επιλέξετε έναν άλλο πάροχο χρονοσειρών.'
    },
    step5: {
      header: 'Παρουσιάστε την τοποθεσία',
      text: 'Και εδώ μπορείτε να εντοπίσετε τη συσκευή σας στο χάρτη.'
    },
    step6: {
      header: 'Λίστα επιλογής',
      text: 'Εδώ μπορείτε να επιλέξετε μια χρονοσειρά από ταξινομημένες λίστες.'
    },
    step7: {
      header: 'Επιλέξτε ένα σταθμό',
      text: 'Επιλέξτε τώρα ένα σταθμό στο χάρτη.'
    },
    step8: {
      header: 'Επιλέξτε χρονοσειρά',
      text: 'Επιλέξτε αυτό το πλαίσιο ελέγχου. Εάν υπάρχει μόνο μία χρονοσειρά για το σταθμό αυτό, το πλαίσιο ελέγχου είναι ήδη επιλεγμένο. Τώρα μπορείτε να πάτε με το πλήκτρο &quot;OK&quot; για να φορτώσετε τις χρονοσειρές.'
    },
    step9: {
      header: 'Καταχώρηση Υπόμνημα',
      text: 'Εδώ μπορείτε να δείτε την προστιθέμενη χρονοσειρές. Μπορείτε να διαγράψετε ή να εντοπίσετε τις χρονοσειρές ή να αλλάξετε το χρώμα.'
    },
    step10: {
      header: 'Διάγραμμα',
      text: 'Αυτό είναι το διάγραμμα του επιλεγμένου χρονοσειρών.'
    },
    step11: {
      header: 'Αλλαγή του χρόνου',
      text: 'Εδώ μπορείτε να αλλάξετε την ώρα έκταση για την επιλεγμένη σειρά το χρόνο σας.'
    },
    step12: {
      header: 'Πίνακας Προβολή',
      text: 'Εδώ μπορείτε να πάρετε έναν πίνακα των πρώτων τιμών δεδομένων για την επιλεγμένη σειρά το χρόνο σας.'
    },
    step13: {
      header: 'Αγαπημένη διαχείριση',
      text: 'Οι καταχωρήσεις θρύλος / χρονοσειρά θα μπορούσαν να αποθηκευτούν ως αγαπημένα. Σε αυτή την άποψη όλα τα αγαπημένα που αναφέρονται και θα μπορούσε να διατηρηθεί.'
    },
    step14: {
      header: 'Ολοκληρώθηκε',
      text: 'Μπράβο! <br> Ο πελάτης είναι ένα προϊόν <a href="http://52north.org" target="_blank">52 ° North GmbH</a> . Μπορείτε να βρείτε τον πηγαίο κώδικα για <a href="https://github.com/52North/js-sensorweb-client" target="_blank">GitHub</a> .'
    }
  },
  favorite: {
    firstValueAt: 'Πρώτη αξία σε',
    lastValueAt: 'Τελευταία αξία σε',
    label: 'αγαπημένο',
    edit: {
      header: 'Επεξεργασία αγαπημένο'
    },
    group: {
      add: 'Η ιδιότητα &#39;{0}&#39; προστέθηκε στη λίστα αγαπημένων.',
      exists: 'Αυτή η κατάσταση εξακολουθεί να υπάρχει.',
      noTimeseries: 'Προς το παρόν δεν υπάρχουν χρονοσειρές επιλεγεί.',
      notSupported: 'Ο πάροχος της εισόδου του καθεστώτος &#39;{0}&#39; δεν υποστηρίζεται και δεν μπορεί να φορτωθεί.'
    },
    single: {
      add: 'Ένα νέο αγαπημένο &#39;{0}&#39;, προστίθεται στη λίστα.',
      remove: 'Το αγαπημένο &#39;{0}&#39; έχει αφαιρεθεί.',
      exists: 'Αυτό το αγαπημένο εξακολουθεί να υφίσταται.',
      notSupported: 'Ο πάροχος της αγαπημένο &#39;{0}&#39; δεν υποστηρίζεται και δεν μπορεί να φορτωθεί.'
    },
    import: {
      override: 'Θέλετε να παρακάμψετε την τρέχουσα αγαπημένα σας;',
      wrongFile: 'Δεν ήταν δυνατή η ανάγνωση του αρχείου',
      noValidJson: 'Το αρχείο JSON δεν είναι έγκυρο!',
      header: 'Εισαγωγή αγαπημένα',
      text: 'Εδώ μπορείτε να εισάγετε εξάγονται τα αγαπημένα σας. Απλά επικολλήστε το JSON σε αυτό το πεδίο κειμένου:'
    },
    export: {
      header: 'Εξαγωγή αγαπημένα',
      text: 'Εδώ μπορείτε να εξάγετε τα αγαπημένα σας. Απλά αντιγράψτε το JSON έξω από αυτό το πλαίσιο κειμένου και να το αποθηκεύσετε σε ένα αρχείο για να το εισάγετε αργότερα:'
    },
    error: {
      fileApiNotSupported: 'Τα APIs αρχείων δεν υποστηρίζονται πλήρως σε αυτό το πρόγραμμα περιήγησης.'
    }
  },
  inform: {
    error: 'Προέκυψε σφάλμα:',
    warn: 'Να θυμάστε ότι:'
  }
};
