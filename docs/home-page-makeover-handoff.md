# Home Page Makeover — Handoff

> **For:** whoever picks this up next (another chat, another model, future me).
> **Full spec:** [home-page-makeover.md](home-page-makeover.md) — read that first, this doc is just
> "where things stand and what to do next." All section numbers below (`§x`) refer to it.
> **Branch:** `makeover`. **As of:** 2026-07-22, Phases 0–2 of the §7 implementation plan are done.
> Phase 0–1 is committed (`e3d0e9f`); Phase 2 is uncommitted (see suggested commit message at the
> bottom).

---

## What's done

### Phase 0 — Prerequisites (§7 item 1)
Every stale `/gallery/...` link was replaced with `/lab/...`. The route was renamed in `b18ccde` but
the links inside it weren't updated, so they all 404'd. Fixed:
- [lab/data.ts](../apps/frontend/src/app/(website)/lab/data.ts) — 4 `href` fields.
- The four `*Hero.tsx` "Back to gallery" links (svg-circles, gray-scott, reaction-sphere, image-to-svg).
- One extra the doc didn't call out: [reaction-sphere/page.tsx](../apps/frontend/src/app/(website)/lab/(items)/reaction-sphere/page.tsx) linked to `/gallery/gray-scott` inline in body copy.

Deliberately **not** touched: the "Gallery" branding itself (page title "Gallery & Tinkering", metadata
titles, `GalleryBar`/`GalleryCard` component names). Only the broken hrefs were in scope — renaming the
gallery/lab terminology throughout is a separate, larger call nobody's made.

### Phase 1 — Design tokens (§7 items 2–5)
All in [globals.css](../apps/frontend/src/app/(website)/globals.css) and [layout.tsx](../apps/frontend/src/app/(website)/layout.tsx):

1. **Fonts** — Archivo + IBM Plex Mono via `next/font/google`, exposed as `--font-archivo` /
   `--font-ibm-plex-mono` CSS variables on `<body>`, wired into `@theme inline` as `--font-sans` /
   `--font-mono`. (Previously `--font-sans` pointed at `--font-geist-sans`, which nothing ever set —
   dead reference to a template default. Confirmed fixed by fetching the compiled CSS and checking
   `.font-sans { font-family: var(--font-archivo) }`.)
2. **Warm neutral ramp** — re-authored `:root` and `.dark` per §4.1's mapping table. Converted every
   mockup hex value to `oklch()` (matching the file's existing convention) with a Python OKLab/OKLCH
   conversion script rather than hand-picking approximate values — see the token values in the CSS
   directly, they're exact conversions of the doc's hex table.
3. **New tokens** — `--border-strong` and `--faint-foreground` added to both themes, registered in
   `@theme inline` as `--color-border-strong` / `--color-faint-foreground` (generates `border-border-strong`,
   `text-faint-foreground`, etc.). `--primary`/`--ring` now carry the amber accent in both themes.
4. **Contrast verification (§7 item 4)** — computed WCAG contrast ratios for every text-on-background
   pair. `--muted-foreground` clears 4.5:1 in both themes (5.2–5.4:1) as required. **`--faint-foreground`
   as literally specified in the doc's §4.1 table failed its own 3:1 floor** (2.89:1 dark, 2.99:1 light).
   I nudged both values slightly darker/lighter (same hue, ~5% lightness shift) to land at ~3.3:1 with
   margin, and updated the §4.1 table in the main doc with a footnote explaining the change. If you
   re-derive tokens from scratch later, re-check this — it's an easy thing to regress.
   I did **not** touch the amber-on-light contrast question (§4.1 already flags this as needing a real
   design pass in §6/Phase 6, not a Phase 1 blocker) — `--primary` on light background is ~3.83:1 for
   text, fine for UI elements/large text, not full AA body-copy contrast. Leave it for the light-theme
   design pass called out in §8's follow-ups.
5. **Radius / width / spacing** — added `--radius-sharp: 2px` (generates `rounded-sharp`) and
   `--container-wrap: 960px` (generates `max-w-wrap`) to `@theme inline`. Added a `spacing` prop to
   [Section](../apps/frontend/src/components/section/index.tsx) (`default` | `hero` | `section` | `contact`),
   mapping to the padding values in §4.3. **Nothing uses `rounded-sharp`, `max-w-wrap`, or the new
   `spacing` variants yet** — they're registered and ready but Tailwind v4 only emits utilities that are
   actually referenced in code, so they won't show up in compiled CSS until Phase 4 sections use them.
   `spacing` defaults to `"default"` (`py-16`, unchanged), so nothing existing regressed.

**Verification performed:** `tsc --noEmit` clean, `eslint` on touched files shows only pre-existing
unrelated warnings, dev server (already running on :3000 against local Postgres on :5432) serves the
page fine, compiled CSS confirmed to contain the new tokens and font wiring.

**Verification NOT performed:** no visual/browser check — there's nothing to look at yet. Phase 1 only
changes token *values*; nothing in the actual rendered page uses the new warm ramp differently than the
old grayscale one would, apart from `--primary`/`--ring` now being amber instead of near-black/white
(shadcn `Button` default variant, focus rings, etc. will already look different — worth an eyeball pass
before Phase 2, but I didn't do one).

### Phase 2 — Primitives (§7 items 6–8)

**Primitives** — new `apps/frontend/src/components/primitives/` directory, one file each, no barrel
(no other component dir in this repo uses one): [Eyebrow.tsx](../apps/frontend/src/components/primitives/Eyebrow.tsx),
[SectionHeader.tsx](../apps/frontend/src/components/primitives/SectionHeader.tsx),
[LinkArrow.tsx](../apps/frontend/src/components/primitives/LinkArrow.tsx),
[HairlineGrid.tsx](../apps/frontend/src/components/primitives/HairlineGrid.tsx),
[StackChip.tsx](../apps/frontend/src/components/primitives/StackChip.tsx),
[NumberedRow.tsx](../apps/frontend/src/components/primitives/NumberedRow.tsx),
[PlotLine.tsx](../apps/frontend/src/components/primitives/PlotLine.tsx). Notes:

- `LinkArrow` does **not** auto-append "→" — §6's copy table stores the arrow in the CMS content
  itself where wanted (`Full details →`) and omits it where not (`Learn more`), so the primitive just
  styles whatever text it's given.
- `NumberedRow` hard-codes the mockup's 720px breakpoint via `min-[721px]:` rather than Tailwind's
  640px `sm:` — §5 explicitly calls out that the mockup breakpoints (720px home/lab, 640px projects)
  don't match Tailwind's defaults. No other primitive needed a hard breakpoint (the grids are
  `auto-fit`, fluid without one).
- `PlotLine` is a client component (`useState`/`useEffect` for the ~200ms mount delay) with
  `motion-reduce:` Tailwind variants covering the reduced-motion bailout — no separate media query.

**Button variants** — [button.tsx](../apps/frontend/src/components/ui/button.tsx) gets `solid` and,
**not** `ghost` as §5 literally names it: `ghost` was already taken by an existing shadcn variant used
across ~9 unrelated call sites (blog, gallery, lab hero back-links) that aren't part of this makeover —
overwriting it would have restyled all of them. Named the new one `outlineGhost` instead. Geometry
(`h-auto px-6.5 py-3.25 text-[15px] rounded-sharp`, i.e. the mockup's 26px/13px padding and 2px radius)
is applied via a `compoundVariants` entry keyed on `size: "default"`, not inline in the variant string —
cva's default-size classes (`h-9 px-4 py-2`) would otherwise land later in the concatenated class string
than the variant's own classes and win the `tailwind-merge` conflict resolution in `cn()`. If you ever
pass an explicit non-default `size` alongside `solid`/`outlineGhost`, this override won't apply — that's
intentional (an explicit size choice should win) but worth knowing.

**Form field skin (§3.9)** — done as a CSS-attribute cascade, not prop drilling, per §5's suggestion:
[page-sections/form.tsx](../apps/frontend/src/components/page-sections/form.tsx) now takes an optional
`variant?: 'default' | 'mockup'` prop (not a real Payload field yet — that's Phase 3 — so it just
defaults to `'mockup'`, since `/services`'s `formBlock` is the only current consumer and Phase 2 item 8
says to switch it over now), sets `data-variant={variant}` on the `<form>`, and the actual skin lives in
[globals.css](../apps/frontend/src/app/(website)/globals.css) as `form[data-variant="mockup"]
[data-slot="..."]` rules targeting the `data-slot` attributes the shadcn `Input`/`Textarea`/`SelectTrigger`/
`Label` primitives already emit. **Zero changes** to `Text.tsx`/`Textarea.tsx`/`Select.tsx`/`Email.tsx`/
`Number.tsx` or the shared `ui/input.tsx` etc. (those are used unrestyled elsewhere in the app — Country,
State, Checkbox, GalleryBar, blog-list, the lab hero pages). The submit button switches to the new
`solid` variant + `w-full` when `variant === 'mockup'`.

These rules are written as **plain unlayered CSS** (not `@layer` or `@utility`) deliberately: Tailwind
v4 puts all utility classes in `@layer utilities`, and per the CSS cascade-layers spec, unlayered CSS
always wins over anything in a layer regardless of selector specificity — so this reliably overrides
`Input`'s `h-9`/`ring-*`/`border-input` utilities without an `!important` fight.

**A real bug found along the way, now fixed:** the Phase 1 handoff's own font wiring
(`--font-sans: var(--font-archivo)`, `--font-mono: var(--font-ibm-plex-mono)` in `@theme inline`) looks
like it defines real runtime CSS custom properties, but it doesn't — `@theme inline` *inlines* the
referenced value into each generated utility (`.font-mono { font-family: var(--font-ibm-plex-mono) }`,
confirmed by reading the compiled CSS), it does not also make `var(--font-mono)` usable as a literal
value elsewhere. `getComputedStyle(el).getPropertyValue('--font-mono')` returns empty on every element.
Only `var(--font-ibm-plex-mono)` / `var(--font-archivo)` — the variables `next/font` actually sets via
the CSS-module class on `<body>` — resolve. My original form-skin CSS used `var(--font-mono)` for the
label font and silently fell back to inherited Archivo (no error, just wrong font) until caught by
screenshotting and checking computed styles. **If you write any new hand-authored CSS that needs the
font stack, use `var(--font-ibm-plex-mono)` / `var(--font-archivo)` directly, never `var(--font-mono)` /
`var(--font-sans)` outside of Tailwind's own `font-mono`/`font-sans` utility classes.**

**Verification performed:** `tsc --noEmit` clean; `eslint` on every touched/new file shows only two
pre-existing `no-explicit-any` errors in `form.tsx` (confirmed via `git stash` — present before this
session's changes, unrelated to the diff). Visually verified via Playwright screenshots of `/services`'s
contact form in both themes: mono uppercase labels, `--card` background, `--border` hairline, sharp 2px
radius, amber border-swap on focus (no ring), full-width `solid` submit button with the correct amber
hover — all confirmed via screenshot and `getComputedStyle`, not just by reading the CSS.

Also: **both the frontend (:3000) and Payload (:3001) dev servers had died before this session started**
(not something this session's earlier commands caused — confirmed by checking process ages before
touching anything) and had to be restarted to do the visual check. Payload's restart hit the known
cold-boot Postgres error (see `payload-dev-schema-push-error` in memory) and self-recovered as
expected. **Also discovered:** this environment's Next dev server does not reliably hot-reload CSS
changes made after the server is already running (JS/RSC changes picked up fine via fast refresh; CSS
edits needed a full server restart — `rm -rf .next` + relaunch — to show up, at least twice during this
session). If you edit `globals.css` and a change doesn't show up in the browser, restart the dev server
before assuming the CSS itself is wrong.

---

## What's next

Follow §7 in order — it's sequenced so nothing gets built twice:

- **Phase 3 — Schema** (§7 items 9–15): shared `eyebrow` field, extend the six existing blocks, add
  `pageServicesTeaser` + `pageLabTeaser`, `caseStudy` group on `projects`, `copyright.location`,
  regenerate types, **write a real Payload migration** (this repo doesn't rely on dev push for schema
  changes — see the memory note on the cold-boot Postgres error, that's unrelated/harmless).
- **Phase 4 — Sections**: rebuild each section against the primitives, one PR per section.
- **Phase 5 — Content**: seed data (§6), including the real TrackBit project entry and the new `/about`
  page (§3.10).
- **Phase 6 — Verify**: the full checklist in §7 items 25–33 (both themes, breakpoints, keyboard nav,
  form e2e, reduced-motion, live preview, Lighthouse).

Decisions are already settled (§8) — don't re-litigate scope; the open items are the "Follow-ups" list
at the bottom of §8 (about-page copy length, blog teaser framing, TrackBit copy verification, the
`Q3 2026` availability window which is closing *now*, and the light-theme design pass).

Note that the Phase 2 primitives aren't visibly used anywhere yet except the `/services` form skin and
its submit button — nothing on the actual home page looks different, because no section component
consumes `<Eyebrow>`/`<SectionHeader>`/etc. yet. That's Phase 4's job, and it needs Phase 3's schema
fields (`eyebrow`, block variants) to exist first before a section can be rebuilt against real CMS data.

---

## Suggested commit messages

Phase 0–1 is already committed as `e3d0e9f`. Phase 2 is uncommitted:

```
feat(home-makeover): add shared primitives, solid/ghost buttons, mockup form skin

Phase 2 of docs/home-page-makeover.md: new src/components/primitives/
(Eyebrow, SectionHeader, LinkArrow, HairlineGrid, StackChip,
NumberedRow, PlotLine) per §5; solid/outlineGhost button variants on
<Button> (named outlineGhost, not ghost — that name was already taken
by an existing shadcn variant in use elsewhere); and a data-variant
cascade skinning the contact form fields (labels, inputs, textarea,
select) to the mockup per §3.9, switching /services' formBlock over
to it. Along the way, fixes a Phase-1 bug where --font-mono/--font-sans
were referenced as runtime CSS vars (they only exist inlined into
Tailwind's own font-mono/font-sans utilities — next/font's real vars
are --font-ibm-plex-mono/--font-archivo).
```

(Note: `docs/home-page-makeover.md` also carries pre-existing edits from before this session — the
doc was already modified on disk when this session started, per the plan's own decisions in §8. Those
aren't mine to take credit for in either commit message above; I only added checkbox updates and the
notes described in each phase's section of this handoff.)
