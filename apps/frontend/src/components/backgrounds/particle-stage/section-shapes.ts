import type { StageSectionConfig } from "./registry"

/**
 * What the shared point cloud does behind each CMS block type.
 *
 * Kept as one table rather than a `<StageSection>` scattered through the
 * fourteen section components, because the interesting property of this system
 * is the *sequence* — which shape follows which — and a sequence is impossible
 * to read when it is spread across fourteen files. `RenderBlocks` applies it.
 *
 * Conventions used here:
 *
 * - `offset` pushes the cloud toward whichever side the block leaves empty.
 *   `experience` is a left-rail timeline, so its cloud sits right; `process`
 *   runs the other way.
 * - `opacity` drops well below 1 behind any block that is itself dense — card
 *   grids, FAQ lists, forms. The cloud is a background, and a mesh behind a
 *   card grid competes with it.
 * - Consecutive blocks sharing a shape simply do not morph, which is a fine
 *   outcome and not something to design around.
 *
 * A block type absent from this table claims nothing; the previous section
 * keeps the stage until the next one that does claim it.
 */
export const SECTION_SHAPES: Record<string, StageSectionConfig> = {
  // Opening statement: the signature orb, centred, at full strength.
  pageHero: { shape: "orb" },
  pageServicesHero: { shape: "orb", scale: 1.1 },

  // Prose blocks — room to one side, so the cloud takes it.
  pageAbout: { shape: "grid", offset: { x: 0.28 }, opacity: 0.75 },
  pageExperience: { shape: "helix", offset: { x: 0.3 }, opacity: 0.7 },
  pageProcess: { shape: "helix", offset: { x: -0.3 }, opacity: 0.7 },

  // Full-width grids — the cloud sinks behind and dims out of the way.
  pageSkills: { shape: "torus", offset: { y: 0.18 }, opacity: 0.5 },
  pageProjectsTeaser: { shape: "scatter", scale: 1.25, opacity: 0.35 },
  pageServicesTeaser: { shape: "grid", scale: 1.2, opacity: 0.4 },
  // Rows plus the step strip below them: the same grid the teaser claims,
  // dimmed a touch further because the block is denser than either half.
  pageServicesProcess: { shape: "grid", scale: 1.2, opacity: 0.35 },
  pageLabTeaser: { shape: "torus", offset: { y: -0.2 }, opacity: 0.4 },
  pageBlog: { shape: "disc", offset: { y: 0.2 }, opacity: 0.4 },
  pageServices: { shape: "disc", offset: { y: 0.25 }, opacity: 0.5 },
  pageFaq: { shape: "torus", offset: { x: 0.3 }, opacity: 0.4 },

  // Closing: the cloud settles into a wide, flat pond under the contact form.
  pageContact: { shape: "disc", scale: 1.35, opacity: 0.55 },
  formBlock: { shape: "disc", scale: 1.2, opacity: 0.4 },
}
