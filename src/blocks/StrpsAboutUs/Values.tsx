import React from 'react'

type ValueItem = {
  title: string
  description?: string
}

type ValuesProps = {
  values?: ValueItem[]
}

export const Values: React.FC<ValuesProps> = ({ values = [] }) => {
  if (!values.length) return null

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-6">Our Core Values</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((value, index) => (
          <div key={index} className="bg-gray-50 p-6 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">{value.title}</h4>
            {value.description && <p className="text-gray-600">{value.description}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
