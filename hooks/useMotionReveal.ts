"use client";

import {
  MOTION_EASE,
  REVEAL_DURATION,
  REVEAL_DURATION_REDUCED,
  REVEAL_OFFSET_Y,
  STAGGER_CHILDREN,
  STAGGER_CHILDREN_REDUCED,
} from "@/lib/motion";

import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

export function useMotionReveal() {
  const reducedMotion = useReducedMotionSafe();

  return {
    reducedMotion,
    revealTransition: {
      duration: reducedMotion ? REVEAL_DURATION_REDUCED : REVEAL_DURATION,
      ease: MOTION_EASE,
    },
    revealInitial: {
      opacity: 0,
      y: reducedMotion ? 0 : REVEAL_OFFSET_Y,
    },
    revealAnimate: {
      opacity: 1,
      y: 0,
    },
    staggerChildren: reducedMotion
      ? STAGGER_CHILDREN_REDUCED
      : STAGGER_CHILDREN,
  };
}
