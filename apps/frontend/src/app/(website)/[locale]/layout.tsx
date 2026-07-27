import type { Metadata } from 'next';
import { Archivo, IBM_Plex_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import '../globals.css';
import { HeaderNav } from '@/components/HeaderNav';
import { getCachedHeaderData } from '@/data/data';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/providers/theme-provider';
import { Logo } from '@/components/logo';
import { locales, isValidLocale } from '@/i18n/config';

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

export const metadata: Metadata = {
  title: 'Cesar Jerez | Full Stack Developer',
  description: 'Portfolio of Cesar Jerez, a Multidisciplinary Developer based in Costa Rica.',
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
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
