"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Download, ImageUp, Settings2, X } from "lucide-react";
import { defaultLocale, isValidLocale, localizedHref } from "@/i18n/config";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { VerticalSlider } from "@/components/ui/vertical-slider";
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
            setError("That file isn't an image.");
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
        img.onerror = () => setError("Couldn't decode that image.");
        img.src = url;
    }, []);

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
                        Drop an image to convert
                    </span>
                </div>
            )}

            <div className="absolute right-4 top-4 z-20 md:right-6 md:top-6">
                {controlsOpen ? (
                    <div className="rounded-2xl border border-border bg-background/70 backdrop-blur-md p-4 shadow-lg w-[300px] md:w-[340px] max-h-[calc(80vh-2rem)] overflow-y-auto">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs uppercase tracking-wider text-muted-foreground">
                                Controls
                            </span>
                            <button
                                type="button"
                                aria-label="Close controls"
                                onClick={() => setControlsOpen(false)}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="space-y-1.5 mb-4">
                            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                                Strategy
                            </span>
                            <Select value={strategyId} onValueChange={handleStrategyChange}>
                                <SelectTrigger className="w-full" size="sm">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {STRATEGIES.map((s) => (
                                        <SelectItem key={s.id} value={s.id}>
                                            {s.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {strategy.controls
                            .filter((c) => c.kind === "select")
                            .map((c) => (
                                <div key={c.key} className="space-y-1.5 mb-4">
                                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                                        {c.label}
                                    </span>
                                    <Select
                                        value={String(Math.round(params[c.key]))}
                                        onValueChange={(v) => setParam(c.key, Number(v))}
                                    >
                                        <SelectTrigger className="w-full" size="sm">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {(c.options ?? []).map((label, i) => (
                                                <SelectItem key={label} value={String(i)}>
                                                    {label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            ))}

                        <div className="flex flex-wrap justify-between gap-y-3 gap-x-2 mb-4">
                            {strategy.controls
                                .filter((c) => c.kind === "slider")
                                .map((c) => (
                                    <VerticalSlider
                                        key={c.key}
                                        label={c.label}
                                        value={params[c.key]}
                                        onChange={(v) => setParam(c.key, v)}
                                        min={c.min}
                                        max={c.max}
                                        step={c.step}
                                        formatValue={c.format}
                                    />
                                ))}
                        </div>

                        {strategy.controls
                            .filter((c) => c.kind === "toggle")
                            .map((c) => (
                                <div key={c.key} className="flex items-center gap-2 mb-3">
                                    <Checkbox
                                        id={`ctrl-${c.key}`}
                                        checked={params[c.key] > 0.5}
                                        onCheckedChange={(checked) =>
                                            setParam(c.key, checked ? 1 : 0)
                                        }
                                    />
                                    <Label htmlFor={`ctrl-${c.key}`} className="text-xs">
                                        {c.label}
                                    </Label>
                                </div>
                            ))}

                        <div className="flex flex-col gap-2 pt-1">
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full gap-1.5"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <ImageUp className="h-3.5 w-3.5" /> Upload image
                            </Button>
                            <Button
                                size="sm"
                                className="w-full gap-1.5"
                                onClick={handleDownload}
                            >
                                <Download className="h-3.5 w-3.5" /> Download SVG
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
                    </div>
                ) : (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setControlsOpen(true)}
                        className="backdrop-blur-md bg-background/60"
                    >
                        <Settings2 className="h-4 w-4" />
                        Controls
                    </Button>
                )}
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
                            <ArrowLeft className="h-4 w-4" /> Back to gallery
                        </Link>
                    </Button>
                    <div className="flex flex-wrap gap-2">
                        <Badge>Experiment</Badge>
                        <Badge variant="secondary">2026</Badge>
                        <Badge variant="outline">SVG</Badge>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                        Image to <span className="text-primary">SVG</span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-prose">
                        Drop in any image and watch it redrawn as vector line art. The first
                        converter renders classic engraving-style hatching and
                        cross-hatching — darker tones pile on more crossed lines.
                    </p>
                    <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                        <ImageUp className="h-4 w-4" />
                        Drag an image anywhere, or use Upload in the controls.
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ImageToSvgHero;
