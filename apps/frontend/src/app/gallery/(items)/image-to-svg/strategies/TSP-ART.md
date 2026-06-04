# TSP Art — Image → single continuous line

The plotter-community classic: reproduce a photograph with **one unbroken line**.
Scatter dots where the image is dark, treat each dot as a city, and route a short
"travelling-salesman" tour through all of them. The eye reassembles tone from the
density of the wandering line — and the machine draws the whole thing in a single
pen-down.

## The core idea

Two old tricks, stacked:

1. **Stippling** turns continuous tone into discrete dots whose *density* encodes
   darkness — dark regions get many dots, light regions get few. This is exactly
   how newspaper halftones and hedcut portraits fake grey with pure black marks.
2. **A TSP tour** then connects every dot in (near) shortest order. Because the
   route never lifts, dense (dark) clusters force the line to fold back on itself
   over and over, reading as a dark patch; sparse (light) regions get long, lonely
   traverses that read as light. The result is a single squiggle that *is* the
   picture.

This is the ideal pen-plotter toolpath: **one stroke, zero retractions** (see the
[strategies README](./README.md) on why continuity matters).

## Pipeline overview

```
image ─▶ downscale + luminance ─▶ darkness field ─▶ stipple dots ─▶ TSP tour ─▶ <polyline>
        (ImageToSvgCanvas)         (tsp-art.ts)      (Voronoi |       (NN + 2-opt)
                                                      Floyd–Steinberg)
```

### 1. Image → darkness field

From the shared `StrategyInput` (Rec. 709 luminance in `0..1`, long edge ≤ 700 px)
each pixel is shaped and inverted into a **darkness** value `0..1`:

```ts
let l = clamp01(0.5 + (luma - 0.5) * contrast); // contrast pivots around mid-grey
if (invert) l = 1 - l;
const darkness = 1 - l;                          // bigger = more dots
```

### 2. Darkness field → stipple dots

Two interchangeable methods (the **Method** control):

- **Voronoi** — *weighted Lloyd relaxation*. Seed `density` points by
  rejection-sampling the darkness field, then repeatedly (a) assign every dark
  pixel to its nearest point (via a uniform grid) and (b) move each point to the
  darkness-weighted centroid of the pixels assigned to it. A handful of passes
  spreads the dots into the even, organic "blue-noise" spacing that gives the
  classic Bosch/Kaplan TSP-art look. Empty cells are reseeded at a random dark
  pixel.
- **Floyd–Steinberg** — *error-diffusion dither*. Scale the darkness field so it
  sums to the target dot count, then serpentine-scan it diffusing the quantisation
  error to neighbours (the 7/16, 3/16, 5/16, 1/16 kernel). A dot is emitted
  wherever a pixel rounds up. Fast and deterministic, with a slightly grainier
  distribution than Voronoi.

The dot count is hard-capped at **4000** regardless of the slider so the tour
stays interactive.

### 3. Dots → TSP tour

- **Construction:** greedy **nearest-neighbour** — start anywhere, always hop to
  the closest unvisited dot. A uniform spatial grid (with removal) keeps each hop
  near-O(1) instead of scanning every remaining dot.
- **Improvement:** **2-opt** restricted to each dot's *k* nearest neighbours, with
  don't-look bits and the standard "stop once a candidate is farther than the edge
  we'd break" pruning. It repeatedly un-crosses pairs of edges until no local
  improvement remains *or* a wall-clock budget (set by **Quality**) expires —
  so even at full density a slider drag never freezes the tab.

### 4. Assembly

The tour is emitted as a **single open `<polyline>`** over a background `<rect>`,
coordinates rounded to one decimal:

```html
<svg viewBox="0 0 W H" width="W" height="H">
  <rect width="W" height="H" fill="#fff"/>          <!-- or #111 when inverted -->
  <g fill="none" stroke="#111" stroke-width="0.6" stroke-linejoin="round" stroke-linecap="round">
    <polyline points="x,y x,y x,y …"/>
  </g>
</svg>
```

## Controls

| Control      | Range                       | What it does                                                        |
| ------------ | --------------------------- | ------------------------------------------------------------------- |
| **Method**   | Voronoi / Floyd–Steinberg   | Stippling algorithm — even blue-noise vs. fast error-diffusion.     |
| **Dots**     | 500–4000                    | Target dot (city) count. More dots = finer detail, slower solve.    |
| **Relax**    | 0–12                        | Lloyd relaxation passes (Voronoi only; ignored for Floyd–Steinberg).|
| **Quality**  | 0–100%                      | 2-opt time budget (~40–440 ms). Higher = straighter, fewer crossings.|
| **Weight**   | 0.2–2                       | Stroke width of the line.                                           |
| **Contrast** | 0.5–2.5                     | Tone curve before stippling. Higher pushes tones to the extremes.   |
| **Invert**   | on / off                    | White line on dark vs. dark line on light; flips which tones get dots.|

## Why this approach

A grid or random scatter of dots, naively connected, produces a tangle of long
jumps that smears the tone and wastes plotter travel. Weighted stippling places
dots *where the tone wants them* and at locally even spacing, while the 2-opt tour
keeps the connecting line short and local — so line density faithfully tracks
darkness and the whole image is one efficient stroke. Nearest-neighbour + capped
2-opt isn't an optimal TSP solver (optimality isn't the point), but it's fast,
deterministic, and more than good enough for art.

## Extending

New strategies plug in the same way — write a pure `Strategy` and register it. See
the [strategies README](./README.md).
