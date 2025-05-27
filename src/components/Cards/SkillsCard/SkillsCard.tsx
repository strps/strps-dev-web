import React from 'react'
import { cn } from '@/utilities/ui'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export interface SkillsCardProps {
  title: string
  skills: Array<{ text?: string | null }> // Make text optional and nullable
  className?: string
}

export const SkillsCard: React.FC<SkillsCardProps> = ({ title, skills, className }) => {
  return (
    <Card className={cn(className, 'px-6 py-10')}>
      <CardHeader>
        <CardTitle>
          <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {skills && skills.length > 0 ? (
          <ul className="list-none pl-0">
            {skills.map((skill, index) => (
              <li key={index} className={cn('text-muted-foreground py-1')}>
                {skill.text}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">No skills listed.</p>
        )}
      </CardContent>
    </Card>
  )
}
