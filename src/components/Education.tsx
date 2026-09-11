import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Award, BookOpen, Sparkles } from 'lucide-react';

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
/*  SCHOLASTIC MATRIX CARD (2x2 BENTO FORMAT)                  */
/* ─────────────────────────────────────────────────────────── */
function ScholasticCard({ item, index }: { item: EducationItem; index: number }) {
  const isPursuing = item.status === 'Pursuing';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative rounded-2xl border border-white/[0.08] hover:border-cyan-500/35 bg-white/[0.02] hover:bg-white/[0.04] p-6 sm:p-7 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_32px_rgba(0,189,255,0.08)] flex flex-col justify-between overflow-hidden cursor-default"
    >
      {/* Subtle Background Watermark Number */}
      <span className="absolute -right-2 -top-4 text-7xl sm:text-8xl font-black font-mono text-white/[0.02] group-hover:text-cyan-400/[0.04] transition-colors pointer-events-none select-none">
        {item.number}
      </span>

      <div>
        {/* Top Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4 relative z-10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md font-mono text-xs font-bold tracking-wider text-cyan-300 bg-cyan-500/10 border border-cyan-400/25">
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

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-white/85 bg-white/[0.04] border border-white/10">
            <Award className="w-3.5 h-3.5 text-cyan-400" />
            <span>{item.score}</span>
          </div>
        </div>

        {/* Degree Title & Institution */}
        <div className="mb-3 relative z-10">
          <h3 className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-cyan-300 transition-colors tracking-tight leading-snug">
            {item.degree}
          </h3>
          <div className="flex flex-wrap items-center gap-2.5 mt-2 text-xs text-white/60">
            <span className="flex items-center gap-1.5 font-medium text-white/85">
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              {item.institution}
            </span>
            <span className="text-white/25">•</span>
            <span className="flex items-center gap-1 text-white/50">
              <MapPin className="w-3 h-3 text-white/40" />
              {item.location}
            </span>
            <span className="text-white/25">•</span>
            <span className="flex items-center gap-1 font-mono text-white/50 text-[11px]">
              <Calendar className="w-3 h-3 text-white/40" />
              {item.period}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-5 font-light relative z-10">
          {item.description}
        </p>
      </div>

      {/* Coursework & Competency Tags */}
      <div className="pt-4 border-t border-white/[0.06] relative z-10">
        <div className="flex flex-wrap gap-1.5">
          {item.highlights.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-[11px] font-mono tracking-wider text-white/65 bg-white/[0.03] group-hover:bg-cyan-500/10 group-hover:text-cyan-300 border border-white/[0.07] group-hover:border-cyan-400/25 rounded-md transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
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
      {/* Background Ambience */}
      <div className="section-glow-edu" aria-hidden="true" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 rounded-full bg-primary/10 blur-[130px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-6xl mx-auto relative z-10">
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
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-3 tracking-tight text-white">
            Education & <span className="text-gradient">Credentials</span>
          </h2>
          <p className="text-white/55 text-sm sm:text-base max-w-lg mx-auto font-light leading-relaxed">
            Formal postgraduate and undergraduate computer science education and academic honors.
          </p>
        </motion.div>

        {/* ── 2x2 Scholastic Bento Matrix ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {educationData.map((item, index) => (
            <ScholasticCard key={item.number} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
