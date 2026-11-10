"use client";

import { UsersRound } from "lucide-react";
import { SECTION_IDS } from "@/data/site";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Flower, Sparkle, Star } from "@/components/ui/Decor";
import { CamelIllustration, ChickIllustration, SchoolIllustration } from "@/components/ui/Illustrations";

const GROUP_STYLES = [
  {
    Illustration: ChickIllustration,
    card: "bg-[#FFF3CF]",
    blob: "bg-sun",
    accent: "text-[#9a6400]",
    badge: "bg-white text-[#9a6400]",
    border: "border-sun",
    shape: "rounded-[36px_36px_36px_12px]",
    Deco: Star,
    decoColor: "#F5B42A",
  },
  {
    Illustration: CamelIllustration,
    card: "bg-[#E6F8EB]",
    blob: "bg-mint",
    accent: "text-mint-deep",
    badge: "bg-white text-mint-deep",
    border: "border-mint",
    shape: "rounded-[36px_12px_36px_36px]",
    Deco: Flower,
    decoColor: "#7BD39A",
  },
  {
    Illustration: SchoolIllustration,
    card: "bg-[#F1E8FF]",
    blob: "bg-lilac",
    accent: "text-violet",
    badge: "bg-white text-violet",
    border: "border-lilac",
    shape: "rounded-[12px_36px_36px_36px]",
    Deco: Sparkle,
    decoColor: "#A78BFA",
  },
];

export function Groups() {
  const { t } = useI18n();
  return (
    <section id={SECTION_IDS.groups} aria-labelledby="groups-title" className="relative scroll-mt-40 py-14 sm:py-20 md:scroll-mt-44">
      <div className="container-site">
        <SectionHeading id="groups-title" title={t.groups.title} subtitle={t.groups.subtitle} accent="#F5B42A" />
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {t.groups.items.map((g, i) => {
            const st = GROUP_STYLES[i];
            const { Illustration, Deco } = st;
            return (
              <Reveal
                as="li"
                key={g.name}
                delay={i * 0.1}
                className={i === 2 ? "md:col-span-2 md:mx-auto md:w-[calc(50%-10px)] lg:col-span-1 lg:mx-0 lg:w-auto" : ""}
              >
                <article
                  className={`group relative flex h-full flex-col overflow-hidden border-2 p-6 pt-5 transition duration-300 hover:-translate-y-1.5 hover:shadow-soft sm:p-7 sm:pt-6 ${st.card} ${st.border} ${st.shape}`}
                >
                  <Deco className="absolute top-5 right-5 h-6 w-6 animate-twinkle" color={st.decoColor} />
                  <div className="relative mx-auto mb-4 grid h-36 w-36 place-items-center">
                    <span aria-hidden="true" className={`absolute inset-0 animate-blob blob-shape ${st.blob}`} />
                    <Illustration className="relative h-28 w-28 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3" />
                  </div>
                  <p className={`text-[13px] font-extrabold tracking-wide uppercase ${st.accent}`}>{g.category}</p>
                  <h3 className="mt-1 text-2xl font-black text-ink">«{g.name}»</h3>
                  <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-ink-soft">{g.text}</p>
                  <p className={`mt-5 inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-[15px] font-black shadow-sm ${st.badge}`}>
                    <UsersRound className="h-4 w-4" aria-hidden="true" />
                    {g.count} {t.groups.childrenSuffix}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
