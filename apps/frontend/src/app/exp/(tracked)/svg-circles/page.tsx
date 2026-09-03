'use client';

import { useState } from "react";
import SVGCircles, { type MotionPattern } from "@/app/(website)/[locale]/lab/(items)/svg-circles/SVGCircles";
import ControlPanel from "@/app/exp/(tracked)/components/ControlPanel";
import AdjustableSlider from "@/app/exp/(tracked)/components/AdjustableSlider";

const MOTION_PATTERNS: MotionPattern[] = ["spring", "ease", "direct"];

export default function Page() {
    const [numCircles, setNumCircles] = useState(10);
    const [strokeWidth, setStrokeWidth] = useState(6);
    const [focalLength, setFocalLength] = useState(1000);
    const [maxRadius, setMaxRadius] = useState(920);
    const [worldDepth, setWorldDepth] = useState(6667);
    const [dashOn, setDashOn] = useState(40);
    const [pattern, setPattern] = useState<MotionPattern>("spring");

    return (
        <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
            <SVGCircles
                className="absolute inset-0 h-full w-full"
                width={1600}
                height={900}
                numCircles={numCircles}
                maxRadius={maxRadius}
                focalLength={focalLength}
                worldDepth={worldDepth}
                strokeWidth={strokeWidth}
                strokeColor="#ebebeb"
                strokeDasharray={`${dashOn} ${Math.round(dashOn / 2)}`}
                motionPattern={pattern}
            />

            <ControlPanel title="SVG Circles" showButton={false} defaultOpen={false}>
                <AdjustableSlider label="circles" value={numCircles} min={2} max={24} step={1}
                    format={(v) => v.toFixed(0)}
                    onChange={(v) => setNumCircles(Math.round(v))} />
                <AdjustableSlider label="stroke" value={strokeWidth} min={1} max={50} step={1}
                    format={(v) => v.toFixed(0)}
                    onChange={setStrokeWidth} />
                <AdjustableSlider label="focal" value={focalLength} min={200} max={8000} step={100}
                    format={(v) => v.toFixed(0)}
                    onChange={setFocalLength} />
                <AdjustableSlider label="max radius" value={maxRadius} min={300} max={1400} step={20}
                    format={(v) => v.toFixed(0)}
                    onChange={setMaxRadius} />
                <AdjustableSlider label="world depth" value={worldDepth} min={1000} max={12000} step={100}
                    format={(v) => v.toFixed(0)}
                    onChange={setWorldDepth} />
                <AdjustableSlider label="dash" value={dashOn} min={2} max={120} step={2}
                    format={(v) => v.toFixed(0)}
                    onChange={setDashOn} />

                <div className="mt-3 space-y-1.5">
                    <span className="text-[10px] uppercase tracking-wider text-white/40">
                        motion
                    </span>
                    <div className="flex gap-1.5">
                        {MOTION_PATTERNS.map((p) => (
                            <button
                                key={p}
                                onClick={() => setPattern(p)}
                                className={`flex-1 rounded-md px-2 py-1 text-xs capitalize transition-colors ${pattern === p
                                    ? "bg-fuchsia-500/80 text-white"
                                    : "bg-white/10 text-white/70 hover:bg-white/20"
                                    }`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                </div>

                <p className="mt-3 text-[10px] text-white/40">press h to toggle</p>
            </ControlPanel>
        </div>
    );
}
