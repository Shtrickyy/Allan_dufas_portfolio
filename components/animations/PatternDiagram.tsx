"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

import { patternFlow } from "@/constants/home";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

type PatternDiagramProps = {
  progress: MotionValue<number>;
};

const STAGE_X = [80, 280, 480, 680, 880];

export function PatternDiagram({ progress }: PatternDiagramProps) {
  const reducedMotion = useReducedMotionSafe();
  const lineOpacity = useTransform(progress, [0, 0.2], [0.25, 1]);

  return (
    <div>
      <svg
        viewBox="0 0 960 220"
        role="img"
        aria-hidden
        className="h-auto w-full text-border"
      >
        <motion.line
          x1="80"
          y1="110"
          x2="880"
          y2="110"
          stroke="currentColor"
          style={{ opacity: lineOpacity }}
        />
        {patternFlow.stages.map((stage, index) => (
          <PatternNode
            key={stage.id}
            index={index}
            label={stage.label}
            progress={progress}
            reducedMotion={reducedMotion}
          />
        ))}
      </svg>
      <div className="mt-6 grid grid-cols-5 gap-4">
        {patternFlow.stages.map((stage, index) => {
          const mappedSystems = patternFlow.systems.filter(
            (system) => system.stageId === stage.id,
          );

          return (
            <PatternSystemLabels
              key={stage.id}
              index={index}
              systems={mappedSystems}
              progress={progress}
              reducedMotion={reducedMotion}
            />
          );
        })}
      </div>
    </div>
  );
}

function PatternNode({
  index,
  label,
  progress,
  reducedMotion,
}: {
  index: number;
  label: string;
  progress: MotionValue<number>;
  reducedMotion: boolean;
}) {
  const start = 0.12 + index * 0.14;
  const end = start + 0.12;
  const opacity = useTransform(
    progress,
    reducedMotion ? [start, start + 0.01] : [start, end],
    [0, 1],
  );
  const y = useTransform(
    progress,
    reducedMotion ? [start, start + 0.01] : [start, end],
    [16, 0],
  );
  const x = STAGE_X[index];

  return (
    <motion.g style={{ opacity, y }}>
      <rect
        x={x - 48}
        y="70"
        width="96"
        height="80"
        rx="8"
        fill="var(--color-surface)"
        stroke="var(--color-border)"
      />
      <text
        x={x}
        y="118"
        textAnchor="middle"
        fill="#17161c"
        fontSize="12"
        fontWeight="500"
      >
        {label}
      </text>
    </motion.g>
  );
}

function PatternSystemLabels({
  index,
  systems,
  progress,
  reducedMotion,
}: {
  index: number;
  systems: ReadonlyArray<{ name: string }>;
  progress: MotionValue<number>;
  reducedMotion: boolean;
}) {
  const start = 0.18 + index * 0.14;
  const end = start + 0.12;
  const opacity = useTransform(
    progress,
    reducedMotion ? [start, start + 0.01] : [start, end],
    [0, 1],
  );
  const y = useTransform(
    progress,
    reducedMotion ? [start, start + 0.01] : [start, end],
    [8, 0],
  );

  if (systems.length === 0) {
    return <div />;
  }

  return (
    <motion.div style={{ opacity, y }} className="space-y-2 text-center">
      {systems.map((system) => (
        <p
          key={system.name}
          className="font-mono text-[10px] font-medium tracking-widest text-accent uppercase"
        >
          {system.name}
        </p>
      ))}
    </motion.div>
  );
}
