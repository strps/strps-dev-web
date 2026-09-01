import React, { Fragment } from 'react'

import HeroSection from '@/components/page-sections/hero-exp'
import AboutSection from '@/components/page-sections/about'
import SkillsSection from '@/components/page-sections/skills'
import ProjectTeaserSection from '@/components/page-sections/projects-teaser'
import ExperienceSection from '@/components/page-sections/experience'
import ContactSection from '@/components/page-sections/contact'
import BlogSection from '@/components/page-sections/blog'
import FormSection from '@/components/page-sections/form'
import ServicesSection from '@/components/page-sections/services'
import ServicesHeroSection from '@/components/page-sections/services-hero'
import ProcessSection from '@/components/page-sections/process'
import FaqSection from '@/components/page-sections/faq'
import ServicesTeaserSection from '@/components/page-sections/services-teaser'
import LabTeaserSection from '@/components/page-sections/lab-teaser'
import type { Page } from '@strps-website/types'
import type { Locale } from '@/i18n/config'

const blockComponents: Record<string, React.FC<any>> = {
    pageHero: HeroSection,
    pageAbout: AboutSection,
    pageSkills: SkillsSection,
    pageProjectsTeaser: ProjectTeaserSection,
    pageExperience: ExperienceSection,
    pageContact: ContactSection,
    pageBlog: BlogSection,
    formBlock: FormSection,
    pageServicesHero: ServicesHeroSection,
    pageServices: ServicesSection,
    pageProcess: ProcessSection,
    pageFaq: FaqSection,
    pageServicesTeaser: ServicesTeaserSection,
    pageLabTeaser: LabTeaserSection,
}

export const RenderBlocks: React.FC<{ blocks: Page['layout']; locale: Locale }> = ({ blocks, locale }) => {
    if (!blocks?.length) return null

    return (
        <Fragment>
            {blocks.map((block, index) => {
                const { blockType } = block

                if (blockType && blockType in blockComponents) {
                    const Block = blockComponents[blockType]
                    return (
                        <div key={index}>
                            <Block {...block} locale={locale} />
                        </div>
                    )
                }
                return null
            })}
        </Fragment>
    )
}
