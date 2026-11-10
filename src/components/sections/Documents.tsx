"use client";

import { ExternalLink, FolderOpen } from "lucide-react";
import { DOCUMENTS_URL, SECTION_IDS } from "@/data/site";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { Sparkle, Star } from "@/components/ui/Decor";

/** Знак Google Drive (треугольник из трёх цветов) */
function DriveIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 87.3 78" className={className} aria-hidden="true">
      <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3L27.5 53H0c0 1.55.4 3.1 1.2 4.5Z" fill="#0066da" />
      <path d="M43.65 25 29.9 1.2c-1.35.8-2.5 1.9-3.3 3.3L1.2 48.5A9.06 9.06 0 0 0 0 53h27.5Z" fill="#00ac47" />
      <path d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5H59.8l5.85 11.5Z" fill="#ea4335" />
      <path d="M43.65 25 57.4 1.2C56.05.4 54.5 0 52.9 0H34.4c-1.6 0-3.15.45-4.5 1.2Z" fill="#00832d" />
      <path d="M59.8 53H27.5L13.75 76.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2Z" fill="#2684fc" />
      <path d="M73.4 26.5 60.7 4.5c-.8-1.4-1.95-2.5-3.3-3.3L43.65 25 59.8 53h27.45c0-1.55-.4-3.1-1.2-4.5Z" fill="#ffba00" />
    </svg>
  );
}

export function Documents() {
  const { t } = useI18n();
  return (
    <section id={SECTION_IDS.documents} aria-labelledby="documents-title" className="relative pb-14 sm:pb-20">
      <div className="container-site">
        <Reveal>
          <div className="relative overflow-hidden rounded-[40px_16px_40px_16px] bg-gradient-to-br from-lilac to-rose px-6 py-8 sm:px-10 sm:py-10">
            <Star className="absolute top-5 right-6 h-8 w-8 animate-twinkle" />
            <Sparkle className="absolute bottom-6 right-[30%] hidden h-6 w-6 animate-twinkle [animation-delay:1s] sm:block" color="#fff" />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <span className="relative grid h-16 w-16 shrink-0 rotate-[-6deg] place-items-center rounded-[22px_22px_22px_6px] bg-white text-violet shadow-soft">
                  <FolderOpen className="h-8 w-8" aria-hidden="true" />
                  <span className="absolute -right-2 -bottom-2 grid h-8 w-8 rotate-6 place-items-center rounded-full bg-white shadow-md">
                    <DriveIcon className="h-4 w-4" />
                  </span>
                </span>
                <div>
                  <h2 id="documents-title" className="text-2xl font-black text-ink sm:text-[28px]">
                    {t.documents.title}
                  </h2>
                  <p className="mt-1 text-[15px] text-ink-soft sm:text-base">{t.documents.subtitle}</p>
                  <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 text-[13px] font-bold text-ink-soft">
                    <DriveIcon className="h-3.5 w-3.5" />
                    {t.documents.drive}
                  </p>
                </div>
              </div>

              <a
                href={DOCUMENTS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-violet px-6 font-extrabold text-white shadow-lift transition hover:-translate-y-0.5 hover:bg-violet-dark md:shrink-0"
              >
                <FolderOpen className="h-5 w-5" aria-hidden="true" />
                {t.documents.button}
                <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                <span className="sr-only">({t.documents.opensNew})</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
