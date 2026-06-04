'use client';
import { useState } from "react";

interface AdjustableSliderProps {
    label: string;
    value: number;
    min: number;        // initial lower bound (editable)
    max: number;        // initial upper bound (editable)
    step: number;
    format?: (value: number) => string;
    onChange: (v: number) => void;
}

// Like Slider, but the track's min/max bounds can be retyped at runtime so the
// value can be pushed past the preset range. Changing a bound clamps the
// current value back into range.
export default function AdjustableSlider({
    label, value, min, max, step, format, onChange,
}: AdjustableSliderProps) {
    const [lo, setLo] = useState(min);
    const [hi, setHi] = useState(max);

    function commitLo(raw: string) {
        const v = parseFloat(raw);
        if (Number.isNaN(v)) return;
        setLo(v);
        if (value < v) onChange(v);
    }

    function commitHi(raw: string) {
        const v = parseFloat(raw);
        if (Number.isNaN(v)) return;
        setHi(v);
        if (value > v) onChange(v);
    }

    return (
        <label className="mb-2 block">
            <div className="mb-0.5 flex items-center justify-between text-[11px] text-white/60">
                <span>{label}</span>
                <span className="tabular-nums text-white/80">
                    {format ? format(value) : value.toFixed(2)}
                </span>
            </div>
            <input
                type="range"
                min={lo}
                max={hi}
                step={step}
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                className="w-full accent-fuchsia-500"
            />
            <div className="mt-0.5 flex items-center justify-between gap-2">
                <input
                    type="number"
                    value={lo}
                    step={step}
                    onChange={(e) => commitLo(e.target.value)}
                    title="lower bound"
                    className="w-16 rounded bg-white/5 px-1 py-0.5 text-[10px] tabular-nums text-white/50 focus:text-white/80 focus:bg-white/10 focus:outline-none"
                />
                <input
                    type="number"
                    value={hi}
                    step={step}
                    onChange={(e) => commitHi(e.target.value)}
                    title="upper bound"
                    className="w-16 rounded bg-white/5 px-1 py-0.5 text-right text-[10px] tabular-nums text-white/50 focus:text-white/80 focus:bg-white/10 focus:outline-none"
                />
            </div>
        </label>
    );
}
