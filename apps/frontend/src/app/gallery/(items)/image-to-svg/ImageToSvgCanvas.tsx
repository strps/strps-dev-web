"use client";

import { useEffect, useMemo, useState } from "react";
import { getStrategy, type StrategyInput } from "./strategies";

// Cap the working resolution so line generation stays responsive and the
// emitted SVG keeps a sane segment count, even for huge uploads.
const MAX_EDGE = 700;

export interface ImageToSvgCanvasProps {
    image: HTMLImageElement | null;
    strategyId: string;
    params: Record<string, number>;
    onSvgChange?: (svg: string) => void;
    className?: string;
}

/** Downscale the image and build a framework-free tone buffer + bilinear sampler. */
function prepareInput(image: HTMLImageElement): StrategyInput | null {
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

export function ImageToSvgCanvas({
    image,
    strategyId,
    params,
    onSvgChange,
    className,
}: ImageToSvgCanvasProps) {
    // Tone buffer is rebuilt only when the source image changes.
    const input = useMemo(() => (image ? prepareInput(image) : null), [image]);
    const [svg, setSvg] = useState<string>("");

    // Regenerate the SVG on input/strategy/param changes, debounced so dragging
    // a slider doesn't recompute on every intermediate value.
    useEffect(() => {
        const handle = window.setTimeout(() => {
            if (!input) {
                setSvg("");
                onSvgChange?.("");
                return;
            }
            const out = getStrategy(strategyId).render(input, params);
            setSvg(out);
            onSvgChange?.(out);
        }, input ? 120 : 0);
        return () => window.clearTimeout(handle);
    }, [input, strategyId, params, onSvgChange]);

    if (!svg) {
        return (
            <div
                className={className}
                style={{
                    background:
                        "radial-gradient(circle at 30% 30%, rgba(120,120,140,0.25), rgba(10,10,16,1) 75%)",
                }}
            />
        );
    }

    return (
        <div
            className={`${className ?? ""} flex items-center justify-center [&>svg]:h-auto [&>svg]:w-auto [&>svg]:max-h-full [&>svg]:max-w-full [&>svg]:rounded-lg [&>svg]:shadow-2xl`}
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    );
}

export default ImageToSvgCanvas;
