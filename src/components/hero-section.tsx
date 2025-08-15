"use client";
import { 
  AuroraBackground, 
  TypewriterEffect,
  MovingBorderButton,
  ParticleField,
  MagneticText,
  GradientOrbs,
  Card3D,
  ShimmerButton,
  GlitchText,
  FlipWords,
  Spotlight
} from "@/components/ui";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { IconBrandGithub, IconBrandLinkedin, IconBrandTwitter, IconMail, IconCode, IconSparkles, IconRocket } from "@tabler/icons-react";

const jobTitles = [
  "MERN Stack Developer",
  "Full Stack Developer",
  "Creative Coder",
  "UI/UX Enthusiast",
  "Problem Solver",
];

const socialLinks = [
  { icon: IconBrandGithub, href: "#", label: "GitHub" },
  { icon: IconBrandLinkedin, href: "#", label: "LinkedIn" },
  { icon: IconBrandTwitter, href: "#", label: "Twitter" },
  { icon: IconMail, href: "#", label: "Email" },
];

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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
    { text: "Building", className: "text-blue-500 dark:text-blue-400" },
    { text: "Dreams", className: "text-purple-500 dark:text-purple-400" },
    { text: "With", className: "text-pink-500 dark:text-pink-400" },
    { text: "Code", className: "text-cyan-500 dark:text-cyan-400" },
  ];

  return (
    <AuroraBackground className="min-h-screen relative overflow-hidden">
      {/* Background Layers */}
      <ParticleField particleCount={30} className="z-0" />
      <GradientOrbs />
      
      {/* Spotlight Effect */}
      <Spotlight
        spotlightColor="#8b5cf6"
        spotlightIntensity={40}
        className="z-10"
      />
      
      {/* Custom Cursor Trail */}
      <motion.div
        className="fixed w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full pointer-events-none z-50 mix-blend-screen"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 700 }}
      />
      
      {/* Main Content */}
      <motion.div 
        className="container mx-auto px-6 lg:px-8 min-h-screen flex items-center relative z-20"
        style={{ y, opacity }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          
          {/* Left Content - Text Section */}
          <motion.div
            className="space-y-8 text-center lg:text-left"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
          >
            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block"
            >
              <motion.div
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 backdrop-blur-sm"
                animate={{
                  borderColor: ["rgba(59, 130, 246, 0.2)", "rgba(139, 92, 246, 0.2)", "rgba(59, 130, 246, 0.2)"],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <IconSparkles className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Available for Work
                </span>
              </motion.div>
            </motion.div>
            
            {/* Main Heading with Multiple Effects */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold">
                  <span className="text-slate-600 dark:text-slate-400 block mb-2 text-2xl lg:text-3xl">
                    <TypewriterEffect words={typewriterWords} />
                  </span>
                  <MagneticText className="block">
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient bg-300%">
                      Rafi Ferdos
                    </span>
                  </MagneticText>
                  <div className="mt-4">
                    <GlitchText 
                      text="Creative Developer" 
                      className="text-3xl lg:text-4xl text-slate-700 dark:text-slate-300"
                    />
                  </div>
                </h1>
              </motion.div>
              
              {/* Dynamic Job Title */}
              <motion.div
                className="text-xl lg:text-2xl font-semibold"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <span className="text-slate-600 dark:text-slate-400 mr-2">I'm a</span>
                <FlipWords
                  words={jobTitles}
                  duration={2000}
                  className="text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text font-bold"
                />
              </motion.div>
            </div>
            
            {/* Description with Parallax */}
            <motion.p
              className="text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              Crafting <span className="text-blue-500 font-semibold">digital experiences</span> that 
              blend creativity with functionality. Passionate about building 
              <span className="text-purple-500 font-semibold"> innovative solutions</span> that 
              push the boundaries of web technology.
            </motion.p>
            
            {/* CTA Buttons with Advanced Effects */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <MovingBorderButton
                borderRadius="1.5rem"
                className="font-semibold"
                containerClassName="relative"
                duration={3000}
              >
                <span className="flex items-center gap-2">
                  <IconRocket className="w-5 h-5" />
                  View My Work
                </span>
              </MovingBorderButton>
              
              <ShimmerButton
                className="font-semibold"
                shimmerColor="#ffffff"
                background="linear-gradient(110deg,#8b5cf6 45%,#3b82f6 55%)"
              >
                <span className="flex items-center gap-2">
                  <IconCode className="w-5 h-5" />
                  Download Resume
                </span>
              </ShimmerButton>
            </motion.div>
            
            {/* Social Links with Hover Effects */}
            <motion.div
              className="flex gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="group relative p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <link.icon className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-blue-500 transition-colors" />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 blur-xl"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1.5 }}
                  />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Right Side - Interactive 3D Image */}
          <motion.div
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring", stiffness: 100, delay: 0.3 }}
          >
            <Card3D className="w-full max-w-md lg:max-w-lg">
              <div className="relative">
                {/* Animated Background Gradient */}
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl opacity-30 blur-2xl"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  }}
                />
                
                {/* Main Image Container */}
                <motion.div
                  className="relative z-10 rounded-3xl overflow-hidden bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-1"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden">
                    <Image
                      src="/rafi.png"
                      alt="Rafi Ferdos"
                      fill
                      className="object-cover object-center"
                      priority
                    />
                    
                    {/* Animated Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-blue-600/20 via-transparent to-purple-600/20"
                      animate={{
                        opacity: [0.2, 0.4, 0.2],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    
                    {/* Floating Tech Icons */}
                    <motion.div
                      className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md rounded-full"
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <IconCode className="w-6 h-6 text-white" />
                    </motion.div>
                  </div>
                </motion.div>
                
                {/* Orbiting Elements */}
                <motion.div
                  className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-sm"
                  animate={{
                    x: [0, 20, 0],
                    y: [0, -20, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                <motion.div
                  className="absolute -bottom-8 -left-8 w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-sm"
                  animate={{
                    x: [0, -20, 0],
                    y: [0, 20, 0],
                    scale: [1, 0.8, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />
              </div>
            </Card3D>
          </motion.div>
        </div>
        
        {/* Scroll Indicator with Animation */}
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
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
          >
            <span className="text-sm mb-2 text-slate-500 dark:text-slate-400 group-hover:text-blue-500 transition-colors">
              Discover More
            </span>
            <motion.div
              className="w-6 h-10 rounded-full border-2 border-slate-400 dark:border-slate-600 group-hover:border-blue-500 transition-colors relative"
              whileHover={{ scale: 1.1 }}
            >
              <motion.div
                className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-slate-400 dark:bg-slate-600 group-hover:bg-blue-500 rounded-full transition-colors"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
      
      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-gradient {
          animation: gradient 6s ease infinite;
        }
        
        .bg-300\% {
          background-size: 300% 300%;
        }
      `}</style>
    </AuroraBackground>
  );
}