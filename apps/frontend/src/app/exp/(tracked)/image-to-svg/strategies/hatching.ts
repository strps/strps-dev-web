// Classical geometric halftoning via threshold-layered hatching / cross-hatching.
//
// The image tone is split into N layers. Each layer draws a family of parallel
// lines spanning the image, but a stroke is only emitted where the underlying
// tone is darker than that layer's threshold. The darkest pixels fall below
// every threshold, so they accumulate strokes from every layer; layers
// alternate between the base angle and a cross angle, so dark regions build up
// into cross-hatching while light regions get at most a single sparse set of
// lines. The result reads like a copperplate engraving.

import type { ControlDef, Strategy, StrategyInput } from "./types";

const CONTROLS: ControlDef[] = [
    { key: "spacing", label: "Spacing", kind: "slider", min: 3, max: 24, step: 1, default: 6, format: (v) => `${v}px` },
    { key: "lineWidth", label: "Weight", kind: "slider", min: 0.3, max: 2, step: 0.1, default: 0.8, format: (v) => v.toFixed(1) },
    { key: "levels", label: "Levels", kind: "slider", min: 2, max: 6, step: 1, default: 4, format: (v) => String(v) },
    { key: "angle", label: "Angle", kind: "slider", min: 0, max: 180, step: 5, default: 45, format: (v) => `${v}°` },
    { key: "crossAngle", label: "Cross", kind: "slider", min: 45, max: 135, step: 5, default: 90, format: (v) => `+${v}°` },
    { key: "contrast", label: "Contrast", kind: "slider", min: 0.5, max: 2.5, step: 0.1, default: 1.2, format: (v) => v.toFixed(1) },
    { key: "invert", label: "Invert", kind: "toggle", min: 0, max: 1, step: 1, default: 0 },
];

function clamp01(n: number) {
    return n < 0 ? 0 : n > 1 ? 1 : n;
}

function render(input: StrategyInput, params: Record<string, number>): string {
    const { width: W, height: H, sample } = input;

    const spacing = Math.max(1, params.spacing ?? 6);
    const lineWidth = params.lineWidth ?? 0.8;
    const levels = Math.max(1, Math.round(params.levels ?? 4));
    const baseAngle = ((params.angle ?? 45) * Math.PI) / 180;
    const crossAngle = ((params.crossAngle ?? 90) * Math.PI) / 180;
    const contrast = params.contrast ?? 1.2;
    const invert = (params.invert ?? 0) > 0.5;

    // Tone in 0..1 where smaller = "more hatched". Contrast pivots around mid
    // grey; invert flips which side of the tone range gets the strokes.
    const toneAt = (x: number, y: number): number => {
        let l = sample(x, y);
        l = clamp01(0.5 + (l - 0.5) * contrast);
        return invert ? 1 - l : l;
    };

    // Marching step along each line: small enough to follow region edges, but
    // bounded so generation stays fast and the SVG compact.
    const step = Math.max(1.2, Math.min(spacing * 0.5, 2.5));

    const stroke = invert ? "#ffffff" : "#111111";
    const bg = invert ? "#111111" : "#ffffff";

    const segments: string[] = [];

    // Layers ordered by descending threshold: the first (lightest threshold)
    // covers the most area at the base angle; each successive layer covers only
    // darker pixels, alternating to the cross angle and phase-shifted within the
    // spacing cell so same-angle layers interleave rather than overlap.
    for (let rank = 0; rank < levels; rank++) {
        const threshold = (levels - rank) / (levels + 1);
        const theta = baseAngle + (rank % 2 === 1 ? crossAngle : 0);
        const phase = (rank * spacing) / levels;

        const dx = Math.cos(theta);
        const dy = Math.sin(theta);
        const nx = -dy;
        const ny = dx;

        // Project the image corners onto the line direction (d) and normal (n)
        // to find the span of lines needed to cover the whole bbox.
        const corners = [
            [0, 0],
            [W, 0],
            [0, H],
            [W, H],
        ];
        let nMin = Infinity;
        let nMax = -Infinity;
        let dMin = Infinity;
        let dMax = -Infinity;
        for (const [cx, cy] of corners) {
            const pn = cx * nx + cy * ny;
            const pd = cx * dx + cy * dy;
            if (pn < nMin) nMin = pn;
            if (pn > nMax) nMax = pn;
            if (pd < dMin) dMin = pd;
            if (pd > dMax) dMax = pd;
        }

        for (let s = nMin + phase; s <= nMax; s += spacing) {
            // Walk the line P(t) = s*n + t*d, emitting a segment over each run
            // where the tone stays below this layer's threshold.
            let runStartT: number | null = null;
            let prevX = 0;
            let prevY = 0;
            for (let t = dMin; t <= dMax; t += step) {
                const x = s * nx + t * dx;
                const y = s * ny + t * dy;
                const inside = x >= 0 && x <= W && y >= 0 && y <= H;
                const covered = inside && toneAt(x, y) < threshold;
                if (covered) {
                    if (runStartT === null) {
                        runStartT = t;
                    }
                    prevX = x;
                    prevY = y;
                } else if (runStartT !== null) {
                    const sx = s * nx + runStartT * dx;
                    const sy = s * ny + runStartT * dy;
                    segments.push(
                        `<line x1="${sx.toFixed(1)}" y1="${sy.toFixed(1)}" x2="${prevX.toFixed(1)}" y2="${prevY.toFixed(1)}"/>`,
                    );
                    runStartT = null;
                }
            }
            if (runStartT !== null) {
                const sx = s * nx + runStartT * dx;
                const sy = s * ny + runStartT * dy;
                segments.push(
                    `<line x1="${sx.toFixed(1)}" y1="${sy.toFixed(1)}" x2="${prevX.toFixed(1)}" y2="${prevY.toFixed(1)}"/>`,
                );
            }
        }
    }

    return (
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">` +
        `<rect width="${W}" height="${H}" fill="${bg}"/>` +
        `<g stroke="${stroke}" stroke-width="${lineWidth}" stroke-linecap="round" fill="none">` +
        segments.join("") +
        `</g></svg>`
    );
}

export const hatchingStrategy: Strategy = {
    id: "hatching",
    label: "Hatching / Cross-Hatching",
    controls: CONTROLS,
    render,
};
