// Document compositor. Turns an `EditorDocument` (paper + placed objects) into a
// final paper-space SVG string for preview / download, and provides the inverse
// single-object helper the legacy routes use to feed `applyLayout`.

import { round } from "../lib/svgTextPath";
import { getSignatureFont } from "../lib/fonts";
import { getLoadedFont } from "../lib/fontLoader";
import { resolvePaper, contrastColor } from "../paper";
import { signatureSvg } from "../signature";
import type { EditorDocument, PlacedObject, RenderedObject } from "./types";

/**
 * Wrap a single `RenderedObject` back into the working-SVG shape that
 * `applyLayout` consumes (`<svg viewBox>[bg-rect]markup</svg>`). Pass `bg` to
 * paint a background rect; omit it when the markup already carries its own.
 */
export function wrapWorkingSvg(r: RenderedObject, bg?: string): string {
    const rect = bg ? `<rect width="${round(r.width)}" height="${round(r.height)}" fill="${bg}"/>` : "";
    return (
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${round(r.width)} ${round(r.height)}">` +
        rect +
        r.markup +
        `</svg>`
    );
}

/** A placed object as a transformed `<g>`: translate → rotate(centre) → scale. */
export function objectGroup(o: PlacedObject): string {
    const r = o.rendered;
    if (!r) return "";
    const t = o.transform;
    const hw = (r.width * t.scale) / 2;
    const hh = (r.height * t.scale) / 2;
    const bg = r.background
        ? `<rect width="${round(r.width)}" height="${round(r.height)}" fill="${r.background}"/>`
        : "";
    return (
        `<g transform="translate(${round(t.x)} ${round(t.y)}) ` +
        `rotate(${round(t.rotation)} ${round(hw)} ${round(hh)}) ` +
        `scale(${round(t.scale)})">` +
        bg +
        r.markup +
        `</g>`
    );
}

/** Compose the whole document into a standalone, downloadable SVG string. */
export function composeDocument(doc: EditorDocument): string {
    const { pw, ph, unit, margin } = resolvePaper(doc.paperId, doc.landscape);

    const body = [...doc.objects].sort((a, b) => a.z - b.z).map(objectGroup).join("");

    const sigFont = getSignatureFont();
    const sig = signatureSvg({
        x: pw - margin,
        y: ph - margin,
        size: Math.min(pw, ph) * 0.035,
        color: contrastColor(doc.background),
        font: getLoadedFont(sigFont.url) ?? undefined,
        mode: sigFont.mode,
    });

    return (
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${round(pw)} ${round(ph)}" ` +
        `width="${round(pw)}${unit}" height="${round(ph)}${unit}">` +
        `<rect width="${round(pw)}" height="${round(ph)}" fill="${doc.background}"/>` +
        body +
        sig +
        `</svg>`
    );
}
