import Section from "@/components/section";
import SVGCircles from "@/components/section/SVGCircles";
import { SvgCirclesHero } from "./SvgCirclesHero";

export const metadata = {
    title: "Parallax Circles | Gallery | Cesar Jerez",
    description:
        "A pointer-following SVG composition built on motion/react springs. Concentric rings with per-layer parallax and independent rotation.",
};

export default function SvgCirclesPage() {
    return (
        <main className="min-h-screen">
            <SvgCirclesHero />

            {/* How it works */}
            <Section className="py-16" containerClassName="container mx-auto px-4 max-w-3xl space-y-10">
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">How it works</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        A single pair of motion values tracks the pointer. Each ring derives its
                        center from those values multiplied by a per-layer factor — the outer rings
                        move more than the inner ones, which sells the depth without any 3D math.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                        Rotation is independent: every ring picks a random duration and direction on
                        mount and loops forever. Strokes are dashed and use{" "}
                        <code className="px-1.5 py-0.5 rounded bg-muted text-xs">pathLength=&quot;100&quot;</code>{" "}
                        so the dash pattern stays consistent regardless of radius.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">Motion patterns</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        The component accepts a{" "}
                        <code className="px-1.5 py-0.5 rounded bg-muted text-xs">motionPattern</code>{" "}
                        prop. Three flavors of follow:
                    </p>
                    <ul className="text-muted-foreground space-y-2 list-disc pl-6">
                        <li>
                            <strong className="text-foreground">spring</strong> — bouncy, the default.
                            Overshoots slightly and feels alive.
                        </li>
                        <li>
                            <strong className="text-foreground">ease</strong> — exponential lerp every
                            frame. Quieter, no overshoot.
                        </li>
                        <li>
                            <strong className="text-foreground">direct</strong> — no smoothing.
                            Snappy, twitchier, more honest about the input.
                        </li>
                    </ul>
                </section>
            </Section>

            {/* Variants */}
            <Section className="py-16 bg-muted/30" containerClassName="container mx-auto px-4 space-y-8">
                <div className="space-y-2 max-w-2xl">
                    <h2 className="text-2xl font-bold">Variants</h2>
                    <p className="text-muted-foreground">
                        Same component, different inputs. Hover or move across each tile.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <VariantTile label="Dense">
                        <SVGCircles
                            className="absolute inset-0 h-full w-full stroke-svg"
                            width={800}
                            height={600}
                            numCircles={16}
                            minRadius={40}
                            maxRadius={500}
                            strokeWidth={3}
                            strokeDasharray="20 10"
                            motionPattern="spring"
                        />
                    </VariantTile>

                    <VariantTile label="Sparse · Ease">
                        <SVGCircles
                            className="absolute inset-0 h-full w-full stroke-svg"
                            width={800}
                            height={600}
                            numCircles={4}
                            minRadius={80}
                            maxRadius={420}
                            strokeWidth={8}
                            strokeDasharray="80 40"
                            motionPattern="ease"
                        />
                    </VariantTile>

                    <VariantTile label="Direct">
                        <SVGCircles
                            className="absolute inset-0 h-full w-full stroke-svg"
                            width={800}
                            height={600}
                            numCircles={8}
                            minRadius={60}
                            maxRadius={500}
                            strokeWidth={5}
                            strokeDasharray="6 14"
                            motionPattern="direct"
                        />
                    </VariantTile>
                </div>
            </Section>
        </main>
    );
}

function VariantTile({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-background">
            {children}
            <div className="absolute inset-x-0 bottom-0 p-3 bg-linear-to-t from-background/90 to-transparent">
                <span className="text-sm font-medium">{label}</span>
            </div>
        </div>
    );
}
