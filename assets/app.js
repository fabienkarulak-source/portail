// ─── 1. DONNÉES DE SIMULATION (Outils & Actus) ───
// J'ai mis des vrais liens pour tester que les clics fonctionnent
const toolsData = [
    { name: "Monday Dashboard", url: "https://monday.com" },
    { name: "SuitePro-G", url: "https://google.com" },
    { name: "Ivalua Client", url: "https://ivalua.com" },
    { name: "MS Teams Space", url: "https://teams.microsoft.com" }
];

const newsData = {
    projets: [
        { client: "Dixstone Group", date: "Juin 2026", title: "Signature d'un nouveau client", desc: "Architecture globale du processus achat, intégration du module sourcing et contrats." },
        { client: "Audemars Piguet", date: "Mai 2026", title: "Mise en production validée", desc: "Transition effectuée avec succès sur les périmètres de facturation usine." }
    ],
    vie: [
        { client: "Ressources Humaines", date: "Ce matin", title: "Arrivée de Rabah Teffahi", desc: "L'équipe conseil s'agrandit à Massy. Bienvenue à notre nouveau Consultant Data Analyst." }
    ]
};

// ─── 2. MOTEUR DE NAVIGATION (Accessible globalement) ───
window.go = function(pageId) {
    console.log("Navigation vers :", pageId); // Pour vérifier dans la console du navigateur

    // 1. Gestion des pages (Vues)
    const pages = document.querySelectorAll('.page');
    if (pages.length > 0) {
        pages.forEach(p => p.classList.remove('active'));
    }
    
    const targetPage = document.getElementById(`page-${pageId}`);
    if (targetPage) {
        targetPage.classList.add('active');
    } else {
        console.warn(`La page #page-${pageId} n'existe pas dans le HTML.`);
    }

    // 2. Gestion de l'état visuel des boutons de la Sidebar
    const navItems = document.querySelectorAll('.nav-item');
    if (navItems.length > 0) {
        navItems.forEach(btn => btn.classList.remove('active'));
    }

    const activeBtn = document.querySelector(`[data-target="${pageId}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
};

// ─── 3. INJECTION DU CONTENU DANS LA PAGE ───
function setupDashboard() {
    // Injection des outils / raccourcis
    const scList = document.getElementById('sc-list');
    if (scList) {
        scList.innerHTML = toolsData.map(tool => `
            <a href="${tool.url}" target="_blank" class="tool-card">
                <div class="icon-indicator"></div>
                <span>${tool.name}</span>
            </a>
        `).join('');
    }

    // Injection des news projets
    const projectsContainer = document.getElementById('news-projets');
    if (projectsContainer) {
        projectsContainer.innerHTML = newsData.projets.map(item => `
            <div class="item-card">
                <div class="item-card-header"><span>${item.client}</span><span>${item.date}</span></div>
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
            </div>
        `).join('');
    }

    // Injection des news vie de l'entreprise
    const vieContainer = document.getElementById('news-vie');
    if (vieContainer) {
        vieContainer.innerHTML = newsData.vie.map(item => `
            <div class="item-card">
                <div class="item-card-header"><span>${item.client}</span><span>${item.date}</span></div>
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
            </div>
        `).join('');
    }
}

// ─── 4. ÉCOUTEURS D'ÉVÉNEMENTS (Au chargement de la page) ───
document.addEventListener('DOMContentLoaded', () => {
    // On lance l'affichage des données
    setupDashboard();

    // Gestion du formulaire d'ajout de raccourci dans l'admin
    const form = document.getElementById('form-add-shortcut');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('sc-name').value;
            const url = document.getElementById('sc-url').value;

            // Ajout dans le tableau et rafraîchissement
            toolsData.push({ name, url });
            setupDashboard();
            
            // Reset et retour à l'accueil
            form.reset();
            window.go('home');
        });
    }
});
