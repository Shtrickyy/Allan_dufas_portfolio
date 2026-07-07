# Allan Dufas Portfolio — Design System Specification (Frozen)

This document is the single source of truth for implementation. It contains no open decisions. Where a previous document offered options, this document picks one. Every rule below exists to enforce one governing law:

> **Structure before decoration.**

If a future decision isn't explicitly permitted here, the default answer is no — add it to this document first, don't invent it in code.

---

## 1. Design Tokens

### 1.1 Color — Light mode (default)

| Token               | Hex                                | Usage                                                                                                                |
| ------------------- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `background`        | `#F6F5F1`                          | Page background. Warm off-white, never pure white.                                                                   |
| `surface`           | `#FFFFFF`                          | Cards, elevated containers, nav background on scroll.                                                                |
| `border`            | `#E5E3DC`                          | Hairlines, card borders, dividers. 1px only.                                                                         |
| `ink-primary`       | `#17161C`                          | Headlines, body text. Soft black, never pure `#000`.                                                                 |
| `ink-secondary`     | `#65636C`                          | Supporting text, captions, metadata. Verified ≥4.5:1 on `background`.                                                |
| `accent`            | `#3B4170`                          | The single accent. Links, active states, the convergence point in diagrams, the one true button (CV/Contact action). |
| `accent-hover`      | `#2B2F54`                          | Hover/active state of accent.                                                                                        |
| `accent-on-dark-bg` | n/a (light mode doesn't need this) | —                                                                                                                    |
| `error`             | `#B3261E`                          | Form validation only. Never used decoratively, never used elsewhere on the site.                                     |

### 1.2 Color — Dark mode (optional V1.1, framed as "alternate system state," not an accessibility afterthought)

| Token           | Hex       |
| --------------- | --------- |
| `background`    | `#14131A` |
| `surface`       | `#1D1C24` |
| `border`        | `#2C2B34` |
| `ink-primary`   | `#F3F2EE` |
| `ink-secondary` | `#A09EA8` |
| `accent`        | `#8B91D9` |
| `accent-hover`  | `#A4A9E3` |
| `error`         | `#E0786F` |

**Rule:** Exactly one accent color exists in each mode. No second accent, no gradients, no color-coded categories (e.g. no red/yellow/green status dots). Status/stage tags (Experiments section) are differentiated by `ink-secondary` vs `accent` border weight only — never by hue.

### 1.3 Typography

**Typeface:** Geist Sans (primary, all UI and body text) + Geist Mono (metadata accent only). Rationale: free, variable, grotesk, built by Vercel for exactly this register, loads cleanly via `next/font` with zero external request — directly reinforces "structure before decoration" at the tooling level.

| Token                                      | Desktop         | Mobile          | Weight | Line-height | Tracking           |
| ------------------------------------------ | --------------- | --------------- | ------ | ----------- | ------------------ |
| `display` (hero thesis)                    | 64px / 4rem     | 40px / 2.5rem   | 500    | 1.05        | -0.02em            |
| `h1` (page titles)                         | 48px / 3rem     | 32px / 2rem     | 500    | 1.1         | -0.01em            |
| `h2` (section titles)                      | 32px / 2rem     | 24px / 1.5rem   | 500    | 1.2         | -0.01em            |
| `h3` (card/subsection titles)              | 20px / 1.25rem  | 18px / 1.125rem | 500    | 1.3         | normal             |
| `body-lg` (intro paragraphs, case studies) | 18px / 1.125rem | 16px / 1rem     | 400    | 1.6         | normal             |
| `body` (default)                           | 16px / 1rem     | 16px / 1rem     | 400    | 1.6         | normal             |
| `body-sm` (captions)                       | 14px / 0.875rem | 14px / 0.875rem | 400    | 1.5         | normal             |
| `label` (mono, metadata)                   | 12px / 0.75rem  | 12px / 0.75rem  | 500    | 1.4         | +0.08em, uppercase |

**Rules:**

- Maximum two weights in body copy contexts: 400 and 500. No 600/700/800 anywhere except as a single fallback if 500 fails a legibility check at `display` size during build — escalate to 600 only then, and only for that one element.
- `label` tokens always use Geist Mono. Every other token uses Geist Sans. No third typeface, ever.
- Long-form text (About, case study prose, Thinking articles) is constrained to a `max-width: 680px` measure for readability, regardless of container width.

### 1.4 Spacing

Use Tailwind's default spacing scale as-is — no custom spacing tokens. It already maps cleanly to an 4px-based grid:

| Tailwind  | px      | Semantic use                               |
| --------- | ------- | ------------------------------------------ |
| `1`       | 4       | Icon-to-label gaps                         |
| `2`       | 8       | Tight internal gaps (chip padding)         |
| `4`       | 16      | Component internal padding                 |
| `6`       | 24      | Card padding, grid gaps                    |
| `8`       | 32      | Gaps between related elements              |
| `16`      | 64      | Mobile section padding (`py-16`)           |
| `24`      | 96      | Tablet section padding (`py-24`)           |
| `32`–`40` | 128–160 | Desktop section padding (`py-32 lg:py-40`) |

**Container:** max-width `1200px`, centered. Horizontal padding: `px-6` mobile, `px-8` tablet, `px-12` desktop.

### 1.5 Radius

| Token       | Value | Used on                          |
| ----------- | ----- | -------------------------------- |
| `radius-sm` | 4px   | Chips, badges, tags              |
| `radius-md` | 8px   | Cards, screenshot frames, inputs |
| `radius-lg` | 12px  | Large media containers only      |

**Rule:** Nothing is ever fully rounded (`9999px`). Pills read as decorative; this system reads as structural. No exceptions, including avatars (use `radius-md`, square-cropped, not circular).

### 1.6 Elevation

| Token         | Value                            | Used on                            |
| ------------- | -------------------------------- | ---------------------------------- |
| `elevation-0` | none                             | Default resting state of all cards |
| `elevation-1` | `0 2px 8px rgba(23,22,28,0.06)`  | Card hover, dropdown/menu open     |
| `elevation-2` | `0 8px 24px rgba(23,22,28,0.10)` | Mobile nav overlay, modal/dialog   |

No glow, no colored shadows, no blur-heavy "soft UI" shadows.

---

## 2. Layout System

- **Grid:** 12-column on desktop (≥1024px), collapsing to a single-column stack below `md` (768px). System cards on `/systems` use a 2-column grid (`grid-cols-1 md:grid-cols-2`), gap `24px`.
- **Breakpoints (Tailwind defaults, unmodified):** `sm` 640 / `md` 768 / `lg` 1024 / `xl` 1280 / `2xl` 1536.
- **Vertical rhythm:** every top-level section uses identical vertical padding (see §1.4). No section is allowed a bespoke padding value — this consistency is itself part of the "structure" message.
- **Section anatomy (mandatory order for every homepage/index section):** `label` (mono, e.g. "02 — System") → `h2` or section headline → content → (optional) link-out. Never skip the label; it is the visual metronome of the site.

---

## 3. Component Library

Each component below is specified with default / hover / focus-visible / active / disabled states where applicable. Build these as custom components; **do not** style them by overriding shadcn defaults — shadcn primitives (below) are for unstyled structural behavior only (overlay positioning, focus trapping, portal logic), not for visual treatment.

### 3.1 Navigation Bar

- Height: `72px` desktop / `64px` mobile. Sticky, `position: fixed; top: 0`.
- Background: transparent at scroll position 0; transitions to `surface` at 85% opacity + `backdrop-blur(12px)` + `border-bottom: 1px solid border` once scrolled past `40px`. Transition: `200ms ease-out`.
- Content: mark/name (links to `/`) left; `Systems` `About` `Thinking` `Contact` right, equal visual weight, `body` size, `ink-secondary` default → `ink-primary` on hover, `accent` when active route.
- **Mobile (<768px):** nav items collapse into a hamburger icon (Lucide `menu`/`x`, 20px, 1.5px stroke). Tap opens a full-screen overlay (shadcn `Sheet`, side="top" or full-screen variant) on `surface` background, `elevation-2`, nav items at `h2` size, staggered fade-in (60ms stagger via Framer Motion).
- Focus-visible: `2px solid accent`, `2px offset`, on every nav item and the mark.

### 3.2 Link (primary text link)

- Default: `ink-secondary` or `ink-primary` depending on context (body links use `ink-primary` with underline; nav/meta links use `ink-secondary`).
- Hover: color → `accent`; if the link ends in an arrow glyph ("View the system →"), the arrow translates `4px` on the x-axis, `200ms ease-out`.
- Focus-visible: `2px solid accent`, `2px offset`, rounded to match nearest token (`radius-sm`).
- Active: `accent-hover`.

### 3.3 Button (reserved for exactly one use: CV download / primary Contact action)

- This is the only filled, button-shaped element on the entire site. Using it anywhere else dilutes its meaning — reserve it.
- Default: `bg-accent`, `text` white/`#FFFFFF`, `radius-sm`, padding `12px 20px`, `body` weight 500.
- Hover: `bg-accent-hover`.
- Active: `scale(0.98)`, `100ms ease-out`.
- Focus-visible: `2px solid accent`, `2px offset`, offset ring sits outside the button (not inset).
- Disabled (not expected in V1, define for completeness): `opacity 40%`, `cursor: not-allowed`.

### 3.4 Proof Chip

- Rectangular, `radius-sm`, `1px solid border`, `bg-surface`, padding `4px 10px`, `label` typography token.
- No fill color, no icon. Text only (e.g. "Production", "~80% reduction", "Next.js").
- Numeric chips (metrics) count up from 0 once on first scroll-into-view (`whileInView`, `once: true`), 600ms, ease-out — never repeats on re-scroll.

### 3.5 Stage Tag (Experiments only)

- Same shape/size as Proof Chip. Two states only:
  - **Shipped/Production:** `1px solid accent`, text `accent`.
  - **Concept / Prototype / Planned:** `1px solid border`, text `ink-secondary`.
- No third visual tier, no color beyond these two — honesty about project stage is communicated through the _word itself_ ("Concept", "Prototype", "Planned", "Production"), not through a color-coded traffic light.

### 3.6 System Card

- Container: `bg-surface`, `1px solid border`, `radius-md`, overflow hidden.
- Structure top-to-bottom: media (screenshot/visual, aspect ratio `4:3`, `object-cover`) → padding `24px` containing: `label` → `h3` title → one-line framing (`body-sm`, `ink-secondary`) → proof chip row (`gap-2`, wraps) → link-out ("View the system →", bottom-aligned).
- Hover: `border-color` → `accent` at 20% mix (`color-mix` or pre-computed token `border-accent-20: #C7CADC`), `translateY(-2px)`, `elevation-1`. Transition `250ms ease-out`, transform + box-shadow only (never animate width/height/layout properties).
- Hover also triggers the fragment→grid micro-interaction (§5).
- Focus-visible (card is a single `<a>` wrapper): `2px solid accent`, `4px offset`, applied to the whole card, not just the inner link text.

### 3.7 Principle Row

- Full-width row, `border-bottom: 1px solid border`, padding `32px 0` (`40px` desktop).
- Grid: `grid-cols-[40px_1fr]` desktop (number column + content column), stacked (number above content) on mobile.
- Number: `label` token, `accent` color.
- Statement: `h3` weight, `ink-primary`.
- Supporting line: `body-sm`, `ink-secondary`, max-width `560px`.
- No hover state — this is a reading component, not an interactive one.

### 3.8 Section Label

- `label` token, `ink-secondary`, sits directly above every `h1`/`h2`, e.g. `02 — System`. Always two-digit index + em-dash + name. This numbering is sequential per page, not global — resets per page context.

### 3.9 Pull-quote / Manifesto Block

- `h2`-scale text, `ink-primary`, left border `4px solid accent`, padding-left `24px`, max-width `640px`.
- Used **at most once per page.** If a page has no manifesto-grade line worth this treatment, omit the component rather than force one in.

### 3.10 Screenshot Frame

- `1px solid border`, `radius-md`, `elevation-0` default → `elevation-1` on hover (case study galleries only, not static placements).
- No fake browser chrome (no traffic-light dots, no URL bar mockup). Crop screenshots cleanly to content; the frame is the only decoration permitted.
- Caption below, `body-sm`, `ink-secondary`, describes what the screenshot proves (per the existing screenshot-index documentation), not just what it shows.

### 3.11 The Pattern Diagram

- Custom SVG component, five nodes connected by straight or gently curved connector lines (no organic/blob curves — connectors are geometric).
- Desktop: horizontal layout, scroll-progress-driven (see §6). Both systems' icon sets slide along the connectors into their matching node as the user scrolls through the section's viewport height.
- Mobile: **do not** attempt the horizontal scroll-linked version. Replace with a simplified vertical stack — five nodes top-to-bottom, each fading in sequentially on scroll (`whileInView`, standard reveal, not scroll-linked). This is a deliberate content fork, not a fallback to apologize for.
- Accessibility: include a visually-hidden (`sr-only`) text description of the five-stage flow adjacent to the SVG, since this diagram carries the site's central idea and cannot be screen-reader-invisible.

### 3.12 Footer

- Identical on every page. `bg-surface` or `bg-background` (match the page, no hard seam), `border-top: 1px solid border`, padding `64px` vertical.
- Content: one quiet sign-off line (e.g. the manifesto fragment) → three links (email, LinkedIn, CV-download-as-Button §3.3) → copyright/year in `label` token.

---

## 4. Iconography

- **Library:** Lucide (pairs natively with shadcn/ui, consistent 1.5–2px stroke, no filled/duotone variants used).
- **Stroke weight:** 1.5px fixed across the entire site.
- **Sizes:** 16px (inline with `body-sm`/`label` text), 20px (nav, standalone UI).
- **Color:** always inherits current text color — `ink-secondary` by default, `accent` on hover/active where the parent is interactive. Icons never carry their own independent color.
- **Permitted icon usage:** menu/close (mobile nav), arrow-right (link-out affordance), external-link (outbound links in Thinking/About), download (CV), mail and a generic "link" glyph for LinkedIn in the footer.
- **Forbidden:** icons inside System Cards, Principle Rows, Proof Chips, or Stage Tags. Those stay typographic per §3.4–3.7. No icon ever substitutes for a diagram — the only diagram on the site is The Pattern (§3.11).

---

## 5. Motion System

**Three permitted motion types. Nothing else.**

1. **Reveal-on-scroll** — `opacity: 0→1`, `translateY: 12px→0`. Trigger: Framer Motion `whileInView`, `viewport={{ once: true, margin: "-10%" }}`. Duration `450ms`, easing `cubic-bezier(0.16, 1, 0.3, 1)`. Used for: every section entrance, System Cards, Principle Rows, chips.
   - **Stagger:** grouped children (chip rows, list items, nav overlay items) stagger `60–80ms` via `staggerChildren`.
2. **State-change feedback** — hover/press/focus transitions. Duration `150–250ms`, easing `ease-out` (CSS default cubic-bezier(0,0,0.2,1) is acceptable here — does not need the custom curve). Used for: links, buttons, card hover, chip hover.
3. **Scroll-linked progress** — reserved exclusively for The Pattern diagram (§3.11) on desktop. Implemented via Framer Motion `useScroll` (scoped to the section, `target` ref) + `useTransform`, driving `opacity`/`translate`/`pathLength` of diagram elements directly off scroll progress (0→1 within the section's viewport entry/exit). **No scroll-jacking, no `position: sticky` pin-and-hold beyond the section's natural height, no native-scroll override.** The user must retain full native scroll control at all times — this is a hard constraint, not a preference.

**Global rules:**

- Hero fragment→grid intro animation plays once per session: gate with `sessionStorage.getItem('hero_intro_seen')`. If set, render the settled end-state immediately with no animation.
- Respect `prefers-reduced-motion`: use Framer Motion's `useReducedMotion()` hook. When true — disable reveal-on-scroll translate (keep opacity fade only, ~150ms), disable the hero intro animation entirely (render end-state), and reduce The Pattern to instant-step reveals tied to scroll position rather than smooth interpolation.
- No parallax. No autoplay video. No infinite-loop decorative animation anywhere (nothing should move on a static, non-hovered, non-scrolling screen).

---

## 6. Responsive Behavior

- **Approach:** mobile-first Tailwind (base classes = mobile; override with `md:`/`lg:`/`xl:`).
- **Nav:** hamburger + full-screen overlay below `md`; horizontal inline nav at `md`+.
- **System Cards grid:** 1 column mobile → 2 columns `md`+. Homepage flagship previews are always full-width stacked sections at every breakpoint (they are sections, not grid items).
- **The Pattern:** horizontal scroll-linked desktop version (`lg`+) vs. vertical sequential-reveal mobile version (below `lg`) — see §3.11. Tablet (`md`–`lg`) uses the mobile vertical version; do not attempt an intermediate horizontal layout.
- **Typography:** scales per §1.3 table at the `md` breakpoint (mobile sizes below `md`, desktop sizes at `md` and above).
- **Touch targets:** minimum `44×44px` for all mobile nav items, chips that are tappable, and footer links.
- **Images:** `next/image` with explicit `width`/`height` (or `fill` + sized parent) at every breakpoint to prevent layout shift; `sizes` attribute tuned per component (full-bleed hero vs. card-width screenshot).

---

## 7. Accessibility Rules

- **Contrast:** body text ≥4.5:1 against its background; large text (`h1`/`h2`/`display`) ≥3:1. Verify `ink-secondary` and `accent`-as-text against both `background` and `surface` with a contrast checker during build — the tokens in §1.1 are designed to clear these thresholds but must be confirmed against actual rendered output, not assumed from hex math alone.
- **Focus states:** never removed. Every interactive element (links, cards-as-links, buttons, nav items, chips if tappable) gets a visible `2px solid accent` outline with `2–4px` offset on `:focus-visible`. Do not use `outline: none` without an equivalent custom replacement.
- **Semantic HTML:** one `<h1>` per page; logical heading hierarchy in case studies and Thinking articles (no skipped levels, no headings chosen for size rather than structure); `<nav>`, `<main>`, `<footer>` landmarks present on every page.
- **Alt text:** every screenshot has a functional, descriptive `alt` (what it proves, per the existing screenshot-index documentation) — never filename-style or "screenshot1.png".
- **Reduced motion:** honored sitewide per §5.
- **Keyboard navigation:** entire site operable via Tab/Enter/Escape with no mouse-only interaction. Card hover micro-interactions (fragment→grid) must have a no-op-safe focus equivalent — i.e. the hover effect can simply also fire on `:focus-visible`, it does not need a separate design.
- **The Pattern diagram:** must ship a screen-reader-accessible text equivalent (`sr-only` block) describing the five-stage flow, since it is the conceptual core of the site and cannot rely on visuals alone.

---

## 8. Stack & Code Recommendations

| Layer                 | Choice                                                                                                                                             | Why                                                                                                                                                                                                                  |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework             | Next.js (App Router), TypeScript                                                                                                                   | Already specified in the existing Cursor/Vercel build docs; matches deployment target.                                                                                                                               |
| Styling               | Tailwind CSS, theme **extended** (not overridden) with the tokens in §1                                                                            | Keeps Tailwind's utility ergonomics while enforcing the frozen token set — no ad-hoc hex values anywhere in component code.                                                                                          |
| Structural primitives | shadcn/ui — but **only** for unstyled behavior: `Sheet` (mobile nav overlay), `Dialog` (if a contact modal is ever added), `Separator` (hairlines) | shadcn's default visual styling (rounded, shadowed) does not match this system and should not be used for System Cards, Principle Rows, or the Pattern diagram — those are custom components built directly to spec. |
| Animation             | Framer Motion (`motion` package)                                                                                                                   | Covers all three permitted motion types (§5) including scroll-linked transforms via `useScroll`/`useTransform`. No GSAP, no three.js, no Lottie.                                                                     |
| Icons                 | Lucide React                                                                                                                                       | Matches shadcn's icon convention; consistent stroke weight out of the box.                                                                                                                                           |
| Fonts                 | Geist Sans + Geist Mono via `next/font` (local or Vercel's `geist` npm package)                                                                    | Self-hosted, zero external request, `font-display: swap`.                                                                                                                                                            |
| Content               | MDX for `/thinking` entries and long-form case study prose, colocated `.mdx` files (no CMS for V1)                                                 | Matches the existing documentation philosophy: "Markdown is the source of truth." Avoids overengineering per the existing Vercel Deployment Spec.                                                                    |
| Deployment            | Vercel, GitHub-connected, auto-deploy on push                                                                                                      | Already specified upstream.                                                                                                                                                                                          |

**Constraint:** no UI library beyond shadcn's unstyled primitives, no CSS-in-JS runtime library (Tailwind only), no animation library beyond Framer Motion.

---

## 9. Performance Guidelines

- **Targets:** Lighthouse Performance ≥95, Accessibility ≥100, Best Practices ≥95, SEO ≥100 on `/` and both case study pages.
- **Images:** `next/image` mandatory everywhere; AVIF/WebP via Vercel's image optimization; explicit dimensions to prevent CLS; lazy-load everything below the fold (the hero's first visual is the only eager-loaded image).
- **Fonts:** self-hosted via `next/font`, `display: swap`, preload only the weights used above the fold on first paint (Geist Sans 400 + 500).
- **JS budget:** Framer Motion only for animation; The Pattern diagram is SVG + CSS/transform-driven, never canvas/WebGL — keeps the heaviest visual moment on the site cheap to render, including on older mobile devices.
- **Layout stability:** animate only `opacity` and `transform` — never properties that trigger layout recalculation (`width`, `height`, `top`, `left`). Reserve final layout space for count-up proof-chip numbers before the animation starts.
- **Code splitting:** rely on Next.js App Router's automatic per-route splitting; avoid importing case-study-only or Thinking-only heavy logic into shared layout files.
- **Third-party scripts:** analytics (if any) loaded via `next/script` with `strategy="afterInteractive"` or `"lazyOnload"` — never blocking.

---

## 10. Implementation Constraints — explicit "do not" list

These exist so Cursor has zero ambiguity and zero room to improvise:

1. Do not introduce a second accent color. The only second color permitted anywhere on the site is `error` (§1.1), used exclusively for form validation states.
2. Do not use `border-radius` greater than `12px` anywhere. Do not use fully rounded/pill shapes for any element, including avatars, badges, or buttons.
3. Do not add any shadow beyond `elevation-1` / `elevation-2` (§1.6). No colored shadows, no glow/blur "soft UI" effects.
4. Do not animate anything outside the three permitted motion types in §5. No parallax, no scroll-jacking, no autoplaying video, no infinite decorative loops.
5. Do not use font weights beyond 400/500 in body contexts, or introduce a third typeface.
6. Do not add icon decoration inside System Cards, Principle Rows, Proof Chips, or Stage Tags.
7. Do not build a fake browser-chrome frame (traffic-light dots, mock URL bar) around any screenshot.
8. Do not use shadcn/ui's default visual styling for any custom component (System Card, Principle Row, Pattern diagram, Pull-quote) — use it only for the unstyled structural primitives listed in §8.
9. Do not skip the `sr-only` text equivalent for The Pattern diagram, and do not remove any `:focus-visible` ring without a replacement.
10. Do not deviate from the spacing/type/radius/color tokens in §1 with one-off inline values. If a value isn't in this document, it doesn't exist yet — escalate before building it.

---

_This document is frozen pending Allan's review. Next: Phase 4 — detailed wireframes for every section and component specified here, with no remaining visual decisions left to improvise._
