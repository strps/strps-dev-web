// TSP art — the plotter-community single-line drawing.
//
// The image is first reduced to a field of stipple dots whose density tracks
// darkness (dark regions ⇒ more dots), using either weighted Voronoi stippling
// (Lloyd's relaxation, the classic even "blue-noise" look) or Floyd–Steinberg
// error-diffusion dithering. Every dot is then treated as a "city" and a
// travelling-salesman heuristic — greedy nearest-neighbour seeding followed by
// neighbour-list 2-opt, both accelerated with a uniform spatial grid — connects
// them into one short, continuous route. The whole picture is emitted as a
// single open `<polyline>`: on a pen plotter that is the ideal toolpath, drawn
// in one pen-down with zero retractions.

import type { ControlDef, Strategy, StrategyInput } from "./types";

// Hard cap on the number of cities, independent of the density slider, so the
// roughly-O(N·log N) tour construction and the time-boxed 2-opt stay responsive
// inside the canvas's 120 ms-debounced synchronous render.
const MAX_POINTS = 4000;

const CONTROLS: ControlDef[] = [
    {
        key: "method",
        label: "Method",
        kind: "select",
        min: 0,
        max: 1,
        step: 1,
        default: 0,
        options: ["Voronoi", "Floyd–Steinberg"],
    },
    { key: "density", label: "Dots", kind: "slider", min: 500, max: MAX_POINTS, step: 50, default: 1500, format: (v) => String(Math.round(v)) },
    { key: "iterations", label: "Relax", kind: "slider", min: 0, max: 12, step: 1, default: 6, format: (v) => String(Math.round(v)) },
    { key: "quality", label: "Quality", kind: "slider", min: 0, max: 100, step: 5, default: 50, format: (v) => `${Math.round(v)}%` },
    { key: "lineWidth", label: "Weight", kind: "slider", min: 0.2, max: 2, step: 0.1, default: 0.6, format: (v) => v.toFixed(1) },
    { key: "contrast", label: "Contrast", kind: "slider", min: 0.5, max: 2.5, step: 0.1, default: 1.2, format: (v) => v.toFixed(1) },
    { key: "invert", label: "Invert", kind: "toggle", min: 0, max: 1, step: 1, default: 0 },
];

function clamp01(n: number): number {
    return n < 0 ? 0 : n > 1 ? 1 : n;
}

const now = (): number => (typeof performance !== "undefined" ? performance.now() : Date.now());

/** Tiny deterministic PRNG so the same image + params always yield the same SVG. */
function mulberry32(seed: number): () => number {
    let a = seed >>> 0;
    return () => {
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

// ── Spatial grid ────────────────────────────────────────────────────────────
// A uniform bucket grid over the working rectangle. Sized to ~1 point per cell
// so nearest-point queries resolve within the first ring or two. Supports
// removal (swap-pop) for the nearest-neighbour tour, where visited cities are
// pulled out so each query only ever sees the remaining ones.

interface Grid {
    cell: number;
    cols: number;
    rows: number;
    cells: number[][];
    cellOf: Int32Array;
    slotOf: Int32Array;
}

function buildGrid(xs: Float64Array, ys: Float64Array, n: number, W: number, H: number): Grid {
    const cell = Math.max(1, Math.sqrt((W * H) / Math.max(1, n)));
    const cols = Math.max(1, Math.ceil(W / cell));
    const rows = Math.max(1, Math.ceil(H / cell));
    const cells: number[][] = Array.from({ length: cols * rows }, () => []);
    const cellOf = new Int32Array(n);
    const slotOf = new Int32Array(n);
    for (let i = 0; i < n; i++) {
        const cx = Math.min(cols - 1, Math.max(0, Math.floor(xs[i] / cell)));
        const cy = Math.min(rows - 1, Math.max(0, Math.floor(ys[i] / cell)));
        const ci = cy * cols + cx;
        cellOf[i] = ci;
        slotOf[i] = cells[ci].length;
        cells[ci].push(i);
    }
    return { cell, cols, rows, cells, cellOf, slotOf };
}

function gridRemove(grid: Grid, i: number): void {
    const arr = grid.cells[grid.cellOf[i]];
    const s = grid.slotOf[i];
    const lastId = arr[arr.length - 1];
    arr[s] = lastId;
    grid.slotOf[lastId] = s;
    arr.pop();
}

/** Nearest remaining point in the grid to (qx, qy), or -1 if the grid is empty. */
function gridNearest(grid: Grid, xs: Float64Array, ys: Float64Array, qx: number, qy: number): number {
    const { cell, cols, rows, cells } = grid;
    const cx = Math.min(cols - 1, Math.max(0, Math.floor(qx / cell)));
    const cy = Math.min(rows - 1, Math.max(0, Math.floor(qy / cell)));
    let best = -1;
    let bestD = Infinity;
    const maxR = Math.max(cols, rows);
    for (let r = 0; r <= maxR; r++) {
        const x0 = Math.max(0, cx - r);
        const x1 = Math.min(cols - 1, cx + r);
        const y0 = Math.max(0, cy - r);
        const y1 = Math.min(rows - 1, cy + r);
        for (let gy = y0; gy <= y1; gy++) {
            for (let gx = x0; gx <= x1; gx++) {
                // Only the Chebyshev-radius-r ring is new this pass.
                if (Math.max(Math.abs(gx - cx), Math.abs(gy - cy)) !== r) continue;
                const arr = cells[gy * cols + gx];
                for (let a = 0; a < arr.length; a++) {
                    const idx = arr[a];
                    const dx = xs[idx] - qx;
                    const dy = ys[idx] - qy;
                    const d = dx * dx + dy * dy;
                    if (d < bestD) {
                        bestD = d;
                        best = idx;
                    }
                }
            }
        }
        // Any point in ring r+1 is at least r·cell away; stop once that can't beat best.
        if (best >= 0 && (r * cell) * (r * cell) >= bestD) break;
    }
    return best;
}

// ── Stippling ─────────────────────────────────────────────────────────────--

/** Floyd–Steinberg error-diffusion: serpentine scan, standard 7/3/5/1 kernel. */
function stippleFloyd(dark: Float32Array, darkSum: number, W: number, H: number, target: number): { xs: Float64Array; ys: Float64Array; n: number } {
    const scale = darkSum > 0 ? target / darkSum : 0;
    const buf = new Float32Array(W * H);
    for (let i = 0; i < buf.length; i++) buf[i] = dark[i] * scale;

    const px: number[] = [];
    const py: number[] = [];
    const diffuse = (x: number, y: number, e: number, f: number) => {
        if (x < 0 || x >= W || y < 0 || y >= H) return;
        buf[y * W + x] += e * f;
    };

    for (let y = 0; y < H; y++) {
        const ltr = (y & 1) === 0;
        const dir = ltr ? 1 : -1;
        for (let k = 0; k < W; k++) {
            const x = ltr ? k : W - 1 - k;
            const idx = y * W + x;
            const v = buf[idx];
            const fired = v >= 0.5 ? 1 : 0;
            const err = v - fired;
            if (fired && px.length < MAX_POINTS) {
                px.push(x + 0.5);
                py.push(y + 0.5);
            }
            diffuse(x + dir, y, err, 7 / 16);
            diffuse(x - dir, y + 1, err, 3 / 16);
            diffuse(x, y + 1, err, 5 / 16);
            diffuse(x + dir, y + 1, err, 1 / 16);
        }
    }

    const n = px.length;
    const xs = new Float64Array(n);
    const ys = new Float64Array(n);
    for (let i = 0; i < n; i++) {
        xs[i] = px[i];
        ys[i] = py[i];
    }
    return { xs, ys, n };
}

/** Weighted Voronoi stippling via darkness-weighted Lloyd relaxation. */
function stippleVoronoi(
    dark: Float32Array,
    W: number,
    H: number,
    target: number,
    iterations: number,
    rng: () => number,
): { xs: Float64Array; ys: Float64Array; n: number } {
    let maxD = 0;
    for (let i = 0; i < dark.length; i++) if (dark[i] > maxD) maxD = dark[i];
    if (maxD <= 0) return { xs: new Float64Array(0), ys: new Float64Array(0), n: 0 };

    const xs = new Float64Array(target);
    const ys = new Float64Array(target);

    // Seed by rejection sampling so dark regions start denser.
    const seedAt = (slot: number): void => {
        for (let guard = 0; guard < 4096; guard++) {
            const sx = Math.floor(rng() * W);
            const sy = Math.floor(rng() * H);
            if (rng() < dark[sy * W + sx] / maxD) {
                xs[slot] = sx + 0.5;
                ys[slot] = sy + 0.5;
                return;
            }
        }
        // Degenerate fallback (near-uniform image): drop it anywhere.
        xs[slot] = rng() * W;
        ys[slot] = rng() * H;
    };
    for (let i = 0; i < target; i++) seedAt(i);

    const accX = new Float64Array(target);
    const accY = new Float64Array(target);
    const accW = new Float64Array(target);
    for (let it = 0; it < iterations; it++) {
        const grid = buildGrid(xs, ys, target, W, H);
        accX.fill(0);
        accY.fill(0);
        accW.fill(0);
        for (let y = 0; y < H; y++) {
            for (let x = 0; x < W; x++) {
                const w = dark[y * W + x];
                if (w < 0.01) continue; // light pixels exert no pull
                const s = gridNearest(grid, xs, ys, x + 0.5, y + 0.5);
                if (s < 0) continue;
                accX[s] += (x + 0.5) * w;
                accY[s] += (y + 0.5) * w;
                accW[s] += w;
            }
        }
        for (let i = 0; i < target; i++) {
            if (accW[i] > 0) {
                xs[i] = accX[i] / accW[i];
                ys[i] = accY[i] / accW[i];
            } else {
                seedAt(i); // empty cell — reseed at a random dark pixel
            }
        }
    }

    return { xs, ys, n: target };
}

// ── TSP heuristic ────────────────────────────────────────────────────────--

/** Greedy nearest-neighbour tour (city indices), grid-accelerated. */
function nearestNeighbourTour(xs: Float64Array, ys: Float64Array, n: number, W: number, H: number): Int32Array {
    const grid = buildGrid(xs, ys, n, W, H);
    const tour = new Int32Array(n);
    let cur = 0;
    tour[0] = cur;
    gridRemove(grid, cur);
    for (let k = 1; k < n; k++) {
        const nxt = gridNearest(grid, xs, ys, xs[cur], ys[cur]);
        tour[k] = nxt;
        gridRemove(grid, nxt);
        cur = nxt;
    }
    return tour;
}

/** k nearest neighbours per city (sorted ascending by distance), grid-based. */
function computeKNN(xs: Float64Array, ys: Float64Array, n: number, k: number, W: number, H: number): Int32Array {
    const grid = buildGrid(xs, ys, n, W, H);
    const { cell, cols, rows, cells } = grid;
    const neigh = new Int32Array(n * k).fill(-1);
    const candIdx: number[] = [];
    const candD: number[] = [];

    for (let i = 0; i < n; i++) {
        candIdx.length = 0;
        candD.length = 0;
        const cx = Math.min(cols - 1, Math.max(0, Math.floor(xs[i] / cell)));
        const cy = Math.min(rows - 1, Math.max(0, Math.floor(ys[i] / cell)));
        const maxR = Math.max(cols, rows);
        let stopR = maxR;
        for (let r = 0; r <= maxR; r++) {
            const x0 = Math.max(0, cx - r);
            const x1 = Math.min(cols - 1, cx + r);
            const y0 = Math.max(0, cy - r);
            const y1 = Math.min(rows - 1, cy + r);
            for (let gy = y0; gy <= y1; gy++) {
                for (let gx = x0; gx <= x1; gx++) {
                    if (Math.max(Math.abs(gx - cx), Math.abs(gy - cy)) !== r) continue;
                    const arr = cells[gy * cols + gx];
                    for (let a = 0; a < arr.length; a++) {
                        const idx = arr[a];
                        if (idx === i) continue;
                        const dx = xs[idx] - xs[i];
                        const dy = ys[idx] - ys[i];
                        candIdx.push(idx);
                        candD.push(dx * dx + dy * dy);
                    }
                }
            }
            // Once we have k candidates, scan one extra ring to be safe, then stop.
            if (candIdx.length >= k && r >= stopR) break;
            if (candIdx.length >= k && stopR === maxR) stopR = r + 1;
        }
        // Partial selection sort for the k smallest.
        const lim = Math.min(k, candIdx.length);
        for (let s = 0; s < lim; s++) {
            let m = s;
            for (let t = s + 1; t < candIdx.length; t++) if (candD[t] < candD[m]) m = t;
            if (m !== s) {
                const td = candD[s];
                candD[s] = candD[m];
                candD[m] = td;
                const ti = candIdx[s];
                candIdx[s] = candIdx[m];
                candIdx[m] = ti;
            }
            neigh[i * k + s] = candIdx[s];
        }
    }
    return neigh;
}

/**
 * Neighbour-list 2-opt with don't-look bits, time-boxed by `deadline`.
 * Mutates `tour`/`pos` in place. Considers each city's successor and predecessor
 * edge; the candidate scan is pruned the moment a neighbour is farther than the
 * edge being broken (neighbours are distance-sorted), so most cities are touched
 * only briefly.
 */
function twoOpt(tour: Int32Array, pos: Int32Array, xs: Float64Array, ys: Float64Array, neigh: Int32Array, k: number, deadline: number): void {
    const n = tour.length;
    const dist = (a: number, b: number): number => {
        const dx = xs[a] - xs[b];
        const dy = ys[a] - ys[b];
        return Math.sqrt(dx * dx + dy * dy);
    };

    // Reverse the cyclic segment [from..to] (inclusive); flips the complementary
    // arc instead when that is shorter — the resulting cyclic tour is equivalent.
    const reverse = (from: number, to: number): void => {
        let len = ((to - from + n) % n) + 1;
        let l = from;
        let r = to;
        if (len * 2 > n) {
            l = (to + 1) % n;
            r = (from - 1 + n) % n;
            len = n - len;
        }
        for (let s = 0; s < len >> 1; s++) {
            const cl = tour[l];
            const cr = tour[r];
            tour[l] = cr;
            tour[r] = cl;
            pos[cr] = l;
            pos[cl] = r;
            l = (l + 1) % n;
            r = (r - 1 + n) % n;
        }
    };

    const dontLook = new Uint8Array(n);
    let improvedAny = true;
    while (improvedAny && now() < deadline) {
        improvedAny = false;
        for (let a = 0; a < n; a++) {
            if (dontLook[a]) continue;
            if ((a & 511) === 0 && now() > deadline) break;
            let moved = false;
            const base = a * k;
            for (let s = 0; s < 2 && !moved; s++) {
                const i = pos[a];
                const bi = s === 0 ? (i + 1) % n : (i - 1 + n) % n;
                const b = tour[bi];
                const dab = dist(a, b);
                for (let t = 0; t < k; t++) {
                    const c = neigh[base + t];
                    if (c < 0) break;
                    const dac = dist(a, c);
                    if (dac >= dab) break; // sorted: no closer candidate remains
                    const j = pos[c];
                    const di = s === 0 ? (j + 1) % n : (j - 1 + n) % n;
                    const d = tour[di];
                    if (c === b || d === a) continue;
                    if (dac + dist(b, d) + 1e-7 < dab + dist(c, d)) {
                        if (s === 0) reverse((i + 1) % n, j);
                        else reverse(i, (j - 1 + n) % n);
                        dontLook[a] = dontLook[b] = dontLook[c] = dontLook[d] = 0;
                        moved = true;
                        improvedAny = true;
                        break;
                    }
                }
            }
            if (!moved) dontLook[a] = 1;
        }
    }
}

// ── Render ───────────────────────────────────────────────────────────────--

function render(input: StrategyInput, params: Record<string, number>): string {
    const { width: W, height: H, luma } = input;

    const method = Math.round(params.method ?? 0); // 0 = Voronoi, 1 = Floyd–Steinberg
    const density = Math.min(MAX_POINTS, Math.max(2, Math.round(params.density ?? 1500)));
    const iterations = Math.max(0, Math.min(12, Math.round(params.iterations ?? 6)));
    const quality = Math.max(0, Math.min(100, params.quality ?? 50));
    const lineWidth = params.lineWidth ?? 0.6;
    const contrast = params.contrast ?? 1.2;
    const invert = (params.invert ?? 0) > 0.5;

    // Darkness field: smaller tone = darker = more dots. Contrast pivots around
    // mid-grey; invert flips which side of the range collects ink.
    const N = W * H;
    const dark = new Float32Array(N);
    let darkSum = 0;
    for (let i = 0; i < N; i++) {
        let l = clamp01(0.5 + (luma[i] - 0.5) * contrast);
        if (invert) l = 1 - l;
        const d = 1 - l;
        dark[i] = d;
        darkSum += d;
    }

    const stroke = invert ? "#ffffff" : "#111111";
    const bg = invert ? "#111111" : "#ffffff";
    const head =
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">` +
        `<rect width="${W}" height="${H}" fill="${bg}"/>`;
    const empty = head + `</svg>`;

    const rng = mulberry32(0x9e3779b9);
    const { xs, ys, n } = method === 1 ? stippleFloyd(dark, darkSum, W, H, density) : stippleVoronoi(dark, W, H, density, iterations, rng);

    if (n < 2) return empty;

    const tour = nearestNeighbourTour(xs, ys, n, W, H);
    if (n >= 4) {
        const pos = new Int32Array(n);
        for (let p = 0; p < n; p++) pos[tour[p]] = p;
        const k = Math.min(8, n - 1);
        const neigh = computeKNN(xs, ys, n, k, W, H);
        const budget = 40 + quality * 4; // ~40 ms … ~440 ms of refinement
        twoOpt(tour, pos, xs, ys, neigh, k, now() + budget);
    }

    // One open polyline through the tour — a single, retraction-free stroke.
    let pts = "";
    for (let p = 0; p < n; p++) {
        const idx = tour[p];
        pts += `${xs[idx].toFixed(1)},${ys[idx].toFixed(1)} `;
    }

    return (
        head +
        `<g fill="none" stroke="${stroke}" stroke-width="${lineWidth}" stroke-linejoin="round" stroke-linecap="round">` +
        `<polyline points="${pts.trimEnd()}"/>` +
        `</g></svg>`
    );
}

export const tspArtStrategy: Strategy = {
    id: "tsp-art",
    label: "TSP Art (single line)",
    controls: CONTROLS,
    render,
};
