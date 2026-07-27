import Link from "next/link";
import Section from "@/components/section";
import { IcoReactionDiffusionHero } from "./IcoReactionDiffusionHero";
import { localizedHref, type Locale } from "@/i18n/config";

export const metadata = {
    title: "Reaction-Diffusion on a Sphere | Gallery | Cesar Jerez",
    description:
        "A Gray-Scott reaction-diffusion simulation running over the surface of an icosphere with Three.js. Each vertex reacts and diffuses with its mesh neighbors on the GPU.",
};

export default async function ReactionSpherePage({
    params,
}: {
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params;
    return (
        <main className="min-h-screen">
            <IcoReactionDiffusionHero />

            {/* The reaction */}
            <Section className="py-16" containerClassName="container mx-auto px-4 max-w-3xl space-y-10">
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">The reaction</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        This is the same Gray-Scott model as the{" "}
                        <Link
                            href={localizedHref(locale, "/lab/gray-scott")}
                            className="text-primary underline underline-offset-4 hover:no-underline"
                        >
                            flat reaction-diffusion field
                        </Link>
                        : two chemicals, <strong className="text-foreground">A</strong> and{" "}
                        <strong className="text-foreground">B</strong>. A is fed in everywhere, B is
                        removed everywhere, and where they meet the reaction{" "}
                        <code className="px-1.5 py-0.5 rounded bg-muted text-xs">A + 2B → 3B</code>{" "}
                        turns A into more B. Each point updates from its neighbors every step:
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
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">Running it on a sphere</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        On a flat grid the Laplacian{" "}
                        <code className="px-1.5 py-0.5 rounded bg-muted text-xs">∇²</code> is easy —
                        every cell has exactly eight neighbors in a tidy 3×3 box. A sphere has no such
                        grid. Instead the surface is an{" "}
                        <strong className="text-foreground">icosphere</strong>: an icosahedron
                        subdivided five times into ~10,000 vertices, each connected to{" "}
                        <strong className="text-foreground">six</strong> neighbors — except the twelve
                        original corners, which keep just five.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                        Because the neighborhood is irregular, the Laplacian becomes an{" "}
                        <strong className="text-foreground">umbrella operator</strong>: the average of
                        a vertex&apos;s neighbors minus the vertex itself. That single definition copes
                        with both the five- and six-neighbor cases, so the math from the flat field
                        carries over almost unchanged.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">How it works</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        The icosphere and its adjacency are{" "}
                        <strong className="text-foreground">precomputed once</strong> when the page
                        loads. Each vertex&apos;s A/B state is packed into a single pixel of a data
                        texture, and a second lookup texture stores a pointer to each vertex&apos;s
                        neighbors. Every step renders that state texture through a fragment shader that
                        gathers a vertex&apos;s neighbors, computes the umbrella Laplacian, and writes
                        the next state — two textures{" "}
                        <strong className="text-foreground">ping-ponged</strong> a dozen times per
                        displayed frame.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                        To draw the result, the sphere&apos;s vertex shader looks up each vertex&apos;s
                        chemical state straight from that texture, colors it through the same palette
                        ramp as the flat field, and nudges the surface outward where chemical B is
                        strong. When the device supports them, 16-bit float textures keep the gradients
                        clean.
                    </p>
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
                        .
                    </p>
                </section>
            </Section>
        </main>
    );
}
