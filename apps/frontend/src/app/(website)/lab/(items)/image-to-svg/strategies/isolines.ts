// Topographic / Isolines: read the image's brightness as terrain elevation and
// draw contour lines at fixed "heights". White is high ground, black is a deep
// valley; slicing that surface at evenly spaced elevations and tracing where
// each slice cuts the terrain yields the nested rings of a geographic survey map.
//
// The slicing is classic marching squares run over a coarsened luminance grid,
// one pass per elevation. Marching squares emits a soup of tiny per-cell
// segments, so we stitch them end-to-end into long, mostly-closed contour
// polylines — far better as a pen-plotter toolpath than thousands of disjoint
// line elements, and smoother to look at. An optional Chaikin pass rounds the
// stair-stepping the grid introduces.

import type { ControlDef, Strategy, StrategyInput } from "./types";

const CONTROLS: ControlDef[] = [
    { key: "levels", label: "Levels", kind: "slider", min: 2, max: 20, step: 1, default: 10, format: (v) => String(v) },
    { key: "grid", label: "Grid", kind: "slider", min: 1, max: 6, step: 1, default: 2, format: (v) => `${v}px` },
    { key: "smooth", label: "Smooth", kind: "slider", min: 0, max: 3, step: 1, default: 2, format: (v) => String(v) },
    { key: "lineWidth", label: "Weight", kind: "slider", min: 0.3, max: 2, step: 0.1, default: 0.7, format: (v) => v.toFixed(1) },
    { key: "contrast", label: "Contrast", kind: "slider", min: 0.5, max: 2.5, step: 0.1, default: 1, format: (v) => v.toFixed(1) },
    { key: "invert", label: "Invert", kind: "toggle", min: 0, max: 1, step: 1, default: 0 },
];

function clamp01(n: number) {
    return n < 0 ? 0 : n > 1 ? 1 : n;
}

type Pt = [number, number];
type Seg = [number, number, number, number];

// Join a soup of unordered segments into connected polylines by matching shared
// endpoints. Marching squares produces identical crossing coordinates on the
// shared edge of two adjacent cells, so quantising endpoints to a fixed grid
// reliably links neighbours into one continuous contour (open or closed).
function stitch(segs: Seg[]): Pt[][] {
    const key = (x: number, y: number) => `${Math.round(x * 100)},${Math.round(y * 100)}`;
    const map = new Map<string, { idx: number; end: 0 | 1 }[]>();
    const add = (k: string, v: { idx: number; end: 0 | 1 }) => {
        const a = map.get(k);
        if (a) a.push(v);
        else map.set(k, [v]);
    };
    segs.forEach((s, idx) => {
        add(key(s[0], s[1]), { idx, end: 0 });
        add(key(s[2], s[3]), { idx, end: 1 });
    });

    const used = new Array(segs.length).fill(false);
    const polys: Pt[][] = [];

    const extend = (pts: Pt[], forward: boolean) => {
        for (;;) {
            const tail = forward ? pts[pts.length - 1] : pts[0];
            const cands = map.get(key(tail[0], tail[1]));
            let next: { idx: number; end: 0 | 1 } | null = null;
            if (cands) {
                for (const c of cands) {
                    if (!used[c.idx]) {
                        next = c;
                        break;
                    }
                }
            }
            if (!next) break;
            used[next.idx] = true;
            const s = segs[next.idx];
            const other: Pt = next.end === 0 ? [s[2], s[3]] : [s[0], s[1]];
            if (forward) pts.push(other);
            else pts.unshift(other);
        }
    };

    for (let i = 0; i < segs.length; i++) {
        if (used[i]) continue;
        used[i] = true;
        const s = segs[i];
        const pts: Pt[] = [
            [s[0], s[1]],
            [s[2], s[3]],
        ];
        extend(pts, true);
        extend(pts, false);
        polys.push(pts);
    }
    return polys;
}

// One iteration of Chaikin corner-cutting. Closed loops are cut all the way
// round; open paths keep their two endpoints fixed.
function chaikin(pts: Pt[], closed: boolean): Pt[] {
    if (pts.length < 3) return pts;
    const n = pts.length;
    const out: Pt[] = [];
    if (!closed) out.push(pts[0]);
    const last = closed ? n : n - 1;
    for (let i = 0; i < last; i++) {
        const p = pts[i];
        const q = pts[(i + 1) % n];
        out.push([p[0] * 0.75 + q[0] * 0.25, p[1] * 0.75 + q[1] * 0.25]);
        out.push([p[0] * 0.25 + q[0] * 0.75, p[1] * 0.25 + q[1] * 0.75]);
    }
    if (!closed) out.push(pts[n - 1]);
    return out;
}

function render(input: StrategyInput, params: Record<string, number>): string {
    const { width: W, height: H, sample } = input;

    const levels = Math.max(1, Math.round(params.levels ?? 10));
    const res = Math.max(1, Math.round(params.grid ?? 2));
    const smoothIters = Math.max(0, Math.round(params.smooth ?? 2));
    const lineWidth = params.lineWidth ?? 0.7;
    const contrast = params.contrast ?? 1;
    const invert = (params.invert ?? 0) > 0.5;

    // Elevation in 0..1 (larger = higher ground). Contrast steepens the terrain
    // around mid-grey; invert turns the landscape inside-out.
    const heightAt = (x: number, y: number): number => {
        let l = sample(x, y);
        l = clamp01(0.5 + (l - 0.5) * contrast);
        return invert ? 1 - l : l;
    };

    // Sample the terrain once onto a coarse (gw+1)×(gh+1) lattice; every
    // elevation slice marches over the same cached grid.
    const gw = Math.max(1, Math.floor(W / res));
    const gh = Math.max(1, Math.floor(H / res));
    const stride = gw + 1;
    const grid = new Float32Array(stride * (gh + 1));
    for (let j = 0; j <= gh; j++) {
        for (let i = 0; i <= gw; i++) {
            grid[j * stride + i] = heightAt(i * res, j * res);
        }
    }

    const stroke = invert ? "#ffffff" : "#111111";
    const bg = invert ? "#111111" : "#ffffff";

    const paths: string[] = [];

    for (let k = 0; k < levels; k++) {
        const iso = (k + 1) / (levels + 1);
        const segs: Seg[] = [];

        for (let j = 0; j < gh; j++) {
            for (let i = 0; i < gw; i++) {
                const tl = grid[j * stride + i];
                const tr = grid[j * stride + i + 1];
                const br = grid[(j + 1) * stride + i + 1];
                const bl = grid[(j + 1) * stride + i];

                const ci = (tl > iso ? 8 : 0) | (tr > iso ? 4 : 0) | (br > iso ? 2 : 0) | (bl > iso ? 1 : 0);
                if (ci === 0 || ci === 15) continue;

                const ix = i * res;
                const iy = j * res;
                const ix1 = ix + res;
                const iy1 = iy + res;

                // Interpolated crossing point on each cell edge:
                //   a = top, b = right, c = bottom, d = left.
                const edge = (e: "a" | "b" | "c" | "d"): Pt => {
                    switch (e) {
                        case "a": {
                            const t = (iso - tl) / (tr - tl || 1e-6);
                            return [ix + t * res, iy];
                        }
                        case "b": {
                            const t = (iso - tr) / (br - tr || 1e-6);
                            return [ix1, iy + t * res];
                        }
                        case "c": {
                            const t = (iso - br) / (bl - br || 1e-6);
                            return [ix1 - t * res, iy1];
                        }
                        default: {
                            const t = (iso - bl) / (tl - bl || 1e-6);
                            return [ix, iy1 - t * res];
                        }
                    }
                };
                const seg = (e1: "a" | "b" | "c" | "d", e2: "a" | "b" | "c" | "d") => {
                    const p = edge(e1);
                    const q = edge(e2);
                    segs.push([p[0], p[1], q[0], q[1]]);
                };

                switch (ci) {
                    case 1: seg("d", "c"); break;
                    case 2: seg("c", "b"); break;
                    case 3: seg("d", "b"); break;
                    case 4: seg("a", "b"); break;
                    case 6: seg("a", "c"); break;
                    case 7: seg("a", "d"); break;
                    case 8: seg("a", "d"); break;
                    case 9: seg("a", "c"); break;
                    case 11: seg("a", "b"); break;
                    case 12: seg("d", "b"); break;
                    case 13: seg("c", "b"); break;
                    case 14: seg("d", "c"); break;
                    case 5: {
                        // saddle: resolve with the cell-centre average.
                        if ((tl + tr + br + bl) / 4 > iso) {
                            seg("a", "d");
                            seg("c", "b");
                        } else {
                            seg("a", "b");
                            seg("c", "d");
                        }
                        break;
                    }
                    case 10: {
                        if ((tl + tr + br + bl) / 4 > iso) {
                            seg("a", "b");
                            seg("c", "d");
                        } else {
                            seg("a", "d");
                            seg("c", "b");
                        }
                        break;
                    }
                }
            }
        }

        for (const poly of stitch(segs)) {
            let pts = poly;
            const closed =
                pts.length > 2 &&
                Math.abs(pts[0][0] - pts[pts.length - 1][0]) < res * 0.5 &&
                Math.abs(pts[0][1] - pts[pts.length - 1][1]) < res * 0.5;
            for (let s = 0; s < smoothIters; s++) pts = chaikin(pts, closed);
            if (pts.length < 2) continue;
            const d = pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
            paths.push(`<polyline points="${d}"/>`);
        }
    }

    return (
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">` +
        `<rect width="${W}" height="${H}" fill="${bg}"/>` +
        `<g stroke="${stroke}" stroke-width="${lineWidth}" stroke-linecap="round" stroke-linejoin="round" fill="none">` +
        paths.join("") +
        `</g></svg>`
    );
}

export const isolinesStrategy: Strategy = {
    id: "isolines",
    label: "Topographic / Isolines",
    controls: CONTROLS,
    render,
};
