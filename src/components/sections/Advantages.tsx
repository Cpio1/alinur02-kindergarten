"use client";

import { Apple, BookHeart, Puzzle, Users } from "lucide-react";
import { SECTION_IDS } from "@/data/site";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Cloud, Sparkle, Wave } from "@/components/ui/Decor";

const CARD_STYLES = [
  { icon: BookHeart, bg: "bg-lilac", iconBg: "bg-violet", shape: "rounded-[48px_18px_48px_18px]", rotate: "lg:-rotate-1" },
  { icon: Apple, bg: "bg-mint", iconBg: "bg-mint-deep", shape: "rounded-[18px_48px_18px_48px]", rotate: "lg:rotate-1 lg:translate-y-4" },
  { icon: Puzzle, bg: "bg-sun", iconBg: "bg-sun-deep", shape: "rounded-[40px_40px_14px_40px]", rotate: "lg:-rotate-1" },
  { icon: Users, bg: "bg-rose", iconBg: "bg-rose-deep", shape: "rounded-[40px_14px_40px_40px]", rotate: "lg:rotate-1 lg:translate-y-4" },
];

export function Advantages() {
  const { t } = useI18n();
  return (
    <section id={SECTION_IDS.advantages} aria-labelledby="advantages-title" className="relative">
      <Wave fill="#F4ECFF" />
      <div className="relative bg-[#F4ECFF] pt-8 pb-14 sm:pb-20">
        <Cloud className="absolute top-4 left-[6%] hidden h-12 w-24 animate-float-slow sm:block" />
        <Cloud className="absolute top-20 right-[5%] h-9 w-16 animate-float-slow [animation-delay:3s]" />
        <Sparkle className="absolute bottom-10 left-[4%] h-6 w-6 animate-twinkle" color="#F5B42A" />
        <div className="container-site relative">
          <SectionHeading id="advantages-title" title={t.advantages.title} subtitle={t.advantages.subtitle} />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {t.advantages.items.map((item, i) => {
              const st = CARD_STYLES[i];
              const Icon = st.icon;
              return (
                <Reveal as="li" key={item.title} delay={i * 0.08} className={st.rotate}>
                  <article
                    className={`group h-full p-6 transition duration-300 hover:-translate-y-1.5 hover:shadow-soft ${st.bg} ${st.shape}`}
                  >
                    <span
                      className={`grid h-14 w-14 place-items-center rounded-[22px_22px_22px_8px] text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 ${st.iconBg}`}
                    >
                      <Icon className="h-7 w-7" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 text-lg leading-snug font-black text-ink">{item.title}</h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">{item.text}</p>
                  </article>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
      <Wave fill="#F4ECFF" flip />
    </section>
  );
}
