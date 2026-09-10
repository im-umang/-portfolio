import { useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Award, BookOpen, CheckCircle2 } from 'lucide-react';

interface EducationItem {
  number: string;
  degree: string;
  short: string;
  institution: string;
  location: string;
  period: string;
  score: string;
  status: 'Pursuing' | 'Completed';
  description: string;
  highlights: string[];
  accentColor: string;
  badgeBg: string;
}

const educationData: EducationItem[] = [
  {
    number: '01',
    degree: 'Master of Computer Applications',
    short: 'MCA',
    institution: 'LJ University',
    location: 'Ahmedabad, India',
    period: '2024 – 2026',
    score: '7.25 SPI',
    status: 'Pursuing',
    description: 'Advanced studies in computing systems, cloud infrastructure, and modern software architecture. Active hackathon innovator and lead developer.',
    highlights: ['Advanced Computing', 'Cloud Architecture', 'Hackathons', 'Full-Stack Systems'],
    accentColor: '#00BDFF',
    badgeBg: 'rgba(0, 189, 255, 0.1)',
  },
  {
    number: '02',
    degree: 'Bachelor of Computer Applications',
    short: 'BCA',
    institution: 'Gujarat University',
    location: 'Ahmedabad, India',
    period: '2021 – 2024',
    score: '6.33 CGPA',
    status: 'Completed',
    description: 'Rigorous foundation in computer science, relational database management, data structures, and web application development.',
    highlights: ['Data Structures', 'Database Engineering', 'Web Technologies', 'Software Lifecycle'],
    accentColor: '#8B5CF6',
    badgeBg: 'rgba(139, 92, 246, 0.1)',
  },
  {
    number: '03',
    degree: 'Higher Secondary Certificate',
    short: 'HSC',
    institution: 'Muktajivan High School',
    location: 'Ahmedabad, India',
    period: '2020 – 2021',
    score: '85% Aggregate',
    status: 'Completed',
    description: 'Science stream (PCM: Physics, Chemistry, Mathematics) with strong emphasis on mathematical reasoning and problem-solving analytics.',
    highlights: ['Science Stream (PCM)', '85% Score', 'Applied Mathematics', 'Physics Lab'],
    accentColor: '#EC4899',
    badgeBg: 'rgba(236, 72, 153, 0.1)',
  },
  {
    number: '04',
    degree: 'Secondary School Certificate',
    short: 'SSC',
    institution: 'Shree Sarasvati Kunj High School',
    location: 'Ahmedabad, India',
    period: '2019 – 2020',
    score: 'Distinction',
    status: 'Completed',
    description: 'Graduated with high scholastic distinction. Active participant in technical symposiums, science exhibitions, and academic competitions.',
    highlights: ['Distinction', 'Science Exhibition', 'Analytical Logic', 'Scholastic Honors'],
    accentColor: '#F59E0B',
    badgeBg: 'rgba(245, 158, 11, 0.1)',
  },
];

/* ─────────────────────────────────────────────────────────── */
/*  SCHOLASTIC CREDENTIAL ROW                                  */
/* ─────────────────────────────────────────────────────────── */
const SPRING = { stiffness: 220, damping: 28, mass: 0.6 } as const;
const MAX_TILT = 2.0;

function EducationRow({ item, index }: { item: EducationItem; index: number }) {
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

  const isPursuing = item.status === 'Pursuing';

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: 'easeOut' }}
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
          background: `radial-gradient(340px circle at ${glowPos.x}% ${glowPos.y}%, ${item.accentColor}18 0%, transparent 65%)`,
        }}
      />

      {/* ── Top Row: Number + Short Degree Code + Status + Grade ── */}
      <div className="flex items-center justify-between gap-4 mb-4 sm:mb-5">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm font-bold tracking-wider text-primary">
            {item.number}
          </span>
          <span
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md font-mono text-xs font-bold tracking-wider"
            style={{
              color: item.accentColor,
              backgroundColor: item.badgeBg,
              border: `1px solid ${item.accentColor}40`,
            }}
          >
            {item.short}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider ${
              isPursuing
                ? 'text-emerald-400 bg-emerald-500/15 border border-emerald-400/30'
                : 'text-white/60 bg-white/[0.05] border border-white/10'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${isPursuing ? 'bg-emerald-400 animate-pulse' : 'bg-white/50'}`}
            />
            {item.status.toUpperCase()}
          </span>
        </div>

        {/* Score / Grade Callout */}
        <div
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-bold"
          style={{
            background: `${item.accentColor}18`,
            color: item.accentColor,
            border: `1px solid ${item.accentColor}35`,
          }}
        >
          <Award className="w-3.5 h-3.5" />
          <span>{item.score}</span>
        </div>
      </div>

      {/* ── Degree Title & Institution ── */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
        <div>
          <h3 className="font-display font-bold text-2xl sm:text-3xl text-white group-hover:text-primary transition-colors tracking-tight leading-snug">
            {item.degree}
          </h3>
          <div className="flex flex-wrap items-center gap-3 mt-1 text-xs sm:text-sm text-white/60">
            <span className="flex items-center gap-1.5 font-medium text-white/80">
              <GraduationCap className="w-4 h-4" style={{ color: item.accentColor }} />
              {item.institution}
            </span>
            <span className="text-white/25">•</span>
            <span className="flex items-center gap-1 text-white/50">
              <MapPin className="w-3.5 h-3.5 text-white/40" />
              {item.location}
            </span>
          </div>
        </div>

        {/* Period pill */}
        <div className="self-start md:self-auto inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-white/10 text-xs font-mono text-white/70">
          <Calendar className="w-3.5 h-3.5 text-primary" />
          <span>{item.period}</span>
        </div>
      </div>

      {/* ── Summary ── */}
      <p className="text-white/60 text-xs sm:text-sm leading-relaxed max-w-3xl mb-5 font-light">
        {item.description}
      </p>

      {/* ── Bottom Row: Discipline Badges ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/[0.06]">
        <div className="flex flex-wrap gap-2">
          {item.highlights.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-[11px] font-mono tracking-wider text-white/60 bg-white/[0.03] border border-white/[0.08] rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>

        <span className="text-xs font-mono text-white/35 group-hover:text-white/60 transition-colors uppercase tracking-widest">
          ACCREDITATION CONFIRMED
        </span>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  EDUCATION SECTION                                          */
/* ─────────────────────────────────────────────────────────── */
const Education = () => {
  return (
    <section className="pt-20 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-6 relative overflow-hidden" id="education">
      {/* Ambient background glows */}
      <div className="section-glow-secondary" aria-hidden="true" />
      <div className="absolute inset-0 cyber-grid-bg opacity-40 pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/4 -right-32 w-[450px] h-[450px] rounded-full bg-violet-500/10 blur-[130px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-1/3 -left-32 w-[450px] h-[450px] rounded-full bg-primary/12 blur-[130px] pointer-events-none" aria-hidden="true" />

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
            <BookOpen className="w-3.5 h-3.5 text-secondary" />
            <span>Academic Credentials</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl mb-4">
            Education & <span className="text-gradient">Scholastics</span>
          </h2>
          <p className="text-white/50 text-sm sm:text-base max-w-lg mx-auto">
            Formal technical education in software architecture, algorithms, and computational mathematics.
          </p>
        </motion.div>

        {/* Education Rows */}
        <div className="space-y-6 sm:space-y-8">
          {educationData.map((item, index) => (
            <EducationRow key={item.number} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
