import { SITE } from "@/data/site";

/**
 * Базовый URL для sitemap/robots/Open Graph.
 * Используется только реальный адрес: NEXT_PUBLIC_SITE_URL или production-адрес проекта на Vercel.
 */
export function getBaseUrl(): string | null {
  if (SITE.siteUrl) return SITE.siteUrl;
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return null;
}

export const SEO = {
  title: "Алинұр балабақшасы | Алматы",
  description:
    "Алматы қаласындағы Алинұр балабақшасы. Қазақ тілінде тәрбие, 3 топ, күніне 5 рет тамақтану, логопед, таеквондо және ағылшын тілі сабақтары.",
};
