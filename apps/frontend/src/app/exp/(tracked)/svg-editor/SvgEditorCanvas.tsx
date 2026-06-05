"use client";

// Interactive viewport for the SVG editor.
//
// Architecture: an outer <svg> fills the pane. A view group
// `translate(pan) scale(viewScale)` holds the paper (drop shadow + bg) and one
// <g> per object (object markup injected via dangerouslySetInnerHTML). The
// selection overlay (bounding box + scale/rotate handles) is drawn OUTSIDE the
// view group, in screen pixels, so handles keep a constant size at any zoom.
//
// Coordinate spaces:
//   - local px:   an object's own [0,0]→[w,h] content space.
//   - document:   paper units (mm); object transform places local → document.
//   - screen:     css px in the svg; screen = pan + document * viewScale.

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { resolvePaper, contrastColor } from "./paper";
import { signatureSvg } from "./signature";
import { getSignatureFont } from "./lib/fonts";
import { loadFont, getLoadedFont } from "./lib/fontLoader";
import type { EditorDocument, ObjectTransform, PlacedObject } from "./objects";

interface View {
    x: number;
    y: number;
    scale: number;
}

interface Props {
    doc: EditorDocument;
    selectedId: string | null;
    onSelect: (id: string | null) => void;
    onTransform: (id: string, t: ObjectTransform) => void;
    className?: string;
}

type Drag =
    | { mode: "pan"; px: number; py: number; ox: number; oy: number }
    | { mode: "move"; id: string; lx: number; ly: number }
    | { mode: "scale"; id: string; cx: number; cy: number; w: number; h: number; startScale: number; startDist: number }
    | { mode: "rotate"; id: string; cx: number; cy: number; offset: number };

const HANDLE = 9; // screen px
const ROTATE_ARM = 26; // screen px above the top edge
const deg = (rad: number) => (rad * 180) / Math.PI;
const rad = (d: number) => (d * Math.PI) / 180;

/** A placed object's transform as an SVG transform string (matches document.ts). */
function transformStr(o: PlacedObject): string {
    const r = o.rendered!;
    const t = o.transform;
    const hw = (r.width * t.scale) / 2;
    const hh = (r.height * t.scale) / 2;
    return `translate(${t.x} ${t.y}) rotate(${t.rotation} ${hw} ${hh}) scale(${t.scale})`;
}

/** The four document-space corners of an object (after scale + rotation). */
function corners(o: PlacedObject): { x: number; y: number }[] {
    const r = o.rendered!;
    const t = o.transform;
    const w = r.width * t.scale;
    const h = r.height * t.scale;
    const cx = t.x + w / 2;
    const cy = t.y + h / 2;
    const a = rad(t.rotation);
    const cos = Math.cos(a);
    const sin = Math.sin(a);
    return [
        [-w / 2, -h / 2],
        [w / 2, -h / 2],
        [w / 2, h / 2],
        [-w / 2, h / 2],
    ].map(([dx, dy]) => ({ x: cx + dx * cos - dy * sin, y: cy + dx * sin + dy * cos }));
}

export default function SvgEditorCanvas({ doc, selectedId, onSelect, onTransform, className }: Props) {
    const svgRef = useRef<SVGSVGElement>(null);
    const dragRef = useRef<Drag | null>(null);
    const [view, setView] = useState<View>({ x: 0, y: 0, scale: 1 });
    const [fontTick, setFontTick] = useState(0);

    const { pw, ph, margin } = useMemo(
        () => resolvePaper(doc.paperId, doc.landscape),
        [doc.paperId, doc.landscape],
    );

    const selected = doc.objects.find((o) => o.id === selectedId && o.rendered) ?? null;

    // Preload the signature font so the corner mark upgrades to vector paths.
    useEffect(() => {
        let alive = true;
        loadFont(getSignatureFont().url).then(() => { if (alive) setFontTick((t) => t + 1); }).catch(() => { });
        return () => { alive = false; };
    }, []);

    // Fit the paper into the pane whenever its dimensions change.
    const fit = useCallback(() => {
        const el = svgRef.current;
        if (!el) return;
        const { width, height } = el.getBoundingClientRect();
        if (!width || !height) return;
        const scale = Math.min(width / pw, height / ph) * 0.9;
        setView({ scale, x: (width - pw * scale) / 2, y: (height - ph * scale) / 2 });
    }, [pw, ph]);

    useEffect(() => { fit(); }, [fit]);

    // Screen ⇄ document mapping.
    const toDoc = useCallback((clientX: number, clientY: number) => {
        const rect = svgRef.current!.getBoundingClientRect();
        return {
            x: (clientX - rect.left - view.x) / view.scale,
            y: (clientY - rect.top - view.y) / view.scale,
        };
    }, [view]);
    const toScreen = useCallback(
        (x: number, y: number) => ({ x: view.x + x * view.scale, y: view.y + y * view.scale }),
        [view],
    );

    // Wheel zoom about the cursor (manual listener so we can preventDefault).
    useEffect(() => {
        const el = svgRef.current;
        if (!el) return;
        function onWheel(e: WheelEvent) {
            e.preventDefault();
            const rect = el!.getBoundingClientRect();
            const sx = e.clientX - rect.left;
            const sy = e.clientY - rect.top;
            setView((v) => {
                const ns = Math.min(50, Math.max(0.02, v.scale * Math.exp(-e.deltaY * 0.0015)));
                const docx = (sx - v.x) / v.scale;
                const docy = (sy - v.y) / v.scale;
                return { scale: ns, x: sx - docx * ns, y: sy - docy * ns };
            });
        }
        el.addEventListener("wheel", onWheel, { passive: false });
        return () => el.removeEventListener("wheel", onWheel);
    }, []);

    function capture(e: React.PointerEvent) {
        svgRef.current?.setPointerCapture(e.pointerId);
    }

    // Empty-canvas press: deselect + start panning.
    function onBackgroundDown(e: React.PointerEvent) {
        onSelect(null);
        dragRef.current = { mode: "pan", px: e.clientX, py: e.clientY, ox: view.x, oy: view.y };
        capture(e);
    }

    function onObjectDown(e: React.PointerEvent, id: string) {
        e.stopPropagation();
        onSelect(id);
        const d = toDoc(e.clientX, e.clientY);
        dragRef.current = { mode: "move", id, lx: d.x, ly: d.y };
        capture(e);
    }

    function onScaleDown(e: React.PointerEvent, o: PlacedObject) {
        e.stopPropagation();
        const r = o.rendered!;
        const t = o.transform;
        const cx = t.x + (r.width * t.scale) / 2;
        const cy = t.y + (r.height * t.scale) / 2;
        const d = toDoc(e.clientX, e.clientY);
        const startDist = Math.hypot(d.x - cx, d.y - cy) || 1;
        dragRef.current = { mode: "scale", id: o.id, cx, cy, w: r.width, h: r.height, startScale: t.scale, startDist };
        capture(e);
    }

    function onRotateDown(e: React.PointerEvent, o: PlacedObject) {
        e.stopPropagation();
        const r = o.rendered!;
        const t = o.transform;
        const cx = t.x + (r.width * t.scale) / 2;
        const cy = t.y + (r.height * t.scale) / 2;
        const d = toDoc(e.clientX, e.clientY);
        const offset = Math.atan2(d.y - cy, d.x - cx) - rad(t.rotation);
        dragRef.current = { mode: "rotate", id: o.id, cx, cy, offset };
        capture(e);
    }

    function onPointerMove(e: React.PointerEvent) {
        const drag = dragRef.current;
        if (!drag) return;
        if (drag.mode === "pan") {
            setView((v) => ({ ...v, x: drag.ox + (e.clientX - drag.px), y: drag.oy + (e.clientY - drag.py) }));
            return;
        }
        const obj = doc.objects.find((o) => o.id === drag.id);
        if (!obj) return;
        const d = toDoc(e.clientX, e.clientY);
        if (drag.mode === "move") {
            onTransform(drag.id, { ...obj.transform, x: obj.transform.x + (d.x - drag.lx), y: obj.transform.y + (d.y - drag.ly) });
            drag.lx = d.x;
            drag.ly = d.y;
        } else if (drag.mode === "scale") {
            const dist = Math.hypot(d.x - drag.cx, d.y - drag.cy);
            const ns = Math.max(0.01, (drag.startScale * dist) / drag.startDist);
            onTransform(drag.id, { ...obj.transform, scale: ns, x: drag.cx - (drag.w * ns) / 2, y: drag.cy - (drag.h * ns) / 2 });
        } else if (drag.mode === "rotate") {
            const angle = Math.atan2(d.y - drag.cy, d.x - drag.cx) - drag.offset;
            onTransform(drag.id, { ...obj.transform, rotation: deg(angle) });
        }
    }

    function onPointerUp(e: React.PointerEvent) {
        dragRef.current = null;
        svgRef.current?.releasePointerCapture(e.pointerId);
    }

    // Corner signature, mirroring composeDocument (display only; export rebuilds it).
    const signature = useMemo(() => {
        const f = getSignatureFont();
        return signatureSvg({
            x: pw - margin,
            y: ph - margin,
            size: Math.min(pw, ph) * 0.035,
            color: contrastColor(doc.background),
            font: getLoadedFont(f.url) ?? undefined,
            mode: f.mode,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pw, ph, margin, doc.background, fontTick]);

    const ordered = [...doc.objects].sort((a, b) => a.z - b.z);

    // Selection overlay geometry, in screen space.
    let overlay: React.ReactNode = null;
    if (selected) {
        const pts = corners(selected).map((p) => toScreen(p.x, p.y));
        const polyline = pts.map((p) => `${p.x},${p.y}`).join(" ");
        // Rotate handle sits above the top edge midpoint, along its outward normal.
        const topMid = { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 };
        const ex = pts[1].x - pts[0].x;
        const ey = pts[1].y - pts[0].y;
        const len = Math.hypot(ex, ey) || 1;
        const nx = ey / len; // outward normal (top edge → away from box)
        const ny = -ex / len;
        const rot = { x: topMid.x + nx * ROTATE_ARM, y: topMid.y + ny * ROTATE_ARM };
        overlay = (
            <g>
                <polygon points={polyline} fill="none" stroke="#e879f9" strokeWidth={1.5} strokeDasharray="4 3" />
                <line x1={topMid.x} y1={topMid.y} x2={rot.x} y2={rot.y} stroke="#e879f9" strokeWidth={1.5} />
                <circle
                    cx={rot.x}
                    cy={rot.y}
                    r={HANDLE / 2 + 1}
                    fill="#0a0a10"
                    stroke="#e879f9"
                    strokeWidth={1.5}
                    style={{ cursor: "grab" }}
                    onPointerDown={(e) => onRotateDown(e, selected)}
                />
                {pts.map((p, i) => (
                    <rect
                        key={i}
                        x={p.x - HANDLE / 2}
                        y={p.y - HANDLE / 2}
                        width={HANDLE}
                        height={HANDLE}
                        fill="#0a0a10"
                        stroke="#e879f9"
                        strokeWidth={1.5}
                        style={{ cursor: "nwse-resize" }}
                        onPointerDown={(e) => onScaleDown(e, selected)}
                    />
                ))}
            </g>
        );
    }

    return (
        <svg
            ref={svgRef}
            className={className}
            style={{ background: "#0a0a10", touchAction: "none", cursor: "grab" }}
            width="100%"
            height="100%"
            onPointerDown={onBackgroundDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onDoubleClick={fit}
        >
            <g transform={`translate(${view.x} ${view.y}) scale(${view.scale})`}>
                {/* Paper drop shadow + sheet. */}
                <rect x={pw * 0.006} y={ph * 0.006} width={pw} height={ph} fill="rgba(0,0,0,0.45)" />
                <rect width={pw} height={ph} fill={doc.background} />
                {ordered.map((o) =>
                    o.rendered ? (
                        <g
                            key={o.id}
                            transform={transformStr(o)}
                            style={{ cursor: "move" }}
                            onPointerDown={(e) => onObjectDown(e, o.id)}
                        >
                            {o.rendered.background && (
                                <rect width={o.rendered.width} height={o.rendered.height} fill={o.rendered.background} />
                            )}
                            <g dangerouslySetInnerHTML={{ __html: o.rendered.markup }} />
                        </g>
                    ) : null,
                )}
                <g dangerouslySetInnerHTML={{ __html: signature }} />
            </g>
            {overlay}
        </svg>
    );
}
