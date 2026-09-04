'use client'

import { useEffect, useRef, useState } from 'react'
import { RevealGroup } from '@/components/primitives/Reveal'
import { ProjectTeaserCard, type ProjectTeaserCardProps } from '../cards/ProjectTeaserCard'

export type ProjectTeaserGridItem = Omit<
    ProjectTeaserCardProps,
    'expanded' | 'onExpandedChange'
> & { id: string }

interface ProjectTeaserGridProps {
    items: ProjectTeaserGridItem[]
}

/**
 * Owns which teaser is open. The cards are controlled, so opening one closes
 * whichever was open before — the grid never shows two panels at once.
 */
export function ProjectTeaserGrid({ items }: ProjectTeaserGridProps) {
    const [expandedId, setExpandedId] = useState<string | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!expandedId) return

        const handlePointerDown = (event: PointerEvent) => {
            if (!containerRef.current?.contains(event.target as Node)) {
                setExpandedId(null)
            }
        }

        document.addEventListener('pointerdown', handlePointerDown)
        return () => document.removeEventListener('pointerdown', handlePointerDown)
    }, [expandedId])

    return (
        <div ref={containerRef}>
            <RevealGroup
                itemClassName="h-full"
                className="grid gap-12"
                style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 350px), 1fr))' }}
            >
                {items.map(({ id, ...card }) => (
                    <ProjectTeaserCard
                        key={id}
                        {...card}
                        expanded={expandedId === id}
                        onExpandedChange={(expanded) => setExpandedId(expanded ? id : null)}
                    />
                ))}
            </RevealGroup>
        </div>
    )
}
