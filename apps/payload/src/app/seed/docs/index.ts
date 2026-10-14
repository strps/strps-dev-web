import { cookiePolicy } from './cookie-policy'
import { legalNotice } from './legal-notice'
import { privacyPolicy } from './privacy-policy'
import { termsOfService } from './terms-of-service'

/**
 * Legal documents (`/docs/[slug]`), one file per document. Inventory, rationale,
 * and open items: docs/dev/legal/compliance-tracker.md.
 *
 * The seed creates missing documents and rewrites existing ones whose stored
 * `version` differs from the one here — so bump `version` to push revised copy.
 */
export const legalDocs = [privacyPolicy, termsOfService, cookiePolicy, legalNotice]
