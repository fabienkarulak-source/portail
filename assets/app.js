// Données de simulation (Mock data)
const initialApps = [
    { name: "Monday", url: "https://monday.com", icon: "📊" },
    { name: "SuitePro-G", url: "https://google.com", icon: "🛠️" },
    { name: "Ivalua", url: "https://ivalua.com", icon: "🔷" },
    { name: "MS Teams", url: "https://teams.microsoft.com", icon: "💬" },
    { name: "Outlook", url: "https://outlook.com", icon: "✉️" }
];

const initialNews = {
    projets: [
        { client: "Dixstone", date: "Juin 2026", title: "Signature d'un nouveau client", desc: "Déploiement des processus fournisseurs, sourcing, contrat et catalogues." },
        { client: "Audemars Piguet", date: "Mai 2026", title: "Mise en production du GRNI", desc: "Évolutions suite à la mise en production des modules." }
    ],
    vie: [
        { client: "RH", date: "Aujourd'hui", title: "Bienvenue à Rabah Teffahi", desc: "Nous avons le plaisir d'accueillir Rabah qui rejoint l'équipe de Massy." }
    ]
};

// 🧭 Système de Navigation 100% sécurisé
window.go = function(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    const targetPage = document.getElementById(`page-${pageId}`);
    if (targetPage) targetPage.classList.add('active');

    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-target') === pageId) {
            btn.classList.add('active');
        }
    });
};

// 💉 Hydratation de l'interface
function renderApp() {
    // 1. Portail : Rendu des tuiles d'applications
    const scList = document.getElementById('sc-list');
    if (scList) {
        scList.innerHTML = initialApps.map(app => `
            <a href="${app.url}" target="_blank" class="app-tile">
                <div class="app-icon">${app.icon}</div>
                <div class="app-name">${app.name}</div>
            </a>
        `).join('');
    }

    // 2. Widget : News Projets
    const newsProjets = document.getElementById('news-projets');
    if (newsProjets) {
        newsProjets.innerHTML = initialNews.projets.map(item => `
            <div class="news-item">
                <div class="news-meta"><span>${item.client}</span><span>${item.date}</span></div>
                <div class="news-title">${item.title}</div>
                <div class="news-desc">${item.desc}</div>
            </div>
        `).join('');
    }

    // 3. Widget : News Vie Entreprise
    const newsVie = document.getElementById('news-vie');
    if (newsVie) {
        newsVie.innerHTML = initialNews.vie.map(item => `
            <div class="news-item">
                <div class="news-meta"><span>${item.client}</span><span>${item.date}</span></div>
                <div class="news-title">${item.title}</div>
                <div class="news-desc">${item.desc}</div>
            </div>
        `).join('');
    }
}

// 🎬 Initialisation
document.addEventListener('DOMContentLoaded', () => {
    renderApp();
    
    // Gestion du formulaire pour ajouter une app
    const adminForm = document.getElementById('form-add-shortcut');
    if (adminForm) {
        adminForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('sc-name').value;
            const url = document.getElementById('sc-url').value;
            
            initialApps.push({ name, url, icon: "🌐" });
            renderApp();
            adminForm.reset();
            go('home');
        });
    }
});
