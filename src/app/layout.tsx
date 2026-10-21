import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { absoluteUrl, ogDefaults, site, siteUrl } from "@/content/site";
import "./globals.css";

const inter = localFont({
  src: "./fonts/inter-latin-wght.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-inter",
  // Body text renders immediately in the metric-matched fallback; only the display face (the H1, our LCP) is preloaded.
  preload: false,
});

const montserrat = localFont({
  src: "./fonts/montserrat-latin-wght.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-montserrat",
});

const title = "The Purple Movement | Uniting Purposeful People Worldwide";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: "%s · The Purple Movement" },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: { ...ogDefaults, url: "/", title, description: site.description },
  twitter: {
    card: "summary_large_image",
    site: "@ThePurpleMVMT",
    title,
    description: site.description,
    images: ["/image.webp"],
  },
  icons: { icon: "/favicon.ico", apple: "/logos/logo_pm.webp" },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "light",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: site.name,
      alternateName: ["Purple Movement", "TPM"],
      url: siteUrl,
      logo: absoluteUrl("/logos/logo_pm.webp"),
      description: site.description,
      sameAs: site.social.map((s) => s.href),
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: site.name,
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // JSON.stringify output contains no executable markup; "<" is escaped defensively.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
