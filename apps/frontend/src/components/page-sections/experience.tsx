import Section from '../section';
import type { PageExperienceBlock } from '@strps-website/types';

const ExperienceSection: React.FC<PageExperienceBlock> = ({ title, positions, section }) => {
    return (
        <Section
            id={section?.section_id || 'experience'}
            className="space-y-8 py-10 max-w-4xl mx-auto"
        >
            <h2 className="text-3xl font-bold tracking-tight text-center">{title}</h2>
            <div className="relative border-l border-muted ml-4 md:ml-6 space-y-12 pb-10">
                {positions?.map((job) => (
                    <div key={job.id || job.company} className="relative pl-8 md:pl-12">
                        {/* Timeline dot */}
                        <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background" />

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                            <h3 className="text-xl font-semibold">{job.company}</h3>
                            <span className="text-sm text-muted-foreground font-mono bg-muted px-2 py-1 rounded w-fit mt-1 sm:mt-0">
                                {job.startDate} — {job.endDate || "Present"}
                            </span>
                        </div>
                        <h4 className="text-lg text-primary mb-2">{job.position}</h4>
                        {job.summary && (
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                {job.summary}
                            </p>
                        )}
                        {job.highlights && job.highlights.length > 0 && (
                            <ul className="list-disc list-outside ml-5 text-muted-foreground space-y-1">
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