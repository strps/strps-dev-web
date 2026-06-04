'use client';
import { ReactNode, useEffect, useState } from "react";

interface ControlPanelProps {
    title: string;
    children: ReactNode;
}

// Collapsible overlay panel shared by the exp/sc experiments. Manages its own
// open/closed state and toggles on the "h" key (ignored while typing).
export default function ControlPanel({ title, children }: ControlPanelProps) {
    const [open, setOpen] = useState(true);

    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === "h" || e.key === "H") {
                // Ignore while typing in an input/textarea.
                const el = e.target as HTMLElement | null;
                if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA")) return;
                setOpen((o) => !o);
            }
        }
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    if (!open) {
        return (
            <button
                onClick={() => setOpen(true)}
                className="absolute top-4 left-4 z-10 rounded-md border border-white/10 bg-black/40 px-2 py-1 text-xs text-white/60 backdrop-blur-md hover:text-white"
                title="Show controls (h)"
            >
                controls
            </button>
        );
    }

    return (
        <div className="absolute top-4 left-4 z-10 w-64 rounded-xl border border-white/10 bg-black/50 p-4 text-white backdrop-blur-md max-h-[calc(100vh-2rem)] overflow-y-auto">
            <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-white/70">
                    {title}
                </span>
                <button
                    onClick={() => setOpen(false)}
                    className="rounded px-1.5 text-xs text-white/50 hover:text-white"
                    title="Hide (h)"
                >
                    hide
                </button>
            </div>
            {children}
        </div>
    );
}
