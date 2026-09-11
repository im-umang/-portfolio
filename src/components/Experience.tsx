import { motion } from 'framer-motion';
import { Calendar, MapPin, Briefcase, CheckCircle2, Building2 } from 'lucide-react';

interface ExperienceItem {
  number: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  description: string[];
  skills: string[];
  accentColor: string;
}

const experiences: ExperienceItem[] = [
  {
    number: '01',
    role: 'Full-Stack Web Development Intern',
    company: 'OctaNet Services Pvt. Ltd.',
    location: 'Remote',
    period: 'June 2024 – July 2024',
    type: 'Internship',
    description: [
      'Built responsive web interfaces and reusable components using React.js and modern Tailwind CSS.',
      'Constructed RESTful API endpoints and integrated MongoDB for persistent application state.',
      'Collaborated within an Agile cross-functional team, participating in regular code reviews and sprint delivery.',
      'Ensured cross-browser compatibility, mobile-first responsiveness, and clean component architecture.'
    ],
    skills: ['React.js', 'Node.js', 'MongoDB', 'REST APIs', 'Tailwind CSS', 'Agile'],
    accentColor: 'hsl(var(--primary))',
  },
  {
    number: '02',
    role: 'Technical Instructor & Operations Lead',
    company: 'BECIL Training Centre',
    location: 'Ahmedabad, India',
    period: 'Aug 2021 – Dec 2023',
    type: 'Full-time',
    description: [
      'Conducted technical training on JavaScript, HTML5/CSS3, and web programming fundamentals for student cohorts.',
      'Supervised lab operations, curriculum scheduling, practical project evaluations, and technical mentoring.',
      'Guided aspiring developers through building hands-on portfolio projects and debugging exercises.',
      'Assisted students with code optimization, algorithmic thinking, and modern software development practices.'
    ],
    skills: ['JavaScript', 'HTML5/CSS3', 'Web Fundamentals', 'Operations', 'Technical Mentorship'],
    accentColor: 'hsl(var(--secondary))',
  },
];

/* ─────────────────────────────────────────────────────────── */
/*  EXPERIENCE ROW — CLEAN, INTENTIONAL ARCHITECTURAL LEDGER   */
/* ─────────────────────────────────────────────────────────── */
function ExperienceRow({ exp, index }: { exp: ExperienceItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative rounded-2xl border border-white/[0.08] hover:border-cyan-500/35 bg-white/[0.02] hover:bg-white/[0.04] p-6 sm:p-8 transition-all duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] cursor-default"
    >
      {/* Top Meta Row: Number + Type + Period */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-cyan-400">
            {exp.number}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium tracking-wide text-white/70 bg-white/[0.05] border border-white/10">
            {exp.type}
          </span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-white/55 bg-white/[0.03] border border-white/[0.07]">
          <Calendar className="w-3.5 h-3.5 text-cyan-400/70" />
          <span>{exp.period}</span>
        </div>
      </div>

      {/* Role Title & Company Header */}
      <div className="mb-4">
        <h3 className="font-display font-semibold text-xl sm:text-2xl text-white group-hover:text-cyan-300 transition-colors tracking-tight leading-snug">
          {exp.role}
        </h3>
        <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs sm:text-sm text-white/60">
          <span className="flex items-center gap-1.5 font-medium text-white/85">
            <Building2 className="w-3.5 h-3.5 text-cyan-400" />
            {exp.company}
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1 text-white/50">
            <MapPin className="w-3.5 h-3.5 text-white/40" />
            {exp.location}
          </span>
        </div>
      </div>

      {/* Key Responsibilities */}
      <ul className="space-y-2 mb-6 text-white/70 text-xs sm:text-sm leading-relaxed font-light">
        {exp.description.map((point, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-cyan-400/80" />
            <span>{point}</span>
          </li>
        ))}
      </ul>

      {/* Technology Pills */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/[0.06]">
        <div className="flex flex-wrap gap-1.5">
          {exp.skills.map((skill) => (
            <span
              key={skill}
              className="px-2.5 py-1 text-[11px] font-mono tracking-wider text-white/65 bg-white/[0.03] border border-white/[0.07] rounded-md"
            >
              {skill}
            </span>
          ))}
        </div>

        <span className="text-[11px] font-mono text-white/30 uppercase tracking-wider hidden sm:inline">
          Verified Experience
        </span>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  EXPERIENCE SECTION COMPONENT                               */
/* ─────────────────────────────────────────────────────────── */
const Experience = () => {
  return (
    <section className="pt-20 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-6 relative overflow-hidden" id="experience">
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
            <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
            <span>Career History</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-3 tracking-tight">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-white/50 text-sm sm:text-base max-w-lg mx-auto">
            Hands-on technical engineering, microservice integration, and developer mentorship.
          </p>
        </motion.div>

        {/* Experience Ledger Rows */}
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <ExperienceRow key={exp.number} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;