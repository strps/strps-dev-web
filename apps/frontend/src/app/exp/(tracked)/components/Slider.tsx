interface SliderProps {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    format?: (value: number) => string;
    onChange: (v: number) => void;
}

// Labelled range input with a live value readout. Pass `format` to control how
// the value is displayed (defaults to two decimal places).
export default function Slider({ label, value, min, max, step, format, onChange }: SliderProps) {
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
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                className="w-full accent-fuchsia-500"
            />
        </label>
    );
}
