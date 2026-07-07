# Allan Dufas — Portfolio Design Specification (Working Draft)

Status: Phases 1–3 complete and validated with refinements. This document is the living spec — it will be extended through Phase 4 (wireframes) and Phase 5 (final build-ready spec).

---

## PHASE 1 — POSITIONING (validated, refined in Phase 3)

**Who Allan is:** A Customer Success Operations Manager (5+ years B2B SaaS) who taught himself to build the AI systems he kept wishing existed, and shipped two of them — one fixing a problem at work (Sales→CS handovers), one fixing a problem in his own body (athletic coaching). Background: BTS Computer Science, Master's in movement/disability/adaptation, technical consultant training 100+ people on medical equipment, a CS career with real numbers (-10% churn, +181% upsell across 350+ accounts), a self-directed sabbatical in Asia, now building full-stack production software alone.

**What's constant, what isn't (Phase 3 refinement):** AI is a technology. Customer Success is a domain. Both can change. What's constant is the reasoning pattern applied to both — and to athletic coaching, career management, clinical documentation, personal productivity:

```
Fragmented expertise → Structure → Decision system → Better decisions → Better outcomes
```

This pattern, not any single project or job title, is the actual product of the portfolio. Identity is built on the reasoning, not the domain or the tool — see Phase 3 identity decision below.

**Source-of-truth ranking for project selection:**

1. Training OS (AI Coaching System) — production prototype, used weekly, full-stack shipped, domain-agnostic proof of the methodology, zero CS framing.
2. AI-Powered Customer Handover Engine — functional n8n/OpenAI/Slack/Notion workflow, applies the same methodology to Allan's professional domain (Customer Success), demonstrated on a realistic enterprise case.
3. Four early-stage explorations (LinkedIn Studio, NRPG, Opportunity Engine, Psychomot AI) — shown honestly as concept/prototype/planned, never as shipped products.

---

## PHASE 3 — IDENTITY (supersedes any earlier "AI Systems Builder" framing)

Decision: **no single noun-title carries the hero headline.** A title anchors to a domain or technology, both of which Allan considers contingent. Instead:

- **Primary identity = a sentence (thesis), not a label.** It does narrative work and withholds the mechanism rather than explaining it.
- **Quiet secondary label**, used only where a noun is structurally required (meta tags, footer, email-style sign-off, CV context): **"Decision Systems Architect."** Decision = the output. Systems = the method. Architect = durable, intentional design — quietly echoes the "knowledge should outlive the tool" operating principle below. Never set in a large headline; always quiet, small, secondary.

**Hero thesis — three options, recommend the first:**

1. _"I solve the same problem, every time."_ — Most provocative. Withholds everything. Forces the visitor to keep that sentence in mind through System One and System Two, priming the reveal in The Pattern section.
2. _"Different problems. One way of thinking."_ — Slightly more explicit, safer, still doesn't name the mechanism.
3. _"The domain changes. The reasoning doesn't."_ — Closest to plain statement of thesis; least mysterious of the three.

---

## INFORMATION ARCHITECTURE (Phase 2, vocabulary updated in Phase 3)

Vocabulary decision: **"Projects" → "Systems."** Not "Built Systems," not "Evidence" — those over-explain the metaphor. "Systems" alone is clean, sits naturally in navigation, and reinforces the thesis quietly every time it's read.

```
/                  Home
/systems           Index — two flagship Systems expanded + "In Motion" (experiments) grid
/systems/training-os
/systems/handover-engine
/about
/thinking          Index of long-form notes (replaces "Blog")
/thinking/[slug]
/contact           Email, LinkedIn, CV download — short, one screen
```

**Navigation:** Persistent top nav, four items: mark/name (→ Home) — **Systems** — **About** — **Thinking** — **Contact**. No separate CV button; CV lives inside Contact. No "Experiments" top-level item — it lives inside `/systems` so it reads as range, not a competing destination.

---

## EMOTIONAL JOURNEY (Phase 3 — the core mechanic of the whole site)

The site's job is to engineer a private realization, not deliver a stated thesis. Sequence:

1. **Opening (Hero).** Intrigue, not explanation. _"I solve the same problem, every time."_ The visitor doesn't know what that means yet — withholding is the technique, not a flaw.
2. **System One — Training OS.** Concrete, personal stakes (injuries, an athlete, weekly real use). Visitor's read: "impressive personal AI build."
3. **System Two — Handover Engine.** A completely different world — enterprise CRM, Slack, Notion. First flicker of pattern recognition: _"wait, this is a totally different domain..."_ Not named yet.
4. **The Pattern (the reveal).** A short, diagram-led section — title candidates: _"Notice something?"_ / _"Same shape, different world."_ The five-stage flow is drawn once, with both systems' elements mapped onto it side by side, proving they were always the same diagram. This is the emotional peak of the homepage — the only place on the entire site where motion is scroll-linked rather than merely triggered, so the visitor controls the pace of their own realization.
5. **How I Build (Operating Principles).** Now that the pattern feels real, the visitor wants the rules behind it. Principles land as earned because they arrive after proof, not before.
6. **In Motion (Experiments).** Confirms the pattern isn't a two-project coincidence — it's a default mode, visible even in half-finished ideas.
7. **About.** Resolves "who is this person," reframes Allan's own career (medical devices → CS → builder) as itself an instance of the same pattern — the most meta, most memorable echo, placed only once trust is established.
8. **Thinking.** Signals the site is alive and ongoing, not a monument to two finished projects.
9. **Contact / footer.** Quiet close, no hard sell — the visitor has already convinced themselves.

---

## HOMEPAGE — SECTION BY SECTION

| #   | Section name             | Content                                                                             | Notes                                                        |
| --- | ------------------------ | ----------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| 1   | Opening                  | Hero thesis + one-line subhead, generous negative space, scroll cue (no CTA button) | Fragment→shape load animation, plays once per session        |
| 2   | System One               | Training OS preview — tagline, system visual, 2–3 proof chips, link to case study   | Establishes the visual grammar                               |
| 3   | System Two               | Handover Engine preview — same visual grammar, different world                      | No callback text yet — repetition of structure does the work |
| 4   | The Pattern              | Diagram reveal mapping both systems onto the five-stage flow                        | The one scroll-linked motion moment on the site              |
| 5   | How I Build              | 5–7 Operating Principles, one line + one supporting line each                       | Typographic only, no icon decoration                         |
| 6   | In Motion                | Compact grid, 4 experiment cards, honest stage tags                                 | Lower visual weight by design                                |
| 7   | The Person Behind It     | Photo + 2 lines, link to About                                                      | Curiosity hook, not a CV dump                                |
| 8   | Currently Thinking About | 2–3 latest notes, or an honest "first notes coming soon" empty state                | Never looks broken if empty at launch                        |
| 9   | Footer                   | Quiet sign-off + email / LinkedIn / CV                                              | Identical across all pages                                   |

---

## OPERATING PRINCIPLES (Phase 3 — drawn from Allan's own documented decisions, not generic mottos)

These are not invented. Each one is already present, in Allan's own words, somewhere in the project documentation — the site simply names what's already true.

1. **Structure before intelligence.** AI applied to chaos produces eloquent chaos. The data model and workflow structure have to exist before AI adds value — value never comes from simply "asking AI to summarize." _(Source: Handover Engine lessons learned.)_
2. **Decompose, then arbitrate.** Complex decisions aren't solved by one generalist reasoning over everything at once. Specialize the reasoning into experts, then resolve the conflict deliberately through a final arbitration step. _(Source: Training OS multi-expert architecture.)_
3. **Explainability is non-negotiable.** Every output should carry its reasoning. The person should understand the system, not obey it. _(Source: Training OS design principles, "Explainability.")_
4. **Surface what's missing — don't paper over it.** Incomplete input should be flagged, not silently completed. Honesty about uncertainty is a feature, not a gap to hide. _(Source: Handover Engine — CRM data quality detection.)_
5. **Optimize for sustainability, not maximum output.** A system that wins short-term and breaks long-term has failed. The goal is the best decision _today_, not the most aggressive one. _(Source: Training OS arbiter — "maximizes sustainability, not improvements"; "training should leave enough energy for life.")_
6. **Augment the decision-maker, don't replace them.** The goal is a structured starting point for a CSM or an athlete — never a verdict handed down without review. _(Source: Handover Engine architecture principle; Training OS AI limitations — human reviews final programming.)_
7. **Knowledge should outlive the tool.** Architecture should survive a model upgrade or a vendor change. _(Source: Training OS — "Why Markdown": AI independence, versioning, future migration.)_

Recommend shipping all seven, laid out as a clean numbered list — restraint in _visual_ treatment, not in count, since each one is load-bearing evidence rather than filler.

---

## VISUAL METAPHORS FOR "DECISION SYSTEMS"

- **Fragments → grid/line.** Scattered marks resolving into an ordered grid or single line. Core metaphor — used in the hero load animation and in card hover states. Chaos becoming structure, literally.
- **The five-node flow.** Fragmented → Structure → System → Decision → Outcome. Drawn explicitly once, in The Pattern. Its _shape_ (not its labels) recurs faintly elsewhere — in section numbering, in a footer divider — so the pattern keeps resurfacing without being re-explained.
- **Branching-then-converging lines.** Multiple inputs/experts converging to one decision point — used to depict the Training OS expert/arbitration architecture, echoed in miniature as a divider motif elsewhere so a visitor who's seen the case study recognizes the shape again later.
- **Explicitly avoid:** circuit-board or neural-network clichés, glowing gradients, sparkle/AI icons — the startup-bro AI aesthetic the brief rules out from the start.

---

## TYPOGRAPHY DIRECTION

- One serious grotesk/sans throughout (Inter, Söhne, General Sans or equivalent Swiss-grotesk family) — no second display face. Character comes from scale, weight and spacing, not font variety.
- One small exception: a monospace accent face reserved for metadata only — section numbers, stack badges, status tags. Reinforces the systems/engineering undertone without tipping into a "coder portfolio" look.
- Strong scale contrast: large headlines at restrained (not heavy/bold-everywhere) weight; body copy small-to-medium with generous line-height for long-form reading (About, case studies, Thinking).
- Tight tracking on labels/caps; loose, generous line-height on prose.

## COLOR PHILOSOPHY

- Near-monochrome base: warm off-white paper background, soft black ink — never pure #FFFFFF/#000000, which reads sterile rather than premium.
- One accent color, rationed to a single meaning: "this is a decision or action point" — links, the convergence point in diagrams, active nav state, the Contact/CV action. Candidate: deep, slightly desaturated blue or graphite-indigo — confident, not playful, not AI-neon-purple.
- No gradients, no multi-color system. Color always means something; it's never decorative.
- Optional dark mode framed as an alternate _system state_ rather than a hidden accessibility toggle — a quiet thematic wink, not a gimmick.

## MOTION PHILOSOPHY

- Motion exists only to reveal structure or sequence — never to decorate. Three allowed types: reveal-on-scroll (fade + ~8–12px translate), scroll-linked progress (reserved exclusively for The Pattern), and state-change feedback (hover/press).
- Consistent ease-out curves, ~300–500ms. Confident, not snappy or playful, not sluggish.
- The hero's fragment-to-shape animation plays once per session (client-stored), so returning visitors aren't forced through the intro again — a small but real premium-product courtesy.
- No parallax, no scroll-jacking, no autoplaying video.

## ILLUSTRATION PHILOSOPHY

- No decorative illustration — no people-drawings, no blob shapes, no abstract gradient orbs. The only "illustration" on the site is the diagrammatic system itself, derived from the real architectures (the n8n flow, the expert/arbitration model). Real product screenshots (Slack output, Notion workspace, the app UI) are the visual proof, framed with one consistent device/border/shadow treatment rather than staged mockup scenes.
- This is itself an instance of Operating Principle 1 — structure before intelligence, applied to the design system: nothing decorative, everything structural.

---

## COMPONENTS THAT REPEAT ACROSS PAGES

- **Proof chip** — status / metric / stack badge. Used in hero previews, Systems index, case studies.
- **System card** — title, one-line framing, visual, proof chips, arrow link. Used on Home and `/systems`.
- **Section label** — small caps, muted, sits above each section headline (e.g. "02 — System," "04 — Pattern"). Gives the site a quiet "numbered systems" rhythm — itself a visual echo of structure.
- **Principle row** — number, statement, supporting line. Used in How I Build, lightly echoed in About.
- **Pull-line / quote block** — for manifesto-grade lines, used at most once per page so it stays special.
- **Footer CTA block** — identical everywhere, signaling one continuous system rather than disconnected pages.

---

## MICRO-INTERACTIONS WORTH IMPLEMENTING

- Fragment-to-shape hero animation — plays once per session, settles into a calm static state.
- Proof-chip numbers count up once on first scroll into view (e.g. "~80%," "€150k+") — restrained, not slot-machine.
- The Pattern diagram assembles itself as the user scrolls, both systems' icons sliding into the shared five-stage flow — user-paced, not autoplay.
- System card hover: a tiny scattered-dots-to-grid resolve, consistent everywhere, never gimmicky.
- Soft cross-fade/slide page transitions throughout — reinforces "one continuous system," not six separate pages.
- Optional: minimal custom cursor state change over interactive elements, desktop only.

---

## HOW EACH SYSTEM REINFORCES THE PREVIOUS ONE

Training OS establishes the visual grammar (card layout, proof chips, diagram style) with zero CS framing. Handover Engine repeats that exact grammar in a completely different world — repetition of _structure_, not narration, is what makes the pattern legible before it's ever named. The Pattern section then explicitly confirms what the visitor already started to feel. Each Experiment card is phrased in the same implicit five-stage language ("fragmented input → what this explores"), so even unfinished work quietly reconfirms the pattern a third, fourth, fifth time without re-explaining it. About reframes Allan's own career as itself an instance of the same pattern — the final and most memorable echo, placed only after trust is earned.

---

## THE UNFORGETTABLE LEVER

The single biggest unlock is the staged reveal itself: most portfolios state their methodology in paragraph one, and visitors skim past it. Here, the visitor closes the laptop having had their own small "aha" — something people repeat to others far more readily than a tagline they merely read. This only works if everything else stays ruthlessly restrained: one accent color, one typeface, near-silent motion everywhere except The Pattern. If everything moves, nothing means anything — the entire visual system exists to give that one moment somewhere to land.

---

_Next: Phase 4 — detailed wireframes for every section and component listed above._
