"use client";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export const TextHoverEffectResponsive = ({
  text,
  duration,
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
  const [svgDimensions, setSvgDimensions] = useState({
    width: 800,
    height: 200,
  });

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
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  // Responsive dimensions based on text length
  useEffect(() => {
    const calculateDimensions = () => {
      const textLength = text.length;
      const baseWidth = Math.max(400, textLength * 60);
      const baseHeight = Math.max(120, baseWidth * 0.25);
      setSvgDimensions({ width: baseWidth, height: baseHeight });
    };

    calculateDimensions();
    window.addEventListener("resize", calculateDimensions);
    return () => window.removeEventListener("resize", calculateDimensions);
  }, [text]);

  return (
    <div
      className={`w-full h-full flex items-center justify-center ${className}`}
    >
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
        xmlns="http://www.w3.org/2000/svg"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
        className="select-none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient
            id="textGradientResponsive"
            gradientUnits="userSpaceOnUse"
            cx="50%"
            cy="50%"
            r="25%"
          >
            {hovered && (
              <>
                <stop offset="0%" stopColor="#eab308" />
                <stop offset="20%" stopColor="#ef4444" />
                <stop offset="40%" stopColor="#3b82f6" />
                <stop offset="60%" stopColor="#06b6d4" />
                <stop offset="80%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#f59e0b" />
              </>
            )}
          </linearGradient>

          <motion.radialGradient
            id="revealMaskResponsive"
            gradientUnits="userSpaceOnUse"
            r="30%"
            initial={{ cx: "50%", cy: "50%" }}
            animate={maskPosition}
            transition={{ duration: duration ?? 0.3, ease: "easeOut" }}
          >
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="black" />
          </motion.radialGradient>

          <mask id="textMaskResponsive">
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#revealMaskResponsive)"
            />
          </mask>
        </defs>

        {/* Animated stroke text */}
        <motion.text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          strokeWidth="2"
          className="fill-transparent stroke-neutral-300 font-bold dark:stroke-neutral-700"
          style={{
            fontSize: `${Math.min(
              (svgDimensions.width / text.length) * 1.2,
              svgDimensions.height * 0.6
            )}px`,
            fontFamily: "system-ui, -apple-system, sans-serif",
            letterSpacing: "0.05em",
          }}
          initial={{ strokeDashoffset: 2000, strokeDasharray: 2000 }}
          animate={{
            strokeDashoffset: 0,
            strokeDasharray: 2000,
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
          }}
        >
          {text}
        </motion.text>
      </svg>
    </div>
  );
};
