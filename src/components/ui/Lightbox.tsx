"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Labels = { close: string; prev: string; next: string; viewer: string };

type Props = {
  images: string[];
  index: number | null;
  alt: (i: number) => string;
  labels: Labels;
  onClose: () => void;
  onChange: (i: number) => void;
};

export function Lightbox({ images, index, alt, labels, onClose, onChange }: Props) {
  const open = index !== null;
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  const count = images.length;
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      onChange((index + dir + count) % count);
    },
    [index, count, onChange],
  );
  const goRef = useRef(go);
  const closeFnRef = useRef(onClose);
  useEffect(() => {
    goRef.current = go;
    closeFnRef.current = onClose;
  }, [go, onClose]);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeFnRef.current();
      else if (e.key === "ArrowRight") goRef.current(1);
      else if (e.key === "ArrowLeft") goRef.current(-1);
      else if (e.key === "Tab" && dialogRef.current) {
        // Удерживаем фокус внутри окна
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>("button");
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && index !== null && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={labels.viewer}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 p-3 backdrop-blur-sm sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <motion.div
            key={index}
            className="relative h-[78dvh] w-full max-w-5xl"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.target === e.currentTarget && onClose()}
          >
            <Image src={images[index]} alt={alt(index)} fill sizes="100vw" className="rounded-2xl object-contain" />
          </motion.div>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={labels.close}
            className="absolute top-[max(12px,env(safe-area-inset-top))] right-3 grid h-12 w-12 place-items-center rounded-full bg-white text-ink shadow-lg transition hover:bg-lilac sm:right-6"
          >
            <X className="h-6 w-6" />
          </button>
          {count > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label={labels.prev}
                className="absolute bottom-[max(16px,env(safe-area-inset-bottom))] left-4 grid h-12 w-12 place-items-center rounded-full bg-white text-ink shadow-lg transition hover:bg-lilac sm:top-1/2 sm:bottom-auto sm:left-6 sm:-translate-y-1/2"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label={labels.next}
                className="absolute right-4 bottom-[max(16px,env(safe-area-inset-bottom))] grid h-12 w-12 place-items-center rounded-full bg-white text-ink shadow-lg transition hover:bg-lilac sm:top-1/2 sm:right-6 sm:bottom-auto sm:-translate-y-1/2"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              <p
                aria-live="polite"
                className="absolute bottom-[max(28px,calc(env(safe-area-inset-bottom)+12px))] left-1/2 -translate-x-1/2 rounded-full bg-white/15 px-3 py-1 text-sm font-bold text-white sm:bottom-6"
              >
                {index + 1} / {count}
              </p>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
