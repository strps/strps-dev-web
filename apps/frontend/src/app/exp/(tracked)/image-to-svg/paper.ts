// Output layout: places a strategy's SVG onto a chosen paper size at a chosen
// zoom. Strategies render in working-image space (`viewBox="0 0 W H"`, px);
// this is a pure post-process that re-wraps that document so the final SVG has
// real paper dimensions for pen-plotting / CNC, with the artwork fitted into a
// margin, scaled by an overall zoom, and signed in the corner.

import { signatureSvg } from "./signature";

// Fraction of the sheet's short edge kept clear as a margin around the artwork.
const MARGIN_FRACTION = 0.06;

export interface PaperSize {
    id: string;
    label: string;
    /** Portrait dimensions in mm. `null` ⇒ keep the image's own px bounds. */
    w: number | null;
    h: number | null;
}

// Portrait dimensions; orientation is chosen automatically to match the image.
export const PAPER_SIZES: PaperSize[] = [
    { id: "fit", label: "Fit image", w: null, h: null },
    { id: "a5", label: "A5", w: 148, h: 210 },
    { id: "a4", label: "A4", w: 210, h: 297 },
    { id: "a3", label: "A3", w: 297, h: 420 },
    { id: "letter", label: "Letter", w: 215.9, h: 279.4 },
    { id: "legal", label: "Legal", w: 215.9, h: 355.6 },
];

export function getPaper(id: string): PaperSize {
    return PAPER_SIZES.find((p) => p.id === id) ?? PAPER_SIZES[0];
}

const round = (n: number) => Math.round(n * 1000) / 1000;

/** A dark mark on light paper, a light mark on dark paper. */
function contrastColor(bg: string): string {
    const hex = bg.replace("#", "");
    const full = hex.length === 3 ? hex.split("").map((c) => c + c).join("") : hex;
    const r = parseInt(full.slice(0, 2), 16);
    const g = parseInt(full.slice(2, 4), 16);
    const b = parseInt(full.slice(4, 6), 16);
    const luma = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    return luma > 0.5 ? "#222222" : "#eeeeee";
}

/**
 * Re-wrap a strategy SVG onto `paperId` at an overall `zoom`. The artwork (its
 * own background + marks) is fitted into a margin and scaled as a single unit:
 * zoom 1 fills the margin box, zoom < 1 shrinks the whole graphic on the sheet,
 * zoom > 1 enlarges it and is clipped at the margin. A signature is stamped in
 * the bottom-right margin, riding the paper (never scaled or clipped). Returns
 * the input untouched if it doesn't look like a strategy SVG.
 */
export function applyLayout(svg: string, paperId: string, zoom: number): string {
    const vb = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
    if (!vb) return svg;
    const W = parseFloat(vb[1]);
    const H = parseFloat(vb[2]);
    if (!W || !H) return svg;

    // Strip the strategy's <svg> wrapper, keeping its inner content (background
    // rect + grouped marks). Reuse its background fill for the page.
    const inner = svg.replace(/^<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
    const bg = inner.match(/fill="(#[0-9a-fA-F]+)"/)?.[1] ?? "#ffffff";

    const paper = getPaper(paperId);
    const z = zoom > 0 ? zoom : 1;

    // Sheet dimensions + units. "Fit" keeps the image's px bounds; named sizes
    // use mm, auto-oriented to match the artwork's aspect ratio.
    let pw: number;
    let ph: number;
    let unit: string;
    if (paper.w == null || paper.h == null) {
        pw = W;
        ph = H;
        unit = "";
    } else {
        const landscape = W > H;
        pw = landscape ? Math.max(paper.w, paper.h) : Math.min(paper.w, paper.h);
        ph = landscape ? Math.min(paper.w, paper.h) : Math.max(paper.w, paper.h);
        unit = "mm";
    }

    // Content box: the sheet inset by a uniform margin. The artwork fits this
    // box at zoom 1; the overall zoom scales the whole block about its centre.
    const margin = Math.min(pw, ph) * MARGIN_FRACTION;
    const cw = pw - 2 * margin;
    const ch = ph - 2 * margin;
    const fit = Math.min(cw / W, ch / H);
    const s = fit * z;
    const tx = margin + (cw - W * s) / 2;
    const ty = margin + (ch - H * s) / 2;

    const clipId = "content-clip";
    const sig = signatureSvg({
        x: pw - margin,
        y: ph - margin,
        size: Math.min(pw, ph) * 0.035,
        color: contrastColor(bg),
    });

    return (
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${round(pw)} ${round(ph)}" ` +
        `width="${round(pw)}${unit}" height="${round(ph)}${unit}">` +
        `<clipPath id="${clipId}">` +
        `<rect x="${round(margin)}" y="${round(margin)}" width="${round(cw)}" height="${round(ch)}"/>` +
        `</clipPath>` +
        `<rect width="${round(pw)}" height="${round(ph)}" fill="${bg}"/>` +
        `<g clip-path="url(#${clipId})">` +
        `<g transform="translate(${round(tx)} ${round(ty)}) scale(${round(s)})">` +
        inner +
        `</g></g>` +
        sig +
        `</svg>`
    );
}
