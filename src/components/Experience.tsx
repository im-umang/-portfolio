import { useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Calendar, MapPin, Briefcase, TrendingUp, CheckCircle2, Building2 } from 'lucide-react';

interface ExperienceItem {
  number: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  statusType: 'live' | 'completed';
  description: string[];
  skills: string[];
  impact: string;
  accentColor: string;
  badgeBg: string;
}

const experiences: ExperienceItem[] = [
  {
    number: '01',
    role: 'Full-Stack Web Development Intern',
    company: 'OctaNet Services Pvt. Ltd.',
    location: 'Remote',
    period: 'June 2024 – July 2024',
    type: 'INTERNSHIP',
    statusType: 'completed',
    description: [
      'Developed responsive web applications using React.js, Node.js & MongoDB, boosting user engagement by 40%.',
      'Architected RESTful APIs and integrated third-party microservices for high-throughput data pipelines.',
      'Collaborated within an Agile cross-functional team, delivering 3 production-ready modules ahead of schedule.',
      'Constructed accessible, mobile-first design systems leveraging Tailwind CSS and TypeScript.'
    ],
    skills: ['REACT.JS', 'NODE.JS', 'MONGODB', 'REST APIS', 'TAILWIND CSS', 'AGILE'],
    impact: '+40% Engagement',
    accentColor: '#00BDFF',
    badgeBg: 'rgba(0, 189, 255, 0.1)',
  },
  {
    number: '02',
    role: 'Technical Instructor & Operations Lead',
    company: 'BECIL Training Centre',
    location: 'Ahmedabad, India',
    period: 'Aug 2021 – Dec 2023',
    type: 'FULL-TIME LEAD',
    statusType: 'completed',
    description: [
      'Directed intensive full-stack training programs for 200+ candidates in JavaScript, frontend architecture, and systems.',
      'Managed institute operations end-to-end: student admissions, batch scheduling, lab infrastructure, and performance benchmarking.',
      'Formulated hands-on project curriculum that improved cohort placement and hiring conversion rates by 35%.',
      'Conducted 1-on-1 code reviews and technical mentoring to prepare candidates for enterprise software roles.'
    ],
    skills: ['JAVASCRIPT', 'SYSTEM OPERATIONS', 'CURRICULUM ARCHITECTURE', 'LEADERSHIP', 'HTML5/CSS3'],
    impact: '+35% Placement Rate',
    accentColor: '#8B5CF6',
    badgeBg: 'rgba(139, 92, 246, 0.1)',
  },
];

/* ─────────────────────────────────────────────────────────── */
/*  SPATIAL CAREER LEDGER ROW                                  */
/* ─────────────────────────────────────────────────────────── */
const SPRING = { stiffness: 220, damping: 28, mass: 0.6 } as const;
const MAX_TILT = 2.0;

function ExperienceRow({ exp, index }: { exp: ExperienceItem; index: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const rawRotX = useMotionValue(0);
  const rawRotY = useMotionValue(0);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const rotX = useSpring(rawRotX, SPRING);
  const rotY = useSpring(rawRotY, SPRING);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = rowRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const px = (e.clientX - left) / width;
    const py = (e.clientY - top) / height;

    rawRotX.set((0.5 - py) * MAX_TILT * 2);
    rawRotY.set((px - 0.5) * MAX_TILT * 2);
    setGlowPos({ x: px * 100, y: py * 100 });
  }, [rawRotX, rawRotY]);

  const onMouseEnter = useCallback(() => setHovered(true), []);
  const onMouseLeave = useCallback(() => {
    rawRotX.set(0);
    rawRotY.set(0);
    setHovered(false);
  }, [rawRotX, rawRotY]);

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: 'easeOut' }}
      style={{
        rotateX: rotX,
        rotateY: rotY,
        transformStyle: 'preserve-3d',
        perspective: '900px',
        willChange: 'transform',
      }}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="group relative rounded-2xl border border-white/[0.08] hover:border-white/20 bg-surface/40 hover:bg-surface/70 backdrop-blur-md p-6 sm:p-8 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.25)] hover:shadow-[0_14px_48px_rgba(0,0,0,0.45)] overflow-hidden cursor-default"
    >
      {/* ── Cursor-following internal glow ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(360px circle at ${glowPos.x}% ${glowPos.y}%, rgba(59,91,255,0.12) 0%, transparent 65%)`,
        }}
      />

      {/* ── Top Row: Number + Employment Type + Impact Metric ── */}
      <div className="flex items-center justify-between gap-4 mb-4 sm:mb-5">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm font-bold tracking-wider text-primary">
            {exp.number}
          </span>
          <span
            className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider"
            style={{
              color: exp.accentColor,
              backgroundColor: exp.badgeBg,
              border: `1px solid ${exp.accentColor}40`,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: exp.accentColor }} />
            {exp.type}
          </span>
        </div>

        {/* Quantifiable Impact Tag */}
        <div
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold"
          style={{
            background: `${exp.accentColor}18`,
            color: exp.accentColor,
            border: `1px solid ${exp.accentColor}35`,
          }}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>{exp.impact}</span>
        </div>
      </div>

      {/* ── Role Title & Company Header ── */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
        <div>
          <h3 className="font-display font-bold text-2xl sm:text-3xl text-white group-hover:text-primary transition-colors tracking-tight leading-snug">
            {exp.role}
          </h3>
          <div className="flex flex-wrap items-center gap-3 mt-1 text-xs sm:text-sm text-white/60">
            <span className="flex items-center gap-1.5 font-medium text-white/80">
              <Building2 className="w-3.5 h-3.5" style={{ color: exp.accentColor }} />
              {exp.company}
            </span>
            <span className="text-white/25">•</span>
            <span className="flex items-center gap-1 text-white/50">
              <MapPin className="w-3.5 h-3.5 text-white/40" />
              {exp.location}
            </span>
          </div>
        </div>

        {/* Period pill */}
        <div className="self-start md:self-auto inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-white/10 text-xs font-mono text-white/70">
          <Calendar className="w-3.5 h-3.5 text-primary" />
          <span>{exp.period}</span>
        </div>
      </div>

      {/* ── Key Deliverables & Architectural Accomplishments ── */}
      <div className="space-y-2.5 my-5 text-white/65 text-xs sm:text-sm leading-relaxed font-light">
        {exp.description.map((point, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <CheckCircle2
              className="w-4 h-4 mt-0.5 shrink-0"
              style={{ color: exp.accentColor }}
            />
            <span>{point}</span>
          </div>
        ))}
      </div>

      {/* ── Bottom Row: Technology & Domain Badges ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/[0.06]">
        <div className="flex flex-wrap gap-2">
          {exp.skills.map((skill) => (
            <span
              key={skill}
              className="px-2.5 py-1 text-[11px] font-mono tracking-wider text-white/60 bg-white/[0.03] border border-white/[0.08] rounded-md"
            >
              {skill}
            </span>
          ))}
        </div>

        <span className="text-xs font-mono text-white/35 group-hover:text-white/60 transition-colors uppercase tracking-widest">
          MILESTONE VERIFIED
        </span>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  EXPERIENCE SECTION                                         */
/* ─────────────────────────────────────────────────────────── */
const Experience = () => {
  return (
    <section className="pt-20 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-6 relative overflow-hidden" id="experience">
      {/* Ambient background glows */}
      <div className="section-glow-primary" aria-hidden="true" />
      <div className="absolute inset-0 cyber-dots-bg opacity-35 pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/3 -left-32 w-[450px] h-[450px] rounded-full bg-primary/15 blur-[130px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-1/4 -right-32 w-[450px] h-[450px] rounded-full bg-secondary/15 blur-[130px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="section-label mx-auto mb-5">
            <Briefcase className="w-3.5 h-3.5 text-primary" />
            <span>Career Progression</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl mb-4">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-white/50 text-sm sm:text-base max-w-lg mx-auto">
            Practical engineering track record across production systems, developer mentorship, and operational leadership.
          </p>
        </motion.div>

        {/* Experience Ledger Rows */}
        <div className="space-y-6 sm:space-y-8">
          {experiences.map((exp, index) => (
            <ExperienceRow key={exp.number} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;