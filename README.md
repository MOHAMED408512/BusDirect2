busdirect-partie2/
├── index.html page Trajets
├── cabine.html page Cabine d'un trajet
├── data/
│ └── trips.json 20 trajets (lecture seule)
├── js/
│ ├── store.js données
│ │ ├── initialiser() localStorage, sinon fetch de trips.json
│ │ └── sauvegarder(trips) enregistre dans le localStorage
│ │
│ ├── validators.js validations
│ │ ├── REGEX_TELEPHONE
│ │ └── validerPassager(trip, p) nom vide ou en double, téléphone invalide ou en double
│ │
│ ├── reservations.js logique (aucun DOM)
│ │ ├── placesLibres(trip) capacity - reservations.length
│ │ ├── estVIP(siege) sièges 01 à 04
│ │ ├── prixSiege(prix, siege) +10 % si VIP
│ │ ├── recetteTrajet(trip) reduce
│ │ ├── reserver(trip, p, siege)
│ │ ├── modifier(trip, siege, p)
│ │ ├── annuler(trip, siege) + 1er en attente obtient le siège
│ │ ├── inscrireEnAttente(trip, p)
│ │ └── retirerDeAttente(trip, i)
│ │
│ ├── render.js affichage
│ │ ├── renderTrajets(trips) cartes
│ │ ├── renderPagination(page, total)
│ │ ├── renderCabine(trip) en-tête + 20 sièges
│ │ ├── renderListeAttente(trip)
│ │ └── afficherMessage(el, texte) masqué après 3 secondes
│ │
│ ├── main-trajets.js point d'entrée de index.html
│ │ └── afficher() recherche + filtre + page courante
│ │
│ └── main-cabine.js point d'entrée de cabine.html
│ └── afficherTout() réaffiche la cabine après chaque action
│
└── README.md
