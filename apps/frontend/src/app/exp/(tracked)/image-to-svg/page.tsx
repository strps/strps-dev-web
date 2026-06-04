'use client';
import ImageToSvgCanvas from "./ImageToSvgCanvas";
import { STRATEGIES, defaultParams, getStrategy } from "./strategies";
import { PAPER_SIZES } from "./paper";
import ControlPanel from "@/app/exp/(tracked)/components/ControlPanel";
import AdjustableSlider from "@/app/exp/(tracked)/components/AdjustableSlider";
import { useCallback, useEffect, useRef, useState } from "react";


// Synthetic grayscale scene (lit sphere + gradient ground) so the canvas has a
// full tonal range to redraw before any image is uploaded.
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

    const sphere = ctx.createRadialGradient(
        size * 0.4, size * 0.36, size * 0.02,
        size * 0.5, size * 0.46, size * 0.34,
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


export default function Page() {

    const [strategyId, setStrategyId] = useState(STRATEGIES[0].id);
    const [params, setParams] = useState<Record<string, number>>(() => defaultParams(STRATEGIES[0]));
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const [fileName, setFileName] = useState("sample");
    const [paperId, setPaperId] = useState(PAPER_SIZES[0].id);
    const [zoom, setZoom] = useState(1);

    const svgRef = useRef<string>("");
    const objectUrlRef = useRef<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const strategy = getStrategy(strategyId);

    // Seed with the synthetic sample on mount.
    useEffect(() => {
        let alive = true;
        makeSampleImage().then((img) => { if (alive) setImage(img); });
        return () => {
            alive = false;
            if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
        };
    }, []);

    function applyStrategy(id: string) {
        setStrategyId(id);
        setParams(defaultParams(getStrategy(id)));
    }

    function setParam(key: string, value: number) {
        setParams((p) => ({ ...p, [key]: value }));
    }

    const loadFile = useCallback((file: File) => {
        if (!file.type.startsWith("image/")) return;
        if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
        const url = URL.createObjectURL(file);
        objectUrlRef.current = url;
        const img = new Image();
        img.onload = () => {
            setImage(img);
            setFileName(file.name.replace(/\.[^.]+$/, "") || "image");
        };
        img.src = url;
    }, []);

    const onSvgChange = useCallback((svg: string) => { svgRef.current = svg; }, []);

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

    return (
        <div
            className="relative w-full h-screen flex items-center justify-center overflow-hidden"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files?.[0];
                if (file) loadFile(file);
            }}
        >
            <ImageToSvgCanvas
                className="w-1/2 h-full"
                image={image}
                strategyId={strategyId}
                params={params}
                paperId={paperId}
                zoom={zoom}
                onSvgChange={onSvgChange}
            />

            <ControlPanel title="Image to SVG">
                <div className="mb-4 flex flex-wrap gap-1.5">
                    {STRATEGIES.map((s) => (
                        <button
                            key={s.id}
                            onClick={() => applyStrategy(s.id)}
                            className={`rounded-md px-2 py-1 text-xs transition-colors ${strategyId === s.id
                                ? "bg-fuchsia-500/80 text-white"
                                : "bg-white/10 text-white/70 hover:bg-white/20"
                                }`}
                        >
                            {s.label}
                        </button>
                    ))}
                </div>

                <label className="mb-2 block">
                    <div className="mb-0.5 text-[11px] text-white/60">Paper size</div>
                    <select
                        value={paperId}
                        onChange={(e) => setPaperId(e.target.value)}
                        className="w-full rounded-md bg-white/10 px-2 py-1 text-xs text-white/80"
                    >
                        {PAPER_SIZES.map((p) => (
                            <option key={p.id} value={p.id} className="bg-neutral-900">
                                {p.label}
                            </option>
                        ))}
                    </select>
                </label>

                <AdjustableSlider
                    label="Overall zoom"
                    value={zoom}
                    min={0.25}
                    max={3}
                    step={0.05}
                    format={(v) => `${v.toFixed(2)}×`}
                    onChange={setZoom}
                />

                {strategy.controls.filter((c) => c.kind === "select").map((c) => (
                    <label key={c.key} className="mb-2 block">
                        <div className="mb-0.5 text-[11px] text-white/60">{c.label}</div>
                        <select
                            value={Math.round(params[c.key])}
                            onChange={(e) => setParam(c.key, Number(e.target.value))}
                            className="w-full rounded-md bg-white/10 px-2 py-1 text-xs text-white/80"
                        >
                            {(c.options ?? []).map((label, i) => (
                                <option key={label} value={i} className="bg-neutral-900">
                                    {label}
                                </option>
                            ))}
                        </select>
                    </label>
                ))}

                {strategy.controls.filter((c) => c.kind === "slider").map((c) => (
                    <AdjustableSlider
                        key={c.key}
                        label={c.label}
                        value={params[c.key]}
                        min={c.min}
                        max={c.max}
                        step={c.step}
                        format={c.format}
                        onChange={(v) => setParam(c.key, v)}
                    />
                ))}

                {strategy.controls.filter((c) => c.kind === "toggle").map((c) => (
                    <label key={c.key} className="mb-2 flex items-center gap-2 text-[11px] text-white/70">
                        <input
                            type="checkbox"
                            checked={params[c.key] > 0.5}
                            onChange={(e) => setParam(c.key, e.target.checked ? 1 : 0)}
                            className="accent-fuchsia-500"
                        />
                        {c.label}
                    </label>
                ))}

                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-2 w-full rounded-md bg-white/10 py-1.5 text-xs text-white/80 hover:bg-white/20"
                >
                    upload image
                </button>
                <button
                    onClick={handleDownload}
                    className="mt-2 w-full rounded-md bg-fuchsia-500/80 py-1.5 text-xs text-white hover:bg-fuchsia-500"
                >
                    download svg
                </button>

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

                <p className="mt-3 text-[10px] text-white/40">drop an image · press h to toggle</p>
            </ControlPanel>
        </div>
    );
}
