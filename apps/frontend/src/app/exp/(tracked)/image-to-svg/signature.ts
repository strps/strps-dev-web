// Signature mark for the Image → SVG output. Emits a small SVG fragment (not a
// React component) so the signature is baked into the downloaded / plotted SVG.
// Anchored to a point on the sheet and rendered fixed — it rides the paper, not
// the artwork, so it never scales or clips with zoom.

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
}

const round = (n: number) => Math.round(n * 1000) / 1000;

/**
 * Right-anchored wordmark with a thin underline rule, baseline near `y`.
 * Returns a standalone `<g>` ready to drop into the output SVG.
 */
export function signatureSvg(opts: SignatureOptions): string {
    const { x, y, size, color } = opts;
    const label = opts.label ?? "strps";

    const ruleY = round(y + size * 0.28);
    const ruleW = round(size * label.length * 0.62);
    const ruleX = round(x - ruleW);

    return (
        `<g fill="${color}" stroke="none" opacity="0.85" ` +
        `font-family="Georgia, 'Times New Roman', serif" font-style="italic">` +
        `<text x="${round(x)}" y="${round(y)}" font-size="${round(size)}" ` +
        `text-anchor="end">${label}</text>` +
        `<rect x="${ruleX}" y="${ruleY}" width="${ruleW}" height="${round(size * 0.05)}"/>` +
        `</g>`
    );
}
