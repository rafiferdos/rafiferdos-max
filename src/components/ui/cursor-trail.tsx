"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface TrailPoint {
  x: number;
  y: number;
  id: number;
}

export function CursorTrail({
  color = "rgba(139, 92, 246, 0.5)",
  size = 20,
  duration = 0.5,
}: {
  color?: string;
  size?: number;
  duration?: number;
}) {
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrameId: number;
    let counter = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      counter++;
      const newPoint: TrailPoint = {
        x: e.clientX,
        y: e.clientY,
        id: counter,
      };

      setTrail((prevTrail) => [...prevTrail.slice(-10), newPoint]);
    };

    const animate = () => {
      setTrail((prevTrail) => {
        if (prevTrail.length > 0) {
          return prevTrail.slice(-10);
        }
        return prevTrail;
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {trail.map((point, index) => (
          <motion.div
            key={point.id}
            className="absolute rounded-full mix-blend-screen"
            style={{
              background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
              width: size - index * 1.5,
              height: size - index * 1.5,
            }}
            initial={{
              x: point.x - (size - index * 1.5) / 2,
              y: point.y - (size - index * 1.5) / 2,
              opacity: 0,
            }}
            animate={{
              x: point.x - (size - index * 1.5) / 2,
              y: point.y - (size - index * 1.5) / 2,
              opacity: 1 - index * 0.1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: duration,
              ease: "easeOut",
            }}
          />
        ))}
      </AnimatePresence>
      
      {/* Main cursor dot */}
      <motion.div
        className="absolute w-2 h-2 bg-white rounded-full mix-blend-difference"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 700,
          mass: 0.5,
        }}
      />
    </div>
  );
}
