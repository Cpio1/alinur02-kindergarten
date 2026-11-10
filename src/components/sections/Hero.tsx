"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowDown, Baby, Clock, Languages, Sparkles, UsersRound, UtensilsCrossed } from "lucide-react";
import { SECTION_IDS, whatsappLink } from "@/data/site";
import { useI18n } from "@/lib/i18n";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Circle, Cloud, Flower, Sparkle, Star } from "@/components/ui/Decor";
import { KindergartenScene } from "@/components/ui/Illustrations";

const STAT_STYLES = [
  { bg: "bg-lilac", icon: UsersRound, iconColor: "text-violet", shape: "rounded-[28px_28px_28px_10px]" },
  { bg: "bg-mint", icon: Baby, iconColor: "text-mint-deep", shape: "rounded-[10px_28px_28px_28px]" },
  { bg: "bg-sun", icon: UtensilsCrossed, iconColor: "text-[#b7790a]", shape: "rounded-[28px_10px_28px_28px]" },
  { bg: "bg-rose", icon: Clock, iconColor: "text-rose-deep", shape: "rounded-[28px_28px_10px_28px]" },
];

export function Hero({ heroSrc, heroRatio }: { heroSrc: string | null; heroRatio: number | null }) {
  // Квадратные/вертикальные изображения показываем целиком, чтобы не обрезать края
  const containHero = heroRatio !== null && heroRatio < 1.1;
  const { t, lang } = useI18n();

  return (
    <section id={SECTION_IDS.home} aria-labelledby="hero-title" className="relative overflow-hidden pt-[68px]">
      {/* фон */}
      <div aria-hidden="true" className="dotted-bg absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <Circle className="absolute -top-24 -left-24 h-72 w-72 opacity-70" color="#FFE6A7" />
      <Circle className="absolute top-40 -right-28 h-80 w-80 opacity-60" color="#E9D9FF" />

      <div className="container-site relative pt-6 pb-10 sm:pt-10 lg:pt-14 lg:pb-14">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
          {/* Текст */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 text-center lg:text-left"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-[13px] font-extrabold text-violet shadow-soft">
              <Sparkles className="h-4 w-4 text-sun-deep" aria-hidden="true" />
              {t.hero.badge}
            </span>
            <h1 id="hero-title" className="mt-4 text-[34px] leading-[1.08] font-black tracking-tight text-ink min-[400px]:text-[40px] sm:text-5xl lg:text-[54px]">
              <span className="relative inline-block">
                {t.hero.title.split(" ")[0]}
                <svg aria-hidden="true" viewBox="0 0 200 14" className="absolute -bottom-1.5 left-0 h-3 w-full" preserveAspectRatio="none">
                  <path d="M3 10C50 2 120 2 197 8" stroke="#FFC93C" strokeWidth="6" strokeLinecap="round" fill="none" />
                </svg>
              </span>{" "}
              <span className="text-violet">{t.hero.title.split(" ").slice(1).join(" ")}</span>
            </h1>
            <p className="mt-4 text-lg leading-snug font-extrabold text-ink sm:text-xl">{t.hero.subtitle}</p>
            <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-ink-soft sm:text-base lg:mx-0">{t.hero.description}</p>

            <div className="mt-6 flex flex-col items-stretch justify-center gap-3 min-[400px]:flex-row min-[400px]:items-center lg:justify-start">
              <a
                href={whatsappLink(lang)}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-wa px-6 font-extrabold text-white shadow-[0_14px_30px_-12px_rgb(31_168_85/0.6)] transition hover:-translate-y-0.5 hover:bg-wa-dark"
              >
                <WhatsAppIcon className="h-5 w-5 transition-transform group-hover:rotate-12" />
                {t.hero.ctaPrimary}
              </a>
              <a
                href={`#${SECTION_IDS.about}`}
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-lavender/60 bg-white px-6 font-extrabold text-violet transition hover:-translate-y-0.5 hover:border-violet"
              >
                {t.hero.ctaSecondary}
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
              </a>
            </div>
          </motion.div>

          {/* Изображение */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[340px] min-[400px]:max-w-[400px] sm:max-w-[460px] lg:max-w-[500px]"
          >
            <div aria-hidden="true" className="absolute -inset-3 animate-blob bg-gradient-to-br from-lavender via-[#FF9DBE] to-sun-deep opacity-80 blob-shape sm:-inset-4" />
            <div className={`relative aspect-[1.2] animate-blob overflow-hidden blob-shape shadow-lift ${containHero ? "bg-white" : "bg-lilac"}`}>
              {heroSrc ? (
                <Image
                  src={heroSrc}
                  alt={t.hero.imageAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 500px, (min-width: 640px) 460px, 90vw"
                  className={containHero ? "object-contain p-[6%]" : "object-cover object-center"}
                />
              ) : (
                <KindergartenScene className="h-full w-full" title={t.hero.illustrationAlt} />
              )}
            </div>

            {/* декор вокруг */}
            <Star className="absolute -top-3 left-4 h-8 w-8 animate-twinkle sm:h-10 sm:w-10" />
            <Sparkle className="absolute top-10 -right-2 h-6 w-6 animate-twinkle [animation-delay:1s]" color="#6D4BD1" />
            <Flower className="absolute -bottom-2 -left-3 h-12 w-12 animate-float sm:h-14 sm:w-14" />
            <Cloud className="absolute -top-6 right-10 h-10 w-20 animate-float-slow drop-shadow-md sm:h-12 sm:w-24" />
            <Circle className="absolute right-6 -bottom-3 h-6 w-6 animate-float [animation-delay:2s]" color="#3DB36B" />

            <div className="absolute -right-1 bottom-8 hidden rotate-3 items-center gap-2 rounded-2xl bg-white px-3 py-2 text-[13px] font-extrabold text-ink shadow-soft min-[400px]:flex sm:-right-4">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-mint text-mint-deep" aria-hidden="true">
                <Languages className="h-4 w-4" />
              </span>
              {t.hero.tag}
            </div>
          </motion.div>
        </div>

        {/* Показатели */}
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-14 lg:grid-cols-4">
          {t.stats.map((s, i) => {
            const st = STAT_STYLES[i];
            const Icon = st.icon;
            return (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.08 * i }}
                className={`group flex flex-col items-start gap-2 p-3.5 transition-transform hover:-translate-y-1 sm:flex-row sm:items-center sm:gap-3 sm:p-4 ${st.bg} ${st.shape}`}
              >
                <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl sm:h-11 sm:w-11 bg-white/80 transition-transform group-hover:rotate-6 ${st.iconColor}`}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[17px] leading-tight font-black whitespace-nowrap text-ink sm:text-xl">{s.value}</span>
                  <span className="block text-[12.5px] leading-tight font-semibold text-ink-soft sm:text-sm">{s.label}</span>
                </span>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
