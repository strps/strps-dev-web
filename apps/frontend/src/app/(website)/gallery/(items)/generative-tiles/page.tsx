import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Section from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata = {
    title: "Generative Tiles | Gallery | Cesar Jerez",
    description:
        "An infinite SVG mosaic that rearranges itself on every visit, driven by a deterministic noise field.",
};

export default function GenerativeTilesPage() {
    return (
        <main className="min-h-screen">
            <Section
                className="relative py-24 md:py-32 overflow-hidden"
                containerClassName="container mx-auto px-4"
            >
                <TilesBackdrop />
                <div className="relative z-10 max-w-3xl space-y-6">
                    <Button asChild variant="ghost" size="sm" className="-ml-3">
                        <Link href="/gallery" className="gap-2">
                            <ArrowLeft className="h-4 w-4" /> Back to gallery
                        </Link>
                    </Button>
                    <div className="flex flex-wrap gap-2">
                        <Badge>Art</Badge>
                        <Badge variant="secondary">2025</Badge>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
                        Generative <span className="text-primary">Tiles</span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        An infinite SVG mosaic that rearranges itself on every visit. The composition
                        is driven by a deterministic noise field, so the same seed always paints the
                        same picture — but every fresh load picks a new seed.
                    </p>
                </div>
            </Section>

            <Section className="py-16" containerClassName="container mx-auto px-4 max-w-3xl space-y-12">
                <article className="space-y-4 prose-invert">
                    <h2 className="text-2xl font-bold">The idea</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        I wanted something that felt alive without animating. A tile grid is the
                        simplest scaffolding I could think of — repetition gives the eye something to
                        anchor to, and the variation between cells is where the personality lives.
                    </p>

                    <h2 className="text-2xl font-bold pt-4">How it works</h2>
                    <ul className="text-muted-foreground space-y-2 list-disc pl-6">
                        <li>A 12x8 grid of SVG cells, each picking from a palette of 7 primitives.</li>
                        <li>Cell rotation, fill, and stroke are sampled from a 2D noise field.</li>
                        <li>The seed is derived from the current minute, so the page slowly evolves.</li>
                    </ul>

                    <h2 className="text-2xl font-bold pt-4">What I learned</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Constraint helps. The version with five primitives looked richer than the one
                        with twenty. Most of the work went into picking palettes — the rest was almost
                        free once the noise sampling was in place.
                    </p>
                </article>
            </Section>
        </main>
    );
}

function TilesBackdrop() {
    const cells = Array.from({ length: 48 });
    return (
        <div className="absolute inset-0 -z-0 opacity-30 pointer-events-none select-none">
            <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
                {cells.map((_, i) => {
                    const variants = [
                        "bg-fuchsia-500/30",
                        "bg-indigo-500/30",
                        "bg-purple-500/30",
                        "bg-pink-500/20",
                        "bg-violet-500/30",
                        "bg-transparent",
                    ];
                    const variant = variants[i % variants.length];
                    return (
                        <div
                            key={i}
                            className={`${variant} border border-foreground/5`}
                            style={{ transform: `rotate(${(i % 4) * 90}deg)` }}
                        />
                    );
                })}
            </div>
        </div>
    );
}
