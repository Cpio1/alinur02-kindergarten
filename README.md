# Алинұр балабақшасы — лендинг

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Motion · Lucide. Два языка: қазақша (по умолчанию) и русский. Сайт всегда светлый.

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run build
```

## Структура

| Путь | Назначение |
| --- | --- |
| `src/data/site.ts` | контакты, ссылки WhatsApp / 2GIS / Instagram, навигация |
| `src/data/translations.ts` | все тексты на казахском и русском |
| `src/lib/i18n.tsx` | переключение языка (сохраняется в localStorage) |
| `src/lib/media.ts` | автопоиск фотографий в `public/` при сборке |
| `src/components/layout/` | Header, Footer, плавающая кнопка WhatsApp |
| `src/components/sections/` | разделы страницы |
| `src/components/ui/` | декор, иллюстрации, lightbox, анимации появления |

## Фотографии

Достаточно положить файлы (JPG, JPEG, PNG, WebP) и пересобрать сайт:

| Файл | Где показывается |
| --- | --- |
| `public/images/main-page.png` | первый экран (без файла — иллюстрация) |
| `public/images/about.*` | раздел «Біз туралы» (без файла — иллюстрация) |
| `public/images/logo.png` | логотип в шапке и футере (PNG с прозрачным фоном; без файла — нейтральный значок) |
| `public/images/image1…N.*`, `public/gallery/*`, `public/photos/*` | галерея, сортировка по имени |

Сжать фото: `node scripts/optimize-photo.mjs вход.jpg public/gallery/photo-09.webp`

Логотип: `node scripts/make-logo-png.mjs logo.jpeg public/images/logo.png` — конвертирует в PNG и убирает белый фон снаружи логотипа. Favicon — `src/app/icon.png` и `src/app/apple-icon.png`.

## Переменные окружения

Скопируйте `.env.example` в `.env.local`. На Vercel — Project Settings → Environment Variables, затем redeploy.

- `NEXT_PUBLIC_SITE_URL` — реальный домен. Включает canonical, metadataBase и sitemap. Без него на Vercel используется production-адрес проекта.
- `NEXT_PUBLIC_DOCUMENTS_URL` — https-ссылка на папку Google Drive. Пока пусто, кнопка «Құжаттарды қарау» неактивна.

## Деплой

Импортируйте репозиторий в Vercel — настройки определятся автоматически.
