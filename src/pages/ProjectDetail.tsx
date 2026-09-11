import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, Github } from 'lucide-react';
import { PROJECTS_DATA, Project } from '@/data/projectsData';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';
import ParticleCanvas from '@/components/ParticleCanvas';

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [nextProject, setNextProject] = useState<Project | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    const currentIndex = PROJECTS_DATA.findIndex((p) => p.slug === slug);
    if (currentIndex !== -1) {
      setProject(PROJECTS_DATA[currentIndex]);
      const nextIndex = (currentIndex + 1) % PROJECTS_DATA.length;
      setNextProject(PROJECTS_DATA[nextIndex]);
      document.title = `${PROJECTS_DATA[currentIndex].title} — Umang Trivedi`;
    } else {
      navigate('/projects');
    }
  }, [slug, navigate]);

  if (!project) return null;

  const getStatusDisplay = () => {
    switch (project.statusType) {
      case 'working':
        return (
          <span className="inline-flex items-center gap-2 text-cyan-300 font-medium text-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Currently In Development
          </span>
        );
      case 'live':
        return (
          <span className="inline-flex items-center gap-2 text-emerald-400 font-medium text-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Live
          </span>
        );
      case 'completed':
      default:
        return (
          <span className="inline-flex items-center gap-2 text-cyan-400 font-medium text-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            Completed
          </span>
        );
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <CustomCursor />
      <ScrollProgress />

      {/* Global Atmospheric Background */}
      <div className="noise-bg" aria-hidden="true" />
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 cyber-grid-bg opacity-75" />
        <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] rounded-full blur-[140px] opacity-20 bg-[radial-gradient(circle,hsl(160,80%,45%),transparent_70%)]" />
        <div className="absolute top-1/3 -right-32 w-[650px] h-[650px] rounded-full blur-[160px] opacity-25 bg-[radial-gradient(circle,hsl(38,95%,50%),transparent_70%)]" />
        <div className="absolute bottom-20 left-1/3 w-[550px] h-[550px] rounded-full blur-[150px] opacity-15 bg-[radial-gradient(circle,hsl(var(--primary)),transparent_70%)]" />
      </div>
      <ParticleCanvas />

      {/* Site Navbar */}
      <Navbar
        activeSection="projects"
        onSelectSection={(id) => {
          navigate(id === 'home' || id === 'all' ? '/' : `/#${id}`);
        }}
      />

      <main className="relative z-10 pt-28 sm:pt-36 pb-20 px-4 sm:px-6 max-w-5xl mx-auto">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <button
            onClick={() => navigate('/projects')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono tracking-wider uppercase text-white/50 hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>ALL PROJECTS</span>
          </button>
        </motion.div>

        {/* Project Tag */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-4"
        >
          <span className="text-cyan-400 font-mono text-xs sm:text-sm font-semibold tracking-widest uppercase">
            PROJECT {project.number}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[3.75rem] text-white leading-[1.15] tracking-tight mb-6 max-w-4xl"
        >
          {project.title}
        </motion.h1>

        {/* Subtitle / Short description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="text-white/70 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mb-10 font-light"
        >
          {project.description}
        </motion.p>

        {/* Status & Tech Meta Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25 }}
          className="rounded-xl border border-white/10 bg-surface/70 backdrop-blur-md p-6 sm:p-7 max-w-xl mb-16 shadow-lg"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-[11px] font-mono text-white/40 tracking-wider uppercase mb-2">
                STATUS
              </p>
              <div>{getStatusDisplay()}</div>
            </div>

            <div>
              <p className="text-[11px] font-mono text-white/40 tracking-wider uppercase mb-2">
                STACK
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 text-xs font-mono text-white/80 bg-white/[0.04] border border-white/10 rounded-md"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Links if available */}
          {(project.liveUrl || project.githubUrl) && (
            <div className="flex items-center gap-3 pt-5 mt-5 border-t border-white/10">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all"
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
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white/60 hover:text-white bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Source Code</span>
                </a>
              )}
            </div>
          )}
        </motion.div>

        {/* ── Project Screenshot Showcase ── */}
        {project.image && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-16 rounded-2xl border border-white/15 overflow-hidden bg-[#080d1a] shadow-[0_12px_45px_rgba(0,0,0,0.6)]"
          >
            {/* Browser Header Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-white/[0.04] border-b border-white/[0.08]">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]/80" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]/80" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f]/80" />
              </div>
              <div className="px-4 py-1 rounded-md bg-white/[0.05] text-xs font-mono text-white/50 border border-white/[0.05]">
                {project.liveUrl || `https://${project.slug}.internal`}
              </div>
              <div className="w-12" />
            </div>

            <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/60">
              <img
                src={project.image}
                alt={`${project.title} live interface preview`}
                className="w-full h-full object-cover object-top filter contrast-105"
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>
        )}

        {/* ── Section: Overview ── */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-14"
        >
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-2">
            Overview
          </h2>
          <div className="w-12 h-1 bg-cyan-500/80 rounded-full mb-6" />
          <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-3xl font-light">
            {project.overview}
          </p>
        </motion.section>

        {/* ── Section: The Problem ── */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-14"
        >
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-2">
            The Problem
          </h2>
          <div className="w-12 h-1 bg-cyan-500/80 rounded-full mb-6" />
          <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-3xl font-light">
            {project.problem}
          </p>
        </motion.section>

        {/* ── Section: The Approach ── */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-16"
        >
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-2">
            The Approach
          </h2>
          <div className="w-12 h-1 bg-cyan-500/80 rounded-full mb-6" />
          <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-3xl font-light">
            {project.approach}
          </p>
        </motion.section>

        {/* ── Section: Features ── */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-24"
        >
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-2">
            Features
          </h2>
          <div className="w-12 h-1 bg-cyan-500/80 rounded-full mb-6" />

          <div className="border-t border-white/10 divide-y divide-white/10 max-w-3xl">
            {project.features.map((feature, idx) => (
              <div
                key={idx}
                className="py-4 sm:py-5 flex items-center gap-6 group hover:bg-white/[0.02] px-3 -mx-3 rounded-lg transition-colors"
              >
                <span className="font-mono text-cyan-400/90 text-sm font-semibold tracking-wider flex-shrink-0">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="text-white/80 group-hover:text-white text-base sm:text-lg font-medium transition-colors">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── Next Project Footer Navigation ── */}
        {nextProject && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="pt-12 border-t border-white/10"
          >
            <p className="text-[11px] font-mono tracking-widest uppercase text-white/40 mb-3">
              NEXT PROJECT
            </p>
            <Link
              to={`/projects/${nextProject.slug}`}
              className="inline-flex items-center gap-4 group cursor-pointer"
            >
              <span className="font-mono text-white/40 text-lg sm:text-xl font-medium">
                {nextProject.number}
              </span>
              <span className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-white group-hover:text-primary transition-colors">
                {nextProject.title.split('—')[0].trim()}
              </span>
              <ArrowRight className="w-6 h-6 text-white/50 group-hover:text-white group-hover:translate-x-2 transition-all duration-300" />
            </Link>
          </motion.div>
        )}
      </main>

      {/* Site Footer */}
      <Footer
        onSelectSection={(id) => {
          navigate(id === 'home' || id === 'all' ? '/' : `/#${id}`);
        }}
      />
    </div>
  );
};

export default ProjectDetail;
