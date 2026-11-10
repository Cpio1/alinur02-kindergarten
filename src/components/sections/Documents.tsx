"use client";

import { ExternalLink, FileText, Info } from "lucide-react";
import { SECTION_IDS } from "@/data/site";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { Sparkle, Star } from "@/components/ui/Decor";

export function Documents({ documentsUrl }: { documentsUrl: string | null }) {
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
                <span className="grid h-14 w-14 shrink-0 rotate-[-6deg] place-items-center rounded-[20px_20px_20px_6px] bg-white text-violet shadow-soft">
                  <FileText className="h-7 w-7" aria-hidden="true" />
                </span>
                <div>
                  <h2 id="documents-title" className="text-2xl font-black text-ink sm:text-[28px]">
                    {t.documents.title}
                  </h2>
                  <p className="mt-1 text-[15px] text-ink-soft sm:text-base">{t.documents.subtitle}</p>
                </div>
              </div>

              <div className="flex flex-col items-stretch gap-2 md:max-w-xs md:items-end">
                {documentsUrl ? (
                  <a
                    href={documentsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-violet px-6 font-extrabold text-white shadow-lift transition hover:-translate-y-0.5 hover:bg-violet-dark"
                  >
                    {t.documents.button}
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only">{t.newTab}</span>
                  </a>
                ) : (
                  <>
                    <button
                      type="button"
                      disabled
                      aria-describedby="documents-pending"
                      className="inline-flex min-h-12 cursor-not-allowed items-center justify-center gap-2 rounded-full bg-white/70 px-6 font-extrabold text-ink/50"
                    >
                      {t.documents.button}
                    </button>
                    <p id="documents-pending" className="flex items-start gap-1.5 text-[13px] leading-snug text-ink-soft md:text-right">
                      <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      {t.documents.pending}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
