# Wave Forms / Variable-Density Lines — Image → SVG

How the wave-forms strategy turns a raster image into vector line art the way a
seismograph or an oscilloscope would: a field of parallel lines, flat where the
picture is light and rippling where it is dark.

## The core idea

A single straight line carries no tone. Give it a **wobble** and the wobble's
size, speed, and crowding can each stand in for darkness. This strategy draws a
family of parallel lines across the whole page and encodes the image's tone into
**three** simultaneous modulations, all driven by the local sample:

- **amplitude** — darker pixels push the line further off its baseline;
- **frequency** — darker pixels make the wobble oscillate faster (tighter ripples);
- **bunching** — darker rows pull the next line closer, so strokes crowd together.

Where all three peak, lines become dense, high-amplitude ripples that read as
solid ink; where the image is light, the lines stay near-straight and widely
spaced. The eye reassembles a continuous gradient out of the varying line
density — the same illusion that powers hatching, reached a different way.

## Pipeline overview

```
image ─▶ downscale + luminance ─▶ tone buffer ─▶ modulated lines ─▶ <svg>
        (ImageToSvgCanvas)         (StrategyInput)  (wave-forms.ts)
```

### 1. Image → tone buffer

Identical to every strategy: `prepareInput()` in `ImageToSvgCanvas.tsx`
downscales the image (long edge ≤ **700 px**), reduces each pixel to a Rec. 709
**luminance** in `0..1`, and exposes a **bilinear** `sample(x, y)`. The
framework-free `{ width, height, luma, sample }` is the `StrategyInput`. No image
data leaves the browser.

### 2. Tone → darkness

Each sampled value is shaped, then flipped so larger means *more ink*
(`darknessAt` in `wave-forms.ts`):

```ts
let l = sample(x, y);
l = clamp01(0.5 + (l - 0.5) * contrast); // contrast pivots around mid-grey
if (invert) l = 1 - l;
return 1 - l;                            // darkness: 0 = light, 1 = dark
```

`darkness` in `0..1` is the single quantity that drives all three modulations.

### 3. Line family & coverage

For the chosen `angle` we take a direction vector `d` and its normal `n`, then
project the four image corners onto both to learn the span of line offsets
(`nMin..nMax`) needed to cover the whole image and how far each line runs
(`dMin..dMax`). This is the same bbox-projection trick hatching uses, so the
lines tile the page cleanly at any angle.

### 4. Walking one line

Each line at normal offset `s` is walked along `d` in small steps. At every step
the baseline point is `P(t) = s·n + t·d`; we sample the darkness there and
displace the point **along the normal** by a sine wobble:

```
phase  += (Δt) · frequency · (1 + freqMod · darkness)   // accumulated arc length
offset  = amplitude · darkness · sin(phase)
point   = P(t) + offset · n
```

- **Amplitude** scales the displacement by `darkness`, so light stretches stay on
  the baseline and dark stretches swing wide.
- **Frequency** is accumulated incrementally so the *instantaneous* frequency can
  rise with `darkness` (via `freqMod`) without the phase jumping — dark regions
  ripple tighter while the wave stays continuous.

The points are collected into one `<polyline>` per line — far more compact than
emitting a separate `<line>` per step.

The marching step is bounded (`~1–2.5 px`, derived from `spacing`) so the wobble
is resolved while generation stays fast and the SVG compact.

### 5. Bunching between lines

After each line, the offset advance to the next one shrinks with the darkness
sampled at the line's **midpoint**:

```
effSpacing = max(2, spacing · (1 − density · midDarkness))
s += effSpacing
```

So dark bands draw their lines closer together, increasing density on top of the
wobble. The lower clamp (`≥ 2 px`) keeps a slider from exploding the line count.

### 6. Assembly

All lines are emitted into a single grouped element:

```html
<svg viewBox="0 0 W H" width="W" height="H">
  <rect width="W" height="H" fill="#fff"/>           <!-- or #111 when inverted -->
  <g stroke="#111" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <polyline points="x,y x,y …"/>
    …
  </g>
</svg>
```

Coordinates are rounded to one decimal. The whole thing is one self-contained SVG
document string.

## Controls

| Control       | Range      | What it does                                                          |
| ------------- | ---------- | -------------------------------------------------------------------- |
| **Spacing**   | 4–24 px    | Base distance between lines (before bunching). Larger = more open.   |
| **Angle**     | 0–180°     | Direction of the line family.                                        |
| **Wobble**    | 0–8 px     | Maximum amplitude in the darkest areas.                              |
| **Frequency** | 0.02–0.4   | Base wave frequency (ripples per pixel).                             |
| **Freq mod**  | 0–1        | How much darkness raises the local frequency on top of the base.     |
| **Bunching**  | 0–1        | How strongly dark rows pull the next line closer.                    |
| **Weight**    | 0.3–2      | Stroke width.                                                        |
| **Contrast**  | 0.5–2.5    | Tone curve before darkness mapping. Higher pushes tones to extremes. |
| **Invert**    | on / off   | White lines on dark vs. dark lines on light; flips which tones ripple.|

## Why three modulations at once

Any one mechanism alone is legible but limited: amplitude-only looks like a
single seismograph trace, frequency-only can alias, bunching-only is just uneven
hatching. Layering all three — and driving them from the *same* darkness value —
gives a wide, controllable tonal range from a sparse set of continuous strokes,
while keeping the pen-plotter-friendly quality of unbroken polylines.

## Extending: adding another strategy

See [`README.md`](./README.md) for the full step-by-step. In short: write a pure
`Strategy` in `strategies/`, add it to the `STRATEGIES` array in
`strategies/index.ts`, and document its algorithm in a sibling `*.md` like this
one. It then appears automatically in the picker with its declared controls.
