import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, IBM_Plex_Sans_Arabic } from 'next/font/google';
import '../src/index.css';
import { CoffeeProvider } from '../src/context/CoffeeContext';
import { Toaster } from 'sonner';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-arabic',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'لافوا لاونج — LAVOIA LOUNGE (Cafe, Shisha & Roastery)',
  description:
    'المنصة الرقمية الفاخرة لقائمة الطعام والطلبات — شيشة فاخرة، قهوة مختصة ومشروبات راقية في لافوا لاونج.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#070709',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={`${plusJakartaSans.variable} ${ibmPlexSansArabic.variable}`}>
      <head>
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23D4AF37'><path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'/></svg>" />
      </head>
      <body className="bg-[#070709] text-[#F3F4F6] antialiased selection:bg-[#D4AF37] selection:text-[#070709] font-sans min-h-screen">
        <CoffeeProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#0E1015',
                color: '#F9FAFB',
                border: '1px solid #D4AF37',
                borderRadius: '1.25rem',
                boxShadow: '0 10px 30px -4px rgba(0, 0, 0, 0.8)',
                fontFamily: 'var(--font-arabic), var(--font-sans)',
              },
            }}
          />
        </CoffeeProvider>
      </body>
    </html>
  );
}
