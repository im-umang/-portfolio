import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Project } from '@/data/projectsData';

interface QuickViewModalProps {
  project: Project | null;
  onClose: () => void;
}

const QuickViewModal = ({ project, onClose }: QuickViewModalProps) => {
  const navigate = useNavigate();

  // Prevent background scroll and floating Navbar interference when modal is open
  useEffect(() => {
    if (!project) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  const handleNavigateToProject = () => {
    if (!project) return;
    onClose();
    navigate(`/projects/${project.slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getStatusBadge = () => {
    if (!project) return null;
    if (project.isClientProject) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider text-cyan-300 bg-cyan-500/15 border border-cyan-400/40 shadow-[0_0_12px_rgba(0,189,255,0.25)]">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          {project.status}
        </span>
      );
    }

    switch (project.statusType) {
      case 'working':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            {project.status}
          </span>
        );
      case 'live':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider text-emerald-400 bg-emerald-500/15 border border-emerald-400/40">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {project.status}
          </span>
        );
      case 'completed':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            {project.status}
          </span>
        );
    }
  };

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[1000] isolate flex items-center justify-center p-3 sm:p-6 overflow-hidden">
          {/* Backdrop Overlay with Soft Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          />

          {/* Floating Screen-level Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[1010] p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border border-white/20 backdrop-blur-xl shadow-2xl transition-all cursor-pointer group"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>

          {/* Transparent Frosted Glass Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-2xl max-h-[92vh] sm:max-h-[88vh] flex flex-col rounded-2xl bg-black/40 backdrop-blur-2xl border border-white/20 shadow-[0_20px_70px_rgba(0,0,0,0.6)] z-10 text-left overflow-hidden"
          >
            {/* Ambient Lighting Gradients */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* ── Stationary Sticky Header (Transparent Frosted Glass) ── */}
            <div className="shrink-0 px-5 sm:px-7 py-3.5 sm:py-4 border-b border-white/10 bg-white/[0.04] backdrop-blur-xl flex items-center justify-between gap-4 z-20">
              <div className="flex items-center gap-3">
                <span className="font-mono text-cyan-400 text-sm font-bold tracking-wider">
                  {project.number}
                </span>
                {getStatusBadge()}
              </div>

              {/* In-header Close button */}
              <button
                type="button"
                onClick={onClose}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white/70 hover:text-white bg-white/[0.08] hover:bg-white/[0.18] border border-white/15 text-xs font-mono font-medium transition-colors cursor-pointer"
                aria-label="Close modal window"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">Close</span>
              </button>
            </div>

            {/* ── Scrollable Body Content (Transparent Frosted Interior) ── */}
            <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-5 sm:py-6 space-y-6 overscroll-contain bg-transparent">
              {/* Title */}
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight leading-snug">
                {project.title}
              </h3>

              {/* Screenshot Preview in clean browser frame */}
              {project.image && (
                <div className="relative aspect-[16/9] w-full rounded-xl border border-white/12 overflow-hidden bg-black/60 shadow-lg">
                  <img
                    src={project.image}
                    alt={`${project.title} preview`}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                </div>
              )}

              {/* Description */}
              <p className="text-white/70 text-xs sm:text-sm leading-relaxed font-light">
                {project.description}
              </p>

              {/* Technologies Used */}
              <div>
                <p className="text-[11px] font-mono uppercase tracking-widest text-white/45 mb-2.5 font-semibold">
                  Technologies Used
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.techBadges.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-[11px] font-mono tracking-wider text-white/80 bg-white/[0.04] border border-white/[0.08] rounded-md"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Capabilities */}
              <div>
                <p className="text-[11px] font-mono uppercase tracking-widest text-white/45 mb-3 font-semibold">
                  Key Capabilities
                </p>
                <div className="space-y-2.5">
                  {project.features.slice(0, 4).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/80">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Stationary Sticky Footer (Transparent Frosted Glass) ── */}
            <div className="shrink-0 px-5 sm:px-8 py-3.5 sm:py-4 border-t border-white/10 bg-white/[0.04] backdrop-blur-xl flex flex-wrap items-center justify-between gap-3 z-20">
              <div className="flex items-center gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-emerald-400 bg-emerald-500/15 border border-emerald-400/30 hover:bg-emerald-500/25 transition-all shadow-sm"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Preview</span>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white/70 hover:text-white bg-white/[0.05] border border-white/10 hover:border-white/20 transition-all"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Source Code</span>
                  </a>
                )}
              </div>

              <button
                type="button"
                onClick={handleNavigateToProject}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold text-white transition-all duration-300 hover:scale-[1.02] cursor-pointer shadow-md"
                style={{ background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))' }}
              >
                <span>View Full Case Study</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default QuickViewModal;
