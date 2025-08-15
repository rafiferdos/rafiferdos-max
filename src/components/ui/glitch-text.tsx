"use client";
import React from "react";
import { motion } from "motion/react";

export function GlitchText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <div className={`relative inline-block ${className}`}>
      <motion.div
        className="relative"
        animate={{
          x: [0, -2, 2, 0],
          filter: [
            "hue-rotate(0deg)",
            "hue-rotate(180deg)",
            "hue-rotate(0deg)",
          ],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatDelay: 5,
        }}
      >
        <span className="relative z-10">{text}</span>
        
        <motion.span
          className="absolute top-0 left-0 text-cyan-400 dark:text-cyan-300"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 33%, 0 33%)" }}
          animate={{
            x: [-2, 2, -2],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 0.2,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        >
          {text}
        </motion.span>
        
        <motion.span
          className="absolute top-0 left-0 text-red-400 dark:text-red-300"
          style={{ clipPath: "polygon(0 67%, 100% 67%, 100% 100%, 0 100%)" }}
          animate={{
            x: [2, -2, 2],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 0.2,
            repeat: Infinity,
            repeatDelay: 4,
          }}
        >
          {text}
        </motion.span>
      </motion.div>
    </div>
  );
}
