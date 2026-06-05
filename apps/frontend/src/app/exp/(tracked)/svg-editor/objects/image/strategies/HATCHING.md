# Hatching & Cross-Hatching — Image → SVG

How the first conversion strategy turns a raster image into vector line art, the
way an engraver or pen-and-ink illustrator would: tone is rendered with nothing
but parallel strokes.

## The core idea

A photograph stores tone as **brightness per pixel**. To reproduce that tone
using only lines, we lean on a centuries-old trick: **hatching**. Lay down
parallel strokes where the picture is dark, leave the surface bare where it is
light, and the eye reassembles a continuous gradient out of discrete marks.
Where one set of strokes isn't dark enough, add a second set at a different
angle — **cross-hatching** — and the crossings read as a still-darker tone.

This strategy uses a **threshold-layered** version of that idea (the classic
"engraving" look) rather than per-cell stippling. Lines run continuously across
whole regions and are simply clipped to the areas dark enough to deserve them.

## Pipeline overview

```
image ─▶ downscale + luminance ─▶ tone buffer ─▶ threshold layers ─▶ <svg>
        (ImageToSvgCanvas)         (StrategyInput)  (hatching.ts)
```

### 1. Image → tone buffer

`prepareInput()` in `ImageToSvgCanvas.tsx`:

- Downscales the image so its long edge is ≤ **700 px** (`MAX_EDGE`). This keeps
  line generation fast and the emitted SVG compact.
- Draws it to a 2D canvas and reads pixels back with `getImageData`.
- Reduces each pixel to a single **luminance** value in `0..1` using the
  Rec. 709 weights:

  ```
  L = (0.2126·R + 0.7152·G + 0.0722·B) / 255
  ```

- Exposes a `sample(x, y)` that does **bilinear** interpolation into that buffer,
  so strokes can be walked at sub-pixel positions without aliasing.

The result — `{ width, height, luma, sample }` — is the framework-free
`StrategyInput` handed to the strategy. No image data leaves the browser.

### 2. Tone mapping

Before thresholding, each sampled value is shaped (`toneAt` in `hatching.ts`):

```ts
let l = sample(x, y);
l = clamp01(0.5 + (l - 0.5) * contrast); // contrast pivots around mid-grey
return invert ? 1 - l : l;               // invert flips which side gets hatched
```

The convention afterwards is: **smaller tone = darker = more strokes**.

### 3. Threshold layers

Tone is split into `levels` layers. For layer index `rank`:

| Property    | Value                          | Effect                                             |
| ----------- | ------------------------------ | -------------------------------------------------- |
| `threshold` | `(levels - rank) / (levels+1)` | Descending — layer 0 covers the most area          |
| `angle`     | `base + (rank odd ? cross : 0)`| Alternates base / cross angle → cross-hatching     |
| `phase`     | `rank · spacing / levels`      | Offsets same-angle layers so they interleave       |

Because thresholds descend, a **light** pixel only passes the first
(high-threshold) layer → a single sparse set of lines. A **dark** pixel passes
*every* threshold → it collects strokes from all layers, alternating direction,
which builds up into dense cross-hatching. The phase offset means two layers
that share the same angle don't draw on top of each other — they interleave and
genuinely increase line density.

### 4. Drawing & clipping one layer

For a layer's angle we take a direction vector `d` and its normal `n`, then
project the four image corners onto both to learn how many parallel lines are
needed to cover the whole image and how far each runs.

Each candidate line is walked in small steps:

```
P(t) = s·n + t·d
```

At every step we evaluate `toneAt(P)`. Steps where the tone is **below this
layer's threshold** form a "covered" run; contiguous covered steps are merged
into one `<line>` segment. So a stroke only exists over pixels dark enough for
that layer — the lines are clipped to the dark regions rather than drawn
everywhere and masked.

The marching step is bounded (`~1.2–2.5 px`) so generation stays fast while
still following region edges closely.

### 5. Assembly

All segments are emitted into a single grouped element:

```html
<svg viewBox="0 0 W H" width="W" height="H">
  <rect width="W" height="H" fill="#fff"/>           <!-- or #111 when inverted -->
  <g stroke="#111" stroke-width="0.8" stroke-linecap="round" fill="none">
    <line x1="…" y1="…" x2="…" y2="…"/>
    …
  </g>
</svg>
```

Coordinates are rounded to one decimal to keep the file small. The whole thing
is one self-contained SVG document string.

## Controls

| Control     | Range      | What it does                                                        |
| ----------- | ---------- | ------------------------------------------------------------------- |
| **Spacing** | 3–24 px    | Distance between parallel lines. Larger = looser, more open hatch.  |
| **Weight**  | 0.3–2      | Stroke width.                                                       |
| **Levels**  | 2–6        | Number of tone layers. More levels = smoother tonal steps.          |
| **Angle**   | 0–180°     | Base hatching direction.                                            |
| **Cross**   | 45–135°    | Angle added on alternating layers to form the cross-hatch.          |
| **Contrast**| 0.5–2.5    | Tone curve before thresholding. Higher pushes tones to the extremes.|
| **Invert**  | on / off   | White strokes on dark vs. dark strokes on light; flips which tones get hatched. |

## Why threshold layers (and not a grid of cells)

A grid-of-cells approach draws a fixed number of short, independent strokes per
cell based on its average tone — uniform and easy to tune, but mechanical.

Threshold layering instead draws **long continuous strokes** that span whole
regions and only break at tone boundaries. That continuity is exactly what gives
engravings and etchings their character, which is why it's the default here.

## Extending: adding another strategy

Every strategy is a pure function behind a small interface
(`strategies/types.ts`):

```ts
interface Strategy {
  id: string;
  label: string;
  controls: ControlDef[];                                   // drives the UI sliders
  render(input: StrategyInput, params: Record<string, number>): string; // returns <svg>
}
```

To add stippling, flow-field strokes, dithering, etc.:

1. Write a new file in `strategies/` exporting a `Strategy`.
2. Add it to the `STRATEGIES` array in `strategies/index.ts`.

It then appears automatically in the strategy picker, with its declared controls
rendered for it — nothing else in the tool needs to change.
