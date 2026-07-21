'use client';
// import IcoReactionDiffusionCanvas from "@/app/gallery/(items)/reaction-sphere/IcoReactionDiffusionCanvasN";
import ControlPanel from "@/app/exp/(tracked)/components/ControlPanel";
import AdjustableSlider from "@/app/exp/(tracked)/components/AdjustableSlider";
import { useState } from "react";
import IcoReactionDiffusionCanvas from "@/app/(website)/lab/(items)/reaction-sphere/IcoReactionDiffusionCanvas";


interface Preset {
    name: string;
    feed: number;
    kill: number;
}

// Classic feed/kill pairs from the Gray-Scott literature.
const PRESETS: Preset[] = [
    { name: "corals", feed: 0.0545, kill: 0.062 },
    { name: "mitosis", feed: 0.0367, kill: 0.0649 },
    { name: "spots", feed: 0.018, kill: 0.051 },
    { name: "maze", feed: 0.029, kill: 0.057 },
    { name: "worms", feed: 0.078, kill: 0.061 },
];


export default function Page() {

    const [feed, setFeed] = useState(PRESETS[0].feed);
    const [kill, setKill] = useState(PRESETS[0].kill);
    const [dA, setDA] = useState(1.0);
    const [dB, setDB] = useState(0.5);
    const [activePreset, setActivePreset] = useState(PRESETS[0].name);
    const [seedKey, setSeedKey] = useState(0);

    function applyPreset(preset: Preset) {
        setFeed(preset.feed);
        setKill(preset.kill);
        setActivePreset(preset.name);
        setSeedKey((k) => k + 1);
    }

    return (
        <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
            <IcoReactionDiffusionCanvas
                className="w-full"
                seedKey={seedKey}
                dA={dA}
                dB={dB}
                feed={feed}
                kill={kill}

            />

            <ControlPanel title="Reaction Sphere" defaultOpen={false}>
                <div className="mb-4 flex flex-wrap gap-1.5">
                    {PRESETS.map((preset) => (
                        <button
                            key={preset.name}
                            onClick={() => applyPreset(preset)}
                            className={`rounded-md px-2 py-1 text-xs transition-colors ${activePreset === preset.name
                                ? "bg-fuchsia-500/80 text-white"
                                : "bg-white/10 text-white/70 hover:bg-white/20"
                                }`}
                        >
                            {preset.name}
                        </button>
                    ))}
                </div>

                <AdjustableSlider label="feed" value={feed} min={0} max={0.1} step={0.0001}
                    format={(v) => v.toFixed(4)}
                    onChange={(v) => { setFeed(v); setActivePreset("custom"); }} />
                <AdjustableSlider label="kill" value={kill} min={0} max={0.1} step={0.0001}
                    format={(v) => v.toFixed(4)}
                    onChange={(v) => { setKill(v); setActivePreset("custom"); }} />
                <AdjustableSlider label="dA" value={dA} min={0} max={1} step={0.01}
                    format={(v) => v.toFixed(4)}
                    onChange={setDA} />
                <AdjustableSlider label="dB" value={dB} min={0} max={1} step={0.01}
                    format={(v) => v.toFixed(4)}
                    onChange={setDB} />

                <button
                    onClick={() => setSeedKey((k) => k + 1)}
                    className="mt-2 w-full rounded-md bg-white/10 py-1.5 text-xs text-white/80 hover:bg-white/20"
                >
                    reseed
                </button>

                <p className="mt-3 text-[10px] text-white/40">press h to toggle</p>
            </ControlPanel>
        </div>
    );
}
