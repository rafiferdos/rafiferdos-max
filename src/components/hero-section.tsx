"use client";
import { AuroraBackground, HolographicCard, MovingBorderButton, ParticleField, ShimmerButton, Spotlight, TypewriterEffect } from "@/components/ui";
import {
  IconArrowDown,
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconDownload,
  IconMail,
  IconRocket,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useMemo } from "react";

export function HeroSection() {
  const roles = useMemo(
    () => [
      { text: "Full‑stack Engineer", className: "text-cyan-400" },
      { text: "Frontend Specialist", className: "text-indigo-400" },
      { text: "Product‑minded Developer", className: "text-purple-400" },
      { text: "Open‑source Contributor", className: "text-pink-400" },
    ],
    []
  );

  const socials = [
    { icon: IconBrandGithub, href: "#", label: "GitHub" },
    { icon: IconBrandLinkedin, href: "#", label: "LinkedIn" },
    { icon: IconBrandX, href: "#", label: "X" },
    { icon: IconBrandDiscord, href: "#", label: "Discord" },
  ];

  return (
    <AuroraBackground className="min-h-screen relative overflow-hidden" aria-label="Hero section">
      {/* Subtle ambience */}
      <Spotlight className="absolute inset-0 -z-0" spotlightColor="#4f46e5" spotlightIntensity={70} />
      <ParticleField particleCount={24} className="pointer-events-none opacity-40" />

      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_.9fr] gap-12 lg:gap-16 items-center min-h-[88vh] py-20">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-2xl px-3 py-1 text-xs text-zinc-600 dark:text-zinc-300">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_2px_rgba(16,185,129,0.7)]" aria-hidden />
              <span className="font-medium">Available for collaborations</span>
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 dark:from-white dark:via-zinc-200 dark:to-white">
                  Rafi Ferdos
                </span>
              </h1>
              <div className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-300/90">
                <TypewriterEffect words={roles} />
              </div>
              <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-zinc-600/90 dark:text-zinc-300/80">
                I craft elegant, performant web experiences with a focus on accessibility,
                scalability, and delightful micro‑interactions. Minimal aesthetics, maximum impact.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <ShimmerButton className="px-7 py-3 text-sm font-semibold" aria-label="View projects">
                <span className="flex items-center gap-2">
                  <IconRocket className="h-5 w-5" />
                  View Projects
                </span>
              </ShimmerButton>
              <MovingBorderButton
                as="a"
                href="#"
                borderRadius="0.75rem"
                duration={3000}
                className="text-sm font-semibold"
                aria-label="Download resume"
              >
                <span className="flex items-center gap-2 text-zinc-100">
                  <IconDownload className="h-5 w-5" />
                  Resume
                </span>
              </MovingBorderButton>
            </div>

            {/* Socials + micro stats */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 pt-2">
              <div className="flex items-center gap-2">
                {socials.map(({ icon: Icon, href, label }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="group inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-xl p-2 text-zinc-700 dark:text-zinc-200 hover:text-white transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: 0.1 * i }}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 text-xs">
                {[
                  { k: "Focus", v: "Minimal • Glassmorphism" },
                  { k: "Stack", v: "Next.js • TypeScript" },
                  { k: "Contact", v: "hello@rafi.dev" },
                ].map((chip) => (
                  <div
                    key={chip.k}
                    className="rounded-full border border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-xl px-3 py-1 text-zinc-700 dark:text-zinc-200"
                    aria-label={`${chip.k}: ${chip.v}`}
                  >
                    <span className="text-zinc-500 dark:text-zinc-400 mr-1">{chip.k}:</span>
                    <span className="font-medium">{chip.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Profile card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Soft glow */}
            <div className="absolute -inset-6 -z-10">
              <div className="h-full w-full rounded-3xl bg-gradient-to-br from-cyan-400/10 via-indigo-400/10 to-purple-400/10 blur-2xl" />
            </div>

            <HolographicCard className="w-full max-w-md mx-auto">
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image
                  src="/rafi.png"
                  alt="Portrait of Rafi Ferdos"
                  fill
                  priority
                  className="object-cover object-center scale-[1.02]" 
                />

                {/* Glass overlays */}
                <div className="absolute top-4 left-4 rounded-xl border border-white/10 bg-white/10 backdrop-blur-xl px-3 py-1 text-xs text-white/90">
                  <span className="inline-flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
                    Online
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="rounded-xl border border-white/10 bg-white/10 backdrop-blur-xl px-3 py-1 text-xs text-white/90">
                    Next.js • TS
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/10 backdrop-blur-xl px-3 py-1 text-xs text-white/90">
                    UI/UX‑first
                  </div>
                </div>
              </div>
            </HolographicCard>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.button
          aria-label="Scroll to content"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
          className="group mx-auto mb-10 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 dark:bg-white/5 px-4 py-2 text-xs text-zinc-600 dark:text-zinc-300 backdrop-blur-xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <IconArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          Scroll
        </motion.button>
      </div>
    </AuroraBackground>
  );
}