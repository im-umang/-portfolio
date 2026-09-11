import { motion } from 'framer-motion';
import { Calendar, MapPin, Briefcase, CheckCircle2, Building2, Sparkles } from 'lucide-react';

interface ExperienceItem {
  number: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  status: string;
  description: string[];
  skills: string[];
}

const experiences: ExperienceItem[] = [
  {
    number: '01',
    role: 'Full-Stack Web Development Intern',
    company: 'OctaNet Services Pvt. Ltd.',
    location: 'Remote',
    period: 'June 2024 – July 2024',
    type: 'Internship',
    status: 'Completed',
    description: [
      'Built responsive web interfaces and reusable components using React.js and modern Tailwind CSS.',
      'Constructed RESTful API endpoints and integrated MongoDB for persistent application state.',
      'Collaborated within an Agile cross-functional team, participating in regular code reviews and sprint delivery.',
      'Ensured cross-browser compatibility, mobile-first responsiveness, and clean component architecture.'
    ],
    skills: ['React.js', 'Node.js', 'MongoDB', 'REST APIs', 'Tailwind CSS', 'Agile'],
  },
  {
    number: '02',
    role: 'Technical Instructor & Operations Lead',
    company: 'BECIL Training Centre',
    location: 'Ahmedabad, India',
    period: 'Aug 2021 – Dec 2023',
    type: 'Full-time',
    status: 'Completed',
    description: [
      'Conducted technical training on JavaScript, HTML5/CSS3, and web programming fundamentals for student cohorts.',
      'Supervised lab operations, curriculum scheduling, practical project evaluations, and technical mentoring.',
      'Guided aspiring developers through building hands-on portfolio projects and debugging exercises.',
      'Assisted students with code optimization, algorithmic thinking, and modern software development practices.'
    ],
    skills: ['JavaScript', 'HTML5/CSS3', 'Web Fundamentals', 'Operations', 'Technical Mentorship'],
  },
];

/* ─────────────────────────────────────────────────────────── */
/*  EXPERIENCE SECTION — ARCHITECTURAL MILESTONE SPINE         */
/* ─────────────────────────────────────────────────────────── */
const Experience = () => {
  return (
    <section className="pt-20 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-6 relative overflow-hidden" id="experience">
      {/* Background Ambience */}
      <div className="section-glow-exp" aria-hidden="true" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14 md:mb-20"
        >
          <div className="section-label mx-auto mb-4">
            <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
            <span>Career Progression</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-3 tracking-tight text-white">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-white/55 text-sm sm:text-base max-w-lg mx-auto font-light leading-relaxed">
            Chronological engineering milestones, production applications, and technical mentorship.
          </p>
        </motion.div>

        {/* ── Vertical Milestone Timeline Track ── */}
        <div className="relative pl-6 sm:pl-10 md:pl-12 border-l border-white/[0.12] space-y-12 sm:space-y-16 ml-3 sm:ml-6">
          {/* Luminous track gradient overlay */}
          <div className="absolute top-0 left-[-1px] bottom-0 w-[2px] bg-gradient-to-b from-cyan-400 via-primary to-transparent opacity-60 pointer-events-none" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.number}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative group"
            >
              {/* Timeline Circuit Node */}
              <div className="absolute -left-[31px] sm:-left-[47px] md:-left-[55px] top-1.5 flex items-center justify-center">
                <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#050C18] border-2 border-cyan-400 shadow-[0_0_12px_rgba(0,189,255,0.7)] group-hover:scale-125 group-hover:bg-cyan-400 transition-all duration-300" />
                <div className="absolute w-7 h-7 rounded-full bg-cyan-400/20 animate-ping pointer-events-none" style={{ animationDuration: '3s' }} />
              </div>

              {/* Milestone Content Box */}
              <div className="rounded-2xl border border-white/[0.08] group-hover:border-cyan-500/35 bg-white/[0.02] group-hover:bg-white/[0.04] p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.3)] group-hover:shadow-[0_8px_32px_rgba(0,189,255,0.08)]">
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-semibold tracking-wider text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-400/20">
                      Milestone {exp.number}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium text-white/70 bg-white/[0.04] border border-white/10">
                      {exp.type}
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-white/60 bg-white/[0.03] border border-white/[0.08]">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Role & Company Header */}
                <div className="mb-4">
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white group-hover:text-cyan-300 transition-colors tracking-tight">
                    {exp.role}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs sm:text-sm text-white/60">
                    <span className="flex items-center gap-1.5 font-semibold text-white/90">
                      <Building2 className="w-4 h-4 text-cyan-400" />
                      {exp.company}
                    </span>
                    <span className="text-white/20">•</span>
                    <span className="flex items-center gap-1 text-white/50">
                      <MapPin className="w-3.5 h-3.5 text-white/40" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Accomplishments */}
                <ul className="space-y-2.5 mb-6 text-white/75 text-xs sm:text-sm leading-relaxed font-light">
                  {exp.description.map((point, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-cyan-400" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Technology Stack Pills */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/[0.06]">
                  <div className="flex flex-wrap gap-1.5">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 text-[11px] font-mono tracking-wider text-white/70 bg-white/[0.04] hover:bg-cyan-500/10 hover:text-cyan-300 border border-white/[0.08] hover:border-cyan-400/30 rounded-md transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-cyan-400/80 uppercase tracking-wider">
                    <Sparkles className="w-3 h-3" />
                    Verified Experience
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;