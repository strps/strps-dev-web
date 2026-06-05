// Font cache for the text→SVG-path experiments.
//
// Loading is async (fetch → parse), but parts of the render pipeline are
// synchronous (e.g. `paper.ts` → `signatureSvg`). So we expose both:
//   - `loadFont(url)`     : memoized promise; fetches + parses once.
//   - `getLoadedFont(url)` : returns the parsed font only if already resolved, else
//     null — lets sync code draw vector paths when ready and fall back otherwise.
//
// The adapter is chosen by extension: `.svg` → SVG-font parser (single-line faces),
// anything else → opentype.js (TTF/OTF). Both yield a `TextFont`.

import { parse as parseOpentype } from "opentype.js";
import { type TextFont } from "./svgTextPath";
import { parseSvgFont } from "./svgFont";
import { wrapOpentypeFont } from "./opentypeFont";

const pending = new Map<string, Promise<TextFont>>();
const resolved = new Map<string, TextFont>();

function isSvgFont(url: string): boolean {
    return /\.svg(\?|#|$)/i.test(url);
}

async function fetchFont(url: string): Promise<TextFont> {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`font fetch failed: ${url} (${res.status})`);
    if (isSvgFont(url)) {
        return parseSvgFont(await res.text());
    }
    return wrapOpentypeFont(parseOpentype(await res.arrayBuffer()));
}

/** Fetch + parse a font once, caching the promise. Resolves with the parsed font. */
export function loadFont(url: string): Promise<TextFont> {
    const existing = pending.get(url);
    if (existing) return existing;

    const p = fetchFont(url)
        .then((font) => {
            resolved.set(url, font);
            return font;
        })
        .catch((err) => {
            // Drop the rejected promise so a later call can retry.
            pending.delete(url);
            throw err;
        });

    pending.set(url, p);
    return p;
}

/** The parsed font if `loadFont(url)` has already resolved, otherwise null. */
export function getLoadedFont(url: string): TextFont | null {
    return resolved.get(url) ?? null;
}
