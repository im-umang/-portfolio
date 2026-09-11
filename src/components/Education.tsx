import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Award, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';
import { sound } from '@/lib/sound';

interface Milestone {
  id: string;
  code: string;
  year: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  result: string;
  status: 'Pursuing' | 'Completed';
  isCurrent?: boolean;
  description: string;
  academicFocus: string[];
}

const CONSTELLATION_NODES: Milestone[] = [
  {
    id: 'ssc',
    code: 'SSC',
    year: '2020',
    degree: 'Secondary School Certificate',
    institution: 'Shree Sarasvati Kunj High School',
    location: 'Ahmedabad, India',
    period: '2019 – 2020',
    result: 'Distinction',
    status: 'Completed',
    description:
      'Foundational secondary education completed with academic distinction, active participation in scientific model exhibitions, and early fascination with computational logic.',
    academicFocus: ['Distinction Honors', 'Mathematics', 'Science Exhibitions', 'Analytical Logic'],
  },
  {
    id: 'hsc',
    code: 'HSC',
    year: '2021',
    degree: 'Higher Secondary Certificate',
    institution: 'Muktajivan High School',
    location: 'Ahmedabad, India',
    period: '2020 – 2021',
    result: '85% Aggregate',
    status: 'Completed',
    description:
      'Rigorous Science stream (Physics, Chemistry, Mathematics) coursework establishing rigorous mathematical problem-solving, algorithmic formulation, and analytical reasoning.',
    academicFocus: ['Science Stream (PCM)', '85% Aggregate', 'Advanced Calculus', 'Physics & Computational Models'],
  },
  {
    id: 'bca',
    code: 'BCA',
    year: '2024',
    degree: 'Bachelor of Computer Applications',
    institution: 'Gujarat University',
    location: 'Ahmedabad, India',
    period: '2021 – 2024',
    result: '6.33 CGPA',
    status: 'Completed',
    description:
      'Undergraduate computer science degree building robust fundamentals in relational databases (RDBMS), object-oriented programming (OOP), data structures, and web development.',
    academicFocus: ['Data Structures & C/C++', 'Relational Database Management (MySQL)', 'Web Programming', 'Software Engineering Principles'],
  },
  {
    id: 'mca',
    code: 'MCA',
    year: '2026',
    degree: 'Master of Computer Applications',
    institution: 'LJ University',
    location: 'Ahmedabad, India',
    period: '2024 – 2026',
    result: '7.25 SPI',
    status: 'Pursuing',
    isCurrent: true,
    description:
      'Advanced postgraduate specialization in distributed software architecture, cloud platforms, real-time application pipelines, enterprise databases, and modern full-stack systems.',
    academicFocus: ['Enterprise Software Architecture', 'Full-Stack MERN Engineering', 'Cloud & Distributed Systems', 'Speech AI & Modern Computing'],
  },
];

const Education = () => {
  // Default selected is the current peak milestone (MCA)
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone>(
    CONSTELLATION_NODES[CONSTELLATION_NODES.length - 1]
  );

  return (
    <section className="pt-20 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-6 relative overflow-hidden" id="education">
      {/* Cosmic Background Atmospheric Glows */}
      <div className="section-glow-edu" aria-hidden="true" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 rounded-full bg-cyan-500/10 blur-[130px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-10 -left-48 w-96 h-96 rounded-full bg-primary/10 blur-[130px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14 sm:mb-18"
        >
          <div className="section-label mx-auto mb-4">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>Scholastic Progression</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-3 tracking-tight text-white">
            Constellation of <span className="text-gradient">Growth</span>
          </h2>
          <p className="text-white/55 text-sm sm:text-base max-w-lg mx-auto font-light leading-relaxed">
            An academic trajectory visualized as an interconnected cosmic journey — from foundational schooling to postgraduate computing architecture.
          </p>
        </motion.div>

        {/* ── DESKTOP CONSTELLATION ORBITAL TRACK (Hidden on small screens) ── */}
        <div className="hidden md:block mb-12 relative px-4">
          {/* Constellation Connecting Vector Path */}
          <div className="relative flex items-center justify-between">
            {/* Luminous Connecting Line */}
            <div className="absolute left-[8%] right-[8%] top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-white/10 via-cyan-400/40 to-primary/80 z-0 pointer-events-none">
              {/* Glowing animated stardust pulse traveling along the path */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent w-32 animate-pulse" />
            </div>

            {/* Constellation Nodes */}
            {CONSTELLATION_NODES.map((node, index) => {
              const isSelected = selectedMilestone.id === node.id;
              const isCurrent = node.isCurrent;

              return (
                <div key={node.id} className="relative z-10 flex flex-col items-center">
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setSelectedMilestone(node);
                    }}
                    onMouseEnter={() => setSelectedMilestone(node)}
                    className="group relative flex items-center justify-center p-2 cursor-pointer focus:outline-none"
                    aria-label={`Select ${node.code} milestone`}
                  >
                    {/* Pulsing Ring for Current Node */}
                    {isCurrent && (
                      <span className="absolute -inset-2 rounded-full border border-cyan-400/40 animate-ping opacity-75 pointer-events-none" />
                    )}

                    {/* Outer Glowing Celestial Halo */}
                    <div
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border transition-all duration-300 ${
                        isSelected
                          ? 'border-cyan-400 bg-cyan-500/20 shadow-[0_0_28px_rgba(0,189,255,0.6)] scale-110'
                          : 'border-white/15 hover:border-cyan-400/40 bg-[#090f1d] hover:bg-white/[0.04]'
                      }`}
                    >
                      {/* Core Star Node */}
                      <div
                        className={`w-4 h-4 rounded-full transition-all duration-300 ${
                          isSelected
                            ? 'bg-cyan-300 shadow-[0_0_12px_#00bdff]'
                            : isCurrent
                            ? 'bg-emerald-400 animate-pulse'
                            : 'bg-white/40 group-hover:bg-white/70'
                        }`}
                      />
                    </div>

                    {/* Milestone Year Label */}
                    <span
                      className={`absolute -bottom-7 font-mono text-xs tracking-wider transition-colors duration-200 ${
                        isSelected ? 'text-cyan-300 font-bold' : 'text-white/40 group-hover:text-white/70'
                      }`}
                    >
                      {node.year}
                    </span>
                  </button>

                  {/* Node Degree Code Pill */}
                  <span
                    className={`mt-10 px-3 py-1 rounded-full font-mono text-xs font-semibold tracking-wider transition-all duration-300 ${
                      isSelected
                        ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-400/35 shadow-[0_0_12px_rgba(0,189,255,0.2)]'
                        : 'bg-white/[0.03] text-white/50 border border-white/[0.06]'
                    }`}
                  >
                    {node.code}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── MOBILE VERTICAL CONSTELLATION TIMELINE (Shown on mobile screens) ── */}
        <div className="md:hidden flex items-center justify-center gap-2 mb-8 overflow-x-auto pb-2">
          {CONSTELLATION_NODES.map((node) => {
            const isSelected = selectedMilestone.id === node.id;
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setSelectedMilestone(node);
                }}
                className={`px-3.5 py-2 rounded-xl font-mono text-xs font-semibold transition-all shrink-0 cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'text-white bg-cyan-500/20 border border-cyan-400/50 shadow-[0_0_12px_rgba(0,189,255,0.3)]'
                    : 'text-white/50 bg-white/[0.03] border border-white/[0.07]'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-cyan-400' : 'bg-white/30'}`} />
                <span>{node.code} ({node.year})</span>
              </button>
            );
          })}
        </div>

        {/* ── CELESTIAL INFORMATION PANEL (Revealed on hover / click) ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedMilestone.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="rounded-3xl border border-white/12 bg-[#090f1d]/90 backdrop-blur-2xl p-7 sm:p-10 shadow-[0_16px_50px_rgba(0,0,0,0.6)] relative overflow-hidden"
          >
            {/* Ambient Corner Flare */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Top Meta Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 relative z-10">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-md font-mono text-xs sm:text-sm font-bold tracking-wider text-cyan-300 bg-cyan-500/15 border border-cyan-400/30">
                  {selectedMilestone.code}
                </span>

                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide ${
                    selectedMilestone.isCurrent
                      ? 'text-emerald-300 bg-emerald-500/15 border border-emerald-400/35 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                      : 'text-white/60 bg-white/[0.04] border border-white/10'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      selectedMilestone.isCurrent ? 'bg-emerald-400 animate-pulse' : 'bg-white/40'
                    }`}
                  />
                  {selectedMilestone.isCurrent ? 'CURRENTLY PURSUING' : 'COMPLETED'}
                </span>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs sm:text-sm font-mono font-bold text-white bg-white/[0.05] border border-white/12">
                <Award className="w-4 h-4 text-cyan-400" />
                <span>Score: {selectedMilestone.result}</span>
              </div>
            </div>

            {/* Degree Title & Institution */}
            <div className="mb-6 relative z-10">
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight leading-snug mb-3">
                {selectedMilestone.degree}
              </h3>

              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-white/65">
                <span className="flex items-center gap-1.5 font-semibold text-white/90">
                  <GraduationCap className="w-4 h-4 text-cyan-400" />
                  {selectedMilestone.institution}
                </span>
                <span className="text-white/25">•</span>
                <span className="flex items-center gap-1 text-white/50">
                  <MapPin className="w-3.5 h-3.5 text-white/40" />
                  {selectedMilestone.location}
                </span>
                <span className="text-white/25">•</span>
                <span className="flex items-center gap-1 font-mono text-cyan-400/80 text-xs">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  {selectedMilestone.period}
                </span>
              </div>
            </div>

            {/* Milestone Description */}
            <p className="text-white/75 text-sm sm:text-base leading-relaxed font-light mb-8 max-w-3xl relative z-10">
              {selectedMilestone.description}
            </p>

            {/* Academic Focus & Coursework Pills */}
            <div className="pt-6 border-t border-white/[0.08] relative z-10">
              <p className="text-xs font-mono uppercase tracking-widest text-white/45 mb-3 font-semibold flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Curriculum & Academic Focus</span>
              </p>

              <div className="flex flex-wrap gap-2">
                {selectedMilestone.academicFocus.map((focus) => (
                  <span
                    key={focus}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono tracking-wide text-white/80 bg-white/[0.03] hover:bg-cyan-500/10 hover:text-cyan-300 border border-white/[0.08] hover:border-cyan-400/30 rounded-lg transition-colors"
                  >
                    <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                    <span>{focus}</span>
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Education;
