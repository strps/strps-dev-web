import type { LabItemContent, LabSlug } from '../types';

/**
 * English source content for the four lab items — card copy, hero copy, the
 * interactive control micro-labels, and the below-the-hero narrative prose.
 * `es.ts` mirrors this shape (typed `Record<LabSlug, LabItemContent>`), so a
 * missing item is a compile error rather than a silent English fallback.
 *
 * NOTE: the image-to-svg strategy registry (strategies/*.ts — strategy names,
 * slider/select labels like "Spacing"/"Levels", select options) is deliberately
 * NOT localized here; those labels live inside the framework-free strategy
 * modules and threading a locale through them is a separate refactor.
 */
export const labContentEn: Record<LabSlug, LabItemContent> = {
  'svg-circles': {
    meta: {
      title: 'Parallax Circles | Gallery | Cesar Jerez',
      description:
        'A pointer-following SVG composition built on motion/react springs. Concentric rings with per-layer parallax and independent rotation.',
    },
    card: {
      title: 'Parallax Circles',
      description:
        'A pointer-following SVG composition. Concentric rings shift on a per-layer parallax factor while each ring slowly counter-rotates on its own clock.',
      tags: ['SVG', 'Motion', 'Parallax', 'Interactive'],
    },
    hero: {
      categoryBadge: 'Experiment',
      techBadge: 'Interactive',
      titleLead: 'Parallax',
      titleHighlight: 'Circles',
      lede: `Move your pointer. Each ring drifts on its own parallax factor while counter-rotating on its own clock. The same component drives the section backgrounds elsewhere on this site.`,
      hint: `Move the cursor across the page to nudge the field.`,
    },
    controls: {
      sliders: {
        circles: 'Circles',
        stroke: 'Stroke',
        focal: 'Focal',
        maxR: 'Max R',
        dash: 'Dash',
      },
      motion: { spring: 'spring', ease: 'ease', direct: 'direct' },
    },
    sections: [
      {
        heading: 'How it works',
        blocks: [
          {
            type: 'p',
            content: [
              `A single pair of motion values tracks the pointer. Each ring derives its center from those values multiplied by a per-layer factor — the outer rings move more than the inner ones, which sells the depth without any 3D math.`,
            ],
          },
          {
            type: 'p',
            content: [
              `Rotation is independent: every ring picks a random duration and direction on mount and loops forever. Strokes are dashed and use `,
              { code: 'pathLength="100"' },
              ` so the dash pattern stays consistent regardless of radius.`,
            ],
          },
        ],
      },
      {
        heading: 'Perspective model',
        blocks: [
          {
            type: 'p',
            content: [
              `Sizing isn't hand-tuned per ring — it falls out of a pinhole-camera formula. Each ring sits at a world depth `,
              { code: 'd' },
              ` between `,
              { code: 'focalLength' },
              ` (the nearest) and `,
              { code: 'focalLength + worldDepth' },
              ` (the farthest), and its projected radius is `,
              { code: '(focalLength · maxRadius) / d' },
              `.`,
            ],
          },
          {
            type: 'p',
            content: [`That single ratio gives the whole composition its "lens":`],
          },
          {
            type: 'ul',
            items: [
              [
                { strong: 'Short focal length' },
                ` — wide-angle. Near rings dominate, far rings shrink hard. Strong depth.`,
              ],
              [
                { strong: 'Long focal length' },
                ` — telephoto. Near and far compress toward the same size. Flatter, calmer.`,
              ],
            ],
          },
          {
            type: 'p',
            content: [
              `Parallax follows the same ratio: each ring's pointer factor is proportional to its projected radius, so near rings drift more than far ones for free.`,
            ],
          },
        ],
      },
      {
        heading: 'Motion patterns',
        blocks: [
          {
            type: 'p',
            content: [
              `The component accepts a `,
              { code: 'motionPattern' },
              ` prop. Three flavors of follow:`,
            ],
          },
          {
            type: 'ul',
            items: [
              [{ strong: 'spring' }, ` — bouncy, the default. Overshoots slightly and feels alive.`],
              [{ strong: 'ease' }, ` — exponential lerp every frame. Quieter, no overshoot.`],
              [
                { strong: 'direct' },
                ` — no smoothing. Snappy, twitchier, more honest about the input.`,
              ],
            ],
          },
        ],
      },
    ],
    variants: {
      heading: 'Variants',
      intro: [
        `Same component, different lenses. Each tile shares geometry — only `,
        { code: 'focalLength' },
        ` and the motion pattern change. Move across them to feel the depth shift.`,
      ],
      tileLabels: ['Wide-angle · Spring', 'Standard · Ease', 'Telephoto · Direct'],
    },
  },

  'gray-scott': {
    meta: {
      title: 'Gray-Scott | Gallery | Cesar Jerez',
      description:
        'An interactive Gray-Scott reaction-diffusion field running on the GPU with WebGL. Paint into it and slide between coral, maze, and mitosis patterns.',
    },
    card: {
      title: 'Gray-Scott',
      description:
        'A live reaction-diffusion field running on the GPU. Two virtual chemicals feed, react, and diffuse into coral, maze, and mitosis patterns you can paint into.',
      tags: ['WebGL', 'Simulation', 'Generative', 'Interactive'],
    },
    hero: {
      categoryBadge: 'Experiment',
      techBadge: 'WebGL',
      titleLead: 'Gray-Scott',
      titleHighlight: 'Reaction-Diffusion',
      lede: `Two virtual chemicals feed, react, and diffuse across a field running entirely on the GPU. Nudge the feed and kill rates to slide between corals, mazes, and dividing cells.`,
      hint: `Click and drag across the field to paint chemical into it.`,
    },
    controls: {
      sliders: { feed: 'Feed', kill: 'Kill', diffA: 'Diff A', diffB: 'Diff B' },
      presets: {
        corals: 'corals',
        mitosis: 'mitosis',
        spots: 'spots',
        maze: 'maze',
        worms: 'worms',
      },
    },
    sections: [
      {
        heading: 'The reaction',
        blocks: [
          {
            type: 'p',
            content: [
              `Gray-Scott models two chemicals, `,
              { strong: 'A' },
              ` and `,
              { strong: 'B' },
              `, spread across a grid. A is fed in everywhere; B is removed everywhere. Where they meet, the reaction `,
              { code: 'A + 2B → 3B' },
              ` converts A into more B — an autocatalytic loop that's constantly fighting the feed and kill terms trying to wash it out.`,
            ],
          },
          { type: 'p', content: [`Each cell updates from its neighbors every step:`] },
          {
            type: 'ul',
            items: [
              [{ code: `A' = A + (Dₐ∇²A − AB² + f·(1−A))·dt` }],
              [{ code: `B' = B + (D_b∇²B + AB² − (k+f)·B)·dt` }],
            ],
          },
          {
            type: 'p',
            content: [
              `The whole zoo of patterns lives in just two numbers — the feed rate `,
              { code: 'f' },
              ` and the kill rate `,
              { code: 'k' },
              `.`,
            ],
          },
        ],
      },
      {
        heading: 'How it works',
        blocks: [
          {
            type: 'p',
            content: [
              `The state lives in a texture — A in the red channel, B in the green. Each step renders a full-screen quad through a fragment shader that reads a cell's nine neighbors, computes the Laplacian, and writes the next state. Two textures are `,
              { strong: 'ping-ponged' },
              `: read from one, write to the other, swap, repeat.`,
            ],
          },
          {
            type: 'p',
            content: [
              `A single displayed frame runs the simulation `,
              { strong: 'a dozen times' },
              ` before drawing — the dynamics need many small steps to look smooth, and the GPU has them to spare. When the device supports it, the field uses 16-bit float textures for cleaner gradients, falling back to 8-bit when it doesn't.`,
            ],
          },
          {
            type: 'p',
            content: [
              `Painting is just another write: while the pointer is down, the simulation shader stamps B to 1.0 inside a small radius around the cursor, and the reaction takes it from there.`,
            ],
          },
        ],
      },
      {
        heading: 'Presets',
        blocks: [
          {
            type: 'p',
            content: [
              `Feed and kill carve out narrow bands of behavior, and small moves cross boundaries between completely different regimes:`,
            ],
          },
          {
            type: 'ul',
            items: [
              [{ strong: 'Corals' }, ` — branching fronts that grow into and fill space.`],
              [{ strong: 'Mitosis' }, ` — blobs that grow, stretch, and split into two.`],
              [{ strong: 'Spots' }, ` — stable dots that settle into a loose lattice.`],
              [{ strong: 'Maze' }, ` — winding labyrinth walls that never quite close.`],
              [{ strong: 'Worms' }, ` — wriggling filaments that drift and reconnect.`],
            ],
          },
        ],
      },
      {
        heading: 'Thanks',
        topBorder: true,
        blocks: [
          {
            type: 'p',
            content: [
              `The math, the parameter intuition, and the preset feed/kill values all come from Karl Sims' wonderful explainer, `,
              {
                link: 'Reaction-Diffusion Tutorial',
                href: 'https://www.karlsims.com/rd.html',
                external: true,
              },
              `. If you want to actually understand what's happening here, read that first.`,
            ],
          },
        ],
      },
    ],
  },

  'reaction-sphere': {
    meta: {
      title: 'Reaction-Diffusion on a Sphere | Gallery | Cesar Jerez',
      description:
        'A Gray-Scott reaction-diffusion simulation running over the surface of an icosphere with Three.js. Each vertex reacts and diffuses with its mesh neighbors on the GPU.',
    },
    card: {
      title: 'Reaction Sphere',
      description:
        'Gray-Scott reaction-diffusion running across the surface of an icosphere. Each vertex reacts and diffuses with its mesh neighbors on the GPU, in 3D you can spin.',
      tags: ['WebGL', 'Three.js', 'Simulation', '3D'],
    },
    hero: {
      categoryBadge: 'Experiment',
      techBadge: 'Three.js',
      titleLead: 'Reaction-Diffusion',
      titleHighlight: 'on a Sphere',
      lede: `The same two warring chemicals as Gray-Scott, but running across the surface of an icosphere — every vertex reacts and diffuses with its mesh neighbors, all on the GPU. Nudge the feed and kill rates to slide between corals, mazes, and dividing cells.`,
      hint: `Drag to rotate the sphere.`,
    },
    controls: {
      sliders: { feed: 'Feed', kill: 'Kill', diffA: 'Diff A', diffB: 'Diff B' },
      presets: {
        corals: 'corals',
        mitosis: 'mitosis',
        spots: 'spots',
        maze: 'maze',
        worms: 'worms',
      },
    },
    sections: [
      {
        heading: 'The reaction',
        blocks: [
          {
            type: 'p',
            content: [
              `This is the same Gray-Scott model as the `,
              { link: 'flat reaction-diffusion field', href: '/lab/gray-scott' },
              `: two chemicals, `,
              { strong: 'A' },
              ` and `,
              { strong: 'B' },
              `. A is fed in everywhere, B is removed everywhere, and where they meet the reaction `,
              { code: 'A + 2B → 3B' },
              ` turns A into more B. Each point updates from its neighbors every step:`,
            ],
          },
          {
            type: 'ul',
            items: [
              [{ code: `A' = A + (Dₐ∇²A − AB² + f·(1−A))·dt` }],
              [{ code: `B' = B + (D_b∇²B + AB² − (k+f)·B)·dt` }],
            ],
          },
        ],
      },
      {
        heading: 'Running it on a sphere',
        blocks: [
          {
            type: 'p',
            content: [
              `On a flat grid the Laplacian `,
              { code: '∇²' },
              ` is easy — every cell has exactly eight neighbors in a tidy 3×3 box. A sphere has no such grid. Instead the surface is an `,
              { strong: 'icosphere' },
              `: an icosahedron subdivided five times into ~10,000 vertices, each connected to `,
              { strong: 'six' },
              ` neighbors — except the twelve original corners, which keep just five.`,
            ],
          },
          {
            type: 'p',
            content: [
              `Because the neighborhood is irregular, the Laplacian becomes an `,
              { strong: 'umbrella operator' },
              `: the average of a vertex's neighbors minus the vertex itself. That single definition copes with both the five- and six-neighbor cases, so the math from the flat field carries over almost unchanged.`,
            ],
          },
        ],
      },
      {
        heading: 'How it works',
        blocks: [
          {
            type: 'p',
            content: [
              `The icosphere and its adjacency are `,
              { strong: 'precomputed once' },
              ` when the page loads. Each vertex's A/B state is packed into a single pixel of a data texture, and a second lookup texture stores a pointer to each vertex's neighbors. Every step renders that state texture through a fragment shader that gathers a vertex's neighbors, computes the umbrella Laplacian, and writes the next state — two textures `,
              { strong: 'ping-ponged' },
              ` a dozen times per displayed frame.`,
            ],
          },
          {
            type: 'p',
            content: [
              `To draw the result, the sphere's vertex shader looks up each vertex's chemical state straight from that texture, colors it through the same palette ramp as the flat field, and nudges the surface outward where chemical B is strong. When the device supports them, 16-bit float textures keep the gradients clean.`,
            ],
          },
        ],
      },
      {
        heading: 'Thanks',
        topBorder: true,
        blocks: [
          {
            type: 'p',
            content: [
              `The math, the parameter intuition, and the preset feed/kill values all come from Karl Sims' wonderful explainer, `,
              {
                link: 'Reaction-Diffusion Tutorial',
                href: 'https://www.karlsims.com/rd.html',
                external: true,
              },
              `.`,
            ],
          },
        ],
      },
    ],
  },

  'image-to-svg': {
    meta: {
      title: 'Image to SVG | Gallery | Cesar Jerez',
      description:
        'Convert any image into vector line art in the browser. The first strategy renders classical geometric halftoning with hatching and cross-hatching.',
    },
    card: {
      title: 'Image to SVG',
      description:
        'Turn any image into vector line art. The first converter renders classic engraving-style hatching and cross-hatching, with more strategies to come.',
      tags: ['SVG', 'Image', 'Halftone', 'Interactive'],
    },
    hero: {
      categoryBadge: 'Experiment',
      techBadge: 'SVG',
      titleLead: 'Image to',
      titleHighlight: 'SVG',
      lede: `Drop in any image and watch it redrawn as vector line art. The first converter renders classic engraving-style hatching and cross-hatching — darker tones pile on more crossed lines.`,
      hint: `Drag an image anywhere, or use Upload in the controls.`,
    },
    sections: [
      {
        heading: 'From pixels to strokes',
        blocks: [
          {
            type: 'p',
            content: [
              `Raster images store tone as brightness per pixel. To redraw that tone with nothing but lines, we borrow a trick that engravers and pen-and-ink illustrators have used for centuries: `,
              { strong: 'hatching' },
              `. Lay down parallel strokes where the picture is dark, leave the paper bare where it's light, and the eye reassembles a continuous gradient from discrete marks.`,
            ],
          },
          {
            type: 'p',
            content: [
              `Everything runs in your browser. The uploaded image is drawn to a canvas, downscaled to a working resolution, and reduced to a single luminance value per pixel. No data ever leaves the page.`,
            ],
          },
        ],
      },
      {
        heading: 'Threshold layers & cross-hatching',
        blocks: [
          {
            type: 'p',
            content: [
              `Tone is split into a handful of `,
              { strong: 'layers' },
              `, each with its own darkness threshold. A layer draws a full field of parallel lines across the image, but a stroke survives only where the underlying tone is darker than that layer's threshold — so each set of lines is clipped to the regions dark enough to deserve it.`,
            ],
          },
          {
            type: 'p',
            content: [
              `The darkest pixels fall below every threshold, so they collect strokes from every layer. Because successive layers alternate between the base angle and a rotated `,
              { strong: 'cross angle' },
              ` (and shift their phase within the spacing), dark regions build up into dense cross-hatching while light regions keep at most a single sparse set of lines. Spacing, weight, level count, angles, and contrast are all live controls.`,
            ],
          },
        ],
      },
      {
        heading: 'Built to grow',
        blocks: [
          {
            type: 'p',
            content: [
              `Hatching is just the first converter. Each strategy is a pure function from a prepared tone buffer to an SVG document, registered behind a small interface, so the picker in the controls is ready for stippling, flow-field strokes, dithering, and whatever comes next — without touching the rest of the tool.`,
            ],
          },
        ],
      },
    ],
  },
};
