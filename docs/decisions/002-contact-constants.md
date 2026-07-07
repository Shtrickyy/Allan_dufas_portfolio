# Decision 002 — Contact Constants and Contact Page

**Status:** Accepted  
**Date:** 2025-06-25  
**Applies to:** V1 — `constants/site.ts`, Footer, `/contact`, metadata

## Context

Email, LinkedIn, site naming, and the quiet identity label were unspecified in the specs. The Technical Build Specification defines a dedicated `/contact` route; this decision freezes the values and confirms page scope.

## Constants

These values are canonical for V1. Implement in `constants/site.ts` (and consume from Footer, Contact page, and metadata helpers).

| Key               | Value                                                  |
| ----------------- | ------------------------------------------------------ |
| Site name / title | `Allan Dufas`                                          |
| Quiet label       | `Decision Systems Architect`                           |
| Email             | `allandufas@yahoo.fr`                                  |
| Email link        | `mailto:allandufas@yahoo.fr`                           |
| LinkedIn URL      | `https://www.linkedin.com/in/allan-dufas`              |
| LinkedIn display  | `LinkedIn` (plain text link; no custom URL slug in UI) |

### Label usage

**Decision Systems Architect** is secondary and quiet — use only where a noun is structurally required:

- Meta tags / JSON-LD if added
- Footer sign-off or copyright-adjacent context
- CV or email-style contexts

Never use as the hero headline or primary page title.

## Contact page (`/contact`)

Keep `/contact` as a **dedicated minimal page** — not folded into Home or Footer alone.

**Required content:**

1. Email link (`allandufas@yahoo.fr`)
2. LinkedIn link (opens in new tab with appropriate `rel` attributes)
3. CV download action (the one true `Button` per Design System §3.3)
4. A short note — calm, one-screen, no scroll ideally (per Technical Build §2)

**Layout and tone:** Spacious, minimal animation (reveal-on-scroll only), no performative motion. Matches Design System and Technical Build Contact route spec.

## Footer

Footer on every page includes email, LinkedIn, and CV download (Button). Values must match this decision. Footer content is static + `constants/site.ts` per Technical Build §3.13.

## CV download (interim)

The CV file path is defined in `docs/decisions/003-canonical-cv.md`. Until Milestone 10:

- Create `public/cv/` directory structure
- CV Button may render but must not point at a placeholder PDF — wire the download only after the canonical file is confirmed (Milestone 10)

If UI needs to ship earlier milestones without a broken download, disable or hide the CV Button until M10, or link with a clear "coming soon" only if explicitly approved — **default: do not wire until M10**.

## Navigation

Top nav includes **Contact** as a persistent item alongside Systems, About, and Thinking. No separate top-level CV nav item (Working Draft IA decision preserved).

## Supersedes

Open items in Technical Build §2 `/contact` and §3.13 `Footer` regarding unspecified contact values.
