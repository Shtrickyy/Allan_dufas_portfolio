# Decision 001 — Hero and Pattern Copy

**Status:** Accepted  
**Date:** 2025-06-25  
**Applies to:** V1 (Home hero, OpenGraph, metadata where thesis appears)

## Context

The Working Draft offered three hero thesis options and two pattern headline candidates. The Technical Build Specification requires authored hero copy but did not freeze final wording. Implementers must not choose copy at build time.

## Decisions

### Hero thesis (display token)

> I solve the same problem, every time.

Use verbatim on the Home hero. This is the primary identity statement — a sentence, not a job title.

### Hero subhead (body-lg token)

> Turning fragmented expertise into coherent decision systems — across products, workflows, training and customer operations.

Use verbatim directly below the thesis on the Home hero.

### Pattern section headline (h2)

> Same shape, different world.

Use verbatim as the headline for `PatternSection` on the Home page.

The Working Draft alternative ("Notice something?") is rejected for V1.

## Metadata guidance

- **Page title (Home):** `Allan Dufas — I solve the same problem, every time.` (or a short variant per Technical Build §2 if length limits require trimming — prefer keeping the thesis intact).
- **Meta description:** One sentence summarizing the methodology; do not lead with a job-title string. The subhead may inform the description but should not be duplicated verbatim if a shorter line reads better.
- **OpenGraph (`app/opengraph-image.tsx`):** Render the hero thesis typographically per Technical Build §2 and Design System tokens.

## Quiet secondary label

For meta tags, footer sign-off context, and other places requiring a noun label (not a headline), use **Decision Systems Architect** — see `docs/decisions/002-contact-constants.md`.

## Supersedes

- Working Draft § "Hero thesis — three options" (options 2 and 3 rejected)
- Working Draft § Pattern title candidate "Notice something?" (rejected for V1)
- Technical Build §4.1 open line: "final wording from Phase 3 hero-thesis decision" (now closed)

## Out of scope

Hero intro animation, scroll cue, and `HeroIntro` fragment→grid behavior remain governed by Design System §5 and Technical Build §5 — this decision covers **copy only**.
