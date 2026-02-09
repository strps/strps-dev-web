import React from 'react'
import Image from 'next/image'
import { StrpsAboutUsBlock } from '@/payload-types'

type CompanyInformationProps = {
  timeline?: StrpsAboutUsBlock['timeline']
  leadership?: StrpsAboutUsBlock['leadership']
}

export const CompanyInformation: React.FC<CompanyInformationProps> = ({
  timeline = [],
  leadership = [],
}) => {
  const hasTimeline = timeline && timeline.length > 0
  const hasLeadership = leadership && leadership.length > 0

  if (!hasTimeline && !hasLeadership) return null

  return (
    <>
      {hasTimeline && (
        <div>
          <h3 className="text-lg font-medium text-foreground mb-8">Our Journey</h3>
          <div className="relative">
            <div className="absolute left-4 top-0 h-full w-0.5 bg-border"></div>
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className="relative pl-12">
                  <div className="absolute left-0 top-0 h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-medium">
                      {item.date ? new Date(item.date).toLocaleDateString() : ''}
                    </span>
                  </div>
                  <h4 className="text-lg font-medium text-foreground mb-1">{item.event}</h4>
                  {item.description && <p className="text-muted-foreground">{item.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {hasLeadership && (
        <div>
          <h3 className="text-lg font-medium text-foreground mb-8">Leadership Team</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadership.map((member, index) => (
              <div
                key={index}
                className="bg-card rounded-lg shadow overflow-hidden border border-border"
              >
                {member.image && (
                  <div className="h-48 bg-muted">
                    <Image
                      src={typeof member.image === 'number' ? '' : member.image.url || ''}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      width={400}
                      height={300}
                    />
                  </div>
                )}
                <div className="p-6">
                  <h4 className="text-lg font-medium text-foreground">{member.name}</h4>
                  {member.title && <p className="text-primary font-medium">{member.title}</p>}
                  {member.bio && <p className="mt-2 text-muted-foreground">{member.bio}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
