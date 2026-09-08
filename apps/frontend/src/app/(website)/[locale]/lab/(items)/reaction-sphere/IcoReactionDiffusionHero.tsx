"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, RotateCcw, Rotate3d } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    LabControlPillGroup,
    LabControlSliders,
    LabHeroControls,
    type SliderConfig,
} from "@/components/lab/LabHeroControls";
import { IcoReactionDiffusionCanvas } from "./IcoReactionDiffusionCanvas";
import { defaultLocale, isValidLocale, localizedHref } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { getLabContent } from "../../content";

interface Preset {
    name: string;
    feed: number;
    kill: number;
}

// Classic feed/kill pairs from the Gray-Scott literature.
const PRESETS: Preset[] = [
    { name: "corals", feed: 0.0545, kill: 0.062 },
    { name: "mitosis", feed: 0.0367, kill: 0.0649 },
    { name: "spots", feed: 0.018, kill: 0.051 },
    { name: "maze", feed: 0.029, kill: 0.057 },
    { name: "worms", feed: 0.078, kill: 0.061 },
];

export function IcoReactionDiffusionHero() {
    const params = useParams<{ locale: string }>();
    const locale = isValidLocale(params.locale) ? params.locale : defaultLocale;
    const chrome = getDictionary(locale).lab.controls;
    const { hero, controls } = getLabContent(locale, "reaction-sphere");
    const [feed, setFeed] = useState(PRESETS[0].feed);
    const [kill, setKill] = useState(PRESETS[0].kill);
    const [dA, setDA] = useState(1.0);
    const [dB, setDB] = useState(0.5);
    const [activePreset, setActivePreset] = useState(PRESETS[0].name);
    const [seedKey, setSeedKey] = useState(0);
    const [controlsOpen, setControlsOpen] = useState(true);

    function applyPreset(preset: Preset) {
        setFeed(preset.feed);
        setKill(preset.kill);
        setActivePreset(preset.name);
        setSeedKey((k) => k + 1);
    }

    const sliders: SliderConfig[] = [
        {
            key: "feed",
            label: controls?.sliders?.feed ?? "Feed",
            value: feed,
            onChange: setFeed,
            min: 0.01,
            max: 0.09,
            step: 0.0005,
            formatValue: (v) => v.toFixed(4),
        },
        {
            key: "kill",
            label: controls?.sliders?.kill ?? "Kill",
            value: kill,
            onChange: setKill,
            min: 0.045,
            max: 0.07,
            step: 0.0005,
            formatValue: (v) => v.toFixed(4),
        },
        {
            key: "diffA",
            label: controls?.sliders?.diffA ?? "Diff A",
            value: dA,
            onChange: setDA,
            min: 0.6,
            max: 1.2,
            step: 0.02,
            formatValue: (v) => v.toFixed(2),
        },
        {
            key: "diffB",
            label: controls?.sliders?.diffB ?? "Diff B",
            value: dB,
            onChange: setDB,
            min: 0.3,
            max: 0.7,
            step: 0.02,
            formatValue: (v) => v.toFixed(2),
        },
    ];

    return (
        <section className="relative h-[80vh] min-h-130 w-full overflow-hidden bg-background">
            <IcoReactionDiffusionCanvas
                className="absolute inset-0 h-full w-full"
                feed={feed}
                kill={kill}
                dA={dA}
                dB={dB}
                seedKey={seedKey}
            />

            <div className="absolute inset-0 bg-linear-to-b from-background/60 via-transparent to-background pointer-events-none" />

            <div className="absolute right-4 top-4 z-20 md:right-6 md:top-6">
                <LabHeroControls
                    open={controlsOpen}
                    onOpenChange={setControlsOpen}
                    heading={chrome.heading}
                    closeLabel={chrome.close}
                    className="w-70 md:w-[320px]"
                >
                    <LabControlSliders sliders={sliders} className="mb-4" />

                    <LabControlPillGroup
                        label={chrome.presets}
                        value={activePreset}
                        onChange={(name) => {
                            const preset = PRESETS.find((p) => p.name === name);
                            if (preset) applyPreset(preset);
                        }}
                        options={PRESETS.map((p) => ({
                            value: p.name,
                            label: controls?.presets?.[p.name] ?? p.name,
                        }))}
                    />
                    <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-2 gap-1.5"
                        onClick={() => setSeedKey((k) => k + 1)}
                    >
                        <RotateCcw className="h-3.5 w-3.5" /> {chrome.reset}
                    </Button>
                </LabHeroControls>
            </div>

            <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-end pb-12 md:pb-16 pointer-events-none">
                <div className="max-w-2xl space-y-4 pointer-events-auto">
                    <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="-ml-3 backdrop-blur-sm bg-background/40"
                    >
                        <Link href={localizedHref(locale, "/lab")} className="gap-2">
                            <ArrowLeft className="h-4 w-4" /> {chrome.backToGallery}
                        </Link>
                    </Button>
                    <div className="flex flex-wrap gap-2">
                        <Badge>{hero.categoryBadge}</Badge>
                        <Badge variant="secondary">2026</Badge>
                        <Badge variant="outline">{hero.techBadge}</Badge>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                        {hero.titleLead} <span className="text-primary">{hero.titleHighlight}</span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-prose">
                        {hero.lede}
                    </p>
                    <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                        <Rotate3d className="h-4 w-4" />
                        {hero.hint}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default IcoReactionDiffusionHero;
