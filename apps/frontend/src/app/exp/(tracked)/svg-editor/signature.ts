// Signature mark for the SVG editor / SVG output. Emits a small SVG fragment (not
// a React component) so the signature is baked into the downloaded / plotted SVG.
// Anchored to a point on the sheet and rendered fixed — it rides the paper, not
// the artwork, so it never scales or clips with zoom.
//
// When a loaded `TextFont` is supplied the wordmark is emitted as real vector
// paths (plotter-friendly, and matching the editor's text objects); otherwise it
// falls back to an SVG <text> element so the mark still shows before the font
// finishes loading.

import { round, type FontMode, type TextFont } from "./lib/svgTextPath";

export interface SignatureOptions {
    /** Bottom-right anchor on the sheet, in sheet units. */
    x: number;
    y: number;
    /** Font size in sheet units. */
    size: number;
    /** Stroke / fill colour, chosen to contrast the paper. */
    color: string;
    /** Wordmark text. */
    label?: string;
    /** Loaded font; when present the wordmark is drawn as vector paths. */
    font?: TextFont;
    /** Render mode for the vector path (defaults to "fill"). */
    mode?: FontMode;
}

const OPACITY = 0.85;

/**
 * Right-anchored wordmark with a thin underline rule, baseline near `y`. Returns
 * a standalone `<g>` ready to drop into the output SVG. With a `font` the glyphs
 * are positioned vector paths; without one it falls back to `<text>`.
 */
export function signatureSvg(opts: SignatureOptions): string {
    const { x, y, size, color, font } = opts;
    const label = opts.label ?? "strps";
    const mode: FontMode = opts.mode ?? "fill";

    let wordmark: string;
    let ruleW: number;
    if (font) {
        const r = font.renderText({
            text: label,
            x,
            y,
            fontSize: size,
            anchor: "end",
            mode,
            color,
            opacity: OPACITY,
        });
        wordmark = r.markup;
        ruleW = r.width;
    } else {
        wordmark =
            `<text x="${round(x)}" y="${round(y)}" font-size="${round(size)}" ` +
            `fill="${color}" stroke="none" opacity="${OPACITY}" ` +
            `font-family="Georgia, 'Times New Roman', serif" font-style="italic" ` +
            `text-anchor="end">${label}</text>`;
        ruleW = size * label.length * 0.62;
    }

    const ruleY = round(y + size * 0.28);
    const rule =
        `<rect x="${round(x - ruleW)}" y="${ruleY}" width="${round(ruleW)}" ` +
        `height="${round(size * 0.05)}" fill="${color}" stroke="none" opacity="${OPACITY}"/>`;

    return `<g>${wordmark}${rule}</g>`;
}
