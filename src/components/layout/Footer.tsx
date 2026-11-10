"use client";

import { MapPin, Phone } from "lucide-react";
import { NAV_ITEMS, SITE } from "@/data/site";
import { useI18n } from "@/lib/i18n";
import { InstagramIcon } from "@/components/ui/BrandIcons";
import { Flower, Sparkle, Star, Wave } from "@/components/ui/Decor";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="relative mt-auto">
      <Wave fill="#2E2650" className="h-10! sm:h-14!" />
      <div className="relative overflow-hidden bg-[#2E2650] pt-8 pb-24 text-white/85 sm:pb-10">
        <Star className="absolute top-8 right-[8%] h-6 w-6 animate-twinkle" />
        <Sparkle className="absolute bottom-16 left-[45%] h-5 w-5 animate-twinkle [animation-delay:1.5s]" color="#A78BFA" />
        <div className="container-site relative">
          <div className="grid gap-8 md:grid-cols-[1.2fr_1fr]">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="grid h-10 w-10 place-items-center rounded-[46%_54%_50%_50%/55%_45%_55%_45%] bg-sun">
                  <Flower className="h-7 w-7" color="#A78BFA" />
                </span>
                <p className="text-xl font-black text-white">{SITE.name}</p>
              </div>
              <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-white/75">{t.footer.tagline}</p>
            </div>

            <nav aria-label={t.footer.navTitle}>
              <p className="mb-3 text-[13px] font-extrabold tracking-wider text-sun uppercase">{t.footer.navTitle}</p>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-1.5 sm:grid-cols-3">
                {NAV_ITEMS.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="inline-flex min-h-8 items-center text-[15px] font-semibold text-white/85 transition hover:text-sun">
                      {t.nav[item.key]}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="mt-8 grid gap-3 border-t border-white/15 pt-6 text-[14.5px] sm:grid-cols-3 sm:gap-6">
            <div className="flex items-start gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-sun" aria-hidden="true" />
              <div className="flex flex-col gap-1">
                {SITE.phones.map((p) => (
                  <a key={p.tel} href={`tel:${p.tel}`} className="font-bold whitespace-nowrap text-white hover:text-sun">
                    {p.display}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <InstagramIcon className="mt-0.5 h-4 w-4 shrink-0 text-sun" />
              <a href={SITE.instagram.url} target="_blank" rel="noopener noreferrer" className="font-bold break-all text-white hover:text-sun">
                {SITE.instagram.handle}
                <span className="sr-only"> {t.newTab}</span>
              </a>
            </div>
            <div className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sun" aria-hidden="true" />
              <address className="not-italic text-white/85">{t.contacts.address}</address>
            </div>
          </div>

          <p className="mt-8 text-center text-[13px] text-white/60">{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
