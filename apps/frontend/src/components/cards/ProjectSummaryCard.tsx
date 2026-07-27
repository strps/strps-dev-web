import { Eyebrow } from '@/components/primitives/Eyebrow'
import { LinkArrow } from '@/components/primitives/LinkArrow'
import { StackChip } from '@/components/primitives/StackChip'
import { defaultLocale, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'

export interface ProjectSummaryCardProps {
    number: string
    tag?: string | null
    title: string
    problem?: string | null
    contribution?: string | null
    stack?: string[]
    caseStudyHref?: string | null
    locale?: Locale
}

/** The home projects grid card (§3.4): tag + /id, title, problem/solution pair, stack chips, case-study link. */
export function ProjectSummaryCard({
    number,
    tag,
    title,
    problem,
    contribution,
    stack = [],
    caseStudyHref,
    locale = defaultLocale,
}: ProjectSummaryCardProps) {
    const dictionary = getDictionary(locale)
    return (
        <div className="flex h-full flex-col px-7 py-7.5">
            <div className="flex items-baseline justify-between">
                {tag && <Eyebrow>{tag}</Eyebrow>}
                <Eyebrow>/{number}</Eyebrow>
            </div>
            <h3 className="mt-3.5 text-[19px] font-medium">{title}</h3>
            {problem && (
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    <b className="font-medium text-foreground">{dictionary.common.problem}</b>
                    {problem}
                </p>
            )}
            {contribution && (
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    <b className="font-medium text-foreground">{dictionary.common.whatIDid}</b>
                    {contribution}
                </p>
            )}
            {stack.length > 0 && (
                <div className="mt-4.5 flex flex-wrap gap-2">
                    {stack.map((s) => (
                        <StackChip key={s}>{s}</StackChip>
                    ))}
                </div>
            )}
            {caseStudyHref && (
                <div className="mt-5">
                    <LinkArrow href={caseStudyHref}>{dictionary.common.viewCaseStudy} →</LinkArrow>
                </div>
            )}
        </div>
    )
}
