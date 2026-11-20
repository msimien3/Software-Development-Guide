const topics = [
  {
    id: "dapper",
    title: "Dapper Configuration",
    category: ".NET",
    level: "Implementation",
    description: "Connect C# applications to SQL Server and Oracle with Dapper, run async queries, map results, and use parameters.",
    icon: "▤",
    href: "guides/database/dapper.html",
    lessons: 6
  },
  {
    id: "entity-framework",
    title: "Entity Framework Core Configuration",
    category: ".NET",
    level: "Implementation",
    description: "Configure EF Core for SQL Server and Oracle, set up DbContext, query with LINQ and raw SQL, and troubleshoot.",
    icon: "⌘",
    href: "guides/database/entity-framework.html",
    lessons: 7
  }
];

const app = document.querySelector("#app");
const search = document.querySelector("#search");
const themeButton = document.querySelector("#theme");
const categories = document.querySelector("#categories");

function topicCard(topic) {
  return `<article class="card" tabindex="0" role="link" data-id="${topic.id}" aria-label="Open ${topic.title}">
    <span class="pill">${topic.level}</span>
    <h3><span style="color:var(--accent)">${topic.icon}</span> ${topic.title}</h3>
    <p>${topic.description}</p>
    <small>${topic.category} · ${topic.lessons} sections · Step-by-step guide</small>
    <span class="arrow">Open guide →</span>
  </article>`;
}
function render() {
  const query = search.value.trim().toLowerCase();
  const route = location.hash.slice(1);
  const currentCategory = route.startsWith("category/") ? decodeURIComponent(route.slice(9)) : "";
  const visible = topics.filter(topic => (!currentCategory || topic.category === currentCategory) &&
      (!query || `${topic.title} ${topic.category} ${topic.description} ${topic.level}`.toLowerCase().includes(query)));
  const title = currentCategory ? `${currentCategory} Guides` : "All Development Guides";
  if (route === "library" || currentCategory) {
    app.innerHTML = `<div class="eyebrow">Developer reference library</div><h1>${title}</h1>
      <p style="color:var(--muted)">${visible.length} guide${visible.length === 1 ? "" : "s"} available</p>
      ${visible.length ? `<div class="grid">${visible.map(topicCard).join("")}</div>` : '<div class="empty">No matching guides. Try another search.</div>'}`;
  } else {
    app.innerHTML = `<section class="hero">
      <div class="eyebrow">Your development reference platform</div>
      <h1>Configure. Build. Deploy.</h1>
      <p>A practical development knowledge library for .NET applications, SQL Server, Oracle, and modern web technologies. Find step-by-step guides when you need to implement something.</p>
      <button id="explore" type="button">Explore Development Guides →</button>
    </section>
    <div class="stats">
      <div class="stat"><strong>${topics.length}</strong><span>Development guides</span></div>
      <div class="stat"><strong>${new Set(topics.map(topic => topic.category)).size}</strong><span>Categories</span></div>
      <div class="stat"><strong>HTML</strong><span>Standalone reference files</span></div>
    </div>
    <div class="category-heading"><h2>.NET</h2><a class="nav" href="#category/.NET">View category →</a></div>
    ${visible.length ? `<div class="grid">${visible.map(topicCard).join("")}</div>` : '<div class="empty">No matching guides. Try another search.</div>'}`;
    document.querySelector("#explore")?.addEventListener("click", () => { location.hash = "library"; });
  }
  document.querySelectorAll("[data-id]").forEach(card => {
    card.addEventListener("click", () => openTopic(card.dataset.id));
    card.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openTopic(card.dataset.id); }
    });
  });
  document.querySelectorAll(".sidebar .nav").forEach(link => {
    const href = link.getAttribute("href");
    link.classList.toggle("active", href === (currentCategory ? "#category/" + encodeURIComponent(currentCategory) : route === "library" ? "#library" : "#home"));
  });
}
function openTopic(id) {
  const topic = topics.find(item => item.id === id);
  if (topic) window.location.href = topic.href;
}
search.addEventListener("input", render);
window.addEventListener("hashchange", () => { search.value = ""; render(); window.scrollTo(0, 0); });
themeButton.addEventListener("click", () => {
  document.body.classList.toggle("light");
  localStorage.setItem("development-guide-theme", document.body.classList.contains("light") ? "light" : "dark");
});
if (localStorage.getItem("development-guide-theme") === "light") document.body.classList.add("light");
render();
