"use client";
import React from "react";
import { motion, useAnimationFrame } from "motion/react";
import { useRef } from "react";

export function MovingBorderButton({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration = 2000,
  className,
  ...otherProps
}: {
  borderRadius?: string;
  children: React.ReactNode;
  as?: any;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  [key: string]: any;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useRef(0);

  useAnimationFrame((time) => {
    const length = 400;
    progress.current = (time / duration) % 1;
    
    if (ref.current) {
      const angle = progress.current * Math.PI * 2;
      const x = Math.cos(angle) * 100 + 50;
      const y = Math.sin(angle) * 100 + 50;
      
      ref.current.style.background = `conic-gradient(from ${angle}rad at ${x}% ${y}%, #3b82f6, #8b5cf6, #ec4899, #3b82f6)`;
    }
  });

  return (
    <Component
      className={`relative text-xl p-[2px] overflow-hidden ${containerClassName}`}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}
    >
      <div
        ref={ref}
        className={`absolute inset-0 opacity-100 blur-sm ${borderClassName}`}
        style={{
          borderRadius: borderRadius,
        }}
      />
      <div
        className={`relative bg-slate-900/90 dark:bg-zinc-900/90 backdrop-blur-xl text-white flex items-center justify-center w-full h-full text-sm px-6 py-3 ${className}`}
        style={{
          borderRadius: `calc(${borderRadius} - 2px)`,
        }}
      >
        {children}
      </div>
    </Component>
  );
}
