import type { Locale } from '@/i18n/config';
import type { LabItemContent, LabSlug } from '../types';
import { labContentEn } from './en';
import { labContentEs } from './es';

const byLocale: Record<Locale, Record<LabSlug, LabItemContent>> = {
  en: labContentEn,
  es: labContentEs,
};

/**
 * Localized content for one lab item. Plain sync object access (same pattern as
 * `getDictionary`) so it's usable from both server pages and the `'use client'`
 * hero components that read `locale` via `useParams()`.
 */
export function getLabContent(locale: Locale, slug: LabSlug): LabItemContent {
  return byLocale[locale][slug];
}
