"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState, type MouseEvent } from "react";
import { NAV_ITEMS, SECTION_IDS, SITE, whatsappLink } from "@/data/site";
import { LANGS } from "@/data/translations";
import { useI18n } from "@/lib/i18n";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Flower } from "@/components/ui/Decor";

export function LangSwitch({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useI18n();
  return (
    <div role="group" aria-label={t.header.langLabel} className={`flex items-center rounded-full bg-lilac/70 p-1 ${className}`}>
      {LANGS.map((l, i) => (
        <span key={l.code} className="flex items-center">
          {i > 0 && <span aria-hidden="true" className="px-0.5 text-xs text-lavender">|</span>}
          <button
            type="button"
            lang={l.htmlLang}
            onClick={() => setLang(l.code)}
            aria-pressed={lang === l.code}
            className={`min-h-9 min-w-10 rounded-full px-2 text-[12.5px] sm:min-w-11 sm:px-2.5 sm:text-[13px] font-extrabold tracking-wide transition-colors ${
              lang === l.code ? "bg-white text-violet shadow-sm" : "text-ink-soft hover:text-violet"
            }`}
          >
            {l.label}
          </button>
        </span>
      ))}
    </div>
  );
}

function Logo({ logoSrc, label }: { logoSrc: string | null; label: string }) {
  return (
    <a href={`#${SECTION_IDS.home}`} aria-label={label} className="group flex shrink-0 items-center gap-2.5 rounded-full">
      {logoSrc ? (
        <Image
          src={logoSrc}
          alt=""
          width={104}
          height={104}
          sizes="52px"
          className="h-12 w-12 object-contain drop-shadow-sm transition-transform duration-300 group-hover:rotate-6 sm:h-[52px] sm:w-[52px]"
          priority
        />
      ) : (
        <span className="relative grid h-10 w-10 place-items-center rounded-[46%_54%_50%_50%/55%_45%_55%_45%] bg-sun transition-transform duration-300 group-hover:rotate-12">
          <Flower className="h-7 w-7" color="#A78BFA" />
        </span>
      )}
      <span className="flex flex-col leading-none">
        <span className="text-lg font-black tracking-tight text-ink min-[360px]:text-xl">{SITE.shortName}</span>
        <span className="mt-0.5 text-[11px] font-bold text-violet">балабақшасы</span>
      </span>
    </a>
  );
}

export function Header({ logoSrc }: { logoSrc: string | null }) {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>(SECTION_IDS.home);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Подсветка активного пункта меню
  useEffect(() => {
    const ids = NAV_ITEMS.map((n) => n.id);
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Закрытие меню по Esc и блокировка прокрутки
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Мобильное меню: сначала закрываем меню и снимаем блокировку прокрутки,
  // затем прокручиваем — отступ берётся из scroll-margin-top секции (CSS).
  const goToSection = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    setOpen(false);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(() => {
      document.body.style.overflow = "";
      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
    }, 60);
  };

  const wa = whatsappLink(lang);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        scrolled || open ? "bg-milk/92 shadow-[0_6px_24px_-14px_rgb(40_51_74/0.35)] backdrop-blur-md" : "bg-milk/60 backdrop-blur-sm"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:bg-violet focus:px-4 focus:py-2 focus:text-white"
      >
        {t.meta.skip}
      </a>
      <div className="container-site flex h-[68px] items-center justify-between gap-3">
        <Logo logoSrc={logoSrc} label={t.header.homeLabel} />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-0.5 xl:gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative rounded-full px-2.5 py-2 text-[14px] font-bold transition-colors xl:px-3 ${
                      isActive ? "text-violet" : "text-ink hover:text-violet"
                    }`}
                  >
                    {t.nav[item.key]}
                    {isActive && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute bottom-0.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-lavender"
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <LangSwitch />
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-violet px-4 py-2.5 text-[14px] font-extrabold text-white shadow-lift transition hover:-translate-y-0.5 hover:bg-violet-dark lg:inline-flex"
          >
            <WhatsAppIcon className="h-4 w-4" />
            <span className="hidden xl:inline">{t.header.cta}</span>
            <span className="sr-only xl:hidden">{t.header.cta}</span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.header.menuClose : t.header.menuOpen}
            className="grid h-11 w-11 place-items-center rounded-2xl bg-lilac text-violet transition hover:bg-lavender hover:text-white lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label={t.header.menuClose}
              tabIndex={-1}
              onClick={() => setOpen(false)}
              className="absolute inset-x-0 top-[68px] -z-10 h-[100dvh] bg-ink/25 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              id="mobile-menu"
              className="absolute inset-x-0 top-[68px] max-h-[calc(100dvh-68px)] overflow-y-auto rounded-b-[28px] bg-milk px-4 pt-2 pb-5 shadow-soft lg:hidden"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <nav aria-label="Mobile">
                <ul className="grid grid-cols-2 gap-2">
                  {NAV_ITEMS.map((item, i) => {
                    const tints = ["bg-lilac", "bg-mint", "bg-sun", "bg-rose"];
                    return (
                      <li key={item.id} className={i === NAV_ITEMS.length - 1 ? "col-span-2" : ""}>
                        <a
                          href={`#${item.id}`}
                          onClick={(e) => goToSection(e, item.id)}
                          className={`flex min-h-12 items-center rounded-2xl px-4 text-[15px] font-extrabold text-ink transition active:scale-[0.98] ${tints[i % 4]} ${
                            active === item.id ? "ring-2 ring-violet/60" : ""
                          }`}
                        >
                          {t.nav[item.key]}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-4 flex min-h-12 items-center justify-center gap-2 rounded-full bg-violet px-5 font-extrabold text-white shadow-lift"
              >
                <WhatsAppIcon className="h-5 w-5" />
                {t.header.cta}
              </a>
              <a
                href={`tel:${SITE.phones[0].tel}`}
                className="mt-2 flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-lilac px-5 font-bold text-ink"
              >
                <Phone className="h-4 w-4 text-violet" />
                {SITE.phones[0].display}
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
