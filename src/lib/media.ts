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

/** Размеры PNG/JPEG/WebP по заголовку файла (без сторонних библиотек) */
function readSize(file: string): { w: number; h: number } | null {
  try {
    const buf = fs.readFileSync(file);
    // PNG
    if (buf.readUInt32BE(0) === 0x89504e47) return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
    // JPEG: ищем маркер SOFn
    if (buf[0] === 0xff && buf[1] === 0xd8) {
      let i = 2;
      while (i < buf.length) {
        if (buf[i] !== 0xff) { i++; continue; }
        const marker = buf[i + 1];
        const len = buf.readUInt16BE(i + 2);
        if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
          return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7) };
        }
        i += 2 + len;
      }
    }
    // WebP (VP8X / VP8 / VP8L)
    if (buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
      const chunk = buf.toString("ascii", 12, 16);
      if (chunk === "VP8X") return { w: 1 + buf.readUIntLE(24, 3), h: 1 + buf.readUIntLE(27, 3) };
      if (chunk === "VP8 ") return { w: buf.readUInt16LE(26) & 0x3fff, h: buf.readUInt16LE(28) & 0x3fff };
      if (chunk === "VP8L") {
        const b = buf.readUInt32LE(21);
        return { w: (b & 0x3fff) + 1, h: ((b >> 14) & 0x3fff) + 1 };
      }
    }
  } catch {
    /* ignore */
  }
  return null;
}

/** Соотношение сторон (ширина / высота) изображения из public/; null — если не удалось определить */
export function getImageRatio(src: string | null): number | null {
  if (!src) return null;
  const size = readSize(path.join(PUBLIC_DIR, decodeURIComponent(src)));
  return size && size.w && size.h ? size.w / size.h : null;
}

export type GalleryImage = { src: string; ratio: number | null };

/** Галерея вместе с пропорциями — для выбора формы плитки */
export function getGalleryItems(): GalleryImage[] {
  return getGalleryImages().map((src) => ({ src, ratio: getImageRatio(src) }));
}
