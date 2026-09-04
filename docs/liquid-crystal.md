# Liquid Crystal

The liquid-crystal treatment renders a surface as a pane of glass over whatever
sits behind it: the backdrop is tinted, blurred and saturated, bent by an SVG
displacement filter, and lit so highlights scatter across the ripples.

It ships as two pieces that are useful independently:

- **`LiquidCrystalFilter`** — the SVG filter primitive
  ([`components/primitives/LiquidCrystalFilter.tsx`](../apps/frontend/src/components/primitives/LiquidCrystalFilter.tsx))
- **`Card variant="crystal"`** — the layered surface that consumes it
  ([`components/ui/card.tsx`](../apps/frontend/src/components/ui/card.tsx))

Colors come from theme tokens in
[`globals.css`](<../apps/frontend/src/app/(website)/globals.css>), never from
`dark:` variants.

---

## Using it

```tsx
<Card variant="crystal">…</Card>
```

That is the whole public surface for the common case. The card mounts the filter
itself, so nothing else needs to be imported. Today it is used by
[`ServiceCard`](../apps/frontend/src/components/cards/ServiceCard.tsx), which
`page-sections/services.tsx` renders with `variant='crystal'`.

Glass only reads as glass when there is something behind it. Over a flat
background the effect collapses to a faint white wash — put crystal cards over
imagery, a gradient, or a textured section.

---

## The layer stack

`Card` renders three absolutely-positioned `aria-hidden` layers at `-z-10`,
under the card's own content. The card itself carries `relative isolate
overflow-hidden`, so `isolate` creates a stacking context that keeps `-z-10`
from escaping behind the page, and `overflow-hidden` clips every layer to the
rounded corners.

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
layer: `border border-crystal-edge shadow-crystal`.

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

## Tokens

Defined in `:root` and `.dark` in
[`globals.css`](<../apps/frontend/src/app/(website)/globals.css>). Three are
mapped through `@theme inline` as `--color-crystal*` so they generate Tailwind
color utilities; the other three are read only inside `@utility` box-shadow
rules and need no mapping — the same split as the existing
`--shadow-outer` / `--shadow-center` / `--shadow-light` trio.

| Token | Used by | Controls |
|---|---|---|
| `--crystal` | `bg-crystal` | The milky fill of the glass. Higher alpha is frostier |
| `--crystal-edge` | `border-crystal-edge` | The card's 1px rim |
| `--crystal-edge-hover` | `hover:border-crystal-edge-hover` | The rim on hover; `transition-colors` animates between the two |
| `--crystal-sheen-top` | `shadow-crystal-sheen` | Bright hairline on the top bevel |
| `--crystal-sheen-bottom` | `shadow-crystal-sheen` | Dimmer hairline on the bottom bevel — keeping it below the top value is what makes the glass read as lit from above |
| `--crystal-shadow` | `shadow-crystal` | Drop-shadow color for `0 10px 40px -12px`; negative spread tucks it under the card instead of haloing it |

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
  in scroll performance.
- **Support.** `url()` in `backdrop-filter` is not universal. The layer split
  above is the fallback plan — verify changes in a browser without it before
  assuming the effect degrades cleanly.
- **Contrast.** Text sits above the glass, but the backdrop still shows through.
  Check legibility against the busiest background the surface will ever meet,
  not a convenient one.
- **`prefers-reduced-motion`** is not a factor: the effect is entirely static,
  with no animation on the noise.
