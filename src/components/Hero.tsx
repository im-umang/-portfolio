import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowRight, Download, Sparkles } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

/* ────────────────────────────────── */
/* TYPEWRITER STRINGS                 */
/* ────────────────────────────────── */
const ROLES = [
  'Full-Stack Developer',
  'MERN Stack Engineer',
  'UI/UX Enthusiast',
  'React Specialist',
  'Problem Solver',
];

/* ────────────────────────────────── */
/* STATS                              */
/* ────────────────────────────────── */
const STATS = [
  { value: 10, suffix: '+',  label: 'Projects Built'   },
  { value: 2,  suffix: '+',  label: 'Years Coding'      },
  { value: 4,  suffix: '',   label: 'Certifications'    },
  { value: 1,  suffix: '',   label: 'Hackathon Win'     },
];

/* ────────────────────────────────── */
/* SOCIAL LINKS                       */
/* ────────────────────────────────── */
const SOCIALS = [
  { icon: Github,      href: 'https://github.com/im-umang',               label: 'GitHub'    },
  { icon: Linkedin,    href: 'https://www.linkedin.com/in/umang-trivedi31101', label: 'LinkedIn'  },
  { icon: FaWhatsapp,  href: 'https://wa.me/916352296575',                label: 'WhatsApp'  },
  { icon: Mail,        href: 'mailto:utrivedi80@gmail.com',               label: 'Email'     },
];

/* ────────────────────────────────── */
/* ANIMATED COUNT-UP HOOK             */
/* ────────────────────────────────── */
function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf: number;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(ease * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return count;
}

/* ────────────────────────────────── */
/* STAT CARD                          */
/* ────────────────────────────────── */
const StatCard = ({ value, suffix, label, delay, inView }: {
  value: number; suffix: string; label: string; delay: number; inView: boolean;
}) => {
  const count = useCountUp(value, 1600, inView);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: 'easeOut' }}
      className="glass rounded-2xl px-5 py-4 text-center"
    >
      <div className="font-display font-black text-2xl sm:text-3xl text-gradient-blue">
        {count}{suffix}
      </div>
      <div className="text-[11px] text-white/45 font-medium mt-0.5 tracking-wide">{label}</div>
    </motion.div>
  );
};

/* ────────────────────────────────── */
/* HERO                               */
/* ────────────────────────────────── */
const Hero = () => {
  const [mounted,     setMounted]     = useState(false);
  const [statsInView, setStatsInView] = useState(false);
  const [spotlight,   setSpotlight]   = useState({ x: 50, y: 50 });

  // Typewriter
  const [roleIdx,  setRoleIdx]  = useState(0);
  const [charIdx,  setCharIdx]  = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [roleText, setRoleText] = useState('');

  /* mount delay */
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 300);
    return () => clearTimeout(t);
  }, []);

  /* typewriter effect */
  useEffect(() => {
    const target = ROLES[roleIdx];
    const speed  = deleting ? 38 : charIdx === target.length ? 1400 : 68;
    const t = setTimeout(() => {
      if (!deleting && charIdx < target.length) {
        setRoleText(target.slice(0, charIdx + 1));
        setCharIdx(c => c + 1);
      } else if (!deleting && charIdx === target.length) {
        setDeleting(true);
      } else if (deleting && charIdx > 0) {
        setRoleText(target.slice(0, charIdx - 1));
        setCharIdx(c => c - 1);
      } else {
        setDeleting(false);
        setRoleIdx(i => (i + 1) % ROLES.length);
      }
    }, speed);
    return () => clearTimeout(t);
  }, [charIdx, deleting, roleIdx]);

  /* stats section observer */
  useEffect(() => {
    const statsEl = document.getElementById('hero-stats');
    if (!statsEl) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsInView(true); },
      { threshold: 0.3 }
    );
    obs.observe(statsEl);
    return () => obs.disconnect();
  }, []);

  /* spotlight follow */
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    setSpotlight({
      x: ((e.clientX - left) / width)  * 100,
      y: ((e.clientY - top)  / height) * 100,
    });
  }, []);

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 pt-24 pb-16"
    >
      {/* ── Backgrounds ── */}
      {/* Deep mesh gradient */}
      <div className="absolute inset-0 bg-mesh pointer-events-none" />

      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid-bg opacity-60 pointer-events-none" />

      {/* Spotlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          background: `radial-gradient(600px circle at ${spotlight.x}% ${spotlight.y}%, hsl(var(--primary) / 0.07), transparent 55%)`,
        }}
      />

      {/* Ambient orbs — CSS float animations (compositor thread, zero JS cost) */}
      <div
        className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full blur-[120px] pointer-events-none animate-float opacity-[0.18]"
        style={{ background: 'hsl(var(--primary))', animationDuration: '9s' }}
      />
      <div
        className="absolute -bottom-32 -right-24 w-[340px] h-[340px] rounded-full blur-[100px] pointer-events-none animate-float opacity-[0.12]"
        style={{ background: 'hsl(var(--secondary))', animationDuration: '12s', animationDelay: '3s' }}
      />
      <div
        className="absolute top-[40%] right-[15%] w-[220px] h-[220px] rounded-full blur-[80px] pointer-events-none animate-float opacity-[0.08]"
        style={{ background: 'hsl(var(--accent))', animationDuration: '15s', animationDelay: '6s' }}
      />

      {/* ── Content ── */}
      <div
        className="relative z-10 max-w-4xl mx-auto w-full text-center"
      >
        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="flex justify-center mb-8"
        >
          <a
            href="#contact"
            onClick={e => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide glass border border-primary/20 text-white/75 hover:border-primary/45 hover:text-white transition-all duration-300 group"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Open to opportunities
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.2, ease: 'easeOut' }}
        >
          <h1 className="font-display font-black leading-[1.05] tracking-tight mb-4">
            <span className="block text-white/85 text-4xl sm:text-5xl md:text-6xl lg:text-[4.75rem] xl:text-[5.5rem]">
              Hey, I'm
            </span>
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem]">
              <span className="text-gradient">Umang</span>
              <span className="text-white/90"> Trivedi</span>
            </span>
          </h1>
        </motion.div>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mb-6 flex items-center justify-center gap-2 text-lg sm:text-xl md:text-2xl font-mono"
        >
          <span className="text-primary font-light">»</span>
          <span className="text-white/65 font-medium tracking-tight">
            {roleText}
          </span>
          <span className="w-[2px] h-[1.2em] bg-primary animate-blink rounded-full" />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55, ease: 'easeOut' }}
          className="text-white/50 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-10"
        >
          MCA student at <span className="text-white/75 font-medium">LJ University</span>,
          Ahmedabad. Building scalable, pixel-perfect web experiences with{' '}
          <span className="text-secondary font-medium">React</span>,{' '}
          <span className="text-primary font-medium">Node.js</span> &{' '}
          <span className="text-accent font-medium">MongoDB</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.65, ease: 'easeOut' }}
          className="flex flex-col xs:flex-row items-center justify-center gap-3 mb-10"
        >
          {/* Primary – Hire Me */}
          <motion.a
            href="#contact"
            onClick={e => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-white text-sm sm:text-base overflow-hidden group"
            style={{ background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))' }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Let's Work Together
            </span>
            {/* shimmer overlay */}
            <span className="absolute inset-0 bg-white/10 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-700 skew-x-[-20deg]" />
          </motion.a>

          {/* Secondary – Download CV */}
          <motion.a
            href="/resume/Umang_Trivedi_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white/75 hover:text-white text-sm sm:text-base glass border border-white/[0.1] hover:border-white/25 transition-all duration-300"
          >
            <Download className="w-4 h-4" />
            Download CV
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.75, ease: 'easeOut' }}
          className="flex items-center justify-center gap-3 mb-16"
        >
          {SOCIALS.map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ scale: 1.2, y: -3 }}
              whileTap={{ scale: 0.9 }}
              className="p-2.5 rounded-xl glass border border-white/[0.08] text-white/45 hover:text-white hover:border-white/20 transition-colors duration-200"
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.a>
          ))}
        </motion.div>

        {/* Stats */}
        <div id="hero-stats" className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto">
          {STATS.map((s, i) => (
            <StatCard
              key={s.label}
              value={s.value}
              suffix={s.suffix}
              label={s.label}
              delay={i * 0.08}
              inView={statsInView}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1.5"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/25 font-mono">scroll</span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-[1px] h-8"
            style={{ background: 'linear-gradient(to bottom, hsl(var(--primary) / 0.6), transparent)' }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;