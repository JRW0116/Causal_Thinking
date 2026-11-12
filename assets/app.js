/* Causal Thinking for Analysts — interactions */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // Safe storage
  const store = {
    get(k, d) { try { const v = localStorage.getItem("ct:" + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem("ct:" + k, JSON.stringify(v)); } catch (e) {} },
    clear() { try { Object.keys(localStorage).filter((k) => k.startsWith("ct:")).forEach((k) => localStorage.removeItem(k)); } catch (e) {} },
  };

  function toast(msg) {
    let t = $(".toast");
    if (!t) { t = document.createElement("div"); t.className = "toast"; document.body.appendChild(t); }
    t.textContent = msg; t.classList.add("show");
    clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("show"), 1800);
  }

  /* ---------------- Theme ---------------- */
  const savedTheme = store.get("theme", null);
  if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);
  $("#themeBtn").addEventListener("click", () => {
    const cur = document.documentElement.getAttribute("data-theme") ||
      (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = cur === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    store.set("theme", next);
  });

  /* ---------------- Mobile nav ---------------- */
  const nav = $("#sidenav"), mt = $("#menuToggle");
  mt.addEventListener("click", () => { const o = nav.classList.toggle("open"); mt.setAttribute("aria-expanded", o); });
  $$("#navList a").forEach((a) => a.addEventListener("click", () => { nav.classList.remove("open"); mt.setAttribute("aria-expanded", false); }));

  /* ---------------- Progress ---------------- */
  const MODS = $$("[data-complete]").map((b) => b.dataset.complete);
  let done = new Set(store.get("done", []));
  function renderProgress() {
    $$("[data-complete]").forEach((b) => {
      const on = done.has(b.dataset.complete);
      b.setAttribute("aria-pressed", on); b.textContent = on ? "✓ Completed" : "Mark module complete";
    });
    $$("#navList a").forEach((a) => a.classList.toggle("done", done.has(a.dataset.mod)));
    const n = MODS.filter((m) => done.has(m)).length;
    $("#progressText").textContent = `${n} of ${MODS.length} modules complete`;
    $("#progressFill").style.width = (100 * n / MODS.length) + "%";
  }
  $$("[data-complete]").forEach((b) => b.addEventListener("click", () => {
    const m = b.dataset.complete; done.has(m) ? done.delete(m) : done.add(m);
    store.set("done", [...done]); renderProgress();
  }));
  $("#resetBtn").addEventListener("click", () => {
    if (!confirm("Clear your progress, exercise notes and saved insights in this browser?")) return;
    store.clear(); location.reload();
  });
  renderProgress();

  // Active section highlight
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) $$("#navList a").forEach((a) => a.classList.toggle("active", a.dataset.mod === e.target.id));
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  $$("[data-module]").forEach((s) => io.observe(s));

  /* ---------------- Tabs ---------------- */
  $$('[role="tablist"]').forEach((list) => {
    const tabs = $$('[role="tab"]', list);
    tabs.forEach((t) => t.addEventListener("click", () => {
      tabs.forEach((x) => { x.setAttribute("aria-selected", x === t); $("#" + x.getAttribute("aria-controls")).hidden = x !== t; });
    }));
  });

  /* ---------------- Rung quiz (Module 4) ---------------- */
  const QUIZ = [
    { s: "Leaders are 2.5× more likely to run a single consolidated enterprise data platform.", a: 1, why: "A cross-sectional multiplier: co-occurrence. Fine as stated — until someone adds “so this is the lever.”" },
    { s: "If you consolidate onto one data platform, your teams will trust and act on analytics more.", a: 2, why: "“If you do X, expect Y” is an intervention claim. It needs a mechanism (trust as the gate) and a tested model." },
    { s: "This deal would have hit its targets if the value thesis had been tested in diligence.", a: 3, why: "“Would have” about a specific case is a counterfactual — the top rung." },
    { s: "Units on recall nearly tripled since 2019.", a: 1, why: "A description of what is. The room immediately asked whether definitions changed — a measurement check, not a causal claim." },
    { s: "Pushing decisions down helps only once expertise, decision rights and guardrails are defined.", a: 2, why: "A condition on an intervention — part of a causal model that licenses Rung 2 talk." },
  ];
  const qWrap = $("#rungQuiz"); let qRight = 0, qAns = 0;
  QUIZ.forEach((q, i) => {
    const el = document.createElement("div"); el.className = "card quiz-item";
    el.innerHTML = `<div class="stmt">“${esc(q.s)}”</div><div class="choices">
      <button data-v="1">Rung 1 · Seeing</button><button data-v="2">Rung 2 · Doing</button><button data-v="3">Rung 3 · Imagining</button></div>
      <div class="feedback"></div>`;
    $$("button", el).forEach((b) => b.addEventListener("click", () => {
      const v = +b.dataset.v, ok = v === q.a;
      $$("button", el).forEach((x) => { x.disabled = true; if (+x.dataset.v === q.a) x.classList.add("right"); });
      if (!ok) b.classList.add("wrong");
      const fb = $(".feedback", el); fb.innerHTML = `<b>${ok ? "Right." : "Not quite — Rung " + q.a + "."}</b> ${esc(q.why)}`; fb.classList.add("show");
      qAns++; if (ok) qRight++;
      $("#rungScore").textContent = `${qRight} of ${qAns} correct`;
    }));
    qWrap.appendChild(el);
  });

  /* ---------------- Stress-test exercise (Module 7) ---------------- */
  const EX = [
    { c: "“A 14% increase in the average number of bottles produced per day” since launching a connected-worker platform", src: "KM roundtable speaker",
      a: "What was the trend before launch? The company grows ~10% a year — is this output or productivity? What else changed (changeover work)? Is there a comparison plant without the platform?", m: "Counterfactual baseline and confounders (Moves 6, 8)" },
    { c: "“As you move up that ladder… margin, free cash flow, return on assets — they all get better… productivity really is a profitable growth engine.”", src: "CEO Council preview",
      a: "Could the arrow run backward — profitable firms funding productivity? Does the index share inputs with the outcomes it's compared to?", m: "Direction of the arrow (Move 6)" },
    { c: "Since 2015, when Industry 4.0 and first-gen AI products came to market, “we're starting to see evidence of a bending of that curve.”", src: "CEO Council preview",
      a: "Timing isn't cause: what else changed 2015–2019? Same companies over time, or survivors? If AI drove it, do heavier adopters show bigger gains?", m: "Timing vs. cause; sample composition" },
    { c: "Text analysis: customer-focused language goes with ~3.4× equity performance", src: "Council member",
      a: "Do winning companies simply talk more about customers? Industry mix? The presenter flagged this himself: he wants the “why.”", m: "Reverse causality and moderators (Moves 5, 6)" },
    { c: "The oldest plant, with the oldest equipment, “sustained the highest yields and lowest water usage” after the rollout", src: "KM roundtable speaker",
      a: "Selection: why is that plant still running? Product mix and workforce tenure? Did it lead before the rollout?", m: "Selection — a collider (Module 3)" },
  ];
  const FIELDS = [["mech", "Mechanism"], ["alt", "One alternative explanation"], ["dir", "Direction check"], ["cf", "Counterfactual"]];
  const exNotes = store.get("ex", {});
  const exList = $("#exerciseList");
  EX.forEach((e, i) => {
    const el = document.createElement("div"); el.className = "card";
    el.innerHTML = `<div class="ex-head"><span class="n">${i + 1}</span><div><div class="claim">${esc(e.c)}</div><span class="source">${esc(e.src)}</span></div></div>
      <div class="ex-body"><div class="ex-fields">${FIELDS.map(([k, l]) => `<label>${l}<textarea data-k="${i}.${k}">${esc(exNotes[i + "." + k] || "")}</textarea></label>`).join("")}</div>
      <button class="reveal-btn">Reveal answer key</button>
      <div class="answer" hidden><b>Questions that make it defensible:</b> ${esc(e.a)}<br><span class="source" style="text-transform:none;letter-spacing:0">Maps to: ${esc(e.m)}</span></div></div>`;
    $(".reveal-btn", el).addEventListener("click", (ev) => { const a = $(".answer", el); a.hidden = !a.hidden; ev.target.textContent = a.hidden ? "Reveal answer key" : "Hide answer key"; });
    $$("textarea", el).forEach((t) => t.addEventListener("input", () => { exNotes[t.dataset.k] = t.value; store.set("ex", exNotes); }));
    exList.appendChild(el);
  });

  /* =====================================================================
     INSIGHT CHALLENGE LAB
     ===================================================================== */

  const SAMPLES = [
    "Leaders are 2.5× more likely to run a single consolidated data platform, so consolidation is the lever for AI success.",
    "91% of companies have adopted AI, but 85% are less productive — AI isn't paying off.",
    "Units on recall nearly tripled since 2019, which shows quality is getting worse.",
    "Best practice: push decisions down to the front line to speed up problem solving.",
    "Leaders do more across multiple swim lanes of transformation, so clients should launch initiatives in more areas.",
  ];

  // Language patterns. Each: regex, rung it signals, label.
  const LANG = [
    { re: /\b(would have|wouldn'?t have|had (we|they|you) (not )?\w+|was responsible for|were responsible for|because of|thanks to|due to|attributable to|credited)\b/gi, r: 3, l: "attribution / counterfactual language" },
    { re: /\b(drives?|driving|driven by|leads? to|led to|causes?|caused|results? in|resulted in|the (big |key |real )?lever|levers?|unlocks?|enables?|boosts?|improves?|increases?|reduces?|delivers?|will|so you|so clients|should|must|is the key|the secret|pays? off|isn'?t paying|makes?)\b/gi, r: 2, l: "intervention language" },
    { re: /\b(\d+(\.\d+)?\s?(×|x\b)|times (more|less) likely|more likely|less likely|associated with|correlat\w*|co-occurs?|more common|tend to|are \d+%|\d+(\.\d+)?%|leaders (are|have|do|run)|top \d+%|on average)/gi, r: 1, l: "association language" },
  ];

  // Red-flag patterns tied to moves
  const FLAGS = [
    { id: "lever", re: /\b(so|therefore|which means|thus)\b.*\b(lever|key|should|must|will|drive|is how)\b|\bthe (big |key )?lever\b/i, t: "Rung jump", q: 1,
      m: "A Rung 1 pattern followed by a Rung 2 conclusion (“so… the lever”). This is the drift from Module 6: the 8.8× OpEx line became “this is the big lever.”" },
    { id: "juxt", re: /\d.*\b(but|yet|while|whereas)\b.*\d/i, t: "Juxtaposition", q: 3,
      m: "Two numbers side by side read as cause and effect. Matt's 91%-adopted / 85%-less-productive pairing was restated by the room as “AI made us less efficient.”" },
    { id: "time", re: /\b(since|after|following|post-|before)\b/i, t: "Timing ≠ cause", q: 7,
      m: "Before/after is not compared-to-what. The “curve bends after 2015” and “+14% since launch” claims both needed a do-nothing baseline." },
    { id: "best", re: /\b(best practice|always|never|everyone should|proven)\b/i, t: "No conditions", q: 5,
      m: "A finding with no boundary conditions is a platitude. “Push decisions down” was “dead wrong” on its own — it held only with expertise, decision rights and guardrails." },
    { id: "breadth", re: /\b(do more|more (initiatives|areas|swim lanes|collaboration|tools|programs)|across (multiple|more)|launch)\b/i, t: "Surface effect?", q: 2,
      m: "Breadth is often the evidence a deeper cause leaves. “Leaders do more” was the surface; operational discipline was the cause." },
    { id: "universal", re: /\b[89]\d%|\b(everybody|everyone|nearly all|most companies|universal|widely adopted)\b/i, t: "Low variance", q: 6,
      m: "If nearly everyone does it, it can't explain who wins. M&A execution discipline mattered but didn't differentiate (gaps of 1–3 points)." },
    { id: "measure", re: /\b(recall|incidents?|defects?|reported|detected|found|count)\b/i, t: "Measurement?", q: 3,
      m: "Could the measure itself have changed? “Is that because we're getting better at finding these, or changing the definition?” — CQO roundtable." },
    { id: "survivor", re: /\b(oldest|survivor|still running|remaining|surviving|successful (companies|plants|deals))\b/i, t: "Selection", q: 3,
      m: "Ask what got a case into the sample. The oldest plant is in the story because it survived — a collider." },
  ];

  const QUESTIONS = [
    { k: "mech", short: "Mechanism", title: "Name the mechanism", move: "Move 1",
      prompt: "Finish the sentence: this happens because…",
      starter: "Because… (the chain from X to Y, in one sentence)",
      story: "Jim at the OpEx roundtable: “If I can make the right decision faster than my competition… it's compounding over time.” Decision velocity is the because.",
      push: "If your “because” just restates the correlation (“because leaders do it”), it isn't a mechanism yet." },
    { k: "surface", short: "Surface", title: "Is it a surface effect?", move: "Move 2",
      prompt: "If the client forced this up tomorrow and changed nothing else, would the outcome move? If it depends on something else being in place — what is that something?",
      starter: "It would / wouldn't move, because it depends on…",
      story: "“Leaders do more across swim lanes” was heard as “do more to succeed.” The cause was the operational discipline that lets each deployment scale.",
      push: "If the answer is “only if…”, the thing after “if” is probably the real lever." },
    { k: "alt", short: "Alternatives", title: "What else could produce this pattern?", move: "Move 6", chips: ["Growth rate", "Company size", "Industry mix", "Regulation", "Capital investment", "Measurement / definition change", "Selection / survivors", "Base effect"],
      prompt: "Name at least one alternative explanation — and what you checked to rule it out.",
      starter: "It could also be… We checked by…",
      story: "High tech led productivity growth — but “if you're growing like a Foxconn, 50–60% a year,” you get leverage. The room supplied the confounder.",
      push: "Get there first: name the alternative before the room does, and say what you checked." },
    { k: "dir", short: "Direction", title: "Could the arrow run backward?", move: "Move 6", chips: ["Yes, plausibly", "Checked — it runs forward", "Both directions (a loop)", "Not sure"],
      prompt: "Could the outcome be causing the thing you're crediting? How would you tell?",
      starter: "The reverse would be… We can tell because…",
      story: "We hypothesized knowledge loss forces adaptation. Our own data said the reverse: adaptability tracks optionality, and trapped companies adapt less.",
      push: "Profitable firms can afford productivity programs. Successful companies talk more about customers. Check before you claim." },
    { k: "cond", short: "Conditions", title: "When does it stop being true?", move: "Move 5",
      prompt: "Complete: “This holds when… but not when…”",
      starter: "This holds when… but not when…",
      story: "Customer-focused language went with ~3.4× equity performance — except where customers have no choice, as with utilities.",
      push: "Conditions are what let an insight travel into one client's context — Matt's “adjacency problem.”" },
    { k: "var", short: "Variance", title: "Does it differentiate, or is it table stakes?", move: "Move 4", chips: ["Differentiates — leaders and followers differ a lot", "Table stakes — nearly everyone does it", "Don't know the spread"],
      prompt: "How much does this vary between leaders and followers? If nearly everyone does it, what actually separates them?",
      starter: "The spread is… What actually separates them is…",
      story: "Everyone runs a disciplined M&A integration playbook; leader–follower gaps were 1–3 points. The differentiator sat upstream, in diligence.",
      push: "Say both halves: “It matters, it's just not differentiating.”" },
    { k: "cf", short: "Counterfactual", title: "Compared to what?", move: "Move 8",
      prompt: "What happens on the do-nothing path? What happens if you take it away? What test could the client run in their own organization?",
      starter: "Compared to… If removed… A client could test it by…",
      story: "Amgen measures cost of quality against a “do nothing” curve as volume scales — not against last year's spend. Mike: “Do you really know what happens when you take it away?”",
      push: "A test the client can run is what turns your claim into their decision." },
  ];

  const EVIDENCE = {
    "0": { r: 0, label: "One case or anecdote", txt: "A single case can't establish even a Rung 1 pattern. Treat it as a hypothesis worth testing." },
    "1": { r: 1, label: "Cross-tab or benchmark", txt: "That's Rung 1 evidence. It earns “co-occurs with” or “is more common among.”" },
    "1b": { r: 1.5, label: "Controlled comparison", txt: "Still Rung 1 — but stronger. Holding obvious confounders constant earns “predicts.”" },
    "2": { r: 2, label: "Tested causal model / experiment", txt: "That can support Rung 2 language — if the mechanism is stated and the model survived a disconfirmation test." },
    "x": { r: 0.5, label: "Unknown", txt: "Then the honest assumption is Rung 1. Find the source before this goes on a slide." },
  };

  const RUNG_NAME = { 0: "Below Rung 1", 1: "Rung 1 · Seeing", 1.5: "Rung 1+ · Seeing", 2: "Rung 2 · Doing", 3: "Rung 3 · Imagining", 0.5: "Unknown" };

  // Lab state
  let L = freshState();
  function freshState() { return { text: "", source: "", claimed: 1, hits: [], flags: [], ev: null, step: 0, ans: {}, rate: {}, chips: {} }; }

  function analyze(text) {
    const hits = [];
    LANG.forEach((p) => { let m; p.re.lastIndex = 0; while ((m = p.re.exec(text))) hits.push({ i: m.index, j: m.index + m[0].length, r: p.r, w: m[0] }); });
    // de-overlap: keep highest rung, then longest
    hits.sort((a, b) => a.i - b.i || b.r - a.r || (b.j - b.i) - (a.j - a.i));
    const keep = []; let end = -1;
    hits.forEach((h) => { if (h.i >= end) { keep.push(h); end = h.j; } });
    const claimed = keep.length ? Math.max(...keep.map((h) => h.r)) : 1;
    const flags = FLAGS.filter((f) => f.re.test(text));
    return { hits: keep, claimed, flags };
  }
  function highlight(text, hits) {
    let out = "", p = 0;
    hits.forEach((h) => { out += esc(text.slice(p, h.i)) + `<mark class="m${h.r}" title="Rung ${h.r} language">${esc(text.slice(h.i, h.j))}</mark>`; p = h.j; });
    return "“" + out + esc(text.slice(p)) + "”";
  }

  function show(stage) { ["labIntake", "labDiagnosis", "labQuestions", "labResult"].forEach((id) => { $("#" + id).hidden = id !== stage; }); }

  // Samples
  const sampWrap = $("#labSamples");
  SAMPLES.forEach((s) => { const b = document.createElement("button"); b.textContent = s; b.addEventListener("click", () => { $("#insightInput").value = s; $("#insightInput").focus(); }); sampWrap.appendChild(b); });

  $("#labStart").addEventListener("click", () => {
    const text = $("#insightInput").value.trim();
    if (text.length < 12) { toast("Paste or type an insight first"); $("#insightInput").focus(); return; }
    L = freshState(); L.text = text; L.source = $("#insightSource").value.trim();
    const a = analyze(text); Object.assign(L, a);
    renderDiagnosis(); show("labDiagnosis");
    $("#lab").scrollIntoView({ behavior: "smooth" });
  });
  $("#labBack").addEventListener("click", () => show("labIntake"));

  function renderDiagnosis() {
    $("#labQuote").innerHTML = highlight(L.text, L.hits) + (L.source ? `<span class="cite">— ${esc(L.source)}</span>` : "");
    $("#diagClaimed").textContent = RUNG_NAME[L.claimed];
    $("#diagClaimed").style.color = `var(--rung${L.claimed})`;
    const words = L.hits.filter((h) => h.r === L.claimed).map((h) => "“" + h.w + "”");
    $("#diagClaimedWhy").innerHTML = words.length
      ? `Its strongest words — ${esc([...new Set(words)].slice(0, 4).join(", "))} — are ${L.claimed === 1 ? "association" : L.claimed === 2 ? "intervention" : "counterfactual"} language.`
      : "No strong causal verbs detected; it reads as a description.";
    $("#diagEvidence").textContent = "Rung 1 · Seeing";
    $("#diagEvidence").style.color = "var(--rung1)";
    $("#diagEvidenceWhy").textContent = "Most survey statistics, benchmarks and before/after comparisons. Tell us what's behind this one below.";
    const fw = $("#diagFlags");
    fw.innerHTML = L.flags.length ? `<h4>What a skeptical room would notice</h4>` + L.flags.map((f) => `<div class="flag"><span class="ft">⚑ ${esc(f.t)}</span><span class="fm">${esc(f.m)}</span></div>`).join("")
      : `<div class="flag"><span class="ft" style="color:var(--good)">No obvious traps</span><span class="fm">The language looks careful. The seven questions will still find what the room would ask.</span></div>`;
    $$("#evidenceChoices button").forEach((b) => { b.classList.remove("right", "wrong"); b.setAttribute("aria-pressed", "false"); });
    $("#evidenceFeedback").classList.remove("show");
    $("#labToQs").disabled = true;
  }

  $$("#evidenceChoices button").forEach((b) => b.addEventListener("click", () => {
    L.ev = b.dataset.ev; const ev = EVIDENCE[L.ev];
    $$("#evidenceChoices button").forEach((x) => x.classList.toggle("right", x === b));
    $("#diagEvidence").textContent = ev.label; $("#diagEvidence").style.color = ev.r >= 2 ? "var(--rung2)" : "var(--rung1)";
    $("#diagEvidenceWhy").textContent = ev.txt;
    const gap = L.claimed - Math.floor(ev.r === 1.5 ? 1 : ev.r);
    const fb = $("#evidenceFeedback");
    if (gap > 0) fb.innerHTML = `<div class="gap"><b>Rung gap: the language claims ${RUNG_NAME[L.claimed]}, the evidence supports ${ev.r >= 1 ? "Rung " + Math.floor(ev.r) : "less than Rung 1"}.</b> That gap is where messaging goes wrong — or, closed honestly, where it differentiates. The next seven questions are how you close it.</div>`;
    else fb.innerHTML = `<div class="gap ok"><b>The language and the evidence are on the same rung.</b> Good. The seven questions will check whether it's ready to climb — and whether it's ready for a client.</div>`;
    fb.classList.add("show");
    $("#labToQs").disabled = false;
  }));

  $("#labToQs").addEventListener("click", () => { L.step = 0; show("labQuestions"); $("#labQuote2").innerHTML = highlight(L.text, L.hits); renderQ(); });

  function flagsFor(qi) { return L.flags.filter((f) => f.q === qi + 1); }

  function renderStepper() {
    $("#labStepper").innerHTML = QUESTIONS.map((q, i) => {
      const r = L.rate[q.k]; const cls = [i === L.step ? "cur" : "", r ? "s-" + r : ""].join(" ");
      return `<button class="${cls}" data-i="${i}" data-n="${i + 1}" title="${esc(q.title)}">${i + 1}. ${esc(q.short)}</button>`;
    }).join("");
    $$("#labStepper button").forEach((b) => b.addEventListener("click", () => { saveAnswer(); L.step = +b.dataset.i; renderQ(); }));
  }

  function renderQ() {
    renderStepper();
    const q = QUESTIONS[L.step], fl = flagsFor(L.step);
    const pushTxt = fl.length ? fl.map((f) => `<b>⚑ ${esc(f.t)} in your insight</b>${esc(f.m)}`).join("<br><br>") : `<b>Push yourself</b>${esc(q.push)}`;
    const chips = q.chips ? `<div class="chips">${q.chips.map((c) => `<button data-c="${esc(c)}" class="${(L.chips[q.k] || []).includes(c) ? "on" : ""}">${esc(c)}</button>`).join("")}</div>` : "";
    $("#labQCard").innerHTML = `<div class="qcard">
      <span class="qnum">Question ${L.step + 1} of 7 · ${esc(q.move)}</span>
      <h3>${esc(q.title)}</h3>
      <div class="qprompt">${esc(q.prompt)}</div>
      <div class="coach"><div class="story"><b>From the room</b>${esc(q.story)}</div><div class="push">${pushTxt}</div></div>
      <textarea class="lab-answer" id="qAnswer" placeholder="${esc(q.starter)}">${esc(L.ans[q.k] || "")}</textarea>
      ${chips}
      <div class="rate"><span>How solid is your answer?</span>
        <button data-r="solid" aria-pressed="${L.rate[q.k] === "solid"}">Solid — I could defend it</button>
        <button data-r="partial" aria-pressed="${L.rate[q.k] === "partial"}">Partial — a hunch</button>
        <button data-r="skip" aria-pressed="${L.rate[q.k] === "skip"}">Can't answer yet</button></div>
      <div class="nudge" id="qNudge"></div></div>`;
    $$("#labQCard .chips button").forEach((b) => b.addEventListener("click", () => {
      const arr = L.chips[q.k] || (L.chips[q.k] = []); const c = b.dataset.c; const i = arr.indexOf(c);
      if (q.k === "dir" || q.k === "var") { arr.length = 0; if (i < 0) arr.push(c); $$("#labQCard .chips button").forEach((x) => x.classList.toggle("on", arr.includes(x.dataset.c))); }
      else { i < 0 ? arr.push(c) : arr.splice(i, 1); b.classList.toggle("on"); }
    }));
    $$("#labQCard .rate button").forEach((b) => b.addEventListener("click", () => {
      L.rate[q.k] = b.dataset.r; $$("#labQCard .rate button").forEach((x) => x.setAttribute("aria-pressed", x === b)); renderStepperKeepFocus();
    }));
    $("#labPrev").disabled = L.step === 0; $("#labPrev").style.visibility = L.step === 0 ? "hidden" : "visible";
    $("#labNext").textContent = L.step === QUESTIONS.length - 1 ? "See my result →" : "Next →";
    $("#qAnswer").focus({ preventScroll: true });
  }
  function renderStepperKeepFocus() { const v = $("#qAnswer").value; renderStepper(); $("#qAnswer").value = v; }
  function saveAnswer() { const t = $("#qAnswer"); if (t) L.ans[QUESTIONS[L.step].k] = t.value.trim(); }

  // Light-touch quality checks so the lab actually challenges
  function check(q, text) {
    const t = text.toLowerCase();
    if (!text) return "Write something — even a hunch — or mark it “Can't answer yet.”";
    if (q.k === "mech") {
      if (text.length < 25) return "That's short for a mechanism. What is the chain of steps between X and Y?";
      if (/\b(leaders|they|top (performers|companies)) (do|have|run) it\b|\bbecause (it works|it's best practice|leaders do)/i.test(text)) return "That restates the pattern. A mechanism names what happens in between.";
      if (L.text && t.length > 10 && L.text.toLowerCase().includes(t)) return "That repeats the insight itself. What happens in between?";
    }
    if (q.k === "alt" && !(L.chips.alt || []).length && text.length < 20) return "Name a specific confounder — growth, size, mix, regulation, capex — and how you'd check it.";
    if (q.k === "cond" && !/\b(when|unless|only|except|if|until|not)\b/i.test(text)) return "A condition usually contains “when,” “only if,” “unless,” or “except.” Where does it break?";
    if (q.k === "cf" && !/\b(compar|baseline|do.nothing|without|remov|take it away|control|test|pilot|vs\.?|versus|instead)\b/i.test(text)) return "Name the comparison: the do-nothing path, a control group, or a test the client could run.";
    return "";
  }

  $("#labNext").addEventListener("click", () => {
    saveAnswer(); const q = QUESTIONS[L.step]; const a = L.ans[q.k] || "";
    if (!L.rate[q.k]) {
      const msg = check(q, a);
      if (msg && !$("#qNudge").dataset.warned) { $("#qNudge").textContent = msg + " (Click Next again to continue anyway.)"; $("#qNudge").dataset.warned = "1"; return; }
      L.rate[q.k] = a ? (msg ? "partial" : "partial") : "skip";
    }
    if (L.step < QUESTIONS.length - 1) { L.step++; renderQ(); } else { renderResult(); show("labResult"); $("#lab").scrollIntoView({ behavior: "smooth" }); }
  });
  $("#labPrev").addEventListener("click", () => { saveAnswer(); if (L.step > 0) { L.step--; renderQ(); } });
  $("#labSkip").addEventListener("click", () => { saveAnswer(); L.rate[QUESTIONS[L.step].k] = "skip"; $("#labNext").click(); });

  function score() { return QUESTIONS.reduce((s, q) => s + (L.rate[q.k] === "solid" ? 1 : L.rate[q.k] === "partial" ? 0.5 : 0), 0); }

  function suggestedVerb(sc) {
    const ev = EVIDENCE[L.ev] ? EVIDENCE[L.ev].r : 1;
    if (ev >= 2 && sc >= 6 && L.rate.mech === "solid" && L.rate.alt === "solid") return { rung: 2, v: "“drives” / “if you do X, expect Y”", why: "Tested model, a solid mechanism, and alternatives handled. You've earned Rung 2 language — keep the condition attached." };
    if (ev >= 1.5 && L.rate.alt === "solid") return { rung: 1, v: "“predicts”", why: "Confounders addressed, but no tested causal model. Say “predicts” and add your “because.”" };
    return { rung: 1, v: "“co-occurs with” / “is more common among”", why: "The evidence is Rung 1. Use the association verb — then add the mechanism you believe as your read, not as the finding." };
  }

  function stripAssoc(text) {
    // Take the association half of the original (before "so/therefore/which means")
    const m = text.split(/\s*(?:[,;—–-]\s*)?\b(?:so|therefore|which means|thus|which shows|proving)\b\s*/i)[0];
    return m.replace(/[.\s]+$/, "");
  }
  function sentence(s) { s = (s || "").trim().replace(/\s+/g, " "); if (!s) return ""; s = s.charAt(0).toUpperCase() + s.slice(1); return /[.!?”"]$/.test(s) ? s : s + "."; }
  function clean(s, lead) { s = (s || "").trim(); const re = new RegExp("^(" + lead + ")\\s*", "i"); return s.replace(re, ""); }

  function buildRewrite(v) {
    const parts = [];
    let base = stripAssoc(L.text).replace(/^[“"]|[”"]$/g, "");
    if (v.rung < 2) base = base.replace(/\b(drives?|leads? to|causes?|results? in|boosts?|improves?)\b/gi, "goes with");
    parts.push(sentence(base));
    if (L.ans.mech) parts.push("Our read on why: " + clean(L.ans.mech, "because|it's because|this happens because").replace(/[.]$/, "") + ".");
    if (L.ans.surface && L.rate.surface !== "skip" && /depend|only|requires?|needs?|unless/i.test(L.ans.surface)) parts.push(sentence(L.ans.surface));
    if (L.ans.cond) parts.push(sentence(clean(L.ans.cond, "")));
    const alts = (L.chips.alt || []);
    if (L.ans.alt || alts.length) parts.push(sentence("We checked the obvious alternative" + (alts.length ? "s (" + alts.join(", ").toLowerCase() + ")" : "") + (L.ans.alt ? ": " + L.ans.alt.charAt(0).toLowerCase() + L.ans.alt.slice(1).replace(/[.]$/, "") : "")));
    if (L.ans.var && /table stakes|everyone|nearly all/i.test(L.ans.var + (L.chips.var || []).join())) parts.push("It matters, but it isn't what separates leaders — that is the next question.");
    if (L.ans.cf) parts.push(sentence(L.ans.cf));
    return parts.join(" ");
  }

  function renderResult() {
    const sc = score();
    $("#resScore").textContent = (sc % 1 ? sc.toFixed(1) : sc);
    let verdict, why;
    const evR = EVIDENCE[L.ev] ? EVIDENCE[L.ev].r : 1;
    if (sc >= 6 && evR >= 2) { verdict = "Client-ready causal claim"; why = "You can say why, when, compared to what — and the evidence is a tested model. Rung 2 language is earned; keep the condition attached."; }
    else if (sc >= 6) { verdict = "Defensible — as a Rung 1 finding with a causal read"; why = "Your reasoning is strong, but the evidence is still association. Present the mechanism as our read, and turn it into a model the next survey can test."; }
    else if (sc >= 4) { verdict = "Promising — a few gaps to close"; why = "The core story is there. Close the gaps marked below before this goes on a slide."; }
    else if (sc >= 2) { verdict = "Still a Rung 1 observation"; why = "Useful as a pattern, not yet as advice. Say it with the association verb and go find the mechanism."; }
    else { verdict = "A hypothesis, not an insight"; why = "That's fine — every causal model starts here. Write down what you believe causes what, then test it."; }
    $("#resVerdict").textContent = verdict; $("#resVerdictWhy").textContent = why;
    $("#resGrid").innerHTML = QUESTIONS.map((q) => {
      const r = L.rate[q.k] || "skip"; const a = L.ans[q.k]; const ch = (L.chips[q.k] || []).join(", ");
      const body = a || ch ? esc([ch, a].filter(Boolean).join(" — ")) : `<span class="todo">Open question — ${esc(q.prompt)}</span>`;
      return `<div class="res-item ${r}"><b>${esc(q.short)} · ${r === "solid" ? "solid" : r === "partial" ? "partial" : "open"}</b><p>${body}</p></div>`;
    }).join("");
    const v = suggestedVerb(sc);
    $("#resRewrite").value = buildRewrite(v);
    $("#resOriginal").innerHTML = highlight(L.text, L.hits);
    $("#resVerb").innerHTML = `<b>${esc(v.v)}</b> — ${esc(v.why)}`;
    L.result = { sc, verdict, verb: v.v };
  }

  $("#labRestart").addEventListener("click", () => { $("#insightInput").value = ""; $("#insightSource").value = ""; show("labIntake"); $("#insightInput").focus(); });
  function summary() {
    const lines = [`ORIGINAL: ${L.text}${L.source ? " (" + L.source + ")" : ""}`, `CAUSAL READINESS: ${L.result.sc}/7 — ${L.result.verdict}`, `SUGGESTED VERB: ${L.result.verb}`, ""];
    QUESTIONS.forEach((q) => lines.push(`${q.short.toUpperCase()} [${L.rate[q.k] || "open"}]: ${[(L.chips[q.k] || []).join(", "), L.ans[q.k]].filter(Boolean).join(" — ") || "—"}`));
    lines.push("", "REWRITE: " + $("#resRewrite").value);
    return lines.join("\n");
  }
  $("#labCopy").addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(summary()); toast("Summary copied"); }
    catch (e) { const ta = document.createElement("textarea"); ta.value = summary(); document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); toast("Summary copied"); } catch (_) { toast("Copy failed"); } ta.remove(); }
  });

  let log = store.get("log", []);
  function renderLog() {
    $("#labLogWrap").hidden = !log.length;
    $("#labLog").innerHTML = log.map((e, i) => `<div class="card log-item"><div class="lq">“${esc(e.text)}”</div><div class="lr">${esc(e.rewrite)}</div>
      <div class="lm"><span>${esc(e.date)}</span><span>${esc(String(e.sc))}/7 · ${esc(e.verdict)}</span><button data-del="${i}">Delete</button></div></div>`).join("");
    $$("#labLog [data-del]").forEach((b) => b.addEventListener("click", () => { log.splice(+b.dataset.del, 1); store.set("log", log); renderLog(); }));
  }
  $("#labSave").addEventListener("click", () => {
    log.unshift({ text: L.text, rewrite: $("#resRewrite").value, sc: L.result.sc, verdict: L.result.verdict, date: new Date().toLocaleDateString() });
    log = log.slice(0, 30); store.set("log", log); renderLog(); toast("Saved to your log");
  });
  renderLog();
})();
