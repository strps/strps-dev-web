# Liquid Crystal

The liquid-crystal treatment renders a surface as a pane of glass over whatever
sits behind it: the backdrop is tinted, blurred and saturated, bent by an SVG
displacement filter, and lit so highlights scatter across the ripples.

It ships as three pieces, each useful on its own:

- **`LiquidCrystalFilter`** — the SVG filter primitive
  ([`components/primitives/LiquidCrystalFilter.tsx`](../apps/frontend/src/components/primitives/LiquidCrystalFilter.tsx))
- **`CrystalSurface`** — the three glass layers, for any host element
  ([`components/primitives/CrystalSurface.tsx`](../apps/frontend/src/components/primitives/CrystalSurface.tsx))
- **`Card variant="crystal"`** — a card that mounts the surface for you
  ([`components/ui/card.tsx`](../apps/frontend/src/components/ui/card.tsx))

Colors come from theme tokens in
[`globals.css`](<../apps/frontend/src/app/(website)/globals.css>), never from
`dark:` variants.

---

## Using it

```tsx
<Card variant="crystal">…</Card>
```

That is the whole public surface for the common case. The card mounts the
surface itself, so nothing else needs to be imported.

For a host that is not a card — a header, a panel, a section — render the
surface directly and give the host the stacking context it needs:

```tsx
<header className="relative isolate overflow-hidden">
  <CrystalSurface />
  …
</header>
```

Glass only reads as glass when there is something behind it. Over a flat
background the effect collapses to a faint white wash — put crystal surfaces
over imagery, a gradient, or the site's `ParticleStage`.

### Where it is used

| Surface | How |
|---|---|
| [`ServiceCard`](../apps/frontend/src/components/cards/ServiceCard.tsx) | `page-sections/services.tsx` renders it with `variant='crystal'` |
| [`HeaderNav`](../apps/frontend/src/components/HeaderNav.tsx) | `CrystalSurface` faded in past the scroll threshold — see [The header](#the-header) |
| [`page-sections/form.tsx`](../apps/frontend/src/components/page-sections/form.tsx) | `Card variant="crystal"` around `PayloadForm surface="crystal"` — see [Forms on glass](#forms-on-glass) |

---

## The layer stack

`CrystalSurface` renders three absolutely-positioned `aria-hidden` layers at
`-z-10`, under the host's own content. The host must carry `relative isolate
overflow-hidden`: `isolate` creates a stacking context that keeps `-z-10` from
escaping behind the page, and `overflow-hidden` clips every layer to the rounded
corners. `Card variant="crystal"` sets those three classes for you; a bare host
has to.

| Layer | Class / style | Role |
|---|---|---|
| 1. Glass | `bg-crystal backdrop-blur-[3px] backdrop-saturate-150` | Tint, blur and saturation — the body of the pane |
| 2. Refraction | `backdropFilter: url(#liquid-crystal)` | Bends the backdrop through the SVG filter |
| 3. Sheen | `shadow-crystal-sheen` | The thin lit hairlines on the top and bottom bevels |

Refraction is deliberately on **its own layer** rather than combined into layer
1's `backdrop-filter`. A browser that does not support `url()` inside
`backdrop-filter` drops that whole declaration; isolating it means such a
browser loses only the bend and still gets the blurred, tinted glass above it.
Merging the two would cost the blur as well on those browsers.

The card's border and drop shadow come from the variant itself, not from a
layer: `border border-crystal-edge shadow-crystal`. A bare host wanting the same
rim and shadow adds those two classes itself.

### `CrystalSurface` props

| Prop | What it does |
|---|---|
| `filter` | Forwarded to the `LiquidCrystalFilter` it mounts. Pass a distinct `id` **and** `seed` when one page needs two crystals that do not ripple identically |
| `className` | Merged onto **all three** layers. This is the hook for animating the glass (`transition-opacity`, `opacity-0`) or rounding it to the host's radius |
| `tintClassName` | Merged onto the **tint layer only** — `bg-crystal-strong`, a heavier `backdrop-blur-*`. It exists because a fill passed through `className` would land on the refraction and sheen layers too, stacking three copies of the tint and hiding the bend under the topmost one |

`className` lands on the layers, not on a wrapper, because there is no wrapper:
a wrapping element would be a `backdrop-filter` container of its own and the
layers would then sample it instead of the page behind the host.

---

## The filter

`LiquidCrystalFilter` emits a zero-sized, hidden `<svg>` holding one `<filter>`,
so it can sit anywhere in the tree. Reference it as `filter: url(#id)` or, over a
background, `backdrop-filter: url(#id)`. The default id is exported as
`LIQUID_CRYSTAL_FILTER_ID`.

The chain:

```
feTurbulence   (fractalNoise)  → noise
feGaussianBlur (noise)         → liquid          grain becomes flowing lobes
feDisplacementMap
  in: SourceGraphic
  in2: liquid                  → refracted       the bend
feComponentTransfer
  in: refracted, feFuncA       → glass           refractionOpacity
feSpecularLighting
  in: liquid, fePointLight     → glints          same lobes as a height map
feComposite in/in2 refracted   → clippedGlints   light kept on the glass
feComposite arithmetic
  glass + clippedGlints × k3                     glintOpacity
```

Two things about that tail are load-bearing:

- The glints are clipped against **`refracted`**, the undimmed layer, not
  against `glass`. So `refractionOpacity={0}` yields the lit facets alone on a
  transparent backdrop; clipping against `glass` instead would erase the light
  along with the refraction.
- The final `feComposite` is `operator="arithmetic"`, whose `k2`/`k3` are plain
  per-input weights — which is exactly what a per-layer opacity is, so
  `glintOpacity` needs no extra node.

The blurred noise (`liquid`) is never drawn. It only drives the displacement and
the lighting, which is why it has no opacity of its own — `scale` and `glint`
are its equivalents.

### Props

| Prop | Default | What it does |
|---|---|---|
| `id` | `'liquid-crystal'` | Filter id referenced as `url(#id)` |
| `frequency` | `0.001` | Ripple size — lower is glassier, higher is frostier |
| `scale` | `10` | How far the backdrop is bent, in pixels |
| `softness` | `1` | Blur applied to the noise before it displaces; keeps the bend liquid rather than grainy |
| `refractionOpacity` | `1` | Opacity of the bent backdrop layer, 0–1 |
| `glint` | `1.1` | Strength of the specular highlights |
| `glintOpacity` | `0.2` | Opacity of the glint layer, 0–1 |
| `seed` | `4` | Noise seed, so several crystals can differ |
| `className` | — | Merged onto the host `<svg>` |

Mounting more than one filter with the same `id` on a page means the browser
resolves `url(#liquid-crystal)` to whichever came first. To vary the look per
card, pass a distinct `id` **and** a distinct `seed`, and reference that id from
the consuming layer.

---

## The header

[`HeaderNav`](../apps/frontend/src/components/HeaderNav.tsx) is transparent at
the top of the page and becomes glass once the page has moved. Three things make
that work:

- **The surface is always mounted, and its opacity is animated.** Attaching a
  `backdrop-filter` mid-scroll pops — the compositor promotes a new layer on the
  frame it appears — and an element that only exists in one state has nothing to
  transition from. So `CrystalSurface` gets
  `transition-opacity duration-500 ease-out` plus `opacity-0` / `opacity-100`.
- **The rim and shadow transition alongside it**, on the header itself:
  `border-transparent` → `border-crystal-edge shadow-crystal`, under
  `transition-[border-color,box-shadow]` with the same duration and easing. The
  border is always present at 1px, only its color changes, so the layout never
  shifts by a pixel as the glass arrives.
- **The threshold is `GLASS_AT = 8`px**, not 0, so a rubber-band overscroll at
  the top does not flicker the glass on and off.

The bar is also **more opaque than a card**: it passes
`tintClassName="bg-crystal-strong backdrop-blur-[12px]"`. A card's glass covers
one section, which the reader is looking at; the bar covers whatever happens to
be scrolling under it, and at the card's `--crystal` the nav labels swim over
passing headlines. `--crystal-strong` is the page ground itself at 0.72 alpha
rather than a white or black wash, so the bar reads as the page thickening
rather than as a grey band.

The scroll offset is read from a plain `window.scrollY` listener rather than
from `scrollState` (`lib/scroll.ts`): Lenis scrolls the window natively, and
that mirror exists for per-frame canvas reads, not for a boolean that flips once
near the top of the page.

The open mobile menu forces the glass on at any offset — links over a
transparent header would sit straight on the page content. Because the surface
is `absolute inset-0` on the `<header>`, it grows with the dropdown and no
second backdrop is needed.

The header carries `isolate` but not `overflow-hidden`: it has no rounded
corners, and the layers are `inset-0`, so there is nothing to clip.

Passing `background={false}` opts the header out entirely and it stays
transparent at every offset.

---

## Forms on glass

`--card` is opaque. A form field wearing it inside a crystal surface punches a
solid rectangle through the glass, which is the one thing that breaks the
illusion. `PayloadForm` therefore takes a **`surface`** prop
(`'default' | 'crystal'`) alongside its existing `variant` field skin, and puts
it on the `<form>` as `data-surface`:

```tsx
<Card variant="crystal" className="rounded-sharp p-7 md:p-11">
  <PayloadForm form={form} variant="mockup" surface="crystal" />
</Card>
```

The two attributes are deliberately separate axes: `variant` is *how the fields
are drawn* (the hairline/mono mockup skin vs. the shadcn default), `surface` is
*what they are drawn on*. The crystal rules in `globals.css` are scoped to
`form[data-variant="mockup"][data-surface="crystal"]`, so they layer onto the
mockup skin rather than replacing it — two attribute selectors outrank the
single-attribute mockup rules that set `background: var(--card)`, and they come
later in the file.

They swap in `--crystal-field` / `--crystal-field-border` and give each field a
`backdrop-filter: blur(3px) saturate(1.4)` of its own, so a field reads as a
pane set into the pane. Hover moves the border to `--crystal-edge-hover`, the
same token the cards use; focus still goes to `--primary`, unchanged from the
flat skin.

The section that uses this,
[`page-sections/form.tsx`](../apps/frontend/src/components/page-sections/form.tsx),
also carries the makeover's left-aligned hairline heading and `Reveal`
entrances, replacing the centred pre-makeover intro it shipped with.

Two things to check when putting a form on glass: the labels are
`--faint-foreground` over a live backdrop, so verify them against the busiest
thing that can scroll behind the section; and the success and error boxes sit on
the same glass — the form section passes
`successClassName="border border-crystal-edge p-10 text-center"` for that reason.

---

## Tokens

Defined in `:root` and `.dark` in
[`globals.css`](<../apps/frontend/src/app/(website)/globals.css>). Four are
mapped through `@theme inline` as `--color-crystal*` so they generate Tailwind
color utilities; the rest are read only from CSS — the `@utility` box-shadow
rules and the `data-surface="crystal"` form rules — and need no mapping, the
same split as the existing `--shadow-outer` / `--shadow-center` /
`--shadow-light` trio.

| Token | Used by | Controls |
|---|---|---|
| `--crystal` | `bg-crystal` | The milky fill of the glass. Higher alpha is frostier |
| `--crystal-strong` | `bg-crystal-strong` | The same fill for a surface that must stay legible over anything — the header. The page ground at 0.72 alpha, not a neutral wash |
| `--crystal-edge` | `border-crystal-edge` | The card's 1px rim |
| `--crystal-edge-hover` | `hover:border-crystal-edge-hover` | The rim on hover; `transition-colors` animates between the two |
| `--crystal-sheen-top` | `shadow-crystal-sheen` | Bright hairline on the top bevel |
| `--crystal-sheen-bottom` | `shadow-crystal-sheen` | Dimmer hairline on the bottom bevel — keeping it below the top value is what makes the glass read as lit from above |
| `--crystal-shadow` | `shadow-crystal` | Drop-shadow color for `0 10px 40px -12px`; negative spread tucks it under the card instead of haloing it |
| `--crystal-field` | the `data-surface="crystal"` form rules | Fill of an input, select or textarea sitting on glass — the translucent stand-in for `--card` |
| `--crystal-field-border` | the same rules | That field's 1px rim at rest; hover hands off to `--crystal-edge-hover` |

Two utilities wrap the shadows so no component hard-codes them:

```css
@utility shadow-crystal        { box-shadow: 0 10px 40px -12px var(--crystal-shadow); }
@utility shadow-crystal-sheen  { box-shadow: inset 0 1px 0 var(--crystal-sheen-top),
                                             inset 0 -1px 0 var(--crystal-sheen-bottom); }
```

### Theming rule

Light and dark values live side by side in `:root` and `.dark`. Components must
not reach for `dark:` variants for crystal colors — a component that needs a
different value in dark mode needs a token, not a variant. This keeps the whole
palette adjustable from one file.

---

## Notes and limits

- **Cost.** `backdrop-filter` with an SVG `url()` is expensive to composite.
  Keep crystal surfaces to a handful per view; a long grid of them will show up
  in scroll performance. Budget for the header: it is on every page, it is
  composited on every scrolled frame, and each crystal field in a form is a
  blurred layer of its own.
- **Support.** `url()` in `backdrop-filter` is not universal. The layer split
  above is the fallback plan — verify changes in a browser without it before
  assuming the effect degrades cleanly.
- **Contrast.** Text sits above the glass, but the backdrop still shows through.
  Check legibility against the busiest background the surface will ever meet,
  not a convenient one.
- **`prefers-reduced-motion`.** The glass itself is static — there is no
  animation on the noise. The one moving part is the header's opacity fade,
  which is a cross-fade in place: no travel, no parallax, nothing the preference
  is aimed at. Anything that later *moves* a crystal surface should honour it.
