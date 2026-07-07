# Specification Precedence

This portfolio is defined by three binding documents in `docs/specs/`. When they conflict, apply the rules below — do not improvise a fourth interpretation in code.

## Documents

| Document                             | File                                               | Role                                                                               |
| ------------------------------------ | -------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Design System Specification          | `docs/specs/design_system_specification.md`        | Visual language: tokens, components, motion, accessibility, explicit "do not" list |
| Technical Build Specification        | `docs/specs/technical_build_specification.md`      | Repository layout, routes, component tree, content mapping, assets, milestones     |
| Design Specification (Working Draft) | `docs/specs/design_specification_working_draft.md` | Positioning, IA, emotional journey, narrative intent                               |

Supplementary decisions live in `docs/decisions/` and override open items in the specs where noted.

## Precedence rules

1. **Design System Specification** wins for visual design, motion, design tokens, component styling, and accessibility constraints.
2. **Technical Build Specification** wins for repository architecture, routes, content mapping, asset pipeline, and implementation order (Milestones 1–13).
3. **Design Specification (Working Draft)** wins for **narrative intent only** — positioning, section order rationale, emotional journey — unless superseded by the Design System or Technical Build Specification.

When two documents at the same precedence level appear to conflict, stop and record a new decision in `docs/decisions/` before implementing.

## Phase gate (resolved)

Development may proceed from **Milestone 1** using the current three specifications. No additional wireframes or Phase 5 consolidation are required before build starts.

Recorded decisions in `docs/decisions/` are part of the binding spec set for V1.

## V1 scope exclusions

The following are **out of scope for V1** (deferred to V2):

- Page transitions (cross-fade/slide between routes)
- Custom cursor states
- Dark mode (Design System §1.2 optional V1.1)

If the Working Draft mentions any of the above, treat those passages as aspirational — not implementation requirements.

## Typography (resolved)

**Geist Sans** (primary UI and body) and **Geist Mono** (metadata/labels only) are final. Any Working Draft references to Inter, Söhne, General Sans, or equivalent are superseded.

## Screenshot captions and alt text (resolved)

The **Technical Build Specification** §4.2, §4.3, and §7 asset mapping is authoritative for gallery selection, order, renaming, and caption authoring.

Stale `screenshots_index.md` files in the Documentation repository must be **ignored**.

Design System references to "screenshot-index documentation" mean the Technical Build asset mapping, not the stale index files.

## Related files

- `docs/decisions/001-hero-copy.md` — hero thesis, subhead, pattern headline
- `docs/decisions/002-contact-constants.md` — email, LinkedIn, site metadata, contact page
- `docs/decisions/003-canonical-cv.md` — CV path, wiring timeline, Milestone 10 gate
