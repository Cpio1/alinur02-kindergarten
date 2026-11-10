"use client";

import { Clock, MapPin, MapPinned, Phone, PhoneCall } from "lucide-react";
import { SECTION_IDS, SITE, TWO_GIS_URL, whatsappLink } from "@/data/site";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Cloud, Flower, Star } from "@/components/ui/Decor";

export function Contacts() {
  const { t, lang } = useI18n();

  const infoRows = [
    { icon: MapPin, label: t.contacts.addressLabel, tint: "bg-rose text-rose-deep", content: <span>{t.contacts.address}</span> },
    { icon: Clock, label: t.contacts.hoursLabel, tint: "bg-sun text-[#9a6400]", content: <span>{SITE.hours}</span> },
    {
      icon: Phone,
      label: t.contacts.phonesLabel,
      tint: "bg-mint text-mint-deep",
      content: (
        <span className="flex flex-col">
          {SITE.phones.map((p) => (
            <a key={p.tel} href={`tel:${p.tel}`} className="w-fit font-extrabold whitespace-nowrap underline-offset-4 hover:text-violet hover:underline">
              {p.display}
            </a>
          ))}
        </span>
      ),
    },
    {
      icon: InstagramIcon,
      label: t.contacts.instagramLabel,
      tint: "bg-lilac text-violet",
      content: (
        <a href={SITE.instagram.url} target="_blank" rel="noopener noreferrer" className="font-extrabold break-all underline-offset-4 hover:text-violet hover:underline">
          {SITE.instagram.handle}
          <span className="sr-only"> {t.newTab}</span>
        </a>
      ),
    },
  ];

  const btnBase =
    "group inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-3 text-[14.5px] leading-tight font-extrabold whitespace-nowrap transition hover:-translate-y-0.5 sm:px-4 sm:text-[15px]";

  return (
    <section id={SECTION_IDS.contacts} aria-labelledby="contacts-title" className="relative pt-14 pb-16 sm:pt-20 sm:pb-24">
      <div className="container-site">
        <SectionHeading id="contacts-title" title={t.contacts.title} subtitle={t.contacts.subtitle} accent="#2F9E5B" />

        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6">
          {/* Информация */}
          <Reveal>
            <div className="h-full rounded-[40px_16px_40px_16px] bg-white p-5 shadow-soft sm:p-7">
              <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                {infoRows.map((row) => {
                  const Icon = row.icon;
                  return (
                    <li key={row.label} className={`flex gap-3.5 ${row.label === t.contacts.addressLabel ? "sm:col-span-2" : ""}`}>
                      <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-[16px_16px_16px_5px] ${row.tint}`}>
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div className="min-w-0 text-[15px] leading-snug text-ink">
                        <p className="mb-0.5 text-[12.5px] font-bold tracking-wide text-ink-soft uppercase">{row.label}</p>
                        {row.content}
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 grid grid-cols-1 gap-2.5 min-[400px]:grid-cols-2">
                <a href={whatsappLink(lang)} target="_blank" rel="noopener noreferrer" className={`${btnBase} bg-wa text-white hover:bg-wa-dark`}>
                  <WhatsAppIcon className="h-5 w-5" />
                  {t.contacts.whatsapp}
                </a>
                <a href={`tel:${SITE.phones[0].tel}`} className={`${btnBase} bg-violet text-white hover:bg-violet-dark`}>
                  <PhoneCall className="h-5 w-5" aria-hidden="true" />
                  {t.contacts.call}
                  <span className="sr-only">{SITE.phones[0].display}</span>
                </a>
                <a
                  href={SITE.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${btnBase} bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white`}
                >
                  <InstagramIcon className="h-5 w-5" />
                  {t.contacts.instagram}
                </a>
                <a href={TWO_GIS_URL} target="_blank" rel="noopener noreferrer" className={`${btnBase} border-2 border-mint-deep/30 bg-mint text-ink hover:border-mint-deep`}>
                  <MapPinned className="h-5 w-5 text-mint-deep" aria-hidden="true" />
                  {t.contacts.map}
                </a>
              </div>
            </div>
          </Reveal>

          {/* Карта: ссылка на поиск адреса в 2GIS (без выдуманных координат) */}
          <Reveal delay={0.1}>
            <a
              href={TWO_GIS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex h-full min-h-[300px] flex-col justify-end overflow-hidden rounded-[16px_40px_16px_40px] bg-[#EAF6EE] p-6 shadow-soft"
            >
              <MapArt />
              <Cloud className="absolute top-5 left-6 h-9 w-16 animate-float-slow" />
              <Star className="absolute top-8 right-8 h-7 w-7 animate-twinkle" />
              <span className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="relative grid h-16 w-16 place-items-center rounded-[50%_50%_50%_6px] bg-rose-deep text-white shadow-lift transition-transform duration-500 group-hover:-translate-y-2 [transform:rotate(-45deg)]">
                  <Flower className="h-8 w-8 rotate-45" color="#fff" />
                </span>
              </span>
              <span className="relative rounded-3xl bg-white/95 p-4 shadow-sm">
                <span className="block text-[17px] font-black text-ink">{t.contacts.mapTitle}</span>
                <span className="mt-1 block text-[13.5px] leading-snug text-ink-soft">{t.contacts.mapText}</span>
                <span className="mt-3 inline-flex items-center gap-1.5 text-[14px] font-extrabold text-mint-deep">
                  <MapPinned className="h-4 w-4" aria-hidden="true" />
                  {t.contacts.map} →
                </span>
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Декоративная схема улиц — не является реальной картой */
function MapArt() {
  return (
    <svg aria-hidden="true" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <rect width="400" height="300" fill="#EAF6EE" />
      <path d="M-10 90 C 90 70, 160 130, 410 100" stroke="#fff" strokeWidth="18" fill="none" />
      <path d="M120 -10 C 140 90, 90 190, 150 310" stroke="#fff" strokeWidth="14" fill="none" />
      <path d="M260 -10 C 250 100, 300 200, 280 310" stroke="#fff" strokeWidth="12" fill="none" />
      <path d="M-10 220 C 120 200, 260 250, 410 210" stroke="#fff" strokeWidth="14" fill="none" />
      <rect x="20" y="120" width="70" height="60" rx="14" fill="#D7F5DF" />
      <rect x="170" y="140" width="70" height="50" rx="14" fill="#FFE6A7" opacity=".8" />
      <rect x="300" y="130" width="80" height="60" rx="14" fill="#E9D9FF" />
      <rect x="180" y="20" width="60" height="50" rx="14" fill="#FFDCE8" />
      <circle cx="340" cy="40" r="22" fill="#B9EBC8" />
      <circle cx="40" cy="40" r="18" fill="#B9EBC8" />
    </svg>
  );
}
