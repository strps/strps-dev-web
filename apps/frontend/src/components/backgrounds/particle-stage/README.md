# ParticleStage

One point cloud, one canvas, behind the whole page. Scrolling a new section past
the trigger line starts a timed morph from the shape the last section asked for
into the shape this one asks for. Nothing is created or destroyed at a section
boundary — the same points rearrange.

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

Shipped: `orb`, `disc`, `torus`, `helix`, `grid`, `scatter`, and three built for
one page each — `stack` (a deck of card outlines, `/projects`), `ribbon` (a
curling sheet of ruled lines, `/blog`), `atom` (a nucleus in three tilted
orbitals, `/lab`).

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

Progress is integrated in exactly one place — `advance()` in `ParticleStage`,
which owns a single scalar and a single clock. Everything downstream is a
function of that scalar, so there is only ever one thing to reason about when a
morph looks wrong, and a plan is cacheable per shape *pair* rather than per
frame.

Anything that *should* keep moving while the page is still is an additive layer
driven by wall-clock `time`, not by `t`: the per-point breathing and the link
pulse. Those run whether or not a morph is in flight, so they compose cleanly.

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

`resolveOwner(trigger)` answers one question — **which section owns the stage** —
and nothing else. The reference is a horizontal line at `trigger` of the
viewport height (0.5, the middle of the screen, by default); whichever section
that line sits in owns the stage, and the handover happens at the *seam*, the
midpoint between two consecutive sections. Before the first section and after
the last, the nearest one owns it.

It is a pure lookup: no hysteresis, no "current section" state. Scrolling back
across a seam hands the stage back, and the stage animates back.

### Triggering

The morph is **not** scrubbed by scroll. Crossing a seam *starts* an animation,
and `advance()` runs it to completion on wall-clock time — `duration` seconds on
the `ease` curve — whether the reader keeps scrolling, stops dead in the middle,
or turns around. Stop halfway across a seam and the shape still arrives; that is
the whole point of the change.

This is what a scrubbed `t` could not give you. Scrubbing ties the speed of the
transition to the speed of the reader: a slow scroll leaves the cloud smeared
permanently mid-morph, a flick fires the entire morph in three frames, and the
band it runs over has to be clamped against every neighbouring band or two
morphs overlap and the cloud visibly snaps. A timed animation has one speed, the
designed one, at any section height and any scroll velocity.

Two rules keep it from stacking up:

- **A morph in flight is never interrupted.** A seam crossed mid-morph is
  noticed but not acted on; when the running morph lands, the stage sets off
  towards whichever section holds the trigger line *at that moment*. So flinging
  the page skips the shapes it flew past rather than queueing a backlog of
  morphs that then play out long after the reader has stopped.
- **The two placements are blended by the same `t` as the shape.** `advance()`
  reads both sections' live boxes every frame — they move with the page — and
  each section is then placed on its own terms; it is the *results* that are
  interpolated. So the cloud's position is continuous across a handover even
  though the section it is following just changed, and even when the two
  sections place the cloud by completely different rules. See
  [Per-section motion](#per-section-motion).

Under `prefers-reduced-motion` the duration is zero: the cloud is simply the
owning section's shape, and it changes at the seam.

Section height no longer bounds the transition, so `hold`, `blend`, and the band
clamping they needed are gone. Height still matters for a different reason,
below.

### Section height

A short section no longer truncates its morph, but it does cut short the time
the cloud spends *settled* in that shape: seams that are 200px apart fire a new
1.2s morph every 200px of scroll, and the cloud never rests.

So the minimums live in `Section`'s `SPACING_VARIANTS` — `min-h-svh` for `hero`,
`min-h-[80svh]` for `contact`, `min-h-[70svh]` for everything else. They are
minimums, not heights: taller content simply grows the section, and `className`
overrides them because `twMerge` resolves `min-h-*`.

`svh`, not `dvh` or `vh`. The smallest viewport height is the one that does not
reflow when a mobile URL bar appears, and a reflow mid-scroll invalidates every
cached section bound.

If the cloud feels permanently in motion, more section height is one fix and a
shorter `duration` is the other.

Bounds are measured once and cached. They are invalidated on resize, on registry
changes, and by a `ResizeObserver` on `document.body` — sections move whenever
anything above them reflows (an image loading, a font swapping, a CMS block
hydrating), and that is not a window resize.

### Following the section

This is `motion="follow"`, the default and the one every section on the site
uses. The alternatives are in [Per-section motion](#per-section-motion) below.

The cloud does not sit pinned to the middle of the glass: it belongs to its
section and travels with it. `resolveOwner` returns the owning section's
document-space centre and its box, and the cloud is placed at that centre in
viewport space — moving with the page, at the page's own rate.

`PARALLAX_DRIFT` (0.1) then holds it back by a fraction of the section's
distance from the viewport centre. It is a module const rather than a stage prop
because it is a property of how the background reads, not something a caller
should be choosing per mount — a *section* can override it with `drift` when it
wants a different depth, which is a different question from retuning the whole
stage. Keep it small: at 0 the cloud is glued to its section and moves exactly
like content, which is correct but flat; the drift is what makes it read as
sitting *behind* the page. Much past 0.5 the anchoring stops reading at all and
it is just a background again.

A section taller than the screen would carry the cloud off the top long before
it stopped owning the stage, so the cloud is clamped into the part of its box
that is actually on screen and **slides along the section** instead of leaving
with it. `parallaxPad` is how much of the cloud radius is kept inside that band.

The clamp is written so the pad never eats past the visible band's own centre.
That matters: a pad that could cross itself makes the clamped position jump as
the band shrinks, and it would jump at exactly the moment a short section enters
or leaves the screen — the most visible moment there is.

### Per-section motion

`follow` is one law, not the law. A section can ask for a different one, size
the cloud off its own box instead of the viewport, freeze the cloud's
self-motion, or replace the placement outright.

```tsx
<StageSection shape="torus" motion="fixed" size="section" spin={0} breath={0} />
```

**How a mode survives a seam.** At a seam two sections are both partly in play,
and a mode is not a number: you cannot average `follow` and `fixed`. So the
stage does not blend the *inputs* — it places each section independently, in
`placeSide`, and interpolates the two `{cx, cy, R}` answers by the same `t` as
the shape. Modes are then free to be arbitrarily different from each other and
the handover is still continuous, because what is crossfading is two positions.
(With both sides on the defaults this reduces to exactly the pre-existing
expression, every term in it being linear in the values that used to be blended.)

#### `motion`

| Mode | What the cloud does |
| --- | --- |
| `follow` | Default. Anchored to the section's centre, held back by `drift`, clamped into the on-screen part of the section box — the behaviour described above. |
| `fixed` | Pinned to the viewport and ignoring the section box entirely. The cloud does not respond to scroll at all while this section owns it; combined with `spin={0} breath={0}` it is completely still. |
| `scrub` | Position driven by the section's progress through the viewport: the cloud sweeps from the bottom of the screen to the top as the section passes, and stops when the reader stops. |

`scrub` is the one place in this system where scroll drives an animation
directly. That is deliberate and it is *placement only* — the morph stays a
timed animation, for all the reasons in [Triggering](#triggering). Scrubbing a
position is safe because position is a single continuous value with no notion of
completing; scrubbing a morph leaves the shape permanently half-formed.

#### `size`

`viewport` (default) takes the cloud radius from the viewport's smaller side, so
the cloud is the same size on every section. `section` takes it from the owning
element's smaller side, so a short block gets a small cloud and a tall one gets a
large one.

`viewport-height` and `section-height` measure the same two boxes by their
**height alone**, ignoring width. Use them when the box is wide and short and
the cloud should be sized by how tall it is rather than clamped by it — a
full-bleed banner under `section` gets its height as the smaller side anyway,
but a narrow column does not, and `section-height` keeps the cloud the size the
column is tall.

Every mode reads the element's **full** height, not the part currently on
screen — sizing off the visible band would shrink the cloud as the section
scrolled away. `scale` still multiplies whichever base is chosen.

#### Freezing the cloud

`spin`, `breath` and `pointerTilt` are multipliers on the stage's own values,
defaulting to 1. Zero any of them and that layer stops over this section. They
are blended across a seam like everything else, so the cloud spins *down* into a
still section rather than stopping dead at the boundary.

Note that `spin` is a rate, not an angle: setting it to 0 holds the cloud at
whatever bearing it had reached, it does not return it to a home position. Which
means a still section has no fixed pose of its own — it inherits the accumulator,
so the same section looks different depending on how long the reader took to
reach it.

`angle` is the answer when the pose matters: it pins yaw to a specific bearing,
in turns, and `spin` then stops moving the cloud on that side.

```tsx
<StageSection shape="grid" motion="fixed" spin={0} angle={0} />
```

Angles survive a seam the same way modes do — resolved per side and the two
*answers* interpolated, so a spinning section hands over to a pinned one by
turning into the bearing rather than snapping to it, and it takes the short way
round.

#### `place`

The escape hatch, for anything the modes do not cover:

```tsx
<StageSection
  shape="torus"
  place={({ box, progress }) => ({
    cy: box.top + box.height * 0.25,
    R: box.height * (0.2 + progress * 0.1),
  })}
/>
```

It runs once per side per frame — up to twice a frame — so keep it to
arithmetic. No layout reads (`getBoundingClientRect` here would thrash style
every frame; the box you are handed is already measured and cached), and no
allocation beyond the object you return.

It receives the mode's own answer as `default`, and anything it leaves out falls
back to that, so a callback that only cares about `cy` returns only `cy`. The
`box` it is handed is viewport-space `top`/`bottom` with the element's own
`height`/`width`; `progress` is the same 0–1 ramp `scrub` uses.

Because it is a function, `place` cannot live in the `section-shapes.ts` table —
it has to go on a `<StageSection>` inside the component. That is the intended
split: the table stays declarative and readable as a *sequence*, and a one-off
that genuinely needs code sits with the thing that needs it.

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
| `duration` | `1.2` | Seconds one shape-to-shape morph takes. |
| `ease` | `power2.inOut` | GSAP ease the morph runs on. |
| `trigger` | `0.5` | Where the trigger line sits, as a fraction of viewport height. |
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
| `motion` | `follow` | How the cloud responds to scroll: `follow`, `fixed`, `scrub`. |
| `size` | `viewport` | Where the radius is measured from: the screen or this element's own box, by its smaller side or (`-height`) its height alone. |
| `drift` | `PARALLAX_DRIFT` | How far the cloud lags its section under `follow`. |
| `spin` | `1` | Spin-rate multiplier. 0 stops the cloud turning here. |
| `angle` | — | Pins yaw to a bearing, in turns. Overrides `spin` on this side. |
| `breath` | `1` | Per-point breathing multiplier. 0 holds the cloud still. |
| `pointerTilt` | `1` | Pointer-parallax multiplier. 0 ignores the pointer here. |
| `place` | — | Replace any of `{cx, cy, R}` outright. See [`place`](#place). |
| `target` | nearest `<section>` | Override the tracked element. |

Everything above except `shape`, `target` and `place` is interpolated alongside
the shape on the same timed `t`, so a section can move the cloud aside for its
own content, resize it, or wind its motion down, and the change rides the same
animation as the morph. `motion`, `size` and `place` are not numbers, so what is
blended for those is the placement each side produces — see
[Per-section motion](#per-section-motion).

All of them are optional and all of them default to today's behaviour, so
`section-shapes.ts` needs no changes to keep working.

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
  `resolveOwner()` returns null, and the canvas draws nothing at all.

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
