# Hilbert / Peano Curve — Image → SVG

How the space-filling-curve strategy turns a raster image into vector line art
the way an adaptive plotter would: a single unbroken thread that weaves tightly
through dark regions and loosely through light ones, reproducing tone purely
through how densely the one line packs itself.

## The core idea

A space-filling curve visits every cell of a grid along one continuous path that
never crosses itself. Drawn at a *uniform* order it just greys the whole frame
evenly — it carries no tone. The trick is to vary its depth **locally**:

- **dark cells subdivide further**, so the curve folds into ever-finer switch-
  backs and lays down a lot of line per unit area — reading as solid ink;
- **light cells stop early**, leaving coarse, widely-spaced meanders.

Because the subdivision is still a single recursive traversal, the result is
**one continuous curve** from first cell to last — the ideal pen-plotter / CNC
toolpath, with zero pen lifts. The eye reassembles a smooth gradient out of the
varying line density, exactly as it does for hatching, but the line never breaks.

Two curves share the same adaptive machinery:

- **Hilbert** — 2×2 subdivision, no long jumps, locally compact and calm;
- **Peano** — 3×3 serpentine subdivision, denser and more woven per level.

## Pipeline overview

```
image ─▶ downscale + luminance ─▶ tone buffer ─▶ adaptive curve ─▶ <svg>
        (ImageToSvgCanvas)         (StrategyInput)  (hilbert.ts)
```

### 1. Image → tone buffer

Identical to every strategy: `prepareInput()` in `ImageToSvgCanvas.tsx`
downscales the image (long edge ≤ **700 px**), reduces each pixel to a Rec. 709
**luminance** in `0..1`, and exposes a **bilinear** `sample(x, y)`. No image data
leaves the browser.

### 2. Tone → darkness

Each sampled value is shaped, then flipped so larger means *more ink*
(`darknessAt` in `hilbert.ts`). Points outside the image return `0` (light), so
the curve stays coarse where a rectangular cell overhangs the frame:

```ts
if (x < 0 || x > W || y < 0 || y > H) return 0;
let l = sample(x, y);
l = clamp01(0.5 + (l - 0.5) * contrast); // contrast pivots around mid-grey
if (invert) l = 1 - l;
return 1 - l;                            // darkness: 0 = light, 1 = dark
```

### 3. Adaptive subdivision

The curve fills the whole image rectangle: level 0 is the full `W×H` cell. At
each cell we sample the darkness at its centre and decide whether to recurse
(`shouldSubdivide`):

- below the **Base** level → always subdivide (guarantees a minimum grid);
- at or above the **Detail** level → never subdivide (the depth cap);
- in between → subdivide only if the cell is darker than a level-dependent
  threshold that ramps from low to high:

  ```ts
  threshold = (level - base + 1) / (span + 1);   // span = detail - base + 1
  return darknessAt(cx, cy) >= threshold;
  ```

So a near-black cell clears every threshold and folds all the way to **Detail**,
while a pale cell stops at **Base**. A hard point cap guards against an extreme
detail level exploding the file.

### 4. The two curves

**Hilbert** is generated in the classic *vector* form: a cell is an origin plus
an `i` vector and a `j` vector; the four children are visited in Hilbert order,
each handed a rotated/reflected basis so their sub-curves chain end-to-end. A
leaf emits its centre point.

**Peano** uses a *reflection-flag* form derived from Peano's closed-form ternary
mapping. Its nine subcells are walked in a serpentine (`t = 0..8`); two flags
`rx`/`ry` track which axes are currently reflected and propagate to each child
(`rx ^= t2&1`, `ry ^= t1&1`), so consecutive subcells stay edge-adjacent. The
axis vectors keep a fixed direction — orientation lives entirely in the flags.

In both, consecutive leaves are always spatial neighbours, so their centre points
chain into one continuous polyline even where neighbouring leaves sit at
different depths.

### 5. Rounded corners

With **Round** at 0 the leaf centres are joined as a raw `<polyline>` — the angular
space-filling lattice. Raise it and every interior vertex is **filleted**: the
path is cut back from the vertex along both edges by `round ×` the shorter
neighbouring segment, and the corner is replaced by a quadratic Bézier through
the original vertex:

```
E = P − û₁ · c        c = round · min(len₁, len₂)
L = P + û₂ · c
… L E  Q P L …        // line to the cut-in point, quad-curve around the corner
```

Because `round ≤ 0.5`, the cuts always stay inside each segment, so adjacent
fillets never overlap. At `0.5` the corners round maximally and the lattice melts
into the flowing, rounded look of a classic smoothed Hilbert curve. The sharp
case stays a `<polyline>` (smallest output); any rounding emits a single `<path>`.

### 6. Assembly

Everything is one grouped element:

```html
<svg viewBox="0 0 W H" width="W" height="H">
  <rect width="W" height="H" fill="#fff"/>           <!-- or #111 when inverted -->
  <g stroke="#111" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M … L … Q … …"/>                         <!-- or one <polyline> when sharp -->
  </g>
</svg>
```

Coordinates are rounded to one decimal. The whole thing is one self-contained SVG
document string.

## Methods — comparing the continuity techniques

Keeping a space-filling curve clean across cells of *different* size is a classic
plotter problem. The **Method** control switches between the standard answers so
you can see them side by side:

- **Anchor** (default) — the plain adaptive curve described above. It is already
  continuous for free: the vector-form recursion preserves each cell's **entry and
  exit corners** no matter how deeply it subdivides (*fixed boundary anchoring*),
  so a coarse leaf and a fine leaf always meet at predictable macro-coordinates and
  consecutive centres chain into one unbroken line.
- **Weld** — same adaptive curve, but every **diagonal seam** is welded onto the
  grid. Where two neighbouring leaves sit at different depths, the centre-to-centre
  move has both a horizontal and a vertical component (a diagonal that crosses the
  shared wall off-centre); Weld replaces it with an orthogonal **L-bridge** — the
  longer leg first — so the join steps along the cell wall as a clean T/L junction.
  With **Round** up, those L-corners get filleted too. Clearest at low Round / high
  Detail.
- **Riemersma** — abandons adaptive cell sizing entirely. It lays a **uniform**
  curve at the **Detail** order over the whole frame and traverses it once, penning
  **down only where the tone is dark** and diffusing the quantisation error forward
  along the 1-D path (a practical stand-in for Riemersma's weighted history). The
  underlying geometry is therefore perfectly regular — there are *zero* continuity
  errors — but the path **deliberately lifts the pen** over light areas, so it is
  the one method that is not a single unbroken stroke. **Base** is unused here;
  **Round** has no visible effect (segments stay straight).

The fourth classic technique — the **Peano 3×3 advantage** (opposite-corner
entry/exit, denser ternary weave) — is the separate **Peano** toggle, and it
combines with every method above.

## Controls

| Control      | Range     | What it does                                                                   |
| ------------ | --------- | ------------------------------------------------------------------------------ |
| **Base**     | L1–L4     | Minimum subdivision depth — the coarse grid every region reaches.              |
| **Detail**   | L2–L7     | Maximum depth the darkest cells fold down to (Peano is capped at L5).          |
| **Round**    | 0–0.5     | Corner fillet radius as a fraction of the shorter adjacent segment.            |
| **Weight**   | 0.3–2     | Stroke width.                                                                  |
| **Contrast** | 0.5–2.5   | Tone curve before darkness mapping. Higher pushes tones to extremes.          |
| **Method**   | Anchored / Welded / Riemersma | Continuity technique: plain anchored curve, orthogonal seam-welding, or uniform-curve Riemersma dithering (see *Methods* above). |
| **Peano**    | on / off  | 3×3 serpentine Peano curve instead of the 2×2 Hilbert curve.                   |
| **Invert**   | on / off  | White line on dark vs. dark line on light; flips which tones subdivide.        |

## Why a space-filling curve

Encoding tone as *subdivision depth* of a single recursive curve gives the
densest possible continuous toolpath: maximum ink with zero pen lifts, and a
distinctive woven texture quite unlike the parallel-line and centre-out
strategies. Base/Detail trade the tonal range against run time directly, and the
rounded-corner option lets the same geometry read as either a crisp digital
lattice or a soft, organic meander.

## Extending: adding another strategy

See [`README.md`](./README.md) for the full step-by-step. In short: write a pure
`Strategy` in `strategies/`, add it to the `STRATEGIES` array in
`strategies/index.ts`, and document its algorithm in a sibling `*.md` like this
one. A natural extension here is a **Gosper / flowsnake** curve (hexagonal
subdivision) for a more isotropic texture, or driving subdivision from local tone
*variance* so edges — not just dark areas — pull in extra detail.
