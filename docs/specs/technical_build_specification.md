# Allan Dufas Portfolio — Technical Build Specification

Audience: Cursor (implementer). Author posture: Principal Front-End Architect. This document assumes Product Strategy, IA, Narrative and Design System are frozen (see `Design-Specification-Working-Draft.md` and `Design-System-Specification.md`). Nothing here should require a creative decision — only engineering judgment within the constraints already set.

---

## 1. Repository Architecture

```
app/
  layout.tsx
  page.tsx
  globals.css
  sitemap.ts
  robots.ts
  opengraph-image.tsx

  systems/
    page.tsx
    training-os/
      page.tsx
    handover-engine/
      page.tsx

  about/
    page.tsx

  thinking/
    page.tsx
    [slug]/
      page.tsx

  contact/
    page.tsx

components/
  layout/
    Navbar.tsx
    MobileNavOverlay.tsx
    Footer.tsx
    PageContainer.tsx

  sections/
    Hero.tsx
    SystemPreviewSection.tsx
    PatternSection.tsx
    OperatingPrinciples.tsx
    ExperimentGrid.tsx
    AboutTeaser.tsx
    ThinkingPreview.tsx

  system/
    SystemCard.tsx
    SystemHero.tsx
    SystemGallery.tsx
    ProofChipRow.tsx
    ProofChip.tsx
    StageTag.tsx
    PrincipleRow.tsx
    PullQuote.tsx
    SectionLabel.tsx

  thinking/
    ThinkingCard.tsx
    ThinkingPreviewList.tsx

  animations/
    FadeUp.tsx
    HeroIntro.tsx
    PatternDiagram.tsx
    PatternDiagramMobile.tsx
    CountUp.tsx

  ui/
    sheet.tsx          (shadcn primitive, unstyled behavior only)
    dialog.tsx          (shadcn primitive, unstyled behavior only)
    separator.tsx        (shadcn primitive, unstyled behavior only)

lib/
  mdx.ts
  metadata.ts
  utils.ts

hooks/
  useReducedMotionSafe.ts
  useScrollProgress.ts
  useHeroIntroSeen.ts

content/
  systems/
    training-os.mdx
    handover-engine.mdx
  experiments/
    linkedin-studio.mdx
    nrpg.mdx
    opportunity-engine.mdx
    psychomot-ai.mdx
  thinking/
    (empty at launch — see §4.7)
  principles.json

public/
  images/
    hero/
    systems/
      training-os/
      handover-engine/
    experiments/
    photos/
    icons/
  cv/
    allan-dufas-cv.pdf

types/
  system.ts
  experiment.ts
  thinking.ts
  principle.ts

constants/
  nav.ts
  site.ts

utils/
  formatDate.ts
  slugify.ts
```

**Folder purposes:**

- `app/` — Next.js App Router. One folder per route. `layout.tsx` mounts fonts, `Navbar`, `Footer`, and any global providers (reduced-motion context if needed). `globals.css` contains Tailwind's base layers plus the Design System's CSS variables (color/spacing/radius tokens) — and nothing else; no component-level styles live here.
- `components/layout/` — chrome shared by every page (nav, footer, the container that enforces max-width/padding from Design System §2).
- `components/sections/` — page-level composed sections. Each one is a section as named in the Design System and Narrative spec (Hero = "Opening", PatternSection = "The Pattern", etc.). These compose smaller pieces from `system/` and `animations/`.
- `components/system/` — the reusable visual vocabulary defined in Design System §3 (cards, chips, tags, rows, labels). These are used on Home, `/systems`, and inside case studies — built once, never re-implemented per page.
- `components/thinking/` — the smaller, separate vocabulary for `/thinking` (kept distinct from `system/` because Thinking entries are editorial, not proof-of-work, and shouldn't visually borrow System Card treatment).
- `components/animations/` — every motion primitive lives here, isolated from visual components, so the "three permitted motion types" rule (Design System §5) is enforced in one place rather than re-implemented ad hoc per component.
- `components/ui/` — shadcn/ui unstyled primitives only, per Design System §8. Nothing here carries the site's visual design — only behavior (focus trapping, portal/overlay logic).
- `lib/` — content loading (`mdx.ts` parses frontmatter + body from `content/`), shared metadata builder (`metadata.ts`, used by every route's `generateMetadata`), and generic utilities (`utils.ts`, e.g. `cn()` class merge).
- `hooks/` — app-specific wrappers around Framer Motion / browser APIs: reduced-motion handling, scroll-progress for the Pattern diagram, sessionStorage gating for the hero intro.
- `content/` — the actual Markdown/MDX source of truth for Systems, Experiments, and Thinking entries, plus `principles.json` for the seven Operating Principles as structured data (not hardcoded JSX, so the principles can be edited without touching component code).
- `public/images/` — all visual assets, organized by destination, not by source folder (see §7, Asset Pipeline, for the renaming/migration plan from the Documentation repo).
- `public/cv/` — exactly one canonical CV file (see §4.6 — open decision flagged).
- `types/` — TypeScript shapes for each content type's frontmatter, so `mdx.ts` returns typed objects and components never read loosely-typed frontmatter.
- `constants/` — small, static, rarely-changing data: nav items, site name/URL/social links/default OG image.
- `utils/` — small pure functions (date formatting, slugify) with no framework dependency.

---

## 2. Route Architecture

### `/` — Home

- **Purpose:** Deliver the full emotional journey in one scroll (Narrative spec, Emotional Journey §). The only page where all major sections appear together.
- **Layout:** `PageContainer` per section, full-bleed background only for Hero.
- **Components:** `Hero`, `SystemPreviewSection` ×2 (Training OS, Handover Engine — passed different content props, not two different components), `PatternSection`, `OperatingPrinciples`, `ExperimentGrid`, `AboutTeaser`, `ThinkingPreview`, `Footer`.
- **Animations:** Hero intro (once per session) → reveal-on-scroll for every section → scroll-linked Pattern diagram (desktop) → hover states on cards.
- **Loading priority:** Hero's visual element loads eager; everything below the fold (`SystemPreviewSection` images onward) is lazy. Fonts (Geist 400/500) preloaded.
- **SEO metadata:** Title: "Allan Dufas — [hero thesis or short variant]". Description: one sentence summarizing the methodology (not a job-title sentence — keep the discovery mechanic intact even in the meta description). Canonical URL: site root.
- **OpenGraph:** Generated via `app/opengraph-image.tsx` (Next.js `ImageResponse`) — typographic, built from Design System tokens (background tint, hero thesis text, a small static rendering of the Pattern diagram's node-and-line motif). Not a screenshot, not a photo — consistent with "no decorative illustration" (Design System §1, Illustration Philosophy).

### `/systems` — Systems index

- **Purpose:** The connective/overview page — both flagships expanded beyond their homepage preview, plus the full "In Motion" (Experiments) grid.
- **Layout:** Stacked full-width sections for the two flagships (richer than home: longer framing paragraph, more proof chips), followed by a 2-column (desktop) / 1-column (mobile) grid for Experiments.
- **Components:** `SystemCard` (expanded variant) ×2, `SectionLabel`, `ProofChipRow`, Experiment cards (a lighter `SystemCard` variant — see §3.3) ×4, `StageTag`.
- **Animations:** Standard reveal-on-scroll only — no scroll-linked motion on this page (that's reserved for Home's Pattern section).
- **Loading priority:** First flagship's hero image eager, rest lazy.
- **SEO metadata:** Title: "Systems — Allan Dufas". Description: one line naming both flagships and the methodology.
- **OpenGraph:** Static fallback image (typographic, same generation approach as Home) — no per-system OG needed at this index level.

### `/systems/training-os` and `/systems/handover-engine` — Case studies

- **Purpose:** Full proof. The deepest content on the site.
- **Layout:** `SystemHero` (title, tagline, status badge, stack chips, live link if applicable) → long-form sections in the fixed order from Design System §2 (Project Documentation Template, adapted): Problem → Origin/Context → System/Architecture → Design Decisions or Lessons Learned → Proof (gallery) → Results/Value → Next Steps.
- **Components:** `SystemHero`, `PullQuote` (used once, only where the source content has a genuinely quotable line — see §4), `SystemGallery` (built from `ProofChip`-framed `Screenshot Frame` instances), `ProofChipRow`, custom architecture diagram (SVG, built per Design System §3.11's visual grammar — reused pattern, not literally the Home Pattern component, since these depict each system's own internal architecture, not the cross-system thesis).
- **Animations:** Standard reveal-on-scroll for every section; gallery images reveal with stagger; no scroll-linked motion (that mechanic stays unique to Home's Pattern section, so it never feels diluted).
- **Loading priority:** `SystemHero` image eager; gallery images lazy, loaded in viewport order.
- **SEO metadata:** Title: "[System name] — Allan Dufas". Description: the TL;DR/framing line from each system's content (§4.2/4.3).
- **OpenGraph:** Dynamic per-system `opengraph-image` route, built from the system's hero visual cropped/composed with the title — typographic treatment, not a raw screenshot crop, to stay consistent with brand.

### `/about`

- **Purpose:** Resolve "who is this person," reframe Allan's career as itself an instance of the methodology (Narrative spec, Emotional Journey, beat 7).
- **Layout:** Single long-form column (`max-width: 680px` per Design System §1.3), photo placement near top (pending asset — see §4.6 gap), career narrative in prose, `PullQuote` once at the methodology-echo moment, CV download action at the end.
- **Components:** `PageContainer`, `PullQuote`, the one true `Button` (CV download).
- **Animations:** Reveal-on-scroll only, paragraph-by-paragraph or section-by-section grouping (not line-by-line — that would feel busy on long-form text).
- **Loading priority:** Photo eager only if above the fold; otherwise lazy.
- **SEO metadata:** Title: "About — Allan Dufas". Description: one line on the career-as-pattern framing.
- **OpenGraph:** Typographic fallback (same system as above) until a real photo exists, then a photo-based OG can be revisited.

### `/thinking`

- **Purpose:** Signal the site is alive. Index of long-form notes.
- **Layout:** Simple list/grid of `ThinkingCard`s, most recent first. Honest empty state if `content/thinking/` has zero entries at launch (see §4.7) — never renders as a broken or placeholder-looking page.
- **Components:** `ThinkingPreviewList`, `ThinkingCard`.
- **Animations:** Reveal-on-scroll, staggered list entrance.
- **SEO metadata:** Title: "Thinking — Allan Dufas". Description: one line framing the section's intent (notes on systems, AI, decisions).
- **OpenGraph:** Static typographic fallback.

### `/thinking/[slug]`

- **Purpose:** Individual long-form article.
- **Layout:** Same long-form column treatment as About.
- **Components:** MDX-rendered prose, `PullQuote` available but optional per article.
- **SEO metadata:** Title/description from each entry's frontmatter. `generateStaticParams` from `content/thinking/`.
- **OpenGraph:** Dynamic per-article, typographic (title + date), generated the same way as system OG images.

### `/contact`

- **Purpose:** The one explicit ask of the site — email, LinkedIn, CV.
- **Layout:** Single short screen, no scroll required ideally. Effectively a more spacious version of the Footer content, given its own route for direct linking (e.g. nav item, "get in touch" mentions elsewhere) without forcing a full Home scroll.
- **Components:** The one true `Button` (CV download), plain links (email, LinkedIn).
- **Animations:** Reveal-on-scroll only, minimal — this page should feel calm, not performative.
- **SEO metadata:** Title: "Contact — Allan Dufas".
- **OpenGraph:** Static typographic fallback.

---

## 3. Component Tree

### 3.1 `Hero` ("Opening")

- **Props:** `thesis: string`, `subhead: string`.
- **State:** none of its own; reads hero-intro-seen status via `useHeroIntroSeen()`.
- **Children:** `HeroIntro` (the fragment→grid SVG animation, conditionally skipped if already seen this session), thesis (`display` token), subhead (`body-lg`), scroll cue (decorative, `aria-hidden`).
- **Interactions:** none beyond native scroll. No CTA button in this section by design (Design System/Narrative decision).
- **Responsibility:** First impression; withholds the mechanism; sets the thesis sentence the rest of the page will pay off.

### 3.2 `SystemPreviewSection` (used for both "System One" and "System Two")

- **Props:** `system: SystemSummary` (title, tagline, heroImage, proofChips, href, label e.g. "02 — System").
- **State:** none.
- **Children:** `SectionLabel`, title (`h2`), tagline (`body-lg`), hero visual, `ProofChipRow`, link-out.
- **Interactions:** whole visual area and link-out are part of one navigable link to the case study; hover triggers the System Card-style fragment→grid micro-interaction even though this is a section, not a card, for visual continuity with `/systems`.
- **Responsibility:** Establish (System One) then repeat (System Two) the exact same visual grammar in a different world — the repetition is the content.

### 3.3 `SystemCard`

- **Props:** `title`, `tagline`, `image`, `proofChips: ProofChip[]`, `href`, `label`, `variant: "flagship" | "experiment"`.
- **State:** `isHovered` / `isFocused` (for the micro-interaction; can be CSS-driven via `:hover`/`:focus-visible` rather than JS state if simpler — architecturally either is acceptable, prefer CSS where possible per performance guidance).
- **Children:** media block, `SectionLabel`, `h3`, tagline, `ProofChipRow` or `StageTag` (experiment variant swaps proof chips for a single stage tag), link-out arrow.
- **Interactions:** hover/focus → border-accent-20, translateY(-2px), elevation-1, fragment→grid micro-interaction (per Design System §3.6). Entire card is one `<a>`.
- **Responsibility:** The atomic unit of `/systems` and the Experiments grid; "experiment" variant is deliberately lower visual weight (smaller media block, no proof chips, just a stage tag) so flagships and experiments are never visually confused.

### 3.4 `PatternSection`

- **Props:** none (content is fixed — the five-stage flow plus both systems' mapped icons; this section's content doesn't vary, so it's authored directly rather than passed as props).
- **State:** scroll progress (via `useScrollProgress`, wrapping Framer Motion's `useScroll` scoped to this section).
- **Children:** `SectionLabel`, headline ("Notice something?" or chosen variant), `PatternDiagram` (desktop, `lg`+) or `PatternDiagramMobile` (below `lg`), `sr-only` text equivalent of the five-stage flow.
- **Interactions:** purely scroll-driven on desktop; on mobile, standard sequential reveal-on-scroll (not scroll-linked — Design System §3.11/§6 explicit fork).
- **Responsibility:** The single emotional peak of the homepage. No other section is allowed to compete with it visually or motion-wise.

### 3.5 `PatternDiagram` / `PatternDiagramMobile`

- **Props:** `progress: MotionValue<number>` (desktop only; mobile version takes no progress prop, just renders a static sequential-reveal list of five nodes).
- **State:** derived transforms (`useTransform`) off the `progress` value — no independent state.
- **Responsibility:** Desktop: render five nodes + connectors, animate both systems' icon sets sliding into their matching node as `progress` advances 0→1. Mobile: render the same five nodes vertically, each with standard `whileInView` reveal, no connectors-as-animation (connectors can be static lines).

### 3.6 `OperatingPrinciples` ("How I Build")

- **Props:** `principles: Principle[]` (loaded from `content/principles.json` via `lib/mdx.ts` or a simple JSON import).
- **State:** none.
- **Children:** `SectionLabel`, `h2`, list of `PrincipleRow`.
- **Interactions:** none — explicitly a reading component (Design System §3.7).
- **Responsibility:** Deliver the seven principles as already-earned evidence (this section's position _after_ both flagships is load-bearing — do not reorder).

### 3.7 `PrincipleRow`

- **Props:** `number: string`, `statement: string`, `support: string`.
- **Responsibility:** One principle, one row, no interaction.

### 3.8 `ExperimentGrid` ("In Motion")

- **Props:** `experiments: ExperimentSummary[]` (4 items, loaded from `content/experiments/*.mdx` frontmatter).
- **Children:** `SectionLabel`, `h2`, grid of `SystemCard` (`variant="experiment"`).
- **Responsibility:** Confirm the pattern is a default mode, not a two-project coincidence — and do so honestly (every item must carry an accurate `StageTag`: Concept / Prototype / Planned — never "Production" for these four, per Source of Truth rules).

### 3.9 `AboutTeaser` ("The Person Behind It")

- **Props:** `photo?: string` (optional — see §4.6 gap), `teaserLine: string`.
- **Responsibility:** Curiosity hook only; must degrade gracefully (typographic-only layout) if `photo` is undefined, never substitute a stock image.

### 3.10 `ThinkingPreview` ("Currently Thinking About")

- **Props:** `entries: ThinkingSummary[]` (0–3 items).
- **Responsibility:** If `entries.length === 0`, render the explicit honest empty state ("First notes coming soon") rather than an empty grid or hidden section — the section must never look broken.

### 3.11 `Navbar`

- **Props:** none (reads `constants/nav.ts`).
- **State:** `isScrolled` (boolean, drives the transparent→surface+blur transition per Design System §3.1), `isMobileMenuOpen`.
- **Children:** logo/mark (link to `/`), nav links (`Systems`, `About`, `Thinking`, `Contact`), `MobileNavOverlay` (mounted but only visible when `isMobileMenuOpen`).
- **Interactions:** scroll listener (throttled) toggles `isScrolled`; hamburger toggles `isMobileMenuOpen`; `Escape` closes the mobile overlay; route change closes it automatically.
- **Responsibility:** Persistent wayfinding; must never block the Hero's first-impression negative space (transparent until scroll, per Design System).

### 3.12 `MobileNavOverlay`

- **Props:** `isOpen`, `onClose`.
- **Built on:** shadcn `Sheet` (or full-screen variant) for focus-trapping/portal behavior only — visual treatment is fully custom per Design System §3.1.
- **Responsibility:** Full-screen nav for `<768px`, staggered item entrance.

### 3.13 `Footer`

- **Props:** none (static content + `constants/site.ts`).
- **Children:** sign-off line, email/LinkedIn/CV links, the one true `Button` for CV, copyright.
- **Responsibility:** Identical instance mounted on every page via `app/layout.tsx` — never re-implemented per route.

### 3.14 `ThinkingCard`

- **Props:** `title`, `date`, `excerpt`, `href`.
- **Responsibility:** Atomic unit of `/thinking` index; visually distinct from `SystemCard` (no media block by default, more editorial/text-led).

---

## 4. Content Mapping

This section maps every page to the **actual files currently in the Documentation repository.** Where content doesn't exist yet, that's stated explicitly — Cursor must not invent placeholder content beyond the literal empty-state copy specified here.

### 4.1 Home

| Section              | Source content                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hero thesis/subhead  | Authored directly per Narrative spec (not sourced from a doc) — final wording from Phase 3 hero-thesis decision.                                                                                                                                                                                                                                                                                                                                                                              |
| System One preview   | `project_overview.md` (ai-coaching-system/Docs) for tagline; hero image: `ai-coaching-system/screenshots/01_dashboard_s1.jpg`.                                                                                                                                                                                                                                                                                                                                                                |
| System Two preview   | `project_overview.md` (AI-Powered Customer Handover Engine) for tagline; hero image: `01_Output_slack_test_GlobalPharma.png` (shows the concrete GlobalPharma case — stronger proof than the generic `02_slack_output.png`, which should be treated as a redundant duplicate and excluded).                                                                                                                                                                                                   |
| Operating Principles | `content/principles.json`, authored from the seven principles already cited with sources in `Design-System-Specification.md` §"Operating Principles" — each with its doc citation preserved as a code comment/note, not displayed on-site.                                                                                                                                                                                                                                                    |
| Experiments grid     | One-line descriptions sourced verbatim from each `project_overview.md`: `linkedin-studio/project_overview.md`, `nrpg/project_overview.md`, `opportunity-engine/project_overview.md`, `psychomot-ai/project_overview.md`. Stage tags: LinkedIn Studio = "Concept", NRPG = "Prototype" (doc says "Built / in progress"), Opportunity Engine = "Manual today" → map to "Concept" tag with a one-word qualifier in the tagline rather than inventing a fourth tag tier, Psychomot AI = "Planned". |
| About teaser         | Authored short line; **photo: not yet available** (see §4.6).                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Thinking preview     | `content/thinking/` is empty at launch → render the empty state, do not fabricate entries.                                                                                                                                                                                                                                                                                                                                                                                                    |

### 4.2 `/systems/training-os`

| Section                                                                                    | Source                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Header / tagline / status                                                                  | `ai-coaching-system/Docs/project_overview.md` ("Training OS — AI Coaching Operating System," status "Production Prototype — Personally used every week").                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Stack chips                                                                                | `ai-coaching-system/Docs/stack.md` (React, Next.js, TypeScript, Tailwind, Supabase, Vercel, Claude, ChatGPT).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Live link                                                                                  | `ai-coaching-system/Docs/deployment.md` — production URL listed there. **Confirm before publishing**: the URL on file resolves under a personal Vercel team path (`shtricky-s-projects24`); verify it still resolves at build time, since personal Vercel project URLs can change.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Problem / Origin                                                                           | `ai-coaching-system/Docs/why_this_project.md` (full narrative — injuries, the "what would a world-class coaching staff look like in software" reframing) + `ai-coaching-system/Docs/project_manifesto.md`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| System/Architecture                                                                        | `ai-coaching-system/architecture/system_architecture.md` + `ai-coaching-system/architecture/ai_workflow.md`. **No architecture screenshot exists on disk** — build the diagram as a custom SVG component per Design System §3.11's visual grammar, not a captured screenshot.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Design decisions                                                                           | `ai-coaching-system/architecture/design_principles.md` (the 5 named principles) + `ai-coaching-system/architecture/product_decisions.md`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| AI limitations (honesty section, recommended addition to the case study's Results section) | `ai-coaching-system/architecture/ai_limitation.md`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Proof / gallery                                                                            | `ai-coaching-system/screenshots/01_dashboard_s1.jpg` through `15_session_log.jpg` (15 files). **Note:** `ai-coaching-system/screenshots_index.md` describes a different, generic 10-item list (`01_dashboard.png` … `10_system_architecture.png`) that does not match the actual 15 files on disk — that index file is stale and should be ignored in favor of the real filenames. Recommended gallery selection and order (renamed per §7 convention): dashboard (`01_dashboard_s1.jpg`, `02_dashboard_s2.jpg`), program overview (`03_program_overview_s1.jpg`, `04_program_overview_s2.jpg`), session overview (`05_session_overview.jpg`), rehab protocol (`06_rehab_protocol.jpg`), training blocks (`07_training_blocks.jpg`), corrective module (`08_corrective_module.jpg`), snatch progression/rules (`09_snatch_progression.jpg`, `10_snatch_rules.jpg`), knee adaptation (`11_knee_adaptation.jpg`), load progression (`12_load_progression_s1.jpg`, `13_load_progression_s2.jpg`), logging (`14_logging.jpg`, `15_session_log.jpg`). Captions to be written per Design System §3.10 (what each proves, not just what it shows) — not yet authored, flagged for content pass. |
| Results / Value                                                                            | **Gap:** unlike the Handover Engine, there is no dedicated `results.md` or `lessons_learned.md` for Training OS. Synthesize from `deployment.md` ("actively maintained," "real-world usage and iteration") and `ai_limitation.md`, but recommend Allan author a short results note before this section is finalized, rather than letting Cursor infer tone/claims.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Repository link                                                                            | `ai-coaching-system/Docs/repository.md` — `https://github.com/Shtrickyy/Allan-personal-training`. Confirm visibility (doc lists it as "Private / Public — update if needed") before linking publicly.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |

### 4.3 `/systems/handover-engine`

| Section                   | Source                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Header / tagline / status | `AI-Powered Customer Handover Engine/project_overview.md` ("From fragmented CRM data to a complete Customer Success workspace in minutes," status "Functional prototype").                                                                                                                                                                                                                                                                                                                                                                                        |
| Stack chips               | `project_overview.md` / `technical_architecture.md` (n8n, Docker, OpenAI/GPT-4 Mini, Slack, Notion).                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Live link                 | None — `github_links.md` and `vercel_links.md` both confirm "no GitHub / no Vercel for this project." Do not render a live-link button for this case study; render the GitHub/Vercel proof chips as absent rather than broken links.                                                                                                                                                                                                                                                                                                                              |
| Problem / Context         | `business_case.md` + `source_material/Projet_Portfolio_Customer_success_engine.md` (richer French-language source narrative — translate/adapt key lines, notably the GlobalPharma demonstrated case: €850k, 12 countries, SAP S/4HANA + Microsoft 365 + ServiceNow, merger with a competitor).                                                                                                                                                                                                                                                                    |
| System/Architecture       | `technical_architecture.md` (full workflow: CRM → normalization → AI enrichment → quality check → risk detection → onboarding generation → executive summary → Slack → Notion). Diagram: custom SVG, same constraint as Training OS — no architecture screenshot to use directly as the diagram itself (the closest asset, `01_workflow_architecture.png`, can be used as a proof screenshot in the gallery, but the on-page interactive/diagrammatic architecture explainer should still be a built component for visual consistency with the rest of the site). |
| Lessons learned           | `lessons_learned.md` (4 named lessons + V2 ideas — strong, ready to use near-verbatim).                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Proof / gallery           | `screenshots/01_Output_slack_test_GlobalPharma.png`, `screenshots/03_project_summary.png`, `screenshots/04_executive_summary..png` _(rename to remove the duplicate dot before import — `04_executive_summary.png`)_, `screenshots/05_onboarding_plan.png`, `screenshots/06_workshops.png`, `screenshots/07_quickwins_checklist.png`. **Exclude** `02_slack_output.png` and `02_Output_slack_test_GlobalPharma.png` as redundant duplicates of the first Slack proof image, unless Allan specifically wants both shown (flag, don't decide silently).             |
| Results / Value           | `results.md` (quantitative: ~80% estimated reduction in manual onboarding prep; qualitative list already well-formed, ready to use near-verbatim).                                                                                                                                                                                                                                                                                                                                                                                                                |

### 4.4 `/systems` index

Both flagships above, expanded versions (longer framing paragraph pulled from each `business_case.md`/`why_this_project.md` rather than the shorter homepage tagline). Experiments grid: same four `project_overview.md` files as §4.1, but with the fuller one-paragraph description rather than a single line.

### 4.5 `/about`

Career narrative: synthesized from `Allan Dufas – Customer Success Operations Manager — B2B SaaS.pdf` (the CV — see §4.6 for which variant to treat as canonical) plus the Personal Manifesto (`Personal Manifesto.md`, root of Documentation). The "career as pattern" reframe (medical devices → CS → builder → sabbatical → now) is original synthesis, not lifted from any single doc — written once here as the authoritative version, then reused verbatim in case any other page needs a short career line, rather than re-summarized differently in multiple places.

### 4.6 Known content gaps — flagged, not resolved by Cursor

1. **Personal photos:** `01_profile/photos/personal_photos.md` is a template with no actual image files in that folder. `/about` and the Home "Person Behind It" section currently have **no real photo asset.** Ship with the typographic-only degraded layout (§3.9) until Allan supplies photos — do not source a stock photo.
2. **Two CV variants exist:** `Allan Dufas – Customer Success & Operations Manager - Customer Experience  Automation  Operations.pdf` and `Allan Dufas – Customer Success Operations Manager — B2B SaaS.pdf`. This spec recommends the second (it's the one already reviewed in Phase 1 and matches the site's positioning), but **Allan should confirm** which is canonical before either is renamed to `public/cv/allan-dufas-cv.pdf` and linked from Contact/Footer.
3. **`Training OS` results/lessons-learned content is thinner than `Handover Engine`'s** — see §4.2. Recommend a short authored note before final copy pass, rather than Cursor inferring claims.
4. **Stale screenshot index files** (`ai-coaching-system/screenshots_index.md` and `AI-Powered Customer Handover Engine/screenshots_index.md`) describe filenames that don't exactly match what's on disk. This spec's tables in §4.2/4.3 are the authoritative mapping going forward — the index `.md` files in the Documentation repo should eventually be updated to match, but that's a documentation-hygiene task, not a build blocker.

### 4.7 `/thinking`

Ships empty at launch (`content/thinking/` has no entries — confirmed against the Documentation repo's `04_output/` folders, which are likewise empty README placeholders). Render the explicit empty state. No fabricated articles.

---

## 5. Animation Mapping

| Section/Component                                | Entrance                                                         | Hover                                                             | Scroll                                               | Timing                                                   | Framer Motion technique                                              |
| ------------------------------------------------ | ---------------------------------------------------------------- | ----------------------------------------------------------------- | ---------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------------------- |
| Hero                                             | Fragment→grid SVG resolve, once per session                      | —                                                                 | —                                                    | ~800–1200ms total sequence, `cubic-bezier(0.16,1,0.3,1)` | `motion.svg` group animate on mount, gated by `useHeroIntroSeen`     |
| SystemPreviewSection ×2                          | Reveal-on-scroll (fade+translateY 12px)                          | Fragment→grid micro-interaction on visual element                 | —                                                    | 450ms, standard ease                                     | `whileInView`, `viewport={{ once: true, margin: "-10%" }}`           |
| PatternSection (desktop)                         | Section label/headline: reveal-on-scroll. Diagram: scroll-linked | —                                                                 | Full scroll-progress-driven node/connector animation | Driven by scroll position, not fixed duration            | `useScroll({ target: sectionRef })` + `useTransform`                 |
| PatternSection (mobile/tablet)                   | Sequential reveal per node                                       | —                                                                 | Standard `whileInView` per node, no scroll-linking   | 450ms per node, 80ms stagger                             | `whileInView` + `staggerChildren`                                    |
| OperatingPrinciples / PrincipleRow               | Reveal-on-scroll, staggered per row                              | none (reading component)                                          | —                                                    | 450ms, 70ms stagger                                      | `whileInView` + `staggerChildren`                                    |
| ExperimentGrid / SystemCard (experiment variant) | Reveal-on-scroll, staggered                                      | Border-accent-20 + translateY(-2px) + elevation-1 + fragment→grid | —                                                    | Entrance 450ms; hover 200ms                              | `whileInView` for entrance; `whileHover` + `whileFocus` for state    |
| SystemCard (flagship variant, on `/systems`)     | Reveal-on-scroll                                                 | Same as above                                                     | —                                                    | Same as above                                            | Same as above                                                        |
| ProofChip (numeric)                              | Count-up from 0, once on first view                              | none                                                              | —                                                    | 600ms, ease-out                                          | `whileInView` triggers a `useAnimate`/interval count, `once: true`   |
| AboutTeaser                                      | Reveal-on-scroll                                                 | none                                                              | —                                                    | 450ms                                                    | `whileInView`                                                        |
| ThinkingPreview / ThinkingCard                   | Reveal-on-scroll, staggered                                      | Underline/arrow shift on title link                               | —                                                    | 450ms entrance; 200ms hover                              | `whileInView` + CSS/`whileHover`                                     |
| Navbar                                           | Background fade-in (transparent→surface+blur)                    | Link color shift to accent                                        | Triggered by scroll position crossing 40px           | 200ms                                                    | CSS transition driven by `isScrolled` state, no Framer Motion needed |
| MobileNavOverlay                                 | Staggered fade-in of items on open                               | —                                                                 | —                                                    | 450ms entrance, 60ms stagger                             | `AnimatePresence` + `staggerChildren`                                |
| Footer                                           | Reveal-on-scroll                                                 | Link color shift, button hover/active per Design System §3.3      | —                                                    | 450ms / 200ms                                            | `whileInView` / CSS                                                  |
| PullQuote                                        | Reveal-on-scroll                                                 | none                                                              | —                                                    | 450ms                                                    | `whileInView`                                                        |
| SystemGallery (case study screenshots)           | Reveal-on-scroll, staggered                                      | elevation-1 on hover                                              | —                                                    | 450ms entrance, 60ms stagger; 200ms hover                | `whileInView` + `staggerChildren`; CSS hover                         |

**Global enforcement:** every `whileInView` reveal must declare `viewport={{ once: true }}` — nothing on this site replays its entrance animation on re-scroll except the count-up chips' first trigger (also `once: true`) and the scroll-linked Pattern diagram, which is inherently progress-bound rather than "entrance" based. `useReducedMotionSafe()` wraps every animated component; when reduced motion is requested, translate values collapse to 0 and durations drop to ≤150ms across the board, per Design System §5.

---

## 6. Responsive Mapping

### Navbar

- **Mobile (<768px):** Hamburger right, mark left. Tapping opens `MobileNavOverlay` full-screen.
- **Tablet (768–1023px):** Same as mobile — the inline nav doesn't appear until `md`'s upper edge has enough width for four items + mark without crowding; confirm at build time whether `md` (768px) or `lg` (1024px) is the actual switch point based on rendered nav-item width, defaulting to `md` per Design System §3.1 unless that proves too tight in practice.
- **Desktop (1024–1535px):** Inline nav, all four items + mark, transparent→blurred-surface on scroll.
- **Ultra-wide (≥1536px):** Identical to desktop — nav content stays within the `1200px` container; the bar's background (once scrolled) extends full-bleed, but nav items don't spread further apart.

### Home sections (Hero, SystemPreviewSection, OperatingPrinciples, ExperimentGrid, AboutTeaser, ThinkingPreview)

- **Mobile:** Single column, `py-16` section padding, headline sizes per Design System §1.3 mobile column.
- **Tablet:** Single column still (these are full-width narrative sections, not grids), `py-24` padding, desktop type sizes begin applying at `md`.
- **Desktop:** Single column content but with the full `1200px` container width and `py-32`–`py-40` padding; `ExperimentGrid` switches to its 2-column card grid here.
- **Ultra-wide:** Content remains capped at `1200px`, centered — extra viewport width becomes margin, not stretched content or a 3rd grid column. This is a deliberate "structure before decoration" call: wide screens get more calm, not more density.

### `/systems` index grid

- **Mobile:** Flagships stacked full-width; Experiments grid is 1 column.
- **Tablet:** Flagships stacked full-width (unchanged); Experiments grid becomes 2 columns at `md`.
- **Desktop/Ultra-wide:** Same 2-column Experiments grid — explicitly **not** 3 or 4 columns even on very wide viewports, since only 4 experiment items exist; a 4-column single row at ultra-wide would look thin and unintentional. 2 columns × 2 rows stays correct at every width above `md`.

### Case study pages (`SystemHero`, long-form sections, `SystemGallery`)

- **Mobile:** Single column throughout; gallery images stack 1-per-row.
- **Tablet:** Long-form text column unchanged (still capped at `680px` measure, now with more surrounding margin); gallery becomes 2-per-row.
- **Desktop:** Long-form column stays at `680px` (readability constraint doesn't loosen just because viewport grew); architecture diagram and gallery can use the full `1200px` container width even though prose stays narrower — this asymmetry is intentional, not a bug.
- **Ultra-wide:** Identical to desktop; extra width becomes side margin around the centered `1200px` container.

### `PatternSection`

- **Mobile/Tablet (<1024px):** Vertical sequential-reveal layout (§3.5) — five nodes stacked, no horizontal scroll-linked mechanic.
- **Desktop/Ultra-wide (≥1024px):** Horizontal scroll-linked diagram, capped at the `1200px` container width regardless of viewport — the diagram does not stretch wider on ultra-wide monitors, preserving its proportions.

### `/about`

- **Mobile:** Single column, photo (when available) full-width above text.
- **Tablet/Desktop:** Text column capped at `680px`; photo (when available) can sit as a smaller offset element rather than full-width, but this is a minor layout refinement to confirm visually once a real photo asset exists — do not over-engineer a photo layout for an asset that doesn't exist yet.
- **Ultra-wide:** Same as desktop, more margin.

### Footer

- **Mobile:** Stacked — sign-off line, then links stacked vertically, then copyright.
- **Tablet/Desktop/Ultra-wide:** Sign-off line and link row sit side-by-side within the `1200px` container; copyright right-aligned or on its own line beneath, consistent across all breakpoints above `md`.

---

## 7. Asset Pipeline

```
public/
  images/
    hero/
      hero-pattern-motif.svg
    systems/
      training-os/
        training-os-cover.jpg
        training-os-01-dashboard.jpg
        training-os-02-dashboard.jpg
        training-os-03-program-overview.jpg
        training-os-04-program-overview.jpg
        training-os-05-session-overview.jpg
        training-os-06-rehab-protocol.jpg
        training-os-07-training-blocks.jpg
        training-os-08-corrective-module.jpg
        training-os-09-snatch-progression.jpg
        training-os-10-snatch-rules.jpg
        training-os-11-knee-adaptation.jpg
        training-os-12-load-progression.jpg
        training-os-13-load-progression.jpg
        training-os-14-logging.jpg
        training-os-15-session-log.jpg
      handover-engine/
        handover-engine-cover.png
        handover-engine-01-slack-globalpharma.png
        handover-engine-02-project-summary.png
        handover-engine-03-executive-summary.png
        handover-engine-04-onboarding-plan.png
        handover-engine-05-workshops.png
        handover-engine-06-quickwins-checklist.png
    experiments/
      (no real assets yet — see §4.6)
    photos/
      (empty until Allan supplies personal photos — see §4.6)
    icons/
      apple-touch-icon.png   ← sourced from ai-coaching-system/assets/apple-touch-icon.png, reused site-wide unless Allan wants a distinct site-level icon
  cv/
    allan-dufas-cv.pdf       ← canonical filename regardless of which source PDF is chosen (§4.6)
```

**Naming convention:**

- All lowercase, kebab-case, no spaces, no special characters (this alone fixes the existing `04_executive_summary..png` double-dot issue and the CV filenames' em-dashes/ampersands, which are unsafe in URLs and should never be used as public asset filenames even though they're fine as Documentation-repo source filenames).
- Pattern: `{system-slug}-{two-digit-index}-{descriptive-slug}.{ext}`. The two-digit index preserves gallery order without depending on filesystem sort behavior across operating systems.
- One `{system-slug}-cover.{ext}` per system, used for the System Card / SystemPreviewSection hero image — distinct from the numbered gallery so the "cover" choice is explicit in code, not inferred by picking gallery item 01.
- Original source files stay untouched in the Documentation repository; the renamed copies above live only in the Portfolio repo's `public/` — the Documentation repo remains the source of truth, the Portfolio repo's `public/` is a derived, renamed distribution copy.
- Formats: keep original raster format (JPEG for photographic screenshots, PNG for UI/Slack/Notion screenshots with text) — do not pre-convert to WebP/AVIF manually; `next/image` handles format negotiation automatically at request time.
- SVGs (`hero-pattern-motif.svg`, the Pattern diagram's static OG rendering, any icon not covered by Lucide) are authored directly as SVG, never exported from a raster source.

---

## 8. Cursor Implementation Roadmap

**Milestone 1 — Project initialization**
Next.js (App Router) + TypeScript scaffold. Tailwind installed and configured with the Design System §1 tokens (colors, font families, spacing left at default, radius scale, no fully-rounded utility added to theme). Geist Sans/Mono wired via `next/font`. shadcn/ui initialized (`Sheet`, `Dialog`, `Separator` only — do not run shadcn's full component generator for things like Button/Card, since those will be custom-built). Framer Motion and Lucide installed. ESLint/Prettier configured.
_Independently testable:_ project builds and deploys to a Vercel preview showing a blank styled page using the correct font and background token.

**Milestone 2 — Layout shell**
`app/layout.tsx`, `globals.css` tokens, `PageContainer`, static (non-scroll-reactive) `Navbar` and `Footer`, all four routes scaffolded as empty pages that at least render the shell.
_Testable:_ every route resolves, nav links navigate correctly, footer present everywhere, no console errors.

**Milestone 3 — Content layer**
`types/`, `lib/mdx.ts`, `content/systems/*.mdx`, `content/experiments/*.mdx`, `content/principles.json` authored from §4's mapping. No UI yet beyond a raw, unstyled dump of parsed content to confirm the pipeline works.
_Testable:_ a test page can print every system's title/tagline/stack/proof-chip data parsed correctly from MDX frontmatter.

**Milestone 4 — Homepage, static**
All Home sections built and composed with real content, zero animation, zero hover states. Pure layout and typography per Design System.
_Testable:_ Home matches the Design System's spacing/type/color tokens exactly when inspected; no motion yet, but content and structure are final.

**Milestone 5 — Homepage motion**
Hero intro, reveal-on-scroll across all sections, hover/focus states on cards and links, the Pattern diagram (desktop scroll-linked + mobile sequential) per §5.
_Testable:_ `prefers-reduced-motion` toggled in OS settings visibly simplifies/removes the relevant animations; hero intro doesn't replay on a second visit within the same session.

**Milestone 6 — `/systems` index + Experiment grid**
`SystemCard` in both variants, full Experiments grid with accurate stage tags.
_Testable:_ all 4 experiments render with correct, honest stage tags; flagship previews link correctly to their case studies.

**Milestone 7 — Case study template + both case studies**
`SystemHero`, `SystemGallery`, architecture diagrams (custom SVG per system), full long-form content per §4.2/4.3.
_Testable:_ both case studies fully populated with real content and real (renamed) assets; no Lorem Ipsum, no placeholder screenshots.

**Milestone 8 — `/about`**
Career narrative, `PullQuote`, CV download action, graceful no-photo layout.
_Testable:_ page reads correctly and looks intentional with the photo slot absent (not broken, not obviously "missing image").

**Milestone 9 — `/thinking`**
Index + `[slug]` template, honest empty state.
_Testable:_ visiting `/thinking` with zero content files shows the designed empty state, not a blank page or error.

**Milestone 10 — `/contact` + final Footer wiring**
CV button wired to `public/cv/allan-dufas-cv.pdf`, email/LinkedIn links confirmed live.
_Testable:_ CV downloads correctly; mailto and LinkedIn links open correctly in a new tab where appropriate.

**Milestone 11 — Accessibility pass**
Keyboard-only walkthrough of every page, screen-reader pass on the Pattern diagram's `sr-only` description, contrast verification of every token pairing in actual rendered output (not just hex math), focus-visible audit.
_Testable:_ Lighthouse Accessibility ≥100 on Home and both case studies; full site navigable with no mouse.

**Milestone 12 — Performance + SEO/OG**
`generateMetadata` per route, dynamic OG image generation, image optimization audit, font preload audit, Lighthouse Performance pass.
_Testable:_ Lighthouse Performance ≥95 on Home and both case studies; correct OG image renders when any page URL is shared/unfurled.

**Milestone 13 — Deploy**
Connect GitHub repo to Vercel, confirm auto-deploy on push, attach custom domain when ready (per existing Vercel Deployment Spec).
_Testable:_ production URL live, matches the last verified preview exactly.

---

## 9. Definition of Done

| Milestone | Visual completion                                                                                      | Technical completion                                                                                    | Accessibility completion                                                                                            |
| --------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| 1         | N/A                                                                                                    | Build succeeds, fonts load, tokens present in CSS                                                       | N/A                                                                                                                 |
| 2         | Shell matches Design System spacing/color                                                              | All routes resolve, no console errors                                                                   | Landmarks (`nav`/`main`/`footer`) present                                                                           |
| 3         | N/A                                                                                                    | All content parses with correct types, no `any`                                                         | N/A                                                                                                                 |
| 4         | Home matches every token/spacing/type rule in Design System §1–2 with zero animation                   | Components composed from real content, no hardcoded copy in JSX                                         | One `<h1>` on the page, logical heading order                                                                       |
| 5         | Motion matches §5 exactly — no extra easing curves, no unlisted animation types                        | `useReducedMotionSafe` demonstrably changes behavior; hero intro session-gated                          | Reduced-motion verified with OS setting, not just code review                                                       |
| 6         | Flagship vs. experiment `SystemCard` variants are visually distinct per spec                           | Correct routing, correct stage-tag data per project                                                     | Cards keyboard-operable, focus ring visible on the whole card                                                       |
| 7         | Case studies visually match the case-study layout order exactly; no fake browser chrome on screenshots | All assets renamed/migrated per §7; no Documentation-repo file paths referenced directly from `public/` | Every screenshot has a descriptive, functional `alt` per §4                                                         |
| 8         | About reads complete and intentional without a photo                                                   | CV link present and correct                                                                             | Long-form heading hierarchy correct                                                                                 |
| 9         | Empty state matches the designed treatment, not a default Next.js "not found"-style blank              | `generateStaticParams` works once entries exist                                                         | Empty state still has a logical heading/landmark structure                                                          |
| 10        | Contact page calm, short, matches Design System                                                        | Links functional, CV path correct                                                                       | Tap targets ≥44px on mobile                                                                                         |
| 11        | N/A (this is the audit milestone)                                                                      | N/A                                                                                                     | Lighthouse Accessibility ≥100; full keyboard walkthrough passes; `sr-only` Pattern description present and accurate |
| 12        | OG previews look intentional, typographic, on-brand                                                    | Lighthouse Performance ≥95; no CLS from images/fonts                                                    | SEO ≥100; metadata present and accurate on every route                                                              |
| 13        | Production matches final approved preview pixel-for-pixel                                              | Auto-deploy confirmed working                                                                           | Same accessibility bar holds in production, re-verified post-deploy                                                 |

---

## 10. Final Cursor Prompt

Copy everything between the lines below directly into Cursor.

---

You are implementing a production website from a fully frozen specification. Three documents define this project and must be treated as binding: `Design-Specification-Working-Draft.md` (positioning, narrative, information architecture, emotional journey), `Design-System-Specification.md` (every visual token, component, motion rule, and a closed "do not" list), and this document, `Technical-Build-Specification.md` (repository structure, routes, component tree, exact content mapping to real files, animation mapping, responsive behavior, asset pipeline, and milestones).

**Stack:** Next.js (App Router) + TypeScript, Tailwind CSS (theme extended with the frozen tokens, never overridden ad hoc), shadcn/ui for unstyled structural primitives only (`Sheet`, `Dialog`, `Separator` — never for visual styling), Framer Motion for all animation, Lucide for icons, Geist Sans/Mono via `next/font`, MDX for content, deployed to Vercel.

**Philosophy you are implementing, not just a website:** Structure before decoration. Systems before features. Clarity before complexity. The site's entire job is to let a visitor discover, on their own, that every project on it solves the same underlying problem — fragmented expertise becoming a coherent decision system — through repetition of structure, not through being told. Treat this mechanic as load-bearing: section order, the timing of when Customer Success expertise becomes visible, and the placement of "The Pattern" section after both flagship case studies are not arbitrary and must not be reordered or "improved" without flagging it first.

**Build order:** follow the 13 milestones in §8 of the Technical Build Specification exactly, in order. Each milestone has a stated Definition of Done in §9 — do not proceed to the next milestone until the current one's visual, technical, and accessibility criteria are met.

**Non-negotiable rules:**

1. Never invent a design decision. If something isn't specified in the three documents — a color, a spacing value, an animation, a copy line — stop and ask rather than choosing something that "looks about right."
2. Never simplify the architecture to save time — specifically: the three-motion-type system (§5 of the Design System spec), the scroll-linked-on-desktop/sequential-on-mobile fork for the Pattern diagram, and the strict content-to-source mapping in §4 of this document are all intentional and must be implemented as specified, not approximated.
3. Always use real content from the mapping in §4. Where a gap is explicitly flagged (no personal photos yet, two CV variants needing confirmation, thin Training OS results content), implement the documented fallback/degraded state — do not fabricate a photo, do not guess which CV is canonical, do not invent results metrics that aren't in the source documents.
4. Respect the closed "do not" list in Design System §10 absolutely: no second accent color beyond the documented exception, no border-radius beyond 12px, no fully-rounded shapes, no shadow beyond the two defined elevation levels, no animation type beyond the three permitted, no more than two font weights in body contexts, no decorative icons inside System Cards/Principle Rows/Chips/Tags, no fake browser-chrome screenshot frames, no shadcn default visual styling on custom components, no removed focus rings, no scroll-jacking.
5. If at any point a requirement in one of the three documents seems to conflict with another, or a piece of content needed for a section doesn't exist in the Documentation repository, stop and ask for clarification rather than guessing or improvising a substitute. This applies especially to the four flagged content gaps in §4.6 of this document.
6. Accessibility and performance are not a final pass bolted on at the end — build them into every milestone as specified in §9. A milestone is not done if it visually matches the spec but fails its accessibility criteria.

Begin with Milestone 1.

---

_End of Technical Build Specification. This is Phase 4 of 5. Phase 5 will consolidate all four documents into the single final build-ready specification, if any further refinement is needed before handoff._
