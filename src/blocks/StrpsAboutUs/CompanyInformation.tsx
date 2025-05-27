import React from 'react'

type TimelineItem = {
  date: string
  event: string
  description?: string
}

type TeamMember = {
  name: string
  title?: string
  bio?: string
  image?: {
    url: string
  }
}

type CompanyInformationProps = {
  timeline?: TimelineItem[]
  leadership?: TeamMember[]
}

export const CompanyInformation: React.FC<CompanyInformationProps> = ({
  timeline = [],
  leadership = [],
}) => {
  const hasTimeline = timeline.length > 0
  const hasLeadership = leadership.length > 0

  if (!hasTimeline && !hasLeadership) return null

  return (
    <>
      {hasTimeline && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-8">Our Journey</h3>
          <div className="relative">
            <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200"></div>
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className="relative pl-12">
                  <div className="absolute left-0 top-0 h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center">
                    <span className="text-white font-medium">{item.date}</span>
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-1">{item.event}</h4>
                  {item.description && <p className="text-gray-600">{item.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {hasLeadership && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-8">Leadership Team</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadership.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow overflow-hidden">
                {member.image && (
                  <div className="h-48 bg-gray-200">
                    <img
                      src={member.image.url}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h4 className="text-lg font-medium text-gray-900">{member.name}</h4>
                  {member.title && <p className="text-indigo-600 font-medium">{member.title}</p>}
                  {member.bio && <p className="mt-2 text-gray-600">{member.bio}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
