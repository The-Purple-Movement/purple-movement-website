import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Poppins } from 'next/font/google';
import './globals.css';
import SmoothScroll from './components/providers/SmoothScroll';

const nura = localFont({
  src: [
    {
      path: '../fonts/Nura-Normal.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Nura-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-nura',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://purple-movement.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'The Purple Movement | Beyond Syllabus, Beyond Gatekeepers, Beyond Borders',
    template: '%s | The Purple Movement',
  },
  description:
    'The Purple Movement is a global force of purposeful people, changemakers, and visionaries coming together to create a borderless future full of impact and possibility.',
  keywords: [
    'Purple Movement',
    'The Purple Movement',
    'Beyond Syllabus',
    'Beyond Gatekeepers',
    'Beyond Borders',
    'AI and Compassion',
    'Global Youth Movement',
    'Student Innovation',
    'Open Source Education',
    'Changemakers',
    'Higher Education Innovation',
  ],
  authors: [{ name: 'The Purple Movement', url: siteUrl }],
  creator: 'The Purple Movement',
  publisher: 'The Purple Movement',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'The Purple Movement',
    title: 'The Purple Movement | Uniting Purposeful People Worldwide',
    description:
      'A global force of purposeful people, changemakers, and visionaries coming together to create a borderless future full of impact and possibility.',
    images: [
      {
        url: '/image.webp',
        width: 1200,
        height: 630,
        alt: 'The Purple Movement — Beyond Syllabus, Beyond Gatekeepers, Beyond Borders',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Purple Movement | Uniting Purposeful People Worldwide',
    description:
      'A global force of purposeful people, changemakers, and visionaries coming together to create a borderless future full of impact and possibility.',
    creator: '@ThePurpleMVMT',
    site: '@ThePurpleMVMT',
    images: ['/image.webp'],
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
    icon: '/favicon.ico',
    apple: '/logos/logo_pm.webp',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'The Purple Movement',
      alternateName: ['Purple Movement', 'TPM'],
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        '@id': `${siteUrl}/#logo`,
        url: `${siteUrl}/logos/logo_pm.webp`,
        caption: 'The Purple Movement Logo',
      },
      image: `${siteUrl}/image.webp`,
      description:
        'A global force of purposeful people, changemakers, and visionaries coming together to create a borderless future full of impact and possibility.',
      sameAs: [
        'https://www.instagram.com/tpm.live/',
        'https://x.com/ThePurpleMVMT',
        'https://www.linkedin.com/company/the-purple-movement/',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'The Purple Movement',
      description: 'Beyond Syllabus, Beyond Gatekeepers, Beyond Borders',
      publisher: {
        '@id': `${siteUrl}/#organization`,
      },
      inLanguage: 'en-US',
    },
    {
      '@type': 'WebPage',
      '@id': `${siteUrl}/#webpage`,
      url: siteUrl,
      name: 'The Purple Movement | Beyond Syllabus, Beyond Gatekeepers, Beyond Borders',
      isPartOf: {
        '@id': `${siteUrl}/#website`,
      },
      about: {
        '@id': `${siteUrl}/#organization`,
      },
      description:
        'The Purple Movement is a global collective of purposeful changemakers, innovators, and leaders creating a borderless future. Discover our flagship initiatives: Beyond Syllabus and AI + Compassion.',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${nura.variable} ${poppins.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-pm-bg-dark font-sans w-full min-h-screen">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
