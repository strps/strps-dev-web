'use client'

import * as React from 'react'
import { motion, useReducedMotion, type Variants } from 'motion/react'

import { cn } from '@/lib/utils'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

/** The one easing curve every section reveal shares (a soft "out expo"). */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/**
 * How far the element travels before settling. Small on purpose: these are
 * entrances for a text-heavy, hairline-ruled layout, not slide-in banners.
 */
const DISTANCE = 16

function offsetFor(direction: Direction, distance: number) {
    switch (direction) {
        case 'up':
            return { y: distance }
        case 'down':
            return { y: -distance }
        case 'left':
            return { x: distance }
        case 'right':
            return { x: -distance }
        default:
            return {}
    }
}

interface RevealProps extends Omit<React.ComponentProps<typeof motion.div>, 'children'> {
    children?: React.ReactNode
    /** Seconds to wait before this element starts. Ignored inside a `RevealGroup`. */
    delay?: number
    duration?: number
    /** Where the element travels from. Defaults to `up` (i.e. it rises into place). */
    direction?: Direction
    distance?: number
    /**
     * `view` (default) plays when the element scrolls into the viewport;
     * `mount` plays immediately — for above-the-fold content such as the hero,
     * which would otherwise flash in as the observer fires.
     */
    on?: 'view' | 'mount'
    /**
     * Fraction of the element that must be visible before it plays. Keep it
     * low for tall blocks, which would otherwise never cross the threshold.
     */
    amount?: number
    /**
     * Inside a `RevealGroup`, the item inherits the parent's stagger instead of
     * running its own `whileInView`. Set automatically by `RevealGroup`.
     */
    asChildOfGroup?: boolean
}

/**
 * A single scroll-triggered entrance. Wrap any server-rendered subtree with it:
 * the children stay server components, only this wrapper ships to the client.
 *
 * Honours `prefers-reduced-motion` by rendering the content statically — no
 * opacity ramp, no transform, no observer.
 */
export function Reveal({
    children,
    className,
    delay = 0,
    duration = 0.6,
    direction = 'up',
    distance = DISTANCE,
    on = 'view',
    amount = 0.2,
    asChildOfGroup = false,
    ...rest
}: RevealProps) {
    const reduceMotion = useReducedMotion()

    // Still a motion.div so `style`/`rest` (grid templates, ids, handlers) reach
    // the same element — it simply never animates.
    if (reduceMotion) {
        return (
            <motion.div className={className} {...rest}>
                {children}
            </motion.div>
        )
    }

    const hidden = { opacity: 0, ...offsetFor(direction, distance) }
    const shown = { opacity: 1, x: 0, y: 0 }
    const transition = { duration, ease: EASE, delay }

    if (asChildOfGroup) {
        // The group drives timing through variants; the item only declares the
        // two states so `staggerChildren` can walk them.
        const variants: Variants = {
            hidden,
            shown: { ...shown, transition: { duration, ease: EASE } },
        }
        return (
            <motion.div className={className} variants={variants} {...rest}>
                {children}
            </motion.div>
        )
    }

    return (
        <motion.div
            className={className}
            initial={hidden}
            {...(on === 'mount'
                ? { animate: shown }
                : { whileInView: shown, viewport: { once: true, amount } })}
            transition={transition}
            {...rest}
        >
            {children}
        </motion.div>
    )
}

interface RevealGroupProps extends Omit<React.ComponentProps<typeof motion.div>, 'children'> {
    children?: React.ReactNode
    /** Seconds between consecutive children. */
    stagger?: number
    /** Seconds before the first child starts. */
    delay?: number
    duration?: number
    direction?: Direction
    distance?: number
    amount?: number
    on?: 'view' | 'mount'
    /** Class applied to every generated item wrapper (e.g. `h-full` in a grid). */
    itemClassName?: string
}

/**
 * Staggers its direct children. The group element itself takes the layout
 * classes (it *is* the grid or the list), and each child is wrapped in an item
 * that inherits the group's variants — so one observer drives the whole row
 * rather than one per card.
 */
export function RevealGroup({
    children,
    className,
    itemClassName,
    stagger = 0.08,
    delay = 0,
    duration = 0.6,
    direction = 'up',
    distance = DISTANCE,
    amount = 0.15,
    on = 'view',
    ...rest
}: RevealGroupProps) {
    const reduceMotion = useReducedMotion()

    if (reduceMotion) {
        return (
            <motion.div className={className} {...rest}>
                {children}
            </motion.div>
        )
    }

    const container: Variants = {
        hidden: {},
        shown: { transition: { staggerChildren: stagger, delayChildren: delay } },
    }

    return (
        <motion.div
            className={className}
            variants={container}
            initial="hidden"
            {...(on === 'mount'
                ? { animate: 'shown' }
                : { whileInView: 'shown', viewport: { once: true, amount } })}
            {...rest}
        >
            {React.Children.map(children, (child) =>
                React.isValidElement(child) ? (
                    <Reveal
                        asChildOfGroup
                        className={cn(itemClassName)}
                        duration={duration}
                        direction={direction}
                        distance={distance}
                    >
                        {child}
                    </Reveal>
                ) : (
                    child
                ),
            )}
        </motion.div>
    )
}
