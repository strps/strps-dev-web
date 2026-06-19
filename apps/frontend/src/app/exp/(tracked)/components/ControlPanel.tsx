'use client';
import { ReactNode, useEffect, useState } from "react";

interface ControlPanelProps {
    title: string;
    children: ReactNode;
    /** Which edge the panel docks to. Defaults to "left". */
    side?: "left" | "right";
    /** Keyboard key that toggles visibility (ignored while typing). Defaults to "h". */
    toggleKey?: string;
    /** Whether to show the collapsed "show" button while the panel is hidden. Defaults to true. */
    showButton?: boolean;
    /** Whether the panel starts open. Defaults to true. */
    defaultOpen?: boolean;
}

// Collapsible overlay panel shared by the exp/sc experiments. Manages its own
// open/closed state and toggles on a key (ignored while typing).
export default function ControlPanel({ title, children, side = "left", toggleKey = "h", showButton = true, defaultOpen = true }: ControlPanelProps) {
    const [open, setOpen] = useState(defaultOpen);

    const edge = side === "right" ? "right-4" : "left-4";

    useEffect(() => {
        const key = toggleKey.toLowerCase();
        function onKey(e: KeyboardEvent) {
            if (e.key.toLowerCase() === key) {
                // Ignore while typing in an input/textarea.
                const el = e.target as HTMLElement | null;
                if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA")) return;
                setOpen((o) => !o);
            }
        }
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [toggleKey]);

    if (!open) {
        if (!showButton) return null;
        return (
            <button
                onClick={() => setOpen(true)}
                className={`absolute top-4 ${edge} z-10 rounded-md border border-white/10 bg-black/40 px-2 py-1 text-xs text-white/60 backdrop-blur-md hover:text-white`}
                title={`Show ${title} (${toggleKey})`}
            >
                {title.toLowerCase()}
            </button>
        );
    }

    return (
        <div className={`absolute top-4 ${edge} z-10 w-64 rounded-xl border border-white/10 bg-black/50 p-4 text-white backdrop-blur-md max-h-[calc(100vh-2rem)] overflow-y-auto`}>
            <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-white/70">
                    {title}
                </span>
                <button
                    onClick={() => setOpen(false)}
                    className="rounded px-1.5 text-xs text-white/50 hover:text-white"
                    title={`Hide (${toggleKey})`}
                >
                    hide
                </button>
            </div>
            {children}
        </div>
    );
}
