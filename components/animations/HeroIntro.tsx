"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { useHeroIntroSeen } from "@/hooks/useHeroIntroSeen";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { HERO_INTRO_DURATION, MOTION_EASE } from "@/lib/motion";

const GRID_POINTS = [
  { id: "a", x: 24, y: 18 },
  { id: "b", x: 72, y: 22 },
  { id: "c", x: 120, y: 16 },
  { id: "d", x: 168, y: 28 },
  { id: "e", x: 216, y: 20 },
  { id: "f", x: 36, y: 56 },
  { id: "g", x: 84, y: 62 },
  { id: "h", x: 132, y: 58 },
  { id: "i", x: 180, y: 64 },
  { id: "j", x: 228, y: 54 },
] as const;

const SCATTERED_POINTS = [
  { id: "a", x: 12, y: 8 },
  { id: "b", x: 88, y: 14 },
  { id: "c", x: 154, y: 6 },
  { id: "d", x: 206, y: 34 },
  { id: "e", x: 238, y: 12 },
  { id: "f", x: 28, y: 72 },
  { id: "g", x: 102, y: 48 },
  { id: "h", x: 146, y: 78 },
  { id: "i", x: 198, y: 52 },
  { id: "j", x: 224, y: 76 },
] as const;

type IntroPhase = "idle" | "intro";

export function HeroIntro() {
  const { readIntroSeen, markIntroSeen } = useHeroIntroSeen();
  const reducedMotion = useReducedMotionSafe();
  const [phase, setPhase] = useState<IntroPhase>("idle");

  useEffect(() => {
    if (readIntroSeen()) {
      return;
    }

    if (reducedMotion) {
      markIntroSeen();
      return;
    }

    const frame = requestAnimationFrame(() => {
      setPhase("intro");
    });

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [markIntroSeen, readIntroSeen, reducedMotion]);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-24 mx-auto h-28 max-w-[1200px] opacity-40 md:top-28"
    >
      <svg viewBox="0 0 260 90" className="h-full w-full max-w-sm">
        {GRID_POINTS.map((point, index) => {
          const scattered = SCATTERED_POINTS[index];
          const isAnimating = phase === "intro";

          return (
            <motion.rect
              key={`${point.id}-${phase}`}
              width="4"
              height="4"
              rx="1"
              fill="var(--color-accent)"
              initial={
                isAnimating
                  ? { x: scattered.x, y: scattered.y, opacity: 0.15 }
                  : { x: point.x, y: point.y, opacity: 0.35 }
              }
              animate={{ x: point.x, y: point.y, opacity: 0.35 }}
              transition={
                isAnimating
                  ? {
                      duration: HERO_INTRO_DURATION,
                      ease: MOTION_EASE,
                      delay: index * 0.04,
                    }
                  : { duration: 0 }
              }
              onAnimationComplete={
                index === GRID_POINTS.length - 1 && isAnimating
                  ? markIntroSeen
                  : undefined
              }
            />
          );
        })}
      </svg>
    </div>
  );
}
