import "server-only";
import fs from "node:fs";
import path from "node:path";

/**
 * Поиск фотографий в public/ во время сборки.
 * Достаточно положить файлы в папку и пересобрать сайт — код менять не нужно.
 * Имена файлов чувствительны к регистру на Vercel — используются ровно так, как лежат на диске.
 */

const IMAGE_EXT = /\.(jpe?g|png|webp)$/i;
const PUBLIC_DIR = path.join(process.cwd(), "public");

/**
 * Файлы с этими именами в public/images используются в отдельных блоках, а не в галерее:
 * logo.*, main-page.*, main-page2.* (исходник главной фотографии), hero.*, about.*
 */
const RESERVED = /^(logo|main-page\d*|hero|about)\.[a-z]+$/i;

function listImages(dir: string): string[] {
  const abs = path.join(PUBLIC_DIR, dir);
  try {
    return fs
      .readdirSync(abs)
      .filter((f) => IMAGE_EXT.test(f) && !f.startsWith("."))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((f) => `/${dir}/${encodeURIComponent(f)}`);
  } catch {
    return [];
  }
}

/** Находит первый существующий файл public/images/<name>.<ext>; PNG — в приоритете */
export function findImage(...names: string[]): string | null {
  let files: string[] = [];
  try {
    files = fs.readdirSync(path.join(PUBLIC_DIR, "images"));
  } catch {
    return null;
  }
  for (const name of names) {
    for (const ext of ["png", "webp", "jpg", "jpeg"]) {
      const match = files.find((f) => f.toLowerCase() === `${name}.${ext}`);
      if (match) return `/images/${encodeURIComponent(match)}`;
    }
  }
  return null;
}

/** Галерея: public/gallery, public/photos и прочие (не зарезервированные) файлы из public/images */
export function getGalleryImages(): string[] {
  const images = listImages("images").filter((src) => !RESERVED.test(decodeURIComponent(src.split("/").pop() ?? "")));
  return [...listImages("gallery"), ...listImages("photos"), ...images];
}
