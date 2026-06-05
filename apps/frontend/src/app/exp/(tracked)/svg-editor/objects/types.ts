// Object model owned by the SVG editor, also consumed by the single-purpose SVG
// routes.
//
// An "object producer" turns kind-specific source params into a `RenderedObject`:
// the inner SVG content in its own local px space [0,0]→[width,height], WITHOUT
// any paper wrapper. The image-to-svg / text-to-svg routes wrap one producer's
// output into a working SVG and reuse `applyLayout`; the editor places many
// producer outputs onto one document, each with its own transform.

import type { ControlDef } from "./image/strategies/types";
import type { FontMode } from "../lib/fonts";

export type { ControlDef };

export type EditorObjectKind = "text" | "image";

/** Producer output: inner markup + intrinsic size in local px space. */
export interface RenderedObject {
    /** Inner SVG fragment (no `<svg>` wrapper), drawn within [0,0]→[width,height]. */
    markup: string;
    width: number;
    height: number;
    /** Optional own background fill painted behind the markup; `null` ⇒ transparent. */
    background: string | null;
}

/** Placement of an object on the document. Position is the top-left anchor. */
export interface ObjectTransform {
    /** Top-left x in document units. */
    x: number;
    /** Top-left y in document units. */
    y: number;
    /** Local px → document units. */
    scale: number;
    /** Rotation in degrees, about the object's centre. */
    rotation: number;
}

export interface TextSource {
    kind: "text";
    text: string;
    fontId: string;
    /** "auto" resolves to the font's natural mode at render time. */
    mode: FontMode | "auto";
    /** Letter spacing as a fraction of the font size. */
    letterSpacing: number;
    /** Stroke width as a fraction of the font size (stroke mode only). */
    strokeWidth: number;
    /** Ink colour. */
    color: string;
}

export interface ImageSource {
    kind: "image";
    strategyId: string;
    params: Record<string, number>;
}

export type ObjectSource = TextSource | ImageSource;

/** An object placed on the document, with its last rendered output cached. */
export interface PlacedObject {
    id: string;
    source: ObjectSource;
    transform: ObjectTransform;
    /** Cached producer output; `null` until first render resolves. */
    rendered: RenderedObject | null;
    /** Stacking order; higher draws on top. */
    z: number;
}

export interface EditorDocument {
    paperId: string;
    landscape: boolean;
    /** Page background fill. */
    background: string;
    objects: PlacedObject[];
}
