import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Award, BookOpen } from 'lucide-react';

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
    description: 'Postgraduate focus on software architecture, cloud platforms, full-stack application development, and algorithms.',
    highlights: ['Software Architecture', 'Full-Stack Systems', 'Cloud Technologies', 'Algorithms'],
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
    description: 'Foundational coursework in computer science, relational databases (RDBMS), object-oriented programming, and web technologies.',
    highlights: ['Data Structures', 'Database Management', 'Web Programming', 'Software Engineering'],
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
    description: 'Science stream (Physics, Chemistry, Mathematics) with core focus on analytical problem-solving and computational logic.',
    highlights: ['Science Stream (PCM)', '85% Score', 'Mathematics', 'Physics'],
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
    description: 'Secondary education completed with academic distinction and active participation in technical science exhibitions.',
    highlights: ['Distinction Score', 'Science Exhibition', 'Academic Foundation'],
  },
];

/* ─────────────────────────────────────────────────────────── */
/*  EDUCATION ROW — CLEAN SCHOLASTIC CREDENTIAL MATRIX         */
/* ─────────────────────────────────────────────────────────── */
function EducationRow({ item, index }: { item: EducationItem; index: number }) {
  const isPursuing = item.status === 'Pursuing';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative rounded-2xl border border-white/[0.08] hover:border-cyan-500/35 bg-white/[0.02] hover:bg-white/[0.04] p-6 sm:p-8 transition-all duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] cursor-default"
    >
      {/* Top Meta Row: Number + Degree Code + Status + Grade */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-cyan-400">
            {item.number}
          </span>
          <span className="px-2.5 py-0.5 rounded-md font-mono text-xs font-semibold tracking-wider text-cyan-300 bg-cyan-500/10 border border-cyan-400/25">
            {item.short}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium tracking-wide ${
              isPursuing
                ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-400/30'
                : 'text-white/60 bg-white/[0.04] border border-white/10'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isPursuing ? 'bg-emerald-400 animate-pulse' : 'bg-white/40'}`} />
            {item.status}
          </span>
        </div>

        {/* Grade / Score Callout */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-white/80 bg-white/[0.04] border border-white/10">
          <Award className="w-3.5 h-3.5 text-cyan-400" />
          <span>{item.score}</span>
        </div>
      </div>

      {/* Degree Title & Institution Header */}
      <div className="mb-3">
        <h3 className="font-display font-semibold text-xl sm:text-2xl text-white group-hover:text-cyan-300 transition-colors tracking-tight leading-snug">
          {item.degree}
        </h3>
        <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs sm:text-sm text-white/60">
          <span className="flex items-center gap-1.5 font-medium text-white/85">
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            {item.institution}
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1 text-white/50">
            <MapPin className="w-3.5 h-3.5 text-white/40" />
            {item.location}
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1.5 font-mono text-white/50 text-xs">
            <Calendar className="w-3.5 h-3.5 text-white/40" />
            {item.period}
          </span>
        </div>
      </div>

      {/* Summary */}
      <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-5 font-light">
        {item.description}
      </p>

      {/* Coursework & Discipline Badges */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/[0.06]">
        <div className="flex flex-wrap gap-1.5">
          {item.highlights.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-[11px] font-mono tracking-wider text-white/65 bg-white/[0.03] border border-white/[0.07] rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>

        <span className="text-[11px] font-mono text-white/30 uppercase tracking-wider hidden sm:inline">
          Academic Accreditation
        </span>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  EDUCATION SECTION COMPONENT                                */
/* ─────────────────────────────────────────────────────────── */
const Education = () => {
  return (
    <section className="pt-20 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-6 relative overflow-hidden" id="education">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="section-label mx-auto mb-4">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>Academic Qualifications</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-3 tracking-tight">
            Education & <span className="text-gradient">Credentials</span>
          </h2>
          <p className="text-white/50 text-sm sm:text-base max-w-lg mx-auto">
            Formal degrees in computer applications, computing systems, and computational sciences.
          </p>
        </motion.div>

        {/* Education Rows */}
        <div className="space-y-6">
          {educationData.map((item, index) => (
            <EducationRow key={item.number} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
