import React from 'react'
import { StrpsAboutUsBlock } from '@/payload-types'

type ValuesProps = {
  values?: StrpsAboutUsBlock['values']
}

export const Values: React.FC<ValuesProps> = ({ values = [] }) => {
  if (!values?.length) return null

  return (
    <div>
      <h3 className="text-lg font-medium text-foreground mb-6">Our Core Values</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((value, index) => (
          <div key={index} className="bg-muted p-6 rounded-lg">
            <h4 className="font-medium text-foreground mb-2">{value.title}</h4>
            {value.description && <p className="text-muted-foreground">{value.description}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
