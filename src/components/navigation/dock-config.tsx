"use client";

import {
  Briefcase,
  Code,
  FileText,
  Home,
  Mail,
  Moon,
  Sun,
  User,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { DockItem } from "./floating-dock-premium";

export const useDockItems = (activeSection: string): DockItem[] => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToBlog = () => {
    window.location.href = "/blog";
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const items: DockItem[] = [
    {
      title: "Home",
      icon: <Home className="h-full w-full" />,
      action: scrollToTop,
      isActive: activeSection === "home",
    },
    {
      title: "Skills",
      icon: <Code className="h-full w-full" />,
      href: "skills",
      isActive: activeSection === "skills",
    },
    {
      title: "Projects",
      icon: <Briefcase className="h-full w-full" />,
      href: "projects",
      isActive: activeSection === "projects",
    },
    {
      title: "About",
      icon: <User className="h-full w-full" />,
      href: "about",
      isActive: activeSection === "about",
    },
    {
      title: "Contact",
      icon: <Mail className="h-full w-full" />,
      href: "contact",
      isActive: activeSection === "contact",
    },
    {
      title: "Blog",
      icon: <FileText className="h-full w-full" />,
      action: navigateToBlog,
      isActive: false,
    },
    {
      title: mounted
        ? theme === "dark"
          ? "Light Mode"
          : "Dark Mode"
        : "Theme",
      icon: mounted ? (
        theme === "dark" ? (
          <Sun className="h-full w-full" />
        ) : (
          <Moon className="h-full w-full" />
        )
      ) : (
        <Sun className="h-full w-full" />
      ),
      action: toggleTheme,
      isThemeToggle: true,
      isActive: false,
    },
  ];

  return items;
};
