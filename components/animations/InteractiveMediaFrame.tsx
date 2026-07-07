"use client";

import { motion } from "framer-motion";

import { MediaPlaceholder } from "@/components/system/MediaPlaceholder";
import { cn } from "@/lib/utils";

const GRID = [
  { x: 18, y: 20 },
  { x: 42, y: 20 },
  { x: 66, y: 20 },
  { x: 90, y: 20 },
  { x: 18, y: 44 },
  { x: 42, y: 44 },
  { x: 66, y: 44 },
  { x: 90, y: 44 },
] as const;

const SCATTER = [
  { x: 8, y: 12 },
  { x: 52, y: 8 },
  { x: 96, y: 18 },
  { x: 74, y: 34 },
  { x: 24, y: 52 },
  { x: 58, y: 48 },
  { x: 88, y: 56 },
  { x: 12, y: 38 },
] as const;

type InteractiveMediaFrameProps = {
  title: string;
  className?: string;
};

export function InteractiveMediaFrame({
  title,
  className,
}: InteractiveMediaFrameProps) {
  return (
    <motion.div
      className={cn("relative block", className)}
      initial="rest"
      whileHover="hover"
      variants={{
        rest: { y: 0 },
        hover: {
          y: -2,
          transition: { duration: 0.25, ease: "easeOut" },
        },
      }}
    >
      <motion.div
        variants={{
          rest: {
            borderColor: "var(--color-border)",
            boxShadow: "none",
          },
          hover: {
            borderColor: "var(--color-border-accent-20)",
            boxShadow: "var(--shadow-elevation-1)",
            transition: { duration: 0.25, ease: "easeOut" },
          },
        }}
        className="overflow-hidden rounded-md border"
      >
        <MediaPlaceholder title={title} className="rounded-none border-0" />
      </motion.div>
      <motion.svg
        viewBox="0 0 120 72"
        className="pointer-events-none absolute inset-0 h-full w-full"
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 1, transition: { duration: 0.2 } },
        }}
      >
        {GRID.map((point, index) => (
          <motion.rect
            key={`${point.x}-${point.y}`}
            width="3"
            height="3"
            rx="0.5"
            fill="var(--color-accent)"
            variants={{
              rest: {
                x: SCATTER[index].x,
                y: SCATTER[index].y,
                opacity: 0.15,
              },
              hover: {
                x: point.x,
                y: point.y,
                opacity: 0.45,
                transition: { duration: 0.25, ease: "easeOut" },
              },
            }}
          />
        ))}
      </motion.svg>
    </motion.div>
  );
}
