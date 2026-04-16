import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowRight, Download, Sparkles } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

/* ─────────────────────────────────────── */
/*  CONSTANTS                              */
/* ─────────────────────────────────────── */
const ROLES = [
  'Full-Stack Developer',
  'MERN Stack Engineer',
  'UI/UX Enthusiast',
  'React Specialist',
  'Problem Solver',
];

const STATS = [
  { value: 10, suffix: '+', label: 'Projects Built'  },
  { value: 2,  suffix: '+', label: 'Years Coding'    },
  { value: 4,  suffix: '',  label: 'Certifications'  },
  { value: 1,  suffix: '',  label: 'Hackathon Win'   },
];

const SOCIALS = [
  { icon: Github,     href: 'https://github.com/im-umang',                   label: 'GitHub'   },
  { icon: Linkedin,   href: 'https://www.linkedin.com/in/umang-trivedi31101', label: 'LinkedIn' },
  { icon: FaWhatsapp, href: 'https://wa.me/916352296575',                    label: 'WhatsApp' },
  { icon: Mail,       href: 'mailto:utrivedi80@gmail.com',                   label: 'Email'    },
];

/* ─────────────────────────────────────── */
/*  COUNT-UP HOOK                          */
/* ─────────────────────────────────────── */
function useCountUp(target: number, duration = 1600, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf: number;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p    = Math.min((now - t0) / duration, 1);
      const ease = 1 - Math.pow(2, -10 * p);          // easeOutExpo
      setCount(Math.floor(ease * target));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setCount(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return count;
}

/* ─────────────────────────────────────── */
/*  STAT CARD                              */
/* ─────────────────────────────────────── */
const StatCard = ({
  value, suffix, label, delay, inView,
}: { value: number; suffix: string; label: string; delay: number; inView: boolean }) => {
  const n = useCountUp(value, 1600, inView);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.55, ease: 'easeOut' }}
      className="glass rounded-2xl px-5 py-4 text-center flex-1 min-w-[110px]"
    >
      <div className="font-display font-black text-2xl sm:text-3xl text-gradient-blue">
        {n}{suffix}
      </div>
      <div className="text-[11px] text-white/40 font-medium mt-0.5 tracking-wide leading-snug">
        {label}
      </div>
    </motion.div>
  );
};



/* ─────────────────────────────────────── */
/*  PARTICLE CANVAS (interactive network)  */
/* ─────────────────────────────────────── */
const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = canvas.width  = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;
    let raf: number;

    /* Use CSS variable colours */
    const style = getComputedStyle(document.documentElement);
    const hslPrimary   = style.getPropertyValue('--primary').trim();   // e.g. "226 100% 62%"
    const hslSecondary = style.getPropertyValue('--secondary').trim();
    const hslAccent    = style.getPropertyValue('--accent').trim();
    const COLORS = [
      `hsl(${hslPrimary})`,
      `hsl(${hslSecondary})`,
      `hsl(${hslAccent})`,
    ];

    /* Particle count based on screen width */
    const COUNT = window.innerWidth < 640 ? 50 : 90;
    const CONNECT_DIST  = 140;  // px — line draws within this distance
    const MOUSE_DIST    = 180;  // px — mouse-to-particle connection

    type Particle = {
      x: number; y: number;
      vx: number; vy: number;
      r: number;
      color: string;
      alpha: number;
    };

    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 2 + 1.2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.5 + 0.4,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      /* Update positions */
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      }

      /* Draw connecting lines between particles */
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.35;
            ctx.strokeStyle = particles[i].color;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }

        /* Draw mouse→particle lines */
        const mx = particles[i].x - mouse.current.x;
        const my = particles[i].y - mouse.current.y;
        const md = Math.sqrt(mx * mx + my * my);
        if (md < MOUSE_DIST) {
          const alpha = (1 - md / MOUSE_DIST) * 0.6;
          ctx.strokeStyle = particles[i].color;
          ctx.globalAlpha = alpha;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(mouse.current.x, mouse.current.y);
          ctx.lineTo(particles[i].x, particles[i].y);
          ctx.stroke();
        }
      }

      /* Draw dots */
      ctx.globalAlpha = 1;
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        /* glow */
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(draw);
    };

    draw();

    /* Resize */
    const onResize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', onResize);

    /* Mouse tracking — relative to canvas */
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => { mouse.current = { x: -9999, y: -9999 }; };
    window.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};

/* ─────────────────────────────────────── */
/*  HERO COMPONENT                         */
/* ─────────────────────────────────────── */
const Hero = () => {
  const [mounted,     setMounted]     = useState(false);
  const [statsInView, setStatsInView] = useState(false);
  const [spotlight,   setSpotlight]   = useState({ x: 50, y: 50 });

  /* typewriter */
  const [roleIdx,   setRoleIdx]   = useState(0);
  const [charIdx,   setCharIdx]   = useState(0);
  const [deleting,  setDeleting]  = useState(false);
  const [roleText,  setRoleText]  = useState('');

  /* mount */
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 250);
    return () => clearTimeout(t);
  }, []);

  /* typewriter effect */
  useEffect(() => {
    const target = ROLES[roleIdx];
    const speed  = deleting ? 36 : charIdx === target.length ? 1500 : 65;
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

  /* stats observer */
  useEffect(() => {
    const el = document.getElementById('hero-stats');
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsInView(true); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* spotlight */
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    setSpotlight({
      x: ((e.clientX - left) / width)  * 100,
      y: ((e.clientY - top)  / height) * 100,
    });
  }, []);

  /* scroll helper */
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 pt-24 pb-16"
    >
      {/* ── Deep mesh gradient ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse at 20% 50%, hsl(var(--primary) / 0.18) 0%, transparent 50%), ' +
            'radial-gradient(ellipse at 80% 20%, hsl(var(--secondary) / 0.12) 0%, transparent 40%), ' +
            'radial-gradient(ellipse at 50% 90%, hsl(var(--accent) / 0.08) 0%, transparent 40%)',
        }}
      />

      {/* ── Dot grid ── */}
      {/* removed — replaced by canvas particle network below */}

      {/* ── Spotlight follows mouse ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(600px circle at ${spotlight.x}% ${spotlight.y}%, hsl(var(--primary) / 0.07), transparent 55%)`,
        }}
      />

      {/* ── Ambient orbs (indigo + cyan + gold) ── */}
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

      {/* ── Interactive particle network canvas ── */}
      <ParticleCanvas />

      {/* ─────── CONTENT ─────── */}
      <div className="relative z-10 max-w-4xl mx-auto w-full text-center">

        {/* Open-to-work badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.05, ease: 'easeOut' }}
          className="flex justify-center mb-8"
        >
          <button
            onClick={() => scrollTo('contact')}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide glass border border-primary/20 text-white/70 hover:border-primary/50 hover:text-white transition-all duration-300 group cursor-pointer"
            aria-label="Open to work — Go to contact"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            Open to opportunities
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </motion.div>

        {/* Name heading */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
        >
          <h1 className="font-display font-black leading-[1.05] tracking-tight mb-5">
            <span className="block text-white/80 text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5.25rem] mb-1">
              Hey, I'm
            </span>
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem]">
              <span className="text-gradient">Umang</span>
              <span className="text-white/90"> Trivedi</span>
            </span>
          </h1>
        </motion.div>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.38 }}
          className="flex items-center justify-center gap-2 text-lg sm:text-xl md:text-2xl font-mono mb-5 h-9"
        >
          <span className="text-primary font-light">»</span>
          <span className="text-white/65 font-medium tracking-tight">{roleText}</span>
          <span className="w-[2px] h-[1.2em] bg-primary animate-blink rounded-full" />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.48, ease: 'easeOut' }}
          className="text-white/60 text-sm sm:text-base md:text-lg max-w-[560px] mx-auto leading-relaxed mb-10 font-light"
        >
          MCA student at{' '}
          <span className="text-white/90 font-medium">LJ University</span>,
          Ahmedabad. Building scalable, pixel-perfect web experiences with{' '}
          <span className="text-secondary font-medium">React</span>,{' '}
          <span className="text-primary font-medium">Node.js</span> &{' '}
          <span className="text-accent font-medium">MongoDB</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.58, ease: 'easeOut' }}
          className="flex flex-col xs:flex-row items-center justify-center gap-4 mb-10"
        >
          {/* Primary */}
          <motion.button
            onClick={() => scrollTo('contact')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-white text-sm sm:text-base overflow-hidden group cursor-pointer"
            style={{ background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))' }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Let's Work Together
            </span>
            {/* shimmer overlay */}
            <span className="absolute inset-0 bg-white/10 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-700 skew-x-[-20deg]" />
          </motion.button>

          {/* Secondary */}
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
          initial={{ opacity: 0, y: 14 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.68, ease: 'easeOut' }}
          className="flex items-center justify-center gap-3 mb-14"
        >
          {SOCIALS.map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ scale: 1.2, y: -4 }}
              whileTap={{ scale: 0.88 }}
              className="p-2.5 rounded-xl glass border border-white/[0.08] text-white/40 hover:text-white hover:border-white/20 transition-colors duration-200"
            >
              <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            </motion.a>
          ))}
        </motion.div>

        {/* Stats */}
        <div
          id="hero-stats"
          className="flex flex-wrap items-stretch justify-center gap-3 sm:gap-4 max-w-[520px] mx-auto"
        >
          {STATS.map((s, i) => (
            <StatCard
              key={s.label}
              value={s.value}
              suffix={s.suffix}
              label={s.label}
              delay={i * 0.09}
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