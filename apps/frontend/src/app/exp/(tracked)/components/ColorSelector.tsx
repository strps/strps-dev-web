'use client';

interface ColorSelectorProps {
    label: string;
    /** Current colour as a `#rrggbb` hex string. */
    value: string;
    onChange: (v: string) => void;
}

// Normalises arbitrary input to a valid `#rrggbb` hex string, or null if it
// can't be made into one. Accepts 3- or 6-digit hex, with or without the hash.
function normaliseHex(raw: string): string | null {
    let h = raw.trim().replace(/^#/, "").toLowerCase();
    if (/^[0-9a-f]{3}$/.test(h)) {
        h = h.split("").map((c) => c + c).join("");
    }
    if (/^[0-9a-f]{6}$/.test(h)) return `#${h}`;
    return null;
}

// Labelled colour picker with a live hex readout that can also be retyped.
// Mirrors the Slider components: native control on the left, editable value on
// the right.
export default function ColorSelector({ label, value, onChange }: ColorSelectorProps) {
    function commitText(raw: string) {
        const hex = normaliseHex(raw);
        if (hex) onChange(hex);
    }

    return (
        <label className="mb-2 block">
            <div className="mb-0.5 flex items-center justify-between text-[11px] text-white/60">
                <span>{label}</span>
                <span className="tabular-nums uppercase text-white/80">{value}</span>
            </div>
            <div className="flex items-center gap-2">
                <input
                    type="color"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    title={label}
                    className="h-7 w-9 shrink-0 cursor-pointer rounded border border-white/10 bg-transparent p-0"
                />
                <input
                    type="text"
                    defaultValue={value}
                    key={value}
                    onBlur={(e) => commitText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") (e.target as HTMLInputElement).blur();
                    }}
                    spellCheck={false}
                    title="hex value"
                    className="w-full rounded bg-white/5 px-1.5 py-0.5 text-[11px] tabular-nums lowercase text-white/50 focus:bg-white/10 focus:text-white/80 focus:outline-none"
                />
            </div>
        </label>
    );
}
