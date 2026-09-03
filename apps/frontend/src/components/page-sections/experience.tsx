import Section from '.';
import type { PageExperienceBlock } from '@strps-website/types';

const ExperienceSection: React.FC<PageExperienceBlock> = ({ title, positions, section }) => {
    return (
        <Section
            {...(section ?? {})}
            id={section?.section_id || 'experience'}
            container={false}
            containerClassName="pt-[90px] pb-0 min-h-[400px] mx-auto w-full max-w-wrap px-6"
        >
            <h2 className="text-2xl font-medium tracking-[-0.01em]">{title}</h2>

            <div className="relative mt-9 border-l border-border pl-8 md:pl-10">
                {positions?.map((job, i) => (
                    <div
                        key={job.id || job.company}
                        className={
                            i === (positions.length ?? 0) - 1
                                ? 'relative pb-0'
                                : 'relative border-b border-border pb-9 mb-9'
                        }
                    >
                        <span className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background md:-left-[calc(2.5rem+5px)]" />

                        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                            <h3 className="text-lg font-medium">{job.company}</h3>
                            <span className="font-mono text-xs text-faint-foreground">
                                {job.startDate} — {job.endDate || 'Present'}
                            </span>
                        </div>
                        <h4 className="mt-1 text-[15px] text-muted-foreground">{job.position}</h4>
                        {job.summary && (
                            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                                {job.summary}
                            </p>
                        )}
                        {job.highlights && job.highlights.length > 0 && (
                            <ul className="mt-3 list-disc list-outside space-y-1 pl-5 text-sm text-muted-foreground">
                                {job.highlights.map((item) => (
                                    <li key={item.id || item.highlight}>{item.highlight}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </Section>
    );
};

export default ExperienceSection;
