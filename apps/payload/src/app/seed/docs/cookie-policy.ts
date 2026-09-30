import { doc, h2, link, p, pl, ul } from '../lexical'
import { docHref, EFFECTIVE_DATE, OWNER, type LegalDocSeed } from './shared'

/**
 * Cookie Policy — ePrivacy-style disclosure of every cookie and local-storage key.
 * Everything first-party is strictly necessary, so no consent banner is needed; the
 * day a non-essential cookie is added, a banner becomes mandatory (see the tracker).
 * Not in the footer (nav caps at 6 rows) — linked from the privacy policy and `/docs`.
 */
export const cookiePolicy: LegalDocSeed = {
    en: {
        title: 'Cookie Policy',
        slug: 'cookie-policy',
        docType: 'cookies',
        version: '2.0',
        effectiveDate: EFFECTIVE_DATE,
        _status: 'published',
        content: doc(
            p(
                'Cookies are small files a site stores in your browser so it can remember something between visits. Browsers also offer “local storage”, which works similarly. This page lists everything this site stores on your device, and why.',
            ),
            h2('Essential storage set by this site'),
            ul([
                'NEXT_LOCALE (cookie, 1 year) — remembers whether you read the site in English or Spanish, so you are not redirected on every visit.',
                'theme (local storage, until you clear it) — remembers your light or dark mode choice. It never leaves your browser.',
            ]),
            p(
                'Both are strictly necessary for features you ask for, contain no personal information, and are never used to track you. The law does not require consent for this kind of storage, so this site does not show a cookie banner.',
            ),
            h2('Storage set by third parties'),
            p(
                'Google reCAPTCHA is used only on forms where it has been switched on. On those pages it may set its own cookies (such as _GRECAPTCHA) and read browser information to tell people from automated bots. That storage is governed by Google’s privacy policy, not this one, and a notice appears under the form whenever reCAPTCHA is active.',
            ),
            p(
                'This site uses no analytics, advertising, or cross-site tracking cookies. If that ever changes, you will be asked for consent before any such cookie is set, and this page will be updated first.',
            ),
            h2('Managing cookies'),
            p(
                'Every major browser lets you view, block, and delete cookies and site data in its settings. Blocking the essential storage above will not break the site; it will only forget your language and theme between visits. Blocking reCAPTCHA may prevent forms that use it from being sent.',
            ),
            h2('Changes'),
            p('If the storage used here changes, this page, its version, and its effective date are updated.'),
            pl('Related: ', link('Privacy Policy', docHref('en', 'privacy-policy'))),
        ),
        meta: {
            title: `Cookie Policy | ${OWNER}`,
            description: 'Every cookie and local-storage item this site uses, why it exists, and how to control it.',
        },
    },
    es: {
        title: 'Política de Cookies',
        content: doc(
            p(
                'Las cookies son pequeños archivos que un sitio guarda en tu navegador para recordar algo entre visitas. Los navegadores también ofrecen el «almacenamiento local», que funciona de forma parecida. Esta página enumera todo lo que este sitio guarda en tu dispositivo y por qué.',
            ),
            h2('Almacenamiento esencial de este sitio'),
            ul([
                'NEXT_LOCALE (cookie, 1 año) — recuerda si lees el sitio en inglés o en español, para no redirigirte en cada visita.',
                'theme (almacenamiento local, hasta que lo borres) — recuerda tu elección de modo claro u oscuro. Nunca sale de tu navegador.',
            ]),
            p(
                'Ambos son estrictamente necesarios para funciones que tú solicitas, no contienen información personal y nunca se usan para rastrearte. La ley no exige consentimiento para este tipo de almacenamiento, por lo que este sitio no muestra un aviso de cookies.',
            ),
            h2('Almacenamiento de terceros'),
            p(
                'Google reCAPTCHA se usa solo en los formularios donde está activado. En esas páginas puede establecer sus propias cookies (como _GRECAPTCHA) y leer información del navegador para distinguir a las personas de los bots automatizados. Ese almacenamiento se rige por la política de privacidad de Google, no por esta, y siempre que reCAPTCHA está activo aparece un aviso debajo del formulario.',
            ),
            p(
                'Este sitio no usa cookies de analítica, publicidad ni seguimiento entre sitios. Si eso cambiara, se te pedirá consentimiento antes de establecer cualquiera de ellas, y esta página se actualizará primero.',
            ),
            h2('Gestionar las cookies'),
            p(
                'Todos los navegadores principales permiten ver, bloquear y eliminar cookies y datos de sitios desde su configuración. Bloquear el almacenamiento esencial anterior no romperá el sitio; solo olvidará tu idioma y tu tema entre visitas. Bloquear reCAPTCHA puede impedir el envío de los formularios que lo usan.',
            ),
            h2('Cambios'),
            p('Si cambia el almacenamiento utilizado aquí, se actualizan esta página, su versión y su fecha de vigencia.'),
            pl('Relacionado: ', link('Política de Privacidad', docHref('es', 'privacy-policy'))),
        ),
        meta: {
            title: `Política de Cookies | ${OWNER}`,
            description:
                'Cada cookie y elemento de almacenamiento local que usa este sitio, por qué existe y cómo controlarlo.',
        },
    },
}
