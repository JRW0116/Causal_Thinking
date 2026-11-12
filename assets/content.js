/* Content for the inquiry-led program.
   QUESTIONS: the learner's entry points (what they're trying to figure out).
   CASES: real moments from the fall 2026 sessions. Each asks the learner to commit before it reveals.
   CONCEPTS: ideas the learner uncovers through cases, not read up front. */
window.CT = window.CT || {};

CT.QUESTIONS = [
  { id: "lever", q: "Our data shows a big multiplier. Can I call it “the lever”?", hint: "Multipliers, verbs, and the drift from “more likely” to “drives”", cases: ["opex-88", "data-platform", "ai-adoption"] },
  { id: "didnt-land", q: "Why did a client take the wrong lesson from our finding?", hint: "Surface effects, symptoms, and advice that backfires", cases: ["swim-lanes", "collaboration", "attrition"] },
  { id: "pushback", q: "Someone in the room pushed back on my number. Now what?", hint: "Confounders, measurement, the direction of the arrow", cases: ["recalls", "high-tech", "regulated", "knowledge-loss"] },
  { id: "everywhere", q: "Is this best practice true everywhere?", hint: "Conditions, variance, and what actually differentiates", cases: ["collaboration", "customer-language", "mna-execution"] },
  { id: "value", q: "How do I show what an investment is really worth?", hint: "Baselines, the do-nothing path, decomposing failure", cases: ["amgen", "deal-failure", "bottles"] },
  { id: "too-good", q: "Something looks too good. What am I missing?", hint: "Selection, timing, systems that push back", cases: ["oldest-plant", "curve-2015", "utilization", "bottles"] },
  { id: "explain", q: "How do I explain causal thinking to a client in 30 seconds?", hint: "Plain language, and taking a challenge well", cases: ["explain", "recalls"] },
];

CT.CASES = {
  "ai-adoption": {
    title: "91% adopted AI. 85% are less productive. What did the room hear?",
    source: "Matt's COO session",
    scene: `<p>Presenting the Industrial Productivity Index, the speaker put two numbers next to each other:</p>
      <blockquote>“91% of companies… say they're either adopted or going to adopt this… So everybody's doing it, but 85% of companies are less productive.”</blockquote>`,
    ask: "A few minutes later, a participant restates this to the group. What do they say?",
    options: [
      { t: "“AI adoption is nearly universal, so it can't explain who's winning.”", fb: "That's the careful read — but it's not what the room heard." },
      { t: "“Most of us adopted AI and became less efficient because of it.”", fb: "Yes. Two numbers side by side became a cause-and-effect story.", best: true },
      { t: "“The top 15% must be doing something different with AI.”", fb: "That's the question we wanted them to ask. They didn't — the juxtaposition got there first." },
    ],
    free: "If you'd been presenting, what would you have said instead?",
    reveal: {
      happened: `<p>The participant said: <i>“90-something percent of us have adopted AI, and 85% of us are less efficient than we were before we started”</i> — and built an argument on it.</p>`,
      why: `<p>The 85% is a cohort: competitive operators outside the top ~15%, who averaged about −2% productivity. Nothing in the data says AI made anyone less productive. Both numbers are Rung 1 descriptions. Placed side by side, they were heard as a Rung 2 claim.</p>`,
      better: "Adoption is nearly universal, so adoption alone can't explain who's winning. The question is what the top 15% do differently with it.",
    },
    concepts: ["juxtapose", "ladder", "variance"],
    next: ["mna-execution", "opex-88"],
  },

  "opex-88": {
    title: "Market shapers are 8.8× more likely to run OpEx enterprise-wide. Finish the sentence.",
    source: "OpEx roundtable",
    scene: `<p>The finding, as presented:</p>
      <blockquote>“Organizations that… [have] deployed across the enterprise are 8.8 times more likely to be a market shaping company… so this is the big lever.”</blockquote>`,
    ask: "What's the strongest thing you can honestly say next?",
    options: [
      { t: "“So enterprise-wide OpEx is the big lever.”", fb: "That's how it was said. “The lever” is a Rung 2 claim; an 8.8× cross-tab is Rung 1." },
      { t: "“…because a program in a few experts' heads resets when they leave; one built into the work keeps compounding.”", fb: "Yes — a mechanism. It tells the client why, and what to check.", best: true },
      { t: "“So shapers should be benchmarked on OpEx coverage.”", fb: "A benchmark tells them where they stand, not what to change." },
    ],
    free: "Write your own “because…” for the 8.8×.",
    reveal: {
      happened: `<p>In the room it landed as “this is the big lever.” Elsewhere in the same session, Jim gave the mechanism: expert-dependent programs fall apart when the experts move on; systematized ones carry the gains forward. And a second one: <i>“If I can make the right decision faster than my competition… it's compounding over time.”</i></p>`,
      why: `<p>A multiplier says two things travel together. A mechanism says <b>why</b> — the middle link in a chain — and gives the client something to act on and test.</p>`,
      better: "Market shapers are 8.8× more likely to run OpEx enterprise-wide. Our read on why: a program that lives in a few experts' heads resets when they leave; one built into the way work is done keeps compounding. Test: would your program survive its champion leaving?",
    },
    concepts: ["mechanism", "verbs"],
    next: ["data-platform", "swim-lanes"],
  },

  "data-platform": {
    title: "Leaders are 2.5× more likely to run a single data platform. What should a CQO hear?",
    source: "CQO roundtable",
    scene: `<blockquote>“Leaders are two and a half times more likely to run a single consolidated enterprise data platform.”</blockquote>
      <p>The CQO in front of you runs 18 plants on 18 systems and is about to fund an AI program.</p>`,
    ask: "What do you want them to take away?",
    options: [
      { t: "“Consolidate your data platform first.”", fb: "That's the lever reading. Consolidation alone may not move anything." },
      { t: "“Trust is the gate between insight and action — one source of truth is what earns it.”", fb: "Yes. That names the mechanism and why the platform matters.", best: true },
      { t: "“2.5× is a strong signal; it's worth benchmarking.”", fb: "True, but it leaves the CQO with nothing to decide." },
    ],
    free: "What would make the consolidation fail to pay off?",
    reveal: {
      happened: `<p>The stronger version we built from the same session's numbers: trust is the gate between insight and action. Leaders are 1.8× more likely to trust and act on their analytics. Layer AI over 18 sources of truth and it tells one plant's truth to another.</p>`,
      why: `<p>The pattern behind every strong rewrite: <b>association → the mechanism we believe → a test the client can run in their own organization.</b></p>`,
      better: "Trust is the gate between insight and action, and one source of truth is what earns it. Leaders are 1.8× more likely to trust and act on their analytics. Layer AI over 18 sources of truth and it tells one plant's truth to another.",
    },
    concepts: ["verbs", "mechanism"],
    next: ["swim-lanes", "collaboration"],
  },

  "swim-lanes": {
    title: "Leaders do more across more swim lanes. What should a follower do?",
    source: "Leader–follower research, used with clients",
    scene: `<p>Our data, consistently: leaders are active across more swim lanes of transformation — quality, OpEx, EHS, workforce, supply network, AI — than followers.</p>`,
    ask: "A follower asks you what to do with this. Your advice?",
    options: [
      { t: "Launch initiatives in more swim lanes to close the gap.", fb: "That's how clients heard it: “do more to succeed.” Watch what happens next." },
      { t: "Build the operational discipline that lets each deployment scale.", fb: "Yes — breadth is the evidence discipline leaves, not the lever.", best: true },
      { t: "Benchmark swim-lane coverage against leaders.", fb: "Measures the surface, not what produces it." },
    ],
    free: "Apply the test: if the client forced swim-lane count up tomorrow and changed nothing else, would performance move? Why?",
    reveal: {
      happened: `<p>Clients heard “do more to succeed” and launched more at once. From the OpEx roundtable, what that produces: <i>“let's have this pilot, try this thing… no real line organizing it.”</i> Another participant approved a “band-aid AI” fix he knew wouldn't last.</p>`,
      why: `<p>Operational discipline — stabilize, standardize, systematize, sustain — is a hidden common cause. It produces both the visible breadth and leader-level performance, so the two move together in the data. Push on breadth without the discipline and little moves.</p>`,
      better: "Leaders don't win because they do more. They do more because their operational discipline lets each deployment scale. Build the discipline; breadth follows.",
    },
    concepts: ["surface", "fork"],
    next: ["collaboration", "attrition"],
  },

  "collaboration": {
    title: "More collaboration, and pushing decisions to the front line: best practice?",
    source: "Culture research · COO Council",
    scene: `<p>Going into the culture research, we hypothesized that more collaboration and pushing decisions down to the lowest level lead to better problem solving and faster decisions. Conventional wisdom agrees.</p>`,
    ask: "What do you think the data said?",
    options: [
      { t: "Confirmed: more collaboration, better outcomes.", fb: "That's what we expected too." },
      { t: "It depends — on something.", fb: "Right. The interesting part is what it depends on.", best: true },
      { t: "No relationship at all.", fb: "Close, on its own — but there's a condition under which it matters a lot." },
    ],
    free: "If it depends, what do you think it depends on?",
    reveal: {
      happened: `<p>On their own, those best practices were, in Jim's words, <b>“dead wrong.”</b> They held only when collaboration was engineered: identified expertise, defined decision rights, and guardrails. With that structure, mature decision intelligence architecture went with <b>3× the odds</b> of being a World's Most Productive company.</p>`,
      why: `<p>More collaboration was the surface; engineered collaboration was the lever. And saying “we were wrong” in front of COOs made every other finding more credible.</p>`,
      better: "Collaboration isn't the lever; designed collaboration is. Define who holds the expertise, who holds the decision, and the guardrails — then decisions at the edge add up to advantage.",
    },
    concepts: ["conditions", "disconfirm", "surface"],
    next: ["mna-execution", "customer-language"],
  },

  "attrition": {
    title: "Attrition is low. Is the culture healthy?",
    source: "COO Council (participant)",
    scene: `<p>A council member's company tracked attrition as its culture health metric. Attrition was low.</p>`,
    ask: "What's the risk in reading low attrition as a healthy culture?",
    options: [
      { t: "None — people who stay are engaged.", fb: "That's the reading they started with." },
      { t: "Something other than culture could be keeping people.", fb: "Yes. The metric may be the symptom of a different cause.", best: true },
      { t: "Attrition is too noisy to mean anything.", fb: "It meant something — just not what they thought." },
    ],
    free: "What else might keep people from leaving?",
    reveal: {
      happened: `<blockquote>“We were looking at attrition… in reality, it was the mission that was linked to the attrition, and the culture was actually linked to their job satisfaction.”</blockquote><p>Low attrition was hiding a disengagement problem.</p>`,
      why: `<p>Measuring the symptom of one cause and attributing it to another is the most common causal error in client conversations. Ask of every metric: <b>is this the thing, or the smoke from the thing?</b></p>`,
    },
    concepts: ["symptoms"],
    next: ["knowledge-loss", "swim-lanes"],
  },

  "mna-execution": {
    title: "Does disciplined integration execution separate M&A leaders from followers?",
    source: "COO Council · M&A research",
    scene: `<p>Across our other research, converting intent into execution separates leaders from followers. We expected the same in M&amp;A.</p>`,
    ask: "How big was the leader–follower gap on integration execution?",
    options: [
      { t: "Large — 20+ points.", fb: "That's what the intent-to-execution thesis predicted." },
      { t: "Moderate — 8–12 points.", fb: "Smaller than that." },
      { t: "Tiny — 1 to 3 points.", fb: "Yes. Everyone runs a disciplined playbook.", best: true },
    ],
    free: "So does execution discipline not matter in M&A?",
    reveal: {
      happened: `<p>Gaps were 1–3 points. The differentiator sat upstream, in diligence: a value thesis tested before close. Jim, at the council: <i>“What I don't want you to take from this is that disciplined execution doesn't matter, because it does matter. It's just not differentiating.”</i></p>`,
      why: `<p>If nearly everyone does it, it can't explain who wins. Low variance means low explanatory power — not zero importance. Say both halves.</p>`,
    },
    concepts: ["variance", "disconfirm"],
    next: ["deal-failure", "ai-adoption"],
  },

  "recalls": {
    title: "Units on recall nearly tripled since 2019. What's the first thing a CQO asks?",
    source: "CQO roundtable",
    scene: `<p>The finding on the slide: units on recall have nearly tripled since 2019.</p>`,
    ask: "What challenge do you expect from the room?",
    options: [
      { t: "“Which industries drove it?”", fb: "Reasonable, but not what came first." },
      { t: "“Are we finding more, or did the definition change?”", fb: "Yes — a measurement question.", best: true },
      { t: "“What's the cost per recall?”", fb: "A good follow-up, but not a challenge to the claim." },
    ],
    free: "How would you answer that challenge?",
    reveal: {
      happened: `<blockquote>“Is that also because we're getting better at finding these, or changing the definition?”</blockquote><p>Jim acknowledged it, said the <b>count</b> of recalls (not just units) still rises, more slowly, and offered a mechanism: digital practices accelerated production while compliance processes didn't keep pace.</p>`,
      why: `<p>Good handling: acknowledge, show the check, restate the mechanism, say what would change your mind. Better still — say it up front, before someone asks.</p>`,
    },
    concepts: ["challenge", "fork"],
    next: ["high-tech", "explain"],
  },

  "high-tech": {
    title: "High tech and automotive lead productivity growth. What would a skeptic say?",
    source: "Matt's COO session",
    scene: `<p>The productivity research showed high tech and automotive leading productivity growth.</p>`,
    ask: "What alternative explanation would you expect from the room?",
    options: [
      { t: "Faster growth itself creates leverage.", fb: "Yes — and that's what a council member raised.", best: true },
      { t: "Those industries just report better data.", fb: "Plausible, but not what came up." },
      { t: "Automation alone explains it.", fb: "That's closer to our claim than an alternative to it." },
    ],
    free: "Name another variable that could move both “being in high tech” and “productivity growth.”",
    reveal: {
      happened: `<p>A council member: <i>“If you're growing like a Foxconn, 50–60% a year,”</i> you get leverage. And automotive utilization is “less than 50%” — so is it just relative numbers from a low base?</p>`,
      why: `<p>Growth is a common cause (a confounder) that can lift both investment and measured productivity, with no arrow between them. Account for it to close the “back door.”</p>`,
    },
    concepts: ["fork"],
    next: ["regulated", "recalls"],
  },

  "regulated": {
    title: "Do heavily regulated industries lag on productivity?",
    source: "Matt's COO session",
    scene: `<p>A participant asked whether regulation slows change. The intuition is common.</p>`,
    ask: "What did the data show for life sciences and A&D?",
    options: [
      { t: "They lag, as expected.", fb: "Not in this data." },
      { t: "They outperform.", fb: "Yes — but there's a catch.", best: true },
      { t: "No difference.", fb: "There was one." },
    ],
    free: "If they outperform, what else might be going on?",
    reveal: {
      happened: `<p>Matt: life sciences and A&amp;D outperform — but they also had the most new capacity investment.</p>`,
      why: `<p>Capital investment is a candidate confounder. Before crediting (or blaming) regulation, ask what else differs between the groups.</p>`,
    },
    concepts: ["fork"],
    next: ["knowledge-loss", "high-tech"],
  },

  "knowledge-loss": {
    title: "Does losing industrial knowledge force companies to adapt?",
    source: "KM roundtable",
    scene: `<p>Our hypothesis going in: when experienced workers retire, companies are forced to redesign work and adapt.</p>`,
    ask: "What did the data show?",
    options: [
      { t: "Confirmed — knowledge loss drives adaptation.", fb: "That was the hypothesis." },
      { t: "The reverse — trapped companies adapt less.", fb: "Yes. The arrow ran the other way.", best: true },
      { t: "No relationship.", fb: "There was one — just not in the direction we expected." },
    ],
    free: "Why might losing knowledge make a company less able to adapt?",
    reveal: {
      happened: `<blockquote>“Adaptability is a function of optionality… redesign is a feature of capable organizations, not a reflex of stress.”</blockquote><p>Companies trapped by knowledge loss lose the option to adapt.</p>`,
      why: `<p>A reversed arrow. Before claiming X causes Y, ask whether Y — or the capacity behind it — causes X.</p>`,
    },
    concepts: ["direction", "conditions"],
    next: ["attrition", "oldest-plant"],
  },

  "oldest-plant": {
    title: "The oldest plant had the best results after the rollout. Why?",
    source: "KM roundtable speaker",
    scene: `<blockquote>The oldest plant, with the oldest equipment, “sustained the highest yields and lowest water usage” after the rollout.</blockquote>`,
    ask: "What's your first question?",
    options: [
      { t: "Which features of the rollout did they use most?", fb: "Assumes the rollout did it." },
      { t: "Why is that plant still running at all?", fb: "Yes — selection. It's in the story because it survived.", best: true },
      { t: "Can we replicate it at the newest plant?", fb: "Only once you know what produced it." },
    ],
    free: "List two other things that could explain the oldest plant's performance.",
    reveal: {
      happened: `<p>The questions that make it defensible: why is that plant still running? Product mix and workforce tenure? Did it lead <b>before</b> the rollout?</p>`,
      why: `<p>When cases enter your sample because of the outcome — survival, success, still operating — you manufacture a link. That's a collider. Ask what got a case into the story.</p>`,
    },
    concepts: ["collider"],
    next: ["bottles", "curve-2015"],
  },

  "bottles": {
    title: "+14% bottles per day since launching a connected-worker platform. Proof?",
    source: "KM roundtable speaker",
    scene: `<blockquote>“A 14% increase in the average number of bottles produced per day” since launching a connected-worker platform.</blockquote><p>The company grows about 10% a year.</p>`,
    ask: "What do you need before crediting the platform?",
    options: [
      { t: "Nothing — 14% is a big jump.", fb: "Big compared to what?" },
      { t: "The trend before launch, and a plant without the platform.", fb: "Yes — a baseline and a comparison.", best: true },
      { t: "A larger sample of plants.", fb: "Helps, but doesn't answer “compared to what.”" },
    ],
    free: "Is +14% output the same as +14% productivity? Why or why not?",
    reveal: {
      happened: `<p>The questions that make it defensible: what was the trend before launch? With ~10% annual growth, is this output or productivity? What else changed (changeover work)? Is there a comparison plant without the platform?</p><p>Good model from the session: Jim asked, <i>“What about business results?”</i> and whether the lessons were translatable to other plants.</p>`,
      why: `<p>Every finding and every ROI needs the do-nothing path.</p>`,
    },
    concepts: ["counterfactual", "fork"],
    next: ["amgen", "curve-2015"],
  },

  "curve-2015": {
    title: "Productivity started bending up after 2015, when Industry 4.0 and AI arrived. Cause?",
    source: "CEO Council preview",
    scene: `<blockquote>Since 2015, when Industry 4.0 and first-gen AI products came to market, “we're starting to see evidence of a bending of that curve.”</blockquote>`,
    ask: "What would make this claim defensible?",
    options: [
      { t: "A longer time series.", fb: "More time doesn't separate timing from cause." },
      { t: "Heavier adopters showing bigger gains — same companies over time.", fb: "Yes — a dose-response check on a stable panel.", best: true },
      { t: "More AI vendors in the market.", fb: "That's more timing, not more evidence." },
    ],
    free: "What else changed between 2015 and 2019?",
    reveal: {
      happened: `<p>The questions: timing isn't cause — what else changed 2015–2019? Same companies over time, or survivors? If AI drove it, do heavier adopters show bigger gains?</p>`,
      why: `<p>Before/after is not compared-to-what. And a sample of survivors can bend any curve.</p>`,
    },
    concepts: ["counterfactual", "collider"],
    next: ["utilization", "bottles"],
  },

  "amgen": {
    title: "How do you show the value of a digital quality investment?",
    source: "CQO roundtable",
    scene: `<p>Batch volume is set to grow two to three times. A quality leader needs to justify digital and AI investment to finance.</p>`,
    ask: "What should the cost of quality be compared against?",
    options: [
      { t: "Last year's quality spend.", fb: "Spend will rise with volume regardless — this makes a good investment look bad." },
      { t: "A “do nothing” cost curve as volume scales.", fb: "Yes. That's how Amgen does it.", best: true },
      { t: "Industry benchmark cost of quality.", fb: "Tells you where you stand, not what the investment changed." },
    ],
    free: "How would you frame the headcount story?",
    reveal: {
      happened: `<p>Amgen compares a “do nothing” cost-of-quality curve with the curve its digital and AI investments produce. A contract manufacturer framed his QMS case as <i>“I may not have to put in as many future requisitions”</i> — avoided growth, not cuts. Elsewhere, inspection findings added ~150 FTE of deviation work; the AI case targets that increment.</p>`,
      why: `<p>The counterfactual is the denominator of every ROI. Name it explicitly.</p>`,
    },
    concepts: ["counterfactual"],
    next: ["deal-failure", "utilization"],
  },

  "deal-failure": {
    title: "Why do acquisitions fail?",
    source: "COO Council (retired council member)",
    scene: `<p>Everyone has read that ~70% of deals fail. A client asks how to avoid being one of them.</p>`,
    ask: "What's the most useful first move?",
    options: [
      { t: "Improve integration execution.", fb: "Execution is table stakes — and only one kind of failure." },
      { t: "Split failure into its different causes.", fb: "Yes. Different causes need different fixes.", best: true },
      { t: "Benchmark against the 70%.", fb: "The aggregate hides the spread by archetype." },
    ],
    free: "Name the different ways a deal can fail.",
    reveal: {
      happened: `<p>A council member split it in one sentence: deals fail because <i>“you should never have done it,”</i> because they were executed badly, or <i>“because it's actually just hard.”</i> Three causes, three fixes — and only the first is addressed by better diligence. Veena pushed us to show the spread by archetype; opportunistic carve-outs performed worst.</p>`,
      why: `<p>“Was it bad judgment that caused this deal to fail?” is a Rung 3 question about a specific case. It needs a model and a baseline.</p>`,
    },
    concepts: ["counterfactual", "conditions", "ladder"],
    next: ["mna-execution", "amgen"],
  },

  "utilization": {
    title: "Should a plant push utilization as high as it can?",
    source: "Matt's COO session · COO Council",
    scene: `<p>Efficiency programs aim to maximize asset utilization. More utilization, more output, lower unit cost.</p>`,
    ask: "What happens if you keep pushing?",
    options: [
      { t: "Costs keep falling.", fb: "Up to a point." },
      { t: "You lose the buffer that lets you absorb shocks.", fb: "Yes — and you lose agility with it.", best: true },
      { t: "Nothing changes past 85%.", fb: "Something changes — just not on the efficiency dashboard." },
    ],
    free: "Where would you tell a client to stop?",
    reveal: {
      happened: `<blockquote>“If you have uncertainty, you need to have a buffer… if you use it up managerially, you lock yourself in and you lose agility.”</blockquote><p>— an operations academic on the council. Mike: “ultra efficiency makes you so brittle you cannot become a market shaper.” Past parity, the plant-efficiency mindset stops paying; agility is where margin moves.</p>`,
      why: `<p>Linear “more X, more Y” misses trade-offs, buffers and thresholds. The causal answer often includes “until here, then stop.”</p>`,
    },
    concepts: ["systems", "variance"],
    next: ["amgen", "ai-adoption"],
  },

  "customer-language": {
    title: "Customer-focused language goes with ~3.4× equity performance. Everywhere?",
    source: "COO Council (ratings-agency innovation lead)",
    scene: `<p>A council member machine-read ~25 years of earnings transcripts for ~14,000 companies. Customer-focused language went with ~3.4× equity performance.</p>`,
    ask: "Where would you expect it not to hold?",
    options: [
      { t: "In B2B companies.", fb: "Not what he found." },
      { t: "Where customers have no choice.", fb: "Yes — utilities.", best: true },
      { t: "Nowhere; it's universal.", fb: "A finding with no exceptions is usually a platitude." },
    ],
    free: "Could the arrow run backward here?",
    reveal: {
      happened: `<p>It held — except for utilities, where customers can't choose. He also flagged himself that he hadn't yet established <b>why</b>. A model of self-caveating.</p>`,
      why: `<p>Conditions are what let an insight travel into one client's context — Matt's “adjacency problem.” And: do winning companies simply talk more about customers?</p>`,
    },
    concepts: ["conditions", "direction"],
    next: ["collaboration", "knowledge-loss"],
  },

  "explain": {
    title: "“How would you describe this in layman's terms?”",
    source: "M&A prep call · COO Council",
    scene: `<p>Preparing for the council, Veena asked:</p><blockquote>“If you were to describe in layman's terms… how would you describe that so that people understand how you're getting to where you're getting?”</blockquote>`,
    ask: "Try it first. Then see how Mike answered at the council.",
    free: "Your 30-second explanation of a causal model:",
    reveal: {
      happened: `<blockquote>“The first thing you do as a human is you understand what makes things true. The second thing you do is you say, all right, what breaks them? That's what this is.”</blockquote><p>— Mike Carroll. Then the structure: the outcome in the middle; causes and preventive actions above; the symptoms you'd observe below; a mirror-image model for success.</p>`,
      why: `<p>And when the room challenges a finding: acknowledge it, show the check, restate the mechanism, and say what would change your mind.</p>`,
    },
    concepts: ["challenge", "symptoms"],
    next: ["recalls", "opex-88"],
  },
};

CT.CONCEPTS = {
  ladder: { name: "Pearl's Ladder", tag: "Framework", one: "Seeing, doing, imagining — three kinds of question, each needing more than the one below.",
    body: `<div class="ladder">
      <div class="rung l3"><div class="label"><span class="n">Rung 3 · Imagining</span><span class="t">Counterfactuals</span></div><div><div class="q">“What if I had done X?” Was it X that caused Y?</div><div class="atlns"><b>At LNS:</b> “Would this deal have hit its targets if the thesis had been tested in diligence?”</div></div></div>
      <div class="rung l2"><div class="label"><span class="n">Rung 2 · Doing</span><span class="t">Intervention</span></div><div><div class="q">“What if I do X?” What happens to Y if we change X?</div><div class="atlns"><b>At LNS:</b> “If a client deploys OpEx enterprise-wide, will productivity compound?”</div></div></div>
      <div class="rung l1"><div class="label"><span class="n">Rung 1 · Seeing</span><span class="t">Association</span></div><div><div class="q">“What if I see X?” How are X and Y related?</div><div class="atlns"><b>At LNS:</b> “Market shapers are 8.8× more likely to run OpEx enterprise-wide.” Cross-tabs and benchmarks live here.</div></div></div>
    </div>
    <p class="mt">Pearl's central point: without an experiment, no amount of observational data answers a Rung 2 question on its own. Getting from seeing to doing takes a causal model — what causes what — written down so data can test it. Most of our survey statistics are Rung 1. Our clients decide on Rungs 2 and 3. The gap is where messaging goes wrong, or where it differentiates.</p>
    <p class="source">Adapted from Judea Pearl &amp; Dana Mackenzie, The Book of Why (2018)</p>` },
  verbs: { name: "Keep the verb honest", tag: "Language", one: "Match the verb to the rung your evidence actually reaches.",
    body: `<div class="verbs">
      <div class="verb v1"><span class="v">“co-occurs with,” “is more common among”</span><span class="e"><b>Rung 1</b> · any survey cross-tab</span></div>
      <div class="verb v2"><span class="v">“predicts”</span><span class="e"><b>Rung 1</b> · holds after accounting for obvious confounders</span></div>
      <div class="verb v3"><span class="v">“drives,” “if you do X, expect Y”</span><span class="e"><b>Rung 2</b> · tested causal model, mechanism, survived disconfirmation</span></div>
      <div class="verb v4"><span class="v">“would have,” “was responsible for”</span><span class="e"><b>Rung 3</b> · counterfactual reasoning about a specific case</span></div>
    </div><p class="mt">When in doubt, use the weaker verb and add the “because.” The pattern for a strong rewrite: association → the mechanism we believe → a test the client can run.</p>` },
  mechanism: { name: "Name the mechanism", tag: "Move 1 · Chain", one: "After every “X× more likely,” finish the sentence with “because…”",
    body: `<div class="junction"><svg viewBox="0 0 260 90" role="img" aria-label="X to M to Y"><circle class="node" cx="35" cy="45" r="24"/><text x="35" y="45">X</text><circle class="node hl" cx="130" cy="45" r="24"/><text x="130" y="45">M</text><circle class="node" cx="225" cy="45" r="24"/><text x="225" y="45">Y</text><path class="edge" d="M61 45 H102"/><path class="edge" d="M156 45 H197"/></svg></div>
    <p>M carries X's effect to Y — it's the “because.” Decision speed → compounding advantage → productivity. Don't control away the mechanism and then conclude X does nothing.</p>
    <div class="cycle"><span>Data</span><i>→</i><span>Information</span><i>→</i><span class="lost">Insight</span><i>→</i><span class="lost">Trust</span><i>→</i><span class="lost">Action</span></div>
    <p>The data-to-action cycle from the KM roundtable: data and information are largely solved (“dashboard fatigue”). Insight → trust → action is the inference experienced workers carried invisibly — the part that retires with them.</p>` },
  fork: { name: "Confounders (forks)", tag: "Move 6 · Fork", one: "A hidden common cause moves X and Y together with no arrow between them.",
    body: `<div class="junction"><svg viewBox="0 0 260 120" role="img" aria-label="Z causes X and Y"><circle class="node hl" cx="130" cy="30" r="24"/><text x="130" y="30">Z</text><circle class="node" cx="45" cy="92" r="24"/><text x="45" y="92">X</text><circle class="node" cx="215" cy="92" r="24"/><text x="215" y="92">Y</text><path class="edge" d="M110 45 L68 76"/><path class="edge" d="M150 45 L192 76"/><path class="dash" d="M72 96 H188"/></svg></div>
    <p>Growth, size, industry mix, regulation, capital investment, measurement changes — the room will supply these. <b>Get there first:</b> name the alternative, say what you checked, then state the mechanism you believe. Accounting for Z is Pearl's “back-door” adjustment.</p>` },
  collider: { name: "Selection traps (colliders)", tag: "Junction", one: "Filter on an outcome and you manufacture a link.",
    body: `<div class="junction"><svg viewBox="0 0 260 120" role="img" aria-label="X and Y cause Z"><circle class="node" cx="45" cy="30" r="24"/><text x="45" y="30">X</text><circle class="node" cx="215" cy="30" r="24"/><text x="215" y="30">Y</text><circle class="node hl" cx="130" cy="92" r="24"/><text x="130" y="92">Z</text><path class="edge" d="M66 44 L106 76"/><path class="edge" d="M194 44 L154 76"/></svg></div>
    <p>X and Y both cause Z. Select on Z — survivors, successes, deals that closed — and X and Y look related. Ask what got a case into the sample. Did our M&amp;A sample include abandoned deals? The oldest plant is in the story because it survived.</p>` },
  surface: { name: "Surface effects", tag: "Move 2", one: "Real evidence, wrong lever: the visible trace of a deeper cause.",
    body: `<div class="card surface-diagram"><svg viewBox="0 0 720 230" role="img" aria-label="Operational discipline causes breadth and performance">
      <rect class="hid" x="250" y="15" width="220" height="62"/><text class="sub" x="360" y="38">Hidden — the true cause</text><text x="360" y="60">Excellent operational discipline</text>
      <rect class="vis" x="20" y="150" width="240" height="62"/><text class="sub" x="140" y="173">Visible — the surface effect</text><text x="140" y="195">More swim lanes, at scale</text>
      <rect class="out" x="460" y="150" width="240" height="62"/><text class="sub" x="580" y="173">The outcome clients want</text><text x="580" y="195">Leader-level performance</text>
      <path class="edge" d="M300 78 L175 146"/><path class="edge" d="M420 78 L545 146"/><path class="dash" d="M262 181 H456"/><text class="dlabel" x="360" y="172">what a cross-tab shows</text></svg></div>
    <div class="habit"><b>Surface-effect test:</b> if the client forced X up tomorrow and changed nothing else, would Y move? If it depends on something else being in place, X is the evidence — and that something is the cause.</div>` },
  symptoms: { name: "Symptoms vs. causes", tag: "Move 2 · RCCN", one: "Is this the thing, or the smoke from the thing?",
    body: `<div class="rccn"><div class="top"><b>Root causes &amp; preventive actions</b><span>What our knowledge document says produces the outcome</span></div><div class="arrow">↓</div><div class="mid">Target condition<br><span>e.g., the acquisition fails to deliver its value</span></div><div class="arrow">↓</div><div class="bot"><b>Visible symptoms</b><span>What you'd observe when diagnosing an organization</span></div></div>
    <p class="mt">The RCCN structure is a discipline for separating the two; a success-side network mirrors it. Jim, COO Council: <i>“What we thought was causal turned out to be just the visible symptoms.”</i></p>` },
  disconfirm: { name: "Try to prove yourself wrong", tag: "Move 3", one: "A model the data can't contradict isn't doing any work.",
    body: `<blockquote>“Any good causal scientist can prove something right. It's when you disprove something that you know you're really doing it right.”<span class="cite">— Mike Carroll</span></blockquote>
    <p class="mt">Both of this fall's disconfirmations — collaboration “dead wrong” on its own, and intent-to-execution failing in M&amp;A — landed well with COOs, and made the rest of the findings more credible. Team commitment: every study reports one thing we were wrong about.</p>` },
  variance: { name: "Matters ≠ differentiates", tag: "Move 4", one: "If nearly everyone does it, it can't explain who wins.",
    body: `<div class="table-wrap"><table><thead><tr><th>Domain</th><th>Table stakes</th><th>What separates</th></tr></thead><tbody>
      <tr><td>M&amp;A</td><td>Disciplined integration execution (gaps of 1–3 points)</td><td>A value thesis tested in diligence</td></tr>
      <tr><td>Productivity</td><td>Plant OEE, quality, uptime, on-time delivery</td><td>Agility: more changeovers, utilization, forecast accuracy, turns</td></tr>
      <tr><td>OpEx tools</td><td>Digitized five whys — adoption up 60%+ 2019–2023</td><td>Constraint focus deciding where tools get pointed</td></tr></tbody></table></div>
    <p class="mt">Low variance means low explanatory power — not zero importance. A survey can't detect the effect of something that doesn't vary. Say both halves.</p>` },
  conditions: { name: "Find the conditions", tag: "Move 5", one: "“True, except when…” — a finding with no boundaries is a platitude.",
    body: `<p>Conditions are what make an insight travel into one client's context — Matt's “adjacency problem,” and why CDI is built on causal models. The client always wants to know whether a finding applies to them.</p>
    <ul><li>Collaboration helps only when expertise, decision rights and guardrails are defined.</li><li>Customer language → ~3.4× equity, except where customers have no choice.</li><li>Adaptability depends on optionality.</li><li>“70% of deals fail” hides the spread by archetype.</li></ul>` },
  direction: { name: "Check the arrow", tag: "Move 6", one: "Could the outcome be causing the thing you're crediting?",
    body: `<p>Profitable firms can fund productivity programs. Successful companies may simply talk more about customers. Capable organizations redesign work; trapped ones can't. Before “X drives Y,” rule out “Y enables X.”</p>` },
  systems: { name: "Think in systems", tag: "Move 7", one: "Trade-offs, buffers, thresholds — the answer often includes “until here, then stop.”",
    body: `<div class="loop"><span>Maximize utilization</span><i>→</i><span>Buffer gets used up</span><i>→</i><span>Shock or demand shift</span><i>→</i><span>Fragile, lost agility</span></div>
    <ul class="mt"><li><b>Diminishing returns:</b> past parity, plant efficiency stops paying.</li><li><b>Second-order effects:</b> outsourcing → fragmentation → slower learning loop → decision latency.</li><li><b>Thresholds:</b> KM payoff concentrates at the top maturity tier — don't expect gains in the pilot.</li></ul>` },
  counterfactual: { name: "Compared to what?", tag: "Move 8 · Rung 3", one: "Every finding and every ROI needs the do-nothing path.",
    body: `<p>Bend the curve against “do nothing,” not last year's spend. Count avoided growth, not just cuts. Decompose failure into its causes — each needs a different fix.</p>
    <blockquote>“Do you really know what happens when you take it away? That's the difference between an amateur and a professional.”<span class="cite">— Mike Carroll</span></blockquote>` },
  challenge: { name: "Take a challenge well", tag: "Delivery", one: "Acknowledge, show the check, restate the mechanism, say what would change your mind.",
    body: `<ol class="steps"><li><div><b>Acknowledge</b><span>Say the alternative explanation out loud.</span></div></li><li><div><b>Show the check</b><span>Say what you tested — e.g., recall counts, not just units.</span></div></li><li><div><b>Restate the mechanism</b><span>What you believe is happening, and why.</span></div></li><li><div><b>Say what would change your mind</b><span>“I'll take these questions and run them through.”</span></div></li></ol>` },
  juxtapose: { name: "Juxtaposition reads as causation", tag: "Language", one: "Two numbers side by side are heard as cause and effect.",
    body: `<p>If you don't intend the causal link, say so — or reframe toward where the real differentiation is. Placing an adoption rate next to an outcome rate invites the room to draw the arrow for you.</p>` },
};

CT.CONCEPT_ORDER = ["ladder", "verbs", "mechanism", "surface", "symptoms", "disconfirm", "variance", "conditions", "fork", "direction", "collider", "systems", "counterfactual", "juxtapose", "challenge"];
