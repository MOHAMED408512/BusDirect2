BusDirect

Site de réservation de places de bus. Projet de formation, partie 2.

## Description

BusDirect permet de consulter une liste de trajets, d'ouvrir la cabine d'un trajet et de gérer les réservations de ses 20 places. Les données viennent d'un fichier JSON, puis sont conservées dans le localStorage.

## Pages

- **index.html** : liste des trajets avec statistiques du réseau, recherche par ville, filtre par statut (Tous, Disponible, Complet) et pagination de 6 trajets.
- **cabine.html** : plan des 20 sièges d'un trajet, avec les formulaires Réserver, Modifier, Annuler et Liste d'attente.

## Fonctionnalités

- Statistiques du réseau : passagers, recette, trajets, personnes en attente
- Recherche par ville et filtre Disponible / Complet
- Pagination de 6 trajets par page
- Plan de la cabine : 2 sièges, une allée, 2 sièges
- Sièges VIP (1 à 4) avec un prix majoré de 10 %
- Réservation avec validation du nom et du téléphone
- Modification et annulation d'une réservation
- Liste d'attente : le premier inscrit reçoit le siège libéré
- Données conservées après actualisation (localStorage)

## Organisation des modules

Dossier `js/` :

- `store.js` : lecture du JSON avec fetch, sauvegarde et chargement du localStorage
- `reservations.js` : places libres, trajet complet, sièges VIP, prix d'un siège
- `validators.js` : validation du nom et du téléphone
- `render.js` : HTML d'une carte de trajet
- `main-trajets.js` : logique de la page des trajets
- `main-cabine.js` : logique de la page de la cabine

Les données de départ sont dans `data/trips.json`.

## Technologies

HTML, JavaScript (modules), Tailwind CSS (CDN), localStorage.
