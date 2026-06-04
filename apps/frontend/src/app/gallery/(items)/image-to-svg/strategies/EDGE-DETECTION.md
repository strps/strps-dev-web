# Edge Detection / Sobel — Image → SVG

How the edge-detection strategy reduces a photo to its **structural sketch**:
keep only the sharp outlines — the boundaries between regions — and throw away
all the shading in between. The result is the minimalist line drawing an artist
would block in first.

## The core idea

An *edge* is where brightness changes fast: the silhouette of a face, the rim of
an eye, the horizon. The **Sobel operator** measures that rate of change (the
image gradient) at every pixel; pixels where the gradient is strong *are* the
edges. Keep them, vectorise them, and discard the smoothly shaded interiors, and
the picture collapses to its essential outlines.

This deliberately throws tone away. Where hatching and isolines reproduce
*shading*, edge detection reproduces *structure* — a clean, sparse sketch.

## Pipeline overview

```
image ─▶ luminance ─▶ blur ─▶ Sobel gradient ─▶ thin (NMS) ─▶ threshold ─▶ trace ─▶ <svg>
        (StrategyInput)                       (edge-detection.ts)
```

This mirrors the front half of the classic **Canny** detector.

### 1. Image → tone buffer

`prepareInput()` in `ImageToSvgCanvas.tsx` downscales the image (long edge ≤
**700 px**), reduces each pixel to a Rec. 709 **luminance** in `0..1`, and exposes
the row-major `luma` buffer this strategy scans directly. No image data leaves the
browser.

### 2. Blur (denoise)

A separable **box blur** of radius `blur` (a cheap Gaussian stand-in) quiets
sensor and JPEG noise so it isn't mistaken for edges — the smoothing step Canny
always opens with. `blur = 0` skips it.

### 3. Sobel gradient

The 3×3 Sobel kernels give horizontal and vertical derivatives `gx, gy` at each
pixel. Their length is the **edge strength** and their angle the **edge
direction**. Strength is normalised by the operator's maximum response
(`4·√2` for `0..1` inputs) so the threshold reads as a clean `0..1` fraction.

### 4. Thin — non-maximum suppression

A real edge spans several pixels of rising-then-falling gradient. **NMS** walks
along the gradient direction (quantised to the four 45° axes) and keeps a pixel
only if it is the local *peak*, collapsing fat gradients to **1-px ridges**. The
`Thin` toggle turns this off for a rawer, heavier look.

### 5. Threshold

Pixels whose (thinned) strength clears `threshold` become the binary edge map.
Lower picks up faint detail and noise; higher keeps only the boldest outlines.

### 6. Trace into polylines

The plotter-friendly step. Instead of one dot per edge pixel, neighbouring edge
pixels are **chained** (8-connected, orthogonal neighbours preferred) into
continuous strokes:

- **Round 0** starts at *endpoints* (pixels with a single edge neighbour) and
  walks each open curve head-to-tail.
- **Round 1** mops up the remaining closed loops.

Pixels are consumed as they're visited, so a junction simply ends one stroke and
the leftover branches become their own strokes. Any chain shorter than
`minLength` is dropped — that's the noise filter, and it spares the pen a
lift-and-stab for every speck.

### 7. Simplify

Each traced chain is decimated with a perpendicular-distance test (`simplify`,
an RDP-style pass): long straight runs collapse to two points while corners
survive. Smaller SVG, same drawing.

### 8. Assembly

```html
<svg viewBox="0 0 W H" width="W" height="H">
  <rect width="W" height="H" fill="#fff"/>            <!-- or #111 when inverted -->
  <g stroke="#111" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <polyline points="x,y x,y …"/>
    …
  </g>
</svg>
```

## Controls

| Control        | Range    | What it does                                                                |
| -------------- | -------- | --------------------------------------------------------------------------- |
| **Threshold**  | 0.04–0.6 | Edge sensitivity. Lower = more (and noisier) lines; higher = bold outlines. |
| **Blur**       | 0–3 px   | Pre-smoothing to suppress noise before detection.                           |
| **Min length** | 1–40 px  | Drop traced strokes shorter than this — the clutter / noise filter.         |
| **Simplify**   | 0–3      | Vertex decimation tolerance. Higher = fewer points, blockier curves.        |
| **Weight**     | 0.3–2    | Stroke width.                                                               |
| **Thin**       | on / off | Non-maximum suppression: crisp 1-px edges (on) vs. raw fat gradients (off). |
| **Invert**     | on / off | White lines on dark vs. dark lines on light.                                |

## Why trace instead of stamping pixels

A thresholded edge map is thousands of isolated pixels — a pen plotter's worst
case, one lift per dot. Chaining them into connected polylines (and dropping the
short fragments) turns the same edges into long unbroken strokes that route into
fast, clean toolpaths, while `simplify` keeps the file small.

## Extending: adding another strategy

See [`README.md`](./README.md) for the full step-by-step. In short: write a pure
`Strategy` in `strategies/`, add it to the `STRATEGIES` array in
`strategies/index.ts`, and document its algorithm in a sibling `*.md` like this
one. It then appears automatically in the picker with its declared controls.
