import type { DataFromGlobalSlug } from 'payload'

type HeaderSeed = Omit<DataFromGlobalSlug<'header'>, 'id'>
type FooterSeed = Omit<DataFromGlobalSlug<'footer'>, 'id'>
type CopyrightSeed = Omit<DataFromGlobalSlug<'copyright'>, 'id'>

export const headerData: HeaderSeed = {
    navItems: [
        {
            link: {
                type: 'custom',
                url: '/services',
                label: 'Services',
                newTab: false,
            },
        },
        {
            link: {
                type: 'custom',
                url: '/projects',
                label: 'Projects',
                newTab: false,
            },
        },
        {
            link: {
                type: 'custom',
                url: '/lab',
                label: 'Lab',
                newTab: false,
            },
        },
        {
            link: {
                type: 'custom',
                url: '/blog',
                label: 'Blog',
                newTab: false,
            },
        },
        {
            link: {
                type: 'custom',
                url: '/#contact',
                label: 'Contact',
                newTab: false,
                appearance: 'outlineGhost',
            },
        },
    ],
    theme: 'auto',
    background: false,
    overlay: false,
}

/**
 * The footer nav links the two headline legal documents as *internal references*
 * rather than hardcoded URLs, so the slugs stay resolvable if they are ever
 * renamed. The ids come from the `docs` seed, which therefore has to run first
 * (see `route.ts`). The Cookie Policy is deliberately left out — `navItems` caps
 * at 6 rows, and it is reachable from `/docs` and from within the privacy policy.
 */
export const getFooterData = (docIds: { privacy: number | string; terms: number | string }): FooterSeed => ({
    navItems: [
        {
            link: {
                type: 'custom',
                url: '/about',
                label: 'About',
                newTab: false,
            },
        },
        {
            link: {
                type: 'custom',
                url: 'https://github.com/strps',
                label: 'GitHub',
                newTab: true,
            },
        },
        {
            link: {
                type: 'custom',
                url: 'https://www.linkedin.com/in/cesar-jerez-e/',
                label: 'LinkedIn',
                newTab: true,
            },
        },
        {
            link: {
                type: 'reference',
                reference: { relationTo: 'docs', value: docIds.privacy },
                label: 'Privacy Policy',
                newTab: false,
            },
        },
        {
            link: {
                type: 'reference',
                reference: { relationTo: 'docs', value: docIds.terms },
                label: 'Terms of Service',
                newTab: false,
            },
        },
    ],
})

export const copyrightData: CopyrightSeed = {
    name: 'CESAR JEREZ',
    startDate: '2024-01-01T00:00:00.000Z',
    link: 'https://www.strps.dev',
    location: 'San José, CR · GMT-6',
}

/* -------------------------------------------------------------------------- */
/*  Spanish (es) patches — localized fields only, same nested shape.          */
/*  Merged onto the created doc by index (see localize.ts).                    */
/* -------------------------------------------------------------------------- */

export const headerDataES = {
    navItems: [
        { link: { label: 'Servicios' } },
        { link: { label: 'Proyectos' } },
        { link: { label: 'Lab' } },
        { link: { label: 'Blog' } },
        { link: { label: 'Contacto' } },
    ],
}

export const footerDataES = {
    navItems: [
        { link: { label: 'Sobre mí' } },
        { link: { label: 'GitHub' } },
        { link: { label: 'LinkedIn' } },
        { link: { label: 'Política de Privacidad' } },
        { link: { label: 'Términos de Servicio' } },
    ],
}

export const copyrightDataES = {
    location: 'San José, CR · GMT-6',
}
