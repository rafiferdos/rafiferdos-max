"use client";

import { useEffect, useState } from "react";
import { useDockItems } from "./dock-config";
import { FloatingDockPremium } from "./floating-dock-premium";

export function NavigationWrapper() {
  const [activeSection, setActiveSection] = useState("home");
  const dockItems = useDockItems(activeSection);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "skills", "projects", "about", "contact"];
      const scrollPosition = window.scrollY + 100;

      // Check if at top of page
      if (window.scrollY < 50) {
        setActiveSection("home");
        return;
      }

      // Check each section
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <FloatingDockPremium items={dockItems} className="backdrop-blur-xl" />
    </div>
  );
}
