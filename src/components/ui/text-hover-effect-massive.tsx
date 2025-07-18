"use client";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export const TextHoverEffectMassive = ({
  text,
  duration = 0.3,
  className = "",
}: {
  text: string;
  duration?: number;
  className?: string;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  // Auto-trigger hover effect for preloader
  useEffect(() => {
    const timer = setTimeout(() => {
      setHovered(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`w-full h-full ${className}`}>
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox="0 0 1000 200"
        xmlns="http://www.w3.org/2000/svg"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
        className="select-none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient
            id="textGradientMassive"
            gradientUnits="userSpaceOnUse"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            {hovered && (
              <>
                <stop offset="0%" stopColor="#eab308" />
                <stop offset="16%" stopColor="#ef4444" />
                <stop offset="33%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#06b6d4" />
                <stop offset="66%" stopColor="#8b5cf6" />
                <stop offset="83%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#ec4899" />
              </>
            )}
          </linearGradient>

          <motion.radialGradient
            id="revealMaskMassive"
            gradientUnits="userSpaceOnUse"
            r="40%"
            animate={maskPosition}
            transition={{ duration: duration, ease: "easeOut" }}
          >
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="black" />
          </motion.radialGradient>

          <mask id="textMaskMassive">
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#revealMaskMassive)"
            />
          </mask>
        </defs>

        {/* Base stroke text */}
        <motion.text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          strokeWidth="3"
          className="fill-transparent stroke-neutral-300 dark:stroke-neutral-600 font-bold"
          style={{
            fontSize: "120px",
            fontFamily:
              "var(--font-uncial-antiqua), system-ui, -apple-system, sans-serif",
            letterSpacing: "0.05em",
            fontWeight: "900",
          }}
          initial={{ strokeDashoffset: 2000, strokeDasharray: 2000 }}
          animate={{
            strokeDashoffset: 0,
            strokeDasharray: 2000,
          }}
          transition={{
            duration: 2.5,
            ease: "easeInOut",
          }}
        >
          {text}
        </motion.text>

        {/* Gradient overlay text */}
        {hovered && (
          <motion.text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            stroke="url(#textGradientMassive)"
            strokeWidth="3"
            mask="url(#textMaskMassive)"
            className="fill-transparent font-bold"
            style={{
              fontSize: "120px",
              fontFamily:
                "var(--font-uncial-antiqua), system-ui, -apple-system, sans-serif",
              letterSpacing: "0.05em",
              fontWeight: "900",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {text}
          </motion.text>
        )}
      </svg>
    </div>
  );
};
