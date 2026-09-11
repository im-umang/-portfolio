import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, ArrowUpRight, Github, Star, ExternalLink, Sparkles, Code2, Trophy, Layers, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PROJECTS_DATA, Project } from '@/data/projectsData';
import QuickViewModal from '@/components/QuickViewModal';

/* ─────────────────────────────────────────────────────────── */
/*  STATUS BADGE HELPER                                        */
/* ─────────────────────────────────────────────────────────── */
function StatusBadge({ type, text, isClient }: { type: Project['statusType']; text: string; isClient?: boolean }) {
  if (isClient) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium tracking-wide text-cyan-300 bg-cyan-500/10 border border-cyan-400/30">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        {text}
      </span>
    );
  }

  switch (type) {
    case 'working':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium tracking-wide text-blue-300 bg-blue-500/10 border border-blue-400/30">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          {text}
        </span>
      );
    case 'live':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium tracking-wide text-emerald-300 bg-emerald-500/10 border border-emerald-400/30">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {text}
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium tracking-wide text-cyan-300 bg-cyan-500/10 border border-cyan-400/25">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          {text}
        </span>
      );
  }
}

/* ─────────────────────────────────────────────────────────── */
/*  FILTER TABS DEFINITION                                     */
/* ─────────────────────────────────────────────────────────── */
type FilterCategory = 'all' | 'client' | 'ai' | 'hackathon';

const FILTER_TABS: { id: FilterCategory; label: string; icon: React.ElementType }[] = [
  { id: 'all',       label: 'All Work',         icon: Layers },
  { id: 'client',    label: 'Client Projects',  icon: Sparkles },
  { id: 'ai',        label: 'AI & Web Apps',    icon: Code2 },
  { id: 'hackathon', label: 'Hackathon Wins',   icon: Trophy },
];

/* ─────────────────────────────────────────────────────────── */
/*  PROJECT CARD — CALM, EXECUTIVE ARCHITECTURAL SHOWCASE      */
/* ─────────────────────────────────────────────────────────── */
function ProjectCard({
  project,
  index,
  onQuickView,
}: {
  project: Project;
  index: number;
  onQuickView: (p: Project) => void;
}) {
  const isClient = project.isClientProject;

  return (
    <motion.article
      layout
      data-cursor="project"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
      className="project-card group relative rounded-2xl border border-white/[0.08] hover:border-cyan-500/40 bg-white/[0.02] hover:bg-white/[0.035] p-6 sm:p-8 transition-all duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.55)] cursor-default overflow-hidden"
    >
      {/* Subtle single ambient background accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/[0.03] rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/[0.06] transition-colors duration-500" />

      <div className="relative z-10">
        {/* Top Header Row: Number + Status + Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-cyan-400">
              {project.number}
            </span>
            <StatusBadge type={project.statusType} text={project.status} isClient={isClient} />
          </div>

          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-400/30 transition-all shadow-sm"
                aria-label={`Live demo for ${project.title}`}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Demo</span>
              </a>
            )}

            <button
              type="button"
              onClick={() => onQuickView(project)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium text-white/70 hover:text-white bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 transition-all cursor-pointer shadow-sm"
              aria-label={`Quick view for ${project.title}`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Quick View</span>
            </button>
          </div>
        </div>

        {/* 2-Column Responsive Layout: Mockup on Left / Narrative on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Column: Browser Mockup Viewport */}
          <div className="lg:col-span-6">
            <Link
              to={`/projects/${project.slug}`}
              className="block group/mockup relative rounded-xl border border-white/10 hover:border-cyan-500/40 bg-[#0a0f18] overflow-hidden transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] cursor-pointer"
            >
              {/* Browser Header Chrome */}
              <div className="flex items-center justify-between px-3.5 py-2 bg-white/[0.03] border-b border-white/[0.06]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/70" />
                </div>
                {/* Simulated URL */}
                <div className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-white/[0.04] text-[10px] font-mono text-white/40 max-w-[180px] truncate border border-white/[0.04]">
                  <Globe className="w-2.5 h-2.5 shrink-0 text-cyan-400/50" />
                  <span className="truncate">{project.liveUrl ? project.liveUrl.replace('https://', '') : `${project.slug}.dev`}</span>
                </div>
                <div className="w-6" />
              </div>

              {/* Screenshot Aspect Ratio Box */}
              <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                <img
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover/mockup:scale-[1.03]"
                />
              </div>
            </Link>
          </div>

          {/* Right Column: Title, Narrative, Tech Badges */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <Link to={`/projects/${project.slug}`} className="block group/link cursor-pointer">
                <h3 className="font-display font-semibold text-xl sm:text-2xl lg:text-[1.65rem] text-white group-hover/link:text-cyan-300 transition-colors tracking-tight leading-snug mb-2.5">
                  {project.title}
                </h3>
              </Link>

              <p className="text-white/65 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                {project.description}
              </p>
            </div>

            {/* Tech Badges & Case Study Link */}
            <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {project.techBadges.slice(0, 4).map((badge) => (
                  <span
                    key={badge}
                    className="px-2.5 py-1 text-[10px] font-mono tracking-wider rounded-md text-white/65 bg-white/[0.03] border border-white/[0.07]"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg text-white/45 hover:text-white hover:bg-white/[0.06] transition-colors"
                    aria-label={`GitHub repository for ${project.title}`}
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}

                <Link
                  to={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors group/btn cursor-pointer py-1 text-cyan-400 hover:text-cyan-300"
                >
                  <span>Case Study</span>
                  <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  PROJECTS SECTION COMPONENT                                 */
/* ─────────────────────────────────────────────────────────── */
const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all');
  const [selectedQuickView, setSelectedQuickView] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') return PROJECTS_DATA;
    if (selectedCategory === 'client') return PROJECTS_DATA.filter(p => p.category === 'client');
    if (selectedCategory === 'ai') return PROJECTS_DATA.filter(p => p.category === 'ai');
    if (selectedCategory === 'hackathon') return PROJECTS_DATA.filter(p => p.category === 'hackathon');
    return PROJECTS_DATA;
  }, [selectedCategory]);

  return (
    <section
      className="relative pt-20 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-6 overflow-hidden"
      id="projects"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-10 md:mb-14"
        >
          <div className="section-label mx-auto mb-4">
            <Star className="w-3.5 h-3.5 text-cyan-400" />
            <span>Featured Engineering Works</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-3 tracking-tight">
            Shipped <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-white/50 text-sm sm:text-base max-w-lg mx-auto">
            Production client systems, speech AI applications, and hackathon solutions.
          </p>

          {/* Clean Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-7">
            {FILTER_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = selectedCategory === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-white border border-cyan-400/40 bg-cyan-500/15 shadow-[0_0_12px_rgba(0,189,255,0.25)]'
                      : 'text-white/50 hover:text-white border border-white/[0.07] hover:border-white/15 bg-white/[0.02] hover:bg-white/[0.05]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-white/40'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Project Cards List */}
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={index}
                onQuickView={setSelectedQuickView}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-center mt-12 sm:mt-14"
        >
          <a
            href="https://github.com/im-umang"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-white/10 hover:border-cyan-400/40 bg-white/[0.02] hover:bg-white/[0.05] text-white/70 hover:text-white font-mono text-xs sm:text-sm font-medium transition-all shadow-sm"
          >
            <Github className="w-4 h-4" />
            <span>Explore All Repositories on GitHub</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        project={selectedQuickView}
        onClose={() => setSelectedQuickView(null)}
      />
    </section>
  );
};

export default Projects;