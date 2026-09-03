# ParticleStage

One point cloud, one canvas, behind the whole page. As you scroll, the cloud
morphs from the shape one section asked for into the shape the next one asks
for. Nothing is created or destroyed at a section boundary — the same points
rearrange.

```tsx
// once, near the root
<SmoothScrollProvider>
  <ParticleStage />
  {children}
</SmoothScrollProvider>

// in any section
<Section>
  <StageSection shape="torus" offset={{ x: 0.24 }} />
  …
</Section>
```

Live demo: [`/exp/particle-stage`](../../../app/exp/(tracked)/particle-stage/page.tsx).

This is a different component from [`ParticleOrb`](../ParticleOrb.tsx), not a
replacement for it. `ParticleOrb` is a self-contained decorative background that
owns its own canvas and animates its own tentacles; use it when a single section
wants an orb and nothing needs to transition. `ParticleStage` is a page-level
system, and the price of it is that every shape has to be static geometry so it
can be interpolated.

---

## Why the canvas is only one viewport tall

The obvious way to build a background that spans the page is a canvas the height
of the document. It does not work.

The backing store is `w × h × dpr² × 4` bytes. A 1920×10000px page at dpr 2 is
3840×20000 = 76.8M pixels, about **307 MB** for one canvas. And browsers cap it:
Chrome refuses any dimension over 16384px, and Safari on older iOS devices caps
the *total area* around 16.7M pixels — past which you get a silently blank
canvas, no error, no warning. You would ship something that works on your
desktop and is invisible on a good share of mobile.

So the canvas is `fixed`, exactly one viewport tall (`100dvh`, not `100vh`, so
the iOS URL bar cannot crop it), and scroll enters as *data* rather than as
geometry. The cloud is positioned relative to the viewport centre, and the
sections tell it where to sit via `offset`.

If you later want points that genuinely live in document space and scroll past,
that is one subtraction in the projection — `cy - (scrollState.y - anchorY)` —
and not a bigger canvas. Add a screen-space bounds test before the depth sort at
the same time, or you will sort thousands of off-screen points every frame.

---

## Shapes

`shapes.ts`. Every shape produces exactly `CLOUD_SIZE` (520) points as
interleaved xyz in unit space, where radius 1 is the nominal sphere surface.

Shipped: `orb`, `disc`, `torus`, `helix`, `grid`, `scatter`.

**Every shape must have the same point count**, because the morph pairs point
`i` in one cloud with point `i` in the next and there is nothing to interpolate
between clouds of different sizes. A shape that would rather have fewer points
sends the surplus to the origin, where they read as the core rather than as
debris — see the remainder handling at the end of `orb`.

Generators are seeded (`mulberry32`), not `Math.random()`. Clouds are cached,
but a cache can be dropped and rebuilt mid-session — under `Math.random()` the
cloud would silently reshuffle underneath a running morph.

### Canonical ordering

This is the whole correspondence strategy, and it is the difference between a
transition that reads as designed and one that reads as a bug.

Generators emit points in whatever order is natural for their own geometry: a
Fibonacci spiral, a row-major grid, a helical walk. Those orders have nothing to
do with each other, so pairing by raw index sends every point on an unrelated
journey and the cloud just boils.

So after generating, every cloud is sorted by a **shared spatial key** —
azimuth around Y (quantised into 28 rings so bands stay coherent), then height.
Index `i` then sits at a similar bearing and relative height in *every* shape,
points travel short distances, and the transition reads as the shape deforming.

Cost: `O(n log n)`, once per shape, at build time. Runtime cost of the pairing
itself: zero.

Radius is deliberately not in the key. The morph interpolates direction and
radius separately, so a point moving from the shell to the tip of an arm reads
as an extension rather than a stray.

### Adding a shape

Write a `Filler`, give it a seed, add it to `FILLERS`. Ordering, caching, mesh
building, and morph planning all follow automatically.

Two shapes are worth *precomputing to a file* instead of generating: text
sampled from a font, and anything derived from a 3D mesh. Not because the point
data is large — 520 points as Int16 is 3 KB — but because the *generator* is.
`opentype.js` plus a font file is several hundred KB shipped to the client to
produce a 3 KB cloud. Bake those offline, keep the generator in `scripts/`, and
inline the result as base64 Int16 (`[-1,1] → [-32767,32767]`, a step of 3×10⁻⁵
radii, well under a pixel). Int8 is *not* enough: 1/127 is about 3px of error at
a 400px radius, and it shows.

---

## Morphing

`morph.ts`. Two decisions, kept separate: which point goes where
(correspondence, solved above by ordering) and how it travels.

### The rule: pure in `t`

`morph()` takes progress and returns positions. No integration, no velocity, no
state carried between frames.

Progress comes from scroll, and scroll runs backwards as readily as forwards. An
integrated animation — a spring, a damped chase — drifts on the way back up and
settles somewhere it has never been. A pure function retraces exactly.

Anything that *should* keep moving while the page is still is an additive layer
driven by wall-clock `time`, not by `t`: the per-point breathing and the link
pulse. Those are unaffected by scroll direction, so they compose cleanly.

### Polar paths

A straight `lerp(a, b, e)` is the default and it is the weakest: points cut
through the middle of the cloud, and a sphere morphing into a larger sphere
visibly collapses inward before re-expanding.

Instead each point's **direction rotates** about the origin (Rodrigues about the
axis `a × b`) while its **radius interpolates separately**. The cloud stays
inflated the whole way.

The rotation axis vanishes when the two directions are parallel *or* antipodal.
Both cases are handled in `planMorph` by deriving a deterministic perpendicular;
leaving a zero axis in the buffer produces NaNs that poison the whole frame.

### The mid-flight bump

```ts
const w = 4 * e * (1 - e)   // 0 at both ends, 1 at the midpoint
out += bumpDirection * amplitude * w
```

The weight is exactly zero at `e = 0` and `e = 1`, so however far a point
wanders on the way, it lands on its target precisely. That guarantee is what
lets you raise `BUMP_AMOUNT` without the shape arriving smeared. Amplitude
scales with each point's travel distance, so points that barely move do not take
an excursion to get there.

### Staggered arrival

Long journeys **start first and take longer**, so everything lands together at
`t = 1`:

```ts
const dur = 1 - STAGGER * (1 - normalisedDistance)
start   = 1 - dur
```

The obvious alternative — equal durations with staggered starts — makes the far
points arrive early and sit waiting, which looks like the animation broke.

Everything above is precomputed once per shape *pair* in `planMorph` and cached:
axis, angle, timeline slot, bump vector. The per-frame loop is arithmetic on
typed arrays.

### If a pair will not look good

Route it through `scatter`. Explode into a neutral noise cloud, then reform.
Correspondence quality stops mattering because nothing is trying to look
continuous.

---

## The mesh under a morph

`mesh.ts`. `getMesh` is `ParticleOrb`'s `buildShellEdges`, generalised to any
cloud and memoised per shape: k-nearest-within-a-radius, not a plain radius cut,
because a plain cut gives uneven valence and reads as clumpy.

The thing to understand before changing anything here: **`ParticleOrb` can
precompute its mesh once because rotation is rigid and 3D distances never
change. Under a morph that invariant is gone.** A static edge list drawn through
a transition draws lines clean across the canvas.

So while `0 < t < 1`, both meshes are drawn at once, weighted `1-t` and `t`, and
every edge is checked against its rest length:

```ts
let s = 1 - (stretch - 1) * 1.1   // gone at ~1.9x rest length
```

Stretched edges fade out on their own, which is exactly the read you want — the
old structure comes apart while the new one knits together. At `t = 0` or `t = 1`
only one mesh is live and the cull never fires, so the settled state costs the
same as `ParticleOrb`'s.

Alpha is quantised into `LINK_BUCKETS` (8) and accumulated into one `Path2D` per
bucket, so a frame ends in at most 8 `stroke()` calls rather than one per edge.

### Warming

The mesh build is `O(n²)`. At 520 points that is ~270k distance tests plus a
sort per point — a few milliseconds, invisible on its own, but a dropped frame
if it happens the instant a transition starts, which is the worst possible
moment. `warmMesh` builds during `requestIdleCallback`, and the stage warms
every registered shape on mount and whenever the registry changes.

Rough scaling, if you raise `CLOUD_SIZE`:

| points | distance tests | build |
| --- | --- | --- |
| 520 | 270 K | ~5 ms |
| 1024 | 1 M | ~20–40 ms |
| 2048 | 4 M | ~100–200 ms |

Past ~1500 points, move the build into a Worker or precompute it alongside the
positions.

---

## Wiring

### Scroll

`SmoothScrollProvider` (`@/providers/smooth-scroll-provider`) mounts Lenis and
publishes its offset to `scrollState` (`@/lib/scroll`).

Two things there matter beyond `new Lenis()`:

- **One clock, and Lenis first on it.** Lenis is stepped from `gsap.ticker`, and
  `ParticleStage` draws from the same ticker. Separate `requestAnimationFrame`
  loops let the canvas read the previous frame's scroll offset, which shows up
  as the background lagging the page by a frame.

  Sharing the ticker is only half of it. Ticker callbacks fire in the order they
  were added, `SmoothScrollProvider` *wraps* the stage, and React runs child
  effects before parent ones — so the canvas registers first and draws from the
  offset Lenis computed on the previous frame. Same one-frame lag, arrived at a
  different way, and at 60fps during a fast flick it is tens of pixels of the
  cloud trailing its section. The provider therefore adds Lenis with GSAP's
  `prioritize` flag (`gsap.ticker.add(tick, false, true)`), which pins the
  scroll source to the head of the list no matter how the tree mounts.
- **Read `scrollState.y`, never `window.scrollY`.** Lenis animates a virtual
  offset and only lands on the native one when it settles; the two disagree for
  the entire duration of a smooth scroll.

`lenis.css` is imported by the provider. It carries
`scroll-behavior: auto !important`, which is what stops the `scroll-smooth`
class on `<html>` from fighting Lenis.

Under `prefers-reduced-motion`, Lenis is never constructed — smooth scrolling is
exactly the motion that preference is about — and the native scroll position is
mirrored instead. Everything downstream keeps working.

### Sections

`registry.ts` is a module-level list, deliberately outside React: a re-render
per scroll frame would cost far more than the canvas work it feeds.

`resolveStage()` turns scroll offset into `{ from, to, t }`. The reference is the
**viewport centre line**; whichever section contains it owns the stage. A *seam*
is the join between two consecutive sections, and `t` ramps 0 → 1 across a band
centred on that seam — so the morph runs while the join crosses the middle of
the screen and is settled everywhere else.

It is a pure function of scroll position: no hysteresis, no "current section"
state, so scrolling back up retraces exactly.

### Why the band is clamped

The band is **not** simply `blend * vh`, and this is the one piece of the
resolver worth understanding.

Sections on this site run 300–900px tall. At a 900px viewport, `blend: 0.55` is
a 495px band — wider than several of them. Two bands then overlap, and in the
overlap the *pair* changes while the previous morph is still running:

```
JUMP at y=953: s1->s2 t=0.969  =>  s2->s3 t=0.001
```

The cloud snaps the last 3% of one morph and restarts on another. That is what
choppy transitions actually were.

So each seam's band is clamped to the room between its neighbouring seams. Two
adjacent bands share the gap between them, so capping each at that gap leaves
them exactly touching at worst — never overlapping, at any section height.

`hold` (default `0.5`) then reserves half of each run as settled time, so every
section gets a stretch where its shape simply *is*. Without it, a page of
uniform sections is permanently mid-morph, which reads as busy rather than as
designed — and uniform sections are exactly what minimum heights produce, so the
two changes had to land together.

The outer seams have no neighbouring seam on one side, so the top and bottom of
the registered run stand in. Otherwise a two-section page gets an unbounded band
and never settles at all.

Measured over simulated pages, no discontinuities anywhere and:

| layout | settled scroll |
| --- | --- |
| the real page (900 hero, ~700 body) | 50% |
| uniform 630px minimums | 51% |
| a 2000px section among short ones | 69% |
| two sections only | 13% |
| uniform 300px (no minimums) | 54% |

### Section height

The resolver copes with short sections but cannot invent room: a section much
shorter than a viewport gets a proportionally short band, and the transition is
over before you have registered it.

So the minimums live in `Section`'s `SPACING_VARIANTS` — `min-h-svh` for `hero`,
`min-h-[80svh]` for `contact`, `min-h-[70svh]` for everything else. They are
minimums, not heights: taller content simply grows the section, and `className`
overrides them because `twMerge` resolves `min-h-*`.

`svh`, not `dvh` or `vh`. The smallest viewport height is the one that does not
reflow when a mobile URL bar appears, and a reflow mid-scroll invalidates every
cached section bound.

If a transition still feels rushed, more height is the fix; raising `blend` is
not, because the clamp discards the extra.

Bounds are measured once and cached. They are invalidated on resize, on registry
changes, and by a `ResizeObserver` on `document.body` — sections move whenever
anything above them reflows (an image loading, a font swapping, a CMS block
hydrating), and that is not a window resize.

### Following the section

The cloud does not sit pinned to the middle of the glass: it belongs to its
section and travels with it. `resolveStage` returns the owning section's
document-space centre and its box, and the cloud is placed at that centre in
viewport space — moving with the page, at the page's own rate.

`PARALLAX_DRIFT` (0.12) then holds it back by a fraction of the section's
distance from the viewport centre. It is a module const rather than a prop
because it is a property of how the background reads, not something a caller
should be choosing per mount. Keep it small: at 0 the cloud is glued to its
section and moves exactly like content, which is correct but flat; the drift is
what makes it read as sitting *behind* the page. Much past 0.5 the anchoring
stops reading at all and it is just a background again.

Both the anchor **and the box are blended across a transition alongside the
shape**, using the same `t`. That is the whole trick: handing the cloud from one
section to the next is continuous for free, so the position never jumps at a
seam even though the thing it is following just changed.

A section taller than the screen would carry the cloud off the top long before
it stopped owning the stage, so the cloud is clamped into the part of its box
that is actually on screen and **slides along the section** instead of leaving
with it. `parallaxPad` is how much of the cloud radius is kept inside that band.

The clamp is written so the pad never eats past the visible band's own centre.
That matters: a pad that could cross itself makes the clamped position jump as
the band shrinks, and it would jump at exactly the moment a short section enters
or leaves the screen — the most visible moment there is.

### Colours

The stage sits outside every section, so it cannot inherit a section's
`data-theme` the way `ParticleOrb` does. Instead it samples the CSS custom
properties off the two sections in play and crossfades between them — which
makes a per-section palette shift a feature rather than a regression.

Tailwind v4 emits these tokens as `oklch(...)`, and there is no hand-rolled
parser for that which stays correct as the design tokens change. So the browser
parses it: `color.ts` fills one pixel with the colour and reads the pixel back
(`parseColor`). Results are memoised per string, and sampling only happens when
the owning pair changes or the theme mutates — never per frame, because
`getComputedStyle` forces style resolution.

---

## Props

### `ParticleStage`

| Prop | Default | Meaning |
| --- | --- | --- |
| `radius` | `0.26` | Cloud radius as a fraction of the viewport's smaller side. |
| `spinSpeed` | `0.1` | Full turns per minute around Y. |
| `tilt` | `-0.32` | Fixed tilt in radians. |
| `blend` | `0.55` | Ceiling on the transition band, in viewport heights. Clamped down to the room between seams. |
| `hold` | `0.5` | Fraction of each inter-seam run held settled. Raise it for more rest between morphs. |
| `parallaxPad` | `0.9` | How much of the cloud is kept inside the section's on-screen box, as a fraction of its radius. |
| `linkDistance` | `0.34` | Neighbour radius in cloud units. 0 disables links. |
| `linkNeighbors` | `3` | Max edges per point. |
| `linkPulse` | `0.9` | Depth of the per-link twinkle. |
| `linkPulseSpeed` | `0.5` | Pulses per second for the fastest links. |
| `pointerTilt` | `0.02` | How far the pointer tips the cloud, in radians. |
| `pointerEase` | `2.5` | How fast it chases the pointer. 0 freezes the parallax. |
| `dotRadius` | `1.5` | Base dot radius in CSS px, before perspective. |
| `dotOpacity` | `0.72` | |
| `linkOpacity` | `0.3` | Ceiling for link alpha; the buckets divide it. |
| `dotColorVar` | `--color-primary` | Sampled off the owning section. |
| `linkColorVar` | `--color-muted-foreground` | |

### `StageSection`

| Prop | Default | Meaning |
| --- | --- | --- |
| `shape` | — | Required. Which cloud this section asks for. |
| `offset` | `{x:0,y:0}` | Where the cloud parks, in fractions of the viewport from centre. |
| `scale` | `1` | Cloud scale multiplier while this section owns the stage. |
| `opacity` | `1` | Opacity multiplier. 0 hides the cloud over this section. |
| `target` | nearest `<section>` | Override the tracked element. |

`offset`, `scale`, and `opacity` are interpolated alongside the shape, so a
section can move the cloud aside for its own content and the move happens over
the same seam as the morph.

---

## Performance

At the defaults, per frame: 520 morph evaluations, 520 projections, a 520-entry
sort, and ~1500 edge walks (double that mid-transition, single otherwise). All
buffers are allocated once; the only per-frame allocation is the eight `Path2D`
objects for the link buckets.

The stage idles when the tab is hidden and clamps `dt` to 50 ms so a
backgrounded tab does not jump the animation on return. DPR is capped at 2.

Under `prefers-reduced-motion` the morph snaps to whichever shape is nearer
instead of interpolating, and `dt` is forced to 0 so breathing, spin, and the
link pulse all stop. The cloud still follows the page — it just does not move on
its own.

---

## How it is wired on this site

It is on. `app/(website)/[locale]/layout.tsx` mounts it once:

```tsx
<ThemeProvider …>
  <SmoothScrollProvider>
    <ParticleStage />
    <HeaderNav … />
    {children}
    <Footer … />
  </SmoothScrollProvider>
</ThemeProvider>
```

Sections do **not** claim it individually. `section-shapes.ts` holds one table
from CMS block type to stage config, and `RenderBlocks` applies it:

```ts
pageHero:       { shape: "orb" },
pageAbout:      { shape: "grid",    offset: { x: 0.28 }, opacity: 0.75 },
pageExperience: { shape: "helix",   offset: { x: 0.3 },  opacity: 0.7 },
pageProjectsTeaser: { shape: "scatter", scale: 1.25, opacity: 0.35 },
…
```

The table is one file rather than a `<StageSection>` in each of the fourteen
section components, because the interesting property of this system is the
*sequence* — which shape follows which — and a sequence spread across fourteen
files cannot be read at all. It also keeps every section component ignorant of
the stage, so tuning the background never touches content code.

Three conventions in that table:

- `offset` pushes the cloud toward whichever side a block leaves empty.
  `pageExperience` is a left-rail timeline, so its cloud sits right;
  `pageProcess` runs the other way.
- `opacity` drops well below 1 behind any block that is itself dense — card
  grids, FAQ lists, forms. A link mesh behind a card grid competes with it.
- A block type absent from the table claims nothing, and the previous section
  keeps the stage until the next one that does claim it. That is how pages
  outside the block system (blog, projects, lab) behave: no sections register,
  `resolveStage()` returns null, and the canvas draws nothing at all.

### The anchor

`RenderBlocks` wraps each block in a `<div>`, and the marker is rendered as a
*sibling* of the block rather than inside its `<Section>`. So the enclosing
`<section>` is not one of the marker's ancestors and `closest("section")` would
walk straight past it — hence `anchor="parent"`, which measures the wrapper,
whose box is the block's box.

Inside a section component, the default `anchor="section"` is right:

```tsx
<Section>
  <StageSection shape="torus" offset={{ x: 0.22 }} />
  …
</Section>
```

### Per-block variants

The table is keyed by block type, not by block *variant*. `pageSkills` has list
and card variants, `pageHero` has statement and portrait, `pageProcess` has two
— and all of them get the same cloud. If a variant needs its own, drop a
`<StageSection>` inside that branch of the component; the last registration for
a given element wins, and the table entry can be removed for that type.

### Turning it off

Remove `<ParticleStage />` from the layout. The registrations become inert —
`registerSection` still runs, nothing reads it — so nothing else needs touching.

### Things it interacts with

- **`Section` paints its own background layers at `-z-10`** and has
  `overflow-hidden`. A section with `background` set to an image or `svgCircles`
  will occlude the stage over its own box. That is usually what you want; it is
  worth knowing it is happening.
- **`hero-exp.tsx` used to pass a `<ParticleOrb>` as its `backgroundLayer`.**
  That was removed when the stage went in — running both meant two clouds. The
  `ParticleOrb` component itself is untouched and still used elsewhere.
- **`<html class="scroll-smooth">`** would fight Lenis. `lenis.css`, imported by
  the provider, carries `scroll-behavior: auto !important` and settles it.
