# Design System

The as-built reference for how the site looks: the tokens, the primitives, and
the rules that keep them consistent. It describes what is in the code today —
the *plan* that produced it lives in
[home-page-makeover.md](./dev/home-page-makeover.md) (§4 look and feel, §5
primitives), which stays as the rationale and is not updated as things ship.

Everything visual is defined in one file,
[`globals.css`](<../apps/frontend/src/app/(website)/globals.css>), and consumed
through Tailwind v4 utilities or a primitive in
[`components/primitives/`](../apps/frontend/src/components/primitives/).

---

## Two visual languages

The site is mid-migration and both are live:

| | **Makeover** (the direction) | **Legacy shadcn** |
|---|---|---|
| Radius | `--radius-sharp` (2px) | `--radius` (0.625rem) |
| Elevation | none — hairlines do the separating | `shadow-lv1`…`shadow-lv5` |
| Headings | weight 500, negative tracking | `font-bold` / `font-extrabold` |
| Labels | mono, uppercase, tracked (`<Eyebrow>`) | sentence-case sans |
| Buttons | `variant="solid"` / `"outlineGhost"` | `variant="default"` / `"outline"` / `"ghost"` |
| Width | `max-w-wrap` (960px) + `px-6` | Tailwind `container` |

New work uses the makeover language. The legacy variants stay because sections
and pages not yet converted still render them — do not delete a variant to
"clean up" until nothing references it.

---

## Color

Tokens are authored in `oklch()` on a **warm neutral** ramp (a small chroma on
the green-yellow hue) so the amber accent belongs to the palette rather than
sitting on top of it. Every token is defined twice — once in `:root`, once in
`.dark` — and components read the token, never a `dark:` variant.

| Role | Token | Utility | Used for |
|---|---|---|---|
| Page base | `--background` | `bg-background` | the page |
| Raised fill | `--card` | `bg-card` | cards, form fields, opaque cells in a hairline grid |
| Hairline | `--border` | `border-border` | section rules, grid gaps — **the** structural device |
| Stronger rule | `--border-strong` | `border-border-strong` | chips, ghost buttons, hover borders |
| Body text | `--foreground` | `text-foreground` | headings, body |
| Secondary text | `--muted-foreground` | `text-muted-foreground` | paragraphs, captions |
| Faint text | `--faint-foreground` | `text-faint-foreground` | eyebrows, chips, `/01` counters |
| Accent | `--primary` | `text-primary`, `bg-primary` | links, focus, one accent per view |

Rules that keep the two themes honest:

- **`--muted-foreground` carries real prose** and must clear 4.5:1 on
  `--background`. **`--faint-foreground` is 11–13px non-essential labels only**,
  floor 3:1 — never put anything a reader must read in it.
- **The accent is not the same value in both themes.** Amber that reads at 7:1
  on the dark ground is ~2:1 on the light one. As a *button background* it takes
  `--background` as its foreground in both.
- **Hairlines must survive both themes.** At 1px they are what holds the layout
  together; if `--border` washes out on light, the page collapses into floating
  text. Check on a real screen, not in devtools.
- A new color goes in **both** `:root` and `.dark`, and into the `@theme inline`
  block only if a component needs a Tailwind utility for it. Values read solely
  from CSS (`@utility` shadows, the crystal form rules) skip that mapping.

---

## Typography

Two families, both loaded with `next/font` in the locale layout — never a
runtime `@import`.

| Role | Family | Runtime var | Utility |
|---|---|---|---|
| Sans | Archivo 400/500/600 | `--font-archivo` | `font-sans` |
| Mono | IBM Plex Mono 400/500 | `--font-ibm-plex-mono` | `font-mono` |

> `--font-sans` / `--font-mono` are `@theme inline` tokens: they only exist
> inlined into generated utilities. Plain CSS that needs the family must use
> `var(--font-ibm-plex-mono)`, the variable `next/font` actually sets — see the
> form-label rules in `globals.css`.

Scale as built:

| Element | Style |
|---|---|
| Page `h1` | `text-4xl md:text-5xl font-medium tracking-[-0.02em]` (`<PageHeader>`) |
| Section `h2` | `text-4xl font-medium tracking-[-0.01em]` (`<SectionHeader>`) |
| Body | 15–17px, `leading-[1.65]`, `text-muted-foreground`, measure capped (`max-w-[40ch]`…`[55ch]`) |
| Eyebrow | `<Eyebrow>`: mono, uppercase, `tracking-[0.08em]`, `text-faint-foreground` |
| Form label | the same treatment at 12px, from CSS rather than the component |

Headings are **weight 500, not bold**. That single choice accounts for most of
the tonal difference between the two languages.

---

## Geometry and layout

- **Radius 2px** (`rounded-sharp`) on the makeover path. `--radius` stays at
  `0.625rem` site-wide because shadcn primitives derive their scale from it —
  never reset it globally.
- **Width:** `max-w-wrap` (`--container-wrap: 960px`) with `px-6`, passed to
  `Section` as `container={false}` plus
  `containerClassName="mx-auto w-full max-w-wrap px-6"`. Mismatched section
  widths are the most visible failure mode; copy the line rather than inventing
  a width.
- **Vertical rhythm** belongs to
  [`Section`](../apps/frontend/src/components/page-sections/section.tsx): one
  `my-50` above and below, a `min-h-100` floor. Only heroes override it. The
  floor is fixed px, not a viewport unit, so a mobile URL bar cannot reflow the
  page and invalidate the `ParticleStage`'s cached section bounds.
- **Breakpoints:** the mockups break at **720px** (home, lab) and **640px**
  (projects), which is why you will see `min-[721px]:` alongside Tailwind's
  `sm:`.
- **Hairline grids** use the 1px-gap-over-border-background technique, wrapped
  in [`<HairlineGrid>`](../apps/frontend/src/components/primitives/HairlineGrid.tsx) —
  don't hand-roll it.

---

## Surfaces

Three ways for content to sit on the page:

| Surface | How | When |
|---|---|---|
| Bare | hairline rules, no fill | the default — most sections |
| Flat card | `<Card>` (`bg-card border shadow-lv1`) | legacy path |
| Glass | `<Card variant="crystal">` / `<CrystalSurface>` | over the `ParticleStage` or imagery |

The glass treatment has its own document —
[liquid-crystal.md](./liquid-crystal.md) — covering the filter, the layer
stack, the header's scroll transition, and forms on glass. Two things about it
belong here: it is **expensive to composite**, so it stays a handful of surfaces
per view; and it only reads as glass over something, so it never goes on a flat
background.

**No shadows on the makeover path.** `shadow-lv1`…`lv5` are the legacy
neo-skeuomorphic utilities. `shadow-crystal` is not an exception to the rule so
much as a different thing — it is the glass's own drop shadow, tucked under the
pane by a negative spread rather than haloing it.

---

## Motion

Deliberately sparse. Three tiers, and nothing else:

| Tier | Timing | Where |
|---|---|---|
| Hover / focus | `0.15s`, color and border-color only | links, buttons, form fields |
| State change | `500ms ease-out` | the header's glass fade |
| Entrance | `<Reveal>` — 16px travel on a soft out-expo | section content, staggered by `delay` |

- `<Reveal>` is the only entrance animation; it honours
  `prefers-reduced-motion` through `useReducedMotion`. Do not hand-roll
  `animate-in fade-in slide-in-from-bottom` on a section.
- Smooth scrolling (Lenis, via `SmoothScrollProvider`) is **not constructed at
  all** under reduced motion; the native offset is mirrored instead and
  everything downstream keeps working.
- Focus is a `2px solid var(--primary)` outline at `2px` offset on the makeover
  button variants — a border/outline swap, not a shadcn ring.

---

## Primitives

Built once, in [`components/primitives/`](../apps/frontend/src/components/primitives/),
because each appears across several pages.

| Primitive | What it is |
|---|---|
| `<Eyebrow>` | The mono/uppercase/tracked label, ~20× across the site |
| `<SectionHeader>` | Section `h2` + bottom hairline + eyebrow/action row |
| `<PageHeader>` | The `h1` counterpart for a listing page, rule at the bottom carrying meta/action |
| `<LinkArrow>` | Muted link, hairline underline, accent on hover, `→` appended |
| `<HairlineGrid>` | The 1px-gap grid technique |
| `<StackChip>` | Mono 11px chip on a `--border-strong` rim |
| `<NumberedRow>` | The `70px 1fr 90px` service row, one column ≤720px |
| `<PlotLine>` | The hero's animated stroke path, with its reduced-motion bail-out |
| `<Pager>` | Listing pagination |
| `<Reveal>` | The shared entrance |
| `<LiquidCrystalFilter>` / `<CrystalSurface>` | The glass — see [liquid-crystal.md](./liquid-crystal.md) |

Buttons are **variants, not new components**: `solid` and `outlineGhost` live in
[`ui/button.tsx`](../apps/frontend/src/components/ui/button.tsx), with a
compound variant that makes them padding-driven and sharp-radius at
`size="default"`.

---

## Forms

One implementation —
[`PayloadForm`](../apps/frontend/src/components/form/PayloadForm.tsx) — serving
every form on the site. A second parallel form implementation is the thing to
avoid; the looks are two independent props instead:

| Prop | Values | Meaning |
|---|---|---|
| `variant` | `default` \| `mockup` | **How** fields are drawn: shadcn vs. the hairline/mono skin |
| `surface` | `default` \| `crystal` | **What** they are drawn on: opaque `--card` vs. translucent glass |

Both land on the `<form>` as `data-variant` / `data-surface`, and the skins are
plain CSS in `globals.css` keyed off those attributes. That CSS is
**deliberately unlayered**: Tailwind's utilities on `Input` / `Textarea` /
`SelectTrigger` live in `@layer utilities`, and unlayered CSS beats layered CSS
regardless of specificity — so the skin overrides them without touching the
shared shadcn primitives, which other pages still use unstyled.

Two consumers today: the contact split layout (`page-sections/contact.tsx`,
mockup skin on the page ground) and the form block
(`page-sections/form.tsx`, mockup skin on glass).

Whatever the skin: keep the `*` required marker and its screen-reader text, and
keep the success box replacing the form **in place** so nothing jumps.

---

## Adding to the system

1. **A color** → both `:root` and `.dark`; `@theme inline` only if a utility is
   needed. Never a `dark:` variant for a themed color.
2. **A repeated class list** → a primitive, once it appears three times.
3. **A new look for an existing component** → a `cva` variant or a `data-*`
   skin, not a fork.
4. **A shadow** → almost certainly no. Reach for a hairline.
