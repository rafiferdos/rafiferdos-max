import { cn } from "@/lib/utils";
import { AnimatePresence, motion, Variants } from "motion/react";
import React, { useRef } from "react";

export interface SpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  spotlightColor?: string;
  spotlightIntensity?: number;
  enableAnimations?: boolean;
}

export function Spotlight({
  children,
  className,
  spotlightColor = "#4332CF",
  spotlightIntensity = 80,
  enableAnimations = true,
  ...props
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const normalizedIntensity = spotlightIntensity / 100;

  const baseVariants: Variants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    pulse: {
      opacity: [
        normalizedIntensity * 0.3,
        normalizedIntensity * 0.4,
        normalizedIntensity * 0.3,
      ],
      scale: [1, 1.1, 1],
      transition: {
        duration: 8,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: [0.42, 0, 0.58, 1],
      },
    },
  };

  const middleVariants: Variants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    pulse: {
      opacity: [
        normalizedIntensity * 0.6,
        normalizedIntensity * 0.7,
        normalizedIntensity * 0.6,
      ],
      scale: [1, 1.05, 1],
      transition: {
        duration: 6,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: [0.42, 0, 0.58, 1],
        delay: 0.5,
      },
    },
  };

  const mainVariants: Variants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    pulse: {
      opacity: [
        normalizedIntensity,
        normalizedIntensity * 1.1,
        normalizedIntensity,
      ],
      scale: [1, 1.02, 1],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: [0.42, 0, 0.58, 1],
        delay: 1,
      },
    },
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <AnimatePresence>
        <motion.div
          key="base-layer"
          className="absolute inset-0 w-full z-0"
          initial="initial"
          animate={enableAnimations ? "pulse" : "animate"}
          variants={baseVariants}
          style={{
            background: `radial-gradient(ellipse at 50% 100%, 
              ${spotlightColor} 0%,
              rgba(67, 50, 207, 0.4) 25%,
              rgba(67, 50, 207, 0.1) 50%,
              transparent 80%)`,
            mixBlendMode: "screen",
          }}
        />

        <motion.div
          key="middle-layer"
          className="absolute inset-0 w-full z-0"
          initial="initial"
          animate={enableAnimations ? "pulse" : "animate"}
          variants={middleVariants}
          style={{
            background: `radial-gradient(ellipse at 50% 100%, 
              ${spotlightColor} 0%,
              rgba(67, 50, 207, 0.6) 20%,
              rgba(67, 50, 207, 0.2) 40%,
              transparent 70%)`,
            mixBlendMode: "screen",
          }}
        />

        <motion.div
          key="main-layer"
          className="absolute inset-0 w-full z-0"
          initial="initial"
          animate={enableAnimations ? "pulse" : "animate"}
          variants={mainVariants}
          style={{
            background: `radial-gradient(ellipse at 50% 100%, 
              ${spotlightColor} 0%, 
              rgba(67, 50, 207, 0.8) 15%,
              rgba(67, 50, 207, 0.3) 35%,
              transparent 70%)`,
            mixBlendMode: "screen",
          }}
        />
      </AnimatePresence>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
