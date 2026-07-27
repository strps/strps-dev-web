import type { Metadata } from 'next';
import { Archivo, IBM_Plex_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import '../globals.css';
import { HeaderNav } from '@/components/HeaderNav';
import { getCachedHeaderData } from '@/data/data';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/providers/theme-provider';
import { Logo } from '@/components/logo';
import { locales, isValidLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { buildAlternates, SITE_URL } from '@/lib/seo';

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-archivo',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-ibm-plex-mono',
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * Root fallback metadata (merged under any leaf that doesn't set its own title/description,
 * e.g. not-found.tsx if it opts out). `metadataBase` lives here once, at the root, per Next's
 * convention, so every leaf's relative `alternates`/`openGraph.images` resolve to absolute URLs.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const resolvedLocale: Locale = isValidLocale(locale) ? locale : 'en';
  const dictionary = getDictionary(resolvedLocale);

  return {
    metadataBase: new URL(SITE_URL),
    title: dictionary.seo.defaultTitle,
    description: dictionary.seo.defaultDescription,
    alternates: buildAlternates(resolvedLocale, '/'),
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const { navItems, theme, overlay } = await getCachedHeaderData(locale)();

  return (
    <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
      <body className={`${archivo.variable} ${ibmPlexMono.variable} min-h-screen bg-background font-sans text-foreground antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <HeaderNav
            navItems={navItems}
            theme={theme}
            // background={background}
            overlay={overlay}
            locale={locale}
            brand={
              <span className="flex items-center gap-2 font-bold text-xl tracking-tighter">
                <Logo className='w-48 fill-foreground' />
              </span>
            }
          />
          {children}
          <Footer locale={locale} />
        </ThemeProvider>
      </body>
    </html>
  );
}
