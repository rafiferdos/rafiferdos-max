"use client";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import React, { useRef } from "react";

export function HolographicCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["20deg", "-20deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-20deg", "20deg"]);
  
  const transformStyle = useTransform(
    [mouseXSpring, mouseYSpring],
    ([latestX, latestY]) => {
      const x = latestX as number;
      const y = latestY as number;
      return `perspective(1000px) rotateX(${y * 20}deg) rotateY(${x * -20}deg) translateZ(50px)`;
    }
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transformStyle: "preserve-3d",
      }}
      className={`relative ${className}`}
    >
      {/* Holographic effect layers */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-xl" />
      
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-60"
        style={{
          background: `
            linear-gradient(105deg, transparent 40%, rgba(0, 255, 255, 0.3) 45%, transparent 50%),
            linear-gradient(105deg, transparent 40%, rgba(255, 0, 255, 0.3) 45%, transparent 50%)
          `,
          backgroundSize: "200% 200%",
          transform: "translateZ(2px)",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Glitch effect overlay */}
      <motion.div
        className="absolute inset-0 rounded-2xl mix-blend-screen pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0, 255, 255, 0.03) 2px,
              rgba(0, 255, 255, 0.03) 4px
            )
          `,
          transform: "translateZ(3px)",
        }}
      />
      
      {/* Content container */}
      <div
        className="relative rounded-2xl backdrop-blur-sm bg-black/40 border border-cyan-500/30 overflow-hidden"
        style={{
          transform: "translateZ(20px)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Animated border gradient */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `
              linear-gradient(90deg, 
                transparent, 
                rgba(0, 255, 255, 0.5), 
                transparent
              )
            `,
            backgroundSize: "200% 100%",
          }}
          animate={{
            backgroundPosition: ["-200% 0", "200% 0"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        {children}
      </div>
      
      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
}

