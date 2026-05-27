# Cyrias Intranet

Portail intranet statique pour SSII — charte graphique Cyrias, entièrement paramétrable, prêt pour GitHub Pages.

![Cyrias Intranet](https://img.shields.io/badge/version-1.0.0-blue) ![License](https://img.shields.io/badge/license-MIT-green) ![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-ready-brightgreen)

---

## 🚀 Démo rapide

Ouvrez simplement `index.html` dans un navigateur — aucune dépendance serveur requise.

**GitHub Pages :** activez Pages sur la branche `main` → le portail est immédiatement accessible.

---

## 📁 Structure du projet

```
cyrias-intranet/
├── index.html          # Structure HTML — ne modifier que pour ajouter des sections
├── config.js           # ⭐ FICHIER PRINCIPAL — toute la configuration ici
└── assets/
    ├── style.css       # Charte graphique Cyrias (variables CSS surchargeables)
    └── app.js          # Logique navigation, rendu dynamique, panel admin
```

---

## ⚙️ Configuration (`config.js`)

Tout le paramétrage se fait dans **`config.js`** — aucune connaissance technique requise pour les modifications courantes.

### Identité société

```js
company: {
  name:    "Cyrias",
  tagline: "Bienvenue sur l'intranet Cyrias",
  // ...
}
```

### Ajouter / modifier un raccourci

```js
shortcuts: [
  { id:"s1", name:"Monday", icon:"📋", bg:"#fff3e0", url:"https://monday.com", visible: true },
  // Ajoutez autant de raccourcis que nécessaire
]
```

| Champ     | Description                          |
|-----------|--------------------------------------|
| `id`      | Identifiant unique (ex: `"s7"`)      |
| `name`    | Nom affiché                          |
| `icon`    | Emoji affiché dans l'icône           |
| `bg`      | Couleur de fond de l'icône (hex/css) |
| `url`     | URL de l'application                 |
| `visible` | `true` = affiché, `false` = masqué   |

### Publier une actualité

```js
news: [
  {
    id: "n5",
    category: "projet",        // "projet" ou "vie"
    date: "Juin 2025",
    initials: "AB",
    initialsColor: "#e3f2fd",
    initialsText: "#1a2f5e",
    title: "Nouveau client",
    excerpt: "Description courte de l'actualité.",
    tag: "Projet",
    tagColor: "green",         // "green" | "blue" | "orange"
    pinned: true,
  },
]
```

### Gérer les profils et permissions

```js
profiles: {
  consultant: {
    label: "Consultant",
    color: "#00b894",
    sections: ["home", "apps", "projets", "ivalua", "trucs"],
    apps:     ["ivalua", "suitepro", "monday", "teams"],
  },
}
```

- **`sections`** : pages accessibles dans la navigation
- **`apps`** : applications visibles dans le catalogue et les raccourcis

### Modifier la navigation

```js
navigation: [
  { id:"projets", label:"Projets", section:"projets", icon:"briefcase", dropdown: [
    { label:"Tous les projets", section:"projets" },
    { label:"En cours",         section:"projets" },
  ]},
]
```

---

## 🎨 Charte graphique (`assets/style.css`)

Les couleurs sont définies via des variables CSS en tête de fichier :

```css
:root {
  --primary:   #1a2f5e;   /* Bleu marine Cyrias */
  --accent:    #00b894;   /* Vert émeraude */
  --accent-alt:#00cba9;   /* Vert clair (survol) */
  --bg:        #f5f7fa;   /* Fond de page */
  --surface:   #ffffff;   /* Fond des cartes */
  /* ... */
}
```

Pour adapter à une autre charte graphique, modifiez uniquement ces variables.

---

## 🛠️ Panel Admin

Accessible via l'onglet **Admin** (profil Administrateur uniquement).

| Onglet        | Fonctionnalité                                              |
|---------------|-------------------------------------------------------------|
| Raccourcis    | Activer/désactiver, ajouter, supprimer                      |
| Actualités    | Publier, épingler, supprimer                                |
| Permissions   | Toggler l'accès sections/apps par profil                    |
| Navigation    | Activer/masquer les entrées de menu                         |

> ⚠️ Les modifications faites via le panel admin sont **en mémoire uniquement** (pas de backend).  
> Pour les rendre permanentes, répercutez-les dans `config.js`.

---

## 🌐 Déploiement GitHub Pages

```bash
# 1. Créer le dépôt
git init
git remote add origin https://github.com/votre-org/cyrias-intranet.git

# 2. Premier commit
git add .
git commit -m "feat: initial intranet Cyrias"
git push -u origin main

# 3. Activer GitHub Pages
# Settings → Pages → Source: Deploy from branch → main → / (root) → Save
```

Le portail sera disponible à l'adresse :  
`https://votre-org.github.io/cyrias-intranet/`

---

## 📦 Dépendances externes (CDN)

| Ressource         | Source                              |
|-------------------|-------------------------------------|
| Montserrat (font) | Google Fonts                        |

Aucune bibliothèque JavaScript externe — vanilla JS uniquement.

---

## 📄 Licence

MIT — libre d'utilisation et de modification.
