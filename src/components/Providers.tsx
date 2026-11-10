"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { I18nProvider } from "@/lib/i18n";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      {/* reducedMotion="user" — отключает анимации при prefers-reduced-motion */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </I18nProvider>
  );
}
