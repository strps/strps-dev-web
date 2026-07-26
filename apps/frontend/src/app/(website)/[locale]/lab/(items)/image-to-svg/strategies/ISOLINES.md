# Topographic / Isolines — Image → SVG

How the isolines strategy turns a photo into the nested rings of a **geographic
survey map**: read brightness as elevation, slice that terrain at fixed heights,
and trace where each slice cuts the land.

## The core idea

Imagine the image as a relief map — **white is high ground, black is a deep
valley**, and grey is everything in between. A contour (isoline) is the set of
points that all sit at exactly the same elevation. Stack a handful of evenly
spaced elevations and you get the familiar concentric "onion rings" of a
topographic map: tightly packed where the terrain is steep (a hard tonal edge),
spread wide where it is flat (a smooth gradient). A face becomes a survey of
ridges and basins; a landscape becomes an actual map of itself.

The marks carry no shading — they only mark *level crossings* — yet the eye
reconstructs the original tone from how the rings bunch and spread.

## Pipeline overview

```
image ─▶ downscale + luminance ─▶ tone buffer ─▶ marching squares ─▶ stitch + smooth ─▶ <svg>
        (ImageToSvgCanvas)         (StrategyInput)  (per elevation)    (isolines.ts)
```

### 1. Image → tone buffer

Identical to every strategy: `prepareInput()` in `ImageToSvgCanvas.tsx`
downscales the image (long edge ≤ **700 px**), reduces each pixel to a Rec. 709
**luminance** in `0..1`, and exposes a **bilinear** `sample(x, y)`. No image data
leaves the browser.

### 2. Tone → elevation

Each sample is shaped and read as terrain height (`heightAt` in `isolines.ts`):

```ts
let l = sample(x, y);
l = clamp01(0.5 + (l - 0.5) * contrast); // contrast steepens the relief
return invert ? 1 - l : l;               // 1 = high ground, 0 = valley
```

### 3. Cache the terrain on a grid

The elevation is sampled once onto a coarse `(gw+1) × (gh+1)` lattice with cell
size **Grid** px. Every elevation slice marches over this one cached grid, so the
expensive `sample()` calls happen exactly once.

### 4. Marching squares, one pass per level

For `levels` evenly spaced elevations `iso = (k+1)/(levels+1)`, each grid cell is
classified by which of its four corners sit above `iso` (a 4-bit case, 0–15).
The case selects which cell edges the contour crosses, and the crossing point on
each edge is found by **linear interpolation** between the two corner heights —
so the contour lands at the sub-cell position where the terrain truly hits that
elevation. The two genuinely ambiguous "saddle" cases are resolved with the
cell-centre average.

### 5. Stitch segments into continuous contours

Marching squares emits a *soup* of disconnected per-cell segments — terrible as a
toolpath. Because two adjacent cells compute the **identical** crossing point on
their shared edge, quantising endpoints and matching them links every segment
into long, mostly-closed contour polylines (`stitch`). The machine can then run a
whole ring in one unbroken stroke instead of lifting per segment.

### 6. Smooth (optional)

The grid makes raw contours stair-step. `smooth` applies that many **Chaikin**
corner-cutting passes, rounding the rings while pinning the endpoints of any open
contour. Each pass roughly doubles the point count, so it is capped at 3.

### 7. Assembly

```html
<svg viewBox="0 0 W H" width="W" height="H">
  <rect width="W" height="H" fill="#fff"/>            <!-- or #111 when inverted -->
  <g stroke="#111" stroke-width="0.7" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <polyline points="x,y x,y …"/>
    …
  </g>
</svg>
```

Coordinates are rounded to one decimal; the whole thing is one self-contained SVG
string.

## Controls

| Control      | Range    | What it does                                                              |
| ------------ | -------- | ------------------------------------------------------------------------ |
| **Levels**   | 2–20     | Number of elevation slices. More = more rings, finer tonal steps.        |
| **Grid**     | 1–6 px   | Marching-squares cell size. Smaller = finer contours (and more of them). |
| **Smooth**   | 0–3      | Chaikin smoothing passes that round off the grid stair-stepping.         |
| **Weight**   | 0.3–2    | Stroke width.                                                            |
| **Contrast** | 0.5–2.5  | Steepens the relief before slicing. Higher pushes tones to extremes.     |
| **Invert**   | on / off | Swap high ground and valley (and ink vs. background).                    |

## Why contours instead of shading

Hatching and waves encode tone by *how much ink* they lay down. Isolines encode
it purely by **where levels cross** — the rings are all the same weight; only
their spacing carries the image. That gives a crisp, map-like, almost technical
look, and because each level closes into loops it routes into clean continuous
toolpaths with very few pen lifts.

## Extending: adding another strategy

See [`README.md`](./README.md) for the full step-by-step. In short: write a pure
`Strategy` in `strategies/`, add it to the `STRATEGIES` array in
`strategies/index.ts`, and document its algorithm in a sibling `*.md` like this
one. It then appears automatically in the picker with its declared controls.
