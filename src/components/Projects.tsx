import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight, Clock } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  liveUrl: string | null;
  githubUrl: string;
  hasLiveDemo: boolean;
  badge: string | null;
  timeline: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: 'GearGuard',
    description: 'Asset management system for equipment lifecycle, maintenance scheduling, and role-based workflows. Built solo under hackathon constraints.',
    tech: ['React.js', 'Node.js', 'MySQL', 'Material UI'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    liveUrl: null,
    githubUrl: 'https://github.com/im-umang/odoo-hackathon-2025.git',
    hasLiveDemo: false,
    badge: 'Odoo Hackathon',
    timeline: 'Recent',
    featured: true,
  },
  {
    title: 'POS & Payment System',
    description: 'Complete Point of Sale solution with cart management, tax calculation, UPI/Cash payments, and reporting dashboards.',
    tech: ['React.js', 'Node.js', 'MySQL', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    liveUrl: null,
    githubUrl: 'https://github.com/imjayjoshi/Odoo-final-POS.git',
    hasLiveDemo: false,
    badge: 'Odoo Hackathon',
    timeline: 'Recent',
    featured: true,
  },
  {
    title: 'SpeakWise',
    description: 'AI pronunciation coaching platform with real-time speech analysis, multi-language support, and fluency scoring.',
    tech: ['React.js', 'Node.js', 'MongoDB', 'Radix UI'],
    image: '/speakwise.png',
    liveUrl: 'https://speakwiseai.vercel.app/',
    githubUrl: 'https://github.com/imjayjoshi/SpeakWise.git',
    hasLiveDemo: true,
    badge: null,
    timeline: 'MCA Sem 3',
  },
  {
    title: 'VCS Class Manager',
    description: 'Private coaching class management system with attendance tracking, grade management, and role administration.',
    tech: ['React.js', 'Node.js', 'MySQL', 'Tailwind CSS'],
    image: '/vcs.png',
    liveUrl: null,
    githubUrl: 'https://github.com/im-umang/class-management-system.git',
    hasLiveDemo: false,
    badge: null,
    timeline: 'BCA Sem 6',
  },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const cardLink = project.hasLiveDemo ? project.liveUrl! : project.githubUrl;

  return (
    <motion.a
      href={cardLink}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative block rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${project.featured
          ? 'bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-primary/30 hover:border-primary/60 hover:shadow-[0_0_50px_rgba(6,182,212,0.15)]'
          : 'bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.05]'
        }`}
      aria-label={`View ${project.title} ${project.hasLiveDemo ? 'live demo' : 'on GitHub'}`}
    >
      <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-wrap gap-1.5 sm:gap-2">
          {project.badge && (
            <span className="px-2 py-0.5 sm:py-1 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider rounded-full bg-violet-500/90 text-white shadow-lg">
              {project.badge}
            </span>
          )}
          <span className={`px-2 py-0.5 sm:py-1 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider rounded-full flex items-center gap-1 ${project.timeline === 'Recent'
              ? 'bg-green-500/90 text-white'
              : 'bg-white/20 text-white/90 backdrop-blur-sm'
            }`}>
            <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            {project.timeline}
          </span>
        </div>

        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <div className="p-1.5 sm:p-2 rounded-full bg-primary text-black shadow-lg">
            <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </div>
        </div>

        <div className="absolute bottom-2 sm:bottom-3 left-3 sm:left-4 right-3 sm:right-4">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white drop-shadow-lg">
            {project.title}
          </h3>
        </div>
      </div>

      <div className="p-4 sm:p-5 md:p-6">
        <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 sm:py-1 text-[9px] sm:text-[10px] uppercase tracking-wider font-medium rounded-md bg-white/5 text-white/60 border border-white/10"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-white/10">
          {project.hasLiveDemo ? (
            <span className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-primary">
              <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
              Live Demo
            </span>
          ) : (
            <span className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-white/40">
              <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="line-through">No Demo</span>
            </span>
          )}
          <span className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-white group-hover:text-primary transition-colors">
            <Github className="w-3 h-3 sm:w-4 sm:h-4" />
            Source Code
          </span>
        </div>
      </div>
    </motion.a>
  );
};

const Projects = () => {
  return (
    <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 relative" id="projects">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14 md:mb-20"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-white/60 text-sm sm:text-base md:text-lg max-w-xl mx-auto px-2">
            Real-world applications built with modern technologies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;