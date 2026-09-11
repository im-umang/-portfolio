import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowUpRight, 
  Sparkles, 
  ExternalLink, 
  ShieldCheck, 
  Cpu, 
  Database, 
  Quote, 
  Code2, 
  Star, 
  Trophy, 
  Layers, 
  Radio, 
  Clock, 
  CheckCircle2 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';
import ParticleCanvas from '@/components/ParticleCanvas';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { PROJECTS_DATA, Project } from '@/data/projectsData';
import { sound } from '@/lib/sound';

/* ───────────────────────────────────────────────────────────── */
/*  DATA CONFIGURATION                                           */
/* ───────────────────────────────────────────────────────────── */

// 1. "I BUILD" Interactive Categories
const I_BUILD_ITEMS = [
  {
    id: 'ai-products',
    label: 'AI PRODUCTS',
    tagline: 'Acoustic scoring engines & conversational voice models',
    connectedProjectTitle: 'SpeakWise (Speech AI)',
    connectedProjectSlug: '/projects/speakwise',
    accentColor: 'text-cyan-400',
    borderHover: 'hover:border-cyan-400/50',
    glowHover: 'hover:shadow-[0_0_24px_rgba(0,189,255,0.2)]',
    icon: Sparkles,
  },
  {
    id: 'web-apps',
    label: 'WEB APPLICATIONS',
    tagline: 'Reactive component architectures, REST APIs & data stores',
    connectedProjectTitle: 'POS & Billing System',
    connectedProjectSlug: '/projects/pos-system',
    accentColor: 'text-emerald-400',
    borderHover: 'hover:border-emerald-400/50',
    glowHover: 'hover:shadow-[0_0_24px_rgba(16,185,129,0.2)]',
    icon: Code2,
  },
  {
    id: 'client-systems',
    label: 'CLIENT SYSTEMS',
    tagline: 'High-converting bespoke portfolios & enterprise websites',
    connectedProjectTitle: 'Valand Radhika Portfolio',
    connectedProjectSlug: '/projects/radhika-portfolio',
    accentColor: 'text-amber-400',
    borderHover: 'hover:border-amber-400/50',
    glowHover: 'hover:shadow-[0_0_24px_rgba(251,191,36,0.2)]',
    icon: Star,
  },
  {
    id: 'digital-experiences',
    label: 'DIGITAL EXPERIENCES',
    tagline: 'Hackathon-winning systems, telemetry monitoring & IoT',
    connectedProjectTitle: 'GearGuard (1st Place Winner)',
    connectedProjectSlug: '/projects/gearguard',
    accentColor: 'text-purple-400',
    borderHover: 'hover:border-purple-400/50',
    glowHover: 'hover:shadow-[0_0_24px_rgba(168,85,247,0.2)]',
    icon: Trophy,
  },
];

// 2. Top 3 Flagship Projects for Selected Work
const SELECTED_PROJECTS = PROJECTS_DATA.filter((p) =>
  ['radhika-portfolio', 'speakwise', 'gearguard'].includes(p.slug)
).sort((a, b) => {
  const order = ['radhika-portfolio', 'speakwise', 'gearguard'];
  return order.indexOf(a.slug) - order.indexOf(b.slug);
});

// 3. Built For Real-World Use
const REAL_WORLD_CAPABILITIES = [
  {
    icon: Star,
    title: 'CLIENT PROJECTS',
    desc: 'Bespoke production web applications engineered for real stakeholders with 98+ Lighthouse scores and sub-second load times.',
    proofTag: 'VALAND RADHIKA • LIVE CLIENT',
    link: '/projects/radhika-portfolio',
  },
  {
    icon: Cpu,
    title: 'AI APPLICATIONS',
    desc: 'Real-time acoustic analysis, browser Web Audio API streams, speech phoneme scoring, and conversational travel agents.',
    proofTag: 'SPEAKWISE • PRODUCTION AI',
    link: '/projects/speakwise',
  },
  {
    icon: Database,
    title: 'FULL-STACK SYSTEMS',
    desc: 'Relational & document database schemas, RESTful API microservices, retail transaction ledgers, and secure state flows.',
    proofTag: 'POS SYSTEM & VCS ERP',
    link: '/projects/pos-system',
  },
  {
    icon: Layers,
    title: 'PRODUCTION EXPERIENCES',
    desc: 'Component reusability, hardware-accelerated transitions, Agile sprint hygiene, and automated edge deployments on Vercel.',
    proofTag: 'OCTANET & VERCEL EDGE',
    link: '/experience',
  },
];

// 4. Currently Building Real Project
const CURRENTLY_BUILDING = PROJECTS_DATA.find((p) => p.slug === 'travel-chatbot');

// 5. Verifiable Trust & Proof Metrics
const PROOF_METRICS = [
  { value: '1', label: 'CLIENT WEBSITE', detail: 'Valand Radhika Production' },
  { value: '6+', label: 'LIVE SYSTEMS', detail: 'MERN, React & Python Apps' },
  { value: '1st', label: 'HACKATHON WIN', detail: 'Odoo Combat 2026 Champion' },
  { value: '2+', label: 'YEARS CODING', detail: 'Development & Instruction' },
  { value: '9.48', label: 'MCA SPI', detail: 'LJ University Academic Rank' },
];

const Index = () => {
  const navigate = useNavigate();

  // Desktop check for cursor-following preview
  const [isDesktop, setIsDesktop] = useState(false);
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsDesktop(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  }, []);

  // Redirect legacy hash links
  useEffect(() => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    const HASH_MAP: Record<string, string> = {
      projects: '/projects',
      stack: '/stack',
      experience: '/experience',
      education: '/education',
      achievements: '/awards',
      awards: '/awards',
      reviews: '/reviews',
      testimonials: '/reviews',
      contact: '/contact',
    };
    if (HASH_MAP[hash]) {
      navigate(HASH_MAP[hash], { replace: true });
    }
  }, [navigate]);

  // Cursor following tracking handler
  const handleLinkMouseMove = useCallback((e: React.MouseEvent, project: Project) => {
    if (!isDesktop) return;
    setPreviewProject(project);
    setCursorPos({ x: e.clientX, y: e.clientY });
  }, [isDesktop]);

  const handleLinkMouseLeave = useCallback(() => {
    setPreviewProject(null);
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <SEO
        title="Umang Trivedi — Full-Stack Developer • React • Node.js • Ahmedabad"
        description="Umang Trivedi — Full-Stack Developer & Software Architect from Ahmedabad, India. Building scalable web applications, speech AI systems, and client platforms with React, Node.js, and MongoDB."
        canonical="/"
      />

      <CustomCursor />
      <ScrollProgress />

      {/* Atmospheric Background Layers */}
      <div className="noise-bg" aria-hidden="true" />
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 cyber-grid-bg opacity-75" />
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-[140px] opacity-25 bg-[radial-gradient(circle,hsl(var(--primary)),transparent_70%)]" />
        <div className="absolute top-1/3 -right-32 w-[650px] h-[650px] rounded-full blur-[160px] opacity-20 bg-[radial-gradient(circle,hsl(var(--secondary)),transparent_70%)]" />
        <div className="absolute bottom-20 left-1/4 w-[550px] h-[550px] rounded-full blur-[150px] opacity-15 bg-[radial-gradient(circle,hsl(var(--accent)),transparent_70%)]" />
      </div>
      <ParticleCanvas />

      {/* Global Navbar */}
      <Navbar activeSection="home" />

      {/* ── Desktop Floating Project Preview (Follows Cursor on "VIEW CASE STUDY →") ── */}
      <AnimatePresence>
        {isDesktop && previewProject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 8 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              x: Math.min(cursorPos.x + 20, window.innerWidth - 240), 
              y: Math.max(cursorPos.y - 120, 20) 
            }}
            exit={{ opacity: 0, scale: 0.88, transition: { duration: 0.15 } }}
            transition={{ type: 'spring', stiffness: 450, damping: 32, mass: 0.4 }}
            className="fixed top-0 left-0 pointer-events-none z-[99999] w-52 sm:w-56 rounded-xl border border-cyan-400/50 bg-[#070e1c]/95 p-2 shadow-[0_16px_40px_rgba(0,189,255,0.35)] backdrop-blur-xl overflow-hidden hidden sm:block"
          >
            <div className="relative aspect-[16/10] rounded-lg overflow-hidden border border-white/15 mb-2 bg-black/50">
              <img
                src={previewProject.image}
                alt={previewProject.title}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="px-1 flex items-center justify-between gap-1">
              <p className="text-[11px] font-mono text-cyan-300 font-bold truncate">
                {previewProject.title}
              </p>
              <span className="text-[9px] font-mono text-white/60 px-1.5 py-0.5 rounded bg-white/10 shrink-0">
                {previewProject.number}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main id="main-content" className="relative z-10">
        {/* ═══════════════════════════════════════════════════════ */}
        {/* 1 · HERO: WHO IS UMANG?                                */}
        {/* ═══════════════════════════════════════════════════════ */}
        <Hero />

        {/* ═══════════════════════════════════════════════════════ */}
        {/* 2 · INTERACTIVE "I BUILD" SECTION                     */}
        {/* ═══════════════════════════════════════════════════════ */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 relative border-t border-white/[0.06]" aria-label="What Umang Builds">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8 sm:mb-10">
              <div className="section-label mx-auto mb-2">
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>WHAT I CREATE</span>
              </div>
              <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-white tracking-tight">
                I <span className="text-gradient">Build</span>
              </h2>
              <p className="text-white/50 text-xs sm:text-sm font-light mt-1 max-w-md mx-auto">
                Explore core creation domains with connected production systems.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {I_BUILD_ITEMS.map((item, idx) => {
                const ItemIcon = item.icon;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: idx * 0.08 }}
                    onClick={() => {
                      sound.playClick();
                      navigate(item.connectedProjectSlug);
                    }}
                    className={`group relative rounded-2xl border border-white/[0.08] ${item.borderHover} bg-white/[0.02] hover:bg-white/[0.05] p-5 transition-all duration-300 cursor-pointer flex flex-col justify-between ${item.glowHover}`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className={`p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] ${item.accentColor} transition-transform duration-300 group-hover:scale-110`}>
                          <ItemIcon className="w-4 h-4" />
                        </div>
                        <ArrowUpRight className="w-3.5 h-3.5 text-white/30 group-hover:text-cyan-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </div>

                      <h3 className="font-display font-bold text-sm sm:text-base text-white group-hover:text-cyan-300 transition-colors tracking-tight mb-1">
                        {item.label}
                      </h3>
                      <p className="text-white/50 text-xs leading-relaxed font-light mb-4">
                        {item.tagline}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/[0.06] flex items-center gap-1.5 text-[11px] font-mono text-cyan-400/80 group-hover:text-cyan-300 transition-colors">
                      <span className="truncate">Reveals: {item.connectedProjectTitle}</span>
                      <ArrowRight className="w-3 h-3 shrink-0 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* 3 · SELECTED WORK: 3 STRONGEST PROJECTS WITH PREVIEW  */}
        {/* ═══════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 relative border-t border-white/[0.06]" aria-label="Selected Work">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-14">
              <div>
                <div className="section-label mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>SHOW ME HIS WORK</span>
                </div>
                <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight text-white">
                  Selected <span className="text-gradient">Work</span>
                </h2>
                <p className="text-white/50 text-xs sm:text-sm font-light mt-1">
                  3 flagship systems representing client delivery, AI architectures, and hackathon honors.
                </p>
              </div>

              <Link
                to="/projects"
                onClick={() => sound.playClick()}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group"
              >
                <span>EXPLORE ALL PROJECTS</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Selected Projects Stack */}
            <div className="space-y-10 sm:space-y-12">
              {SELECTED_PROJECTS.map((project, idx) => (
                <motion.article
                  key={project.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: idx * 0.1 }}
                  className="group relative rounded-2xl sm:rounded-3xl border border-white/[0.09] hover:border-cyan-500/40 bg-white/[0.02] hover:bg-[#081020]/80 p-6 sm:p-8 md:p-10 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.45)] hover:shadow-[0_12px_45px_rgba(0,189,255,0.1)] overflow-hidden"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                    {/* Left: Mockup Frame with Actual Screenshot */}
                    <div className="lg:col-span-6">
                      <Link
                        to={`/projects/${project.slug}`}
                        onClick={() => sound.playClick()}
                        onMouseMove={(e) => handleLinkMouseMove(e, project)}
                        onMouseLeave={handleLinkMouseLeave}
                        className="block group/mockup relative rounded-2xl border border-white/15 hover:border-cyan-400/50 bg-[#070d18] overflow-hidden transition-all duration-300 shadow-xl"
                      >
                        {/* Browser Top Window Bar */}
                        <div className="flex items-center justify-between px-3.5 py-2.5 bg-white/[0.04] border-b border-white/[0.08]">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80" />
                          </div>
                          <span className="text-[10px] font-mono text-white/40 truncate max-w-[200px]">
                            {project.liveUrl ? project.liveUrl.replace('https://', '').replace('/', '') : `${project.slug}.internal`}
                          </span>
                          <span className="text-[10px] font-mono text-cyan-400/70 font-semibold">{project.number}</span>
                        </div>

                        {/* Actual Project Screenshot */}
                        <div className="relative aspect-[16/10] overflow-hidden bg-black/50">
                          <img
                            src={project.image}
                            alt={`${project.title} screenshot`}
                            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover/mockup:scale-[1.04]"
                            loading="lazy"
                          />
                        </div>
                      </Link>
                    </div>

                    {/* Right: Narrative, Tech Stack & Action Links */}
                    <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-5">
                      <div>
                        {/* Top Meta: Number + Status Badge */}
                        <div className="flex items-center gap-2.5 mb-3">
                          <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-400/20">
                            PROJECT {project.number}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider text-cyan-300 bg-cyan-500/15 border border-cyan-400/30">
                            {project.status}
                          </span>
                        </div>

                        {/* Title */}
                        <Link 
                          to={`/projects/${project.slug}`}
                          onClick={() => sound.playClick()}
                          onMouseMove={(e) => handleLinkMouseMove(e, project)}
                          onMouseLeave={handleLinkMouseLeave}
                        >
                          <h3 className="font-display font-bold text-xl sm:text-2xl text-white hover:text-cyan-300 transition-colors tracking-tight mb-3">
                            {project.title}
                          </h3>
                        </Link>

                        {/* Short Description */}
                        <p className="text-white/65 text-xs sm:text-sm leading-relaxed font-light">
                          {project.description}
                        </p>
                      </div>

                      {/* Tech Stack Badges */}
                      <div>
                        <p className="text-[10px] font-mono uppercase text-white/40 mb-2 tracking-wider">
                          Core Architecture:
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {project.techBadges.slice(0, 4).map((badge) => (
                            <span
                              key={badge}
                              className="px-2.5 py-1 text-[10px] font-mono text-white/70 bg-white/[0.04] border border-white/[0.08] rounded-md"
                            >
                              {badge}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Bar with Floating Cursor Trigger */}
                      <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => sound.playClick()}
                              className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>Live Preview</span>
                            </a>
                          )}
                        </div>

                        {/* VIEW CASE STUDY button with Cursor Preview */}
                        <Link
                          to={`/projects/${project.slug}`}
                          onClick={() => sound.playClick()}
                          onMouseMove={(e) => handleLinkMouseMove(e, project)}
                          onMouseLeave={handleLinkMouseLeave}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold text-cyan-300 bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/40 hover:border-cyan-400 transition-all shadow-[0_0_15px_rgba(0,189,255,0.15)] group/btn cursor-pointer"
                        >
                          <span>VIEW CASE STUDY</span>
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* 4 · REAL-WORLD WORK: BUILT FOR REAL-WORLD USE          */}
        {/* ═══════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 relative border-t border-white/[0.06]" aria-label="Built For Real-World Use">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10 sm:mb-12">
              <div className="section-label mx-auto mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>SUPPORTED BY ACTIVE CODE</span>
              </div>
              <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl tracking-tight text-white mb-2">
                Built For <span className="text-gradient">Real-World Use</span>
              </h2>
              <p className="text-white/50 text-xs sm:text-sm max-w-lg mx-auto font-light leading-relaxed">
                Engineering foundations focused on sub-second latency, structured databases, and authentic user workflows.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {REAL_WORLD_CAPABILITIES.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: idx * 0.08 }}
                    onClick={() => {
                      sound.playClick();
                      navigate(item.link);
                    }}
                    className="rounded-2xl border border-white/[0.08] hover:border-cyan-500/35 bg-white/[0.02] hover:bg-white/[0.04] p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-[0_4px_20px_rgba(0,189,255,0.08)]"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-400/25 text-cyan-400 group-hover:scale-110 transition-transform">
                          <Icon className="w-5 h-5" />
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-cyan-300 transition-colors" />
                      </div>
                      <h3 className="font-display font-bold text-sm sm:text-base text-white mb-2 tracking-tight group-hover:text-cyan-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-white/55 text-xs leading-relaxed font-light mb-4">
                        {item.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/[0.06]">
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold text-cyan-300/90 tracking-wider">
                        ✦ {item.proofTag}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* 5 · CLIENT / REVIEW HIGHLIGHT: RADHIKA VALAND          */}
        {/* ═══════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 relative border-t border-white/[0.06]" aria-label="Client Endorsement">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="relative rounded-2xl sm:rounded-3xl border border-cyan-500/35 bg-gradient-to-br from-[#081326] via-[#050c18] to-black/60 p-7 sm:p-10 md:p-12 shadow-[0_12px_45px_rgba(0,189,255,0.12)] overflow-hidden"
            >
              {/* Top ambient glow */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Decorative Quote Icon */}
              <div className="absolute top-6 right-6 sm:top-8 sm:right-8 opacity-15">
                <Quote className="w-20 h-20 sm:w-28 sm:h-28 text-cyan-400 rotate-180" />
              </div>

              <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider text-cyan-300 bg-cyan-500/15 border border-cyan-400/30">
                      GENUINE CLIENT TESTIMONIAL
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono text-emerald-300 bg-emerald-500/10 border border-emerald-400/30">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      Live Production Client
                    </span>
                  </div>

                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                <blockquote className="text-base sm:text-xl md:text-2xl text-white font-light leading-relaxed mb-8 italic">
                  "Umang turned my vision into an elegant, high-performance portfolio website. He paid incredible attention to modern aesthetics, mobile responsiveness, and booking flows. Communication was prompt throughout, and he delivered ahead of schedule."
                </blockquote>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-cyan-500 flex items-center justify-center font-display font-bold text-white text-base shadow-md ring-2 ring-cyan-400/30">
                      RV
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-white text-base sm:text-lg tracking-tight">Radhika Valand</h4>
                      <p className="text-xs text-white/50 font-mono">Founder & Lead Stylist • <span className="text-white/70">Radhika Studio</span></p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      to="/projects/radhika-portfolio"
                      onClick={() => sound.playClick()}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <span>View Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                    <span className="text-white/20">•</span>
                    <Link
                      to="/reviews"
                      onClick={() => sound.playClick()}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold text-white bg-white/[0.05] hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400/40 transition-all cursor-pointer"
                    >
                      <span>READ ALL REVIEWS</span>
                      <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* 6 · CURRENTLY BUILDING: ACTIVE ALPHA PIPELINE          */}
        {/* ═══════════════════════════════════════════════════════ */}
        {CURRENTLY_BUILDING && (
          <section className="py-14 sm:py-18 px-4 sm:px-6 relative border-t border-white/[0.06]" aria-label="Currently Building">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl sm:rounded-3xl border border-emerald-500/35 bg-[#05111b]/80 p-6 sm:p-8 backdrop-blur-md relative overflow-hidden shadow-[0_4px_30px_rgba(16,185,129,0.08)]"
              >
                <div className="absolute top-0 right-0 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    {/* Live Indicator */}
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                      </span>
                      <span className="text-xs font-mono font-bold tracking-wider text-emerald-400 uppercase">
                        CURRENTLY BUILDING
                      </span>
                      <span className="text-[10px] font-mono text-white/40 px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/10">
                        ACTIVE IN PROGRESS
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight mb-2">
                      {CURRENTLY_BUILDING.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-white/60 text-xs sm:text-sm font-light leading-relaxed max-w-xl mb-4">
                      Developing a voice-first conversational AI travel planner integrating real-time speech recognition with dynamic multi-city itinerary generation.
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {CURRENTLY_BUILDING.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 text-[10px] font-mono text-white/70 bg-white/[0.04] border border-white/[0.08] rounded"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Action */}
                  <div className="shrink-0">
                    <Link
                      to={`/projects/${CURRENTLY_BUILDING.slug}`}
                      onClick={() => sound.playClick()}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-mono font-bold text-white bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 hover:border-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] group cursor-pointer"
                    >
                      <span>EXPLORE PROJECT</span>
                      <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════════════ */}
        {/* 7 · TRUST / PROOF STRIP: VERIFIABLE METRICS           */}
        {/* ═══════════════════════════════════════════════════════ */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 relative border-t border-white/[0.06]" aria-label="Trust and Verification Proof">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-6">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/40">
                VERIFIABLE PORTFOLIO CREDENTIALS
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              {PROOF_METRICS.map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 text-center flex flex-col justify-between hover:border-cyan-400/30 transition-colors"
                >
                  <p className="font-display font-black text-2xl sm:text-3xl text-gradient tracking-tight mb-0.5">
                    {item.value}
                  </p>
                  <p className="text-[11px] font-mono font-bold text-white/90 uppercase tracking-wider mb-1">
                    {item.label}
                  </p>
                  <p className="text-[10px] text-white/45 font-mono leading-tight">
                    {item.detail}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* 8 · FINAL CTA: HAVE SOMETHING WORTH BUILDING?          */}
        {/* ═══════════════════════════════════════════════════════ */}
        <section className="py-20 sm:py-28 px-4 sm:px-6 relative border-t border-white/[0.06] text-center" aria-label="Work Together">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="space-y-6"
            >
              <div className="section-label mx-auto">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>LET'S COLLABORATE</span>
              </div>

              <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
                Have Something <br />
                <span className="text-gradient">Worth Building?</span>
              </h2>

              <p className="text-white/65 text-sm sm:text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed">
                Let's turn the idea into something real. Whether you need a client-facing web app, speech AI interface, or full-stack software engineer.
              </p>

              <div className="pt-2 flex flex-col xs:flex-row items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    navigate('/contact');
                    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
                  }}
                  className="px-8 py-4 rounded-full font-mono font-bold text-white text-sm sm:text-base cursor-pointer shadow-[0_0_28px_rgba(0,189,255,0.4)] border border-cyan-400/40 hover:scale-105 transition-all"
                  style={{ background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))' }}
                >
                  LET'S BUILD IT ↗
                </button>

                <Link
                  to="/projects"
                  onClick={() => sound.playClick()}
                  className="px-7 py-4 rounded-full font-mono font-semibold text-white/80 hover:text-white text-sm sm:text-base glass border border-white/10 hover:border-cyan-400/40 transition-all"
                >
                  EXPLORE ALL WORK
                </Link>
              </div>

              <p className="text-[11px] font-mono text-cyan-400/80 flex items-center justify-center gap-2 pt-2">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Direct response commitment: under 4 hours</span>
              </p>
            </motion.div>
          </div>
        </section>

        {/* Site Footer */}
        <Footer />
      </main>
    </div>
  );
};

export default Index;