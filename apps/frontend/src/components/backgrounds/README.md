# ParticleOrb

A decorative canvas background: a sphere of particles with tentacles reaching
out of it, perspective-projected onto a 2D canvas. Theme-aware, idle when
off-screen, and static under `prefers-reduced-motion`.

```tsx
<ParticleOrb shellCount={190} tentacles={6} sphereRadius={0.26} className="opacity-90" />
```

It is `aria-hidden` and fills its parent (`h-full w-full`), so it wants a
positioned container — in this repo it is passed as `Section`'s `backgroundLayer`.

---

## How it works

Everything lives in a single `useEffect` that runs once. Props are mirrored into
an `opts` ref each render, so tweaking a prop retunes the running simulation
instead of tearing it down and restarting it. That matters while you are dialling
in the look: the sphere never jumps.

Per frame the loop does `rebuild()` → `step(dt)` → `draw()`.

### Geometry

- **Shell** — `shellCount` points on a Fibonacci lattice (`fibonacciSphere`),
  which spreads them evenly over a unit sphere. Each carries a breathing phase
  and amplitude, plus a fixed random offset scaled by `scatter`.
- **Tentacles** — `tentacles` arms, each with a unit direction `dir` and an
  orthonormal basis `u`/`v` spanning the plane it sways in. `tentacleBeads`
  beads sit at arc positions `t ∈ [0, 1]` (0 at the sphere surface, 1 at the
  tip) and are offset into a disc around the arm's spine so the stream has a
  body rather than collapsing onto a line. The stored bead parameter is
  uniform; `t = u ** beadRootBias` warps it at draw time, so the beads crowd
  around the base while still flowing evenly through that profile.
- **Projection** — world coordinates are already in px. They are rotated
  (`spin` around Y, `tilt` + pointer parallax around X) and then divided
  through by `focal / (focal + z)`.

### The link mesh

This is the part worth understanding before changing anything.

**Links are measured in 3D, not on screen.** Screen-space linking has two
artifacts: points on the far side of the sphere connect to points on the near
side purely because they overlap in projection, and perspective compression
makes the *back* of the sphere denser than the front. Both are wrong, and no
amount of depth fading fixes the topology.

**Because rotation is rigid, 3D distances between shell particles never
change.** So neighbours are chosen exactly once and stored as a flat edge list:

```ts
shellEdgeA: Uint16Array    // endpoint index
shellEdgeB: Uint16Array    // endpoint index
shellEdgeRest: Float32Array // build-time distance, in unit-sphere units
```

The shell is pushed into the `projected` buffer first, so `projected[i]`
corresponds to `shell[i]` and the edge arrays index straight into it — no
lookup table.

Selection is **k-nearest within a radius**, not a plain radius cut. A radius cut
gives uneven valence on a Fibonacci lattice (some vertices catch 4 neighbours,
some 8) and reads as clumpy; sorting the candidates and capping at
`linkNeighbors` gives a uniform mesh. The search radius is 1.15× `linkDistance`
so breathing cannot pop an edge in and out at the threshold.

Cost: at the defaults this replaces ~18k pair tests per frame with ~500 edge
walks, roughly a 30× reduction in link work.

At draw time each shell edge compares its **live** 3D length against
`shellEdgeRest`. Compressed edges brighten, stretched ones dim, so the mesh
visibly breathes instead of just pulsing. That ratio is multiplied by a
`depthFade` derived from the perspective `scale`.

Arms are handled in two more passes:

- **Within an arm** — each bead pairs with the next `armLinkSpan` beads, not
  only its immediate successor. Beads sit scattered around the arm's axis, so
  the longer hops cross the tube and web it; a span of 1 collapses the arm back
  into a single spine. Spacing is not fixed (`flowSpeed`, `beadSpread`), so
  each edge is culled by live distance, with the cut scaled by the pair's index
  gap — a flat cut would drop every long hop. That cull also silently drops the
  wrap-around edge, where a bead has just respawned at the tip behind its array
  neighbour.
- **Arm roots into the shell** — the only genuinely dynamic pass. Restricted to
  beads with `t < 0.15`, so it stays a few thousand tests. Toggle with
  `linkArmsToShell`.

Cross-arm links are deliberately absent: arms are far apart in world space, and
the cross-arm links you may remember from the screen-space version were the
false-projection artifact.

### Pulsing

Every static edge is rolled a phase and a rate (`rollPulses`) alongside the
mesh, and its alpha is scaled by `1 - linkPulse * (0.5 + 0.5 * sin(...))`. The
rates are spread over roughly 0.35–1.25× `linkPulseSpeed`, so no two links beat
together and the mesh twinkles rather than throbbing as one. The arm-root pass
is dynamic and has no stored slot, so it hashes its index pair into a phase and
rate instead — deterministic, so a root link does not flicker as the pass
re-finds it. `linkPulse: 0` turns the whole thing off.

### Batching

Alpha varies per edge, so a naive `beginPath/stroke` per edge would mean
hundreds of canvas calls a frame. Instead alpha is quantised into
`LINK_BUCKETS` (8) levels, edges are accumulated into one `Path2D` per bucket,
and the frame ends with at most 8 `stroke()` calls. Once the edge count is
small, this — not the distance arithmetic — is the dominant cost, so raise
`LINK_BUCKETS` only if you can see the banding.

---

## Props

### Sphere

| Prop | Default | Meaning |
| --- | --- | --- |
| `shellCount` | `190` | Particles in the sphere shell. |
| `sphereRadius` | `0.26` | Radius as a fraction of the canvas' smaller side. |
| `spinSpeed` | `0.1` | Full turns per minute around Y. |
| `tilt` | `-0.32` | Fixed tilt in radians. |
| `pointerTilt` | `0.28` | How far the pointer tips the sphere, in radians. |
| `scatter` | `0.01` | Fixed random offset off the lattice, as a fraction of the radius. |

### Tentacles

| Prop | Default | Meaning |
| --- | --- | --- |
| `tentacles` | `6` | Number of arms. |
| `tentacleBeads` | `46` | Beads per arm. |
| `tentacleLength` | `4` | Reach, as a multiple of the sphere radius. |
| `tentacleSway` | `0.1` | Tip sway off the base axis, as a multiple of the radius. |
| `tentacleThickness` | `0.2` | Radius of the bead tube around the arm's axis. |
| `beadSpread` | `0` | 0 evenly spaced, 1 fully random. |
| `beadRootBias` | `2.4` | Bunching toward the base. 1 is even along the reach; higher crowds the root and thins the tip. |
| `flowSpeed` | `0` | Arm-lengths travelled per second. 0 freezes the beads. |

### Links

| Prop | Default | Meaning |
| --- | --- | --- |
| `linkDistance` | `0.32` | **3D** neighbour radius, as a fraction of the sphere radius. 0 disables links. |
| `linkNeighbors` | `6` | Max edges kept per shell particle. |
| `linkArmsToShell` | `true` | Link the innermost beads of each arm into the shell. |
| `armLinkSpan` | `3` | How many beads ahead each bead links to along its arm. 1 is a bare chain. |
| `linkPulse` | `0.55` | Depth of the per-link opacity pulse. 0 is steady, 1 fades a link fully out at its trough. |
| `linkPulseSpeed` | `0.5` | Pulses per second for the fastest links; each link picks its own rate below it. |

> `linkDistance` used to be a screen-space distance in CSS px. It is now a
> world-space fraction — `0.32`, not `30`. The natural lattice spacing is about
> `sqrt(4π / shellCount)` (≈ `0.26` at the default count), so values much below
> that disconnect the mesh and much above it produce a solid ball of lines.

### Appearance

| Prop | Default | Meaning |
| --- | --- | --- |
| `dotRadius` | `1.5` | Base dot radius in CSS px, before perspective scaling. |
| `dotOpacity` | `0.72` | |
| `linkOpacity` | `0.9` | Ceiling for link alpha; the buckets divide this. |
| `pondRadius` | `0.72` | Central glow radius, as a multiple of the sphere radius. |
| `pondOpacity` | `0` | The pond is off by default. |
| `dotColorVar` | `--color-primary` | CSS custom property sampled for dots. |
| `linkColorVar` | `--color-muted-foreground` | |
| `pondColorVar` | `--color-primary` | |

Colours are read off the canvas element with `getComputedStyle`, and a
`MutationObserver` on `<html>` re-samples them when `class`, `data-theme`, or
`style` changes — so theme switches are picked up without a remount.

---

## Tuning notes

- **Changing `shellCount`, `linkDistance`, `linkNeighbors`, or `scatter`
  rebuilds the mesh.** `rebuild()` compares a joined signature string against
  `meshKey` and only re-runs `buildShellEdges` on a change, so live tweaking is
  cheap but not free — the rebuild is O(n²) once (~36k ops at the default).
- **`beadSpread` forces a bead re-roll.** Bead placement is rolled once, so a
  changed spread would otherwise look like a no-op. `seededSpread` tracks it.
- Resizing does *not* rebuild the mesh: edges are stored in unit-sphere units
  and multiplied by `R` at draw time.

## Performance

Idle when off-screen (`IntersectionObserver`, 100px margin) and when the tab is
hidden (`visibilitychange`). `dt` is clamped to 50 ms so a backgrounded tab does
not jump the animation on return. DPR is capped at 2.

The remaining per-frame O(n·m) work is the arm-root pass; if it ever shows up in
a profile, drop `linkArmsToShell` or bin the shell into a coarse spatial grid.

The `projected` buffer is allocated lazily and reused across frames. The one
per-frame allocation left is the depth-sort `order` array in `draw()`.

---

## ParticleOrbScreenLinks (previous version)

`ParticleOrbScreenLinks.tsx` is the version that came before the 3D mesh, kept
side by side while the look is being decided. The geometry is byte-for-byte the
same — same lattice, same arms, same projection, same breathing. The only
difference is the link pass:

|  | `ParticleOrb` | `ParticleOrbScreenLinks` |
| --- | --- | --- |
| Distance measured in | 3D world space | 2D screen space |
| Neighbours | picked once, k-nearest, static | re-tested every frame, all pairs |
| Pair tests per frame | ~500 edge walks | ~77k |
| `stroke()` calls per frame | ≤ 8 (bucketed `Path2D`) | one per drawn edge |
| `linkDistance` unit | fraction of sphere radius (`0.32`) | CSS px (`30`) |
| Front/back tangling | none | far side links to near side |
| Link brightness driven by | edge stretch vs. rest length + depth | screen distance + depth |
| Arm links | within-arm spine + arm roots into shell | whatever happens to overlap |

Swapping is a one-line import change in
`src/components/page-sections/hero-exp.tsx`:

```tsx
import { ParticleOrbScreenLinks as ParticleOrb } from '@/components/backgrounds/ParticleOrbScreenLinks';
```

Note the `linkDistance` units differ by two orders of magnitude — `30` on the
screen-space version, `0.32` on the 3D one. Passing one to the other gives you
either nothing or a solid ball. Delete this file once the look is settled.

---

## ParticleField

`ParticleField.tsx` is the older, flat 2D drifting-dots background. It is
unrelated to `ParticleOrb` and still uses screen-space `linkDistance` in CSS px
(default `130`) — do not carry values between the two.
