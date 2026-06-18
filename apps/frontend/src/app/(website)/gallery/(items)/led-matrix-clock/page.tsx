import Link from "next/link";
import { ArrowLeft, Cpu, Zap, Wifi } from "lucide-react";
import Section from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
    title: "LED Matrix Clock | Gallery | Cesar Jerez",
    description:
        "A 32x32 RGB matrix driven by an ESP32, pulling time over NTP and weather over MQTT.",
};

const specs = [
    { label: "MCU", value: "ESP32-S3" },
    { label: "Display", value: "32x32 RGB HUB75" },
    { label: "Refresh", value: "120 Hz" },
    { label: "Power", value: "5V / 4A" },
    { label: "Enclosure", value: "FDM-printed PETG" },
    { label: "Firmware", value: "Arduino + FastLED" },
];

export default function LedMatrixClockPage() {
    return (
        <main className="min-h-screen">
            <Section className="py-20 md:py-28 bg-muted/30" containerClassName="container mx-auto px-4">
                <div className="max-w-3xl space-y-6">
                    <Button asChild variant="ghost" size="sm" className="-ml-3">
                        <Link href="/gallery" className="gap-2">
                            <ArrowLeft className="h-4 w-4" /> Back to gallery
                        </Link>
                    </Button>
                    <div className="flex flex-wrap gap-2">
                        <Badge>Experiment</Badge>
                        <Badge variant="secondary">2024</Badge>
                        <Badge variant="outline">Hardware</Badge>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                        LED Matrix Clock
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        A small desk-friendly RGB matrix that does double duty as a clock and an
                        ambient information radio. NTP for time, MQTT for weather, and a tiny REST
                        endpoint for one-off messages I send myself from the terminal.
                    </p>
                </div>
            </Section>

            <Section className="py-16" containerClassName="container mx-auto px-4 max-w-4xl space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                        <CardContent className="p-5 space-y-2">
                            <Cpu className="h-5 w-5 text-primary" />
                            <h3 className="font-semibold">Brains</h3>
                            <p className="text-sm text-muted-foreground">
                                ESP32-S3 running a cooperative scheduler. One task talks to the matrix,
                                another talks to MQTT.
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-5 space-y-2">
                            <Wifi className="h-5 w-5 text-primary" />
                            <h3 className="font-semibold">Connectivity</h3>
                            <p className="text-sm text-muted-foreground">
                                Hooks into my home broker so the clock can show weather, calendar
                                events, or whatever I publish.
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-5 space-y-2">
                            <Zap className="h-5 w-5 text-primary" />
                            <h3 className="font-semibold">Power</h3>
                            <p className="text-sm text-muted-foreground">
                                Auto-dimming via ambient light sensor, so it doesn&apos;t blind me at
                                night.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">Specs</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {specs.map((spec) => (
                            <div
                                key={spec.label}
                                className="rounded-lg border border-border p-3 bg-muted/20"
                            >
                                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                                    {spec.label}
                                </div>
                                <div className="text-sm font-medium mt-1">{spec.value}</div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">What didn&apos;t work the first time</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        The first revision used a smaller MCU and the refresh rate fell apart any time
                        Wi-Fi did anything. Moving the matrix driver onto a dedicated core on the S3
                        fixed it. The PCB also needed bigger ground pours than I&apos;d planned for —
                        version two has them.
                    </p>
                </section>
            </Section>
        </main>
    );
}
