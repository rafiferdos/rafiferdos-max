"use client";
import { motion } from "motion/react";
import React from "react";

export function NeonText({
  text,
  className = "",
  color = "cyan",
}: {
  text: string;
  className?: string;
  color?: "cyan" | "pink" | "purple" | "green";
}) {
  const colors = {
    cyan: {
      text: "text-cyan-300",
      glow: "0 0 20px #00ffff, 0 0 40px #00ffff, 0 0 60px #00ffff",
    },
    pink: {
      text: "text-pink-300",
      glow: "0 0 20px #ff00ff, 0 0 40px #ff00ff, 0 0 60px #ff00ff",
    },
    purple: {
      text: "text-purple-300",
      glow: "0 0 20px #9333ea, 0 0 40px #9333ea, 0 0 60px #9333ea",
    },
    green: {
      text: "text-green-300",
      glow: "0 0 20px #00ff00, 0 0 40px #00ff00, 0 0 60px #00ff00",
    },
  };

  const selectedColor = colors[color];

  return (
    <motion.span
      className={`inline-block font-bold ${selectedColor.text} ${className}`}
      style={{
        textShadow: selectedColor.glow,
      }}
      animate={{
        textShadow: [
          selectedColor.glow,
          `${selectedColor.glow}, 0 0 80px ${
            color === "cyan"
              ? "#00ffff"
              : color === "pink"
              ? "#ff00ff"
              : color === "purple"
              ? "#9333ea"
              : "#00ff00"
          }`,
          selectedColor.glow,
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {text}
    </motion.span>
  );
}

