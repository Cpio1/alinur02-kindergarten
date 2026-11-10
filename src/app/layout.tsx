import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { SITE } from "@/data/site";
import { getBaseUrl, SEO } from "@/lib/seo";

const nunito = Nunito({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-nunito",
});

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  ...(baseUrl ? { metadataBase: new URL(baseUrl) } : {}),
  title: SEO.title,
  description: SEO.description,
  applicationName: SITE.name,
  // canonical — только когда задан реальный домен NEXT_PUBLIC_SITE_URL
  ...(SITE.siteUrl ? { alternates: { canonical: "/" } } : {}),
  openGraph: {
    type: "website",
    locale: "kk_KZ",
    alternateLocale: ["ru_RU"],
    siteName: SITE.name,
    title: SEO.title,
    description: SEO.description,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.title,
    description: SEO.description,
    images: ["/og-image.jpg"],
  },
  formatDetection: { telephone: false },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFFDF7",
  colorScheme: "only light",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="kk" className={nunito.variable} style={{ colorScheme: "light" }} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col bg-milk font-sans text-ink">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
