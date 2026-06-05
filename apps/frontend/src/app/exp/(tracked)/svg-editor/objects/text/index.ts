// Text-path object producer. Wraps the font / svg-text-path machinery into a
// `RenderedObject`. Shared by the text-to-svg route and the SVG editor.

import { FONTS, getFont, type FontMode } from "../../lib/fonts";
import { loadFont } from "../../lib/fontLoader";
import type { ControlDef, RenderedObject, TextSource } from "../types";

// Working-space font size (px). The whole object is re-scaled when placed, so
// this is just an internal resolution. `PAD` keeps a little air around the run.
const WORK_SIZE = 100;
const PAD = WORK_SIZE * 0.25;
const INK = "#222222";

/** Slider controls for the editable, fraction-of-size text params. */
export const textControls: ControlDef[] = [
    { key: "letterSpacing", label: "Letter spacing", kind: "slider", min: -0.1, max: 0.5, step: 0.01, default: 0, format: (v) => `${(v * 100).toFixed(0)}%` },
    { key: "strokeWidth", label: "Stroke width", kind: "slider", min: 0.005, max: 0.2, step: 0.005, default: 0.045, format: (v) => `${(v * 100).toFixed(1)}%` },
];

export function defaultTextSource(): TextSource {
    return {
        kind: "text",
        text: "strps",
        fontId: FONTS[0].id,
        mode: "auto",
        letterSpacing: 0,
        strokeWidth: 0.045,
        color: INK,
    };
}

/**
 * Render a text source to inner path markup + intrinsic size. Loads the font on
 * demand (cached). Returns `null` if nothing renders (e.g. empty text).
 */
export async function renderTextObject(source: TextSource): Promise<RenderedObject | null> {
    const fontDef = getFont(source.fontId);
    const font = await loadFont(fontDef.url);
    const mode: FontMode = source.mode === "auto" ? fontDef.mode : source.mode;

    const scale = WORK_SIZE / font.unitsPerEm;
    const ascent = font.ascender * scale;
    const lineH = (font.ascender - font.descender) * scale;
    const baseline = PAD + ascent;

    const { markup, width } = font.renderText({
        text: source.text,
        x: PAD,
        y: baseline,
        fontSize: WORK_SIZE,
        letterSpacing: source.letterSpacing * WORK_SIZE,
        mode,
        color: source.color,
        strokeWidth: source.strokeWidth * WORK_SIZE,
    });
    if (!markup) return null;

    const W = Math.max(width + 2 * PAD, 1);
    const H = lineH + 2 * PAD;
    return { markup, width: W, height: H, background: null };
}
