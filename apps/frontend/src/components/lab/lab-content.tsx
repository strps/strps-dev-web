import { Fragment } from 'react';
import Link from 'next/link';
import Section from '@/components/page-sections';
import { localizedHref, type Locale } from '@/i18n/config';
import type { LabSection, RichText as RichTextSegments } from '@/app/(website)/[locale]/lab/types';

const codeClass = 'px-1.5 py-0.5 rounded bg-muted text-xs';
const linkClass = 'text-primary underline underline-offset-4 hover:no-underline';

/**
 * Renders one run of inline segments — plain text plus the `<code>`/`<strong>`/
 * link markup the narrative prose carries. Internal links are locale-prefixed
 * via `localizedHref`; `external` links open in a new tab.
 */
export function RichText({
  segments,
  locale,
}: {
  segments: RichTextSegments;
  locale: Locale;
}) {
  return (
    <>
      {segments.map((seg, i) => {
        if (typeof seg === 'string') return <Fragment key={i}>{seg}</Fragment>;
        if ('code' in seg)
          return (
            <code key={i} className={codeClass}>
              {seg.code}
            </code>
          );
        if ('strong' in seg)
          return (
            <strong key={i} className="text-foreground">
              {seg.strong}
            </strong>
          );

        // Link segment.
        if (seg.external) {
          return (
            <a
              key={i}
              href={seg.href}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              {seg.link}
            </a>
          );
        }
        return (
          <Link key={i} href={localizedHref(locale, seg.href)} className={linkClass}>
            {seg.link}
          </Link>
        );
      })}
    </>
  );
}

/**
 * Renders the below-the-hero narrative of a lab item from its localized
 * `sections`, reproducing the prose layout the item pages used to hardcode.
 */
export function LabSections({
  sections,
  locale,
}: {
  sections: LabSection[];
  locale: Locale;
}) {
  return (
    <Section
      className="py-16"
      containerClassName="container mx-auto px-4 max-w-3xl space-y-10"
    >
      {sections.map((section, si) => (
        <section
          key={si}
          className={section.topBorder ? 'space-y-4 border-t border-border pt-8' : 'space-y-4'}
        >
          <h2 className="text-2xl font-bold">{section.heading}</h2>
          {section.blocks.map((block, bi) =>
            block.type === 'p' ? (
              <p key={bi} className="text-muted-foreground leading-relaxed">
                <RichText segments={block.content} locale={locale} />
              </p>
            ) : (
              <ul key={bi} className="text-muted-foreground space-y-2 list-disc pl-6">
                {block.items.map((item, ii) => (
                  <li key={ii}>
                    <RichText segments={item} locale={locale} />
                  </li>
                ))}
              </ul>
            ),
          )}
        </section>
      ))}
    </Section>
  );
}
