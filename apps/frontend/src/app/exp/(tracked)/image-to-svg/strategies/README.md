# Writing & wiring an Image → SVG strategy

A **strategy** is the pluggable unit that turns a prepared tone buffer into an
SVG document. The UI (controls panel, strategy picker, download) is generic —
add a strategy and it shows up automatically. This guide shows how.

## The end goal: continuous CNC toolpaths

The SVG is an intermediate format, not the final product. The **ultimate purpose
is to generate G-code for a CNC machine / pen plotter**, so every strategy should
be designed as a *toolpath* first and a picture second. The single rule that
follows from this:

> **Prefer long, continuous paths. Minimise retractions.**

On a machine, every break between marks is a *pen-up → rapid → pen-down* cycle
(retraction + travel move). These add no ink but cost time, wear, and registration
error, and they dominate run time when marks are short and numerous. So:

- **Favour one (or few) unbroken `<polyline>`/`<polygon>` strokes** over thousands
  of tiny disjoint `<line>`/`<rect>`/dot elements. The Concentric Spiral is the
  ideal here — the entire image is one continuous stroke wound from the centre, so
  the machine never lifts. Wave Forms is next best (one polyline per line).
- **When you must break the path** (e.g. hatching only inks where tone crosses a
  threshold), keep runs as long as possible and order/group them so consecutive
  marks are physically close — short travels beat long ones.
- **Closed loops are free to traverse** but each separate loop is still a
  retraction; accumulate concentric/nested loops in an order that lets the machine
  step between neighbours rather than jumping across the work.
- **Avoid per-pixel stippling/dots** as a default — every dot is a retraction.
  If a strategy needs them, expose density controls clamped so the count stays
  machine-sane (the buffer cap helps, but think in *travel moves*, not elements).

A useful mental check while designing a strategy: *if I drew this with a single
pen and were charged per lift, how would I route it?* Build that routing into the
geometry, not as a post-process. Downstream SVG→G-code conversion can reorder and
join paths, but it can only do so much — a strategy that emits inherently
continuous geometry gives the cleanest, fastest tool path.

## The contract

Everything lives in [`types.ts`](./types.ts). A strategy implements one
interface:

```ts
interface Strategy {
  id: string;        // stable, unique, kebab-case (used in params + filenames)
  label: string;     // shown in the strategy picker
  controls: ControlDef[];                                   // drives the sliders/toggles
  render(input: StrategyInput, params: Record<string, number>): string; // returns "<svg>…</svg>"
}
```

Two rules make strategies easy to reason about:

1. **`render` is pure.** Same `input` + `params` → same SVG string. No DOM, no
   React, no globals, no fetching. This is why strategies are trivial to test
   and swap.
2. **Everything the user can tweak is a `ControlDef`.** The UI builds itself
   from `controls`; `render` just reads `params[key]`.

### What you're given: `StrategyInput`

The canvas decodes, downscales (long edge ≤ 700 px), and grayscales the image
for you, then hands over:

```ts
interface StrategyInput {
  width: number;          // working-resolution width
  height: number;         // working-resolution height
  luma: Float32Array;     // row-major luminance, one float in 0..1 per pixel
  sample(x, y): number;   // bilinear tone lookup in 0..1 (sub-pixel safe)
}
```

Prefer `sample(x, y)` when walking lines/curves at arbitrary positions; reach
into `luma` directly only for whole-pixel scans.

### What you describe: `ControlDef`

```ts
interface ControlDef {
  key: string;                       // matches the params record key
  label: string;                     // shown under the control
  kind: "slider" | "toggle" | "select"; // slider → VerticalSlider, toggle → Checkbox, select → dropdown
  min: number; max: number; step: number;
  default: number;                   // seeds params; toggles use 0 / 1
  format?: (value: number) => string;// optional readout, e.g. v => `${v}px`
  options?: string[];                // select only: option labels, indexed by value (i ⇒ i)
}
```

`defaultParams(strategy)` builds the initial `params` from these defaults, and
the hero re-seeds them whenever the strategy changes — so you never have to
handle "missing param" cases inside `render`.

## Step 1 — write the strategy file

Create `strategies/<your-id>.ts`. Skeleton:

```ts
import type { ControlDef, Strategy, StrategyInput } from "./types";

const CONTROLS: ControlDef[] = [
  { key: "spacing", label: "Spacing", kind: "slider", min: 4, max: 30, step: 1, default: 10, format: (v) => `${v}px` },
  { key: "invert",  label: "Invert",  kind: "toggle", min: 0, max: 1, step: 1, default: 0 },
];

function render(input: StrategyInput, params: Record<string, number>): string {
  const { width: W, height: H, sample } = input;
  const spacing = Math.max(1, params.spacing ?? 10);
  const invert  = (params.invert ?? 0) > 0.5;

  const stroke = invert ? "#ffffff" : "#111111";
  const bg     = invert ? "#111111" : "#ffffff";

  const marks: string[] = [];
  // …your algorithm: read sample(x, y), push SVG element strings into `marks`…

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">` +
    `<rect width="${W}" height="${H}" fill="${bg}"/>` +
    `<g fill="${stroke}" stroke="none">` +
    marks.join("") +
    `</g></svg>`
  );
}

export const myStrategy: Strategy = {
  id: "my-strategy",
  label: "My Strategy",
  controls: CONTROLS,
  render,
};
```

Conventions worth following (see [`hatching.ts`](./hatching.ts) for the full
reference implementation):

- **Tone convention:** treat *smaller = darker = more ink*. A simple tone helper
  that respects contrast/invert:

  ```ts
  const toneAt = (x: number, y: number) => {
    let l = sample(x, y);
    l = Math.min(1, Math.max(0, 0.5 + (l - 0.5) * contrast)); // optional contrast
    return invert ? 1 - l : l;
  };
  ```

- **Always emit `viewBox="0 0 W H"`** plus a background `<rect>`. The working
  resolution is the SVG's coordinate space; it scales cleanly to any size.
- **Round coordinates** (e.g. `.toFixed(1)`) to keep the file small.
- **Bound your work.** The buffer is already capped at 700 px, but if your
  inner loops scale with `1 / spacing²` (stippling, dots) clamp the lower end of
  `spacing` so a slider can't explode the element count.
- **Group output** in one `<g>` so stroke/fill attributes aren't repeated per
  element.

### Optional: paper.js for heavy geometry

[`paper.js`](http://paperjs.org/) (v0.12) is installed and available to import.
**Default to building the SVG string by hand** — as `hatching.ts` and
`wave-forms.ts` do. It's smaller, faster, dependency-free, and trivially pure.
**Only reach for paper.js when the geometry genuinely needs it**: boolean path
ops (union/subtract/intersect), curve smoothing/`simplify()`, offsetting,
self-intersection resolution, or flattening complex curves to polylines.

If you do use it, keep `render` effectively pure despite paper's global scope —
set up headless, build into a fresh project, export a string, then tear down:

```ts
import paper from "paper";

paper.setup(new paper.Size(W, H));          // headless, no <canvas> needed
// …build paths from sample(x, y)…
const svg = paper.project.exportSVG({ asString: true }) as string;
paper.project.clear();                       // don't leak state into the next render
```

You still own the wrapper: emit your own `<svg viewBox>` + background `<rect>`
around paper's output (or pass paper's paths through), and round coordinates.

## Step 2 — wire it into the registry

Register it in [`index.ts`](./index.ts) — that's the only edit outside your file:

```ts
import { hatchingStrategy } from "./hatching";
import { myStrategy } from "./my-strategy";   // ← add import
import type { Strategy } from "./types";

export const STRATEGIES: Strategy[] = [
  hatchingStrategy,
  myStrategy,                                   // ← add to the array
];
```

Order in the array = order in the picker. `STRATEGIES[0]` is the default the
page loads with and the fallback `getStrategy()` returns for an unknown id.

## Step 3 — document the algorithm

Every strategy ships an algorithm doc next to its code: an `UPPER-KEBAB.md`
named after the strategy (e.g. [`HATCHING.md`](./HATCHING.md),
[`WAVE-FORMS.md`](./WAVE-FORMS.md)). The strategy file explains *what the code
does*; this doc explains *why it looks the way it does* — the visual idea, the
tone-mapping, and what each control changes.

Copy the structure of an existing one. The expected sections are:

1. **Title + one-line hook** — name the look and the real-world analogue.
2. **The core idea** — the visual trick that reproduces tone with marks.
3. **Pipeline overview** — the `image ─▶ … ─▶ <svg>` diagram and a walk through
   each stage (tone buffer → tone/darkness mapping → your algorithm → assembly).
4. **Controls** — a table of every `ControlDef`: control, range, what it does.
   Keep it in sync with the `CONTROLS` array in your strategy file.
5. **Why this approach** — the trade-off that justifies the technique.
6. **Extending** — a pointer back to this README.

## That's it

No UI changes are needed. On the next render the hero will:

- list `myStrategy.label` in the strategy `Select`;
- render a `VerticalSlider` for each `slider` control, a `Checkbox` for each
  `toggle`, and a labelled `Select` dropdown for each `select` (from its
  `options`), seeded from your `default`s;
- recompute (debounced) by calling `myStrategy.render(input, params)` on any
  image/param change, show the SVG, and feed it to the Download button.

## Checklist

- [ ] `id` is unique and kebab-case.
- [ ] `render` is pure — no DOM/React/IO.
- [ ] Every tweakable value is a `ControlDef`; `render` reads `params[key]` with a
      sensible `?? default`.
- [ ] Output is a single `<svg>` with `viewBox`, a background `<rect>`, and grouped marks.
- [ ] Coordinates rounded; loops bounded against extreme slider values.
- [ ] Imported and added to `STRATEGIES` in `index.ts`.
- [ ] Algorithm doc added as a sibling `UPPER-KEBAB.md`, controls table in sync.
- [ ] `tsc --noEmit` and `eslint` pass.
```
