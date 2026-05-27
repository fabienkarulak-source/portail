/* ═══════════════════════════════════════════════════════════
   CYRIAS INTRANET — app.js
   Logique principale : navigation, rendu, admin
   ═══════════════════════════════════════════════════════════ */

/* ── State ── */
let profile = "admin";
let selAdminProfile = "admin";
let openDropId = null;
const C = CYRIAS_CONFIG; // alias

/* ── SVG icons (inline) ── */
const IC = {
  home:`<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>`,
  heart:`<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>`,
  users:`<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>`,
  briefcase:`<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>`,
  box:`<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>`,
  bulb:`<line x1="12" y1="2" x2="12" y2="3"/><path d="M12 6a6 6 0 0 1 6 6c0 3-2 5-2 5H8s-2-2-2-5a6 6 0 0 1 6-6z"/><line x1="8.5" y1="21" x2="15.5" y2="21"/><line x1="9" y1="18" x2="15" y2="18"/>`,
  news:`<path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 0-2 2zm0 0a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6z"/>`,
  settings:`<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>`,
  drag:`☰`,
};
function svg(name){
  return`<svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">${IC[name]||''}</svg>`;
}

/* ════════════════════════════════
   BUILD NAVIGATION
   ════════════════════════════════ */
function buildNav(){
  const prof = C.profiles[profile];
  const nav = document.getElementById("bar-nav");
  nav.innerHTML = "";

  C.navigation.forEach(item => {
    if(item.adminOnly && profile !== "admin") return;
    const ok = prof.sections.includes(item.section);

    if(item.dropdown && item.dropdown.length){
      const wrap = document.createElement("div");
      wrap.style.cssText = "position:relative;display:flex;align-items:stretch";

      const tab = document.createElement("div");
      tab.className = "nav-tab has-drop" + (ok ? "" : " locked");
      tab.dataset.id = item.id;
      tab.innerHTML = svg(item.icon) + `<span>${item.label}</span>`;

      const drop = document.createElement("div");
      drop.className = "dropdown";
      drop.id = "drop-" + item.id;

      item.dropdown.forEach(child => {
        const di = document.createElement("div");
        di.className = "drop-item";
        di.textContent = child.label;
        di.addEventListener("click", e => {
          e.stopPropagation();
          closeDrops();
          go(child.section, tab, di);
        });
        drop.appendChild(di);
      });

      if(ok) tab.addEventListener("click", e => { e.stopPropagation(); toggleDrop(item.id, tab); });
      wrap.appendChild(tab);
      wrap.appendChild(drop);
      nav.appendChild(wrap);
    } else {
      const tab = document.createElement("div");
      tab.className = "nav-tab" + (ok ? "" : " locked");
      tab.dataset.s = item.section;
      tab.innerHTML = svg(item.icon) + `<span>${item.label}</span>`;
      if(ok) tab.addEventListener("click", () => { closeDrops(); go(item.section, tab); });
      nav.appendChild(tab);
    }
  });
}

function toggleDrop(id, tabEl){
  const isOpen = openDropId === id;
  closeDrops();
  if(!isOpen){
    const drop = document.getElementById("drop-" + id);
    if(drop){ drop.classList.add("open"); tabEl.classList.add("open"); openDropId = id; }
  }
}
function closeDrops(){
  document.querySelectorAll(".dropdown.open").forEach(d => d.classList.remove("open"));
  document.querySelectorAll(".nav-tab.open").forEach(t => t.classList.remove("open"));
  openDropId = null;
}
document.addEventListener("click", closeDrops);

/* ════════════════════════════════
   NAVIGATE
   ════════════════════════════════ */
function go(section, tabEl, dropItemEl){
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  const pg = document.getElementById("page-" + section);
  if(pg) pg.classList.add("active");
  document.querySelectorAll(".nav-tab").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".drop-item").forEach(d => d.classList.remove("active"));
  if(tabEl) tabEl.classList.add("active");
  if(dropItemEl) dropItemEl.classList.add("active");
  document.getElementById("main").scrollTop = 0;
}

/* ════════════════════════════════
   RACCOURCIS
   ════════════════════════════════ */
function buildShortcuts(){
  const list = document.getElementById("sc-list");
  list.innerHTML = "";
  C.shortcuts.filter(s => s.visible).forEach(s => {
    const a = document.createElement("a");
    a.className = "sc-link";
    a.href = s.url !== "#" ? s.url : "#";
    if(s.url !== "#") a.target = "_blank";
    a.innerHTML = `<div class="sc-ico" style="background:${s.bg}">${s.icon}</div><span class="sc-name">${s.name}</span>`;
    list.appendChild(a);
  });
}

/* ════════════════════════════════
   NEWS — page accueil + actus
   ════════════════════════════════ */
function niHTML(n){
  const logoStyle = n.logo
    ? `background:${n.logoColor};color:${n.logoText}`
    : `background:${n.initialsColor||'#e3f2fd'};color:${n.initialsText||'#1a2f5e'}`;
  const logoContent = n.logo || n.initials || "?";
  return `<div class="ni">
    <div class="ni-logo" style="${logoStyle}">${logoContent}</div>
    <div class="ni-body">
      <div class="ni-date">${n.date}</div>
      <div class="ni-title">${n.title}</div>
      <div class="ni-text">${n.excerpt}</div>
      <span class="ni-tag ${n.tagColor}">${n.tag}</span>
    </div>
  </div>`;
}

function buildHomeNews(){
  const projets = C.news.filter(n => n.category === "projet");
  const vie     = C.news.filter(n => n.category === "vie");
  document.getElementById("news-projets").innerHTML = projets.map(niHTML).join('');
  document.getElementById("news-vie").innerHTML = vie.map(niHTML).join('');
}

function buildActusPage(){
  const all = document.getElementById("actus-all");
  all.innerHTML = `<div class="card">${C.news.map(niHTML).join('')}</div>`;
}

/* ════════════════════════════════
   APPLICATIONS
   ════════════════════════════════ */
function buildApps(){
  const prof = C.profiles[profile];
  const grid = document.getElementById("apps-grid");
  grid.innerHTML = "";
  C.applications.forEach(app => {
    const ok = prof.apps.includes(app.id);
    const a = document.createElement("a");
    a.className = "app-card" + (ok ? "" : " locked");
    a.href = ok && app.url !== "#" ? app.url : "#";
    if(ok && app.url !== "#") a.target = "_blank";
    a.innerHTML = `<div class="app-logo" style="background:${app.bg}">${app.icon}</div><h3>${app.name}</h3><p>${app.desc}</p><span class="app-tag">${app.tag}</span>`;
    grid.appendChild(a);
  });
}

/* ════════════════════════════════
   ADMIN — Raccourcis editor
   ════════════════════════════════ */
function buildScEditor(){
  const ed = document.getElementById("sc-editor");
  ed.innerHTML = "";
  C.shortcuts.forEach((s, i) => {
    const row = document.createElement("div");
    row.className = "editor-row";
    row.dataset.id = s.id;
    row.innerHTML = `
      <span class="drag-h" title="Réordonner">⠿</span>
      <div class="er-ico" style="background:${s.bg}">${s.icon}</div>
      <div class="er-info"><h4>${s.name}</h4><p>${s.url}</p></div>
      <button class="tog ${s.visible?'on':''}" onclick="toggleShortcut('${s.id}',this)" title="Visible"></button>
      <button class="btn sm danger" onclick="deleteShortcut('${s.id}')">Supprimer</button>
    `;
    ed.appendChild(row);
  });
}

function toggleShortcut(id, btn){
  const sc = C.shortcuts.find(s => s.id === id);
  if(sc){ sc.visible = !sc.visible; btn.classList.toggle('on'); buildShortcuts(); }
}
function deleteShortcut(id){
  const i = C.shortcuts.findIndex(s => s.id === id);
  if(i >= 0){ C.shortcuts.splice(i,1); buildScEditor(); buildShortcuts(); showToast("Raccourci supprimé"); }
}
function saveShortcuts(){ buildShortcuts(); showToast("Raccourcis sauvegardés ✓"); }
function addShortcut(){
  const name = document.getElementById("sc-new-name").value.trim();
  const url  = document.getElementById("sc-new-url").value.trim();
  const icon = document.getElementById("sc-new-icon").value.trim() || "🔗";
  if(!name) return;
  const id = "sc" + Date.now();
  C.shortcuts.push({ id, name, icon, bg:"#e3f2fd", url: url || "#", visible:true });
  buildScEditor(); buildShortcuts();
  closeModal("modal-add-sc");
  document.getElementById("sc-new-name").value = "";
  document.getElementById("sc-new-url").value = "";
  document.getElementById("sc-new-icon").value = "";
  showToast("Raccourci ajouté ✓");
}

/* ════════════════════════════════
   ADMIN — News editor
   ════════════════════════════════ */
function buildNewsEditor(){
  const ed = document.getElementById("news-editor");
  ed.innerHTML = "";
  C.news.forEach((n, i) => {
    const logoStyle = `background:${n.logoColor||n.initialsColor||'#e3f2fd'};color:${n.logoText||n.initialsText||'#1a2f5e'}`;
    const row = document.createElement("div");
    row.className = "editor-row";
    row.innerHTML = `
      <span class="drag-h">⠿</span>
      <div class="er-ico" style="${logoStyle}">${n.logo||n.initials||"?"}</div>
      <div class="er-info"><h4>${n.title}</h4><p>${n.category === 'projet' ? 'Projet client' : "Vie de l'entreprise"} · ${n.date}</p></div>
      <span class="ni-tag ${n.tagColor}" style="flex-shrink:0">${n.tag}</span>
      <button class="btn sm" onclick="pinNews('${n.id}',this)" title="${n.pinned?'Désépingler':'Épingler'}">${n.pinned?'📌':'📍'}</button>
      <button class="btn sm danger" onclick="deleteNews('${n.id}')">Supprimer</button>
    `;
    ed.appendChild(row);
  });
}

function pinNews(id, btn){
  const n = C.news.find(x => x.id === id);
  if(n){ n.pinned = !n.pinned; btn.textContent = n.pinned ? "📌" : "📍"; buildHomeNews(); showToast(n.pinned ? "Épinglé ✓" : "Désépinglé"); }
}
function deleteNews(id){
  const i = C.news.findIndex(x => x.id === id);
  if(i >= 0){ C.news.splice(i,1); buildNewsEditor(); buildHomeNews(); buildActusPage(); showToast("Actualité supprimée"); }
}
function addNews(){
  const title   = document.getElementById("news-new-title").value.trim();
  const excerpt = document.getElementById("news-new-excerpt").value.trim();
  const cat     = document.getElementById("news-new-cat").value;
  const tagVal  = document.getElementById("news-new-tag").value.split("|");
  const init    = document.getElementById("news-new-init").value.trim().toUpperCase() || "??";
  if(!title) return;
  const id = "n" + Date.now();
  C.news.unshift({
    id, category:cat, date: new Date().toLocaleDateString('fr-FR'), pinned:false,
    initials:init, initialsColor:"#e3f2fd", initialsText:"#1a2f5e",
    title, excerpt: excerpt || "…", tag:tagVal[1], tagColor:tagVal[0],
  });
  buildNewsEditor(); buildHomeNews(); buildActusPage();
  closeModal("modal-add-news");
  ["news-new-title","news-new-excerpt","news-new-init"].forEach(id => document.getElementById(id).value="");
  showToast("Actualité publiée ✓");
}

/* ════════════════════════════════
   ADMIN — Permissions
   ════════════════════════════════ */
function buildAdminProfileList(){
  const list = document.getElementById("admin-profile-list");
  if(!list) return;
  list.innerHTML = "";
  Object.entries(C.profiles).forEach(([k,p]) => {
    const div = document.createElement("div");
    div.className = "plist-item" + (k === selAdminProfile ? " sel" : "");
    div.innerHTML = `<span class="dot" style="background:${p.color}"></span>${p.label}`;
    div.addEventListener("click", () => {
      selAdminProfile = k;
      document.querySelectorAll(".plist-item").forEach(x => x.classList.remove("sel"));
      div.classList.add("sel");
      buildPermTable(k);
      document.getElementById("perm-title").textContent = "Permissions — " + p.label;
    });
    list.appendChild(div);
  });
  buildPermTable(selAdminProfile);
}

function buildPermTable(pk){
  const tbl = document.getElementById("perm-table");
  const p = C.profiles[pk];
  const secLabels = {home:"Accueil",apps:"Applications",projets:"Projets",rh:"RH",cse:"CSE",ivalua:"IVALUA",trucs:"Trucs & astuces",actus:"Actualités",admin:"Administration"};
  tbl.innerHTML = `<thead><tr><th>Ressource</th><th>Type</th><th>Accès</th></tr></thead><tbody>
    ${Object.entries(secLabels).map(([s,l])=>`<tr><td>${l}</td><td style="color:var(--text3);font-size:11px">Section</td><td><button class="tog ${p.sections.includes(s)?'on':''}" onclick="togP('s','${pk}','${s}',this)"></button></td></tr>`).join('')}
    ${C.applications.map(a=>`<tr><td>${a.icon} ${a.name}</td><td style="color:var(--text3);font-size:11px">App</td><td><button class="tog ${p.apps.includes(a.id)?'on':''}" onclick="togP('a','${pk}','${a.id}',this)"></button></td></tr>`).join('')}
  </tbody>`;
}

function togP(type,pk,id,btn){
  const arr = type==='s' ? C.profiles[pk].sections : C.profiles[pk].apps;
  const i = arr.indexOf(id);
  i>=0 ? arr.splice(i,1) : arr.push(id);
  btn.classList.toggle('on');
}

/* ════════════════════════════════
   ADMIN — Navigation editor
   ════════════════════════════════ */
function buildNavEditor(){
  const ed = document.getElementById("nav-editor");
  if(!ed) return;
  ed.innerHTML = "";
  C.navigation.forEach(item => {
    const row = document.createElement("div");
    row.className = "editor-row";
    row.style.marginBottom = "6px";
    row.innerHTML = `
      <span class="drag-h">⠿</span>
      ${svg(item.icon)}
      <div class="er-info"><h4>${item.label}</h4><p>Section : ${item.section}${item.adminOnly ? ' · Admin uniquement' : ''}</p></div>
      <button class="tog on" title="Visible dans la nav"></button>
    `;
    ed.appendChild(row);
  });
}

/* ════════════════════════════════
   ADMIN TABS
   ════════════════════════════════ */
function showAdminPane(id, clickedTab){
  document.querySelectorAll(".admin-tab").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".admin-pane").forEach(p => p.classList.remove("active"));
  clickedTab.classList.add("active");
  document.getElementById("pane-" + id).classList.add("active");
}

/* ════════════════════════════════
   PROFILE SWITCH
   ════════════════════════════════ */
function switchProfile(p){
  profile = p;
  const prof = C.profiles[p];
  buildNav();
  buildApps();
  go("home");
  showToast("Profil : " + prof.label);
}

/* ════════════════════════════════
   MODALS
   ════════════════════════════════ */
function openModal(id){ document.getElementById(id).classList.add("open"); }
function closeModal(id){ document.getElementById(id).classList.remove("open"); }
document.querySelectorAll(".modal-overlay").forEach(m => m.addEventListener("click", e => { if(e.target === m) m.classList.remove("open"); }));

/* ════════════════════════════════
   TOAST
   ════════════════════════════════ */
let _toastTimer;
function showToast(msg){
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
}

/* ════════════════════════════════
   BOOT
   ════════════════════════════════ */
window.addEventListener("DOMContentLoaded", () => {
  buildNav();
  buildShortcuts();
  buildHomeNews();
  buildActusPage();
  buildApps();
  buildAdminProfileList();
  buildScEditor();
  buildNewsEditor();
  buildNavEditor();
  go("home");
});
