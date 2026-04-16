import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight, Clock, Star } from 'lucide-react';
import { useRef, useState } from 'react';

const projects = [
  {
    title: 'GearGuard',
    tagline: 'Enterprise Asset Management',
    description:
      'Role-based asset lifecycle tracking system built solo in a 24-hour hackathon. Real-time equipment scheduling, maintenance alerts, and multi-department admin.',
    tech: ['React.js', 'Node.js', 'MySQL', 'Material UI'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=540&fit=crop&q=80',
    liveUrl: null,
    githubUrl: 'https://github.com/im-umang/odoo-hackathon-2025.git',
    badge: '🏆 Odoo Hackathon',
    timeline: 'Jan 2026',
    accent: 'hsl(var(--primary))',
    glow: 'hsl(var(--primary) / 0.35)',
  },
  {
    title: 'POS & Payment System',
    tagline: 'Complete Point-of-Sale Solution',
    description:
      'Full-featured POS with real-time cart, tax computation, UPI & Cash split payments, and advanced sales dashboards. Built under hackathon pressure.',
    tech: ['React.js', 'Node.js', 'MySQL', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&h=540&fit=crop&q=80',
    liveUrl: null,
    githubUrl: 'https://github.com/imjayjoshi/Odoo-final-POS.git',
    badge: '🏆 Odoo Hackathon',
    timeline: 'Jan 2026',
    accent: 'hsl(var(--secondary))',
    glow: 'hsl(var(--secondary) / 0.35)',
  },
  {
    title: 'SpeakWise AI',
    tagline: 'AI Pronunciation Coach',
    description:
      'Real-time speech analysis platform with multi-language support, fluency scoring, and personalized AI-driven feedback for language learners.',
    tech: ['React.js', 'Node.js', 'MongoDB', 'Radix UI'],
    image: '../public/speakwise.png',
    liveUrl: 'https://speakwiseai.vercel.app/',
    githubUrl: 'https://github.com/imjayjoshi/SpeakWise.git',
    badge: null,
    timeline: 'MCA Sem 3',
    accent: 'hsl(var(--accent))',
    glow: 'hsl(var(--accent) / 0.35)',
  },
  {
    title: 'VCS Class Manager',
    tagline: 'Private Coaching Platform',
    description:
      'Comprehensive coaching institute system — attendance, grade management, analytics, fee tracking, and multi-role admin panel.',
    tech: ['React.js', 'Node.js', 'MySQL', 'Tailwind CSS'],
    image: '../public/vcs.png',
    liveUrl: null,
    githubUrl: 'https://github.com/im-umang/class-management-system.git',
    badge: null,
    timeline: 'BCA Sem 6',
    accent: 'hsl(145 70% 50%)',
    glow: 'hsl(145 70% 50% / 0.3)',
  },
];

/* ── 3D Tilt Card ── */
const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const rx = useSpring(rotX, { stiffness: 180, damping: 22 });
  const ry = useSpring(rotY, { stiffness: 180, damping: 22 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    rotX.set(((e.clientY - top - height / 2) / (height / 2)) * -6);
    rotY.set(((e.clientX - left - width / 2) / (width / 2)) * 6);
  };

  const onLeave = () => { rotX.set(0); rotY.set(0); setHovered(false); };

  const href = project.liveUrl ?? project.githubUrl;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: 'easeOut' }}
      style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d', perspective: '1000px' }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      className="group shimmer"
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${project.title}`}
        className="block h-full"
      >
        <div
          className="relative h-full rounded-2xl overflow-hidden transition-all duration-500"
          style={{
            background: 'rgba(255,255,255,0.025)',
            border: `1px solid ${hovered ? project.glow.replace('0.35', '0.4') : 'rgba(255,255,255,0.07)'}`,
            boxShadow: hovered
              ? `0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px ${project.glow}`
              : '0 4px 24px rgba(0,0,0,0.35)',
          }}
        >
          {/* Top accent */}
          <div className="absolute top-0 inset-x-0 h-[2px] z-20"
            style={{ background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)` }}
          />

          {/* Image */}
          <div className="relative h-44 sm:h-48 overflow-hidden">
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              animate={{ scale: hovered ? 1.07 : 1 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            {/* Hover glow overlay */}
            <motion.div
              className="absolute inset-0"
              animate={{ opacity: hovered ? 0.18 : 0 }}
              transition={{ duration: 0.4 }}
              style={{ background: `linear-gradient(135deg, ${project.accent}, transparent)` }}
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-1.5 z-10">
              {project.badge && (
                <span className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide rounded-full backdrop-blur-sm"
                  style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff' }}>
                  {project.badge}
                </span>
              )}
              <span className="px-2.5 py-1 text-[9px] font-medium rounded-full backdrop-blur-sm flex items-center gap-1"
                style={{ background: 'rgba(0,0,0,0.45)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Clock className="w-2.5 h-2.5" />
                {project.timeline}
              </span>
            </div>

            {/* Arrow on hover */}
            <motion.div
              className="absolute top-3 right-3 z-10"
              animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 8 }}
              transition={{ duration: 0.25 }}
            >
              <div className="p-2 rounded-full text-black" style={{ background: project.accent }}>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </motion.div>

            {/* Title on image */}
            <div className="absolute bottom-3 left-4 right-4">
              <p className="text-[10px] font-mono text-white/45 mb-0.5">{project.tagline}</p>
              <h3 className="font-display font-bold text-base sm:text-lg text-white leading-snug">
                {project.title}
              </h3>
            </div>
          </div>

          {/* Body */}
          <div className="p-5">
            <p className="text-white/50 text-xs sm:text-[13px] leading-relaxed mb-4 line-clamp-2">
              {project.description}
            </p>

            {/* Tech */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tech.map(t => <span key={t} className="tech-badge">{t}</span>)}
            </div>

            {/* Footer row */}
            <div className="flex items-center justify-between pt-3 border-t border-white/[0.07]">
              <span className="flex items-center gap-1.5 text-[11px] font-medium"
                style={{ color: project.liveUrl ? project.accent : 'rgba(255,255,255,0.25)' }}>
                <ExternalLink className="w-3.5 h-3.5" />
                {project.liveUrl ? 'Live Demo' : 'No Live Demo'}
              </span>
              <span className="flex items-center gap-1.5 text-[11px] font-medium text-white/35 group-hover:text-white/70 transition-colors">
                <Github className="w-3.5 h-3.5" />
                Source Code
              </span>
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
};

const Projects = () => (
  <section className="relative py-24 sm:py-28 md:py-36 px-4 sm:px-6" id="projects">
    <div className="absolute inset-0 bg-radial-primary opacity-40 pointer-events-none" />

    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65 }}
        className="text-center mb-16 md:mb-20"
      >
        <div className="section-label mx-auto mb-6">
          <Star className="w-3.5 h-3.5" />
          <span>Selected Work</span>
        </div>
        <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl mb-4">
          Featured <span className="text-gradient">Projects</span>
        </h2>
        <p className="text-white/45 text-sm sm:text-base max-w-md mx-auto">
          Real apps shipped — from hackathons to production
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
        {projects.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
      </div>

      {/* GitHub CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center mt-14"
      >
        <motion.a
          href="https://github.com/im-umang"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.04, y: -3 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full glass border border-white/[0.1] hover:border-white/25 text-white/65 hover:text-white font-semibold text-sm transition-all"
        >
          <Github className="w-4 h-4" />
          View All Projects on GitHub
          <ArrowUpRight className="w-4 h-4" />
        </motion.a>
      </motion.div>
    </div>
  </section>
);

export default Projects;