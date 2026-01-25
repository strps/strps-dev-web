import React from 'react'
import { cn } from '../../lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'

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
        'group overflow-hidden p-0 border bg-card text-card-foreground shadow transition-all',
        'hover:shadow-lv2 hover:-translate-y-0.5',
        className
      )}
    >
      {/* Accent header */}
      {/* <div className="relative px-6 pb-5 border-b flex shri  items-center gap-5">
        <div className="shadow-lv1 abolute -top-2 -left-2 w-16 h-16 shrink-0 rounded-lg bg-secondary border border-border flex items-center justify-center text-primary">
          {iconName && <DynamicIcon name={iconName} className="h-6 w-6" strokeWidth={2.2} />}
        </div>

        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      </div> */}

      <div
        className="relative px-6 py-5  flex h-24 items-center gap-5 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-600"
        style={{
          backgroundImage: `
          linear-gradient(349deg,rgba(4, 36, 214, 1) 0%, rgba(41, 66, 227, 1) 35%, rgba(0, 195, 255, 1) 100%), 
          radial-gradient(circle at top left, rgba(255, 255, 255, 0.3), transparent), 
          radial-gradient(circle at bottom right, rgba(0, 0, 0, 0.2), transparent)`,
          // backgroundBlendMode: 'multiply'
        }}
      >

        <div
          className="absolute -right-1 top-2 flex items-center justify-center z-0"
          style={{ color: 'rgba(41, 66, 227, 0.7)' }}
        >
          {iconName && <DynamicIcon
            name={iconName}
            className="h-32 w-32"
            strokeWidth={3}
          />}
        </div>

        <div className="flex items-center justify-center text-primary z-10">
          {iconName && <DynamicIcon name={iconName} className="h-10 w-10" strokeWidth={2.2} />}
        </div>
        <h3 className="text-lg font-semibold tracking-tight z-10">{title}</h3>
      </div>

      <CardContent className=" pb-8 px-6">
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