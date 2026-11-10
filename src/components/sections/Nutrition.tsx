"use client";

import { Coffee, Cookie, CupSoda, Soup, Sunrise } from "lucide-react";
import { SECTION_IDS } from "@/data/site";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Circle, Sparkle, Wave } from "@/components/ui/Decor";
import { AppleIcon, CarrotIcon, PearIcon, PlateIllustration } from "@/components/ui/Illustrations";

const MEAL_STYLES = [
  { icon: Sunrise, bg: "bg-sun", iconColor: "text-[#b7790a]", shape: "rounded-[26px_26px_26px_8px]" },
  { icon: Coffee, bg: "bg-rose", iconColor: "text-rose-deep", shape: "rounded-[8px_26px_26px_26px]" },
  { icon: Soup, bg: "bg-mint", iconColor: "text-mint-deep", shape: "rounded-[26px_8px_26px_26px]" },
  { icon: Cookie, bg: "bg-lilac", iconColor: "text-violet", shape: "rounded-[26px_26px_8px_26px]" },
  { icon: CupSoda, bg: "bg-[#DDF1FF]", iconColor: "text-[#1f6fa8]", shape: "rounded-[26px]" },
];

function MealCard({ index, title }: { index: number; title: string }) {
  const st = MEAL_STYLES[index];
  const Icon = st.icon;
  return (
    <div className={`group flex items-center gap-3 p-3 pr-4 shadow-[0_8px_20px_-14px_rgb(40_51_74/0.35)] transition hover:-translate-y-1 ${st.bg} ${st.shape}`}>
      <span className={`relative grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white ${st.iconColor}`}>
        <Icon className="h-5 w-5 transition-transform group-hover:scale-110" aria-hidden="true" />
        <span className="absolute -top-1.5 -left-1.5 grid h-5 w-5 place-items-center rounded-full bg-ink text-[11px] font-black text-white">
          {index + 1}
        </span>
      </span>
      <span className="text-[15px] leading-tight font-extrabold text-ink">{title}</span>
    </div>
  );
}

export function Nutrition() {
  const { t } = useI18n();
  const meals = t.nutrition.meals;

  return (
    <section id={SECTION_IDS.nutrition} aria-labelledby="nutrition-title" className="relative">
      <Wave fill="#EFFAF2" />
      <div className="relative overflow-hidden bg-[#EFFAF2] pt-8 pb-14 sm:pb-20">
        <Circle className="absolute -right-16 -bottom-16 h-56 w-56 opacity-70" color="#D7F5DF" />
        <Circle className="absolute top-24 -left-12 h-40 w-40 opacity-70" color="#FFE6A7" />
        <div className="container-site relative">
          <SectionHeading id="nutrition-title" title={t.nutrition.title} subtitle={t.nutrition.subtitle} accent="#2F9E5B" />

          <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
            {/* Тарелка */}
            <Reveal className="relative mx-auto w-full max-w-[280px] sm:max-w-[320px] lg:order-2">
              <div className="relative animate-[spin_60s_linear_infinite] motion-reduce:animate-none">
                <PlateIllustration className="h-auto w-full drop-shadow-[0_18px_30px_rgb(47_158_91/0.25)]" title={t.nutrition.plateAlt} />
              </div>
              <div className="absolute top-1/2 left-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-center shadow-soft sm:h-28 sm:w-28">
                <span>
                  <span className="block text-2xl leading-none font-black text-mint-deep sm:text-3xl">{t.nutrition.plateValue}</span>
                  <span className="mt-1 block text-[13px] font-bold text-ink-soft">{t.nutrition.plateLabel}</span>
                </span>
              </div>
              <AppleIcon className="absolute -top-2 -left-2 h-12 w-12 animate-float" />
              <PearIcon className="absolute -right-1 top-6 h-11 w-11 animate-float [animation-delay:1.5s]" />
              <CarrotIcon className="absolute -bottom-1 -right-3 h-12 w-12 animate-float-slow" />
              <Sparkle className="absolute bottom-6 -left-4 h-6 w-6 animate-twinkle" color="#F5B42A" />
            </Reveal>

            {/* Приёмы пищи: слева 1–2, справа 3–4, внизу 5 (на десктопе) */}
            <div className="contents">
              <div className="grid gap-3 sm:grid-cols-2 lg:order-1 lg:grid-cols-1 lg:gap-5">
                {[0, 1].map((i) => (
                  <Reveal key={i} delay={i * 0.08} className={i === 1 ? "lg:ml-10" : ""}>
                    <MealCard index={i} title={meals[i]} />
                  </Reveal>
                ))}
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:order-3 lg:grid-cols-1 lg:gap-5">
                {[2, 3].map((i) => (
                  <Reveal key={i} delay={i * 0.08} className={i === 3 ? "lg:mr-10" : ""}>
                    <MealCard index={i} title={meals[i]} />
                  </Reveal>
                ))}
              </div>
              <div className="sm:mx-auto sm:w-[calc(50%-6px)] lg:order-4 lg:col-span-3 lg:w-[280px]">
                <Reveal delay={0.32}>
                  <MealCard index={4} title={meals[4]} />
                </Reveal>
              </div>
            </div>
          </div>
          <p className="mt-8 text-center text-[14px] font-semibold text-ink-soft">{t.nutrition.note}</p>
        </div>
      </div>
      <Wave fill="#EFFAF2" flip />
    </section>
  );
}
