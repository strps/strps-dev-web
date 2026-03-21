import React, { Fragment } from 'react'

import HeroSection from '@/components/page-sections/hero'
import AboutSection from '@/components/page-sections/about'
import SkillsSection from '@/components/page-sections/skills'
import ProjectsSection from '@/components/page-sections/projects'
import ExperienceSection from '@/components/page-sections/experience'
import ContactSection from '@/components/page-sections/contact'
import BlogSection from '@/components/page-sections/blog'
import FormSection from '@/components/page-sections/form'
import type { Page } from '@strps-website/types'

const blockComponents: Record<string, React.FC<any>> = {
    pageHero: HeroSection,
    pageAbout: AboutSection,
    pageSkills: SkillsSection,
    pageProjects: ProjectsSection,
    pageExperience: ExperienceSection,
    pageContact: ContactSection,
    pageBlog: BlogSection,
    formBlock: FormSection,
}

export const RenderBlocks: React.FC<{ blocks: Page['layout'] }> = ({ blocks }) => {
    if (!blocks?.length) return null

    return (
        <Fragment>
            {blocks.map((block, index) => {
                const { blockType } = block

                if (blockType && blockType in blockComponents) {
                    const Block = blockComponents[blockType]
                    return (
                        <div key={index}>
                            <Block {...block} />
                        </div>
                    )
                }
                return null
            })}
        </Fragment>
    )
}
