# Changelog

## [1.0.0] — 2025-05-27

### Ajouté
- Navigation horizontale deux niveaux (barre marque + barre nav avec dropdowns)
- Charte graphique Cyrias : bleu `#1a2f5e` + vert `#00b894` + Montserrat
- Page Accueil : bandeau hero, barre raccourcis, deux colonnes actualités (Projets / Vie de l'entreprise)
- Page Applications : catalogue avec gestion des accès par profil
- Page Projets : liste avec statuts colorés
- Pages RH, CSE, IVALUA, Trucs & astuces, Actualités
- Panel Admin complet :
  - Éditeur de raccourcis (ajout, suppression, activation/désactivation)
  - Éditeur d'actualités (publication, épinglage, suppression)
  - Gestionnaire de permissions par profil (sections + apps)
  - Éditeur de navigation
- Système de profils (Administrateur, Manager, Consultant, Invité)
- Sélecteur de profil dans la topbar
- Fichier `config.js` centralisé — tout le paramétrage sans toucher au code
- Architecture multi-fichiers : `index.html` / `config.js` / `assets/style.css` / `assets/app.js`
- Compatible GitHub Pages (fichiers statiques, aucun backend)
