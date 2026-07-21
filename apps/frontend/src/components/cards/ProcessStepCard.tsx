import { cn } from '@/lib/utils'

export interface ProcessStepCardProps {
    index: number
    title: string
    description: string
    className?: string
}

export const ProcessStepCard: React.FC<ProcessStepCardProps> = ({
    index,
    title,
    description,
    className,
}) => {
    return (
        <div
            className={cn(
                'group relative border-t pt-7 before:absolute before:-top-px before:left-0 before:h-px before:w-10 before:bg-foreground before:transition-all before:duration-500 hover:before:w-full',
                className,
            )}
        >
            <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground">
                {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-4 text-lg font-semibold tracking-tight">{title}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{description}</p>
        </div>
    )
}
