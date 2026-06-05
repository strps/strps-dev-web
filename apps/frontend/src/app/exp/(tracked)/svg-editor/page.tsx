"use client";

// SVG editor: compose multiple objects (text paths + image line-art) onto one
// document, with interactive zoom/pan and move/scale/rotate. See README.md.

import { useCallback, useEffect, useRef, useState } from "react";
import SvgEditorCanvas from "./SvgEditorCanvas";
import ControlPanel from "@/app/exp/(tracked)/components/ControlPanel";
import AdjustableSlider from "@/app/exp/(tracked)/components/AdjustableSlider";
import { PAPER_SIZES, resolvePaper } from "./paper";
import { STRATEGIES, getStrategy, defaultParams } from "./objects/image/strategies";
import { FONTS, getFont, getSignatureFont, type FontMode } from "./lib/fonts";
import { loadFont } from "./lib/fontLoader";
import {
    composeDocument,
    defaultImageSource,
    defaultTextSource,
    prepareImageInput,
    renderImageObject,
    renderTextObject,
    textControls,
    type EditorDocument,
    type ObjectTransform,
    type RenderedObject,
} from "./objects";

// Named paper sizes only ("fit" has no standalone size for a multi-object page).
const PAPERS = PAPER_SIZES.filter((p) => p.w != null);

// Synthetic grayscale scene so "Add image" works without an upload.
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
    const sphere = ctx.createRadialGradient(size * 0.4, size * 0.36, size * 0.02, size * 0.5, size * 0.46, size * 0.34);
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
    const [doc, setDoc] = useState<EditorDocument>({
        paperId: "a4",
        landscape: false,
        background: "#ffffff",
        objects: [],
    });
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const idRef = useRef(0);
    const imageInputs = useRef(new Map<string, NonNullable<ReturnType<typeof prepareImageInput>>>());
    const seeded = useRef(false);

    const uid = () => `obj-${++idRef.current}`;
    const nextZ = (d: EditorDocument) => d.objects.reduce((m, o) => Math.max(m, o.z), 0) + 1;

    // Centre a freshly rendered object on the sheet at ~45% of the content width.
    const place = useCallback((r: RenderedObject): ObjectTransform => {
        const { pw, ph, margin } = resolvePaper(doc.paperId, doc.landscape);
        const scale = ((pw - 2 * margin) * 0.45) / r.width;
        return { x: (pw - r.width * scale) / 2, y: (ph - r.height * scale) / 2, scale, rotation: 0 };
    }, [doc.paperId, doc.landscape]);

    // Preload the signature font so exports embed vector paths.
    useEffect(() => { loadFont(getSignatureFont().url).catch(() => { }); }, []);

    const addText = useCallback(async () => {
        const source = defaultTextSource();
        const rendered = await renderTextObject(source);
        if (!rendered) return;
        const id = uid();
        setDoc((d) => ({ ...d, objects: [...d.objects, { id, source, transform: place(rendered), rendered, z: nextZ(d) }] }));
        setSelectedId(id);
    }, [place]);

    const addImage = useCallback((img: HTMLImageElement) => {
        const input = prepareImageInput(img);
        if (!input) return;
        const source = defaultImageSource();
        const rendered = renderImageObject(input, source);
        if (!rendered) return;
        const id = uid();
        imageInputs.current.set(id, input);
        setDoc((d) => ({ ...d, objects: [...d.objects, { id, source, transform: place(rendered), rendered, z: nextZ(d) }] }));
        setSelectedId(id);
    }, [place]);

    // Seed one text object on first mount so the canvas isn't empty. Inlined
    // (rather than calling addText) so the setState lands in the async callback.
    useEffect(() => {
        if (seeded.current) return;
        seeded.current = true;
        const source = defaultTextSource();
        renderTextObject(source).then((rendered) => {
            if (!rendered) return;
            const id = uid();
            setDoc((d) => ({ ...d, objects: [...d.objects, { id, source, transform: place(rendered), rendered, z: nextZ(d) }] }));
            setSelectedId(id);
        });
    }, [place]);

    const fileInputRef = useRef<HTMLInputElement>(null);
    function onFile(file: File) {
        if (!file.type.startsWith("image/")) return;
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => { addImage(img); URL.revokeObjectURL(url); };
        img.src = url;
    }

    const selected = doc.objects.find((o) => o.id === selectedId) ?? null;

    function setTransform(id: string, t: ObjectTransform) {
        setDoc((d) => ({ ...d, objects: d.objects.map((o) => (o.id === id ? { ...o, transform: t } : o)) }));
    }
    function patchTransform(patch: Partial<ObjectTransform>) {
        if (selected) setTransform(selected.id, { ...selected.transform, ...patch });
    }

    function patchText(patch: Record<string, unknown>) {
        if (!selected || selected.source.kind !== "text") return;
        const source = { ...selected.source, ...patch };
        setDoc((d) => ({ ...d, objects: d.objects.map((o) => (o.id === selected.id ? { ...o, source } : o)) }));
        renderTextObject(source).then((r) => {
            if (r) setDoc((d) => ({ ...d, objects: d.objects.map((o) => (o.id === selected.id ? { ...o, rendered: r } : o)) }));
        });
    }

    function patchImage(patch: Record<string, unknown>) {
        if (!selected || selected.source.kind !== "image") return;
        const input = imageInputs.current.get(selected.id);
        if (!input) return;
        const source = { ...selected.source, ...patch };
        const r = renderImageObject(input, source);
        setDoc((d) => ({ ...d, objects: d.objects.map((o) => (o.id === selected.id ? { ...o, source, rendered: r ?? o.rendered } : o)) }));
    }

    function bringFront() {
        if (!selected) return;
        setDoc((d) => ({ ...d, objects: d.objects.map((o) => (o.id === selected.id ? { ...o, z: nextZ(d) } : o)) }));
    }
    function sendBack() {
        if (!selected) return;
        setDoc((d) => {
            const z = d.objects.reduce((m, o) => Math.min(m, o.z), 0) - 1;
            return { ...d, objects: d.objects.map((o) => (o.id === selected.id ? { ...o, z } : o)) };
        });
    }
    function remove() {
        if (!selected) return;
        imageInputs.current.delete(selected.id);
        setDoc((d) => ({ ...d, objects: d.objects.filter((o) => o.id !== selected.id) }));
        setSelectedId(null);
    }

    function handleExport() {
        const blob = new Blob([composeDocument(doc)], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "svg-editor.svg";
        a.click();
        URL.revokeObjectURL(url);
    }

    return (
        <div
            className="relative w-full h-screen overflow-hidden"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) onFile(f); }}
        >
            <SvgEditorCanvas
                className="absolute inset-0 h-full w-full"
                doc={doc}
                selectedId={selectedId}
                onSelect={setSelectedId}
                onTransform={setTransform}
            />

            {/* Left: document properties + document tree */}
            <ControlPanel title="Document" side="left" toggleKey="h">
                <label className="mb-2 block">
                    <div className="mb-0.5 text-[11px] text-white/60">Paper size</div>
                    <select
                        value={doc.paperId}
                        onChange={(e) => setDoc((d) => ({ ...d, paperId: e.target.value }))}
                        className="w-full rounded-md bg-white/10 px-2 py-1 text-xs text-white/80"
                    >
                        {PAPERS.map((p) => (
                            <option key={p.id} value={p.id} className="bg-neutral-900">{p.label}</option>
                        ))}
                    </select>
                </label>

                <div className="mb-3 flex items-center gap-2">
                    <button
                        onClick={() => setDoc((d) => ({ ...d, landscape: !d.landscape }))}
                        className="flex-1 rounded-md bg-white/10 py-1 text-xs text-white/80 hover:bg-white/20"
                    >
                        {doc.landscape ? "Landscape" : "Portrait"}
                    </button>
                    <label className="flex items-center gap-1 text-[11px] text-white/60">
                        bg
                        <input
                            type="color"
                            value={doc.background}
                            onChange={(e) => setDoc((d) => ({ ...d, background: e.target.value }))}
                            className="h-6 w-8 cursor-pointer rounded bg-transparent"
                        />
                    </label>
                </div>

                <div className="mb-3 flex gap-1.5">
                    <button onClick={() => void addText()} className="flex-1 rounded-md bg-white/10 py-1.5 text-xs text-white/80 hover:bg-white/20">+ Text</button>
                    <button onClick={() => fileInputRef.current?.click()} className="flex-1 rounded-md bg-white/10 py-1.5 text-xs text-white/80 hover:bg-white/20">+ Image</button>
                    <button onClick={() => makeSampleImage().then(addImage)} className="rounded-md bg-white/10 px-2 py-1.5 text-xs text-white/80 hover:bg-white/20" title="Add a sample image">▦</button>
                </div>

                {/* Document tree: objects in z-order (topmost first), click to select */}
                <div className="mb-2 border-t border-white/10 pt-3">
                    <div className="mb-1.5 text-[11px] uppercase tracking-wider text-white/50">Objects</div>
                    {doc.objects.length === 0 ? (
                        <p className="text-[11px] text-white/40">No objects yet — add text or an image.</p>
                    ) : (
                        <ul className="flex flex-col gap-0.5">
                            {[...doc.objects].sort((a, b) => b.z - a.z).map((o) => {
                                const isSel = o.id === selectedId;
                                const label = o.source.kind === "text" ? (o.source.text || "Text") : "Image";
                                return (
                                    <li key={o.id}>
                                        <button
                                            onClick={() => setSelectedId(o.id)}
                                            className={`flex w-full items-center gap-2 rounded px-2 py-1 text-left text-xs ${isSel ? "bg-fuchsia-500/30 text-white" : "text-white/70 hover:bg-white/10"}`}
                                        >
                                            <span className="text-white/40">{o.source.kind === "text" ? "T" : "▦"}</span>
                                            <span className="flex-1 truncate">{label}</span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>

                <button onClick={handleExport} className="mt-2 w-full rounded-md bg-fuchsia-500/80 py-1.5 text-xs text-white hover:bg-fuchsia-500">export svg</button>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); e.target.value = ""; }}
                />

                <p className="mt-3 text-[10px] text-white/40">scroll to zoom · drag canvas to pan · double-click to fit · press h / o to toggle panels</p>
            </ControlPanel>

            {/* Right: selected object properties */}
            <ControlPanel title="Object" side="right" toggleKey="o">
                {selected ? (
                    <div>
                        <div className="mb-2 flex items-center justify-between">
                            <span className="text-[11px] uppercase tracking-wider text-white/50">{selected.source.kind} object</span>
                            <button onClick={remove} className="rounded px-1.5 text-[11px] text-red-300/80 hover:text-red-300">delete</button>
                        </div>

                        {selected.source.kind === "text" && (
                            <>
                                <label className="mb-2 block">
                                    <div className="mb-0.5 text-[11px] text-white/60">Text</div>
                                    <input
                                        value={selected.source.text}
                                        onChange={(e) => patchText({ text: e.target.value })}
                                        className="w-full rounded-md bg-white/10 px-2 py-1 text-xs text-white/90 focus:bg-white/15 focus:outline-none"
                                    />
                                </label>
                                <label className="mb-2 block">
                                    <div className="mb-0.5 text-[11px] text-white/60">Font</div>
                                    <select
                                        value={selected.source.fontId}
                                        onChange={(e) => patchText({ fontId: e.target.value })}
                                        className="w-full rounded-md bg-white/10 px-2 py-1 text-xs text-white/80"
                                    >
                                        {FONTS.map((f) => (
                                            <option key={f.id} value={f.id} className="bg-neutral-900">{f.label}</option>
                                        ))}
                                    </select>
                                </label>
                                <label className="mb-2 block">
                                    <div className="mb-0.5 text-[11px] text-white/60">Render mode</div>
                                    <select
                                        value={selected.source.mode}
                                        onChange={(e) => patchText({ mode: e.target.value as FontMode | "auto" })}
                                        className="w-full rounded-md bg-white/10 px-2 py-1 text-xs text-white/80"
                                    >
                                        <option value="auto" className="bg-neutral-900">Auto ({getFont(selected.source.fontId).mode})</option>
                                        <option value="stroke" className="bg-neutral-900">Stroke (centerline)</option>
                                        <option value="fill" className="bg-neutral-900">Fill (outline)</option>
                                    </select>
                                </label>
                                <label className="mb-2 flex items-center justify-between text-[11px] text-white/60">
                                    Ink colour
                                    <input
                                        type="color"
                                        value={selected.source.color}
                                        onChange={(e) => patchText({ color: e.target.value })}
                                        className="h-6 w-8 cursor-pointer rounded bg-transparent"
                                    />
                                </label>
                                {textControls.map((c) => (
                                    <AdjustableSlider
                                        key={c.key}
                                        label={c.label}
                                        value={(selected.source as unknown as Record<string, number>)[c.key] ?? c.default}
                                        min={c.min}
                                        max={c.max}
                                        step={c.step}
                                        format={c.format}
                                        onChange={(v) => patchText({ [c.key]: v })}
                                    />
                                ))}
                            </>
                        )}

                        {selected.source.kind === "image" && (
                            <>
                                <label className="mb-2 block">
                                    <div className="mb-0.5 text-[11px] text-white/60">Strategy</div>
                                    <select
                                        value={selected.source.strategyId}
                                        onChange={(e) => patchImage({ strategyId: e.target.value, params: defaultParams(getStrategy(e.target.value)) })}
                                        className="w-full rounded-md bg-white/10 px-2 py-1 text-xs text-white/80"
                                    >
                                        {STRATEGIES.map((s) => (
                                            <option key={s.id} value={s.id} className="bg-neutral-900">{s.label}</option>
                                        ))}
                                    </select>
                                </label>
                                {getStrategy(selected.source.strategyId).controls.map((c) => {
                                    const params = selected.source.kind === "image" ? selected.source.params : {};
                                    const value = params[c.key] ?? c.default;
                                    if (c.kind === "select") {
                                        return (
                                            <label key={c.key} className="mb-2 block">
                                                <div className="mb-0.5 text-[11px] text-white/60">{c.label}</div>
                                                <select
                                                    value={Math.round(value)}
                                                    onChange={(e) => patchImage({ params: { ...params, [c.key]: Number(e.target.value) } })}
                                                    className="w-full rounded-md bg-white/10 px-2 py-1 text-xs text-white/80"
                                                >
                                                    {(c.options ?? []).map((label, i) => (
                                                        <option key={label} value={i} className="bg-neutral-900">{label}</option>
                                                    ))}
                                                </select>
                                            </label>
                                        );
                                    }
                                    if (c.kind === "toggle") {
                                        return (
                                            <label key={c.key} className="mb-2 flex items-center gap-2 text-[11px] text-white/70">
                                                <input
                                                    type="checkbox"
                                                    checked={value > 0.5}
                                                    onChange={(e) => patchImage({ params: { ...params, [c.key]: e.target.checked ? 1 : 0 } })}
                                                    className="accent-fuchsia-500"
                                                />
                                                {c.label}
                                            </label>
                                        );
                                    }
                                    return (
                                        <AdjustableSlider
                                            key={c.key}
                                            label={c.label}
                                            value={value}
                                            min={c.min}
                                            max={c.max}
                                            step={c.step}
                                            format={c.format}
                                            onChange={(v) => patchImage({ params: { ...params, [c.key]: v } })}
                                        />
                                    );
                                })}
                            </>
                        )}

                        {/* Transform */}
                        <div className="mt-3 border-t border-white/10 pt-3">
                            <AdjustableSlider label="Scale" value={selected.transform.scale} min={0.05} max={5} step={0.01} format={(v) => `${v.toFixed(2)}×`} onChange={(v) => patchTransform({ scale: v })} />
                            <AdjustableSlider label="Rotation" value={selected.transform.rotation} min={-180} max={180} step={1} format={(v) => `${v.toFixed(0)}°`} onChange={(v) => patchTransform({ rotation: v })} />
                            <div className="mb-2 flex gap-2">
                                <label className="flex-1 text-[11px] text-white/60">
                                    x
                                    <input type="number" value={Math.round(selected.transform.x)} onChange={(e) => patchTransform({ x: Number(e.target.value) })} className="mt-0.5 w-full rounded bg-white/5 px-1 py-0.5 text-[11px] tabular-nums text-white/80 focus:bg-white/10 focus:outline-none" />
                                </label>
                                <label className="flex-1 text-[11px] text-white/60">
                                    y
                                    <input type="number" value={Math.round(selected.transform.y)} onChange={(e) => patchTransform({ y: Number(e.target.value) })} className="mt-0.5 w-full rounded bg-white/5 px-1 py-0.5 text-[11px] tabular-nums text-white/80 focus:bg-white/10 focus:outline-none" />
                                </label>
                            </div>
                            <div className="flex gap-1.5">
                                <button onClick={bringFront} className="flex-1 rounded-md bg-white/10 py-1 text-[11px] text-white/70 hover:bg-white/20">bring front</button>
                                <button onClick={sendBack} className="flex-1 rounded-md bg-white/10 py-1 text-[11px] text-white/70 hover:bg-white/20">send back</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-[11px] text-white/40">Select an object to edit it.</p>
                )}
            </ControlPanel>
        </div>
    );
}
