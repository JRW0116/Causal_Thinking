/* Pearl's Ladder of Causation as the spine of the tool.
   Source framework: Judea Pearl & Dana Mackenzie, The Book of Why (Basic Books, 2018). Paraphrased throughout.
   CT.RUNG[caseId] = { c: rung the claim speaks from, e: rung the evidence reaches (0 = anecdote / plan / none),
                       el: what the evidence is, climb: what it would take to earn the claim } */
window.CT = window.CT || {};

CT.RUNG_INFO = {
  1: { name: "Seeing", kind: "Association", q: "What if I see X?", math: "P(y | x)",
       asks: "How does observing X change what I expect of Y?",
       earns: "Any survey cross-tab, benchmark or correlation. Most of our statistics live here.",
       verbs: "“co-occurs with,” “is more common among”; “predicts” once obvious confounders are handled" },
  2: { name: "Doing", kind: "Intervention", q: "What if I do X?", math: "P(y | do(x))",
       asks: "What happens to Y if we deliberately change X?",
       earns: "An experiment — or a causal model (assumptions written down) that the data has tested, with the confounders adjusted for.",
       verbs: "“drives,” “if you do X, expect Y” — with a mechanism and a stated condition" },
  3: { name: "Imagining", kind: "Counterfactuals", q: "What if I had done X?", math: "P(y_x | x′, y′)",
       asks: "Was it X that caused Y, here? What would have happened otherwise?",
       earns: "A causal model plus the facts of the specific case, and an explicit do-nothing path.",
       verbs: "“would have,” “was responsible for,” “because of” — about one case" },
};

CT.RUNG = {
  "ai-adoption": { c: 1, e: 1, el: "two descriptive statistics", climb: "Two Rung 1 facts placed side by side get heard as Rung 2. Say what you are not claiming, and point to what the top 15% do differently." },
  "opex-88": { c: 2, e: 1, el: "a survey multiplier", climb: "“The lever” needs a mechanism and a client-side test. Add the “because,” then the test." },
  "data-platform": { c: 2, e: 1, el: "a survey multiplier", climb: "Name the mediator (trust between insight and action), then give the CQO a test in their own plants." },
  "swim-lanes": { c: 2, e: 1, el: "a leader–follower cross-tab", climb: "Find the common cause (operational discipline). Pearl's do-test: if breadth were forced up and nothing else changed, would performance move?" },
  "collaboration": { c: 2, e: 2, el: "survey data tested against a causal model — and it disconfirmed the belief", climb: "Earned the hard way: the model was tested, the naive version failed, and the condition (engineered collaboration) survived." },
  "attrition": { c: 2, e: 1, el: "an attrition metric", climb: "Separate the symptom from its cause: open-ended data showed mission, not culture, drove retention." },
  "mna-execution": { c: 2, e: 1, el: "a cross-tab with almost no variance", climb: "Rung 1 data can't speak to a factor that doesn't vary. Say it matters but doesn't differentiate; look upstream." },
  "recalls": { c: 1, e: 1, el: "a trend count", climb: "Check the ruler first (definitions, detection), then show the check, then offer the mechanism." },
  "high-tech": { c: 2, e: 1, el: "an industry comparison", climb: "Adjust for the back door — growth rate and base effects — before crediting the industry." },
  "regulated": { c: 2, e: 1, el: "an industry comparison", climb: "Capital investment differs between the groups; adjust for it before crediting or blaming regulation." },
  "knowledge-loss": { c: 2, e: 1, el: "survey data", climb: "The data reversed the arrow. Check direction before claiming X drives Y." },
  "oldest-plant": { c: 3, e: 0, el: "one surviving case", climb: "A Rung 3 claim about one plant, built on a sample selected by survival. Ask what got it into the story, and whether it led before the rollout." },
  "bottles": { c: 3, e: 1, el: "a before/after number", climb: "Attribution to the platform needs the do-nothing path: the pre-launch trend and a comparison plant." },
  "curve-2015": { c: 2, e: 1, el: "a time series", climb: "Timing isn't cause. Use the same companies over time and check dose–response: do heavier adopters gain more?" },
  "amgen": { c: 3, e: 2, el: "a modeled do-nothing curve", climb: "This is the climb done right: the ROI is stated against an explicit counterfactual." },
  "deal-failure": { c: 3, e: 1, el: "an aggregate failure rate", climb: "“Why did this deal fail?” is Rung 3. Decompose the failure into its causes; each needs a different fix." },
  "utilization": { c: 2, e: 1, el: "operating experience and benchmarks", climb: "The relationship has a threshold. Say where it turns, not just its direction." },
  "customer-language": { c: 1, e: 1, el: "a text-analysis association", climb: "Add the boundary condition (no-choice markets) and rule out reverse causation before saying “drives.”" },
  "explain": { c: 2, e: 2, el: "the causal model itself", climb: "A causal model is the Rung 2 tool: what makes things true, and what breaks them, written down so data can test it." },
  "spc-vs-manual": { c: 2, e: 1, el: "two studies harmonized into one chart", climb: "Confirm the two sources measure the same thing; then test whether decision speed mediates the gap." },
  "genai-trust": { c: 1, e: 1, el: "a survey trust rating", climb: "Separate trust in the interface from trust in the inference before advising on either." },
  "stack-models": { c: 2, e: 0, el: "a plan, not yet deployed", climb: "Run the stack against a do-nothing baseline and against each layer alone before claiming it works." },
  "messy-data": { c: 2, e: 1, el: "data from about 20 incomparable sources", climb: "Make the measurements comparable first, or the model learns the source, not the process." },
  "agentic-email": { c: 2, e: 0, el: "a practitioner's account", climb: "Name the mediator — speed or consistency — and measure it against events handled before the agent." },
  "adaptive-24": { c: 2, e: 1, el: "a productivity-research association", climb: "Adjust for the back door: compare within industry and workforce-loss levels before calling adaptivity the lever." },
  "copy-exact": { c: 2, e: 2, el: "a near-natural experiment between matched fabs", climb: "Hold everything else equal and the remaining difference is the candidate cause. Then test it." },
  "superstition": { c: 2, e: 1, el: "operators' experience", climb: "Require a plausible mechanism, then a test, before tacit know-how becomes standard work." },
  "variation-rule": { c: 2, e: 1, el: "a plant's own comparison of methods", climb: "Compare the methods on the same task under the same conditions; standardize only what changes the outcome." },
  "attrition-protocols": { c: 2, e: 1, el: "a survey multiplier", climb: "Rule out reverse direction and common causes, then compare plants that add protocols with similar plants that don't." },
  "trust-3x": { c: 2, e: 1, el: "a survey multiplier, groups defined by success", climb: "Define groups by something other than the outcome, and test the auditability mechanism directly." },
  "correlate-first": { c: 1, e: 1, el: "a process–quality correlation at one site", climb: "The plan is the climb: close the back door (lot, shift, conditions), then change the setting deliberately at the pilot." },
  "standardize-threshold": { c: 2, e: 1, el: "benchmarks and practitioner experience", climb: "Ask where on the curve the client sits; the sign of the effect depends on it." },
  "shadow-ai": { c: 3, e: 0, el: "a strong suspicion", climb: "State the do-nothing path explicitly — and say how well it's evidenced." },
  "own-yardstick": { c: 2, e: 1, el: "a self-scored maturity index", climb: "Tie the score to an outcome, against a baseline and comparison plants, on a ruler that doesn't move." },
  "bundled-change": { c: 2, e: 1, el: "a before/after impression", climb: "Stagger the changes, or compare plants that got only some of them." },
  "rubber-stamp": { c: 2, e: 0, el: "a practitioner's concern and an anecdote", climb: "Measure review quality as usage grows; design the decision point so a person has to engage." },
};

/* Where each idea lives on the ladder */
CT.CONCEPT_RUNG = {
  ladder: "frame", verbs: "frame", challenge: "frame",
  measurement: 1, variance: 1, collider: 1, juxtapose: 1,
  fork: "climb", direction: "climb", surface: "climb", symptoms: "climb", disconfirm: "climb",
  mechanism: 2, conditions: 2, systems: 2,
  counterfactual: 3,
};
CT.RUNG_BANDS = [
  { key: 3, title: "Rung 3 · Imagining", sub: "Counterfactuals: what would have happened" },
  { key: 2, title: "Rung 2 · Doing", sub: "Interventions: mechanisms, conditions, systems" },
  { key: "climb", title: "Climbing from 1 to 2", sub: "What it takes to get from seeing to doing" },
  { key: 1, title: "Rung 1 · Seeing", sub: "Associations: reading them honestly" },
  { key: "frame", title: "Across the ladder", sub: "The frame and the language" },
];

/* LNS lexicon terms for the new cases */
Object.assign(CT.CASE_LEX || (CT.CASE_LEX = {}), {
  "spc-vs-manual": ["Decision Latency", "Decision Intelligence"],
  "genai-trust": ["Industrial AI"],
  "stack-models": ["Industrial AI"],
  "messy-data": ["Industrial AI"],
  "agentic-email": ["Decision Intelligence", "Autonomous decision making"],
  "adaptive-24": ["Implicit and tacit knowledge"],
  "copy-exact": ["Implicit and tacit knowledge capture"],
  "superstition": ["Frontline Knowledge Management", "Implicit and tacit knowledge"],
  "variation-rule": ["Connected Frontline Worker"],
  "attrition-protocols": ["Frontline Knowledge Management"],
  "trust-3x": ["Build Radical Trust and Transparency"],
  "correlate-first": ["Embedded Quality"],
  "standardize-threshold": ["Operational agility", "Pathfinder"],
  "shadow-ai": ["Industrial AI"],
  "own-yardstick": ["Operational Excellence"],
  "bundled-change": ["Operational Excellence"],
  "rubber-stamp": ["Embedded Quality"],
});

/* Pearl's ladder, fuller version of the core idea */
CT.CONCEPTS.ladder.one = "Seeing, doing, imagining: three kinds of causal question, each needing more than the one below. Every case in this tool is a claim on one of them.";
CT.CONCEPTS.ladder.body = `
  <p>In <i>The Book of Why</i>, Judea Pearl and Dana Mackenzie sort causal questions into three rungs. Each rung asks something the rung below cannot answer, no matter how much data you collect at the lower level.</p>
  <div class="ladder">
    ${[3, 2, 1].map((n) => { const r = CT.RUNG_INFO[n]; return `<div class="rung l${n}"><div class="label"><span class="n">Rung ${n} · ${r.name}</span><span class="t">${r.kind}</span><code class="pmath">${r.math}</code></div>
      <div><div class="q">“${r.q}” ${r.asks}</div><div class="atlns"><b>What earns it:</b> ${r.earns}<br><b>Honest verbs:</b> ${r.verbs}</div></div></div>`; }).join("")}
  </div>
  <h4 class="mt">The ideas that do the work</h4>
  <ul>
    <li><b>The do-operator.</b> P(y | do(x)) — what happens when we <i>set</i> X — differs from P(y | x) — what we see when X happens to be high. Most of our statistics are the second; clients act on the first.</li>
    <li><b>Data alone can't climb.</b> The same correlation fits many causal stories. Getting from seeing to doing takes an experiment or a causal model: assumptions written down so the data can test them.</li>
    <li><b>Causal diagrams</b> are built from three junctions — chains (mechanisms), forks (confounders) and colliders (selection traps). Each behaves differently when you “control for” the middle.</li>
    <li><b>The back door.</b> A fork leaves a non-causal path from X to Y through a common cause. Adjusting for that cause closes the back door and moves an association toward a Rung 2 estimate.</li>
    <li><b>Counterfactuals</b> answer questions about one case — this deal, this plant — and need both a model and the facts of the case.</li>
  </ul>
  <p class="source">Framework: Judea Pearl &amp; Dana Mackenzie, The Book of Why (2018). Paraphrased; notation simplified.</p>`;

(function () {
  "use strict";
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const evName = (e) => (e === 0 ? "Below Rung 1" : `Rung ${e} · ${CT.RUNG_INFO[e].name}`);

  /* Commit-panel step: place the claim on the ladder */
  function placeHtml(pick, locked) {
    return `<div class="place" role="radiogroup" aria-label="Which rung is the claim speaking from?">
      <span class="place-q">Place the claim on Pearl's Ladder: which rung is it speaking from?</span>
      <div class="place-opts">${[3, 2, 1].map((n) => `<button class="place-btn r${n}" data-rung="${n}" role="radio" aria-checked="${pick === n}" ${locked ? "disabled" : ""}><b>Rung ${n}</b> ${CT.RUNG_INFO[n].name}<small>${esc(CT.RUNG_INFO[n].q)}</small></button>`).join("")}</div></div>`;
  }

  /* Reveal block: where the claim and the evidence sit, and the climb */
  function revealHtml(id, pick) {
    const g = CT.RUNG[id]; if (!g) return "";
    const gap = g.c - g.e;
    const rows = [3, 2, 1, 0].map((n) => {
      const marks = [];
      if (n === g.c) marks.push(`<span class="mk claim">Claim</span>`);
      if (n === g.e) marks.push(`<span class="mk ev">Evidence</span>`);
      if (pick && n === pick) marks.push(`<span class="mk you ${pick === g.c ? "ok" : "off"}">You</span>`);
      const label = n === 0 ? "Below the ladder · anecdote, plan, or none yet" : `Rung ${n} · ${CT.RUNG_INFO[n].name}`;
      return `<div class="lr ${n === 0 ? "l0" : "l" + n} ${n <= g.c && n > g.e ? "gap" : ""}"><span class="ll">${label}</span><span class="lm">${marks.join("")}</span></div>`;
    }).join("");
    const verdict = pick == null ? "" : pick === g.c
      ? `<p class="place-fb ok">You placed it on Rung ${pick}. Right.</p>`
      : `<p class="place-fb off">You placed it on Rung ${pick}; the claim speaks from Rung ${g.c} (${CT.RUNG_INFO[g.c].name}: “${esc(CT.RUNG_INFO[g.c].q)}”).</p>`;
    return `<div class="rv-block on-ladder"><span class="rv-label">On Pearl's Ladder</span>
      <div class="mini-ladder">${rows}</div>
      ${verdict}
      <p class="rv-one"><b>Claim:</b> ${evName(g.c)} · <b>Evidence:</b> ${esc(g.el)} (${evName(g.e)})${gap > 0 ? ` · <b class="gapword">a ${gap}-rung gap</b>` : " · <b class=\"okword\">no gap</b>"}</p>
      <div class="climb"><b>The climb:</b> ${esc(g.climb)}</div></div>`;
  }

  /* Ladder page */
  function renderLadder(answers) {
    const root = document.getElementById("ladderBody"); if (!root) return;
    const ids = Object.keys(CT.CASES);
    const band = (n) => ids.filter((id) => CT.RUNG[id] && CT.RUNG[id].c === n);
    const conceptsAt = (k) => CT.CONCEPT_ORDER.filter((c) => CT.CONCEPT_RUNG[c] === k);
    const caseCard = (id) => { const g = CT.RUNG[id], gap = g.c - g.e, done = answers && answers[id];
      return `<a class="next-card ${done ? "done" : ""}" href="#/case/${id}"><span class="source">${done ? "✓ Explored · " : ""}Evidence: ${evName(g.e)}${gap > 0 ? ` · ${gap}-rung gap` : ""}</span><b>${esc(CT.CASES[id].title)}</b></a>`; };
    const chips = (k) => conceptsAt(k).map((c) => `<a class="idea-chip on" href="#/idea/${c}">${esc(CT.CONCEPTS[c].name)}</a>`).join("");
    root.innerHTML = `
      <span class="eyebrow">The spine of this program</span>
      <h2>Pearl's Ladder of Causation</h2>
      <p class="lede">Every case here is a claim someone made in the room, and every claim speaks from a rung. The skill is saying which rung, seeing which rung the evidence actually reaches, and knowing what it would take to climb the gap.</p>
      <div class="ladder-page mt">
        ${[3, 2].map((n) => rungPanel(n, band(n), chips(n), caseCard)).join("")}
        <section class="lp-climb"><h3>Climbing from Rung 1 to Rung 2</h3><p>Data alone can't make this climb. It takes an experiment, or a causal model whose assumptions you write down and test: confounders adjusted for, the arrow's direction checked, the surface separated from the cause, and a willingness to be proved wrong.</p><div class="chips-row">${chips("climb")}</div></section>
        ${rungPanel(1, band(1), chips(1), caseCard)}
        <section class="lp-frame"><h3>Across the ladder</h3><div class="chips-row">${chips("frame")}</div></section>
      </div>
      <p class="source mt">Framework: Judea Pearl &amp; Dana Mackenzie, The Book of Why (2018). Paraphrased.</p>`;
  }
  function rungPanel(n, cases, chipsHtml, caseCard) {
    const r = CT.RUNG_INFO[n];
    return `<section class="lp-rung l${n}" id="rung-${n}">
      <div class="lp-head"><div><span class="n">Rung ${n} · ${r.name}</span><h3>${r.kind}</h3></div><code class="pmath">${r.math}</code></div>
      <p class="lp-q">“${esc(r.q)}” ${esc(r.asks)}</p>
      <div class="lp-meta"><div><b>What earns it</b><span>${esc(r.earns)}</span></div><div><b>Honest verbs</b><span>${esc(r.verbs)}</span></div></div>
      ${chipsHtml ? `<div class="chips-row">${chipsHtml}</div>` : ""}
      <h4>Claims in the room that spoke from Rung ${n} (${cases.length})</h4>
      <div class="next-grid">${cases.map(caseCard).join("")}</div></section>`;
  }

  /* Small ladder band for the home page */
  function homeBand() {
    const ids = Object.keys(CT.CASES);
    return `<a class="home-ladder" href="#/ladder">
      <span class="hl-title">Grounded in Pearl's Ladder of Causation</span>
      ${[3, 2, 1].map((n) => `<span class="hl-rung l${n}"><b>Rung ${n} · ${CT.RUNG_INFO[n].name}</b><i>“${esc(CT.RUNG_INFO[n].q)}”</i><em>${ids.filter((id) => CT.RUNG[id] && CT.RUNG[id].c === n).length} claims</em></span>`).join("")}
      <span class="hl-go">Explore the ladder →</span></a>`;
  }

  CT.ladder = { placeHtml, revealHtml, renderLadder, homeBand, evName };
})();
