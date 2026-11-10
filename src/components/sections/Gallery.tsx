"use client";

import Image from "next/image";
import { ChevronDown, ChevronUp, ImageIcon, ZoomIn } from "lucide-react";
import { useCallback, useState } from "react";
import { SECTION_IDS } from "@/data/site";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Lightbox } from "@/components/ui/Lightbox";
import { Cloud, Flower, Star } from "@/components/ui/Decor";

const MOBILE_COUNT = 4;
const DESKTOP_COUNT = 6;

/** Разные размеры плиток в духе masonry: повторяющийся узор из 6 элементов */
const TILE_PATTERN = [
  "col-span-2 row-span-2 rounded-[36px_14px_36px_14px]",
  "row-span-1 rounded-[14px_32px_14px_32px]",
  "row-span-2 rounded-[32px_32px_14px_32px]",
  "row-span-1 rounded-[32px_14px_32px_32px]",
  "col-span-2 row-span-1 rounded-[14px_32px_32px_32px]",
  "col-span-2 row-span-1 rounded-[32px_14px_32px_14px]",
];

const PLACEHOLDER_TINTS = ["bg-lilac", "bg-mint", "bg-sun", "bg-rose", "bg-[#DDF1FF]", "bg-lilac"];

type GalleryItem = { src: string; ratio: number | null };

/** Вертикальные снимки и документы (дипломы) — высокая плитка, чтобы не обрезать края */
const TALL_TILE = "row-span-2 rounded-[32px_32px_14px_32px]";

function tileClass(item: GalleryItem, i: number) {
  if (item.ratio !== null && item.ratio < 0.85) return TALL_TILE;
  return TILE_PATTERN[i % TILE_PATTERN.length];
}

export function Gallery({ items }: { items: GalleryItem[] }) {
  const images = items.map((it) => it.src);
  const { t } = useI18n();
  const [expanded, setExpanded] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const close = useCallback(() => setLightbox(null), []);

  const alt = (i: number) => `${t.gallery.photoAlt} — ${i + 1}`;
  const total = images.length;

  // Видимость по ширине экрана решает CSS — без расхождения при гидратации
  const visibility = (i: number) => {
    if (expanded) return "";
    if (i >= DESKTOP_COUNT) return "hidden";
    if (i >= MOBILE_COUNT) return "hidden md:block";
    return "";
  };
  const buttonVisibility = total > DESKTOP_COUNT ? "" : total > MOBILE_COUNT ? "md:hidden" : "hidden";

  return (
    <section id={SECTION_IDS.gallery} aria-labelledby="gallery-title" className="relative scroll-mt-40 py-14 sm:py-20 md:scroll-mt-44">
      <Cloud className="absolute top-10 right-[6%] hidden h-12 w-24 animate-float-slow drop-shadow md:block" color="#E9D9FF" />
      <Star className="absolute top-24 left-[7%] hidden h-7 w-7 animate-twinkle md:block" />
      <div className="container-site">
        <SectionHeading id="gallery-title" title={t.gallery.title} subtitle={t.gallery.subtitle} accent="#6D4BD1" />

        {total === 0 ? (
          <Reveal>
            <div className="grid auto-rows-[120px] grid-cols-2 gap-3 sm:auto-rows-[150px] md:grid-cols-4">
              {TILE_PATTERN.map((shape, i) => (
                <div key={i} className={`relative grid place-items-center overflow-hidden ${shape} ${PLACEHOLDER_TINTS[i]}`} aria-hidden="true">
                  {i % 2 === 0 ? <Flower className="h-12 w-12 opacity-80" /> : <ImageIcon className="h-9 w-9 text-ink/30" />}
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-[15px] font-bold text-ink">{t.gallery.emptyTitle}</p>
            <p className="mt-1 text-center text-sm text-ink-soft">{t.gallery.emptyText}</p>
          </Reveal>
        ) : (
          <>
            <ul className="grid auto-rows-[130px] grid-flow-dense grid-cols-2 gap-3 min-[400px]:auto-rows-[150px] md:auto-rows-[170px] md:grid-cols-4 md:gap-4">
              {items.map((item, i) => (
                <li key={item.src} className={`${tileClass(item, i)} overflow-hidden ${visibility(i)}`}>
                  <button
                    type="button"
                    onClick={() => setLightbox(i)}
                    aria-label={`${t.gallery.open}: ${alt(i)}`}
                    className="group relative block h-full w-full overflow-hidden rounded-[inherit] bg-lilac focus-visible:outline-offset-2"
                  >
                    <Image
                      src={item.src}
                      alt={alt(i)}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="absolute right-3 bottom-3 grid h-10 w-10 scale-90 place-items-center rounded-full bg-white/90 text-violet opacity-0 transition duration-300 group-hover:scale-100 group-hover:opacity-100">
                      <ZoomIn className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <div className={`mt-7 flex justify-center ${buttonVisibility}`}>
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
                className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-lavender/60 bg-white px-6 font-extrabold text-violet shadow-sm transition hover:-translate-y-0.5 hover:border-violet"
              >
                {expanded ? t.gallery.less : t.gallery.more}
                {expanded ? <ChevronUp className="h-4 w-4" aria-hidden="true" /> : <ChevronDown className="h-4 w-4" aria-hidden="true" />}
              </button>
            </div>

            <Lightbox
              images={images}
              index={lightbox}
              alt={alt}
              labels={{ close: t.gallery.close, prev: t.gallery.prev, next: t.gallery.next, viewer: t.gallery.viewer }}
              onClose={close}
              onChange={setLightbox}
            />
          </>
        )}
      </div>
    </section>
  );
}
