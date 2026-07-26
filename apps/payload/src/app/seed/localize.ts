import type { Payload } from 'payload'

/**
 * Locale-aware seeding helpers (i18n §3.1).
 *
 * Once fields are `localized: true`, a plain `create` / `updateGlobal` writes only
 * the default locale (`en`). Spanish needs a *second* write to the same doc with
 * `locale: 'es'`. The catch: localized fields living inside non-localized arrays /
 * blocks are keyed by the array-row `id` Payload assigns on the `en` create — so the
 * `es` pass must send those same ids or Payload creates new rows and the `en` values
 * are lost.
 *
 * `deepMergeLocalized` overlays a Spanish *patch* (localized fields only, same nested
 * shape as the `en` data) onto the document Payload returned from the `en` write —
 * which already carries every row id and all shared config. The result is a full doc,
 * identical to `en` except for the translated leaves, safe to write back at `locale:
 * 'es'` without clobbering shared structure.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
type Json = any

const isPlainObject = (v: Json): v is Record<string, Json> =>
  v !== null && typeof v === 'object' && !Array.isArray(v)

/** A Lexical rich-text value — merged wholesale, never structurally zipped. */
const isLexical = (v: Json): boolean => isPlainObject(v) && 'root' in v

/**
 * Merge `patch` onto `base`:
 * - arrays zip by index (row ids from `base` are preserved; unpatched items kept as-is)
 * - rich-text values (`{ root }`) are replaced wholesale
 * - other objects merge key-by-key; scalars in `patch` win
 * - keys absent from `patch` keep their `base` value (shared config, ids, etc.)
 */
export function deepMergeLocalized(base: Json, patch: Json): Json {
  if (patch === undefined) return base
  if (Array.isArray(base) && Array.isArray(patch)) {
    return base.map((item, i) => (i < patch.length ? deepMergeLocalized(item, patch[i]) : item))
  }
  if (isLexical(patch)) return patch
  if (isPlainObject(base) && isPlainObject(patch)) {
    const out: Record<string, Json> = { ...base }
    for (const key of Object.keys(patch)) {
      out[key] = key in base ? deepMergeLocalized(base[key], patch[key]) : patch[key]
    }
    return out
  }
  return patch
}

/** Strip fields Payload manages itself so they aren't echoed back on the `es` write. */
const stripManaged = (doc: Json): Json => {
  const { id: _id, createdAt: _c, updatedAt: _u, ...rest } = doc
  return rest
}

/** Create a collection doc in `en`, then write its Spanish translation at `locale: 'es'`. */
export async function seedLocalizedDoc<TSlug extends 'pages' | 'projects' | 'forms'>(
  payload: Payload,
  collection: TSlug,
  enData: Json,
  esPatch: Json,
) {
  const created = await payload.create({ collection, data: enData, depth: 0 })
  const esData = deepMergeLocalized(stripManaged(created), esPatch)
  await payload.update({ collection, id: created.id, data: esData, locale: 'es', depth: 0 })
  return created
}

/** Update a global in `en`, then write its Spanish translation at `locale: 'es'`. */
export async function seedLocalizedGlobal(
  payload: Payload,
  slug: 'header' | 'footer' | 'copyright',
  enData: Json,
  esPatch: Json,
) {
  const en = await payload.updateGlobal({ slug, data: enData, depth: 0 })
  const esData = deepMergeLocalized(stripManaged(en), esPatch)
  await payload.updateGlobal({ slug, data: esData, locale: 'es', depth: 0 })
  return en
}
