"use client";

import { useScroll } from "framer-motion";
import type { MotionValue } from "framer-motion";
import type { RefObject } from "react";

export function useScrollProgress(
  targetRef: RefObject<HTMLElement | null>,
): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  return scrollYProgress;
}
