import type { RequiredDataFromCollectionSlug } from 'payload'

import { doc, h2, p, ul } from './lexical'

type DocSeed = Omit<RequiredDataFromCollectionSlug<'docs'>, 'createdAt' | 'updatedAt' | 'id'>

/* -------------------------------------------------------------------------- */
/*  Legal documents (`/docs/[slug]`).                                          */
/*                                                                             */
/*  ⚠️  The copy below is generic boilerplate written to give the collection    */
/*  a realistic shape and to make the route verifiable end-to-end. It is NOT   */
/*  legal advice and has not been reviewed by a lawyer. Replace it with        */
/*  reviewed text before the site handles real user data in production.        */
/*                                                                             */
/*  It does describe this site's actual stack accurately (Vercel hosting,      */
/*  Google reCAPTCHA on the contact form, Resend for delivery), so it is a     */
/*  usable starting point rather than lorem ipsum.                             */
/* -------------------------------------------------------------------------- */

const EFFECTIVE_DATE = '2026-01-01T00:00:00.000Z'

export const docsData: DocSeed[] = [
    {
        title: 'Privacy Policy',
        slug: 'privacy-policy',
        docType: 'privacy',
        version: '1.0',
        effectiveDate: EFFECTIVE_DATE,
        _status: 'published',
        content: doc(
            p(
                'This policy explains what personal information this site collects, why it is collected, and what you can do about it. It applies to strps.dev and every page served under it.',
            ),
            h2('Information collected'),
            p(
                'This site does not require an account and does not ask you to identify yourself in order to read it. Information reaches me in only two ways:',
            ),
            ul([
                'Contact form — the name, email address, and message you choose to submit.',
                'Standard server logs — the hosting provider records request metadata such as IP address, user agent, and requested path.',
            ]),
            h2('How it is used'),
            p(
                'Contact form submissions are used to reply to you and for nothing else. They are not sold, rented, or shared for advertising. Server logs are used to keep the site available and to investigate errors and abuse.',
            ),
            h2('Third-party services'),
            p('A small number of processors handle data on my behalf:'),
            ul([
                'Vercel — hosting and content delivery; processes request logs.',
                'Google reCAPTCHA — protects the contact form from automated submissions; subject to Google’s own privacy policy and terms.',
                'Resend — delivers contact form submissions to my inbox.',
            ]),
            h2('Cookies'),
            p(
                'This site sets a cookie to remember your language preference. Google reCAPTCHA may set its own cookies when the contact form loads. See the Cookie Policy for detail.',
            ),
            h2('Retention'),
            p(
                'Contact form messages are kept as long as they remain useful for correspondence, then deleted. Server logs are retained according to the hosting provider’s own retention schedule.',
            ),
            h2('Your rights'),
            p(
                'You can ask what information I hold about you, ask for it to be corrected, or ask for it to be deleted. Write to me using the contact form or the email address on the contact section and I will respond within a reasonable period.',
            ),
            h2('Changes'),
            p(
                'If this policy changes materially, the effective date above is updated and the revised version is published here. Continued use of the site after that date means you accept the revised policy.',
            ),
        ),
        meta: {
            title: 'Privacy Policy | Cesar Jerez',
            description:
                'What personal information this site collects, how it is used, and the third-party services involved.',
        },
    },
    {
        title: 'Terms of Service',
        slug: 'terms-of-service',
        docType: 'terms',
        version: '1.0',
        effectiveDate: EFFECTIVE_DATE,
        _status: 'published',
        content: doc(
            p(
                'These terms govern your use of this site. By browsing it or submitting the contact form, you agree to them. If you do not agree, please do not use the site.',
            ),
            h2('Use of the site'),
            p(
                'You may read, link to, and share this site freely. You may not use it to break the law, to attempt to gain unauthorised access to it or its infrastructure, or to interfere with its availability for anyone else.',
            ),
            h2('Intellectual property'),
            p(
                'The writing, design, and original code published here are mine unless stated otherwise. Code samples and any repository published under an open-source licence are governed by that licence, which takes precedence over this section. For anything else, ask before republishing more than a short quotation with attribution.',
            ),
            h2('Third-party links'),
            p(
                'This site links to external sites and services I do not control. Those links are not an endorsement, and I am not responsible for their content, terms, or privacy practices.',
            ),
            h2('No warranty'),
            p(
                'The site and its content are provided as is, without warranty of any kind. Articles and project write-ups describe what worked in a particular context; they are not professional advice and may become outdated. Verify anything you intend to rely on.',
            ),
            h2('Limitation of liability'),
            p(
                'To the fullest extent permitted by law, I am not liable for any indirect or consequential loss arising from your use of, or inability to use, this site.',
            ),
            h2('Changes'),
            p(
                'These terms may be revised. The effective date above reflects the current version, and continued use of the site after a revision means you accept it.',
            ),
        ),
        meta: {
            title: 'Terms of Service | Cesar Jerez',
            description: 'The terms governing use of this site, its content, and its contact form.',
        },
    },
    {
        title: 'Cookie Policy',
        slug: 'cookie-policy',
        docType: 'cookies',
        version: '1.0',
        effectiveDate: EFFECTIVE_DATE,
        _status: 'published',
        content: doc(
            p(
                'Cookies are small files a site stores in your browser so it can remember something between requests. This site uses as few as it can.',
            ),
            h2('What this site sets'),
            ul([
                'Language preference — remembers whether you are reading the English or Spanish version so you are not redirected on every visit. Strictly functional.',
                'Theme preference — remembers light or dark mode. Strictly functional.',
            ]),
            h2('What third parties set'),
            p(
                'Google reCAPTCHA sets its own cookies when the contact form loads, in order to tell human submissions from automated ones. These are governed by Google’s privacy policy, not by this one. No advertising or cross-site tracking cookies are used on this site.',
            ),
            h2('Managing cookies'),
            p(
                'Every major browser lets you view, block, and delete cookies in its settings. Blocking the functional cookies above will not break the site — it will simply forget your language and theme between visits. Blocking reCAPTCHA’s cookies may prevent the contact form from submitting.',
            ),
            h2('Changes'),
            p(
                'If the set of cookies used here changes, this page and the effective date above are updated.',
            ),
        ),
        meta: {
            title: 'Cookie Policy | Cesar Jerez',
            description: 'The cookies this site sets, why they exist, and how to control them.',
        },
    },
]

/* -------------------------------------------------------------------------- */
/*  Spanish (es) patches — localized fields only, in the same order as above.  */
/*  Rich text is replaced wholesale on the es write (see localize.ts).         */
/* -------------------------------------------------------------------------- */

export const docsDataES = [
    {
        title: 'Política de Privacidad',
        content: doc(
            p(
                'Esta política explica qué información personal recopila este sitio, por qué la recopila y qué puedes hacer al respecto. Aplica a strps.dev y a todas las páginas servidas bajo ese dominio.',
            ),
            h2('Información recopilada'),
            p(
                'Este sitio no requiere una cuenta ni te pide identificarte para leerlo. La información llega hasta mí de solo dos maneras:',
            ),
            ul([
                'Formulario de contacto — el nombre, correo electrónico y mensaje que decidas enviar.',
                'Registros del servidor — el proveedor de hosting registra metadatos de cada petición, como la dirección IP, el agente de usuario y la ruta solicitada.',
            ]),
            h2('Cómo se utiliza'),
            p(
                'Los mensajes del formulario de contacto se usan para responderte y para nada más. No se venden, alquilan ni comparten con fines publicitarios. Los registros del servidor sirven para mantener el sitio disponible e investigar errores y abusos.',
            ),
            h2('Servicios de terceros'),
            p('Un número reducido de proveedores procesa datos en mi nombre:'),
            ul([
                'Vercel — hosting y red de distribución de contenido; procesa los registros de peticiones.',
                'Google reCAPTCHA — protege el formulario de contacto frente a envíos automatizados; sujeto a la política de privacidad y los términos de Google.',
                'Resend — entrega los envíos del formulario de contacto a mi bandeja de entrada.',
            ]),
            h2('Cookies'),
            p(
                'Este sitio guarda una cookie para recordar tu preferencia de idioma. Google reCAPTCHA puede establecer sus propias cookies al cargar el formulario de contacto. Consulta la Política de Cookies para más detalle.',
            ),
            h2('Conservación'),
            p(
                'Los mensajes del formulario de contacto se conservan mientras sigan siendo útiles para la correspondencia y luego se eliminan. Los registros del servidor se conservan según el calendario de retención del proveedor de hosting.',
            ),
            h2('Tus derechos'),
            p(
                'Puedes preguntar qué información tengo sobre ti, pedir que se corrija o pedir que se elimine. Escríbeme mediante el formulario de contacto o la dirección de correo de la sección de contacto y responderé en un plazo razonable.',
            ),
            h2('Cambios'),
            p(
                'Si esta política cambia de forma sustancial, se actualiza la fecha de vigencia indicada arriba y se publica aquí la versión revisada. Seguir usando el sitio después de esa fecha implica que aceptas la política revisada.',
            ),
        ),
        meta: {
            title: 'Política de Privacidad | Cesar Jerez',
            description:
                'Qué información personal recopila este sitio, cómo se utiliza y qué servicios de terceros intervienen.',
        },
    },
    {
        title: 'Términos de Servicio',
        content: doc(
            p(
                'Estos términos rigen tu uso de este sitio. Al navegarlo o enviar el formulario de contacto, los aceptas. Si no estás de acuerdo, por favor no uses el sitio.',
            ),
            h2('Uso del sitio'),
            p(
                'Puedes leer, enlazar y compartir este sitio libremente. No puedes usarlo para infringir la ley, intentar acceder sin autorización a él o a su infraestructura, ni interferir con su disponibilidad para otras personas.',
            ),
            h2('Propiedad intelectual'),
            p(
                'Los textos, el diseño y el código original publicados aquí son míos salvo que se indique lo contrario. Los ejemplos de código y cualquier repositorio publicado bajo una licencia de código abierto se rigen por esa licencia, que prevalece sobre esta sección. Para todo lo demás, consúltame antes de republicar más que una cita breve con atribución.',
            ),
            h2('Enlaces de terceros'),
            p(
                'Este sitio enlaza a sitios y servicios externos que no controlo. Esos enlaces no constituyen un respaldo, y no soy responsable de su contenido, sus términos ni sus prácticas de privacidad.',
            ),
            h2('Sin garantías'),
            p(
                'El sitio y su contenido se ofrecen tal cual, sin garantía de ningún tipo. Los artículos y las fichas de proyecto describen lo que funcionó en un contexto concreto; no son asesoramiento profesional y pueden quedar desactualizados. Verifica cualquier cosa en la que pretendas basarte.',
            ),
            h2('Limitación de responsabilidad'),
            p(
                'En la máxima medida permitida por la ley, no soy responsable de ningún daño indirecto o consecuente derivado del uso, o la imposibilidad de uso, de este sitio.',
            ),
            h2('Cambios'),
            p(
                'Estos términos pueden revisarse. La fecha de vigencia indicada arriba corresponde a la versión actual, y seguir usando el sitio tras una revisión implica que la aceptas.',
            ),
        ),
        meta: {
            title: 'Términos de Servicio | Cesar Jerez',
            description:
                'Los términos que rigen el uso de este sitio, su contenido y su formulario de contacto.',
        },
    },
    {
        title: 'Política de Cookies',
        content: doc(
            p(
                'Las cookies son pequeños archivos que un sitio guarda en tu navegador para recordar algo entre peticiones. Este sitio usa las menos posibles.',
            ),
            h2('Lo que establece este sitio'),
            ul([
                'Preferencia de idioma — recuerda si lees la versión en inglés o en español para no redirigirte en cada visita. Estrictamente funcional.',
                'Preferencia de tema — recuerda el modo claro u oscuro. Estrictamente funcional.',
            ]),
            h2('Lo que establecen terceros'),
            p(
                'Google reCAPTCHA establece sus propias cookies al cargar el formulario de contacto, para distinguir los envíos humanos de los automatizados. Se rigen por la política de privacidad de Google, no por esta. En este sitio no se usan cookies publicitarias ni de seguimiento entre sitios.',
            ),
            h2('Gestionar las cookies'),
            p(
                'Todos los navegadores principales permiten ver, bloquear y eliminar cookies desde su configuración. Bloquear las cookies funcionales anteriores no romperá el sitio — simplemente olvidará tu idioma y tu tema entre visitas. Bloquear las cookies de reCAPTCHA puede impedir el envío del formulario de contacto.',
            ),
            h2('Cambios'),
            p(
                'Si cambia el conjunto de cookies utilizado aquí, se actualizan esta página y la fecha de vigencia indicada arriba.',
            ),
        ),
        meta: {
            title: 'Política de Cookies | Cesar Jerez',
            description: 'Las cookies que establece este sitio, por qué existen y cómo controlarlas.',
        },
    },
]
