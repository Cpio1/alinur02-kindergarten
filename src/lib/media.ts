import "server-only";
import fs from "node:fs";
import path from "node:path";

/**
 * Поиск фотографий в public/ во время сборки.
 * Достаточно положить файлы в папку и пересобрать сайт — код менять не нужно.
 */

const IMAGE_EXT = /\.(jpe?g|png|webp)$/i;
const PUBLIC_DIR = path.join(process.cwd(), "public");

/** Файлы с этими именами в public/images используются в отдельных блоках, а не в галерее */
const RESERVED = /^(hero|about|logo)\./i;

function listImages(dir: string): string[] {
  const abs = path.join(PUBLIC_DIR, dir);
  try {
    return fs
      .readdirSync(abs)
      .filter((f) => IMAGE_EXT.test(f) && !f.startsWith("."))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((f) => `/${dir}/${f.split("/").map(encodeURIComponent).join("/")}`);
  } catch {
    return [];
  }
}

/** Находит public/images/<name>.(webp|jpg|jpeg|png) */
export function findImage(name: string): string | null {
  for (const ext of ["webp", "jpg", "jpeg", "png"]) {
    if (fs.existsSync(path.join(PUBLIC_DIR, "images", `${name}.${ext}`))) return `/images/${name}.${ext}`;
  }
  return null;
}

/** Галерея: public/gallery, затем public/photos, затем прочие файлы из public/images */
export function getGalleryImages(): string[] {
  const images = listImages("images").filter((src) => !RESERVED.test(decodeURIComponent(src.split("/").pop() ?? "")));
  return [...listImages("gallery"), ...listImages("photos"), ...images];
}
