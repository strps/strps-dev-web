"use client"

import * as React from "react"

import { registerSection, type StageSection as StageSectionEntry, type StageSectionConfig } from "./registry"

export interface StageSectionProps extends StageSectionConfig {
  /**
   * Which element owns the stage while it is on screen. By default the nearest
   * enclosing `<section>`, falling back to the marker's parent element.
   */
  target?: React.RefObject<HTMLElement | null>
  /**
   * Which element to measure when no `target` is given.
   *
   * `"section"` (the default) walks up to the enclosing `<section>` — right for
   * a marker placed *inside* a `<Section>`. `"parent"` measures the marker's own
   * parent, which is what `RenderBlocks` needs: the marker is a sibling of the
   * block, so the enclosing section is not an ancestor and `closest()` would
   * walk past it entirely.
   */
  anchor?: "section" | "parent"
}

/**
 * Claims the shared `ParticleStage` for the section it sits in.
 *
 * Renders nothing visible. Drop it anywhere inside a `<Section>` and the cloud
 * takes that shape while the section holds the middle of the viewport:
 *
 * ```tsx
 * <Section>
 *   <StageSection shape="torus" offset={{ x: 0.22 }} />
 *   …
 * </Section>
 * ```
 *
 * It resolves its own element with `closest("section")` rather than taking a
 * ref, so a server-rendered section can use it without becoming a client
 * component itself.
 */
export function StageSection({
  target,
  anchor = "section",
  shape,
  offset,
  scale,
  opacity,
  motion,
  size,
  drift,
  spin,
  angle,
  breath,
  pointerTilt,
  place,
}: StageSectionProps) {
  const markerRef = React.useRef<HTMLSpanElement>(null)

  // The render loop reads this object every frame, so it has to be stable
  // across renders and mutated in place — the same live-props mirror
  // ParticleOrb uses. Changing `offset` retunes the running stage; it does not
  // re-register the section, which would needlessly drop the cached bounds.
  const entryRef = React.useRef<StageSectionEntry>({
    el: null as unknown as HTMLElement,
    shape,
    offset,
    scale,
    opacity,
    motion,
    size,
    drift,
    spin,
    angle,
    breath,
    pointerTilt,
    place,
  })
  React.useEffect(() => {
    const entry = entryRef.current
    entry.shape = shape
    entry.offset = offset
    entry.scale = scale
    entry.opacity = opacity
    entry.motion = motion
    entry.size = size
    entry.drift = drift
    entry.spin = spin
    entry.angle = angle
    entry.breath = breath
    entry.pointerTilt = pointerTilt
    // Mirrored like the rest: an inline arrow is a new function every render,
    // and the loop reads the newest one on the next frame without the section
    // re-registering and dropping its cached bounds.
    entry.place = place
  })

  React.useEffect(() => {
    const marker = markerRef.current
    const el =
      target?.current ??
      (anchor === "parent" ? marker?.parentElement : marker?.closest("section")) ??
      marker?.parentElement
    if (!el) return

    const entry = entryRef.current
    entry.el = el
    return registerSection(entry)
  }, [target, anchor])

  return <span ref={markerRef} aria-hidden className="hidden" />
}

export default StageSection
