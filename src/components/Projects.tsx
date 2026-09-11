import { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Eye, ArrowUpRight, Github, Star, ExternalLink, Sparkles, Code2, Trophy, Layers, Globe, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PROJECTS_DATA, Project, ProjectCategory } from '@/data/projectsData';
import QuickViewModal from '@/components/QuickViewModal';
import { sound } from '@/lib/sound';

/* ─────────────────────────────────────────────────────────── */
/*  STATUS BADGE HELPER                                        */
/* ─────────────────────────────────────────────────────────── */
function StatusBadge({ type, text, isClient }: { type: Project['statusType']; text: string; isClient?: boolean }) {
  if (isClient) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider text-cyan-300 bg-cyan-500/15 border border-cyan-400/40 shadow-[0_0_12px_rgba(0,189,255,0.25)]">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        CLIENT WORK • LIVE
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
/*  FILTER TABS DEFINITION (No numeric counts)                 */
/* ─────────────────────────────────────────────────────────── */
export type FilterCategory = 'all' | ProjectCategory;

const FILTER_TABS: { id: FilterCategory; label: string; icon: React.ElementType }[] = [
  { id: 'all',       label: 'All Work',         icon: Layers },
  { id: 'client',    label: 'Client Projects',  icon: Sparkles },
  { id: 'ai',        label: 'AI & Web Apps',    icon: Code2 },
  { id: 'fullstack', label: 'Full-Stack',       icon: Briefcase },
  { id: 'academic',  label: 'Academic',         icon: Trophy },
];

/* ─────────────────────────────────────────────────────────── */
/*  PROJECT CARD — 3D TILT HOVER INTERACTION (Desktop only)    */
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
  const cardRef = useRef<HTMLDivElement>(null);
  const [isInteractive, setIsInteractive] = useState(false);

  // Check if device supports hover and does not prefer reduced motion
  useEffect(() => {
    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsInteractive(hasPointer && !prefersReducedMotion);
  }, []);

  // Motion values for smooth cursor tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics returning smoothly to flat 0deg
  const springConfig = { stiffness: 280, damping: 28, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Subtle tilt: max 2.5 degrees (never jumps, layout stays strictly fixed)
  const rotateX = useTransform(smoothY, [-0.5, 0.5], ['2.5deg', '-2.5deg']);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], ['-2.5deg', '2.5deg']);

  // Specular sheen coordinates
  const sheenX = useTransform(smoothX, [-0.5, 0.5], ['0%', '100%']);
  const sheenY = useTransform(smoothY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isInteractive) return;
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    },
    [isInteractive, mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <div style={{ perspective: 1200 }} className="w-full relative">
      <motion.article
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-30px' }}
        transition={{ duration: 0.45, delay: index * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
        style={
          isInteractive
            ? {
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
                willChange: 'transform',
              }
            : undefined
        }
        className="project-card group relative rounded-2xl border border-white/[0.08] hover:border-cyan-500/40 bg-white/[0.02] hover:bg-white/[0.035] p-6 sm:p-8 transition-colors duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] cursor-default overflow-hidden"
      >
        {/* Specular Glare Highlight (cursor-following radial spotlight) */}
        {isInteractive && (
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl z-20"
            style={{
              background: `radial-gradient(circle 350px at ${sheenX} ${sheenY}, rgba(0, 189, 255, 0.08), transparent 70%)`,
            }}
          />
        )}

        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/[0.03] rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/[0.06] transition-colors duration-500" />

        <div className="relative z-10">
          {/* Top Header Row: Number + Status + Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-cyan-400">
                {project.number}
              </span>
              <StatusBadge type={project.statusType} text={project.status} isClient={isClient} />
              <span className="hidden sm:inline-block text-[11px] font-mono text-white/40 uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06]">
                {project.categoryLabel}
              </span>
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
                onClick={() => {
                  sound.playClick();
                  onQuickView(project);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium text-white/70 hover:text-white bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 transition-all cursor-pointer shadow-sm"
                aria-label={`Quick view for ${project.title}`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Quick View</span>
              </button>

              <Link
                to={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold text-cyan-300 bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/35 transition-all cursor-pointer shadow-sm"
                aria-label={`View detailed project page for ${project.title}`}
              >
                <span>View Project</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 2-Column Responsive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left: Browser Mockup Viewport */}
            <div className="lg:col-span-6">
              <Link
                to={`/projects/${project.slug}`}
                className="block group/mockup relative rounded-xl border border-white/10 hover:border-cyan-500/40 bg-[#0a0f18] overflow-hidden transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] cursor-pointer"
                aria-label={`Open case study for ${project.title}`}
              >
                <div className="flex items-center justify-between px-3.5 py-2 bg-white/[0.03] border-b border-white/[0.06]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/70" />
                  </div>
                  <div className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-white/[0.04] text-[10px] font-mono text-white/40 max-w-[200px] truncate border border-white/[0.04]">
                    <Globe className="w-2.5 h-2.5 shrink-0 text-cyan-400/50" />
                    <span className="truncate">
                      {project.liveUrl ? project.liveUrl.replace('https://', '') : `${project.slug}.internal`}
                    </span>
                  </div>
                  <div className="w-6" />
                </div>

                <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                  <img
                    src={project.image}
                    alt={`${project.title} — Actual application interface preview`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover/mockup:scale-[1.03]"
                  />
                </div>
              </Link>
            </div>

            {/* Right: Title, Narrative, Tech Badges, Case Study CTA */}
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
                    <span>View Case Study</span>
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  PROJECTS SECTION COMPONENT                                 */
/* ─────────────────────────────────────────────────────────── */
interface ProjectsProps {
  limit?: number;
}

const Projects = ({ limit }: ProjectsProps) => {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all');
  const [selectedQuickView, setSelectedQuickView] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    let list = PROJECTS_DATA;
    if (selectedCategory !== 'all') {
      // Multi-category matching (e.g. SpeakWise belongs to AI and Full-Stack)
      list = PROJECTS_DATA.filter((p) => p.categories.includes(selectedCategory));
    }
    if (limit && limit > 0) {
      return list.slice(0, limit);
    }
    return list;
  }, [selectedCategory, limit]);

  return (
    <section
      className="relative pt-20 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-6 overflow-hidden"
      id="projects"
      aria-label="Featured Projects and Engineering Works"
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
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-3 tracking-tight text-white">
            Shipped <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-white/55 text-sm sm:text-base max-w-lg mx-auto font-light leading-relaxed">
            Live client productions, speech AI platforms, full-stack systems, and academic hackathon solutions.
          </p>

          {/* Clean Category Filter Tabs — Without Numeric Counts */}
          <div
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-7"
            role="tablist"
            aria-label="Filter projects by category"
          >
            {FILTER_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = selectedCategory === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    sound.playClick();
                    setSelectedCategory(tab.id);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-white border border-cyan-400/50 bg-cyan-500/15 shadow-[0_0_14px_rgba(0,189,255,0.3)]'
                      : 'text-white/50 hover:text-white border border-white/[0.08] hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05]'
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

        {/* GitHub Repositories Link */}
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