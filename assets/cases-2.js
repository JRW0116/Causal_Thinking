/* Cases from the fall 2026 KM roundtable, OpEx roundtable and the Industrial AI Insights session prep call.
   External participants are described by role only. Quotes are lightly edited for transcription errors. */
window.CT = window.CT || {};

Object.assign(CT.CASES, {
  "spc-vs-manual": {
    title: "SPC came out slower — and worse — than operator judgment. Believe it?",
    source: "Industrial AI Insights session prep call",
    scene: `<p>A slide harmonized two research studies: decisions made with statistical process control were about 4× slower, with about 4× worse outcomes, than ML models such as random forests — and they trailed manual operator decisions too.</p>
      <blockquote>“Unless I'm reading it wrong, I would have thought statistical process control would be better than manual operator decisions.”<span class="cite">— Pulp &amp; paper AI and analytics leader</span></blockquote>`,
    ask: "Before this chart goes on stage, what's your first question?",
    options: [
      { t: "Which of the two studies had the bigger sample?", fb: "Worth knowing, but it doesn't address the main risk in a chart built from two sources." },
      { t: "Did the two studies define and measure speed and outcomes the same way?", fb: "Yes. A harmonized chart is only as good as the match between its sources.", best: true },
      { t: "None — two independent studies agree.", fb: "Agreement helps only if both studies measure the same thing." },
    ],
    free: "If the result holds, what mechanism could make SPC lose to an operator?",
    reveal: {
      happened: `<p>Jim had the same reaction and checked it: the pattern came out that way “in two independent white papers.” The participant offered a mechanism on the spot: <i>“being able to just push a button is faster.”</i> He added that his own team's modeling ends at random forests most of the time.</p>`,
      why: `<p>Two questions hide in one chart. <b>Measurement:</b> do the two sources mean the same thing by “speed” and “outcome”? <b>Mechanism:</b> if outcomes track decision speed, the finding may be about decision latency — a chain from method to speed to outcome — rather than the statistics inside SPC. Each reading implies a different fix.</p>`,
      better: "In two independent studies, rule-based SPC decisions were slower than ML-guided ones, and outcomes tracked speed. Our read: decision latency, not SPC's math, is the constraint.",
    },
    concepts: ["measurement", "mechanism"],
    next: ["stack-models", "agentic-email"],
  },

  "genai-trust": {
    title: "GenAI is now the most trusted analytics technique. Trusted for what?",
    source: "Industrial AI research · session prep call",
    scene: `<p>New LNS research: generative AI now ranks as the most trusted analytics technique among manufacturers — ahead of machine learning and statistical methods.</p>`,
    ask: "What's the most likely explanation?",
    options: [
      { t: "LLMs give more accurate answers than other models.", fb: "Nothing in a trust rating measures accuracy." },
      { t: "The conversational layer makes the other analytics usable, and trust attaches to the interface.", fb: "That's the read from the research team.", best: true },
      { t: "Vendor marketing has inflated expectations.", fb: "Possible, but it doesn't explain why users themselves report the trust." },
    ],
    free: "What survey question would separate trust in the interface from trust in the inference?",
    reveal: {
      happened: `<p>Jim's read in the prep call: <i>“what's really happening here is that it's the conversational layer over the analytics”</i> — operators can now have a conversation with their analytics through an LLM. The same research found maturity means adding model types, not consolidating them.</p>`,
      why: `<p>A trust rating is a Rung 1 measure of whatever respondents think they're rating. If “GenAI” means “the way I now reach my analytics,” the rating is a surface effect of usability, not evidence that LLM inference is more reliable. “Trust the LLM's answers” would act on the wrong construct.</p>`,
      better: "GenAI tops the trust ranking because it's now the conversation layer people reach their analytics through. Trust the interface; verify the inference.",
    },
    concepts: ["measurement", "surface"],
    next: ["stack-models", "trust-3x"],
  },

  "stack-models": {
    title: "Does analytics maturity mean replacing SPC with something better?",
    source: "Industrial AI Insights session prep call",
    scene: `<p>The research: more mature manufacturers run <b>more</b> model types, not fewer. A pulp &amp; paper AI leader described his plan:</p>
      <blockquote>“We stack like univariate statistical exceptions monitoring, and then we put multivariate analysis monitoring on that, and now we're going to have center lining monitoring…”</blockquote>`,
    ask: "What does the stacking plan assume about how the models work together?",
    options: [
      { t: "Each layer replaces the one below it.", fb: "Then you'd retire SPC — the opposite of the plan." },
      { t: "Each layer catches what the one below misses.", fb: "Yes — a mechanism of complementary detection.", best: true },
      { t: "More models always means more accuracy.", fb: "Not automatically. More layers can also mean more alerts." },
    ],
    free: "What would you need to see to know the stack beats any single layer?",
    reveal: {
      happened: `<p>The plan stacks univariate exception monitoring, multivariate monitoring and centerlining, then guides operators from the best way the line has ever run, using SOPs and manuals. He was clear about its status: <i>“we haven't deployed it yet. This is our game plan.”</i></p>`,
      why: `<p>“Maturity means adding model types” is a Rung 1 pattern across companies. The stack is a Rung 2 design — an intervention with a stated mechanism. Until it runs against a baseline (and against each layer alone), it's a hypothesis: a good one to present as a plan, not as a result.</p>`,
    },
    concepts: ["systems", "counterfactual"],
    next: ["messy-data", "spc-vs-manual"],
  },

  "messy-data": {
    title: "Five mills, about 20 sources for one reliability test. Is the AI the problem?",
    source: "Industrial AI Insights session prep call",
    scene: `<p>Bringing reliability data into one industrial data platform, a pulp &amp; paper leader found that over 30 years each mill had picked its own vendors for simple reliability tests:</p>
      <blockquote>“We had 20 different sources for IR data or something like that … and this is only five mills.”</blockquote>`,
    ask: "An AI model trained on this data underperforms. Where do you look first?",
    options: [
      { t: "Tune or replace the model.", fb: "That treats the symptom." },
      { t: "Check whether the sources measure the same thing the same way.", fb: "Yes — comparability comes before modeling.", best: true },
      { t: "Add more mills to the training set.", fb: "More incomparable data adds noise, not signal." },
    ],
    free: "How could inconsistent sources create a pattern that isn't real?",
    reveal: {
      happened: `<blockquote>“You can't just slap AI on a bunch of garbage.”</blockquote><p>Jim tied it to the Industrial AI research, where data readiness showed up as one of the significant indicators: garbage in, garbage out still holds.</p>`,
      why: `<p>Data readiness is a condition on every AI result. When sources differ by mill, “which mill” becomes a hidden variable in every pattern the model learns — it can learn the vendor, not the process.</p>`,
    },
    concepts: ["conditions", "measurement", "fork"],
    next: ["correlate-first", "agentic-email"],
  },

  "agentic-email": {
    title: "An agent analyzes every paper-machine event. Why would that improve decisions?",
    source: "Industrial AI Insights session prep call",
    scene: `<p>A pulp &amp; paper leader: when certain events happen on a paper machine, an agent <i>“fires off and does a lot of analytics and serves it up in a nice package in an email every time it happens.”</i> It goes to area managers, not operators.</p>`,
    ask: "What's the most important mechanism?",
    options: [
      { t: "Speed: decisions get made faster.", fb: "True, and he said so — but it's half the story." },
      { t: "Consistency: the same analysis every time, whoever is on shift.", fb: "Yes: “More consistent. It's done the same way.”", best: true },
      { t: "Automation: the agent makes the decision.", fb: "Not here. A person still decides." },
    ],
    free: "What would you measure to show it worked — and compared to what?",
    reveal: {
      happened: `<p><i>“That allows them to make decisions faster … More consistent. It's done the same way.”</i> On embedding decision authority: <i>“No, we're not there yet.”</i> Jim placed it under the research finding that analytics is now advisory, but not yet decisive.</p>`,
      why: `<p>Two mediators — speed and consistency — point to different metrics: time-to-decision versus variation in how the same event gets handled. Naming both tells you what to measure. The condition matters too: the agent advises, it doesn't act, so the honest claim is about the decision process, not (yet) the decision.</p>`,
    },
    concepts: ["mechanism", "conditions"],
    next: ["rubber-stamp", "spc-vs-manual"],
  },

  "adaptive-24": {
    title: "Adaptive organizations have 24% higher margin and revenue growth. Should a client become adaptive?",
    source: "KM roundtable · session prep call",
    scene: `<blockquote>“Adaptive organizations … have 24% higher margin and revenue growth and are 10% higher performing across a suite of 32 business KPIs. So adaptive pays off.”<span class="cite">— Jim Wells</span></blockquote>
      <p>In the same talk: adaptability depends on optionality, and some industries — aerospace and defense, medical devices, automotive — were fairly insulated from knowledge loss.</p>`,
    ask: "What's the strongest objection to “adaptive pays off”?",
    options: [
      { t: "24% is too big to be believable.", fb: "Size isn't the problem." },
      { t: "Insulated industries and intact workforces could produce both adaptivity and margin.", fb: "Yes — and the confounder comes from the speaker's own data.", best: true },
      { t: "KPIs don't capture what matters.", fb: "That dodges the question rather than testing it." },
    ],
    free: "How would you compare like with like?",
    reveal: {
      happened: `<p>Nobody challenged it, and the line went into the prep-call deck as presented. The same talk had a stronger design hiding in it: comparing adaptive organizations with high versus low AI use, which holds adaptivity constant.</p>`,
      why: `<p>“So adaptive pays off” jumps from Rung 1 to Rung 2. If adaptability comes from optionality — not having lost the workforce, being in a sheltered industry — the 24% may partly reflect position, not work design. The fix is Pearl's back-door adjustment: compare within industry, or within similar levels of workforce loss.</p>`,
      better: "Adaptive organizations post 24% higher margin and revenue growth. Part of that may be position — adaptability depends on optionality. Within the same industry, here's what adaptive work design adds.",
    },
    concepts: ["fork", "direction", "verbs"],
    next: ["knowledge-loss", "attrition-protocols"],
  },

  "copy-exact": {
    title: "Two fabs, identical equipment and instructions, different yields. What's the cause?",
    source: "KM roundtable (business-school faculty member)",
    scene: `<p>A faculty member retold an Andy Grove story about “copy exactly” semiconductor fabs: the same tools and the same instructions, yet very different yields. People were being moved between factories, at great expense, to find out why.</p>`,
    ask: "How would you find the cause?",
    options: [
      { t: "Enforce the stricter written procedure at both plants.", fb: "The written procedure was already identical." },
      { t: "Compare the plants step by step for the few differences that track yield.", fb: "Yes — that's how it was found.", best: true },
      { t: "Assume better people and transfer staff.", fb: "That was the expensive approach." },
    ],
    free: "Which of a client's steps would you suspect first, and why?",
    reveal: {
      happened: `<blockquote>“One factory instruction was to wipe some surface clean, and one factory did it like this. The other factory did like this, get a high yield.”</blockquote>
        <p>Then the hard part: <i>“How do I know something that trivial that I need to capture? It may make a difference, or I may just … constrain people.”</i> Another participant: of 77 process steps, one created most of the variation. Jim: the documented procedure isn't always the best way — it's a starting hypothesis.</p>`,
      why: `<p>Copy-exact is close to a natural experiment: hold everything else equal, and the remaining difference is a candidate cause. Most variation doesn't matter; a few steps do. Capture everything and you over-constrain people; capture too little and you miss the mechanism.</p>`,
    },
    concepts: ["mechanism", "counterfactual"],
    next: ["variation-rule", "superstition"],
  },

  "superstition": {
    title: "Experienced operators share their know-how. Some of it breaks thermodynamics.",
    source: "KM roundtable (manufacturing excellence director, metals)",
    scene: `<p>Capturing tacit knowledge across sites with very similar equipment, a manufacturing excellence director found they were</p>
      <blockquote>“trying to filter out superstition … some of what people are submitting is against thermodynamics.”</blockquote>`,
    ask: "An operator says a fix works “every time.” It contradicts the process chemistry. What do you do?",
    options: [
      { t: "Capture it — front-line experience beats theory.", fb: "Capturing it at scale spreads the error to every site." },
      { t: "Treat it as a hypothesis: check the mechanism and test it before it enters the knowledge base.", fb: "Yes — filter, then test.", best: true },
      { t: "Discard front-line submissions as unreliable.", fb: "That throws away the real know-how with the superstition." },
    ],
    free: "How could an operator honestly come to believe a fix that can't work?",
    reveal: {
      happened: `<p>The room's answer was to filter. Jim connected it to <b>defined expertise</b> in a decision intelligence architecture: large multi-plant networks move closer to copy-exact rather than letting every plant keep its own way. Terminology differed by site too, so even good knowledge didn't transfer.</p>`,
      why: `<p>Experience is Rung 1 learning: the fix and the recovery happened together often enough to feel causal. Coincidence, regression to the mean, or another action taken at the same time can all produce that. A physical mechanism is a cheap first filter; a test is the second.</p>`,
    },
    concepts: ["mechanism", "disconfirm"],
    next: ["copy-exact", "variation-rule"],
  },

  "variation-rule": {
    title: "Two operators do the same task differently. When should you force one standard?",
    source: "KM roundtable (beverage plant leader)",
    scene: `<p>Asked how she manages variation when operators contribute their own knowledge, a plant leader gave a rule:</p>
      <blockquote>“If I do it this way and you do it this way, and it's the exact same result … we're not going to quiet it. But if there's one way to do a changeover [that] reduces the time and number of steps by 20% … this is the way.”</blockquote>`,
    ask: "What is her rule really testing?",
    options: [
      { t: "Whether the method is documented.", fb: "Documentation doesn't enter into it." },
      { t: "Whether switching methods changes the outcome.", fb: "Yes — a Rung 2 question in plain words.", best: true },
      { t: "Whether operators agree on a method.", fb: "Agreement isn't the test; the result is." },
    ],
    free: "What would you need to know to trust the 20%?",
    reveal: {
      happened: `<p>She added the caveat herself — <i>“How do we know this one? … let's work on that data”</i> — and when pressed, said capture wasn't yet structured: <i>“we're building it.”</i></p>`,
      why: `<p>“Standardize everything” assumes every difference is a cause. Her rule asks the interventional question: if we moved one operator to the other's method, would the result change? Only then does the variation matter. The open question is how the 20% was measured, and against what.</p>`,
    },
    concepts: ["counterfactual", "conditions"],
    next: ["copy-exact", "own-yardstick"],
  },

  "attrition-protocols": {
    title: "Without knowledge capture and reuse protocols, attrition is 2.4× higher. So build protocols?",
    source: "KM roundtable",
    scene: `<blockquote>“Without knowledge capture and reuse protocols, attrition is 2.4 times higher.”<span class="cite">— Jim Wells</span></blockquote>
      <p>The mechanism offered: new workers are frustrated because they don't know what to do. The recommendation that followed: fund knowledge use before knowledge capture.</p>`,
    ask: "Nobody challenged it. What should someone have asked?",
    options: [
      { t: "Is 2.4× statistically significant?", fb: "Worth knowing — but not the main problem." },
      { t: "Could high-churn plants be unable to build protocols in the first place?", fb: "Yes — the arrow could run the other way.", best: true },
      { t: "Does capture matter more than use?", fb: "That's the recommendation, not a test of the stat." },
    ],
    free: "Name a third factor that could drive both.",
    reveal: {
      happened: `<p>The room moved on to adaptive work design. The statistic carried the recommendation without a challenge.</p>`,
      why: `<p>The arrow could run either way: protocols may keep people, or stable workforces may be the ones able to build protocols. A common cause — pay, local labor market, management maturity — could drive both. The mechanism (frustration → exit) is plausible but asserted, not shown. The room won't always do the challenging for you.</p>`,
      better: "Plants without capture-and-reuse protocols see 2.4× the attrition. Our read: new workers leave when they can't find out what to do. Test: does attrition fall at plants that add reuse protocols, compared with similar plants that don't?",
    },
    concepts: ["direction", "fork", "verbs"],
    next: ["trust-3x", "adaptive-24"],
  },

  "trust-3x": {
    title: "Leaders trust technology 3× more, and their teams feel 4× more empowered. Does trust drive adoption?",
    source: "KM roundtable · Industrial Transformation technology study",
    scene: `<blockquote>Leaders “were three times more likely to trust technology to help them make better decisions … When they model that behavior, their teams … are four times more likely to … report feeling empowered.”<span class="cite">— Jim Wells</span></blockquote>`,
    ask: "What does the 3× show on its own?",
    options: [
      { t: "Building trust first will make adoption succeed.", fb: "That's the room's implied reading — a Rung 2 conclusion from Rung 1 data." },
      { t: "Trust and success go together; success may build trust.", fb: "Yes. The data can't say which came first.", best: true },
      { t: "Trust doesn't matter for adoption.", fb: "The data doesn't show that either." },
    ],
    free: "How is the “leader” group defined — and why does that matter here?",
    reveal: {
      happened: `<p>No one challenged the numbers. Later, after a participant's example, Jim offered a better-specified mechanism: a <b>transparent chain of reasoning</b> — making the logic behind an AI recommendation auditable — is what earns trust. <i>“The age of AI as a black box is over.”</i></p>`,
      why: `<p>If “leaders” are defined by deployment success, success can create trust as easily as trust creates success — and leader and team answers may come from the same respondent. The auditability mechanism, by contrast, is testable: does making the reasoning visible raise trust and action when other things are equal?</p>`,
    },
    concepts: ["direction", "collider", "mechanism"],
    next: ["genai-trust", "data-platform"],
  },

  "correlate-first": {
    title: "Mixer settings correlate with lab quality results. Ready to change the settings?",
    source: "OpEx roundtable (materials manufacturer, CI leader)",
    scene: `<p>A CI leader described joining MES process data to lab quality results at one site:</p>
      <blockquote>“What does it affect the quality of the rubber we are testing? So we pretty much tell is there a relationship, correlation there.”</blockquote>
      <p>Later phases add AI on top. Before any of it, they consolidated ERP and MES systems to standardize the data architecture.</p>`,
    ask: "A mixer parameter correlates with a lab property. What comes before telling operators to change it?",
    options: [
      { t: "Roll the AI recommendations to all five plants.", fb: "That scales a correlation before testing it." },
      { t: "Rule out common causes like raw-material lot or shift, then test the change at the pilot site.", fb: "Yes — close the back door, then intervene.", best: true },
      { t: "Nothing — a validated lab system is enough.", fb: "A valid measurement doesn't make the link causal." },
    ],
    free: "What could move both the mixer parameter and the lab result?",
    reveal: {
      happened: `<p>Nobody challenged it — and the plan was already phased: one site, establish the relationship, then build on it. Asked whether the work tied to value, the answer linked it to forecast, inventory and pricing problems.</p>`,
      why: `<p>A rare, explicit Rung 1 → Rung 2 sequence: find the association, then intervene. The step in between is the back door — a raw-material lot can change both how a batch mixes and how it tests. The pilot site is where the intervention test belongs.</p>`,
    },
    concepts: ["ladder", "fork"],
    next: ["messy-data", "bundled-change"],
  },

  "standardize-threshold": {
    title: "Standardization makes operations more flexible. Or does it?",
    source: "OpEx roundtable",
    scene: `<p>Jim offered a mechanism: <i>“stable, standardized processes allow for flexibility”</i> — you're not spending your resources just managing the operation. A pharma manufacturing leader pushed back: standardize down to the detail and you lose flexibility. A credit-research participant: organizations become less resilient as authorization gets more rigid.</p>`,
    ask: "Who's right?",
    options: [
      { t: "Standardization always increases flexibility.", fb: "Not past a point." },
      { t: "Standardization always reduces flexibility.", fb: "Not below a point." },
      { t: "Both — it helps up to a threshold, then rigidity costs flexibility.", fb: "Yes, and that's where the room landed.", best: true },
    ],
    free: "Where would you look for the threshold in a client's plant network?",
    reveal: {
      happened: `<p>Jim brought in the productivity research: plant metrics don't separate competitive operators from the World's Most Productive — Pathfinders are a little worse. Efficiency extraction <i>“beyond a certain point … limits your optionality in your plant network.”</i> Later the pharma leader said he'd decided not to harmonize across all sites; another participant said their unharmonized processes slowed them down.</p>`,
      why: `<p>A non-monotonic relationship: the effect of more standardization depends on where you start. A single correlation across all companies averages a positive slope and a negative one into “no relationship” — one reason plant KPIs look flat across tiers.</p>`,
    },
    concepts: ["systems", "conditions"],
    next: ["utilization", "mna-execution"],
  },

  "shadow-ai": {
    title: "Should you restrict AI tools until there's a policy?",
    source: "OpEx roundtable (pharma manufacturing leader)",
    scene: `<p>After the room agreed that unaligned AI pilots waste effort, a pharma leader offered “a challenging position”:</p>
      <blockquote>“I still think it's good for people who play around … If we don't give them a place to do it, they're going to use it anyway. But they're not going to tell you.”</blockquote>`,
    ask: "Jim asked how he'd dealt with shadow AI. What evidence did he have?",
    options: [
      { t: "Documented incidents of data leaking into public tools.", fb: "No incidents were described." },
      { t: "A strong suspicion, with no specific instance found.", fb: "Yes — and he said so plainly.", best: true },
      { t: "An internal survey of tool use.", fb: "No survey was mentioned." },
    ],
    free: "What's the right comparison for the restriction decision?",
    reveal: {
      happened: `<blockquote>“Have we ever found a specific instance? No, I think we've got a lot of cases where we have a really strong suspicion.”</blockquote><p>His answer was guardrails, plus explaining the why.</p>`,
      why: `<p>The counterfactual decides the argument. Compared with no use, sanctioned play looks risky; compared with hidden use, it looks safer. Choosing the do-nothing path is the whole case — and here that path rests on suspicion, which is worth saying out loud. Note the honesty, too: he challenged the room's consensus and graded his own evidence.</p>`,
    },
    concepts: ["counterfactual", "disconfirm"],
    next: ["rubber-stamp", "amgen"],
  },

  "own-yardstick": {
    title: "Plant maturity is up 31% in five years. Is the program working?",
    source: "OpEx roundtable (materials manufacturer, CI leader)",
    scene: `<blockquote>“In the last six years, we've moved up … and we are 31% improve[d] in maturity in the last four, five years.”</blockquote>
      <p>Maturity is scored on a benchmark the company customized from an industry lean assessment. Later: <i>“now the standards are increased. So we have changed the standard.”</i></p>`,
    ask: "What's the weakest link between “31% more mature” and “the program works”?",
    options: [
      { t: "Too few plants.", fb: "Not the main issue." },
      { t: "It's scored on the program's own instrument, with no comparison plants and no link to outcomes.", fb: "Yes.", best: true },
      { t: "Five years is too short.", fb: "Time isn't the issue; the yardstick is." },
    ],
    free: "What would a baseline look like here?",
    reveal: {
      happened: `<p>Nobody challenged it. Later in the same session a pharma leader described the alternative: <i>“We're looking at investigation cycle time versus baselines. We try and take a baseline shot as to where it is.”</i></p>`,
      why: `<p>A self-designed, self-scored instrument measures adoption of the program's own practices; it can rise while nothing else changes. When the standard moves, the before and after aren't on the same scale. A baseline on an outcome metric is the counterpart.</p>`,
    },
    concepts: ["measurement", "counterfactual"],
    next: ["bundled-change", "bottles"],
  },

  "bundled-change": {
    title: "Engagement rose after plants chose their own projects. Was that the reason?",
    source: "OpEx roundtable (materials manufacturer, CI leader)",
    scene: `<p>Instead of corporate mandating a 3% productivity target, plants now pick their own projects: <i>“I think like we have seen better success in that way.”</i> In the same period, lean goals were added to salaried and hourly performance reviews, belts began presenting to senior executives, and rewards were introduced.</p>`,
    ask: "Why can't we credit project choice alone?",
    options: [
      { t: "Engagement wasn't measured.", fb: "Partly true — “I think” is doing work here." },
      { t: "Several motivators changed at the same time.", fb: "Yes — co-interventions.", best: true },
      { t: "Plants picked easy projects.", fb: "Possible (selection), but not the first issue." },
    ],
    free: "How would you separate the effect of project choice?",
    reveal: {
      happened: `<p>The room agreed it “goes a long way.” Another participant then offered his own single cause for why lean underdelivers — value-stream mapping done backwards: “That's why.”</p>`,
      why: `<p>Co-interventions are confounders: when several levers move together, the outcome can't be credited to one. A staggered rollout, or comparing plants that got some changes but not others, is how you'd pull them apart. And watch single-cause explanations offered with total confidence.</p>`,
    },
    concepts: ["fork", "counterfactual"],
    next: ["own-yardstick", "correlate-first"],
  },

  "rubber-stamp": {
    title: "AI drafts the investigation. Will quality rise as usage grows?",
    source: "OpEx roundtable (pharma manufacturing leader)",
    scene: `<blockquote>“AI, I think you get you a good 75, 80% of the way to a solution … But you still need that person to go verify it.”</blockquote><p>His worry: as usage grows, people read AI output less carefully — <i>“and they just sign off.”</i></p>`,
    ask: "Why might more AI use reduce investigation quality?",
    options: [
      { t: "Models degrade over time.", fb: "Not the mechanism he described." },
      { t: "Familiarity breeds sign-off without review, so verification decays as reliance grows.", fb: "Yes — a feedback loop.", best: true },
      { t: "Regulators penalize AI use.", fb: "They penalize missing validation, not AI." },
    ],
    free: "What design would keep the human decision real?",
    reveal: {
      happened: `<p>His fix: agents that insert “you need to confirm this” placeholders, so someone must edit before signing. A story about a company telling a regulator “AI didn't tell us we needed to do that” got the room's attention — memorable, but unsourced. The principle the room landed on: validate the decision point and the data source, not the model.</p>`,
      why: `<p>A feedback loop: the benefit (speed) raises reliance, and reliance erodes the review that made the output safe. Effects that reverse with scale are invisible in a pilot. And grade the evidence: an anecdote is a warning, not a finding.</p>`,
    },
    concepts: ["systems", "mechanism"],
    next: ["shadow-ai", "agentic-email"],
  },
});

/* New idea: measurement */
CT.CONCEPTS.measurement = {
  name: "Is the yardstick measuring the thing?", tag: "Rung 1 · Measurement",
  one: "Before you ask what causes a number, ask what the number measures — and whether before and after use the same ruler.",
  body: `<p>Every rung of the ladder stands on measurement. A causal model can't rescue a variable that means different things in different places.</p>
    <ul>
      <li><b>Comparable sources:</b> a chart harmonized from two studies, or reliability data from 20 vendors, is only as good as the match between definitions.</li>
      <li><b>Moving rulers:</b> recall definitions change; maturity standards get raised. Before and after must sit on the same scale.</li>
      <li><b>Self-scored instruments:</b> a program measured on its own yardstick tracks adoption of its practices, not outcomes.</li>
      <li><b>Construct drift:</b> “trust in GenAI” may be trust in the interface, not the inference.</li>
    </ul>`,
};
CT.CONCEPT_ORDER.splice(CT.CONCEPT_ORDER.indexOf("variance"), 0, "measurement");

/* Question paths: add the new cases, and three new questions */
(function () {
  const q = (id) => CT.QUESTIONS.find((x) => x.id === id);
  const add = (id, ...cases) => { const x = q(id); if (x) cases.forEach((c) => { if (!x.cases.includes(c)) x.cases.push(c); }); };
  add("lever", "trust-3x", "attrition-protocols", "adaptive-24");
  add("didnt-land", "genai-trust");
  add("everywhere", "standardize-threshold", "variation-rule");
  add("value", "own-yardstick");
  add("too-good", "spc-vs-manual");
  CT.QUESTIONS.push(
    { id: "is-it-ai", q: "Is the AI actually what's making the difference?", hint: "Measurement, mechanisms, data readiness, and effects that reverse at scale", cases: ["spc-vs-manual", "genai-trust", "messy-data", "agentic-email", "stack-models", "rubber-stamp", "shadow-ai"] },
    { id: "program-working", q: "Our program is working. How do we know?", hint: "Yardsticks, baselines, and changes that arrive together", cases: ["own-yardstick", "bundled-change", "correlate-first", "adaptive-24"] },
    { id: "capture-expertise", q: "How do we capture what our experts know?", hint: "Separating the step that matters from superstition", cases: ["copy-exact", "superstition", "variation-rule", "attrition-protocols"] },
  );
})();
