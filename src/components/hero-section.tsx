"use client";
import {
  CyberGrid,
  FlipWords,
  GlitchText,
  HexagonFrame,
  HolographicCard,
  MovingBorderButton,
  NeonText,
  ParticleField,
  TypewriterEffect,
} from "@/components/ui";
import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandSteam,
  IconBrandTwitch,
  IconCode,
  IconDeviceGamepad2,
  IconRocket,
  IconSword,
} from "@tabler/icons-react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const jobTitles = [
  "Full Stack Developer",
  "Code Warrior",
  "Digital Architect",
  "Tech Wizard",
  "Bug Slayer",
];

const socialLinks = [
  { icon: IconBrandGithub, href: "#", label: "GitHub", color: "hover:text-purple-400" },
  { icon: IconBrandDiscord, href: "#", label: "Discord", color: "hover:text-indigo-400" },
  { icon: IconBrandTwitch, href: "#", label: "Twitch", color: "hover:text-purple-500" },
  { icon: IconBrandSteam, href: "#", label: "Steam", color: "hover:text-blue-400" },
];

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const typewriterWords = [
    { text: "Level", className: "text-cyan-400" },
    { text: "Up", className: "text-purple-400" },
    { text: "Your", className: "text-pink-400" },
    { text: "Code", className: "text-green-400" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Gaming Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950" />
      <CyberGrid className="opacity-30" />
      <ParticleField particleCount={40} className="opacity-60" />
      
      {/* Animated Background Lines */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
            style={{ top: `${20 * i}%` }}
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        className="container mx-auto px-6 lg:px-8 min-h-screen flex items-center relative z-20"
        style={{ y, opacity }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          {/* Left Content - Text Section */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
          >
            {/* Gaming Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block"
            >
              <motion.div
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-900/50 to-purple-900/50 border border-cyan-500/50 backdrop-blur-xl"
                whileHover={{ scale: 1.05 }}
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(0, 255, 255, 0.3)",
                    "0 0 30px rgba(255, 0, 255, 0.3)",
                    "0 0 20px rgba(0, 255, 255, 0.3)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <IconDeviceGamepad2 className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-bold text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text">
                  READY PLAYER ONE
                </span>
              </motion.div>
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h1 className="text-5xl lg:text-7xl font-black uppercase">
                  <motion.div className="mb-2">
                    <TypewriterEffect words={typewriterWords} />
                  </motion.div>
                  <div className="leading-tight">
                    <NeonText text="RAFI" color="cyan" className="text-6xl lg:text-8xl" />
                    <br />
                    <NeonText text="FERDOS" color="purple" className="text-6xl lg:text-8xl" />
                  </div>
                </h1>
              </motion.div>

              {/* Glitch Title */}
              <motion.div
                className="text-2xl lg:text-3xl font-bold"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <GlitchText
                  text="< DEVELOPER />"
                  className="text-cyan-400 font-mono"
                />
              </motion.div>

              {/* Dynamic Job Title */}
              <motion.div
                className="text-xl lg:text-2xl font-bold uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <span className="text-gray-500 mr-2">CLASS:</span>
                <FlipWords
                  words={jobTitles}
                  duration={2000}
                  className="text-transparent bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text"
                />
              </motion.div>
            </div>

            {/* Stats Bar */}
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {[
                { label: "XP", value: 95, color: "from-cyan-500 to-blue-500" },
                { label: "SKILL", value: 88, color: "from-purple-500 to-pink-500" },
                { label: "POWER", value: 92, color: "from-green-500 to-emerald-500" },
              ].map((stat, index) => (
                <div key={stat.label} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-gray-500">{stat.label}</span>
                    <span className="text-cyan-400">{stat.value}%</span>
                  </div>
                  <div className="h-2 bg-gray-900 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.value}%` }}
                      transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <MovingBorderButton
                borderRadius="0.5rem"
                className="font-bold uppercase"
                containerClassName="relative"
                duration={3000}
              >
                <span className="flex items-center gap-2">
                  <IconSword className="w-5 h-5" />
                  Enter Arena
                </span>
              </MovingBorderButton>

              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/50 rounded-lg font-bold uppercase text-purple-400 backdrop-blur-xl"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(168, 85, 247, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2">
                  <IconCode className="w-5 h-5" />
                  View Stats
                </span>
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className={`p-3 rounded-lg bg-gray-900/50 border border-gray-800 backdrop-blur-xl transition-all ${link.color}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 1 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 5,
                    boxShadow: "0 0 20px rgba(0, 255, 255, 0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <link.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Gaming-Style Image Container */}
          <motion.div
            className="relative flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1,
              type: "spring",
              stiffness: 100,
              delay: 0.3,
            }}
          >
            {/* Outer Container for proper centering */}
            <div className="relative w-full max-w-md mx-auto">
              {/* Rotating Background Ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, #00ffff, #ff00ff, #00ff00, #00ffff)",
                  filter: "blur(40px)",
                  transform: "scale(1.2)",
                }}
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Hexagon Frame Container */}
              <div className="relative z-10">
                <HolographicCard className="w-full">
                  <div 
                    className="relative aspect-square p-4"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    {/* Gaming-style frame decorations */}
                    <div className="absolute top-2 left-2 w-16 h-16 border-t-2 border-l-2 border-cyan-500" />
                    <div className="absolute top-2 right-2 w-16 h-16 border-t-2 border-r-2 border-cyan-500" />
                    <div className="absolute bottom-2 left-2 w-16 h-16 border-b-2 border-l-2 border-cyan-500" />
                    <div className="absolute bottom-2 right-2 w-16 h-16 border-b-2 border-r-2 border-cyan-500" />

                    {/* Profile Image with Effects */}
                    <motion.div
                      className="relative w-full h-full rounded-xl overflow-hidden"
                      animate={{
                        scale: isHovered ? 1.05 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Image Container */}
                      <div className="relative w-full h-full">
                        <Image
                          src="/rafi.png"
                          alt="Rafi Ferdos"
                          fill
                          className="object-cover object-center"
                          priority
                        />

                        {/* Animated Scan Line */}
                        <motion.div
                          className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                          initial={{ top: "-4px" }}
                          animate={{
                            top: isHovered ? "100%" : "-4px",
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: isHovered ? Infinity : 0,
                            ease: "linear",
                          }}
                        />

                        {/* Holographic Overlay */}
                        <motion.div
                          className="absolute inset-0"
                          style={{
                            background: `
                              linear-gradient(45deg, 
                                transparent 30%, 
                                rgba(0, 255, 255, 0.1) 50%, 
                                transparent 70%
                              )
                            `,
                            backgroundSize: "200% 200%",
                          }}
                          animate={{
                            backgroundPosition: isHovered ? ["0% 0%", "100% 100%"] : "0% 0%",
                          }}
                          transition={{
                            duration: 2,
                            repeat: isHovered ? Infinity : 0,
                            ease: "linear",
                          }}
                        />

                        {/* Glitch Effect on Hover */}
                        {isHovered && (
                          <>
                            <motion.div
                              className="absolute inset-0 bg-red-500 mix-blend-screen"
                              initial={{ opacity: 0 }}
                              animate={{
                                opacity: [0, 0.5, 0],
                                x: [-2, 2, -2],
                              }}
                              transition={{
                                duration: 0.2,
                                repeat: Infinity,
                                repeatDelay: 2,
                              }}
                            />
                            <motion.div
                              className="absolute inset-0 bg-cyan-500 mix-blend-screen"
                              initial={{ opacity: 0 }}
                              animate={{
                                opacity: [0, 0.5, 0],
                                x: [2, -2, 2],
                              }}
                              transition={{
                                duration: 0.2,
                                repeat: Infinity,
                                repeatDelay: 3,
                              }}
                            />
                          </>
                        )}
                      </div>
                    </motion.div>

                    {/* Status Indicators */}
                    <motion.div
                      className="absolute top-4 right-4 px-3 py-1 bg-green-500/20 border border-green-500 rounded-full"
                      animate={{
                        opacity: [1, 0.5, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    >
                      <span className="text-xs font-bold text-green-400">ONLINE</span>
                    </motion.div>

                    {/* Level Badge */}
                    <motion.div
                      className="absolute bottom-4 left-4 px-3 py-1 bg-purple-900/50 border border-purple-500 rounded-lg backdrop-blur-xl"
                      whileHover={{ scale: 1.1 }}
                    >
                      <span className="text-xs font-bold text-purple-400">LVL 99</span>
                    </motion.div>
                  </div>
                </HolographicCard>
              </div>

              {/* Floating UI Elements */}
              {isHovered && (
                <>
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-20 h-20"
                      style={{
                        top: `${Math.sin(i * Math.PI / 2) * 40 + 50}%`,
                        left: `${Math.cos(i * Math.PI / 2) * 40 + 50}%`,
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: 0.6,
                        scale: 1,
                        rotate: 360,
                      }}
                      transition={{
                        duration: 0.5,
                        delay: i * 0.1,
                      }}
                    >
                      <div className="w-full h-full border border-cyan-500/30 rounded-lg backdrop-blur-xl" />
                    </motion.div>
                  ))}
                </>
              )}
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <motion.div
            className="flex flex-col items-center cursor-pointer group"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            onClick={() =>
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
            }
          >
            <span className="text-xs font-bold mb-2 text-cyan-400 uppercase tracking-wider">
              Next Level
            </span>
            <motion.div className="w-8 h-12 border-2 border-cyan-500 rounded-full relative">
              <motion.div
                className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1 h-3 bg-cyan-400 rounded-full"
                animate={{ y: [0, 16, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}