// Structures de données propres (Remplacement des émojis par des indicateurs épurés)
const toolsData = [
    { name: "Monday Dashboard", url: "#" },
    { name: "SuitePro-G", url: "#" },
    { name: "Ivalua Client", url: "#" },
    { name: "MS Teams Space", url: "#" }
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

// Gestion de la navigation inter-pages
function go(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));

    const targetPage = document.getElementById(`page-${pageId}`);
    if (targetPage) targetPage.classList.add('active');

    const activeBtn = document.querySelector(`[data-target="${pageId}"]`);
    if (activeBtn) activeBtn.classList.add('active');
}

// Injection propre des éléments dans le DOM
function setupDashboard() {
    const scList = document.getElementById('sc-list');
    if (scList) {
        scList.innerHTML = toolsData.map(tool => `
            <a href="${tool.url}" class="tool-card">
                <div class="icon-indicator"></div>
                <span>${tool.name}</span>
            </a>
        `).join('');
    }

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

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    setupDashboard();

    const form = document.getElementById('form-add-shortcut');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('sc-name').value;
            const url = document.getElementById('sc-url').value;

            toolsData.push({ name, url });
            setupDashboard();
            form.reset();
            go('home');
        });
    }
});
