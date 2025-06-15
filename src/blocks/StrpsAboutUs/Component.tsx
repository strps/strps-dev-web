import React from 'react'
import { StrpsAboutUsBlock } from '@/payload-types'
import { Section } from '@/components/Section/Section'
import { MissionAndVision } from './MissionAndVision'
import { Values } from './Values'
import { CompanyInformation } from './CompanyInformation'

export const StrpsAboutUs: React.FC<StrpsAboutUsBlock> = ({
  heading,
  mission,
  vision,
  values = [],
  timeline = [],
  leadership = [],
  section,
}) => {
  return (
    <Section {...section}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {heading && (
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">{heading}</h2>
          </div>
        )}

        <div className="space-y-20">
          <MissionAndVision mission={mission} vision={vision} />
          <Values values={values} />
          <CompanyInformation timeline={timeline} leadership={leadership} />
        </div>
      </div>
    </Section>
  )
}
