import { cn } from '@/lib/utils'

/** Default id of the filter emitted by {@link LiquidCrystalFilter}. */
export const LIQUID_CRYSTAL_FILTER_ID = 'liquid-crystal'

export interface LiquidCrystalFilterProps {
    /** Filter id referenced as `url(#id)`. */
    id?: string
    /** Size of the ripples: lower is glassier, higher is frostier. */
    frequency?: number
    /** How far the backdrop is bent, in pixels. */
    scale?: number
    /** Smoothing applied to the noise before it displaces — keeps the bend liquid, not grainy. */
    softness?: number
    /** Opacity of the bent backdrop layer, 0–1. */
    refractionOpacity?: number
    /** Strength of the specular glints riding on the ripples. */
    glint?: number
    /** Opacity of the glint layer riding on top, 0–1. */
    glintOpacity?: number
    /** Noise seed, so several crystals can differ. */
    seed?: number
    className?: string
}

/**
 * Emits an SVG filter that reads like liquid crystal: smoothed fractal noise bends
 * whatever it filters, and the same noise is lit from a point light to scatter
 * highlights across the ripples.
 *
 * Reference it with `filter: url(#id)` or, over a background, `backdrop-filter: url(#id)`.
 * The host `<svg>` is zero-sized and hidden, so it can sit anywhere in the tree.
 */
export const LiquidCrystalFilter: React.FC<LiquidCrystalFilterProps> = ({
    id = LIQUID_CRYSTAL_FILTER_ID,
    frequency = 0.001,
    scale = 10,
    softness = 1,
    refractionOpacity = 1,
    glint = 1.1,
    glintOpacity = 0.2,
    seed = 4,
    className,
}) => (
    <svg
        aria-hidden
        focusable="false"
        className={cn('pointer-events-none absolute h-0 w-0 overflow-hidden', className)}
    >
        <defs>
            <filter
                id={id}
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
                colorInterpolationFilters="sRGB"
            >
                <feTurbulence
                    type="fractalNoise"
                    baseFrequency={`${frequency} ${frequency * 1.6}`}
                    numOctaves={2}
                    seed={seed}
                    stitchTiles="stitch"
                    result="noise"
                />
                {/* Blurring the noise turns the grain into flowing lobes. */}
                <feGaussianBlur in="noise" stdDeviation={softness} result="liquid" />
                <feDisplacementMap
                    in="SourceGraphic"
                    in2="liquid"
                    scale={scale}
                    xChannelSelector="R"
                    yChannelSelector="G"
                    result="refracted"
                />
                <feComponentTransfer in="refracted" result="glass">
                    <feFuncA type="linear" slope={refractionOpacity} intercept="0" />
                </feComponentTransfer>
                {/* The same lobes act as a height map for the crystal's facets. */}
                <feSpecularLighting
                    in="liquid"
                    surfaceScale={3}
                    specularConstant={glint}
                    specularExponent={24}
                    lightingColor="#ffffff"
                    result="glints"
                >
                    <fePointLight x="-120" y="-180" z="180" />
                </feSpecularLighting>
                {/* Clipped to the source's own shape so the light stays on the glass. */}
                <feComposite in="glints" in2="refracted" operator="in" result="clippedGlints" />
                {/* k3 weights the glint layer, so it doubles as its opacity. */}
                <feComposite
                    in="glass"
                    in2="clippedGlints"
                    operator="arithmetic"
                    k1="0"
                    k2="1"
                    k3={glintOpacity}
                    k4="0"
                />
            </filter>
        </defs>
    </svg>
)

export default LiquidCrystalFilter
