"use client";

import { motion } from "motion/react";
import { whatsappLink } from "@/data/site";
import { useI18n } from "@/lib/i18n";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

/** Плавающая кнопка WhatsApp — учитывает безопасные зоны телефона */
export function FloatingWhatsApp() {
  const { t, lang } = useI18n();
  return (
    <motion.a
      href={whatsappLink(lang)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.whatsappFloat}
      title={t.whatsappFloat}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8, type: "spring", stiffness: 260, damping: 18 }}
      className="group fixed right-[max(16px,env(safe-area-inset-right))] bottom-[max(16px,env(safe-area-inset-bottom))] z-40 grid h-14 w-14 place-items-center rounded-full bg-wa text-white shadow-[0_12px_28px_-8px_rgb(31_168_85/0.7)] transition-transform hover:scale-105 sm:right-6 sm:bottom-6"
    >
      <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full bg-wa opacity-25 [animation-duration:2.6s] motion-reduce:hidden" />
      <WhatsAppIcon className="relative h-7 w-7" />
    </motion.a>
  );
}
