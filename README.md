# Project-Bus-direct

Bus direct est un site web simple et interactive . Elle permet de gere la reservation , la modification et la suppression de places pour un trajet du bus entre **Safi** et **Marrakech**

## Fonctionnalités principales

- **Plan du bus interactif** : Affichage dynamique de 20 places (sièges libres en blanc et occupés en rouge).
- **Gestion des réservations** : Permet à un passager de réserver un siège spécifique ou d'attribuer automatiquement le premier siège libre.
- **Modification de réservation** : Possibilité de modifier le nom du passager ou de changer de siège.
- **Suppression** : Annulation d'une réservation pour libérer un siège.
- **Statistiques en temps réel** : Suivi du nombre de sièges libres, occupés et du chiffre d'affaires calculé automatiquement (80 DH par place).
- **Persistance des données** : Utilisation du `localStorage` pour sauvegarder les réservations même après le rechargement de la page.

## Technologies utilisées

- **HTML5 / CSS3** : Structure et mise en page.
- **Tailwind CSS (v4)** : Framework CSS utilitaire pour le design responsive et moderne.
- **JavaScript (Vanilla)** : Logique de l'application, manipulation du DOM et gestion des événements.

## Structure du projet

```text
├── index.html       # Interface utilisateur principale
├── Bus.js           # Logique JavaScript (gestion des réservations et du DOM)
└── photos/          # Dossier contenant les images et le logo
```
