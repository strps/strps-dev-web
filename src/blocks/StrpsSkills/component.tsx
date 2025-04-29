import React from 'react'
import { StrpsSkillsBlock } from '@/payload-types'
import { cn } from '@/utilities/ui'

export const StrpsSkills = (props: StrpsSkillsBlock) => {
  const { title, skillGroup } = props

  return (
    <section className="flex items-center justify-center relative py-16 md:py-24 bg-primary">
      <div className="container mx-auto text-center">
        <h2 className={cn('text-3xl md:text-4xl font-bold text-primary-foreground mb-8')}>
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillGroup &&
            skillGroup.map((group, i) => (
              <div key={i} className={cn('bg-card rounded-lg shadow-md p-6')}>
                <h3 className={cn('text-xl font-semibold text-card-foreground mb-2')}>
                  {group.text}
                </h3>
                {group.skills && group.skills.length > 0 ? (
                  <ul className="list-none pl-0">
                    {group.skills.map((skill, j) => (
                      <li key={j} className={cn('text-muted-foreground py-1')}>
                        {skill.text}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className={cn('text-muted-foreground')}>No skills listed.</p>
                )}
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}
