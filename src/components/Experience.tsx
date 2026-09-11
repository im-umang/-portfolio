import { motion } from 'framer-motion';
import { Calendar, MapPin, Briefcase, CheckCircle2, Building2, Sparkles, TrendingUp, Layers } from 'lucide-react';

interface ExperienceItem {
  number: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  status: string;
  whatIWorkedOn: string[];
  impactOutcomes: { label: string; detail: string }[];
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
    whatIWorkedOn: [
      'Engineered modular, responsive web interfaces and reusable UI components using React.js and modern Tailwind CSS.',
      'Constructed robust RESTful API endpoints and integrated MongoDB schemas for persistent, structured application state.',
      'Collaborated within an Agile cross-functional team, participating in regular code reviews and rapid sprint deliveries.',
      'Optimized client-side rendering workflows and ensured cross-browser mobile-first responsiveness across devices.',
    ],
    impactOutcomes: [
      { label: 'Sprint Delivery', detail: 'Completed all sprint backlog tasks ahead of schedule with zero regression bugs.' },
      { label: 'Component Reusability', detail: 'Built reusable React design components adopted across internship modules.' },
      { label: 'API Hygiene', detail: 'Designed clean REST endpoints with robust error handling and input validation.' },
    ],
    skills: ['React.js', 'Node.js', 'MongoDB', 'REST APIs', 'Tailwind CSS', 'Git & Agile'],
  },
  {
    number: '02',
    role: 'Technical Instructor & Operations Lead',
    company: 'BECIL Training Centre',
    location: 'Ahmedabad, India',
    period: 'Aug 2021 – Dec 2023',
    type: 'Full-time',
    status: 'Completed',
    whatIWorkedOn: [
      'Conducted intensive technical training on JavaScript ES6+, HTML5/CSS3, and core web programming paradigms.',
      'Supervised lab operations, curriculum scheduling, practical project evaluations, and technical mentorship for student cohorts.',
      'Guided aspiring developers through debugging exercises, code reviews, and building hands-on portfolio web apps.',
      'Assisted students with computational thinking, algorithm fundamentals, and modern software development practices.',
    ],
    impactOutcomes: [
      { label: '100+ Students Mentored', detail: 'Trained and evaluated student cohorts in JavaScript, DOM, and frontend fundamentals.' },
      { label: 'Lab Uptime & Reliability', detail: 'Maintained lab computing infrastructure and software environments with 100% operational readiness.' },
      { label: 'Practical Curriculum', detail: 'Introduced hands-on project reviews that increased project completion rates.' },
    ],
    skills: ['JavaScript ES6+', 'HTML5 / CSS3', 'Web Fundamentals', 'Lab Operations', 'Technical Mentorship'],
  },
];

const Experience = () => {
  return (
    <section className="pt-20 sm:pt-28 pb-20 sm:pb-28 px-4 sm:px-6 relative overflow-hidden" id="experience">
      {/* Background Ambience */}
      <div className="section-glow-exp" aria-hidden="true" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 rounded-full bg-cyan-500/10 blur-[140px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-1/4 -left-48 w-96 h-96 rounded-full bg-primary/10 blur-[140px] pointer-events-none" aria-hidden="true" />

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
            <span>CAREER PROGRESSION & WORK HISTORY</span>
          </div>

          <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 tracking-tight text-white">
            Work <span className="text-gradient">Experience</span>
          </h1>

          <p className="text-white/60 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            Production engineering milestones, technical leadership, and developer mentorship.
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
              <div className="absolute -left-[31px] sm:-left-[47px] md:-left-[55px] top-2 flex items-center justify-center">
                <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#050C18] border-2 border-cyan-400 shadow-[0_0_12px_rgba(0,189,255,0.7)] group-hover:scale-125 group-hover:bg-cyan-400 transition-all duration-300" />
                <div className="absolute w-7 h-7 rounded-full bg-cyan-400/20 animate-ping pointer-events-none" style={{ animationDuration: '3s' }} />
              </div>

              {/* Milestone Card */}
              <div className="rounded-2xl border border-white/[0.08] group-hover:border-cyan-500/40 bg-white/[0.02] group-hover:bg-[#070e1c] p-6 sm:p-8 backdrop-blur-md transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.3)] group-hover:shadow-[0_8px_32px_rgba(0,189,255,0.1)]">
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-semibold tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-md border border-cyan-400/20">
                      Milestone {exp.number}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium text-white/70 bg-white/[0.04] border border-white/10">
                      {exp.type}
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-cyan-300/80 bg-cyan-500/10 border border-cyan-400/20">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Role & Company Header */}
                <div className="mb-6">
                  <h2 className="font-display font-bold text-xl sm:text-2xl text-white group-hover:text-cyan-300 transition-colors tracking-tight">
                    {exp.role}
                  </h2>
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

                {/* Section: What I Worked On */}
                <div className="mb-6">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400/90 mb-3 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    <span>What I Worked On</span>
                  </h3>
                  <ul className="space-y-2.5 text-white/75 text-xs sm:text-sm leading-relaxed font-light">
                    {exp.whatIWorkedOn.map((point, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-cyan-400" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Section: Impact / Outcomes */}
                <div className="mb-6 pt-4 border-t border-white/[0.06]">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-400/90 mb-3 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Impact & Measurable Outcomes</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {exp.impactOutcomes.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-emerald-500/30 transition-all"
                      >
                        <p className="text-xs font-semibold text-emerald-300 font-mono mb-1">{item.label}</p>
                        <p className="text-[11px] text-white/55 leading-snug">{item.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>

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