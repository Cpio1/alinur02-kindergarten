"use client";

import { Medal, MessageCircleHeart, Languages } from "lucide-react";
import { SECTION_IDS } from "@/data/site";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Star, Sparkle } from "@/components/ui/Decor";
import { AbcIllustration, SpeechIllustration, TaekwondoIllustration } from "@/components/ui/Illustrations";

const CLASS_STYLES = [
  {
    Illustration: SpeechIllustration,
    icon: MessageCircleHeart,
    card: "bg-rose",
    pill: "bg-rose-deep",
    shape: "rounded-[60px_24px_60px_24px]",
    art: "bg-white/70 rounded-[50%_50%_46%_54%/60%_44%_56%_40%]",
  },
  {
    Illustration: TaekwondoIllustration,
    icon: Medal,
    card: "bg-mint",
    pill: "bg-mint-deep",
    shape: "rounded-[24px_60px_24px_60px]",
    art: "bg-white/70 rounded-[44%_56%_60%_40%/50%_40%_60%_50%]",
  },
  {
    Illustration: AbcIllustration,
    icon: Languages,
    card: "bg-sun",
    pill: "bg-[#c98a0b]",
    shape: "rounded-[60px_60px_24px_60px]",
    art: "bg-white/70 rounded-[56%_44%_40%_60%/44%_56%_44%_56%]",
  },
];

export function Classes() {
  const { t } = useI18n();
  return (
    <section id={SECTION_IDS.classes} aria-labelledby="classes-title" className="relative py-14 sm:py-20">
      <Star className="absolute top-16 left-[8%] hidden h-8 w-8 animate-twinkle md:block" color="#FFC93C" />
      <Sparkle className="absolute top-24 right-[10%] hidden h-7 w-7 animate-twinkle [animation-delay:1s] md:block" color="#E8608F" />
      <div className="container-site">
        <SectionHeading id="classes-title" title={t.classes.title} subtitle={t.classes.subtitle} accent="#E8608F" />
        <ul className="grid gap-5 md:grid-cols-3 lg:gap-6">
          {t.classes.items.map((c, i) => {
            const st = CLASS_STYLES[i];
            const { Illustration } = st;
            const Icon = st.icon;
            return (
              <Reveal as="li" key={i} delay={i * 0.1}>
                <article className={`group relative flex h-full flex-col p-6 transition duration-300 hover:-translate-y-1.5 hover:shadow-soft sm:p-7 ${st.card} ${st.shape}`}>
                  <h3 className={`inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5 text-[15px] font-black text-white ${st.pill}`}>
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {c.title}
                  </h3>
                  <div className={`mx-auto my-5 grid h-32 w-40 place-items-center transition-transform duration-500 group-hover:scale-105 ${st.art}`}>
                    <Illustration className="h-24 w-28" />
                  </div>
                  <p className="text-[14.5px] leading-relaxed text-ink">{c.text}</p>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
