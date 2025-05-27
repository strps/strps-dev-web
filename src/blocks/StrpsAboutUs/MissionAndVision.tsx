import React from 'react'
import RichText from '@/components/RichText'

type MissionAndVisionProps = {
  mission?: any // Replace 'any' with the correct RichText type if available
  vision?: any
}

export const MissionAndVision: React.FC<MissionAndVisionProps> = ({ mission, vision }) => {
  if (!mission && !vision) return null

  return (
    <div className="grid md:grid-cols-2 gap-12">
      {mission && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Our Mission</h3>
          <div className="prose prose-indigo text-gray-500">
            <RichText data={mission} />
          </div>
        </div>
      )}
      {vision && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Our Vision</h3>
          <div className="prose prose-indigo text-gray-500">
            <RichText data={vision} />
          </div>
        </div>
      )}
    </div>
  )
}
