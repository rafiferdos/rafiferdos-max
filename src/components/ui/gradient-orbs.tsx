"use client";
import React from "react";
import { motion } from "motion/react";

export function GradientOrbs() {
  const orbs = [
    {
      size: "400px",
      color: "from-violet-600 to-indigo-600",
      position: { top: "-10%", left: "-10%" },
      animation: {
        x: [0, 100, 0],
        y: [0, -50, 0],
        scale: [1, 1.2, 1],
      },
      duration: 20,
    },
    {
      size: "350px",
      color: "from-blue-600 to-cyan-600",
      position: { top: "60%", right: "-5%" },
      animation: {
        x: [0, -100, 0],
        y: [0, 100, 0],
        scale: [1.2, 1, 1.2],
      },
      duration: 25,
    },
    {
      size: "300px",
      color: "from-purple-600 to-pink-600",
      position: { bottom: "-10%", left: "30%" },
      animation: {
        x: [0, 50, 0],
        y: [0, -100, 0],
        scale: [1, 1.3, 1],
      },
      duration: 30,
    },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full bg-gradient-to-br ${orb.color} opacity-20 dark:opacity-10 blur-3xl`}
          style={{
            width: orb.size,
            height: orb.size,
            ...orb.position,
          }}
          animate={orb.animation}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
