import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Advantages } from "@/components/sections/Advantages";
import { Groups } from "@/components/sections/Groups";
import { Nutrition } from "@/components/sections/Nutrition";
import { Classes } from "@/components/sections/Classes";
import { Gallery } from "@/components/sections/Gallery";
import { Documents } from "@/components/sections/Documents";
import { Contacts } from "@/components/sections/Contacts";
import { SITE } from "@/data/site";
import { findImage, getGalleryImages, getImageRatio } from "@/lib/media";
import { SEO } from "@/lib/seo";

export default function HomePage() {
  // Фотографии подхватываются из public/ во время сборки
  const heroSrc = findImage("main-page", "hero");
  const aboutSrc = findImage("main-page2", "about");
  const logoSrc = findImage("logo");
  const gallery = getGalleryImages();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Preschool",
    name: SITE.name,
    legalName: SITE.legalName,
    description: SEO.description,
    telephone: SITE.phones.map((p) => p.tel),
    address: {
      "@type": "PostalAddress",
      streetAddress: "Төребек Османов көшесі, 81, Боралдай ықшам ауданы",
      addressLocality: "Алматы",
      addressRegion: "Алатау ауданы",
      addressCountry: "KZ",
    },
    sameAs: [SITE.instagram.url],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Header logoSrc={logoSrc} />
      <main id="main" className="flex-1">
        <Hero heroSrc={heroSrc} heroRatio={getImageRatio(heroSrc)} />
        <About aboutSrc={aboutSrc} aboutRatio={getImageRatio(aboutSrc)} />
        <Advantages />
        <Groups />
        <Nutrition />
        <Classes />
        <Gallery images={gallery} />
        <Documents />
        <Contacts />
      </main>
      <Footer logoSrc={logoSrc} />
      <FloatingWhatsApp />
    </>
  );
}
