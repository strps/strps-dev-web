"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, MousePointer2 } from "lucide-react";
import SVGCircles, { type MotionPattern } from "@/app/(website)/[locale]/lab/(items)/svg-circles/SVGCircles";
import { defaultLocale, isValidLocale, localizedHref } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { getLabContent } from "../../content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    LabControlPillGroup,
    LabControlSliders,
    LabHeroControls,
    type SliderConfig,
} from "@/components/lab/LabHeroControls";

const MOTION_PATTERNS: MotionPattern[] = ["spring", "ease", "direct"];

export function SvgCirclesHero() {
    const params = useParams<{ locale: string }>();
    const locale = isValidLocale(params.locale) ? params.locale : defaultLocale;
    const chrome = getDictionary(locale).lab.controls;
    const { hero, controls } = getLabContent(locale, "svg-circles");
    const [numCircles, setNumCircles] = useState(10);
    const [strokeWidth, setStrokeWidth] = useState(6);
    const [focalLength, setFocalLength] = useState(1000);
    const [maxRadius, setMaxRadius] = useState(920);
    const [dashOn, setDashOn] = useState(40);
    const worldDepth = 6667;
    const [pattern, setPattern] = useState<MotionPattern>("spring");
    const [controlsOpen, setControlsOpen] = useState(true);

    const sliders: SliderConfig[] = [
        {
            key: "circles",
            label: controls?.sliders?.circles ?? "Circles",
            value: numCircles,
            onChange: setNumCircles,
            min: 2,
            max: 24,
            step: 1,
        },
        {
            key: "stroke",
            label: controls?.sliders?.stroke ?? "Stroke",
            value: strokeWidth,
            onChange: setStrokeWidth,
            min: 1,
            max: 50,
            step: 1,
        },
        {
            key: "focal",
            label: controls?.sliders?.focal ?? "Focal",
            value: focalLength,
            onChange: setFocalLength,
            min: 200,
            max: 8000,
            step: 100,
        },
        {
            key: "maxR",
            label: controls?.sliders?.maxR ?? "Max R",
            value: maxRadius,
            onChange: setMaxRadius,
            min: 300,
            max: 1400,
            step: 20,
        },
        {
            key: "dash",
            label: controls?.sliders?.dash ?? "Dash",
            value: dashOn,
            onChange: setDashOn,
            min: 2,
            max: 120,
            step: 2,
        },
    ];

    return (
        <section className="relative h-[80vh] min-h-[520px] w-full overflow-hidden bg-background">
            <SVGCircles
                className="absolute inset-0 h-full w-full stroke-svg"
                width={1600}
                height={900}
                numCircles={numCircles}
                maxRadius={maxRadius}
                focalLength={focalLength}
                worldDepth={worldDepth}
                strokeWidth={strokeWidth}
                strokeDasharray={`${dashOn} ${Math.round(dashOn / 2)}`}
                motionPattern={pattern}
            />

            <div className="absolute inset-0 bg-linear-to-b from-background/60 via-transparent to-background pointer-events-none" />

            <div className="absolute right-4 top-4 z-20 md:right-6 md:top-6">
                <LabHeroControls
                    open={controlsOpen}
                    onOpenChange={setControlsOpen}
                    heading={chrome.heading}
                    closeLabel={chrome.close}
                >
                    <LabControlSliders sliders={sliders} className="mb-4" />

                    <LabControlPillGroup
                        label={chrome.motion}
                        value={pattern}
                        onChange={(v) => setPattern(v as MotionPattern)}
                        options={MOTION_PATTERNS.map((p) => ({
                            value: p,
                            label: controls?.motion?.[p] ?? p,
                        }))}
                    />
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
                        <Badge variant="secondary">2025</Badge>
                        <Badge variant="outline">{hero.techBadge}</Badge>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                        {hero.titleLead} <span className="text-primary">{hero.titleHighlight}</span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-prose">
                        {hero.lede}
                    </p>
                    <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                        <MousePointer2 className="h-4 w-4" />
                        {hero.hint}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SvgCirclesHero;
