"use client";
import React from "react";
import { motion } from "motion/react";

export function ShimmerButton({
  children,
  className = "",
  shimmerColor = "#ffffff",
  shimmerSize = "0.1em",
  borderRadius = "100px",
  shimmerDuration = "3s",
  background = "linear-gradient(110deg,#000103 45%,#1e2631 55%)",
  onClick,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  onClick?: () => void;
  [key: string]: any;
}) {
  return (
    <motion.button
      style={
        {
          "--spread": "90deg",
          "--shimmer-color": shimmerColor,
          "--radius": borderRadius,
          "--speed": shimmerDuration,
          "--cut": shimmerSize,
          "--bg": background,
        } as React.CSSProperties
      }
      className={`group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap px-6 py-3 text-white [background:var(--bg)] [border-radius:var(--radius)] 
        before:absolute before:inset-0 before:z-[-1] before:translate-x-[-150%] before:translate-y-[-150%] before:scale-[2.5] before:rounded-[100%] before:[background:linear-gradient(var(--spread),transparent,var(--shimmer-color),transparent)] before:[transition:transform_var(--speed)_ease-in-out]
        hover:before:translate-x-[200%] hover:before:translate-y-[200%]
        dark:text-white ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
}
