'use client'
import React, { useId } from 'react'
import { cn } from '../../lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'

export interface SkillsCardProps {
  key?: string | null;
  title: string
  iconName?: IconName
  skills?: Array<{ text?: string | null | undefined }>
  className?: string
  // iconColor?: string // optional: override accent color
}

export const SkillsCard: React.FC<SkillsCardProps> = ({
  key,
  title,
  iconName = 'at-sign',
  skills,
  className,
  // iconColor = 'text-primary',
}) => {

  const hasSkills = !!skills && skills?.length > 0


  return (
    <Card
      key={key}
      className={cn(
        'group overflow-hidden p-0 border bg-card text-card-foreground shadow transition-all',
        'hover:shadow-lv2 hover:-translate-y-0.5',
        className
      )}
    >

      <CardHeader
        title={title}
        iconName={iconName}
      />


      <CardContent className=" pb-8 px-6">
        {hasSkills ? (
          <ul className="flex flex-wrap">
            {skills.map((skill, index) => (
              <li
                key={index}
                className={cn(
                  'text-muted-foreground text-lg',
                  'flex items-center gap-1 px-1 rounded-md',
                  'transition-colors hover:bg-muted/40 hover:text-foreground/90'
                )}
              >
                <span>{skill.text}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground italic text-center py-8">
            No skills listed yet
          </p>
        )}
      </CardContent>
    </Card>
  )
}

const CardHeader = ({ title, iconName }: { title: string; iconName?: IconName }) => {
  console.log(iconName?.toLowerCase())

  const uniqueId = useId()
  const headerColor = ""

  return (
    <div className="relative px-3 py-3 border-b">

      <div className='relative flex gap-4 items-center h-13 px-4  text-primary-foreground'>
        <svg className='absolute pointer-events-none inset-0 h-full w-full overflow-visible z-0'>
          <defs>
            <clipPath id={`${uniqueId}_clip_path`}>
              <rect
                x="0"
                y="0"
                ry="0.5em"
                width="100%"
                height="100%"
              />
            </clipPath>

            <linearGradient id="shadow_g" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="rgb(255, 255, 255)" />
              <stop offset="15%" stop-color="rgb(255, 255, 255)" />
              <stop offset="15%" stop-color="rgb(255, 255, 255)" />
              <stop offset="85%" stop-color="rgb(200, 200, 200)" />
              <stop offset="100%" stop-color="rgb(50, 50, 50)" />
            </linearGradient>

            <filter id={`${uniqueId}_bf`}>
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.9"
                numOctaves="4"
                stitchTiles="stitch"
                result="turbulence" />
              <feDisplacementMap
                in2="turbulence"
                in="SourceGraphic"
                scale="50"
                xChannelSelector="R"
                yChannelSelector="G"
                result='dismap' />
              <feGaussianBlur
                in='dismap'
                stdDeviation="0.5"
                result='blur'
              />
            </filter>

          </defs>
          <g
            filter="
              drop-shadow( 0px 3px 5px rgba(0, 0, 0, 0.49))
            "
          >
            <g clipPath={`url(#${uniqueId}_clip_path)`}>

              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                strokeWidth='3'
                stroke='black'
                className={'fill-primary'}
                // fill='white'
                filter='blur(2px)'
                ry="8"
              />

              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill="url(#shadow_g)"
                ry="8"
                // style={{ mixBlendMode: "multiply" }}
                opacity={0.25}
              />

              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill="url(#shadow_g)"
                ry="8"
                filter={`url(#${uniqueId}_bf)`}
                style={{ mixBlendMode: "multiply" }}
                opacity={.7}
              />
            </g>
          </g>

        </svg>

        <DynamicIcon
          name={(iconName?.toLowerCase() ?? 'at-sign') as IconName}
          className='z-10'
          filter='drop-shadow( 1px 1px 2px rgba(255,255,255,0.5)) drop-shadow(-1px -1px 2px rgba(0,0,0,0.8))'
        />
        <h3
          className="text-xl font-semibold tracking-tight z-10"
          style={{
            textShadow: "1px 1px 2px rgba(255,255,255,0.5), -2px -2px 3px rgba(0,0,0,0.4)"
          }}
        >{title}</h3>

      </div>
    </div>
  )
}




