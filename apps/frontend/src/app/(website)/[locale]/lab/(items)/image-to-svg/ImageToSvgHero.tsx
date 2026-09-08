"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Download, ImageUp } from "lucide-react";
import { defaultLocale, isValidLocale, localizedHref } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { getLabContent } from "../../content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    LabControlSelect,
    LabControlSliders,
    LabControlToggle,
    LabHeroControls,
    type SliderConfig,
} from "@/components/lab/LabHeroControls";
import { ImageToSvgCanvas } from "./ImageToSvgCanvas";
import { STRATEGIES, defaultParams, getStrategy } from "./strategies";

/**
 * Draw a synthetic grayscale scene (lit sphere + gradient ground) so the piece
 * renders something with a full tonal range before any image is uploaded.
 */
function makeSampleImage(): Promise<HTMLImageElement> {
    const size = 600;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;

    const bg = ctx.createLinearGradient(0, 0, 0, size);
    bg.addColorStop(0, "#f4f4f4");
    bg.addColorStop(1, "#9a9a9a");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, size, size);

    // Soft contact shadow.
    ctx.save();
    ctx.translate(size / 2, size * 0.74);
    ctx.scale(1, 0.28);
    const shadow = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.34);
    shadow.addColorStop(0, "rgba(0,0,0,0.55)");
    shadow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = shadow;
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.34, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Lit sphere.
    const sphere = ctx.createRadialGradient(
        size * 0.4,
        size * 0.36,
        size * 0.02,
        size * 0.5,
        size * 0.46,
        size * 0.34,
    );
    sphere.addColorStop(0, "#ffffff");
    sphere.addColorStop(0.5, "#bdbdbd");
    sphere.addColorStop(1, "#1a1a1a");
    ctx.fillStyle = sphere;
    ctx.beginPath();
    ctx.arc(size * 0.5, size * 0.46, size * 0.3, 0, Math.PI * 2);
    ctx.fill();

    const img = new Image();
    img.src = canvas.toDataURL();
    return img.decode().then(() => img);
}

export function ImageToSvgHero() {
    const routeParams = useParams<{ locale: string }>();
    const locale = isValidLocale(routeParams.locale) ? routeParams.locale : defaultLocale;
    const chrome = getDictionary(locale).lab.controls;
    const { hero } = getLabContent(locale, "image-to-svg");
    const [strategyId, setStrategyId] = useState(STRATEGIES[0].id);
    const [params, setParams] = useState<Record<string, number>>(() =>
        defaultParams(STRATEGIES[0]),
    );
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const [fileName, setFileName] = useState("sample");
    const [controlsOpen, setControlsOpen] = useState(true);
    const [dragging, setDragging] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const svgRef = useRef<string>("");
    const objectUrlRef = useRef<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Seed with the synthetic sample on mount.
    useEffect(() => {
        let alive = true;
        makeSampleImage().then((img) => {
            if (alive) setImage(img);
        });
        return () => {
            alive = false;
            if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
        };
    }, []);

    const strategy = getStrategy(strategyId);

    function handleStrategyChange(id: string) {
        setStrategyId(id);
        setParams(defaultParams(getStrategy(id)));
    }

    function setParam(key: string, value: number) {
        setParams((p) => ({ ...p, [key]: value }));
    }

    const loadFile = useCallback((file: File) => {
        if (!file.type.startsWith("image/")) {
            setError(chrome.notAnImage);
            return;
        }
        setError(null);
        if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
        const url = URL.createObjectURL(file);
        objectUrlRef.current = url;
        const img = new Image();
        img.onload = () => {
            setImage(img);
            setFileName(file.name.replace(/\.[^.]+$/, "") || "image");
        };
        img.onerror = () => setError(chrome.decodeFailed);
        img.src = url;
    }, [chrome.notAnImage, chrome.decodeFailed]);

    function onDrop(e: React.DragEvent) {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) loadFile(file);
    }

    function handleDownload() {
        if (!svgRef.current) return;
        const blob = new Blob([svgRef.current], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${fileName}-${strategyId}.svg`;
        a.click();
        URL.revokeObjectURL(url);
    }

    const onSvgChange = useCallback((svg: string) => {
        svgRef.current = svg;
    }, []);

    return (
        <section
            className="relative h-[80vh] min-h-[520px] w-full overflow-hidden bg-background"
            onDragOver={(e) => {
                e.preventDefault();
                if (!dragging) setDragging(true);
            }}
            onDragLeave={(e) => {
                if (e.currentTarget === e.target) setDragging(false);
            }}
            onDrop={onDrop}
        >
            <ImageToSvgCanvas
                className="absolute inset-0 h-full w-full p-6 md:p-10"
                image={image}
                strategyId={strategyId}
                params={params}
                onSvgChange={onSvgChange}
            />

            <div className="absolute inset-0 bg-linear-to-b from-background/60 via-transparent to-background pointer-events-none" />

            {dragging && (
                <div className="absolute inset-0 z-30 flex items-center justify-center border-4 border-dashed border-primary/70 bg-background/70 backdrop-blur-sm pointer-events-none">
                    <span className="text-lg font-semibold text-foreground">
                        {chrome.dropToConvert}
                    </span>
                </div>
            )}

            <div className="absolute right-4 top-4 z-20 md:right-6 md:top-6">
                <LabHeroControls
                    open={controlsOpen}
                    onOpenChange={setControlsOpen}
                    heading={chrome.heading}
                    closeLabel={chrome.close}
                    className="w-[300px] md:w-[340px] max-h-[calc(80vh-2rem)] overflow-y-auto"
                >
                    <LabControlSelect
                        label={chrome.strategy}
                        value={strategyId}
                        onValueChange={handleStrategyChange}
                        options={STRATEGIES.map((s) => ({ value: s.id, label: s.label }))}
                        className="mb-4"
                    />

                    {strategy.controls
                        .filter((c) => c.kind === "select")
                        .map((c) => (
                            <LabControlSelect
                                key={c.key}
                                label={c.label}
                                value={String(Math.round(params[c.key]))}
                                onValueChange={(v) => setParam(c.key, Number(v))}
                                options={(c.options ?? []).map((label, i) => ({
                                    value: String(i),
                                    label,
                                }))}
                                className="mb-4"
                            />
                        ))}

                    <LabControlSliders
                        sliders={strategy.controls
                            .filter((c) => c.kind === "slider")
                            .map<SliderConfig>((c) => ({
                                key: c.key,
                                label: c.label,
                                value: params[c.key],
                                onChange: (v) => setParam(c.key, v),
                                min: c.min,
                                max: c.max,
                                step: c.step,
                                formatValue: c.format,
                            }))}
                        className="flex-wrap justify-between gap-y-3 mb-4"
                    />

                    {strategy.controls
                        .filter((c) => c.kind === "toggle")
                        .map((c) => (
                            <LabControlToggle
                                key={c.key}
                                id={`ctrl-${c.key}`}
                                label={c.label}
                                checked={params[c.key] > 0.5}
                                onCheckedChange={(checked) => setParam(c.key, checked ? 1 : 0)}
                                className="mb-3"
                            />
                        ))}

                    <div className="flex flex-col gap-2 pt-1">
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full gap-1.5"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <ImageUp className="h-3.5 w-3.5" /> {chrome.uploadImage}
                        </Button>
                        <Button
                            size="sm"
                            className="w-full gap-1.5"
                            onClick={handleDownload}
                        >
                            <Download className="h-3.5 w-3.5" /> {chrome.downloadSvg}
                        </Button>
                        {error && (
                            <span className="text-xs text-destructive">{error}</span>
                        )}
                    </div>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) loadFile(file);
                            e.target.value = "";
                        }}
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
                        <ImageUp className="h-4 w-4" />
                        {hero.hint}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ImageToSvgHero;
