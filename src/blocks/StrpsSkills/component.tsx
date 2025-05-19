import React from 'react'
import { StrpsSkillsBlock } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const StrpsSkills = (props: StrpsSkillsBlock) => {
  const { title, skillGroup } = props

  return (
    <div className="my-16" id={`block-${props.id}`}>
      <section id="skills" className="flex items-center justify-center relative">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">{title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillGroup &&
              skillGroup.map((group, i) => (
                <Card key={i} className="shadow-lg sha">
                  <CardHeader>
                    <CardTitle>
                      <h3 className="text-xl font-semibold tracking-tight">{group.text}</h3>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {group.skills && group.skills.length > 0 ? (
                      <ul className="list-none pl-0">
                        {group.skills.map((skill, j) => (
                          <li key={j} className={cn('text-muted-foreground py-1')}>
                            {skill.text}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground">No skills listed.</p>
                    )}
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>
    </div>
  )
}
