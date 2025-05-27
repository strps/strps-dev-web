import React from 'react'
import { StrpsSkillsBlock } from '@/payload-types'
import { SkillsCard } from '@/components/Cards/SkillsCard/SkillsCard'
import { Section } from '@/components/Section/Section'

export const StrpsSkills = (props: StrpsSkillsBlock) => {
  const { id, title, skillGroup, section } = props

  return (
    <Section id={id} {...section} className="my-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {skillGroup?.map((group, i) => (
          <SkillsCard key={i} title={group.text || ''} skills={group.skills || []} />
        ))}
      </div>
    </Section>
  )
}
