import React from 'react'
import RichText from '@/components/RichText'
import { StrpsAboutUsBlock } from '@/payload-types'

type MissionAndVisionProps = {
  mission?: StrpsAboutUsBlock['mission']
  vision?: StrpsAboutUsBlock['vision']
}

export const MissionAndVision: React.FC<MissionAndVisionProps> = ({ mission, vision }) => {
  if (!mission && !vision) return null

  return (
    <div className="grid md:grid-cols-2 gap-12">
      {mission && (
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">Our Mission</h3>
          <div className="prose prose-indigo text-muted-foreground">
            <RichText data={mission} />
          </div>
        </div>
      )}
      {vision && (
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">Our Vision</h3>
          <div className="prose prose-indigo text-muted-foreground">
            <RichText data={vision} />
          </div>
        </div>
      )}
    </div>
  )
}
