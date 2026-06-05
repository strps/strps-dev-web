// Variable-density wave forms: parallel lines that turn the image into a field
// of oscillating strokes. A flat line carries no tone; darkness is encoded three
// ways at once, all driven by the local sample:
//
//   - amplitude  — darker pixels make the line wobble further off its baseline;
//   - frequency  — darker pixels make the wobble oscillate faster (tighter);
//   - bunching    — darker rows pull the next line closer, so strokes crowd up.
//
// Light regions stay near-straight and widely spaced; dark regions become dense,
// high-amplitude ripples that read as ink. The line family can be rotated to any
// angle, and the whole bbox is covered the way the hatching strategy does it:
// project the corners onto the line direction/normal to find the span to fill.

import type { ControlDef, Strategy, StrategyInput } from "./types";

const CONTROLS: ControlDef[] = [
    { key: "spacing", label: "Spacing", kind: "slider", min: 4, max: 24, step: 1, default: 8, format: (v) => `${v}px` },
    { key: "angle", label: "Angle", kind: "slider", min: 0, max: 180, step: 5, default: 0, format: (v) => `${v}°` },
    { key: "amplitude", label: "Wobble", kind: "slider", min: 0, max: 8, step: 0.5, default: 3, format: (v) => `${v}px` },
    { key: "frequency", label: "Frequency", kind: "slider", min: 0.02, max: 0.4, step: 0.01, default: 0.12, format: (v) => v.toFixed(2) },
    { key: "freqMod", label: "Freq mod", kind: "slider", min: 0, max: 1, step: 0.05, default: 0.5, format: (v) => v.toFixed(2) },
    { key: "density", label: "Bunching", kind: "slider", min: 0, max: 1, step: 0.05, default: 0.4, format: (v) => v.toFixed(2) },
    { key: "lineWidth", label: "Weight", kind: "slider", min: 0.3, max: 2, step: 0.1, default: 0.8, format: (v) => v.toFixed(1) },
    { key: "contrast", label: "Contrast", kind: "slider", min: 0.5, max: 2.5, step: 0.1, default: 1.2, format: (v) => v.toFixed(1) },
    { key: "invert", label: "Invert", kind: "toggle", min: 0, max: 1, step: 1, default: 0 },
];

function clamp01(n: number) {
    return n < 0 ? 0 : n > 1 ? 1 : n;
}

function render(input: StrategyInput, params: Record<string, number>): string {
    const { width: W, height: H, sample } = input;

    const spacing = Math.max(1, params.spacing ?? 8);
    const baseAngle = ((params.angle ?? 0) * Math.PI) / 180;
    const amplitude = params.amplitude ?? 3;
    const frequency = params.frequency ?? 0.12;
    const freqMod = params.freqMod ?? 0.5;
    const density = params.density ?? 0.4;
    const lineWidth = params.lineWidth ?? 0.8;
    const contrast = params.contrast ?? 1.2;
    const invert = (params.invert ?? 0) > 0.5;

    // Darkness in 0..1 where larger = "more ink". Contrast pivots around mid
    // grey; invert flips which side of the tone range reads as dark.
    const darknessAt = (x: number, y: number): number => {
        let l = sample(x, y);
        l = clamp01(0.5 + (l - 0.5) * contrast);
        if (invert) l = 1 - l;
        return 1 - l;
    };

    const dx = Math.cos(baseAngle);
    const dy = Math.sin(baseAngle);
    const nx = -dy;
    const ny = dx;

    // Project the image corners onto the line direction (d) and normal (n) to
    // find the span of lines needed to cover the whole bbox.
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

    // Marching step along each line: small enough to resolve the wobble, but
    // bounded so generation stays fast and the SVG compact.
    const step = Math.max(1, Math.min(spacing * 0.4, 2.5));

    const stroke = invert ? "#ffffff" : "#111111";

    const lines: string[] = [];

    // Walk line offsets `s` along the normal. The advance shrinks with the
    // darkness sampled at the line's midpoint so dark bands bunch up; clamp the
    // effective spacing so a slider can't explode the line count.
    let s = nMin;
    while (s <= nMax) {
        // Sample darkness at the centre of this line to drive bunching.
        const midT = (dMin + dMax) / 2;
        const mx = s * nx + midT * dx;
        const my = s * ny + midT * dy;
        const midDark =
            mx >= 0 && mx <= W && my >= 0 && my <= H ? darknessAt(mx, my) : 0;

        const points: string[] = [];
        let phase = 0;
        let prevT = dMin;
        for (let t = dMin; t <= dMax; t += step) {
            const bx = s * nx + t * dx;
            const by = s * ny + t * dy;
            const inside = bx >= 0 && bx <= W && by >= 0 && by <= H;
            const dark = inside ? darknessAt(bx, by) : 0;

            // Advance phase by arc length; instantaneous frequency rises with
            // local darkness so dark regions ripple tighter.
            phase += (t - prevT) * frequency * (1 + freqMod * dark);
            prevT = t;

            const offset = amplitude * dark * Math.sin(phase);
            const x = bx + offset * nx;
            const y = by + offset * ny;
            points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
        }

        if (points.length > 1) {
            lines.push(`<polyline points="${points.join(" ")}"/>`);
        }

        const effSpacing = Math.max(2, spacing * (1 - density * midDark));
        s += effSpacing;
    }

    return (
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">` +
        `<g stroke="${stroke}" stroke-width="${lineWidth}" stroke-linecap="round" stroke-linejoin="round" fill="none">` +
        lines.join("") +
        `</g></svg>`
    );
}

export const waveFormsStrategy: Strategy = {
    id: "wave-forms",
    label: "Wave Forms / Variable-Density Lines",
    controls: CONTROLS,
    render,
};
