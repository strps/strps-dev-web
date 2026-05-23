"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface VerticalSliderProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    label?: string;
    showValue?: boolean;
    formatValue?: (value: number) => string;
    className?: string;
    trackClassName?: string;
    thumbClassName?: string;
    fillClassName?: string;
    "aria-label"?: string;
}

function clamp(n: number, min: number, max: number) {
    return Math.min(max, Math.max(min, n));
}

function quantize(n: number, step: number, min: number) {
    if (step <= 0) return n;
    return min + Math.round((n - min) / step) * step;
}

export function VerticalSlider({
    value,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    label,
    showValue = true,
    formatValue,
    className,
    trackClassName,
    thumbClassName,
    fillClassName,
    "aria-label": ariaLabel,
}: VerticalSliderProps) {
    const trackRef = React.useRef<HTMLDivElement>(null);
    const [dragging, setDragging] = React.useState(false);

    const pct = ((clamp(value, min, max) - min) / (max - min)) * 100;

    const updateFromPointer = React.useCallback(
        (clientY: number) => {
            const el = trackRef.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const ratio = clamp(1 - (clientY - rect.top) / rect.height, 0, 1);
            const raw = min + ratio * (max - min);
            const stepped = quantize(raw, step, min);
            onChange(clamp(stepped, min, max));
        },
        [min, max, step, onChange],
    );

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        setDragging(true);
        updateFromPointer(e.clientY);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!dragging) return;
        updateFromPointer(e.clientY);
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
        setDragging(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const big = Math.max(step, (max - min) / 10);
        let next = value;
        switch (e.key) {
            case "ArrowUp":
            case "ArrowRight":
                next = value + step;
                break;
            case "ArrowDown":
            case "ArrowLeft":
                next = value - step;
                break;
            case "PageUp":
                next = value + big;
                break;
            case "PageDown":
                next = value - big;
                break;
            case "Home":
                next = min;
                break;
            case "End":
                next = max;
                break;
            default:
                return;
        }
        e.preventDefault();
        onChange(clamp(quantize(next, step, min), min, max));
    };

    const display = formatValue ? formatValue(value) : String(value);

    return (
        <div
            className={cn(
                "flex flex-col items-center gap-2 select-none",
                className,
            )}
        >
            {label && (
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {label}
                </span>
            )}

            <div
                ref={trackRef}
                role="slider"
                tabIndex={0}
                aria-label={ariaLabel ?? label}
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={value}
                aria-orientation="vertical"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onKeyDown={handleKeyDown}
                className={cn(
                    "relative h-32 w-2 rounded-full bg-muted touch-none cursor-pointer outline-none",
                    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    trackClassName,
                )}
            >
                <div
                    className={cn(
                        "absolute bottom-0 left-0 right-0 rounded-full bg-primary",
                        fillClassName,
                    )}
                    style={{ height: `${pct}%` }}
                />
                <div
                    className={cn(
                        "absolute left-1/2 h-4 w-4 -translate-x-1/2 translate-y-1/2 rounded-full border-2 border-primary bg-background shadow-sm transition-transform",
                        dragging && "scale-110",
                        thumbClassName,
                    )}
                    style={{ bottom: `${pct}%` }}
                />
            </div>

            {showValue && (
                <span className="text-xs font-medium tabular-nums">
                    {display}
                </span>
            )}
        </div>
    );
}

export default VerticalSlider;
