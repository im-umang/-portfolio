import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse tracking for spotlight effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any },
    },
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 py-20">
      {/* Background Noise & Gradient */}
      <div className="absolute inset-0 bg-background z-0" />
      <div className="noise-bg z-[1]" />

      {/* Animated Gradient Blobs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] z-[2]"
      />
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
          scale: [1, 1.3, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 2 }}
        className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[120px] z-[2]"
      />

      {/* Spotlight Effect Overlay */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none opacity-40 mix-blend-soft-light"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1), transparent 40%)`
        }}
      />

      <motion.div
        className="max-w-7xl mx-auto text-center relative z-10 w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Status Badge */}
        <motion.div variants={itemVariants} className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-strong border border-white/10 text-sm font-medium text-white/80">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Available for Fullstack Projects
          </div>
        </motion.div>

        {/* Main Title with 3D feel */}
        <motion.div variants={itemVariants} className="relative mb-6">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none text-white">
            <span className="block opacity-90">Umang</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50 pb-4">
              is Crafting
            </span>
          </h1>
          <motion.div
            className="absolute -top-10 left-1/2 -translate-x-1/2 w-full h-full -z-10 blur-3xl opacity-30"
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <span className="text-gradient block w-full text-center text-7xl sm:text-9xl font-bold">Umang Trivedi</span>
          </motion.div>
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-8"
        >
          <span className="text-gradient">Digital Masterpieces.</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          A visionary Full-Stack Developer blending <span className="text-white font-semibold">artistic design</span> with <span className="text-white font-semibold">robust engineering</span>. specializing in React, Next.js, and immersive web experiences.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
        >
          <a
            href="#projects"
            className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg overflow-hidden transition-transform hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2">
              View My Work <ArrowDown className="w-4 h-4" />
            </span>
            <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-multiply" />
          </a>

          <a
            href="#contact"
            className="group px-8 py-4 rounded-full border border-white/20 hover:bg-white/5 text-white font-semibold text-lg transition-all hover:border-white/40"
          >
            Let's Collaborate
          </a>
        </motion.div>

        {/* Social Pillars */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-8"
        >
          {[
            { icon: Github, href: "https://github.com/im-umang", label: "Github" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/umang-trivedi31101", label: "LinkedIn" },
            { icon: Mail, href: "mailto:utrivedi180@gmail.com", label: "Email" },
          ].map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 rounded-2xl glass-card hover:-translate-y-2 transition-transform duration-300"
              aria-label={social.label}
            >
              <social.icon className="w-6 h-6 text-white/70 group-hover:text-primary transition-colors" />
            </a>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={itemVariants}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Scroll</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;