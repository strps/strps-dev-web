import React from 'react'
import { cn } from '@/utilities/ui'
import { Card, CardContent } from '@/components/ui/card'
import { DynamicIcon, IconName } from 'lucide-react/dynamic'

export interface SkillsCardProps {
  title: string
  iconName?: IconName
  skills?: Array<{ text?: string | null | undefined }>
  className?: string
  // iconColor?: string // optional: override accent color
}

export const SkillsCard: React.FC<SkillsCardProps> = ({
  title,
  iconName = 'at-sign',
  skills,
  className,
  // iconColor = 'text-primary',
}) => {

  const hasSkills = !!skills && skills?.length > 0

  return (
    <Card
      className={cn(
        'overflow-hidden border bg-card text-card-foreground shadow transition-all',
        'hover:shadow-lv2 hover:-translate-y-0.5',
        className
      )}
    >
      {/* Accent header */}
      <div className="relative px-6 pb-5 border-b flex shri  items-center gap-5">
        <div className="shadow-lv1 abolute -top-2 -left-2 w-16 h-16 shrink-0 rounded-lg bg-secondary border border-border flex items-center justify-center text-primary">
          {iconName && <DynamicIcon name={iconName} className="h-6 w-6" strokeWidth={2.2} />}
        </div>

        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      </div>

      <CardContent className="pt-4 pb-8 px-6">
        {hasSkills ? (
          <ul className="grid grid-cols-1 gap-2.5">
            {skills.map((skill, index) => (
              <li
                key={index}
                className={cn(
                  'text-muted-foreground',
                  'flex items-center gap-1 px-1 rounded-md',
                  'transition-colors hover:bg-muted/40 hover:text-foreground/90'
                )}
              >
                <span>{skill.text}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground italic text-center py-8">
            No skills listed yet
          </p>
        )}
      </CardContent>
    </Card>
  )
}