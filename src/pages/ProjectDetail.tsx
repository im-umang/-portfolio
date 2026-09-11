import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, Github, CheckCircle2, Sparkles, Layers, ShieldCheck } from 'lucide-react';
import { PROJECTS_DATA, Project } from '@/data/projectsData';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';
import ParticleCanvas from '@/components/ParticleCanvas';
import SEO from '@/components/SEO';

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [nextProject, setNextProject] = useState<Project | null>(null);
  const [prevProject, setPrevProject] = useState<Project | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    const currentIndex = PROJECTS_DATA.findIndex((p) => p.slug === slug);
    if (currentIndex !== -1) {
      setProject(PROJECTS_DATA[currentIndex]);
      const nextIndex = (currentIndex + 1) % PROJECTS_DATA.length;
      const prevIndex = (currentIndex - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length;
      setNextProject(PROJECTS_DATA[nextIndex]);
      setPrevProject(PROJECTS_DATA[prevIndex]);
    } else {
      navigate('/projects');
    }
  }, [slug, navigate]);

  if (!project) return null;

  const getStatusDisplay = () => {
    if (project.isClientProject) {
      return (
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider text-cyan-300 bg-cyan-500/15 border border-cyan-400/40 shadow-[0_0_15px_rgba(0,189,255,0.3)]">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          CLIENT WORK • LIVE
        </span>
      );
    }

    switch (project.statusType) {
      case 'working':
        return (
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide text-blue-300 bg-blue-500/10 border border-blue-400/30">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            Currently In Development
          </span>
        );
      case 'live':
        return (
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wide text-emerald-400 bg-emerald-500/15 border border-emerald-400/40 shadow-[0_0_12px_rgba(16,185,129,0.25)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Live Production
          </span>
        );
      case 'completed':
      default:
        return (
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide text-cyan-300 bg-cyan-500/10 border border-cyan-400/25">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            {project.status}
          </span>
        );
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <SEO
        title={`${project.title} — Case Study & Project Details`}
        description={project.description}
        canonical={`/projects/${project.slug}`}
        ogImage={project.image}
      />

      <CustomCursor />
      <ScrollProgress />

      {/* Atmospheric Background Layers */}
      <div className="noise-bg" aria-hidden="true" />
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 cyber-grid-bg opacity-75" />
        <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] rounded-full blur-[140px] opacity-20 bg-[radial-gradient(circle,hsl(var(--secondary)),transparent_70%)]" />
        <div className="absolute top-1/3 -right-32 w-[650px] h-[650px] rounded-full blur-[160px] opacity-20 bg-[radial-gradient(circle,hsl(var(--primary)),transparent_70%)]" />
        <div className="absolute bottom-20 left-1/3 w-[550px] h-[550px] rounded-full blur-[150px] opacity-15 bg-[radial-gradient(circle,hsl(var(--accent)),transparent_70%)]" />
      </div>
      <ParticleCanvas />

      {/* Navbar */}
      <Navbar activeSection="projects" />

      <main className="relative z-10 pt-28 sm:pt-36 pb-20 px-4 sm:px-6 max-w-5xl mx-auto">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 flex items-center justify-between"
        >
          <button
            onClick={() => navigate('/projects')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono tracking-wider uppercase text-white/50 hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Projects</span>
          </button>

          <span className="font-mono text-xs text-white/35">
            {project.number} / {String(PROJECTS_DATA.length).padStart(2, '0')}
          </span>
        </motion.div>

        {/* Project Meta Badges */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center gap-3 mb-5"
        >
          <span className="text-cyan-400 font-mono text-xs sm:text-sm font-bold tracking-widest uppercase bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-400/25">
            PROJECT {project.number}
          </span>
          <span className="text-white/60 font-mono text-xs uppercase tracking-wider px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
            {project.categoryLabel}
          </span>
          {getStatusDisplay()}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] text-white leading-[1.2] tracking-tight mb-5 max-w-4xl"
        >
          {project.title}
        </motion.h1>

        {/* Subtitle / Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="text-white/70 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mb-10 font-light"
        >
          {project.tagline || project.description}
        </motion.p>

        {/* Status & Tech Meta Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25 }}
          className="rounded-2xl border border-white/10 bg-surface/70 backdrop-blur-md p-6 sm:p-7 max-w-2xl mb-12 shadow-xl"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-[11px] font-mono text-white/40 tracking-wider uppercase mb-2">
                PROJECT CLASSIFICATION
              </p>
              <p className="text-sm font-medium text-white/90">
                {project.categoryLabel}
              </p>
            </div>

            <div>
              <p className="text-[11px] font-mono text-white/40 tracking-wider uppercase mb-2">
                CORE STACK
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 text-xs font-mono text-white/80 bg-white/[0.04] border border-white/10 rounded-md"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Links */}
          {(project.liveUrl || project.githubUrl) && (
            <div className="flex flex-wrap items-center gap-3 pt-5 mt-5 border-t border-white/10">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 hover:bg-emerald-500/25 transition-all shadow-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Production Demo</span>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white/70 hover:text-white bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all"
                >
                  <Github className="w-4 h-4" />
                  <span>View Repository</span>
                </a>
              )}
            </div>
          )}
        </motion.div>

        {/* ── Large Prominent Actual Project Screenshot ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16 rounded-2xl border border-white/15 overflow-hidden bg-[#080d1a] shadow-[0_16px_50px_rgba(0,0,0,0.7)]"
        >
          {/* Browser Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-white/[0.04] border-b border-white/[0.08]">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]/80" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]/80" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]/80" />
            </div>
            <div className="px-4 py-1 rounded-md bg-white/[0.05] text-xs font-mono text-white/50 border border-white/[0.05] truncate max-w-[280px]">
              {project.liveUrl || `https://${project.slug}.internal`}
            </div>
            <div className="w-12 text-right">
              <span className="text-[10px] font-mono text-emerald-400 font-semibold uppercase">SSL Secure</span>
            </div>
          </div>

          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-black/60">
            <img
              src={project.image}
              alt={`${project.title} live interface preview`}
              className="w-full h-full object-cover object-top filter contrast-105"
              loading="lazy"
              decoding="async"
            />
          </div>
        </motion.div>

        {/* ── Overview Section ── */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-14"
        >
          <div className="flex items-center gap-2 mb-2 text-cyan-400 font-mono text-xs uppercase tracking-widest">
            <Layers className="w-4 h-4" />
            <span>01 / Executive Overview</span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-2">
            Project Overview
          </h2>
          <div className="w-12 h-1 bg-cyan-500/80 rounded-full mb-6" />
          <p className="text-white/75 text-base sm:text-lg leading-relaxed max-w-3xl font-light">
            {project.overview}
          </p>
        </motion.section>

        {/* ── The Problem / Purpose Section ── */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-14"
        >
          <div className="flex items-center gap-2 mb-2 text-cyan-400 font-mono text-xs uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" />
            <span>02 / The Challenge</span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-2">
            The Problem & Purpose
          </h2>
          <div className="w-12 h-1 bg-cyan-500/80 rounded-full mb-6" />
          <p className="text-white/75 text-base sm:text-lg leading-relaxed max-w-3xl font-light">
            {project.problem}
          </p>
        </motion.section>

        {/* ── The Solution Section ── */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-14"
        >
          <div className="flex items-center gap-2 mb-2 text-cyan-400 font-mono text-xs uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            <span>03 / Engineering Execution</span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-2">
            The Solution & Architecture
          </h2>
          <div className="w-12 h-1 bg-cyan-500/80 rounded-full mb-6" />
          <p className="text-white/75 text-base sm:text-lg leading-relaxed max-w-3xl font-light">
            {project.solution}
          </p>
        </motion.section>

        {/* ── Key Features Section ── */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 mb-2 text-cyan-400 font-mono text-xs uppercase tracking-widest">
            <CheckCircle2 className="w-4 h-4" />
            <span>04 / Capabilities</span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-2">
            Key Features & System Capabilities
          </h2>
          <div className="w-12 h-1 bg-cyan-500/80 rounded-full mb-6" />

          <div className="border-t border-white/10 divide-y divide-white/10 max-w-3xl">
            {project.features.map((feature, idx) => (
              <div
                key={idx}
                className="py-4 sm:py-5 flex items-start gap-5 group hover:bg-white/[0.02] px-3 -mx-3 rounded-lg transition-colors"
              >
                <span className="font-mono text-cyan-400/90 text-sm font-semibold tracking-wider flex-shrink-0 mt-0.5">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="text-white/80 group-hover:text-white text-base font-medium transition-colors">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── Technology Stack Breakdown ── */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-20"
        >
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-2">
            Technology Stack
          </h2>
          <div className="w-12 h-1 bg-cyan-500/80 rounded-full mb-6" />
          <div className="flex flex-wrap gap-2.5 max-w-3xl">
            {project.techBadges.map((badge) => (
              <span
                key={badge}
                className="px-3.5 py-1.5 text-xs font-mono tracking-wider rounded-lg text-white/80 bg-white/[0.03] border border-white/[0.08]"
              >
                {badge}
              </span>
            ))}
          </div>
        </motion.section>

        {/* ── Project Navigation (Previous / Next) ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="pt-12 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          {prevProject && (
            <Link
              to={`/projects/${prevProject.slug}`}
              className="flex items-center gap-3 group cursor-pointer text-left"
            >
              <ArrowLeft className="w-5 h-5 text-white/50 group-hover:text-white group-hover:-translate-x-1.5 transition-all" />
              <div>
                <p className="text-[10px] font-mono tracking-widest uppercase text-white/40">
                  PREVIOUS
                </p>
                <p className="font-display font-bold text-base sm:text-lg text-white group-hover:text-cyan-400 transition-colors">
                  {prevProject.title.split('—')[0].trim()}
                </p>
              </div>
            </Link>
          )}

          {nextProject && (
            <Link
              to={`/projects/${nextProject.slug}`}
              className="flex items-center gap-3 group cursor-pointer text-right ml-auto"
            >
              <div>
                <p className="text-[10px] font-mono tracking-widest uppercase text-white/40">
                  NEXT PROJECT
                </p>
                <p className="font-display font-bold text-base sm:text-lg text-white group-hover:text-cyan-400 transition-colors">
                  {nextProject.title.split('—')[0].trim()}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-white/50 group-hover:text-white group-hover:translate-x-1.5 transition-all" />
            </Link>
          )}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
