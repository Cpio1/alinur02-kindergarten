"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { DEFAULT_LANG, dictionaries, LANGS, type Dictionary, type Lang } from "@/data/translations";

const STORAGE_KEY = "alinur-lang";

type I18nValue = { lang: Lang; t: Dictionary; setLang: (lang: Lang) => void };

const I18nContext = createContext<I18nValue | null>(null);

function isLang(value: unknown): value is Lang {
  return value === "kk" || value === "ru";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  // Сервер и первый клиентский рендер всегда на казахском — без ошибок гидратации.
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (isLang(saved) && saved !== DEFAULT_LANG) setLangState(saved);
    } catch {
      /* localStorage недоступен — остаёмся на языке по умолчанию */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = LANGS.find((l) => l.code === lang)?.htmlLang ?? "kk";
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(() => ({ lang, t: dictionaries[lang], setLang }), [lang, setLang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
