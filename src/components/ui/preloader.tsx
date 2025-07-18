"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { TextHoverEffectResponsive } from "./text-hover-effect-responsive";

export const Preloader = ({
  onComplete,
  duration = 2000,
}: {
  onComplete?: () => void;
  duration?: number;
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // After duration, start fade out
    const fadeTimer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    // Complete callback after fade out animation
    const completeTimer = setTimeout(() => {
      onComplete?.();
    }, duration + 500); // Extra 500ms for fade out animation

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
            duration: 0.5,
            ease: "easeInOut",
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-gray-900"
        >
          {/* Text Container */}
          <div className="relative w-full h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full max-w-[80%] aspect-[3/1] relative">
                <TextHoverEffectResponsive text="RAFI FERDOS" duration={0.3} />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
