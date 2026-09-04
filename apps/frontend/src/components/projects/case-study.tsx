import { Eyebrow } from '@/components/primitives/Eyebrow'
import { cn } from '@/lib/utils'
import { defaultLocale, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'
import type { Project } from '@strps-website/types'

/**
 * The `caseStudy` group rendered as hairline-ruled label/prose rows — the same
 * anatomy the process strip and skills list use, so a case study reads as part
 * of the site rather than as free-floating body copy.
 *
 * Renders nothing when the project carries no case-study prose (the tag/year
 * live in the header, not here), so an unseeded project just shows its own
 * rich-text content.
 */
export function CaseStudy({
  caseStudy,
  locale = defaultLocale,
  className,
}: {
  caseStudy: Project['caseStudy']
  locale?: Locale
  className?: string
}) {
  const dictionary = getDictionary(locale)

  const rows = [
    { label: dictionary.projects.problem, value: caseStudy?.problem },
    { label: dictionary.projects.contribution, value: caseStudy?.contribution },
    { label: dictionary.projects.context, value: caseStudy?.context },
    { label: dictionary.projects.decisions, value: caseStudy?.decisions },
    { label: dictionary.projects.outcome, value: caseStudy?.outcome },
  ].filter((row): row is { label: string; value: string } => Boolean(row.value))

  if (rows.length === 0) return null

  return (
    <section className={cn('flex flex-col', className)}>
      <div className="border-b border-border pb-2">
        <h2 className="text-2xl font-medium tracking-[-0.01em]">{dictionary.projects.caseStudy}</h2>
      </div>
      <dl className="flex flex-col">
        {rows.map(({ label, value }) => (
          <div
            key={label}
            className="grid gap-2 border-b border-border py-5 min-[721px]:grid-cols-[10rem_1fr] min-[721px]:gap-8"
          >
            <dt>
              <Eyebrow>{label}</Eyebrow>
            </dt>
            <dd className="text-[15px] leading-relaxed text-muted-foreground">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
