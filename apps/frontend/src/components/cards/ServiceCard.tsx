import { Check, ArrowUpRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CMSLink } from '@/components/cms-link'
import { cn } from '@/lib/utils'
import { defaultLocale, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'

export interface ServiceCardProps {
    index: number
    name: string
    forWho?: string | null
    features?: Array<{ feature?: string | null }> | null
    timeline?: string | null
    pricing?: string | null
    goodFitPoints?: Array<{ point?: string | null }> | null
    proofLabel?: string | null
    proofUrl?: string | null
    className?: string
    locale?: Locale
    /** `crystal` renders the card as liquid-crystal glass over the page background. */
    variant?: 'default' | 'crystal'
}

const MicroLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {children}
    </p>
)

export const ServiceCard: React.FC<ServiceCardProps> = ({
    index,
    name,
    forWho,
    features,
    timeline,
    pricing,
    goodFitPoints,
    proofLabel,
    proofUrl,
    className,
    locale = defaultLocale,
    variant = 'default',
}) => {
    const dictionary = getDictionary(locale)

    return (
        <Card
            variant={variant}
            className={cn(
                'group h-full gap-0 py-0 transition-colors duration-300',
                variant === 'crystal'
                    ? 'hover:border-crystal-edge-hover'
                    : 'shadow-none hover:border-foreground/30',
                className,
            )}
        >
            <CardHeader className="gap-3 px-7 pt-8 md:px-8">
                <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground">
                    {String(index + 1).padStart(2, '0')}
                </span>
                <CardTitle className="text-xl font-semibold tracking-tight md:text-2xl">
                    {name}
                </CardTitle>
                {forWho && (
                    <p className="text-sm leading-relaxed text-muted-foreground">{forWho}</p>
                )}
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-7 px-7 pt-7 pb-8 md:px-8">
                {features && features.length > 0 && (
                    <div className="space-y-3">
                        <MicroLabel>{dictionary.common.whatYouGet}</MicroLabel>
                        <ul className="space-y-2.5">
                            {features.map((item, i) => (
                                <li key={i} className="flex items-start gap-2.5">
                                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-foreground/70" />
                                    <span className="text-sm leading-relaxed text-muted-foreground">
                                        {item.feature}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {goodFitPoints && goodFitPoints.length > 0 && (
                    <div className="space-y-3">
                        <MicroLabel>{dictionary.common.goodFitIfThinking}</MicroLabel>
                        <div className="flex flex-wrap gap-2">
                            {goodFitPoints.map((item, i) => (
                                <Badge
                                    key={i}
                                    variant="outline"
                                    className="rounded-full px-3 py-1 font-normal text-muted-foreground"
                                >
                                    &ldquo;{item.point}&rdquo;
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}

                {proofUrl && (
                    <CMSLink
                        type="custom"
                        url={proofUrl}
                        label={proofLabel}
                        appearance="link"
                        className="h-auto w-fit gap-1 p-0 text-sm font-medium"
                    >
                        <ArrowUpRight className="h-3.5 w-3.5" />
                    </CMSLink>
                )}

                {(timeline || pricing) && (
                    <div className="mt-auto flex flex-wrap items-end justify-between gap-x-8 gap-y-4 border-t pt-6">
                        {pricing && (
                            <div className="space-y-1">
                                <MicroLabel>{dictionary.common.pricing}</MicroLabel>
                                <p className="text-base font-semibold tracking-tight">{pricing}</p>
                            </div>
                        )}
                        {timeline && (
                            <div className="space-y-1">
                                <MicroLabel>{dictionary.common.timeline}</MicroLabel>
                                <p className="text-sm text-muted-foreground">{timeline}</p>
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
