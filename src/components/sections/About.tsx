"use client";

import Image from "next/image";
import { Heart, MapPin } from "lucide-react";
import { SECTION_IDS } from "@/data/site";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { Circle, Flower, Sparkle, Squiggle, Star } from "@/components/ui/Decor";
import { KindergartenScene } from "@/components/ui/Illustrations";

const FACT_COLORS = ["bg-lilac text-violet", "bg-mint text-mint-deep", "bg-sun text-[#8a5a00]"];

export function About({ aboutSrc }: { aboutSrc: string | null }) {
  const { t } = useI18n();

  return (
    <section id={SECTION_IDS.about} aria-labelledby="about-title" className="relative py-14 sm:py-20">
      <div className="container-site grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        {/* Композиция с фото */}
        <Reveal className="relative mx-auto w-full max-w-[380px] sm:max-w-[420px] lg:order-none">
          <Circle className="absolute -top-5 -left-5 h-28 w-28" color="#D7F5DF" />
          <div aria-hidden="true" className="absolute -right-4 -bottom-4 h-[85%] w-[85%] rounded-[40px_120px_40px_120px] bg-rose" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[120px_40px_120px_40px] border-[6px] border-white bg-lilac shadow-soft">
            {aboutSrc ? (
              <Image
                src={aboutSrc}
                alt={t.about.imageAlt}
                fill
                sizes="(min-width: 1024px) 420px, 85vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            ) : (
              <KindergartenScene className="h-full w-full" title={t.hero.illustrationAlt} />
            )}
          </div>
          <Star className="absolute -top-4 right-8 h-9 w-9 animate-twinkle" />
          <Flower className="absolute bottom-10 -left-6 h-12 w-12 animate-float" color="#A78BFA" />
          <Sparkle className="absolute top-1/3 -right-5 h-7 w-7 animate-twinkle [animation-delay:1.2s]" color="#E8608F" />
          <div className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[13px] font-extrabold whitespace-nowrap text-ink shadow-soft">
            <MapPin className="h-4 w-4 text-rose-deep" aria-hidden="true" />
            {t.about.note}
          </div>
        </Reveal>

        {/* Текст */}
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-rose px-3 py-1 text-[13px] font-extrabold text-rose-deep">
              <Heart className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
              {t.nav.about}
            </span>
            <h2 id="about-title" className="mt-3 text-[26px] leading-tight font-extrabold text-ink sm:text-[34px]">
              {t.about.title}
            </h2>
            <Squiggle className="mt-3 h-3 w-20" color="#E8608F" />
            <p className="mt-4 text-lg font-extrabold text-violet sm:text-xl">{t.about.subtitle}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative mt-5 rounded-[28px_28px_28px_8px] bg-white p-5 shadow-soft sm:p-6">
              <span aria-hidden="true" className="absolute -top-4 left-5 text-6xl leading-none font-black text-lavender/50">
                “
              </span>
              <p className="relative text-[15px] leading-relaxed text-ink-soft sm:text-base">{t.about.text}</p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <ul className="mt-5 flex flex-wrap gap-2">
              {t.about.facts.map((f, i) => (
                <li key={f} className={`rounded-full px-4 py-2 text-[13.5px] font-extrabold ${FACT_COLORS[i % 3]}`}>
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
