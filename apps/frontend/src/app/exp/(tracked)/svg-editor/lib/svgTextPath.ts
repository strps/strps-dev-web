// Text → SVG <path> geometry for pen-plotter / CNC output.
//
// Plotters and CNC machines can't render an SVG <text> element — they only follow
// vector paths. A `TextFont` turns a string into real, positioned path markup.
//
// Two font sources implement `TextFont` (see `fontLoader.ts`):
//   - SVG fonts (`svgFont.ts`): single-line / single-stroke faces (EMS, Hershey).
//     Their glyphs are open centerline paths — one pen pass per stroke.
//   - opentype TTF/OTF (`opentypeFont.ts`): ordinary outline fonts.
//
// Two render modes:
//   - "stroke": draw the path with a stroke and no fill (single-line faces).
//   - "fill": fill the closed contours (outline faces).
//
// Framework-free: given a parsed `TextFont`, callers get back SVG strings.

export type FontMode = "stroke" | "fill";

export const round = (n: number) => Math.round(n * 1000) / 1000;

export interface RenderTextOptions {
    text: string;
    /** Origin x; meaning depends on `anchor`. */
    x: number;
    /** Baseline y. */
    y: number;
    fontSize: number;
    /** Horizontal alignment of the text block about `x`. Default "start". */
    anchor?: "start" | "middle" | "end";
    /** Extra tracking between glyphs, in user units. */
    letterSpacing?: number;
    mode: FontMode;
    /** Stroke (stroke mode) or fill (fill mode) colour. */
    color: string;
    /** Stroke width for "stroke" mode, in user units; defaults to ~4% of size. */
    strokeWidth?: number;
    /** Optional group opacity. */
    opacity?: number;
    /** Path-data precision for fonts that re-emit coordinates (opentype). */
    decimals?: number;
}

export interface RenderedText {
    /** Positioned, styled SVG fragment (a <g> or <path>); "" if nothing renders. */
    markup: string;
    /** Advance width of the run in user units. */
    width: number;
}

export interface TextFont {
    /** Glyph-space units per em (coordinate scale of the font). */
    readonly unitsPerEm: number;
    /** Ascender height in font units (+up). */
    readonly ascender: number;
    /** Descender depth in font units (negative). */
    readonly descender: number;
    /** Advance width of `text` at `fontSize`, in user units (no letter spacing). */
    advanceWidth(text: string, fontSize: number): number;
    /** Build positioned, styled SVG markup with the baseline at (x, y). */
    renderText(o: RenderTextOptions): RenderedText;
}

/** Left edge of a run of `width`, given the anchor about `x`. */
export function anchorOrigin(x: number, width: number, anchor?: RenderTextOptions["anchor"]): number {
    if (anchor === "middle") return x - width / 2;
    if (anchor === "end") return x - width;
    return x;
}

/** Presentation attributes for a path/group given the render mode. */
export function modeAttrs(mode: FontMode, color: string, strokeWidth: number, opacity?: number): string {
    const op = opacity != null ? ` opacity="${opacity}"` : "";
    if (mode === "stroke") {
        return (
            `fill="none" stroke="${color}" stroke-width="${round(strokeWidth)}" ` +
            `stroke-linecap="round" stroke-linejoin="round"${op}`
        );
    }
    return `fill="${color}" stroke="none"${op}`;
}

/** Default stroke width (~4% of the font size) when none is given. */
export function defaultStroke(fontSize: number): number {
    return Math.max(fontSize * 0.04, 0.1);
}
