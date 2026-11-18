import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';
const serif = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-serif' });
const sans = Manrope({ subsets: ['latin'], variable: '--font-sans' });
const site = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: { default: 'VILLA ESTATES | Fictional portfolio concept', template: '%s | VILLA ESTATES' },
  description: 'A fictional portfolio concept for a premium villa rental platform. All properties and prices are illustrative.',
  openGraph: { type: 'website', siteName: 'VILLA ESTATES' },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-ivory focus:p-3">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
