import Link from 'next/link';
import { getFooterData } from '@/data/data';
import type { Locale } from '@/i18n/config';

export default async function Footer({ locale }: { locale: Locale }) {
    const { navItems, copyright } = await getFooterData(locale);

    return (
        <footer className="border-t border-border py-7">
            <div className="mx-auto flex w-full max-w-wrap flex-wrap items-center justify-between gap-3 px-6">
                <span className="font-mono text-xs text-faint-foreground">
                    &copy; {copyright.years}{' '}
                    {copyright.link ? (
                        <Link href={copyright.link} className="hover:text-foreground">
                            {copyright.name}
                        </Link>
                    ) : (
                        copyright.name
                    )}
                </span>

                {copyright.location && (
                    <span className="font-mono text-xs text-faint-foreground">{copyright.location}</span>
                )}

                {navItems.length > 0 && (
                    <div className="flex gap-5">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                {...(item.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                className="font-mono text-xs text-faint-foreground hover:text-foreground"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </footer>
    );
}
