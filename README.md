# Causal Thinking for Analysts

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
