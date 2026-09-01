import SmoothScrollProvider from "@/providers/smooth-scroll-provider"
import { ParticleStage, StageSection } from "@/components/backgrounds/particle-stage"
import type { ShapeId } from "@/components/backgrounds/particle-stage"

interface Panel {
  shape: ShapeId
  title: string
  copy: string
  /** Where the cloud parks while this panel owns the stage. */
  offset?: { x?: number; y?: number }
  scale?: number
  align: "left" | "right" | "center"
}

const PANELS: Panel[] = [
  {
    shape: "orb",
    title: "One cloud",
    copy: "The same 520 points follow you down the page. Nothing is created or destroyed at a section boundary — the shape underneath them changes.",
    align: "center",
  },
  {
    shape: "torus",
    title: "Polar paths",
    copy: "Each point rotates about the origin while its radius eases separately, so the cloud stays inflated instead of collapsing through the middle on its way across.",
    offset: { x: 0.24 },
    align: "left",
  },
  {
    shape: "helix",
    title: "Staggered arrival",
    copy: "Long journeys start first and take longer, so every point lands together at the end of the transition rather than the far ones arriving early and waiting.",
    offset: { x: -0.24 },
    align: "right",
  },
  {
    shape: "grid",
    title: "The mesh comes apart",
    copy: "Links belong to a shape. While the points move, both meshes are drawn at once and each edge fades as it is stretched off its rest length — the old structure dissolves as the new one knits together.",
    offset: { y: 0.2 },
    scale: 1.15,
    align: "center",
  },
  {
    shape: "scatter",
    title: "Dissolve through",
    copy: "A neutral noise cloud is the escape hatch: route any pair of shapes through it and the correspondence between them stops mattering.",
    align: "center",
  },
  {
    shape: "disc",
    title: "Settle",
    copy: "Scroll back up. The morph is a pure function of scroll offset, so it retraces exactly — no drift, no springs left mid-flight.",
    align: "center",
  },
]

const ALIGN = {
  left: "items-start text-left",
  right: "items-end text-right ml-auto",
  center: "items-center text-center mx-auto",
} as const

export default function ParticleStagePage() {
  return (
    <SmoothScrollProvider>
      <ParticleStage />

      <main className="relative">
        {PANELS.map((panel) => (
          <section
            key={panel.shape}
            className="relative flex min-h-[100dvh] w-full items-center px-8"
          >
            <StageSection shape={panel.shape} offset={panel.offset} scale={panel.scale} />
            <div className={`flex max-w-xl flex-col gap-4 ${ALIGN[panel.align]}`}>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {panel.shape}
              </span>
              <h2 className="text-4xl font-medium tracking-tight">{panel.title}</h2>
              <p className="text-base leading-relaxed text-muted-foreground">{panel.copy}</p>
            </div>
          </section>
        ))}
      </main>
    </SmoothScrollProvider>
  )
}
