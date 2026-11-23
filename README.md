# Causal Thinking Lab

A static, self-paced training site for LNS Research analysts, built from the
*Causal Thinking for Analysts — Training Deck v2* and the stories in it from the
fall 2026 roundtables and council meetings.

## How it works: inquiry first
There is no syllabus to read. The learner starts from a question they are facing
("Can I call this multiplier the lever?", "Someone pushed back on my number"),
or types their own. Each question opens a path of **cases**: real moments from
the fall 2026 sessions. In each case the learner commits to an answer before
seeing what happened in the room. Concepts (Pearl's Ladder, confounders,
colliders, surface effects, counterfactuals and others) **unlock** as cases
reveal them, so the theory arrives when it's needed.

- `#/` — question picker plus free-text "ask your own"
- `#/q/<id>` — the path of cases for a question
- `#/case/<id>` — commit, then reveal (what happened, why it matters, a better way to say it, what it raises)
- `#/ideas` — map of uncovered and locked ideas
- `#/journal` — every prediction next to what actually happened
- `#/lab` — **Insight Challenge Lab**: paste your own insight and work it through seven causal questions

Content lives in `assets/content.js` (questions, cases, concepts).

## Run locally
No build step. Serve the folder with any static server:

    py -m http.server 8765

then open http://localhost:8765.

Progress, exercise notes, and saved lab insights are kept in the browser's
localStorage only.

## Notes on use
Quotes are lightly edited for transcription errors. External participants are
described by role (Chatham House / safe harbor). Check statistics against the
source research before reusing them in client work.

## LNS lexicon (UKG snapshot)
`assets/ukg-lexicon.js` is a **public subset** of the LNS Unified Knowledge Graph lexicon tables:
vocabulary terms and definitions, discipline-level language rules (preferred and avoid-terms),
and confirmed construct names. It contains no causal edges, weights, probabilities, survey links,
company data or internal file paths.

It powers the **Speak LNS** page (`#/lexicon`), the "LNS terms in this case" block on case reveals,
and the Lab's off-lexicon check and related-construct suggestions.

To refresh it (requires UKG database access over the SSH tunnel; run locally, never committed):
1. `node ukg_export\export_ukg_lexicon.js` — raw export to a local folder outside this repo
2. `py -I ukg_export\build_public_snapshot.py Causal_Thinking\assets\ukg-lexicon.js` — filtered public subset

## Grounded in Pearl's Ladder of Causation
The program is built on the three rungs from Judea Pearl and Dana Mackenzie's *The Book of Why*
(seeing / association, doing / intervention, imagining / counterfactuals). `assets/ladder.js` tags
every case with the rung its claim speaks from and the rung its evidence reaches, plus "the climb":
what it would take to earn the claim. Learners place each claim on the ladder before the reveal;
the reveal shows claim, evidence and their placement on a mini-ladder. `#/ladder` lists every claim
by rung, and the ideas map is grouped by where each idea lives on the ladder.

Cases live in `assets/content.js` (deck stories) and `assets/cases-2.js` (KM roundtable,
OpEx roundtable and the Industrial AI Insights session prep call).

## Cloudflare deployment

Live at https://research-portfolio.sera-holt.workers.dev/causal-thinking/ — the `research-portfolio` Worker in the LNS Research Cloudflare account, serving the site as static assets under `/causal-thinking/` (the root redirects there).

```
py tools/build_cf.py        # stages index.html + assets/ into dist/causal-thinking/
npx wrangler@4 deploy       # uses wrangler.jsonc; needs `wrangler login` with LNS Research access
```

GitHub Pages (jrw0116.github.io/Causal_Thinking) still serves the same files; share links and preview tags point at the Cloudflare URL.
