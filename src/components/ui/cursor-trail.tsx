"use client";
import { motion, useMotionValue, useSpring } from "motion/react";
import React, { useEffect } from "react";

export interface CursorTrailProps {
  color?: string;
  size?: number; // diameter in px
  duration?: number; // seconds for easing
}

// A subtle, performant cursor follower with blur and blend for a premium feel.
export function CursorTrail({
  color = "rgba(79,70,229,0.6)",
  size = 20,
  duration = 0.5,
}: CursorTrailProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, { stiffness: 200, damping: 25 });
  const smoothY = useSpring(y, { stiffness: 200, damping: 25 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      x.set(e.clientX - size / 2);
      y.set(e.clientY - size / 2);
    };
    window.addEventListener("mousemove", handler, { passive: true } as any);
    return () => window.removeEventListener("mousemove", handler as any);
  }, [size, x, y]);

  return (
    <motion.div
      aria-hidden
      style={{
        left: smoothX,
        top: smoothY,
        width: size,
        height: size,
      }}
      className="pointer-events-none fixed z-[60] hidden md:block"
    >
      <div
        className="h-full w-full rounded-full blur-sm"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${color} 0%, transparent 70%)`,
          mixBlendMode: "screen",
          transition: `transform ${duration}s ease`,
        }}
      />
    </motion.div>
  );
}

export default CursorTrail;
