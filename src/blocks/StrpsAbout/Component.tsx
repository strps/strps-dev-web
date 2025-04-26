import { Media } from '@/components/Media'
import Link from 'next/link'
import React from 'react'

interface StrpsAboutProps {}

export const StrpsAbout = ({ text, image, link, title }) => {
  console.log('Image:', image)
  console.log('Link:', link)

  return (
    <section className="h-svh flex items-center justify-center relative">
      <Media resource={image} className="absolute -z-10" />
      <div className="w-1/2">
        <h2>A little about me.</h2>

        <div className="">
          <p className="">
            Hello! I&apos;m César from Costa Rica, a tech enthusiast with a passion for coding,
            graphics, and design. My journey in web development has equipped me with a keen
            problem-solving ability, and a love for team collaboration. I&apos;m dedicated to
            staying updated with the latest in digital arts and technology, aiming to merge my
            technical expertise with my creative pursuits.
          </p>

          <Link href="/about">Learn more about me...</Link>
        </div>
      </div>
    </section>
  )
}
