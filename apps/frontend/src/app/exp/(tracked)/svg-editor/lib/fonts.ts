// Registry of bundled fonts available to the text→SVG-path experiments.
//
// `mode` is the font's natural rendering style:
//   - "stroke": single-line / single-stroke fonts whose glyphs are open centerline
//     paths. Drawn with a stroke and no fill — one pen pass per stroke, ideal for
//     pen plotters / CNC engraving.
//   - "fill": ordinary outline fonts whose glyphs are closed contours. Drawn filled.
//
// Font files live in `public/fonts/` and are fetched by URL at runtime. The bundled
// faces are public-domain single-line SVG fonts (EMS by Evil Mad Scientist, and the
// Hershey set) from https://gitlab.com/oskay/svg-fonts — their `.svg` glyphs are
// open centerlines, so they're "stroke" mode. To add an ordinary outline font for
// fill mode, drop a `.ttf`/`.otf` into public/fonts/ and add an entry with
// `mode: "fill"` (opentype.js parses it).

export type FontMode = "stroke" | "fill";

export interface FontDef {
    /** Stable id used by selects / params. */
    id: string;
    label: string;
    /** Public URL of the font file (served from `public/`). */
    url: string;
    /** The font's natural rendering style. */
    mode: FontMode;
}

export const FONTS: FontDef[] = [
    { id: "ems-allure", label: "EMS Allure (script, 1-line)", url: "/fonts/EMSAllure.svg", mode: "stroke" },
    { id: "ems-readability", label: "EMS Readability (sans, 1-line)", url: "/fonts/EMSReadability.svg", mode: "stroke" },
    { id: "ems-nixish", label: "EMS Nixish (sans, 1-line)", url: "/fonts/EMSNixish.svg", mode: "stroke" },
    { id: "hershey-sans", label: "Hershey Sans (1-line)", url: "/fonts/HersheySans1.svg", mode: "stroke" },
    { id: "hershey-script", label: "Hershey Script (1-line)", url: "/fonts/HersheyScript1.svg", mode: "stroke" },
    { id: "hershey-serif", label: "Hershey Serif (1-line)", url: "/fonts/HersheySerifMed.svg", mode: "stroke" },
];

/** Font used for the corner signature on plotter output. */
export const SIGNATURE_FONT_ID = "ems-allure";

export function getFont(id: string): FontDef {
    return FONTS.find((f) => f.id === id) ?? FONTS[0];
}

export function getSignatureFont(): FontDef {
    return getFont(SIGNATURE_FONT_ID);
}
