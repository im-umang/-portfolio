import { motion } from 'framer-motion';
import { ExternalLink, Trophy, BookOpen, Sparkles, ArrowRight, ShieldCheck, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AchievementRecord {
  title: string;
  year: string;
  event: string;
  result: string;
  type: 'hackathon' | 'certification';
  certificateUrl: string;
  description: string;
  relatedProjectSlug?: string;
  relatedProjectName?: string;
  featured?: boolean;
}

const ACHIEVEMENT_ARCHIVE: AchievementRecord[] = [
  {
    title: "Odoo × Adani University Hackathon '26",
    year: '2026',
    event: 'Odoo & Adani University',
    result: 'Official Hackathon Winner',
    type: 'hackathon',
    certificateUrl: '/certificates/Odoo_Hackathon_2026_Umang_Trivedi.pdf',
    featured: true,
    description:
      'Competed in an intense 24-hour hackathon, engineering GearGuard — a full-stack preventive maintenance and equipment lifecycle system using React.js, Node.js, and MySQL under intense sprint conditions.',
    relatedProjectSlug: 'gearguard',
    relatedProjectName: 'GearGuard — The Ultimate Maintenance Tracker',
  },
  {
    title: 'Introduction to Software Engineering',
    year: '2025',
    event: 'IBM (via Coursera)',
    result: 'Verified Professional Credential',
    type: 'certification',
    certificateUrl: 'https://www.coursera.org/account/accomplishments/certificate/UM37W79OM5A1',
    description:
      'Comprehensive foundation in software development lifecycles (SDLC), architecture principles, design patterns, and engineering testing practices.',
  },
  {
    title: 'Programming in C',
    year: '2025',
    event: 'CodeTantra',
    result: 'Advanced Programming Distinction',
    type: 'certification',
    certificateUrl: '/certificates/CodeTantra_Programming_in_C_Umang_Trivedi.pdf',
    description:
      'Advanced low-level C programming including pointer arithmetic, heap/stack memory management, dynamic structs, and algorithmic structures.',
  },
  {
    title: 'Generative AI: Fundamentals Specialization',
    year: '2025',
    event: 'IBM (via Coursera)',
    result: 'Specialization Distinction',
    type: 'certification',
    certificateUrl: 'https://www.coursera.org/account/accomplishments/specialization/certificate/RROYQPAIJNYJ',
    description:
      'Deep dive into modern generative AI models, transformer architectures, prompt engineering, and conversational AI application pipelines.',
  },
];

const Achievements = () => {
  const featuredHackathon = ACHIEVEMENT_ARCHIVE.find((a) => a.featured);
  const certifications = ACHIEVEMENT_ARCHIVE.filter((a) => !a.featured);

  return (
    <section className="pt-20 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-6 relative overflow-hidden" id="achievements">
      {/* Background Ambience */}
      <div className="section-glow-accent" aria-hidden="true" />
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[550px] h-[350px] rounded-full bg-cyan-500/10 blur-[130px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="section-label mx-auto mb-4">
            <Trophy className="w-3.5 h-3.5 text-cyan-400" />
            <span>Verified Honors & Credentials</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-3 tracking-tight text-white">
            Achievement <span className="text-gradient">Archive</span>
          </h2>
          <p className="text-white/55 text-sm sm:text-base max-w-lg mx-auto font-light leading-relaxed">
            Documented competition victories, engineering credentials, and accredited software certifications.
          </p>
        </motion.div>

        {/* ── FEATURED HACKATHON WIN ARCHIVE CARD ── */}
        {featuredHackathon && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="rounded-3xl border border-cyan-500/35 bg-gradient-to-br from-cyan-950/20 via-primary/5 to-black/40 p-7 sm:p-9 shadow-[0_12px_40px_rgba(0,189,255,0.1)] mb-10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row sm:items-start gap-6 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(0,189,255,0.25)] shrink-0">
                <Trophy className="w-8 h-8" />
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-0.5 text-xs font-mono font-bold tracking-wider rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-400/30">
                      {featuredHackathon.result}
                    </span>
                    <span className="text-xs text-white/45 font-mono">{featuredHackathon.year}</span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-400/20">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>24-Hour Competitive Sprint</span>
                  </span>
                </div>

                <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight mb-2">
                  {featuredHackathon.title}
                </h3>
                <p className="text-sm font-medium text-white/70 mb-3 font-mono">
                  {featuredHackathon.event}
                </p>
                <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light mb-6 max-w-3xl">
                  {featuredHackathon.description}
                </p>

                {/* Related Project Connection & Certificate Actions */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-white/10">
                  {featuredHackathon.relatedProjectSlug && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-white/40">Built project:</span>
                      <Link
                        to={`/projects/${featuredHackathon.relatedProjectSlug}`}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        <span>VIEW PROJECT ({featuredHackathon.relatedProjectName?.split('—')[0].trim()})</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  )}

                  <a
                    href={featuredHackathon.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold text-white/80 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors"
                  >
                    <span>View Certificate (PDF)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── ACCREDITED CERTIFICATIONS GRID ── */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-white/50">
              Accredited Engineering Credentials
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {certifications.map((cert, idx) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="rounded-2xl border border-white/[0.08] hover:border-cyan-500/35 bg-white/[0.02] hover:bg-white/[0.04] p-6 flex flex-col justify-between transition-all group"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-400/25 text-cyan-400">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-white/[0.04] text-white/60 border border-white/10">
                      {cert.year}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base text-white group-hover:text-cyan-300 transition-colors mb-1.5 leading-snug">
                    {cert.title}
                  </h3>
                  <p className="text-xs font-mono text-white/50 mb-3">{cert.event}</p>
                  <p className="text-xs text-white/55 leading-relaxed font-light mb-6">
                    {cert.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06]">
                  <a
                    href={cert.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
