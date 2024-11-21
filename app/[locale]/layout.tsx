import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { ThemeProvider } from '@/components/theme-provider';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'zh' },
    { locale: 'ja' },
    { locale: 'ko' },
    { locale: 'es' },
    { locale: 'fr' },
    { locale: 'de' }
  ];
}

export default function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = useMessages();
 
  // Show a 404 error if the user requests an unknown locale
  if (!messages) notFound();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen flex flex-col">
              <SiteHeader />
              <main className="flex-1">
                {children}
              </main>
              <SiteFooter />
            </div>
            <Toaster />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}