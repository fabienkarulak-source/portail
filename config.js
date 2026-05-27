/* ═══════════════════════════════════════════════════════════════
   CYRIAS INTRANET — FICHIER DE CONFIGURATION CENTRAL
   Modifiez ce fichier pour paramétrer l'ensemble du portail
   ═══════════════════════════════════════════════════════════════ */

const CYRIAS_CONFIG = {

  /* ── Identité de la société ── */
  company: {
    name:    "Cyrias",
    tagline: "Bienvenue sur l'intranet Cyrias",
    subtitle:"Vous trouverez ici toutes les informations utiles concernant l'organisation interne et vos projets.",
    logo:    "assets/logo.svg",          // chemin vers votre logo
    heroImage: "assets/hero-bg.jpg",     // image de fond du bandeau
  },

  /* ── Charte graphique ── */
  theme: {
    primary:   "#1a2f5e",   // bleu marine Cyrias
    accent:    "#00b894",   // vert émeraude
    accentAlt: "#00cba9",   // vert clair survol
    bg:        "#f5f7fa",
    surface:   "#ffffff",
    text:      "#1a2f5e",
    text2:     "#5a6a8a",
    text3:     "#9aabca",
    border:    "#e2e8f0",
    navBg:     "#ffffff",   // fond de la barre de navigation
  },

  /* ── Profils utilisateurs et permissions ── */
  profiles: {
    admin: {
      label: "Administrateur",
      color: "#e53e3e",
      sections: ["home","apps","projets","rh","cse","ivalua","trucs","actus","admin"],
      apps:     ["ivalua","suitepro","monday","teams","confluence","jira","payfit","docusign","sharepoint","powerbi"],
    },
    manager: {
      label: "Manager",
      color: "#3b82f6",
      sections: ["home","apps","projets","rh","cse","ivalua","trucs","actus"],
      apps:     ["ivalua","suitepro","monday","teams","confluence","payfit"],
    },
    consultant: {
      label: "Consultant",
      color: "#00b894",
      sections: ["home","apps","projets","ivalua","trucs"],
      apps:     ["ivalua","suitepro","monday","teams"],
    },
    guest: {
      label: "Invité",
      color: "#9ca3af",
      sections: ["home","apps"],
      apps:     ["teams"],
    },
  },

  /* ── Navigation principale ── */
  navigation: [
    { id:"home",   label:"Accueil",        section:"home",   icon:"home"      },
    { id:"cse",    label:"CSE",            section:"cse",    icon:"heart"     },
    { id:"rh",     label:"RH",             section:"rh",     icon:"users",    dropdown: [
      { label:"Congés & absences",    section:"rh"    },
      { label:"Bulletins de paie",    section:"rh"    },
      { label:"Formations",           section:"rh"    },
    ]},
    { id:"projets",label:"Projets",        section:"projets",icon:"briefcase", dropdown: [
      { label:"Tous les projets",     section:"projets" },
      { label:"En cours",             section:"projets" },
      { label:"Archivés",             section:"projets" },
    ]},
    { id:"ivalua", label:"IVALUA",         section:"ivalua", icon:"box",       dropdown: [
      { label:"Documentation",        section:"ivalua" },
      { label:"Formations Ivalua",    section:"ivalua" },
      { label:"Support",              section:"ivalua" },
    ]},
    { id:"trucs",  label:"Trucs et astuces",section:"trucs", icon:"bulb",      dropdown: [
      { label:"Guides & tutoriels",   section:"trucs"  },
      { label:"Raccourcis clavier",   section:"trucs"  },
      { label:"Modèles",              section:"trucs"  },
    ]},
    { id:"actus",  label:"Actualités",     section:"actus",  icon:"news",      dropdown: [
      { label:"Vie de l'entreprise",  section:"actus"  },
      { label:"Clients & projets",    section:"actus"  },
    ]},
    { id:"admin",  label:"Admin",          section:"admin",  icon:"settings",  adminOnly: true },
  ],

  /* ── Raccourcis (éditables depuis l'admin) ── */
  shortcuts: [
    { id:"s1", name:"Monday",     icon:"📋", bg:"#fff3e0", url:"https://monday.com",          visible: true },
    { id:"s2", name:"SuitePro-G", icon:"📊", bg:"#e8f5e9", url:"#",                           visible: true },
    { id:"s3", name:"Ivalua",     icon:"🔷", bg:"#e3f2fd", url:"https://ivalua.com",          visible: true },
    { id:"s4", name:"MS Teams",   icon:"💬", bg:"#ede7f6", url:"https://teams.microsoft.com", visible: true },
    { id:"s5", name:"PayFit",     icon:"💶", bg:"#fce4ec", url:"https://payfit.com",          visible: false },
    { id:"s6", name:"Confluence", icon:"📚", bg:"#fff8e1", url:"#",                           visible: false },
  ],

  /* ── Actualités (éditables depuis l'admin) ── */
  news: [
    {
      id:"n1", category:"projet", date:"Juin 2025", pinned: true,
      logo:"DX", logoColor:"#e3f2fd", logoText:"#1a2f5e",
      title:"Dixstone",
      excerpt:"Signature d'un nouveau client pour le déploiement des processus fournisseurs, sourcing, contrat, catalogues, demandes d'achats, commandes et réception.",
      tag:"Projet", tagColor:"green",
    },
    {
      id:"n2", category:"projet", date:"Juin 2025", pinned: false,
      logo:"AP", logoColor:"#f3e5f5", logoText:"#4a1a6e",
      title:"Audemars Piguet",
      excerpt:"Mise en production du GRNI et des évolutions suite à la mise en production des modules demandes d'achats à la facturation.",
      tag:"Production", tagColor:"blue",
    },
    {
      id:"n3", category:"vie", date:"09/09/2025", pinned: true,
      photo: null, initials:"RT", initialsColor:"#e8f5e9", initialsText:"#1b5e20",
      title:"Bienvenue à Rabah Teffahi",
      excerpt:"Nous avons le plaisir d'accueillir chez Cyrias Rabah Teffahi qui rejoint l'équipe de Massy en tant que consultant et analyste data.",
      tag:"Équipe", tagColor:"orange",
    },
    {
      id:"n4", category:"vie", date:"14/04/2025", pinned: false,
      photo: null, initials:"NT", initialsColor:"#fce4ec", initialsText:"#880e4f",
      title:"Bienvenue à Noor Taoud",
      excerpt:"Noor débute sa carrière professionnelle avec nous après avoir suivi une formation MIAGE. Bienvenue dans l'équipe !",
      tag:"Équipe", tagColor:"orange",
    },
  ],

  /* ── Catalogue applications ── */
  applications: [
    { id:"ivalua",     name:"Ivalua",        desc:"Achats & procurement",   icon:"🔷", bg:"#e3f2fd", url:"https://ivalua.com",          tag:"Métier"  },
    { id:"suitepro",   name:"SuitePro-G",    desc:"Gestion de projet",      icon:"📊", bg:"#e8f5e9", url:"#",                            tag:"Métier"  },
    { id:"monday",     name:"Monday.com",    desc:"Suivi des tâches",       icon:"📋", bg:"#fff3e0", url:"https://monday.com",           tag:"Projet"  },
    { id:"teams",      name:"MS Teams",      desc:"Communication",          icon:"💬", bg:"#ede7f6", url:"https://teams.microsoft.com",  tag:"Collab"  },
    { id:"confluence", name:"Confluence",    desc:"Base de connaissance",   icon:"📚", bg:"#fff8e1", url:"#",                            tag:"Docs"    },
    { id:"jira",       name:"Jira",          desc:"Issues & sprints",       icon:"🐛", bg:"#e3f2fd", url:"#",                            tag:"Dev"     },
    { id:"payfit",     name:"PayFit",        desc:"Paie & congés",          icon:"💶", bg:"#fce4ec", url:"https://payfit.com",           tag:"RH"      },
    { id:"docusign",   name:"DocuSign",      desc:"Signature électronique", icon:"✍️", bg:"#e8f5e9", url:"#",                            tag:"Docs"    },
    { id:"sharepoint", name:"SharePoint",    desc:"Documents partagés",     icon:"📁", bg:"#e3f2fd", url:"#",                            tag:"Docs"    },
    { id:"powerbi",    name:"Power BI",      desc:"Tableaux de bord",       icon:"📈", bg:"#fff3e0", url:"#",                            tag:"BI"      },
  ],
};
