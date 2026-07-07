"use client";

import { motion } from "framer-motion";

import { useMotionReveal } from "@/hooks/useMotionReveal";
import { VIEWPORT_ONCE } from "@/lib/motion";
import { cn } from "@/lib/utils";

type FadeUpProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "article";
};

export function FadeUp({
  children,
  className,
  delay = 0,
  as = "div",
}: FadeUpProps) {
  const Component = motion[as];
  const { revealInitial, revealAnimate, revealTransition } = useMotionReveal();

  return (
    <Component
      className={className}
      initial={revealInitial}
      whileInView={revealAnimate}
      viewport={VIEWPORT_ONCE}
      transition={{ ...revealTransition, delay }}
    >
      {children}
    </Component>
  );
}

type FadeUpStaggerProps = {
  children: React.ReactNode;
  className?: string;
};

export function FadeUpStagger({ children, className }: FadeUpStaggerProps) {
  const { staggerChildren } = useMotionReveal();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function FadeUpItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { revealInitial, revealAnimate, revealTransition } = useMotionReveal();

  return (
    <motion.div
      className={cn(className)}
      variants={{
        hidden: revealInitial,
        visible: {
          ...revealAnimate,
          transition: revealTransition,
        },
      }}
    >
      {children}
    </motion.div>
  );
}
