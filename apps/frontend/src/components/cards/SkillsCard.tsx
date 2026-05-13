'use client'
import React, { useId } from 'react'
import { cn } from '../../lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'
import { motion } from 'motion/react'


const MotionCard = motion.create(Card)



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
    <MotionCard
      key={key}
      className={cn(
        'group overflow-hidden p-0 border bg-card text-card-foreground shadow transition-all',
        'hover:shadow-lv2 hover:-translate-y-0.5',
        className
      )}
      whileHover="hover"
      initial="initial"
    >

      <CardHeader2
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
    </MotionCard>
  )
}

interface CardHeaderProps {
  title: string
  iconName?: IconName
  accentColor?: string
}

const CardHeader2 = ({ title, iconName, accentColor = "#ff9009" }: CardHeaderProps) => {
  console.log(iconName?.toLowerCase())

  const uniqueId = useId()
  const borderDiameter = 0.5 // px

  return (
    <div
      className="relative px-3 py-3 border-b flex items-center gap-4 p-5"
      style={{ boxShadow: '0px 1px 1px rgba(255,255,255,0.2) inset, 0px -1px 1px rgba(0,0,0,0.4) inset' }}
    >

      <div
        className='relative flex gap-4 items-center pl-2 py-2 pr-8 border rounded-full'
        style={{
          boxShadow: 'px 1px 1px rgba(255,255,255,0.2), -1px -1px 1px rgba(0,0,0,0.4), 1px 1px 1px rgba(255,255,255,0.2) inset, -1px -1px 1px rgba(0,0,0,0.4) inset'
        }}
      >
        <div className='relative h-13 w-13 flex items-center justify-center text-primary-foreground'>


          <svg className='absolute pointer-events-none inset-0 h-full w-full overflow-visible z-0' viewBox="0 0 100 100">
            <defs>
              <mask id={`${uniqueId}_side_mask`}>
                <ellipse cx="50%" cy="50%" rx="50%" ry="50%" fill="white" />
                <ellipse cx="50%" cy="50%" rx={`calc(50% - ${borderDiameter / 2}em)`} ry={`calc(50% - ${borderDiameter / 2}em)`} fill="black" />
              </mask>

              <clipPath id={`${uniqueId}_top_clip_path`}>
                <ellipse cx="50%" cy="50%" rx={`calc(50% - ${borderDiameter / 2}em)`} ry={`calc(50% - ${borderDiameter / 2}em)`} />
              </clipPath>

              <clipPath id={`${uniqueId}_clip_path`}>
                <ellipse
                  cx="50%"
                  cy="50%"
                  rx="50%"
                  ry="50%"
                />
              </clipPath>

              <linearGradient id={`${uniqueId}_shadow_top`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="rgb(200, 200, 200)" />
                <stop offset="100%" stop-color="rgb(100, 100, 100)" />
              </linearGradient>

              <linearGradient id={`${uniqueId}_shadow_side`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="rgb(255, 255, 255)" />
                <stop offset="100%" stop-color="rgb(0, 0, 0)" />
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
              drop-shadow( 0px 4px 5px rgba(0, 0, 0, 1)
            "
            >

              <g clipPath={`url(#${uniqueId}_clip_path)`}>

                <ellipse
                  cx="50%"
                  cy="50%"
                  rx="50%"
                  ry="50%"
                  strokeWidth='3'
                  stroke='black'
                  className={'fill-primary'}
                // filter='blur(2px)'
                />

                <motion.ellipse
                  cx="50%"
                  cy="50%"
                  fill={accentColor}
                  variants={{
                    initial: {
                      rx: "0%",
                      ry: "0%",
                    },
                    hover: {
                      rx: "50%",
                      ry: "50%",
                    }
                  }}
                />


                <g id="${uniqueId}_side" mask={`url(#${uniqueId}_side_mask)`}>
                  <ellipse
                    cx="50%"
                    cy="50%"
                    rx="50%"
                    ry="50%"
                    style={{ mixBlendMode: "multiply" }}
                    fill={`url(#${uniqueId}_shadow_side)`}
                    opacity={0.8}
                  />
                </g>

                <g id="${uniqueId}_side" clipPath={`url(#${uniqueId}_top_clip_path)`}>

                  <ellipse
                    cx="50%"
                    cy="50%"
                    rx="50%"
                    ry="50%"
                    fill={`url(#${uniqueId}_shadow_top)`}
                    // filter={`url(#${uniqueId}_bf)`}
                    style={{ mixBlendMode: "multiply" }}
                    opacity={.3}
                  />
                </g>
              </g>
            </g>

          </svg>

          <DynamicIcon
            name={(iconName?.toLowerCase() ?? 'at-sign') as IconName}
            className='z-10'
            filter='drop-shadow( 1px 1px 1px rgba(255,255,255,0.5)) drop-shadow(-1px -1px 1px rgba(0,0,0,0.8))'
          />


        </div>

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


const SkillBadge = () => {

}