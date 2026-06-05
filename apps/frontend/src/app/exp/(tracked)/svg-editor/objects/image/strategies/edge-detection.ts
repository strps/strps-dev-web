// Edge Detection (Sobel): find the sharp outlines in the image and turn only
// those into vector strokes, for a minimalist structural sketch rather than a
// shaded reproduction. The pipeline mirrors the front half of Canny:
//
//   1. optional Gaussian-ish blur to quiet sensor/JPEG noise;
//   2. a Sobel operator for the gradient (edge strength + direction);
//   3. non-maximum suppression to thin fat gradients down to 1-px ridges;
//   4. a threshold to keep only confident edges;
//   5. trace the surviving edge pixels into connected polylines.
//
// Step 5 is what makes this plotter-friendly: instead of stamping a dot per edge
// pixel, neighbouring edge pixels are chained into long continuous strokes, and
// fragments shorter than `minLength` are dropped so the pen isn't lifted for
// every speck of noise.

import type { ControlDef, Strategy, StrategyInput } from "./types";

const CONTROLS: ControlDef[] = [
    { key: "threshold", label: "Threshold", kind: "slider", min: 0.04, max: 0.6, step: 0.01, default: 0.16, format: (v) => v.toFixed(2) },
    { key: "blur", label: "Blur", kind: "slider", min: 0, max: 3, step: 1, default: 1, format: (v) => `${v}px` },
    { key: "minLength", label: "Min length", kind: "slider", min: 1, max: 40, step: 1, default: 5, format: (v) => `${v}px` },
    { key: "simplify", label: "Simplify", kind: "slider", min: 0, max: 3, step: 0.1, default: 1, format: (v) => v.toFixed(1) },
    { key: "lineWidth", label: "Weight", kind: "slider", min: 0.3, max: 2, step: 0.1, default: 0.8, format: (v) => v.toFixed(1) },
    { key: "thin", label: "Thin", kind: "toggle", min: 0, max: 1, step: 1, default: 1 },
    { key: "invert", label: "Invert", kind: "toggle", min: 0, max: 1, step: 1, default: 0 },
];

type Pt = [number, number];

// Separable box blur (a cheap Gaussian stand-in) over a row-major Float32 grid.
function boxBlur(src: Float32Array, W: number, H: number, r: number): Float32Array {
    if (r <= 0) return src;
    const tmp = new Float32Array(W * H);
    const out = new Float32Array(W * H);
    const win = 2 * r + 1;
    for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
            let sum = 0;
            for (let k = -r; k <= r; k++) {
                const xx = Math.min(W - 1, Math.max(0, x + k));
                sum += src[y * W + xx];
            }
            tmp[y * W + x] = sum / win;
        }
    }
    for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
            let sum = 0;
            for (let k = -r; k <= r; k++) {
                const yy = Math.min(H - 1, Math.max(0, y + k));
                sum += tmp[yy * W + x];
            }
            out[y * W + x] = sum / win;
        }
    }
    return out;
}

// Ramer–Douglas–Peucker-style decimation: drop a vertex when its perpendicular
// distance from the line through its kept neighbours is below `eps`. Keeps long
// straight edges as two points while preserving corners.
function simplifyPath(pts: Pt[], eps: number): Pt[] {
    if (eps <= 0 || pts.length < 3) return pts;
    const out: Pt[] = [pts[0]];
    for (let i = 1; i < pts.length - 1; i++) {
        const a = out[out.length - 1];
        const b = pts[i];
        const c = pts[i + 1];
        const dx = c[0] - a[0];
        const dy = c[1] - a[1];
        const len = Math.hypot(dx, dy) || 1e-6;
        const dist = Math.abs((b[0] - a[0]) * dy - (b[1] - a[1]) * dx) / len;
        if (dist > eps) out.push(b);
    }
    out.push(pts[pts.length - 1]);
    return out;
}

function render(input: StrategyInput, params: Record<string, number>): string {
    const { width: W, height: H, luma } = input;

    const threshold = params.threshold ?? 0.16;
    const blur = Math.max(0, Math.round(params.blur ?? 1));
    const minLength = Math.max(1, Math.round(params.minLength ?? 5));
    const eps = Math.max(0, params.simplify ?? 1);
    const lineWidth = params.lineWidth ?? 0.8;
    const thin = (params.thin ?? 1) > 0.5;
    const invert = (params.invert ?? 0) > 0.5;

    const src = boxBlur(luma, W, H, blur);

    // Sobel gradient. Magnitude is normalised by the operator's maximum response
    // (4·√2 for inputs in 0..1) so `threshold` reads as a fraction in 0..1.
    const mag = new Float32Array(W * H);
    const ang = new Float32Array(W * H);
    const NORM = 1 / (4 * Math.SQRT2);
    for (let y = 1; y < H - 1; y++) {
        for (let x = 1; x < W - 1; x++) {
            const i = y * W + x;
            const tl = src[i - W - 1], tm = src[i - W], tr = src[i - W + 1];
            const ml = src[i - 1], mr = src[i + 1];
            const bl = src[i + W - 1], bm = src[i + W], br = src[i + W + 1];
            const gx = tr + 2 * mr + br - (tl + 2 * ml + bl);
            const gy = bl + 2 * bm + br - (tl + 2 * tm + tr);
            mag[i] = Math.hypot(gx, gy) * NORM;
            ang[i] = Math.atan2(gy, gx);
        }
    }

    // Non-maximum suppression: keep a pixel only if it is a ridge peak along the
    // gradient direction (quantised to the four 45° neighbour axes).
    const keep = new Float32Array(W * H);
    if (thin) {
        for (let y = 1; y < H - 1; y++) {
            for (let x = 1; x < W - 1; x++) {
                const i = y * W + x;
                const m = mag[i];
                if (m === 0) continue;
                const a = ((ang[i] * 180) / Math.PI + 180) % 180;
                let p: number, q: number;
                if (a < 22.5 || a >= 157.5) {
                    p = mag[i - 1];
                    q = mag[i + 1];
                } else if (a < 67.5) {
                    p = mag[i - W + 1];
                    q = mag[i + W - 1];
                } else if (a < 112.5) {
                    p = mag[i - W];
                    q = mag[i + W];
                } else {
                    p = mag[i - W - 1];
                    q = mag[i + W + 1];
                }
                keep[i] = m >= p && m >= q ? m : 0;
            }
        }
    } else {
        keep.set(mag);
    }

    // Binary edge map.
    const edge = new Uint8Array(W * H);
    for (let i = 0; i < edge.length; i++) edge[i] = keep[i] >= threshold ? 1 : 0;

    // 8-connected neighbour offsets, orthogonal first so straight runs are
    // preferred over diagonal detours.
    const NB = [
        [1, 0], [-1, 0], [0, 1], [0, -1],
        [1, 1], [1, -1], [-1, 1], [-1, -1],
    ];
    const deg = (x: number, y: number): number => {
        let c = 0;
        for (const [dx, dy] of NB) {
            const nx = x + dx, ny = y + dy;
            if (nx >= 0 && nx < W && ny >= 0 && ny < H && edge[ny * W + nx]) c++;
        }
        return c;
    };
    const pop = (x: number, y: number): Pt | null => {
        for (const [dx, dy] of NB) {
            const nx = x + dx, ny = y + dy;
            if (nx >= 0 && nx < W && ny >= 0 && ny < H && edge[ny * W + nx]) return [nx, ny];
        }
        return null;
    };

    const stroke = invert ? "#ffffff" : "#111111";
    const paths: string[] = [];

    // Trace edge pixels into chains. Round 0 starts from endpoints (degree 1) so
    // open curves are walked head-to-tail; round 1 mops up the remaining closed
    // loops. Pixels are consumed as they're visited, so junctions naturally split
    // into separate strokes.
    const trace = (sx: number, sy: number) => {
        edge[sy * W + sx] = 0;
        const path: Pt[] = [[sx, sy]];
        let cx = sx, cy = sy;
        for (;;) {
            const nb = pop(cx, cy);
            if (!nb) break;
            edge[nb[1] * W + nb[0]] = 0;
            path.push(nb);
            cx = nb[0];
            cy = nb[1];
        }
        if (path.length < minLength) return;
        const simp = simplifyPath(path, eps);
        const d = simp.map((p) => `${p[0]},${p[1]}`).join(" ");
        paths.push(`<polyline points="${d}"/>`);
    };

    for (let round = 0; round < 2; round++) {
        for (let y = 0; y < H; y++) {
            for (let x = 0; x < W; x++) {
                if (!edge[y * W + x]) continue;
                if (round === 0 && deg(x, y) !== 1) continue;
                trace(x, y);
            }
        }
    }

    return (
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">` +
        `<g stroke="${stroke}" stroke-width="${lineWidth}" stroke-linecap="round" stroke-linejoin="round" fill="none">` +
        paths.join("") +
        `</g></svg>`
    );
}

export const edgeDetectionStrategy: Strategy = {
    id: "edge-detection",
    label: "Edge Detection / Sobel",
    controls: CONTROLS,
    render,
};
