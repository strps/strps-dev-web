import Section from '@/components/Section';

export interface AboutProps {
    title: string;
    imageUrl: string;
    paragraphs: string[];
}

export const AboutMe = ({ title, imageUrl, paragraphs }: AboutProps) => {
    return (
        <Section id="about" className="py-20 bg-background border-y border-border">
            < div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="relative">
                        <div className="aspect-square rounded-2xl bg-muted overflow-hidden shadow-xl border border-border">
                            {imageUrl ? (
                                <img src={imageUrl} alt="About me" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-secondary flex items-center justify-center text-muted-foreground">
                                    Your Image Here
                                </div>
                            )}
                        </div>
                        {/* Decorative blob */}
                        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/20 rounded-full -z-10 blur-xl"></div>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">{title}</h2>
                        <div className="space-y-4 text-lg text-muted-foreground">
                            {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                        </div>
                    </div>
                </div>
            </div >
        </Section >
    );
};

export default AboutMe;