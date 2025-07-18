"use client";

import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";

export interface DockItem {
  title: string;
  icon: React.ReactNode;
  href?: string;
  action?: () => void;
  isActive?: boolean;
  isThemeToggle?: boolean;
}

export const FloatingDockPremium = ({
  items,
  className,
}: {
  items: DockItem[];
  className?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={className} />
      <FloatingDockMobile items={items} className={className} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: DockItem[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav-mobile"
            className="absolute inset-x-0 bottom-full mb-4 flex flex-col gap-3 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  scale: 0.8,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                transition={{
                  delay: (items.length - 1 - idx) * 0.05,
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              >
                <MobileIconContainer item={item} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(!open)}
        className="relative h-14 w-14 rounded-2xl overflow-hidden backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 shadow-2xl"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent dark:from-white/10" />
        <div className="relative flex h-full w-full items-center justify-center">
          <motion.div
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <svg
              className="h-6 w-6 text-gray-700 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </motion.div>
        </div>
      </motion.button>
    </div>
  );
};

const MobileIconContainer = ({ item }: { item: DockItem }) => {
  const handleClick = () => {
    if (item.action) {
      item.action();
    } else if (item.href) {
      if (item.href.startsWith("/")) {
        window.location.href = item.href;
      } else {
        document
          .getElementById(item.href)
          ?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <motion.div
      onClick={handleClick}
      className={cn(
        "relative h-12 w-12 rounded-xl cursor-pointer overflow-hidden backdrop-blur-xl border shadow-2xl",
        item.isActive
          ? "bg-white/20 dark:bg-white/15 border-white/30 dark:border-white/20"
          : "bg-white/10 dark:bg-black/10 border-white/20 dark:border-white/10"
      )}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent dark:from-white/10" />
      {item.isActive && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/10 dark:from-white/20 dark:to-white/5" />
      )}
      <div className="relative flex h-full w-full items-center justify-center">
        <div className="h-5 w-5 text-gray-700 dark:text-gray-300">
          {item.icon}
        </div>
      </div>
    </motion.div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: DockItem[];
  className?: string;
}) => {
  let mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden md:flex h-16 items-end gap-4 px-6 py-3 rounded-2xl overflow-hidden backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 shadow-2xl",
        className
      )}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Glass morphism background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent dark:from-white/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent" />

      {/* Icons */}
      {items.map((item, index) => (
        <IconContainer
          mouseX={mouseX}
          key={item.title}
          item={item}
          index={index}
        />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  item,
  index,
}: {
  mouseX: MotionValue;
  item: DockItem;
  index: number;
}) {
  let ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 70, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 70, 40]);

  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 32, 20]);
  let heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 32, 20]
  );

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 200,
    damping: 15,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 200,
    damping: 15,
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 200,
    damping: 15,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 200,
    damping: 15,
  });

  const handleClick = () => {
    if (item.action) {
      item.action();
    } else if (item.href) {
      if (item.href.startsWith("/")) {
        window.location.href = item.href;
      } else {
        document
          .getElementById(item.href)
          ?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      style={{ width, height }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      className="relative flex items-center justify-center cursor-pointer"
      whileTap={{ scale: 0.9 }}
    >
      {/* Glass container */}
      <motion.div
        className={cn(
          "absolute inset-0 rounded-2xl overflow-hidden backdrop-blur-xl border shadow-2xl",
          item.isActive
            ? "bg-white/20 dark:bg-white/15 border-white/30 dark:border-white/20"
            : "bg-white/10 dark:bg-black/10 border-white/20 dark:border-white/10"
        )}
        whileHover={{
          scale: 1.05,
          transition: { type: "spring", stiffness: 400, damping: 25 },
        }}
      >
        {/* Glass morphism layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent dark:from-white/10" />
        {item.isActive && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/10 dark:from-white/20 dark:to-white/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* Hover effect */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-br from-white/25 to-white/5 dark:from-white/15 dark:to-white/0"
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Icon */}
      <motion.div
        style={{ width: widthIcon, height: heightIcon }}
        className="relative z-10 flex items-center justify-center text-gray-700 dark:text-gray-300"
      >
        {item.icon}
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 5, x: "-50%" }}
            className="absolute -top-12 left-1/2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap backdrop-blur-xl bg-white/90 dark:bg-black/80 border border-white/20 dark:border-white/10 text-gray-700 dark:text-gray-300 shadow-2xl"
          >
            {item.title}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
