// Registry of image-to-SVG conversion strategies. Add new strategies here and
// they automatically appear in the UI strategy picker.

import { hatchingStrategy } from "./hatching";
import { waveFormsStrategy } from "./wave-forms";
import { spiralStrategy } from "./spiral";
import { hilbertStrategy } from "./hilbert";
import { tspArtStrategy } from "./tsp-art";
import { isolinesStrategy } from "./isolines";
import { edgeDetectionStrategy } from "./edge-detection";
import type { Strategy } from "./types";

export const STRATEGIES: Strategy[] = [
    hatchingStrategy,
    waveFormsStrategy,
    spiralStrategy,
    hilbertStrategy,
    tspArtStrategy,
    isolinesStrategy,
    edgeDetectionStrategy,
];

export function getStrategy(id: string): Strategy {
    return STRATEGIES.find((s) => s.id === id) ?? STRATEGIES[0];
}

export type { Strategy, ControlDef, StrategyInput } from "./types";
export { defaultParams } from "./types";
