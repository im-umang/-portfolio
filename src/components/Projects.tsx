import { useState, useRef, useCallback, useMemo } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
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
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider text-cyan-300 bg-cyan-500/15 border border-cyan-400/40 shadow-[0_0_14px_rgba(0,189,255,0.3)]">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        {text}
      </span>
    );
  }

  switch (type) {
    case 'working':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold tracking-wider text-blue-300 bg-blue-500/15 border border-blue-400/35 shadow-[0_0_10px_rgba(59,91,255,0.25)]">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          {text}
        </span>
      );
    case 'live':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider text-emerald-400 bg-emerald-500/15 border border-emerald-400/40 shadow-[0_0_14px_rgba(52,211,153,0.3)]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {text}
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/30">
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
/*  3D TILT PROJECT CARD WITH MOCKUP VIEWPORT                  */
/* ─────────────────────────────────────────────────────────── */
const SPRING = { stiffness: 240, damping: 26, mass: 0.6 } as const;
const MAX_TILT = 1.8;

function ProjectCard({
  project,
  index,
  onQuickView,
}: {
  project: Project;
  index: number;
  onQuickView: (p: Project) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rawRotX = useMotionValue(0);
  const rawRotY = useMotionValue(0);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const rotX = useSpring(rawRotX, SPRING);
  const rotY = useSpring(rawRotY, SPRING);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
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

  const isClient = project.isClientProject;

  return (
    <motion.article
      layout
      data-cursor="project"
      ref={cardRef}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: 'easeOut' }}
      style={{
        rotateX: rotX,
        rotateY: rotY,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        willChange: 'transform',
      }}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`project-card group relative rounded-2xl border transition-all duration-400 backdrop-blur-md overflow-hidden cursor-default ${
        isClient
          ? 'bg-surface/60 hover:bg-surface/85 border-cyan-500/30 hover:border-cyan-400/70 shadow-[0_6px_32px_rgba(0,189,255,0.1)] hover:shadow-[0_18px_54px_rgba(0,189,255,0.22)]'
          : 'bg-surface/50 hover:bg-surface/80 border-white/[0.09] hover:border-cyan-500/50 shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_16px_50px_rgba(0,189,255,0.18)]'
      }`}
    >
      {/* ── Ambient Theme Glow (Harmonized Cyan & Electric Blue) ── */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-cyan-500/15 via-primary/10 to-transparent rounded-full blur-3xl pointer-events-none group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      {/* ── Cursor Spotlight Glow (Signature Electric Cyan & Blue) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(420px circle at ${glowPos.x}% ${glowPos.y}%, rgba(0, 189, 255, 0.16) 0%, rgba(59, 91, 255, 0.08) 45%, transparent 70%)`,
        }}
      />

      <div className="p-6 sm:p-8 relative z-10">
        {/* ── Top Row: Number + Status Badge + Actions ── */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-bold tracking-wider text-cyan-400">
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
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-emerald-500/40 hover:border-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-xs font-mono font-medium transition-all duration-200 cursor-pointer shadow-sm"
                aria-label={`Live demo for ${project.title}`}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Demo</span>
              </a>
            )}

            <button
              type="button"
              onClick={() => onQuickView(project)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/15 hover:border-cyan-400/50 bg-white/[0.05] hover:bg-cyan-500/[0.12] text-white/80 hover:text-cyan-200 text-xs font-mono font-medium transition-all duration-200 cursor-pointer shadow-sm"
              aria-label={`Quick view for ${project.title}`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Quick View</span>
            </button>
          </div>
        </div>

        {/* ── Two-Column Grid: Left Screenshot Viewport / Right Narrative ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Column: Modern Browser Frame with Screenshot */}
          <div className="lg:col-span-6">
            <Link
              to={`/projects/${project.slug}`}
              className="block group/mockup relative rounded-xl border border-white/10 hover:border-cyan-400/50 bg-[#0a0f18]/90 overflow-hidden transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.5)] cursor-pointer"
            >
              {/* Browser Window Header Chrome */}
              <div className="flex items-center justify-between px-3.5 py-2.5 bg-white/[0.04] border-b border-white/[0.07]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80" />
                </div>
                {/* Simulated URL Bar */}
                <div className="flex items-center gap-1 px-3 py-0.5 rounded-md bg-white/[0.05] text-[10px] font-mono text-white/45 max-w-[200px] truncate border border-white/[0.04]">
                  <Globe className="w-2.5 h-2.5 shrink-0 text-cyan-400/60" />
                  <span className="truncate">{project.liveUrl ? project.liveUrl.replace('https://', '') : `${project.slug}.internal`}</span>
                </div>
                <div className="w-6" />
              </div>

              {/* Screenshot Aspect Ratio Box */}
              <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                <img
                  src={project.image}
                  alt={`${project.title} homepage preview`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover/mockup:scale-105 filter contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover/mockup:opacity-20 transition-opacity" />
              </div>
            </Link>
          </div>

          {/* Right Column: Title, Description, Tech Stack */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <Link to={`/projects/${project.slug}`} className="block group/link cursor-pointer">
                <h3 className="font-display font-bold text-xl sm:text-2xl lg:text-3xl text-white group-hover/link:text-cyan-300 transition-colors tracking-tight leading-snug mb-3">
                  {project.title}
                </h3>
              </Link>

              <p className="text-white/65 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                {project.description}
              </p>
            </div>

            {/* Tech Badges & View Project Link */}
            <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {project.techBadges.slice(0, 4).map((badge) => (
                  <span
                    key={badge}
                    className="px-2.5 py-1 text-[10px] font-mono tracking-wider rounded-md border text-cyan-200/80 bg-cyan-500/[0.06] border-cyan-500/20"
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
                    className="p-1.5 rounded-lg text-white/50 hover:text-cyan-300 hover:bg-white/10 transition-colors"
                    aria-label={`GitHub repository for ${project.title}`}
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}

                <Link
                  to={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors group/btn cursor-pointer py-1 text-cyan-400 hover:text-cyan-200"
                >
                  <span>CASE STUDY</span>
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
      {/* Ambient background glows in cyan & blue */}
      <div className="section-glow-showcase" aria-hidden="true" />
      <div className="absolute inset-0 cyber-grid-bg opacity-50 pointer-events-none" aria-hidden="true" />
      <div className="absolute top-10 right-0 w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[140px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[140px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="text-center mb-10 md:mb-14"
        >
          <div className="section-label mx-auto mb-5">
            <Star className="w-3.5 h-3.5 text-cyan-400" />
            <span>Featured Portfolio & Engineering Works</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl mb-4">
            Shipped <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-white/50 text-sm sm:text-base max-w-xl mx-auto">
            Live client productions, scalable speech AI systems, and high-pressure hackathon solutions.
          </p>

          {/* Interactive Category Filter Tabs (No count badges) */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8">
            {FILTER_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = selectedCategory === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'text-white border border-cyan-400/50 bg-cyan-500/20 shadow-[0_0_18px_rgba(0,189,255,0.35)]'
                      : 'text-white/55 hover:text-white border border-white/[0.08] hover:border-cyan-500/30 bg-surface/40 hover:bg-surface/80'
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
        <motion.div layout className="space-y-6 sm:space-y-8">
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
        </motion.div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-14 sm:mt-16"
        >
          <motion.a
            href="https://github.com/im-umang"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full glass border border-white/[0.1] hover:border-cyan-400/40 text-white/70 hover:text-white font-semibold text-sm transition-all shadow-md hover:shadow-[0_0_25px_rgba(0,189,255,0.25)]"
          >
            <Github className="w-4 h-4" />
            <span>Explore All Code Repositories on GitHub</span>
            <ArrowUpRight className="w-4 h-4" />
          </motion.a>
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