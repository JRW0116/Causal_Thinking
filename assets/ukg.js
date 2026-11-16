/* LNS lexicon from the UKG snapshot (assets/ukg-lexicon.js):
   - a searchable lexicon view (#/lexicon)
   - term matching for cases and the Insight Challenge Lab
   - "speak LNS" checks: avoid-terms → preferred discipline language */
(function () {
  "use strict";
  const CT = window.CT, U = CT.UKG;
  if (!U) return;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reEsc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // Term matchers: skip very short / generic terms so matches stay meaningful
  const GENERIC = new Set(["data", "quality", "safety", "culture", "productivity", "ai", "agility", "trust", "action", "insight", "leaders", "followers", "growth"]);
  const AVOID_SET = new Set(U.defs.flatMap((d) => (d.avoid || []).map((a) => a.toLowerCase())));
  const matchers = U.vocab
    .filter((v) => v.t.trim().split(/\s+/).length >= 2 && !GENERIC.has(v.t.toLowerCase()) && !AVOID_SET.has(v.t.toLowerCase()))
    .map((v) => ({ v, re: new RegExp("(^|[^\\w])" + reEsc(v.t) + "(?=$|[^\\w])", "i") }))
    .sort((a, b) => b.v.t.length - a.v.t.length);

  function findTerms(text, max = 6) {
    const out = [], used = [];
    for (const m of matchers) {
      if (out.length >= max) break;
      const hit = m.re.exec(text); if (!hit) continue;
      const lo = m.v.t.toLowerCase();
      if (used.some((u) => u.includes(lo))) continue; // prefer longest, skip contained terms
      used.push(lo); out.push(m.v);
    }
    return out;
  }

  // Avoid-terms from discipline voice rules
  const avoid = [];
  U.defs.forEach((d) => (d.avoid || []).forEach((a) => {
    if (!a || a.length < 2) return;
    avoid.push({ a, d, re: new RegExp("(^|[^\\w])" + reEsc(a) + "(?=$|[^\\w])", a.length <= 3 ? "" : "i") });
  }));
  function avoidHits(text) {
    const seen = new Set(); const out = [];
    avoid.forEach((x) => { if (x.re.test(text) && !seen.has(x.a.toLowerCase())) { seen.add(x.a.toLowerCase()); out.push(x); } });
    return out;
  }

  // Related constructs by word overlap (names only)
  const STOP = new Set("the and for with from that this are was our your their into over more most than have has will can its not all any per how what why who when where which a an of to in on by or as at is be it".split(" "));
  const toks = (s) => s.toLowerCase().replace(/[^a-z0-9&\s-]/g, " ").split(/\s+/).filter((w) => w.length > 2 && !STOP.has(w));
  const cIndex = U.constructs.map((c) => ({ c, w: new Set(toks(c.n)) }));
  function relatedConstructs(text, n = 5) {
    const q = new Set(toks(text)); if (!q.size) return [];
    return cIndex.map((x) => { let s = 0; x.w.forEach((w) => { if (q.has(w)) s++; }); return { c: x.c, s: s / Math.sqrt(x.w.size || 1) }; })
      .filter((x) => x.s >= 0.9).sort((a, b) => b.s - a.s)
      .reduce((acc, x) => { // keep variety: skip names that mostly repeat one already picked (e.g. "SCM" variants)
        const k = new Set(toks(x.c.n.replace(/\([^)]*\)/g, " ")));
        const similar = (y) => { let i = 0; k.forEach((w) => { if (y.k.has(w)) i++; }); return i / Math.min(k.size || 1, y.k.size || 1) >= 0.6; };
        if (acc.length < n && !acc.some(similar)) acc.push({ k, c: x.c }); return acc; }, [])
      .map((x) => x.c);
  }

  const byName = new Map(); U.vocab.forEach((v) => { const k = v.t.toLowerCase(); if (!byName.has(k)) byName.set(k, v); });
  function lookup(names) { return (names || []).map((n) => byName.get(String(n).toLowerCase())).filter(Boolean); }

  function termChip(v) {
    return `<details class="lex-chip"><summary>${esc(v.t)}</summary><div><p>${esc(v.d)}</p><span class="source">${esc((v.disc || []).join(" · "))}${v.use && v.use !== "definitional" ? " · " + esc(v.use.replace("_", " ")) : ""}</span></div></details>`;
  }

  CT.lexicon = { findTerms, avoidHits, relatedConstructs, termChip, lookup };

  /* ---------- Lexicon view ---------- */
  const DISC = [...new Set(U.vocab.flatMap((v) => v.disc || []))].sort();
  const TYPES = [...new Set(U.vocab.map((v) => v.type).filter(Boolean))].sort();
  let state = { q: "", disc: "", type: "", tab: "terms", limit: 60 };

  CT.renderLexicon = function () {
    const root = $("#lexiconBody"); if (!root) return;
    if (!root.dataset.built) {
      root.dataset.built = "1";
      root.innerHTML = `
        <span class="eyebrow">From the LNS Unified Knowledge Graph</span>
        <h2>Speak LNS</h2>
        <p class="lede">The terms, definitions and language rules the UKG uses to ground CDI. A causal claim is only as clear as its words — use the term LNS means, and avoid the ones it doesn't.</p>
        <div class="lex-meta">Snapshot ${esc(U.exported)} · ${U.counts.vocab.toLocaleString()} terms · ${U.counts.defs} discipline rules · ${U.counts.constructs.toLocaleString()} constructs</div>
        <div class="tabs mt" role="tablist">
          <button role="tab" data-tab="terms" aria-selected="true">Terms</button>
          <button role="tab" data-tab="rules" aria-selected="false">Discipline language rules</button>
          <button role="tab" data-tab="constructs" aria-selected="false">Constructs</button>
        </div>
        <div class="lex-controls">
          <input id="lexQ" class="lab-text" placeholder="Search terms and definitions…" autocomplete="off">
          <select id="lexDisc" class="lab-text"><option value="">All disciplines</option>${DISC.map((d) => `<option>${esc(d)}</option>`).join("")}</select>
          <select id="lexType" class="lab-text"><option value="">All types</option>${TYPES.map((t) => `<option value="${esc(t)}">${esc(t.replace("_", " "))}</option>`).join("")}</select>
        </div>
        <div id="lexCount" class="lex-count"></div>
        <div id="lexList"></div>
        <div class="lab-actions"><button class="lab-ghost" id="lexMore" hidden>Show more</button></div>`;
      $("#lexQ").addEventListener("input", (e) => { state.q = e.target.value.trim().toLowerCase(); state.limit = 60; draw(); });
      $("#lexDisc").addEventListener("change", (e) => { state.disc = e.target.value; state.limit = 60; draw(); });
      $("#lexType").addEventListener("change", (e) => { state.type = e.target.value; state.limit = 60; draw(); });
      $("#lexMore").addEventListener("click", () => { state.limit += 120; draw(); });
      $$('#lexiconBody [role="tab"]').forEach((b) => b.addEventListener("click", () => {
        state.tab = b.dataset.tab; state.limit = 60;
        $$('#lexiconBody [role="tab"]').forEach((x) => x.setAttribute("aria-selected", x === b));
        $("#lexType").hidden = state.tab !== "terms"; draw();
      }));
    }
    draw();
  };

  function hl(s) {
    if (!state.q) return esc(s);
    const i = s.toLowerCase().indexOf(state.q); if (i < 0) return esc(s);
    return esc(s.slice(0, i)) + "<mark>" + esc(s.slice(i, i + state.q.length)) + "</mark>" + esc(s.slice(i + state.q.length));
  }

  function draw() {
    const list = $("#lexList"), more = $("#lexMore");
    if (state.tab === "rules") {
      const rows = U.defs.filter((d) => (!state.q || (d.t + " " + d.d + " " + d.voice + " " + d.avoid.join(" ")).toLowerCase().includes(state.q)) && (!state.disc || d.t === state.disc));
      $("#lexCount").textContent = `${rows.length} rules`;
      list.innerHTML = `<div class="stack">${rows.map((d) => `<div class="card lex-rule">
        <span class="tag r2">${esc(d.level.replace("_", " "))}</span><h3>${hl(d.t)}</h3><p>${hl(d.d)}</p>
        ${d.voice ? `<div class="lex-voice"><b>How LNS says it:</b> ${hl(d.voice)}</div>` : ""}
        <div class="lex-pa">${d.syn.length ? `<span class="ok">Use: ${d.syn.map(esc).join(", ")}</span>` : ""}${d.avoid.length ? `<span class="no">Avoid: ${d.avoid.map(esc).join(", ")}</span>` : ""}</div></div>`).join("")}</div>`;
      more.hidden = true; return;
    }
    if (state.tab === "constructs") {
      const rows = U.constructs.filter((c) => (!state.q || c.n.toLowerCase().includes(state.q)) && (!state.disc || (c.disc || []).includes(state.disc)));
      $("#lexCount").textContent = `${rows.length.toLocaleString()} constructs — the measured things LNS research tracks. Names only; the causal links between them stay in the UKG.`;
      list.innerHTML = `<div class="lex-constructs">${rows.slice(0, state.limit).map((c) => `<span title="${esc((c.disc || []).join(" · "))}">${hl(c.n)}</span>`).join("")}</div>`;
      more.hidden = rows.length <= state.limit; return;
    }
    const rows = U.vocab.filter((v) => (!state.q || (v.t + " " + v.d).toLowerCase().includes(state.q)) && (!state.disc || (v.disc || []).includes(state.disc)) && (!state.type || v.type === state.type));
    $("#lexCount").textContent = `${rows.length.toLocaleString()} terms`;
    list.innerHTML = `<dl class="lex-terms">${rows.slice(0, state.limit).map((v) => `<div><dt>${hl(v.t)}<span class="lex-type">${esc((v.type || "").replace("_", " "))}</span></dt><dd>${hl(v.d)}<span class="source">${esc((v.disc || []).join(" · "))}</span></dd></div>`).join("")}</dl>`;
    more.hidden = rows.length <= state.limit;
  }
})();
