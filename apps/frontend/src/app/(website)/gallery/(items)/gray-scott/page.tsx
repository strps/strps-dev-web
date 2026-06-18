import Section from "@/components/section";
import { GrayScottHero } from "./GrayScottHero";

export const metadata = {
    title: "Gray-Scott | Gallery | Cesar Jerez",
    description:
        "An interactive Gray-Scott reaction-diffusion field running on the GPU with WebGL. Paint into it and slide between coral, maze, and mitosis patterns.",
};

export default function GrayScottPage() {
    return (
        <main className="min-h-screen">
            <GrayScottHero />

            {/* The reaction */}
            <Section className="py-16" containerClassName="container mx-auto px-4 max-w-3xl space-y-10">
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">The reaction</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Gray-Scott models two chemicals, <strong className="text-foreground">A</strong>{" "}
                        and <strong className="text-foreground">B</strong>, spread across a grid. A is
                        fed in everywhere; B is removed everywhere. Where they meet, the reaction{" "}
                        <code className="px-1.5 py-0.5 rounded bg-muted text-xs">A + 2B → 3B</code>{" "}
                        converts A into more B — an autocatalytic loop that&apos;s constantly fighting
                        the feed and kill terms trying to wash it out.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                        Each cell updates from its neighbors every step:
                    </p>
                    <ul className="text-muted-foreground space-y-2 list-disc pl-6">
                        <li>
                            <code className="px-1.5 py-0.5 rounded bg-muted text-xs">
                                A&apos; = A + (Dₐ∇²A − AB² + f·(1−A))·dt
                            </code>
                        </li>
                        <li>
                            <code className="px-1.5 py-0.5 rounded bg-muted text-xs">
                                B&apos; = B + (D_b∇²B + AB² − (k+f)·B)·dt
                            </code>
                        </li>
                    </ul>
                    <p className="text-muted-foreground leading-relaxed">
                        The whole zoo of patterns lives in just two numbers — the feed rate{" "}
                        <code className="px-1.5 py-0.5 rounded bg-muted text-xs">f</code> and the kill
                        rate <code className="px-1.5 py-0.5 rounded bg-muted text-xs">k</code>.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">How it works</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        The state lives in a texture — A in the red channel, B in the green. Each step
                        renders a full-screen quad through a fragment shader that reads a cell&apos;s
                        nine neighbors, computes the Laplacian, and writes the next state. Two textures
                        are <strong className="text-foreground">ping-ponged</strong>: read from one,
                        write to the other, swap, repeat.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                        A single displayed frame runs the simulation{" "}
                        <strong className="text-foreground">a dozen times</strong> before drawing — the
                        dynamics need many small steps to look smooth, and the GPU has them to spare.
                        When the device supports it, the field uses 16-bit float textures for cleaner
                        gradients, falling back to 8-bit when it doesn&apos;t.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                        Painting is just another write: while the pointer is down, the simulation
                        shader stamps B to 1.0 inside a small radius around the cursor, and the
                        reaction takes it from there.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">Presets</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Feed and kill carve out narrow bands of behavior, and small moves cross
                        boundaries between completely different regimes:
                    </p>
                    <ul className="text-muted-foreground space-y-2 list-disc pl-6">
                        <li>
                            <strong className="text-foreground">Corals</strong> — branching fronts that
                            grow into and fill space.
                        </li>
                        <li>
                            <strong className="text-foreground">Mitosis</strong> — blobs that grow,
                            stretch, and split into two.
                        </li>
                        <li>
                            <strong className="text-foreground">Spots</strong> — stable dots that
                            settle into a loose lattice.
                        </li>
                        <li>
                            <strong className="text-foreground">Maze</strong> — winding labyrinth walls
                            that never quite close.
                        </li>
                        <li>
                            <strong className="text-foreground">Worms</strong> — wriggling filaments
                            that drift and reconnect.
                        </li>
                    </ul>
                </section>

                <section className="space-y-4 border-t border-border pt-8">
                    <h2 className="text-2xl font-bold">Thanks</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        The math, the parameter intuition, and the preset feed/kill values all come
                        from Karl Sims&apos; wonderful explainer,{" "}
                        <a
                            href="https://www.karlsims.com/rd.html"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary underline underline-offset-4 hover:no-underline"
                        >
                            Reaction-Diffusion Tutorial
                        </a>
                        . If you want to actually understand what&apos;s happening here, read that
                        first.
                    </p>
                </section>
            </Section>
        </main>
    );
}
