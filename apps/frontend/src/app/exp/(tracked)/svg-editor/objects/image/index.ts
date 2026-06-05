// Image line-art object producer. Decodes an image into a framework-free tone
// buffer (`prepareImageInput`) and renders it through a pluggable strategy.
// Shared by the image-to-svg route and the SVG editor.

import { getStrategy, defaultParams, STRATEGIES, type StrategyInput } from "./strategies";
import type { ControlDef, ImageSource, RenderedObject } from "../types";

// Cap the working resolution so line generation stays responsive and the
// emitted SVG keeps a sane segment count, even for huge uploads.
const MAX_EDGE = 700;

/** Downscale the image and build a framework-free tone buffer + bilinear sampler. */
export function prepareImageInput(image: HTMLImageElement): StrategyInput | null {
    const w = image.naturalWidth;
    const h = image.naturalHeight;
    if (!w || !h) return null;

    const scale = Math.min(1, MAX_EDGE / Math.max(w, h));
    const width = Math.max(1, Math.round(w * scale));
    const height = Math.max(1, Math.round(h * scale));

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return null;
    ctx.drawImage(image, 0, 0, width, height);

    const { data } = ctx.getImageData(0, 0, width, height);
    const luma = new Float32Array(width * height);
    for (let i = 0; i < luma.length; i++) {
        const r = data[i * 4];
        const g = data[i * 4 + 1];
        const b = data[i * 4 + 2];
        // Rec. 709 luminance, normalized to 0..1.
        luma[i] = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    }

    const sample = (x: number, y: number): number => {
        // Bilinear lookup in working-image space.
        const fx = Math.min(Math.max(x, 0), width - 1);
        const fy = Math.min(Math.max(y, 0), height - 1);
        const x0 = Math.floor(fx);
        const y0 = Math.floor(fy);
        const x1 = Math.min(x0 + 1, width - 1);
        const y1 = Math.min(y0 + 1, height - 1);
        const tx = fx - x0;
        const ty = fy - y0;
        const a = luma[y0 * width + x0];
        const b = luma[y0 * width + x1];
        const c = luma[y1 * width + x0];
        const d = luma[y1 * width + x1];
        const top = a + (b - a) * tx;
        const bot = c + (d - c) * tx;
        return top + (bot - top) * ty;
    };

    return { width, height, luma, sample };
}

export function defaultImageSource(): ImageSource {
    const strategy = STRATEGIES[0];
    return { kind: "image", strategyId: strategy.id, params: defaultParams(strategy) };
}

/** The active strategy's controls, driving the editor's parameter panel. */
export function imageControls(source: ImageSource): ControlDef[] {
    return getStrategy(source.strategyId).controls;
}

/**
 * Render a prepared tone buffer through a strategy into inner markup + size.
 * The strategy emits a standalone `<svg viewBox>marks</svg>` with no background;
 * we keep its inner content so the marks sit transparently on the document.
 * Returns `null` if the strategy output isn't recognisable.
 */
export function renderImageObject(input: StrategyInput, source: ImageSource): RenderedObject | null {
    const svg = getStrategy(source.strategyId).render(input, source.params);
    const vb = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
    if (!vb) return null;
    const W = parseFloat(vb[1]);
    const H = parseFloat(vb[2]);
    if (!W || !H) return null;

    const inner = svg.replace(/^<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
    return { markup: inner, width: W, height: H, background: null };
}
