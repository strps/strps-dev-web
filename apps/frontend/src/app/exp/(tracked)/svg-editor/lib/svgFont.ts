// Minimal SVG-font parser → `TextFont`.
//
// opentype.js can't read SVG fonts, but the single-line / single-stroke faces we
// want for plotting (EMS, Hershey from gitlab.com/oskay/svg-fonts) ship in that
// format. An SVG font is XML: a <font-face> with metrics plus <glyph> elements
// whose `d` is the glyph outline in a y-up, baseline-origin coordinate system.
//
// Rather than transform every coordinate, we place the glyphs verbatim inside a
// single `<g transform="translate(x y) scale(s -s)">` — the scale flips y-up→y-down
// and maps font units to user units. Glyphs advance with a per-glyph horizontal
// `translate`, and the stroke width is pre-divided by the scale so it renders at the
// requested user-space width.

import {
    type TextFont,
    type RenderTextOptions,
    type RenderedText,
    anchorOrigin,
    defaultStroke,
    round,
} from "./svgTextPath";

interface SvgGlyph {
    /** Advance width in font units. */
    adv: number;
    /** Glyph path data in font space (y-up); "" for blanks like space. */
    d: string;
}

function num(v: string | null | undefined, fallback: number): number {
    const n = v == null ? NaN : parseFloat(v);
    return Number.isFinite(n) ? n : fallback;
}

class SvgTextFont implements TextFont {
    constructor(
        readonly unitsPerEm: number,
        readonly ascender: number,
        readonly descender: number,
        private readonly glyphs: Map<string, SvgGlyph>,
        private readonly missing: SvgGlyph,
    ) {}

    private glyphFor(ch: string): SvgGlyph {
        return this.glyphs.get(ch) ?? this.missing;
    }

    advanceWidth(text: string, fontSize: number): number {
        const s = fontSize / this.unitsPerEm;
        let total = 0;
        for (const ch of [...text]) total += this.glyphFor(ch).adv;
        return total * s;
    }

    renderText(o: RenderTextOptions): RenderedText {
        const s = fontSize0(o.fontSize, this.unitsPerEm);
        const lsFont = s !== 0 ? (o.letterSpacing ?? 0) / s : 0;
        const chars = [...o.text];

        // Advance in font units, including inter-glyph spacing.
        let totalFont = 0;
        chars.forEach((c, i) => {
            totalFont += this.glyphFor(c).adv;
            if (i < chars.length - 1) totalFont += lsFont;
        });
        const width = totalFont * s;
        const ox = anchorOrigin(o.x, width, o.anchor);

        let pen = 0;
        const parts: string[] = [];
        chars.forEach((c, i) => {
            const g = this.glyphFor(c);
            if (g.d) {
                const tr = pen !== 0 ? ` transform="translate(${round(pen)} 0)"` : "";
                parts.push(`<path d="${g.d}"${tr}/>`);
            }
            pen += g.adv;
            if (i < chars.length - 1) pen += lsFont;
        });
        if (parts.length === 0) return { markup: "", width };

        // Stroke width is set in the scaled (font-unit) space, so divide it back out.
        const sw = (o.strokeWidth ?? defaultStroke(o.fontSize)) / s;
        const style =
            o.mode === "stroke"
                ? `fill="none" stroke="${o.color}" stroke-width="${round(sw)}" stroke-linecap="round" stroke-linejoin="round"`
                : `fill="${o.color}" stroke="none"`;
        const op = o.opacity != null ? ` opacity="${o.opacity}"` : "";

        // Round the scale to tame float noise while keeping ample precision.
        const r6 = (n: number) => Math.round(n * 1e6) / 1e6;
        const markup =
            `<g transform="translate(${round(ox)} ${round(o.y)}) scale(${r6(s)} ${r6(-s)})" ${style}${op}>` +
            parts.join("") +
            `</g>`;
        return { markup, width };
    }
}

function fontSize0(fontSize: number, unitsPerEm: number): number {
    return unitsPerEm ? fontSize / unitsPerEm : 0;
}

/** Parse an SVG-font document into a `TextFont`. Browser-only (uses DOMParser). */
export function parseSvgFont(source: string): TextFont {
    if (typeof DOMParser === "undefined") {
        throw new Error("parseSvgFont requires a DOM (DOMParser)");
    }
    const doc = new DOMParser().parseFromString(source, "image/svg+xml");
    const fontEl = doc.querySelector("font");
    const faceEl = doc.querySelector("font-face");

    const unitsPerEm = num(faceEl?.getAttribute("units-per-em"), 1000);
    const ascender = num(faceEl?.getAttribute("ascent"), unitsPerEm * 0.8);
    const descender = num(faceEl?.getAttribute("descent"), -unitsPerEm * 0.2);
    const defaultAdv = num(fontEl?.getAttribute("horiz-adv-x"), unitsPerEm);

    const glyphs = new Map<string, SvgGlyph>();
    doc.querySelectorAll("glyph").forEach((g) => {
        const u = g.getAttribute("unicode");
        // Single-codepoint glyphs only (skip ligatures / multi-char entries).
        if (u == null || [...u].length !== 1) return;
        glyphs.set(u, {
            adv: num(g.getAttribute("horiz-adv-x"), defaultAdv),
            d: g.getAttribute("d") ?? "",
        });
    });

    const missingEl = doc.querySelector("missing-glyph");
    const missing: SvgGlyph = {
        adv: num(missingEl?.getAttribute("horiz-adv-x"), defaultAdv),
        d: missingEl?.getAttribute("d") ?? "",
    };

    return new SvgTextFont(unitsPerEm, ascender, descender, glyphs, missing);
}
