import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import Section from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata = {
    title: "Synth Keys | Gallery | Cesar Jerez",
    description:
        "A polyphonic web synthesizer playable from your keyboard, with a small visual patchbay for modulation.",
};

const keys = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const blackKeys = ["W", "E", "", "T", "Y", "U", "", "O", "P"];

export default function SynthKeysPage() {
    return (
        <main className="min-h-screen">
            <Section className="py-20 md:py-28" containerClassName="container mx-auto px-4">
                <div className="max-w-3xl space-y-6">
                    <Button asChild variant="ghost" size="sm" className="-ml-3">
                        <Link href="/gallery" className="gap-2">
                            <ArrowLeft className="h-4 w-4" /> Back to gallery
                        </Link>
                    </Button>
                    <div className="flex flex-wrap gap-2">
                        <Badge>Project</Badge>
                        <Badge variant="secondary">2025</Badge>
                        <Badge variant="outline">WebAudio</Badge>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                        Synth Keys
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        A polyphonic web synthesizer playable from your keyboard. WebAudio under the
                        hood, with modulation routing exposed as a small visual patchbay you can drag
                        cables around in.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <Button asChild>
                            <Link href="#" target="_blank" rel="noopener noreferrer" className="gap-1.5">
                                Try the live demo <ExternalLink className="h-3.5 w-3.5" />
                            </Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href="#" target="_blank" rel="noopener noreferrer" className="gap-1.5">
                                <Github className="h-3.5 w-3.5" /> Source
                            </Link>
                        </Button>
                    </div>
                </div>
            </Section>

            <Section className="py-12" containerClassName="container mx-auto px-4 max-w-4xl">
                <div className="rounded-2xl border border-border bg-muted/30 p-8 shadow-inner">
                    <div className="relative mx-auto max-w-2xl">
                        <div className="relative grid grid-cols-9 gap-1">
                            {keys.map((k) => (
                                <div
                                    key={k}
                                    className="aspect-[1/4] rounded-b-md bg-background border border-border flex items-end justify-center pb-2 text-xs font-medium text-muted-foreground"
                                >
                                    {k}
                                </div>
                            ))}
                            <div className="absolute inset-x-0 top-0 grid grid-cols-9 gap-1 pointer-events-none">
                                {blackKeys.map((k, i) =>
                                    k ? (
                                        <div
                                            key={i}
                                            className="aspect-[1/4] w-3/5 -ml-1 h-2/3 rounded-b-md bg-foreground/90 text-background text-[10px] font-medium flex items-end justify-center pb-1"
                                            style={{ gridColumnStart: i + 1 }}
                                        >
                                            {k}
                                        </div>
                                    ) : (
                                        <div key={i} />
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                    <p className="text-center text-sm text-muted-foreground mt-6">
                        Play with the row of letter keys on your keyboard. Hold shift to sustain.
                    </p>
                </div>
            </Section>

            <Section className="py-16" containerClassName="container mx-auto px-4 max-w-3xl space-y-10">
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">Architecture</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Each voice is a small graph of oscillators, filters, and envelopes built once
                        per note and torn down on release. The patchbay edits a JSON description; a
                        single function turns that description into a WebAudio graph.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">Why I built it</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Mostly to have something to noodle on while debugging unrelated work. It also
                        turned into a decent excuse to learn how the WebAudio scheduling model
                        actually behaves under load.
                    </p>
                </section>
            </Section>
        </main>
    );
}
