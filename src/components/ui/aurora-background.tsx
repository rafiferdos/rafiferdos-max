"use client";
import { motion } from "motion/react";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={`relative flex flex-col h-full w-full items-center justify-center bg-zinc-50 dark:bg-zinc-900 text-slate-950 transition-bg ${className}`}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`
            [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)]
            [background-image:var(--aurora)]
            dark:[--aurora:repeating-linear-gradient(100deg,var(--blue-900)_10%,var(--indigo-700)_15%,var(--blue-700)_20%,var(--violet-600)_25%,var(--blue-800)_30%)]
            absolute -inset-[10px] opacity-50
          `}
        >
          <motion.div
            initial={{ rotate: 0, scale: 1 }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 60,
              repeat: Infinity,
              ease: "linear",
            }}
            className="h-full w-full blur-[100px] saturate-150"
          />
        </div>
        
        <div
          className={`
            [--aurora:repeating-linear-gradient(150deg,var(--violet-500)_10%,var(--purple-300)_15%,var(--blue-300)_20%,var(--indigo-200)_25%,var(--violet-400)_30%)]
            [background-image:var(--aurora)]
            dark:[--aurora:repeating-linear-gradient(150deg,var(--violet-800)_10%,var(--purple-700)_15%,var(--blue-700)_20%,var(--indigo-600)_25%,var(--violet-700)_30%)]
            absolute -inset-[10px] opacity-40
          `}
        >
          <motion.div
            initial={{ rotate: 180, scale: 1 }}
            animate={{
              rotate: [180, -180],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 45,
              repeat: Infinity,
              ease: "linear",
            }}
            className="h-full w-full blur-[120px] saturate-200"
          />
        </div>
      </div>

      {showRadialGradient && (
        <div
          className={`absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]`}
        />
      )}
      {children}
    </div>
  );
};
