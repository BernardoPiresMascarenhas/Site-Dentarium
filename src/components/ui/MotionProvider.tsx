"use client";

import { MotionConfig } from "motion/react";

/** Todas as animações do Motion respeitam `prefers-reduced-motion`. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
