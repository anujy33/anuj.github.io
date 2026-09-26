// ---------- Blog posts ----------
// To publish a post: add an entry here. Give it a `url` (e.g. "blog/my-post.html")
// once the post page exists; entries without a url show as "Coming soon".
const BLOG_POSTS = [
  {
    title: "Capturing network traffic across 80,000 machines with Scapy",
    date: "",
    summary: "Lessons from building apps, a Python packet-capture engine for enterprise security infrastructure.",
    tags: ["Python", "Scapy", "Security"],
    url: ""
  },
  {
    title: "Building a Playwright test suite in a month with MCP",
    date: "",
    summary: "How Model Context Protocol server integration sped up writing end-to-end UI tests.",
    tags: ["Playwright", "MCP", "GenAI"],
    url: ""
  },
  {
    title: "From SRE to GenAI: notes from the GenAI Essentials course",
    date: "",
    summary: "What I'm learning about LLMs, and how reliability and observability practices carry over.",
    tags: ["GenAI", "LLM", "Learning"],
    url: ""
  }
];

function renderBlog() {
  const list = document.getElementById("blog-list");
  list.innerHTML = "";

  BLOG_POSTS.forEach((post) => {
    const card = document.createElement(post.url ? "a" : "article");
    card.className = "card post";
    if (post.url) card.href = post.url;

    const meta = document.createElement("div");
    meta.className = "post-meta";
    if (post.date) {
      const date = document.createElement("time");
      date.textContent = post.date;
      meta.appendChild(date);
    }
    if (!post.url) {
      const badge = document.createElement("span");
      badge.className = "badge";
      badge.textContent = "Coming soon";
      meta.appendChild(badge);
    }

    const title = document.createElement("h3");
    title.textContent = post.title;

    const summary = document.createElement("p");
    summary.textContent = post.summary;

    const tags = document.createElement("div");
    tags.className = "tags";
    post.tags.forEach((t) => {
      const tag = document.createElement("span");
      tag.textContent = t;
      tags.appendChild(tag);
    });

    card.append(meta, title, summary, tags);
    list.appendChild(card);
  });
}

// ---------- Tabs (hash-based, so links like /#contact work) ----------
const panels = document.querySelectorAll(".panel");
const tabs = document.querySelectorAll(".tab");

function showTab() {
  const id = location.hash.slice(1) || "home";
  const target = document.getElementById(id);
  const active = target && target.classList.contains("panel") ? id : "home";

  panels.forEach((p) => { p.hidden = p.id !== active; });
  tabs.forEach((t) => {
    if (t.getAttribute("href") === "#" + active) t.setAttribute("aria-current", "page");
    else t.removeAttribute("aria-current");
  });
  // Wait a frame so the browser's own jump-to-anchor doesn't win
  requestAnimationFrame(() => window.scrollTo(0, 0));
}

window.addEventListener("hashchange", showTab);
// Opening a link like /#contact makes the browser jump to that section after load
window.addEventListener("load", () => window.scrollTo(0, 0));

// ---------- Light / dark theme ----------
const root = document.documentElement;
const toggle = document.getElementById("theme-toggle");

function updateToggleLabel() {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  toggle.setAttribute("aria-label", "Switch to " + next + " mode");
}

toggle.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  try { localStorage.setItem("theme", next); } catch (e) { /* storage blocked */ }
  updateToggleLabel();
});

// ---------- Copy email ----------
document.querySelectorAll(".copy-btn").forEach((btn) => {
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
      btn.textContent = "Copied!";
    } catch (e) {
      btn.textContent = "Copy failed";
    }
    setTimeout(() => { btn.textContent = "Copy"; }, 1500);
  });
});

// ---------- Init ----------
document.getElementById("year").textContent = new Date().getFullYear();
renderBlog();
showTab();
updateToggleLabel();
