import type { DataFromGlobalSlug } from 'payload'

type HeaderSeed = Omit<DataFromGlobalSlug<'header'>, 'id'>
type FooterSeed = Omit<DataFromGlobalSlug<'footer'>, 'id'>
type CopyrightSeed = Omit<DataFromGlobalSlug<'copyright'>, 'id'>

export const headerData: HeaderSeed = {
    navItems: [
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
                url: '/#experience',
                label: 'Experience',
                newTab: false,
            },
        },
        {
            link: {
                type: 'custom',
                url: '/#contact',
                label: 'Contact',
                newTab: false,
            },
        },
    ],
    theme: 'auto',
    background: false,
    overlay: false,
}

export const footerData: FooterSeed = {
    navItems: [
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
    ],
}

export const copyrightData: CopyrightSeed = {
    name: 'CESAR JEREZ',
    startDate: '2024-01-01T00:00:00.000Z',
    link: 'https://www.strps.dev',
}
