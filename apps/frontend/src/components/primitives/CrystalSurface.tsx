import { cn } from '@/lib/utils'

import {
    LiquidCrystalFilter,
    LIQUID_CRYSTAL_FILTER_ID,
    type LiquidCrystalFilterProps,
} from './LiquidCrystalFilter'

export interface CrystalSurfaceProps {
    /**
     * Forwarded to the filter this surface mounts. Pass a distinct `id` **and**
     * `seed` when a page needs two crystals that do not ripple identically.
     */
    filter?: LiquidCrystalFilterProps
    /**
     * Merged onto all three layers — the hook for animating the glass in and out
     * (`transition-opacity`, `opacity-0`) or for rounding it to a host's radius.
     */
    className?: string
    /**
     * Merged onto the tint layer only, so a host can make its glass milkier or
     * blurrier (`bg-crystal-strong`, `backdrop-blur-*`) without doubling the fill
     * onto the refraction and sheen layers above it.
     */
    tintClassName?: string
}

/**
 * The three stacked layers that make a surface read as a pane of glass: tinted
 * blur, refraction, lit bevel. Rendered at `-z-10`, so the host element must
 * carry `relative isolate overflow-hidden` — `isolate` keeps the layers from
 * escaping behind the page, `overflow-hidden` clips them to its corners.
 *
 * Split out of `Card variant="crystal"` so the header and the form section can
 * wear the same glass. See `docs/liquid-crystal.md`.
 */
export function CrystalSurface({ filter, className, tintClassName }: CrystalSurfaceProps) {
    const filterId = filter?.id ?? LIQUID_CRYSTAL_FILTER_ID

    return (
        <>
            <LiquidCrystalFilter {...filter} />
            {/* The glass itself: tint, blur and saturation, everywhere. */}
            <div
                aria-hidden
                className={cn(
                    'pointer-events-none absolute inset-0 -z-10 bg-crystal backdrop-blur-[3px] backdrop-saturate-150',
                    className,
                    tintClassName,
                )}
            />
            {/* Refraction, on its own layer: browsers without url() in backdrop-filter
                drop this declaration and keep the plain glass above. */}
            <div
                aria-hidden
                className={cn('pointer-events-none absolute inset-0 -z-10', className)}
                style={{ backdropFilter: `url(#${filterId})` }}
            />
            {/* The thin lit edge of the glass. */}
            <div
                aria-hidden
                className={cn(
                    'pointer-events-none absolute inset-0 -z-10 shadow-crystal-sheen',
                    className,
                )}
            />
        </>
    )
}

export default CrystalSurface
