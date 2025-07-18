"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { TextHoverEffectMassive } from "./text-hover-effect-massive";

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
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-black"
        >
          {/* Text Container */}
          <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full max-w-[90%] relative">
                <TextHoverEffectMassive text="RAFI FERDOS" duration={0.3} />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
