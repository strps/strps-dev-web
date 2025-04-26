import React from 'react'

interface StrpsSkillsProps {
  title: string
  skills: {
    text: string
    percentage: number
  }[]
}

export const StrpsSkills = ({ title, skills }: StrpsSkillsProps) => {
  return (
    <section className="">
      <div className="">
        <h2>{title}</h2>
        <div>
          {skills.map((skill, i) => {
            return (
              <div key={i}>
                <p>{skill.text}</p>
                <p>{skill.percentage}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
