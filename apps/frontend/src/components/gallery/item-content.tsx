import { Fragment } from 'react';
import Link from 'next/link';
import Section from '@/components/page-sections/section';
import { localizedHref, type Locale } from '@/i18n/config';
import type { LabSection, RichText as RichTextSegments } from '@/app/(website)/[locale]/lab/types';

/** Mono, sharp-radius, `--border-strong` rim — the `<StackChip>` treatment at inline size. */
const codeClass =
  'rounded-sharp border border-border-strong px-1.5 py-0.5 font-mono text-[0.85em] text-foreground';
/** The `<LinkArrow>` treatment, inline: hairline underline, accent on hover. */
const linkClass =
  'border-b border-border-strong text-foreground no-underline transition-colors duration-150 hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2';

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
            <strong key={i} className="font-medium text-foreground">
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
 *
 * Headings are the section `h2` at weight 500, and the copy is measure-capped
 * inside the site-wide `max-w-wrap` gutter rather than carrying a `max-w-3xl`
 * of its own — mismatched section widths are the most visible failure mode.
 */
export function ItemSections({
  sections,
  locale,
}: {
  sections: LabSection[];
  locale: Locale;
}) {
  return (
    <Section
      container={false}
      containerClassName="mx-auto w-full max-w-wrap gap-12 px-6"
    >
      {sections.map((section, si) => (
        <section
          key={si}
          className={section.topBorder ? 'space-y-4 border-t border-border pt-8' : 'space-y-4'}
        >
          <h2 className="text-2xl font-medium tracking-[-0.01em]">{section.heading}</h2>
          {section.blocks.map((block, bi) =>
            block.type === 'p' ? (
              <p key={bi} className="max-w-[70ch] text-[15px] leading-[1.65] text-muted-foreground">
                <RichText segments={block.content} locale={locale} />
              </p>
            ) : (
              <ul
                key={bi}
                className="max-w-[70ch] list-disc space-y-2 pl-6 text-[15px] leading-[1.65] text-muted-foreground"
              >
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
