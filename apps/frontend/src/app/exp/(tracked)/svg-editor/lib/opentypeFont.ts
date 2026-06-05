// opentype.js TTF/OTF → `TextFont`.
//
// For ordinary outline fonts the user drops into public/fonts/. Glyphs are laid out
// one at a time (so letter spacing works) into a single flat <path>, already in
// user space — no wrapping transform needed.

import { type Font } from "opentype.js";
import {
    type TextFont,
    type RenderTextOptions,
    type RenderedText,
    anchorOrigin,
    defaultStroke,
    round,
} from "./svgTextPath";

function renderText(font: Font, o: RenderTextOptions): RenderedText {
    const decimals = o.decimals ?? 3;
    const ls = o.letterSpacing ?? 0;
    const scale = o.fontSize / font.unitsPerEm;
    const glyphs = font.stringToGlyphs(o.text);

    let total = 0;
    glyphs.forEach((g, i) => {
        total += (g.advanceWidth ?? 0) * scale;
        if (i < glyphs.length - 1) total += ls;
    });
    const width = total;

    let pen = anchorOrigin(o.x, width, o.anchor);
    const parts: string[] = [];
    glyphs.forEach((g, i) => {
        const d = g.getPath(pen, o.y, o.fontSize).toPathData(decimals);
        if (d) parts.push(d);
        pen += (g.advanceWidth ?? 0) * scale;
        if (i < glyphs.length - 1) pen += ls;
    });
    if (parts.length === 0) return { markup: "", width };

    const d = parts.join(" ");
    const sw = o.strokeWidth ?? defaultStroke(o.fontSize);
    const style =
        o.mode === "stroke"
            ? `fill="none" stroke="${o.color}" stroke-width="${round(sw)}" stroke-linecap="round" stroke-linejoin="round"`
            : `fill="${o.color}" stroke="none"`;
    const op = o.opacity != null ? ` opacity="${o.opacity}"` : "";

    return { markup: `<path d="${d}" ${style}${op}/>`, width };
}

/** Adapt a parsed opentype font to the `TextFont` interface. */
export function wrapOpentypeFont(font: Font): TextFont {
    return {
        unitsPerEm: font.unitsPerEm,
        ascender: font.ascender,
        descender: font.descender,
        advanceWidth: (text, fontSize) => font.getAdvanceWidth(text, fontSize),
        renderText: (o) => renderText(font, o),
    };
}
