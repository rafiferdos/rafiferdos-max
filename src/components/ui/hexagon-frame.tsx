"use client";
import { motion } from "motion/react";
import React from "react";

export function HexagonFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      {/* Animated Hexagon Border */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00ffff" stopOpacity="0.8">
              <animate
                attributeName="stopColor"
                values="#00ffff;#ff00ff;#00ff00;#00ffff"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="50%" stopColor="#ff00ff" stopOpacity="1">
              <animate
                attributeName="stopColor"
                values="#ff00ff;#00ff00;#00ffff;#ff00ff"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#00ff00" stopOpacity="0.8">
              <animate
                attributeName="stopColor"
                values="#00ff00;#00ffff;#ff00ff;#00ff00"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        <motion.path
          d="M100 10 L170 50 L170 130 L100 170 L30 130 L30 50 Z"
          stroke="url(#hexGradient)"
          strokeWidth="2"
          fill="none"
          filter="url(#glow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        
        {/* Animated corner dots */}
        {[
          { cx: 100, cy: 10 },
          { cx: 170, cy: 50 },
          { cx: 170, cy: 130 },
          { cx: 100, cy: 170 },
          { cx: 30, cy: 130 },
          { cx: 30, cy: 50 },
        ].map((point, i) => (
          <motion.circle
            key={i}
            cx={point.cx}
            cy={point.cy}
            r="3"
            fill="url(#hexGradient)"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.5, 1] }}
            transition={{
              duration: 0.5,
              delay: i * 0.1 + 2,
              repeat: Infinity,
              repeatDelay: 5,
            }}
          />
        ))}
      </svg>
      
      {/* Content with hexagon clip */}
      <div
        className="relative overflow-hidden"
        style={{
          clipPath: "polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

