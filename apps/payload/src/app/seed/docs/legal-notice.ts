import { doc, h2, link, p, pl, ul } from '../lexical'
import { CONTACT_EMAIL, docHref, EFFECTIVE_DATE, OWNER, SITE, type LegalDocSeed } from './shared'

/**
 * Legal Notice (imprint / aviso legal) — identifies who operates the site. Not
 * strictly required for a Costa Rica–based operator, but it is the page EU/LatAm
 * visitors look for, and it names the identifiable controller Ley 8968 and GDPR
 * expect. Add the tax ID here once registered with Hacienda (see the tracker).
 */
export const legalNotice: LegalDocSeed = {
    en: {
        title: 'Legal Notice',
        slug: 'legal-notice',
        docType: 'other',
        version: '1.0',
        effectiveDate: EFFECTIVE_DATE,
        _status: 'published',
        content: doc(
            h2('Site operator'),
            ul([
                `Name: ${OWNER}`,
                'Activity: independent software developer (web development and related services)',
                'Location: San José, Costa Rica',
                `Email: ${CONTACT_EMAIL}`,
                `Website: https://www.${SITE}`,
            ]),
            p(
                `${OWNER} is responsible for the content of this site. The site is a professional portfolio: it presents past work, articles, and services, and it does not sell goods or services online.`,
            ),
            h2('Hosting'),
            p('The site is hosted by Vercel Inc., United States (vercel.com).'),
            h2('Language'),
            p(
                'The legal documents on this site are published in English and Spanish. If the two versions differ, the Spanish version prevails.',
            ),
            h2('Related documents'),
            pl(
                link('Privacy Policy', docHref('en', 'privacy-policy')),
                ' · ',
                link('Cookie Policy', docHref('en', 'cookie-policy')),
                ' · ',
                link('Terms of Service', docHref('en', 'terms-of-service')),
            ),
        ),
        meta: {
            title: `Legal Notice | ${OWNER}`,
            description: 'Who operates this site and how to contact them.',
        },
    },
    es: {
        title: 'Aviso Legal',
        content: doc(
            h2('Titular del sitio'),
            ul([
                `Nombre: ${OWNER}`,
                'Actividad: desarrollador de software independiente (desarrollo web y servicios relacionados)',
                'Ubicación: San José, Costa Rica',
                `Correo: ${CONTACT_EMAIL}`,
                `Sitio web: https://www.${SITE}`,
            ]),
            p(
                `${OWNER} es responsable del contenido de este sitio. El sitio es un portafolio profesional: presenta trabajos anteriores, artículos y servicios, y no vende bienes ni servicios en línea.`,
            ),
            h2('Alojamiento'),
            p('El sitio está alojado por Vercel Inc., Estados Unidos (vercel.com).'),
            h2('Idioma'),
            p(
                'Los documentos legales de este sitio se publican en inglés y en español. Si las dos versiones difieren, prevalece la versión en español.',
            ),
            h2('Documentos relacionados'),
            pl(
                link('Política de Privacidad', docHref('es', 'privacy-policy')),
                ' · ',
                link('Política de Cookies', docHref('es', 'cookie-policy')),
                ' · ',
                link('Términos de Servicio', docHref('es', 'terms-of-service')),
            ),
        ),
        meta: {
            title: `Aviso Legal | ${OWNER}`,
            description: 'Quién opera este sitio y cómo contactarlo.',
        },
    },
}
