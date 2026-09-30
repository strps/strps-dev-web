import { doc, h2, link, p, pl, ul } from '../lexical'
import { CONTACT_EMAIL, docHref, EFFECTIVE_DATE, OWNER, SITE, type LegalDocSeed } from './shared'

/**
 * Terms of Service — not legally mandatory for a portfolio, but it is what limits
 * liability, reserves the IP, and keeps client work out of the website's terms.
 */
export const termsOfService: LegalDocSeed = {
    en: {
        title: 'Terms of Service',
        slug: 'terms-of-service',
        docType: 'terms',
        version: '2.0',
        effectiveDate: EFFECTIVE_DATE,
        _status: 'published',
        content: doc(
            p(
                `These terms govern your use of ${SITE}, the professional portfolio of ${OWNER}. By using the site you agree to them. If you do not agree, please do not use it.`,
            ),
            h2('Using the site'),
            p(
                'You may read, link to, and share pages from this site freely. You may not use it to break the law, send spam or malicious content through its forms, attempt to access it or its infrastructure without authorization, scrape it in a way that degrades it, or interfere with its availability for others.',
            ),
            h2('Enquiries and client work'),
            ul([
                'Sending a message through the contact form does not create a contract or any obligation for either side.',
                'Any paid work is governed only by a separate written proposal or agreement accepted by both parties. If that agreement and these terms conflict, the agreement prevails.',
                'Statements on the site about availability, prices, timelines, or services are general information, not a binding offer.',
            ]),
            h2('Intellectual property'),
            p(
                `Unless stated otherwise, the writing, design, images, and code on this site belong to ${OWNER}, and all rights are reserved. You may quote short passages with attribution and a link.`,
            ),
            ul([
                'Short code snippets shown inside articles may be reused in your own projects, at your own risk and without warranty.',
                'Repositories published under an open-source licence are governed by that licence, which prevails over this section.',
                'Client names, logos, and trademarks shown in case studies belong to their respective owners and are shown only to describe past work.',
            ]),
            h2('Third-party links'),
            p(
                'This site links to external sites and services that I do not control. A link is not an endorsement, and I am not responsible for their content, terms, or privacy practices.',
            ),
            h2('No warranty'),
            p(
                'The site and its content are provided “as is”, without warranty of any kind. Articles and project write-ups describe what worked in a particular context; they are not professional advice and may become outdated. Check anything before you rely on it. The site may change or be unavailable at any time.',
            ),
            h2('Limitation of liability'),
            p(
                'To the fullest extent the law allows, I am not liable for any indirect, incidental, or consequential loss, or for loss of data, profit, or business, arising from your use of, or inability to use, this site. Nothing in these terms limits any liability that cannot be limited by law, including your rights as a consumer.',
            ),
            h2('Governing law'),
            p(
                'These terms are governed by the laws of the Republic of Costa Rica. Any dispute will be handled by the competent courts of San José, Costa Rica, without depriving you of any mandatory protection given by the law of the country where you live.',
            ),
            h2('Language'),
            p(
                'These terms are published in English and Spanish. If the two versions differ, the Spanish version prevails.',
            ),
            h2('Changes and contact'),
            p(
                `These terms may be revised; the version and effective date at the top always show the current one, and revised terms apply from that date. Questions: ${CONTACT_EMAIL}.`,
            ),
            pl(
                'Related: ',
                link('Privacy Policy', docHref('en', 'privacy-policy')),
                ' · ',
                link('Legal Notice', docHref('en', 'legal-notice')),
            ),
        ),
        meta: {
            title: `Terms of Service | ${OWNER}`,
            description: 'The terms governing use of this site, its content, and its contact form.',
        },
    },
    es: {
        title: 'Términos de Servicio',
        content: doc(
            p(
                `Estos términos rigen tu uso de ${SITE}, el portafolio profesional de ${OWNER}. Al usar el sitio los aceptas. Si no estás de acuerdo, por favor no lo uses.`,
            ),
            h2('Uso del sitio'),
            p(
                'Puedes leer, enlazar y compartir las páginas de este sitio libremente. No puedes usarlo para infringir la ley, enviar spam o contenido malicioso mediante sus formularios, intentar acceder sin autorización a él o a su infraestructura, extraer su contenido de forma que lo degrade, ni interferir con su disponibilidad para otras personas.',
            ),
            h2('Consultas y trabajo con clientes'),
            ul([
                'Enviar un mensaje mediante el formulario de contacto no crea un contrato ni obligación alguna para ninguna de las partes.',
                'Cualquier trabajo remunerado se rige únicamente por una propuesta o acuerdo escrito aparte, aceptado por ambas partes. Si ese acuerdo y estos términos se contradicen, prevalece el acuerdo.',
                'Las afirmaciones del sitio sobre disponibilidad, precios, plazos o servicios son información general, no una oferta vinculante.',
            ]),
            h2('Propiedad intelectual'),
            p(
                `Salvo que se indique lo contrario, los textos, el diseño, las imágenes y el código de este sitio pertenecen a ${OWNER}, y todos los derechos están reservados. Puedes citar pasajes breves con atribución y un enlace.`,
            ),
            ul([
                'Los fragmentos breves de código que aparecen dentro de los artículos pueden reutilizarse en tus propios proyectos, bajo tu propio riesgo y sin garantía.',
                'Los repositorios publicados bajo una licencia de código abierto se rigen por esa licencia, que prevalece sobre esta sección.',
                'Los nombres, logotipos y marcas de clientes que aparecen en los casos de estudio pertenecen a sus respectivos titulares y se muestran solo para describir trabajos anteriores.',
            ]),
            h2('Enlaces de terceros'),
            p(
                'Este sitio enlaza a sitios y servicios externos que no controlo. Un enlace no constituye un respaldo, y no soy responsable de su contenido, sus términos ni sus prácticas de privacidad.',
            ),
            h2('Sin garantías'),
            p(
                'El sitio y su contenido se ofrecen «tal cual», sin garantía de ningún tipo. Los artículos y las fichas de proyecto describen lo que funcionó en un contexto concreto; no son asesoramiento profesional y pueden quedar desactualizados. Verifica cualquier cosa antes de basarte en ella. El sitio puede cambiar o no estar disponible en cualquier momento.',
            ),
            h2('Limitación de responsabilidad'),
            p(
                'En la máxima medida permitida por la ley, no soy responsable de ningún daño indirecto, incidental o consecuente, ni de pérdida de datos, ganancias o negocios, derivados del uso, o la imposibilidad de uso, de este sitio. Nada en estos términos limita una responsabilidad que la ley no permita limitar, incluidos tus derechos como consumidor.',
            ),
            h2('Ley aplicable'),
            p(
                'Estos términos se rigen por las leyes de la República de Costa Rica. Cualquier controversia será conocida por los tribunales competentes de San José, Costa Rica, sin privarte de ninguna protección obligatoria que te otorgue la ley del país donde resides.',
            ),
            h2('Idioma'),
            p(
                'Estos términos se publican en inglés y en español. Si las dos versiones difieren, prevalece la versión en español.',
            ),
            h2('Cambios y contacto'),
            p(
                `Estos términos pueden revisarse; la versión y la fecha de vigencia indicadas arriba muestran siempre la vigente, y los términos revisados se aplican desde esa fecha. Consultas: ${CONTACT_EMAIL}.`,
            ),
            pl(
                'Relacionado: ',
                link('Política de Privacidad', docHref('es', 'privacy-policy')),
                ' · ',
                link('Aviso Legal', docHref('es', 'legal-notice')),
            ),
        ),
        meta: {
            title: `Términos de Servicio | ${OWNER}`,
            description: 'Los términos que rigen el uso de este sitio, su contenido y su formulario de contacto.',
        },
    },
}
