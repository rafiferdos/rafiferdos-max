"use client";
import React from "react";
import { motion } from "motion/react";

export interface GlitchTextProps {
  text: string;
  className?: string;
  intensity?: number; // 0-1 multiplier for offsets
}

// Lightweight glitch-style text, safe for production use.
export function GlitchText({ text, className = "", intensity = 1 }: GlitchTextProps) {
  const offset = 0.6 * intensity;
  return (
    <div className={`relative inline-block ${className}`} aria-label={text}>
      <span className="relative z-10">{text}</span>
      <motion.span
        aria-hidden
        className="absolute inset-0 z-0 text-cyan-400/50 mix-blend-screen"
        initial={{ x: 0, y: 0, opacity: 0.3 }}
        animate={{ x: [0, -offset, 0], y: [0, offset, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        {text}
      </motion.span>
      <motion.span
        aria-hidden
        className="absolute inset-0 z-0 text-pink-400/50 mix-blend-screen"
        initial={{ x: 0, y: 0, opacity: 0.3 }}
        animate={{ x: [0, offset, 0], y: [0, -offset, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
      >
        {text}
      </motion.span>
    </div>
  );
}

export default GlitchText;
