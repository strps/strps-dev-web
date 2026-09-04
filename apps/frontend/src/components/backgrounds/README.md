# Canvas backgrounds

Two systems live here, and they are not alternatives to each other:

| | scope | shape |
| --- | --- | --- |
| **`ParticleField`** (below) | one component, its own canvas | one shape, held for as long as it is mounted |
| **[`particle-stage/`](./particle-stage/README.md)** | the whole page, one canvas | one cloud that morphs shape as you scroll |

Reach for `ParticleField` when a single component wants a particle background of
its own. Reach for `ParticleStage` when the background should carry the reader
*between* sections — the price of that is the registry, the scroll coupling and
the morph, none of which a lone hero needs.

They share everything below the shape: `shapes.ts`, `mesh.ts` and `color.ts`
live in `particle-stage/` and `ParticleField` imports them. A shape added there
is immediately available to both.

> Three older components — `ParticleOrb`, `ParticleOrbScreenLinks` and the flat
> 2D drifting-dot `ParticleField` — used to live here and are gone. The orb's
> per-point animation (swaying tentacles, streaming beads) is the one thing
> neither survivor does; `git show 23be5ad` has it if it is ever wanted back.

---

## ParticleField

```tsx
<header className="relative">
  <ParticleField shape="stack" offset={{ x: 0.3 }} />
  …
</header>
```

`aria-hidden`, `pointer-events-none`, and absolutely positioned to fill its
nearest positioned ancestor — so the host needs `relative`, and
`overflow-hidden` if the cloud should be clipped to it.

Everything lives in a single `useEffect` that runs once. Props are mirrored into
an `opts` ref each render, so tweaking a prop retunes the running field instead
of tearing it down — the cloud never jumps while you dial the look in.

Per frame: project every point, draw the mesh, depth-sort and draw the dots.

- **Geometry** is whatever `getCloud(shape)` returns: `CLOUD_SIZE` (520) points
  in unit space, cached and seeded. See
  [`particle-stage/README.md` § Shapes](./particle-stage/README.md#shapes).
- **Breathing** is the only animated layer. Each point carries a phase and an
  amplitude rolled at mount and integrates over wall-clock time — without it a
  field with `spinSpeed: 0` would be a still image.
- **Links** are measured in 3D against the mesh's rest lengths, so compressed
  edges brighten and stretched ones dim as the cloud breathes. Alpha is
  quantised into 8 buckets and accumulated into one `Path2D` each, so a frame
  ends in at most 8 `stroke()` calls. Only one mesh is ever live here — there is
  no morph — so the stage's crossfade collapses to a single pass.
- **Projection** clamps the perspective denominator at a near plane and fades
  points as they approach it, so a point passing the camera leaves rather than
  streaking across the canvas.

### Props

| Prop | Default | Meaning |
| --- | --- | --- |
| `shape` | `"orb"` | Any `ShapeId` from the shared library. |
| `radius` | `0.62` | Cloud radius as a fraction of the side `sizeFrom` measures. |
| `sizeFrom` | `"height"` | Which side of the host box sets the scale: `min`, `height` or `width`. |
| `offset` | `{x: 0, y: 0}` | Where the cloud sits, in fractions of the host box from its centre. |
| `spinSpeed` | `0.3` | Full turns per minute around Y. |
| `tilt` | `-0.32` | Fixed tilt in radians. |
| `pointerTilt` | `0.02` | How far the pointer tips the cloud, in radians. |
| `pointerEase` | `2.5` | How fast the cloud chases the pointer, per second. |
| `linkDistance` | `0.34` | **3D** neighbour radius in cloud units. 0 disables links. |
| `linkNeighbors` | `3` | Max edges kept per point. |
| `linkPulse` | `0.9` | Depth of the per-link twinkle. 0 steady, 1 fades a link out at its trough. |
| `linkPulseSpeed` | `0.5` | Pulses per second for the fastest links. |
| `dotRadius` | `1.5` | Base dot radius in CSS px, before perspective scaling. |
| `dotOpacity` | `0.72` | |
| `linkOpacity` | `0.5` | Ceiling for link alpha; the buckets divide it. |
| `dotColorVar` | `--color-primary` | CSS custom property sampled for dots. |
| `linkColorVar` | `--color-muted-foreground` | |

`sizeFrom` defaults to `height` rather than the stage's smaller-side rule
because a field is usually a band: as wide as the page and only as tall as the
thing it sits behind. Measuring the smaller side there measures the height
anyway, right up until a narrow phone, where it would shrink the cloud for no
reason.

Colours are read off the canvas with `getComputedStyle`, and a
`MutationObserver` on `<html>` re-samples them when `class`, `data-theme` or
`style` changes — so theme switches are picked up without a remount.

### Performance

Idle when off-screen (`IntersectionObserver`, 100px margin) and when the tab is
hidden. Static under `prefers-reduced-motion` — the cloud is drawn, it just
stops breathing and turning. `dt` is clamped to 50 ms so a backgrounded tab does
not jump on return, and DPR is capped at 2.

The canvas is sized from a `ResizeObserver` on itself rather than from `window`,
because the host box changes without the window doing anything: a font swapping,
a count arriving, the header's own text rewrapping.

It draws from `gsap.ticker`, the clock the stage and `SmoothScrollProvider`
already share. A second `requestAnimationFrame` loop beside them would only
interleave.

The one per-frame allocation left is the depth-sort `order` array in `drawDots`.

### Call sites

`PageHeaderBackground` (`components/primitives/`) is the only one: the hero band
on `/projects`, `/blog` and `/lab`. Those pages are hand-written, so nothing
claims the site-wide `ParticleStage` on them — the header brings its own field
instead, full-bleed and clipped to its own height. The shape comes from the
route: `stack`, `ribbon`, `atom`.
