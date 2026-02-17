import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {Inter} from "next/font/google";
import "../globals.css";
import LayoutContent from '@/components/LayoutContent';

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: {
    default: 'FAJI - Federasi Arung Jeram Indonesia',
    template: '%s | FAJI'
  },
  description: 'Official Website of Federasi Arung Jeram Indonesia (FAJI). Induk organisasi olahraga arung jeram di Indonesia.',
  keywords: ['Rafting', 'Arung Jeram', 'Indonesia', 'FAJI', 'Federasi', 'Olahraga', 'Sungai', 'Wisata', 'Adventure'],
  authors: [{ name: 'FAJI' }],
  creator: 'FAJI',
  publisher: 'FAJI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'FAJI - Federasi Arung Jeram Indonesia',
    description: 'Official Website of Federasi Arung Jeram Indonesia',
    url: 'https://faji.org',
    siteName: 'FAJI',
    images: [
      {
        url: 'https://faji.org/og-image.jpg', // Placeholder
        width: 1200,
        height: 630,
        alt: 'FAJI - Federasi Arung Jeram Indonesia',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAJI - Federasi Arung Jeram Indonesia',
    description: 'Official Website of Federasi Arung Jeram Indonesia',
    images: ['https://faji.org/og-image.jpg'], // Placeholder
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', sizes: 'any' },
      { url: '/favicon/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    ],
    shortcut: '/favicon/favicon.ico',
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default async function LocaleLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <body className={`${inter.variable} font-sans`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <LayoutContent>{children}</LayoutContent>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}