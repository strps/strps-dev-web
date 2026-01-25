import React from 'react'
import { StrpsSkillsBlock } from '@/payload-types'
import { SkillsCard } from '@strps-website/ui'
import { Section } from '@/components/Section'
import { IconName } from 'lucide-react/dynamic'

export const StrpsSkills = (props: StrpsSkillsBlock) => {
  const { id, title, skillGroup, section } = props

  return (
    <Section id={id} {...section}>
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-foreground">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {skillGroup?.map((group, i) => (
          <SkillsCard iconName={group.icon as IconName} key={i} title={group.text || ''} skills={group.skills || []} />
        ))}
      </div>
    </Section>
  )
}
