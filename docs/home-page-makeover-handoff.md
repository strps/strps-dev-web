# Home Page Makeover — Handoff

> **For:** whoever picks this up next (another chat, another model, future me).
> **Full spec:** [home-page-makeover.md](home-page-makeover.md) — read that first, this doc is just
> "where things stand and what to do next." All section numbers below (`§x`) refer to it.
> **Branch:** `makeover`. **As of:** 2026-07-22, Phases 0–1 of the §7 implementation plan are done
> and uncommitted (see suggested commit message at the bottom).

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

---

## What's next

Follow §7 in order — it's sequenced so nothing gets built twice:

- **Phase 2 — Primitives** (§7 items 6–8, primitives spec'd in §5): `<Eyebrow>`, `<SectionHeader>`,
  `<LinkArrow>`, `<HairlineGrid>`, `<StackChip>`, `<NumberedRow>`, `solid`/`ghost` button variants,
  `<PlotLine>`. Then skin the form fields (§3.9) behind a variant. This is the first phase that will
  actually make something *look* different — good checkpoint to eyeball in a browser.
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

---

## Suggested commit message

```
feat(home-makeover): fix stale /lab links, wire warm design tokens

Phase 0-1 of docs/home-page-makeover.md: replace dead /gallery hrefs
left over from the /lab rename (b18ccde), load Archivo + IBM Plex Mono
and wire --font-sans/--font-mono (previously pointed at unset
--font-geist-* vars), re-author the neutral ramp as a warm oklch()
scale with an amber --primary/--ring in both themes, add
--border-strong/--faint-foreground, and add --radius-sharp,
--container-wrap, and a spacing variant on <Section> ahead of the
primitives work in Phase 2.
```

(Note: `docs/home-page-makeover.md` also carries pre-existing edits from before this session — the
doc was already modified on disk when this session started, per the plan's own decisions in §8. Those
aren't mine to take credit for in the message above; I only added the phase-0/1 checkbox updates and
the `--faint-foreground` contrast footnote in §4.1.)
