// Données de simulation (Mock data)
const initialShortcuts = [
    { name: "Monday", url: "https://monday.com", icon: "📊" },
    { name: "SuitePro-G", url: "https://google.com", icon: "🛠️" },
    { name: "Ivalua", url: "https://ivalua.com", icon: "🔷" },
    { name: "MS Teams", url: "https://teams.microsoft.com", icon: "💬" }
];

const initialNews = {
    projets: [
        { client: "Dixstone", date: "Juin 2026", title: "Signature d'un nouveau client", desc: "Déploiement des processus fournisseurs, sourcing, contrat et catalogues.", tag: "Projet", type: "blue" },
        { client: "Audemars Piguet", date: "Mai 2026", title: "Mise en production du GRNI", desc: "Évolutions suite à la mise en production des modules demandes d'achats à la facturation.", tag: "Production", type: "blue" }
    ],
    vie: [
        { client: "RH", date: "Récent", title: "Bienvenue à Rabah Teffahi", desc: "Nous avons le plaisir d'accueillir Rabah qui rejoint l'équipe de Massy en tant que consultant.", tag: "Équipe", type: "green" }
    ]
};

// 🧭 Système de Navigation Interne 100% sécurisé
window.go = function(pageId) {
    // 1. Cacher toutes les pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // 2. Afficher la page ciblée
    const targetPage = document.getElementById(`page-${pageId}`);
    if (targetPage) targetPage.classList.add('active');

    // 3. Mettre à jour l'état visuel du menu en haut
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-target') === pageId) {
            btn.classList.add('active');
        }
    });
};

// 💉 Hydratation de l'interface
function renderApp() {
    // 1. Raccourcis
    const scList = document.getElementById('sc-list');
    if (scList) {
        scList.innerHTML = initialShortcuts.map(sc => `
            <a href="${sc.url}" target="_blank" class="shortcut-card">
                <span>${sc.icon}</span> ${sc.name}
            </a>
        `).join('');
    }

    // 2. News Projets
    const newsProjets = document.getElementById('news-projets');
    if (newsProjets) {
        newsProjets.innerHTML = initialNews.projets.map(item => `
            <div class="news-card">
                <div class="news-meta"><span>${item.client}</span><span>${item.date}</span></div>
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
                <div style="margin-top: 12px;"><span class="badge ${item.type}">${item.tag}</span></div>
            </div>
        `).join('');
    }

    // 3. News Vie Entreprise
    const newsVie = document.getElementById('news-vie');
    if (newsVie) {
        newsVie.innerHTML = initialNews.vie.map(item => `
            <div class="news-card">
                <div class="news-meta"><span>${item.client}</span><span>${item.date}</span></div>
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
                <div style="margin-top: 12px;"><span class="badge ${item.type}">${item.tag}</span></div>
            </div>
        `).join('');
    }
}

// 🎬 Initialisation au chargement du navigateur
document.addEventListener('DOMContentLoaded', () => {
    renderApp();
    
    // Écouteur du formulaire d'administration pour ajouter un raccourci
    const adminForm = document.getElementById('form-add-shortcut');
    if (adminForm) {
        adminForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('sc-name').value;
            const url = document.getElementById('sc-url').value;
            
            initialShortcuts.push({ name, url, icon: "🔗" });
            renderApp();
            adminForm.reset();
            go('home');
        });
    }
});
