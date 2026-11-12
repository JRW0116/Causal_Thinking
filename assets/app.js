/* Causal Thinking Lab — inquiry-led shell
   Routes: #/  ·  #/q/<question>  ·  #/case/<id>  ·  #/idea/<id>  ·  #/ideas  ·  #/journal  ·  #/lab  ·  #/about */
(function () {
  "use strict";
  const CT = window.CT;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const strip = (h) => String(h).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

  /* ---------- storage + toast (shared with lab.js) ---------- */
  CT.store = {
    get(k, d) { try { const v = localStorage.getItem("ct:" + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem("ct:" + k, JSON.stringify(v)); } catch (e) {} },
    clear() { try { Object.keys(localStorage).filter((k) => k.startsWith("ct:")).forEach((k) => localStorage.removeItem(k)); } catch (e) {} },
  };
  CT.toast = function (msg) {
    let t = $(".toast");
    if (!t) { t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add("show");
    clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("show"), 2000);
  };
  const store = CT.store;

  const CASE_IDS = Object.keys(CT.CASES);
  let answers = store.get("answers", {});   // caseId -> {opt, text, at}
  let peeked = new Set(store.get("peeked", []));
  let fromQuestion = null;                     // breadcrumb context

  const uncovered = () => {
    const s = new Set();
    Object.keys(answers).forEach((id) => (CT.CASES[id]?.concepts || []).forEach((c) => s.add(c)));
    return s;
  };
  const casesFor = (conceptId) => CASE_IDS.filter((id) => CT.CASES[id].concepts.includes(conceptId));
  const questionsFor = (caseId) => CT.QUESTIONS.filter((q) => q.cases.includes(caseId));

  /* ---------- theme / nav ---------- */
  const savedTheme = store.get("theme", null);
  if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);
  $("#themeBtn").addEventListener("click", () => {
    const cur = document.documentElement.getAttribute("data-theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = cur === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next); store.set("theme", next);
  });
  const nav = $("#sidenav"), mt = $("#menuToggle");
  mt.addEventListener("click", () => { const o = nav.classList.toggle("open"); mt.setAttribute("aria-expanded", o); });
  $("#resetBtn").addEventListener("click", () => {
    if (!confirm("Clear your answers, uncovered ideas and saved insights in this browser?")) return;
    store.clear(); location.hash = "#/"; location.reload();
  });

  function renderProgress() {
    const u = uncovered().size, n = CT.CONCEPT_ORDER.length, c = Object.keys(answers).length;
    $("#ideasCount").textContent = `${u} / ${n}`; $("#ideasFill").style.width = (100 * u / n) + "%";
    $("#casesCount").textContent = `${c} / ${CASE_IDS.length}`; $("#casesFill").style.width = (100 * c / CASE_IDS.length) + "%";
    const last = store.get("lastCase", null);
    $("#navRecent").innerHTML = last && CT.CASES[last] && !answers[last]
      ? `<span class="lab-label sm">Pick up where you left off</span><a href="#/case/${last}">${esc(CT.CASES[last].title)}</a>` : "";
  }

  /* ---------- HOME ---------- */
  function caseStatus(id) { return answers[id] ? "done" : ""; }
  function renderHome() {
    $("#questionGrid").innerHTML = CT.QUESTIONS.map((q) => {
      const done = q.cases.filter((id) => answers[id]).length;
      return `<a class="qcard-home" href="#/q/${q.id}">
        <span class="qq">${esc(q.q)}</span>
        <span class="qh">${esc(q.hint)}</span>
        <span class="qm"><span class="dots">${q.cases.map((id) => `<i class="${caseStatus(id)}"></i>`).join("")}</span>${done ? `${done} of ${q.cases.length} explored` : `${q.cases.length} cases`}</span>
      </a>`;
    }).join("");
  }

  // Free-text "ask your own"
  const SYN = {
    ai: ["ai", "adoption", "agentic", "genai"], lever: ["lever", "drives", "driver", "cause", "causes", "improves", "multiplier", "likely"],
    biased: ["bias", "biased", "sample", "selection", "survivor", "survivors"], roi: ["roi", "value", "worth", "investment", "business case", "cost", "baseline"],
    challenge: ["pushback", "challenge", "challenged", "skeptic", "objection", "room"], best: ["best practice", "always", "everywhere", "universal"],
    culture: ["culture", "collaboration", "engagement", "attrition", "decisions"], quality: ["quality", "recall", "deviation", "cqo"],
    productivity: ["productivity", "oee", "utilization", "efficiency"], mna: ["m&a", "deal", "deals", "acquisition", "merger", "diligence", "integration"],
    data: ["data", "platform", "analytics", "trust"], knowledge: ["knowledge", "retire", "retirement", "workforce", "tacit"],
  };
  const STOP = new Set(["the", "and", "our", "client", "clients", "says", "said", "say", "can", "how", "what", "why", "does", "with", "that", "this", "for", "are", "was", "about", "from", "they", "their", "have", "has", "you", "your", "should", "would", "could", "into", "some"]);
  function caseText(id) { const c = CT.CASES[id]; return (c.title + " " + strip(c.scene) + " " + (c.ask || "") + " " + c.concepts.map((k) => CT.CONCEPTS[k].name).join(" ") + " " + c.source).toLowerCase(); }
  function search(qs) {
    const words = qs.toLowerCase().replace(/[^\w&%.\s-]/g, " ").split(/\s+/).filter((w) => w.length > 2 && !STOP.has(w));
    const expanded = new Set(words);
    Object.values(SYN).forEach((group) => { if (group.some((g) => qs.toLowerCase().includes(g))) group.forEach((g) => expanded.add(g)); });
    return CASE_IDS.map((id) => {
      const t = caseText(id); let s = 0; expanded.forEach((w) => { if (t.includes(w)) s += words.includes(w) ? 2 : 1; });
      return { id, s };
    }).filter((x) => x.s > 0).sort((a, b) => b.s - a.s).slice(0, 4);
  }
  const looksLikeClaim = (s) => /\d|%|×|\bx\b|more likely|drives?|leads? to|improves?|causes?|lever|because|so /i.test(s);
  $("#askForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const qs = $("#askInput").value.trim(); const box = $("#askResults");
    if (qs.length < 3) { box.hidden = true; return; }
    const hits = search(qs);
    let html = `<div class="ar-head">Here's where your question leads</div>`;
    html += hits.length ? `<div class="ar-list">${hits.map((h) => `<a href="#/case/${h.id}"><span class="source">${esc(CT.CASES[h.id].source)}</span><b>${esc(CT.CASES[h.id].title)}</b></a>`).join("")}</div>`
      : `<p style="margin:0 0 10px;color:var(--ink-2)">None of the cases match closely — but the lab can work on any claim.</p>`;
    html += `<div class="ar-lab"><span>${looksLikeClaim(qs) ? "This reads like a claim. Want to test it directly?" : "Or turn it into a claim and test it:"}</span><button class="lab-ghost" id="askToLab">Challenge it in the lab →</button></div>`;
    box.innerHTML = html; box.hidden = false;
    $("#askToLab").addEventListener("click", () => { location.hash = "#/lab"; setTimeout(() => CT.lab && CT.lab.prefill(qs), 0); });
  });

  /* ---------- QUESTION PATH ---------- */
  function renderQuestion(id) {
    const q = CT.QUESTIONS.find((x) => x.id === id); if (!q) return go("#/");
    fromQuestion = id;
    const firstOpen = q.cases.find((c) => !answers[c]) || q.cases[0];
    const concepts = [...new Set(q.cases.flatMap((c) => CT.CASES[c].concepts))];
    const u = uncovered();
    $("#questionBody").innerHTML = `<a class="crumb" href="#/">← All questions</a>
      <span class="eyebrow">Your question</span><h2>${esc(q.q)}</h2>
      <p class="lede">Work through these moments from the room. Each asks you to commit before it shows what happened. Start anywhere.</p>
      <ol class="path mt">${q.cases.map((cid, i) => { const c = CT.CASES[cid]; const d = !!answers[cid];
        return `<li class="${d ? "done" : ""}"><a href="#/case/${cid}"><span class="pn">${d ? "✓" : i + 1}</span><span><span class="source">${esc(c.source)}</span><b>${esc(c.title)}</b></span><span class="go">${d ? "Revisit" : cid === firstOpen ? "Start →" : "Open →"}</span></a></li>`; }).join("")}</ol>
      <h4 class="mt">Ideas waiting on this path</h4>
      <div class="chips-row">${concepts.map((k) => `<a class="idea-chip ${u.has(k) ? "on" : "locked"}" href="#/idea/${k}">${u.has(k) ? "◆" : "◇"} ${esc(u.has(k) || peeked.has(k) ? CT.CONCEPTS[k].name : "Locked idea")}</a>`).join("")}</div>`;
  }

  /* ---------- CASE ---------- */
  function renderCase(id) {
    const c = CT.CASES[id]; if (!c) return go("#/");
    store.set("lastCase", id);
    const a = answers[id];
    const back = fromQuestion ? CT.QUESTIONS.find((q) => q.id === fromQuestion) : questionsFor(id)[0];
    const pos = back ? back.cases.indexOf(id) : -1;
    $("#caseBody").innerHTML = `
      <a class="crumb" href="${back ? "#/q/" + back.id : "#/"}">← ${back ? esc(back.q) : "All questions"}</a>
      <span class="eyebrow">${back && pos >= 0 ? `Case ${pos + 1} of ${back.cases.length} · ` : ""}${esc(c.source)}</span>
      <h2>${esc(c.title)}</h2>
      <div class="scene">${c.scene}</div>
      <div class="commit-panel ${a ? "locked" : ""}" id="commitPanel">
        <div class="cp-head"><span class="cp-step">Your call</span><span class="cp-ask">${esc(c.ask)}</span></div>
        ${c.options ? `<div class="opts" role="radiogroup" aria-label="Your answer">${c.options.map((o, i) => `<button role="radio" aria-checked="false" data-i="${i}" class="opt"><span class="ol">${String.fromCharCode(65 + i)}</span><span>${esc(o.t)}</span></button>`).join("")}</div>` : ""}
        <label class="cp-free"><span>${esc(c.free || "Your reasoning")}${c.options ? " <i>(optional, but it's where the learning is)</i>" : ""}</span>
          <textarea id="caseText" rows="3" placeholder="Think out loud…">${esc(a ? a.text || "" : "")}</textarea></label>
        <div class="lab-actions"><span class="cp-note" id="cpNote">${c.options ? "Pick an answer to commit." : "Write a few sentences to commit."}</span>
          <button class="lab-primary push-right" id="commitBtn" disabled>Commit &amp; see what happened</button></div>
      </div>
      <div id="revealWrap"></div>`;

    let sel = a ? a.opt : null;
    const btn = $("#commitBtn"), ta = $("#caseText");
    const ready = () => { btn.disabled = c.options ? sel == null : ta.value.trim().length < 15; };
    $$(".opt").forEach((b) => b.addEventListener("click", () => {
      if (answers[id]) return; sel = +b.dataset.i;
      $$(".opt").forEach((x) => x.setAttribute("aria-checked", x === b)); ready();
    }));
    ta.addEventListener("input", ready);
    btn.addEventListener("click", () => {
      const before = uncovered();
      answers[id] = { opt: sel, text: ta.value.trim(), at: Date.now() };
      store.set("answers", answers);
      const fresh = c.concepts.filter((k) => !before.has(k));
      showReveal(id, fresh, true); renderProgress();
    });
    if (a) showReveal(id, [], false);
  }

  function showReveal(id, fresh, animate) {
    const c = CT.CASES[id], a = answers[id];
    const panel = $("#commitPanel"); panel.classList.add("locked");
    $("#caseText").readOnly = true; $("#commitBtn").hidden = true; $("#cpNote").textContent = "Committed.";
    if (c.options) {
      $$(".opt").forEach((b) => {
        const i = +b.dataset.i, o = c.options[i];
        b.disabled = true; b.setAttribute("aria-checked", i === a.opt);
        if (o.best) b.classList.add("best"); if (i === a.opt && !o.best) b.classList.add("miss");
        if (i === a.opt || o.best) b.insertAdjacentHTML("beforeend", `<span class="ofb">${i === a.opt ? (o.best ? "Your pick · " : "Your pick · ") : "The room's answer · "}${esc(o.fb)}</span>`);
      });
    }
    const u = uncovered();
    const nexts = c.next.filter((n) => CT.CASES[n]);
    $("#revealWrap").innerHTML = `<div class="reveal ${animate ? "anim" : ""}">
      <div class="rv-block"><span class="rv-label">What happened</span>${c.reveal.happened}</div>
      <div class="rv-block"><span class="rv-label">Why it matters</span>${c.reveal.why}</div>
      ${c.reveal.better ? `<div class="better"><b>A better way to say it:</b> “${esc(c.reveal.better)}”</div>` : ""}
      <div class="rv-block"><span class="rv-label">Ideas this case uncovered</span>
        <div class="chips-row">${c.concepts.map((k) => `<a class="idea-chip on ${fresh.includes(k) ? "fresh" : ""}" href="#/idea/${k}">◆ ${esc(CT.CONCEPTS[k].name)}${fresh.includes(k) ? ' <em>new</em>' : ""}</a>`).join("")}</div>
        <p class="rv-one">${c.concepts.map((k) => `<b>${esc(CT.CONCEPTS[k].name)}:</b> ${esc(CT.CONCEPTS[k].one)}`).join("<br>")}</p></div>
      <div class="rv-block"><span class="rv-label">This raises…</span>
        <div class="next-grid">${nexts.map((n) => `<a class="next-card ${answers[n] ? "done" : ""}" href="#/case/${n}"><span class="source">${answers[n] ? "✓ Explored · " : ""}${esc(CT.CASES[n].source)}</span><b>${esc(CT.CASES[n].title)}</b></a>`).join("")}
          <a class="next-card lab" href="#/lab"><span class="source">Insight Challenge Lab</span><b>Test one of your own findings the same way →</b></a></div></div>
      <div class="lab-actions"><button class="lab-ghost" id="redoBtn">Answer again</button></div>
    </div>`;
    $("#redoBtn").addEventListener("click", () => { delete answers[id]; store.set("answers", answers); renderProgress(); renderCase(id); });
    if (animate) { $("#revealWrap").scrollIntoView({ behavior: "smooth", block: "start" }); if (fresh.length) CT.toast(`New idea uncovered: ${CT.CONCEPTS[fresh[0]].name}${fresh.length > 1 ? ` +${fresh.length - 1}` : ""}`); }
  }

  /* ---------- IDEA ---------- */
  function renderIdea(k) {
    const c = CT.CONCEPTS[k]; if (!c) return go("#/ideas");
    const open = uncovered().has(k) || peeked.has(k);
    const where = casesFor(k);
    const caseLinks = where.map((id) => `<a class="next-card ${answers[id] ? "done" : ""}" href="#/case/${id}"><span class="source">${answers[id] ? "✓ Explored · " : ""}${esc(CT.CASES[id].source)}</span><b>${esc(CT.CASES[id].title)}</b></a>`).join("");
    if (!open) {
      $("#conceptBody").innerHTML = `<a class="crumb" href="#/ideas">← Ideas map</a>
        <span class="eyebrow">Locked idea · ${esc(c.tag)}</span><h2>An idea you haven't uncovered yet</h2>
        <p class="lede">It's waiting inside ${where.length === 1 ? "this case" : "these cases"}. Commit to an answer in any of them and it unlocks — that's where it'll make the most sense.</p>
        <div class="next-grid mt">${caseLinks}</div>
        <div class="lab-actions"><button class="lab-ghost" id="peekBtn">Just show me the idea</button></div>`;
      $("#peekBtn").addEventListener("click", () => { peeked.add(k); store.set("peeked", [...peeked]); renderIdea(k); });
      return;
    }
    $("#conceptBody").innerHTML = `<a class="crumb" href="#/ideas">← Ideas map</a>
      <span class="eyebrow">${esc(c.tag)}</span><h2>${esc(c.name)}</h2>
      <p class="lede">${esc(c.one)}</p>
      <div class="concept-body mt">${c.body}</div>
      <h4 class="mt">Where it shows up</h4><div class="next-grid">${caseLinks}</div>`;
  }

  function renderIdeas() {
    const u = uncovered();
    $("#ideasGrid").innerHTML = CT.CONCEPT_ORDER.map((k) => {
      const c = CT.CONCEPTS[k], on = u.has(k), pk = peeked.has(k) && !on;
      const via = casesFor(k)[0];
      return `<a class="idea-card ${on ? "on" : pk ? "peek" : "locked"}" href="#/idea/${k}">
        <span class="tag ${on ? "r2" : ""}">${esc(c.tag)}</span>
        <b>${on || pk ? esc(c.name) : "?"}</b>
        <span>${on || pk ? esc(c.one) : "Uncover it through: " + esc(CT.CASES[via].title)}</span>
        ${pk ? '<em class="peek-note">Peeked — not yet earned through a case</em>' : ""}</a>`;
    }).join("");
  }

  /* ---------- JOURNAL ---------- */
  function renderJournal() {
    const ids = Object.keys(answers).sort((x, y) => answers[y].at - answers[x].at);
    if (!ids.length) { $("#journalList").innerHTML = `<div class="card"><p style="margin:0">Nothing yet. <a href="#/">Pick a question</a> and commit to your first answer.</p></div>`; return; }
    $("#journalList").innerHTML = ids.map((id) => {
      const c = CT.CASES[id], a = answers[id]; const o = c.options && a.opt != null ? c.options[a.opt] : null;
      const best = c.options ? c.options.find((x) => x.best) : null;
      return `<div class="card j-item"><a href="#/case/${id}" class="j-title">${esc(c.title)}</a>
        ${o ? `<div class="j-row"><span>You said</span><p class="${o.best ? "hit" : "miss"}">${esc(o.t)}</p></div>` : ""}
        ${a.text ? `<div class="j-row"><span>Your reasoning</span><p>${esc(a.text)}</p></div>` : ""}
        ${best && !o?.best ? `<div class="j-row"><span>What happened</span><p>${esc(best.t)}</p></div>` : ""}
        <div class="j-row"><span>Ideas</span><p>${c.concepts.map((k) => esc(CT.CONCEPTS[k].name)).join(" · ")}</p></div></div>`;
    }).join("");
  }
  $("#journalCopy").addEventListener("click", async () => {
    const txt = Object.keys(answers).map((id) => { const c = CT.CASES[id], a = answers[id]; const o = c.options && a.opt != null ? c.options[a.opt].t : "";
      return `${c.title}\n  You said: ${o}\n  Reasoning: ${a.text || "-"}\n  Ideas: ${c.concepts.map((k) => CT.CONCEPTS[k].name).join(", ")}`; }).join("\n\n");
    try { await navigator.clipboard.writeText(txt || "No entries yet."); CT.toast("Journal copied"); } catch (e) { CT.toast("Copy failed"); }
  });

  /* ---------- ROUTER ---------- */
  function go(h) { location.hash = h; }
  function show(view) {
    $$(".view").forEach((v) => { v.hidden = v.dataset.view !== view; });
    const navKey = { question: "home", case: "home", concept: "ideas" }[view] || view;
    $$("#navList a").forEach((a) => a.classList.toggle("active", a.dataset.view === navKey));
    nav.classList.remove("open"); mt.setAttribute("aria-expanded", false);
  }
  function route() {
    const parts = (location.hash.replace(/^#\/?/, "") || "").split("/");
    const [p, arg] = parts;
    if (!p) { fromQuestion = null; renderHome(); show("home"); }
    else if (p === "q") { renderQuestion(arg); show("question"); }
    else if (p === "case") { renderCase(arg); show("case"); }
    else if (p === "idea") { renderIdea(arg); show("concept"); }
    else if (p === "ideas") { renderIdeas(); show("ideas"); }
    else if (p === "journal") { renderJournal(); show("journal"); }
    else if (p === "lab") { show("lab"); }
    else if (p === "about") { show("about"); }
    else { renderHome(); show("home"); }
    renderProgress();
    window.scrollTo(0, 0);
    const h = $(".view:not([hidden]) h1, .view:not([hidden]) h2"); if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
  }
  window.addEventListener("hashchange", route);
  route();
})();
