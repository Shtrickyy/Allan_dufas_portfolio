"use client";

import { animate, motion, useInView, useMotionValue } from "framer-motion";
import { useEffect, useRef } from "react";

import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { COUNT_UP_DURATION, MOTION_EASE, VIEWPORT_ONCE } from "@/lib/motion";
import { cn } from "@/lib/utils";

function parseNumericLabel(label: string) {
  const match = label.match(/^(.*?)(~?)(\d+(?:\.\d+)?)(.*)$/);

  if (!match) {
    return null;
  }

  const [, prefix, approx, value, suffix] = match;

  return {
    prefix,
    approx,
    value: Number(value),
    suffix,
  };
}

type CountUpProps = {
  label: string;
  className?: string;
};

export function CountUp({ label, className }: CountUpProps) {
  const reducedMotion = useReducedMotionSafe();
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, VIEWPORT_ONCE);
  const parsed = parseNumericLabel(label);
  const motionValue = useMotionValue(0);
  const displayRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!parsed || !isInView || !displayRef.current) {
      return;
    }

    const { prefix, approx, value, suffix } = parsed;
    const updateText = (current: number) => {
      if (displayRef.current) {
        displayRef.current.textContent = `${prefix}${approx}${Math.round(current)}${suffix}`;
      }
    };

    if (reducedMotion) {
      motionValue.set(value);
      updateText(value);
      return;
    }

    updateText(0);
    const controls = animate(motionValue, value, {
      duration: COUNT_UP_DURATION,
      ease: "easeOut",
      onUpdate: (latest) => updateText(latest),
    });

    return () => controls.stop();
  }, [isInView, motionValue, parsed, reducedMotion]);

  if (!parsed) {
    return (
      <motion.span
        ref={ref}
        className={cn(
          "inline-flex rounded-sm border border-border bg-surface px-2.5 py-1 font-mono text-xs font-medium tracking-widest text-ink-primary uppercase",
          className,
        )}
        initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{
          duration: reducedMotion ? 0.15 : 0.45,
          ease: MOTION_EASE,
        }}
      >
        {label}
      </motion.span>
    );
  }

  const { prefix, approx, suffix } = parsed;

  return (
    <motion.span
      ref={ref}
      className={cn(
        "inline-flex rounded-sm border border-border bg-surface px-2.5 py-1 font-mono text-xs font-medium tracking-widest text-ink-primary uppercase",
        className,
      )}
      initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{
        duration: reducedMotion ? 0.15 : 0.45,
        ease: MOTION_EASE,
      }}
    >
      <span ref={displayRef}>{`${prefix}${approx}0${suffix}`}</span>
    </motion.span>
  );
}
