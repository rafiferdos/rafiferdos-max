"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export const Preloader = ({
  onComplete,
  duration = 2000,
}: {
  onComplete?: () => void;
  duration?: number;
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Start text animation immediately
    setShowText(true);

    // After duration, start fade out
    const fadeTimer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    // Complete callback after fade out animation
    const completeTimer = setTimeout(() => {
      onComplete?.();
    }, duration + 800); // Extra 800ms for fade out animation

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [duration, onComplete]);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-black dark:to-gray-900"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5 dark:opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.1),transparent_50%)]" />
          </div>

          {/* Main Content */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: 0.1,
            }}
            className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            {/* Text Container */}
            <div className="relative w-full h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full max-w-[80%] aspect-[3/1] relative">
                  <TextHoverEffectResponsive
                    text="RAFI FERDOS"
                    duration={0.3}
                  />
                </div>
              </div>
            </div>

            {/* Animated Dots */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.8,
              }}
              className="flex justify-center items-center space-x-2 mt-8"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>

            {/* Loading Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: 1.2,
              }}
              className="text-center mt-6"
            >
              <p className="text-sm md:text-base font-medium text-gray-600 dark:text-gray-400 tracking-wider">
                LOADING EXPERIENCE...
              </p>
            </motion.div>
          </motion.div>

          {/* Subtle Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent dark:via-white/10 opacity-50" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
