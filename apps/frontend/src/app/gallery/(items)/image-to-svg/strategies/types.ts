// Shared types for the pluggable image-to-SVG conversion strategies.
//
// A strategy is a pure function from a prepared tone buffer + numeric params to
// an SVG string. Keeping it framework-free means strategies are trivial to add,
// reason about, and test in isolation from the React UI.

export type ControlKind = "slider" | "toggle" | "select";

export interface ControlDef {
    /** Stable key used in the params record. */
    key: string;
    label: string;
    kind: ControlKind;
    min: number;
    max: number;
    step: number;
    default: number;
    /** Optional value formatter for the UI readout. */
    format?: (value: number) => string;
    /**
     * For `kind: "select"`: the label of each discrete option, indexed by its
     * numeric param value (option `i` ⇒ value `i`). The control spans
     * `min: 0`, `max: options.length - 1`, `step: 1`.
     */
    options?: string[];
}

/**
 * Prepared, framework-free view of the source image handed to a strategy.
 * The luminance buffer is row-major, one float in 0..1 per pixel, already
 * downscaled to the working resolution. `sample` does bilinear tone lookup in
 * working-image space so strategies can walk lines at sub-pixel positions.
 */
export interface StrategyInput {
    width: number;
    height: number;
    luma: Float32Array;
    sample: (x: number, y: number) => number;
}

export interface Strategy {
    id: string;
    label: string;
    /** Drives the dynamic control panel and the default params. */
    controls: ControlDef[];
    /** Returns a complete, standalone `<svg>…</svg>` document string. */
    render: (input: StrategyInput, params: Record<string, number>) => string;
}

/** Seed a params record from a strategy's control defaults. */
export function defaultParams(strategy: Strategy): Record<string, number> {
    const params: Record<string, number> = {};
    for (const c of strategy.controls) params[c.key] = c.default;
    return params;
}
