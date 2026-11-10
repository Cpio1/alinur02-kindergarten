/**
 * Детский сад туралы негізгі деректер / Основные данные детского сада.
 * Все контакты и ссылки меняются здесь — компоненты берут данные отсюда.
 */

export const SITE = {
  legalName: "«Алинұр балабақшасы» ЖШС",
  name: "Алинұр балабақшасы",
  shortName: "Алинұр",

  phones: [
    { display: "+7 777 583 6173", tel: "+77775836173" },
    { display: "+7 705 631 2056", tel: "+77056312056" },
  ],

  /** Основной номер WhatsApp (только цифры) */
  whatsappNumber: "77775836173",

  instagram: {
    handle: "@ali_nur.balabakshasy",
    url: "https://www.instagram.com/ali_nur.balabakshasy/",
  },

  hours: "08:00–18:00",

  /** Запрос для поиска адреса в 2GIS (без выдуманных ID и координат) */
  twoGisQuery: "Алматы, Боралдай, Төребек Османов көшесі, 81",

  /** Ссылка на папку Google Drive — задаётся через переменную окружения */
  documentsUrl: process.env.NEXT_PUBLIC_DOCUMENTS_URL?.trim() || "",

  /** Реальный адрес сайта — задаётся через переменную окружения */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "") || "",
} as const;

export const WHATSAPP_MESSAGES = {
  kk: "Сәлеметсіз бе! Алинұр балабақшасы туралы ақпарат алғым келеді.",
  ru: "Здравствуйте! Хочу получить информацию о детском саде «Алинұр балабақшасы».",
} as const;

export function whatsappLink(lang: keyof typeof WHATSAPP_MESSAGES = "kk") {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(WHATSAPP_MESSAGES[lang])}`;
}

export const TWO_GIS_URL = `https://2gis.kz/almaty/search/${encodeURIComponent(SITE.twoGisQuery)}`;

/** Документы доступны только если указана корректная https-ссылка */
export function getDocumentsUrl(): string | null {
  const url = SITE.documentsUrl;
  if (!url) return null;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" ? parsed.toString() : null;
  } catch {
    return null;
  }
}

/** Якоря разделов страницы */
export const SECTION_IDS = {
  home: "home",
  about: "about",
  advantages: "advantages",
  groups: "groups",
  nutrition: "nutrition",
  classes: "classes",
  gallery: "gallery",
  documents: "documents",
  contacts: "contacts",
} as const;

export const NAV_ITEMS = [
  { key: "home", id: SECTION_IDS.home },
  { key: "about", id: SECTION_IDS.about },
  { key: "groups", id: SECTION_IDS.groups },
  { key: "nutrition", id: SECTION_IDS.nutrition },
  { key: "classes", id: SECTION_IDS.classes },
  { key: "gallery", id: SECTION_IDS.gallery },
  { key: "contacts", id: SECTION_IDS.contacts },
] as const;

export type NavKey = (typeof NAV_ITEMS)[number]["key"];
