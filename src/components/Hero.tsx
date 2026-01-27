import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, FileText } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  const socialLinks = [
    { icon: Github, href: "https://github.com/im-umang", label: "Github", hoverColor: "hover:text-white" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/umang-trivedi31101", label: "LinkedIn", hoverColor: "hover:text-[#0A66C2]" },
    { icon: FaWhatsapp, href: "https://wa.me/916352296575", label: "WhatsApp", hoverColor: "hover:text-[#25D366]" },
    { icon: Mail, href: "mailto:utrivedi80@gmail.com", label: "Email", hoverColor: "hover:text-primary" },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 py-16 sm:py-20">
      <div className="absolute inset-0 bg-background z-0" />
      <div className="noise-bg z-[1]" />

      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] right-[-10%] w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] bg-primary/30 sm:bg-primary/20 rounded-full blur-[60px] sm:blur-[120px] z-[2]"
      />
      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, 30, 0],
          scale: [1, 1.3, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 2 }}
        className="absolute bottom-[-10%] left-[-10%] w-[250px] h-[250px] sm:w-[450px] sm:h-[450px] lg:w-[600px] lg:h-[600px] bg-secondary/30 sm:bg-secondary/20 rounded-full blur-[60px] sm:blur-[120px] z-[2]"
      />

      <motion.div
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 z-[3] pointer-events-none bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 sm:hidden"
      />

      <div
        className="absolute inset-0 z-[3] pointer-events-none opacity-40 mix-blend-soft-light hidden sm:block"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1), transparent 40%)`
        }}
      />

      <motion.div
        className="max-w-7xl mx-auto text-center relative z-10 w-full px-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="flex justify-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full glass-strong border border-white/10 text-xs sm:text-sm font-medium text-white/80">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="whitespace-nowrap">Available for Full-Stack Projects</span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="relative mb-4 sm:mb-6">
          <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter leading-none text-white">
            <span className="block opacity-90">Umang Trivedi</span>
          </h1>
          <motion.div
            className="absolute -top-6 sm:-top-10 left-1/2 -translate-x-1/2 w-full h-full -z-10 blur-2xl sm:blur-3xl opacity-20 sm:opacity-30"
            animate={{ opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <span className="text-gradient block w-full text-center text-3xl xs:text-4xl sm:text-7xl lg:text-9xl font-bold">Umang Trivedi</span>
          </motion.div>
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 sm:mb-8"
        >
          <span className="text-gradient">Full-Stack Engineer</span>
          <span className="text-white/60 mx-2 sm:mx-4">|</span>
          <span className="text-white/80">Web Development</span>
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed px-2"
        >
          <span className="text-white font-semibold">Full-Stack Developer</span> with expertise in <span className="text-white font-semibold">React</span>, <span className="text-white font-semibold">Node.js</span>, and <span className="text-white font-semibold">MongoDB</span>.
          <br className="hidden sm:block" />
          <span className="sm:block">I build fast, reliable, and user-centric web solutions.</span>
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-14"
        >
          <a
            href="#projects"
            className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-black rounded-full font-bold text-base sm:text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] text-center"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              View My Work <ArrowDown className="w-4 h-4 group-hover:animate-bounce" />
            </span>
          </a>

          <a
            href="/resume/Umang_Trivedi_Resume.pdf"
            download="Umang_Trivedi_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download Resume PDF"
            className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-primary text-black font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] text-center flex items-center justify-center gap-2 cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            Download Resume
          </a>

          <a
            href="#contact"
            className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full border border-white/20 hover:bg-white/5 text-white font-semibold text-base sm:text-lg transition-all hover:border-white/40 text-center"
          >
            Let's Collaborate
          </a>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-3 sm:gap-6"
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target={social.label === 'Email' ? undefined : '_blank'}
              rel={social.label === 'Email' ? undefined : 'noopener noreferrer'}
              whileHover={{ y: -8, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`group p-3 sm:p-4 rounded-xl sm:rounded-2xl glass-card transition-all duration-300 ${social.hoverColor}`}
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white/70 group-hover:text-current transition-colors" />
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="absolute bottom-4 sm:bottom-6 md:bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.a
            href="#stack"
            animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1 sm:gap-2 cursor-pointer"
          >
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-muted-foreground">Scroll</span>
            <div className="w-[1px] h-6 sm:h-8 md:h-12 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;