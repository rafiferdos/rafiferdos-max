"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Preloader } from "./preloader";

interface PreloaderContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const PreloaderContext = createContext<PreloaderContextType | undefined>(
  undefined
);

export const usePreloader = () => {
  const context = useContext(PreloaderContext);
  if (!context) {
    throw new Error("usePreloader must be used within a PreloaderProvider");
  }
  return context;
};

export const PreloaderProvider = ({
  children,
  duration = 2000,
  showPreloader = true,
}: {
  children: React.ReactNode;
  duration?: number;
  showPreloader?: boolean;
}) => {
  const [isLoading, setIsLoading] = useState(showPreloader);
  const [hasShownPreloader, setHasShownPreloader] = useState(false);

  useEffect(() => {
    // Only show preloader once per session
    const hasShown = sessionStorage.getItem("preloader-shown");
    if (hasShown) {
      setIsLoading(false);
      setHasShownPreloader(true);
    } else {
      setHasShownPreloader(false);
    }
  }, []);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    setHasShownPreloader(true);
    sessionStorage.setItem("preloader-shown", "true");
  };

  return (
    <PreloaderContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading && !hasShownPreloader && (
        <Preloader onComplete={handlePreloaderComplete} duration={duration} />
      )}
      <div
        className={
          isLoading && !hasShownPreloader
            ? "opacity-0"
            : "opacity-100 transition-opacity duration-300"
        }
      >
        {children}
      </div>
    </PreloaderContext.Provider>
  );
};
