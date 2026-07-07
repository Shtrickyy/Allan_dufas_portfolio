# Decision 003 — Canonical CV

**Status:** Accepted (path and timeline); **CV file choice pending Allan confirmation**  
**Date:** 2025-06-25  
**Applies to:** V1 — `public/cv/`, Contact page, Footer, Milestone 10

## Context

Two CV PDF variants exist in the Documentation repository (`Documentation/01_profile/cv/`):

1. `Allan Dufas – Customer Success & Operations Manager - Customer Experience  Automation  Operations.pdf`
2. `Allan Dufas – Customer Success Operations Manager — B2B SaaS.pdf`

The Technical Build Specification §4.6 recommends the second (B2B SaaS) as better aligned with site positioning, but requires Allan to confirm before publishing.

## Decisions

### Public path (fixed regardless of source file)

```
public/cv/allan-dufas-cv.pdf
```

- Lowercase, kebab-case, URL-safe — per Technical Build §7 naming convention.
- Source PDF em-dashes and special characters must never appear in the public filename.

### Before Milestone 10

1. **Create the folder path** `public/cv/` during scaffold/asset setup.
2. **Do not copy or wire the final CV file** until Allan confirms which source PDF is canonical.
3. **Do not link** Footer or Contact CV Buttons to a placeholder or wrong variant.

Milestones 1–9 may proceed without a live CV download.

### Milestone 10 gate

Before completing Milestone 10 (Contact + final Footer wiring):

- [ ] Allan confirms canonical source: B2B SaaS variant (recommended) or Customer Experience variant
- [ ] Copy chosen PDF to `public/cv/allan-dufas-cv.pdf`
- [ ] Wire CV Button on `/contact` and Footer to that path
- [ ] Verify download works in preview and production

### Recommended choice (non-binding until confirmed)

**`Allan Dufas – Customer Success Operations Manager — B2B SaaS.pdf`** — matches Phase 1 positioning review cited in Technical Build §4.6.

Allan must explicitly confirm; implementers must not assume.

## Related content

About page career narrative may synthesize from the canonical CV once chosen (Technical Build §4.5). Until confirmation, About copy may be drafted from Documentation sources but should be reconciled against the final CV at or before Milestone 8.

## Training OS results (related V1 fallback)

Separate from CV, Training OS case study **Results / Value** section for V1 uses this documented fallback — do not invent metrics:

> Production prototype, actively used and iterated weekly.

Sourced from Technical Build §4.2 gap guidance and `deployment.md` themes. A fuller results note may be authored later; V1 must not infer quantitative claims.

## Supersedes

- Technical Build §4.6 item 2 (open CV choice) — timeline and path closed; file choice remains open until Allan confirms at M10
