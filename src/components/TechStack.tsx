import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaReact, FaNodeJs, FaFigma, FaGitAlt, FaPython, FaGithub, FaJs, FaHtml5, FaCss3Alt } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiPostgresql, SiMongodb, SiExpress, SiMysql, SiVercel, SiVite } from 'react-icons/si';
import { Layers, Code2, Server, Database, Wrench, ArrowRight, Sparkles, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { sound } from '@/lib/sound';
import { PROJECTS_DATA, Project } from '@/data/projectsData';

interface TechItem {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'tools';
  icon: React.ReactNode;
  color: string;
  tagline: string;
  officialUrl: string;
  relatedProjectSlugs: string[];
}

const TECH_ECOSYSTEM: TechItem[] = [
  // FRONTEND
  {
    name: 'React',
    category: 'frontend',
    icon: <FaReact />,
    color: '#61DAFB',
    tagline: 'Component Architecture & Reactive State',
    officialUrl: 'https://react.dev',
    relatedProjectSlugs: ['radhika-portfolio', 'speakwise', 'travel-chatbot', 'vcs-manager', 'pos-system', 'gearguard'],
  },
  {
    name: 'TypeScript',
    category: 'frontend',
    icon: <SiTypescript />,
    color: '#3178C6',
    tagline: 'Static Type-Safety & Scalable Interfaces',
    officialUrl: 'https://typescriptlang.org',
    relatedProjectSlugs: ['radhika-portfolio', 'speakwise'],
  },
  {
    name: 'JavaScript (ES6+)',
    category: 'frontend',
    icon: <FaJs />,
    color: '#F7DF1E',
    tagline: 'Modern Asynchronous DOM & Event Loops',
    officialUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    relatedProjectSlugs: ['radhika-portfolio', 'speakwise', 'vcs-manager', 'pos-system', 'gearguard'],
  },
  {
    name: 'Tailwind CSS',
    category: 'frontend',
    icon: <SiTailwindcss />,
    color: '#06B6D4',
    tagline: 'Design Tokens & Zero-Runtime Styling',
    officialUrl: 'https://tailwindcss.com',
    relatedProjectSlugs: ['radhika-portfolio', 'speakwise', 'vcs-manager', 'pos-system'],
  },
  {
    name: 'Next.js',
    category: 'frontend',
    icon: <SiNextdotjs />,
    color: '#ffffff',
    tagline: 'Server-Side Rendering & App Routing',
    officialUrl: 'https://nextjs.org',
    relatedProjectSlugs: ['speakwise'],
  },
  {
    name: 'HTML5 & CSS3',
    category: 'frontend',
    icon: <FaHtml5 />,
    color: '#E34F26',
    tagline: 'Semantic DOM & Responsive Canvas',
    officialUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
    relatedProjectSlugs: ['radhika-portfolio', 'vcs-manager'],
  },

  // BACKEND
  {
    name: 'Node.js',
    category: 'backend',
    icon: <FaNodeJs />,
    color: '#68A063',
    tagline: 'Event-Driven Serverless & Microservices',
    officialUrl: 'https://nodejs.org',
    relatedProjectSlugs: ['speakwise', 'vcs-manager', 'pos-system', 'gearguard', 'travel-chatbot'],
  },
  {
    name: 'Express.js',
    category: 'backend',
    icon: <SiExpress />,
    color: '#ffffff',
    tagline: 'RESTful Routing & Middleware Architecture',
    officialUrl: 'https://expressjs.com',
    relatedProjectSlugs: ['speakwise', 'vcs-manager'],
  },
  {
    name: 'Python',
    category: 'backend',
    icon: <FaPython />,
    color: '#FFD43B',
    tagline: 'Speech AI, NLP & Backend Scripts',
    officialUrl: 'https://python.org',
    relatedProjectSlugs: ['travel-chatbot'],
  },

  // DATABASE
  {
    name: 'MongoDB',
    category: 'database',
    icon: <SiMongodb />,
    color: '#47A248',
    tagline: 'Document Stores & Aggregation Pipelines',
    officialUrl: 'https://mongodb.com',
    relatedProjectSlugs: ['speakwise'],
  },
  {
    name: 'MySQL',
    category: 'database',
    icon: <SiMysql />,
    color: '#4479A1',
    tagline: 'ACID Relational Schemas & Foreign Keys',
    officialUrl: 'https://mysql.com',
    relatedProjectSlugs: ['vcs-manager', 'pos-system', 'gearguard'],
  },
  {
    name: 'PostgreSQL',
    category: 'database',
    icon: <SiPostgresql />,
    color: '#336791',
    tagline: 'Relational Integrity & Complex Queries',
    officialUrl: 'https://postgresql.org',
    relatedProjectSlugs: ['vcs-manager'],
  },

  // TOOLS & WORKFLOW
  {
    name: 'Git',
    category: 'tools',
    icon: <FaGitAlt />,
    color: '#F05032',
    tagline: 'Version Control & Distributed Branching',
    officialUrl: 'https://git-scm.com',
    relatedProjectSlugs: ['radhika-portfolio', 'speakwise', 'gearguard'],
  },
  {
    name: 'GitHub',
    category: 'tools',
    icon: <FaGithub />,
    color: '#ffffff',
    tagline: 'CI/CD Actions & Code Reviews',
    officialUrl: 'https://github.com/im-umang',
    relatedProjectSlugs: ['radhika-portfolio', 'speakwise', 'gearguard', 'pos-system'],
  },
  {
    name: 'Vite',
    category: 'tools',
    icon: <SiVite />,
    color: '#646CFF',
    tagline: 'Next-Gen ESM Bundling & Fast HMR',
    officialUrl: 'https://vitejs.dev',
    relatedProjectSlugs: ['radhika-portfolio', 'speakwise'],
  },
  {
    name: 'Vercel',
    category: 'tools',
    icon: <SiVercel />,
    color: '#ffffff',
    tagline: 'Edge CDN & Serverless Production',
    officialUrl: 'https://vercel.com',
    relatedProjectSlugs: ['radhika-portfolio', 'speakwise'],
  },
  {
    name: 'Figma',
    category: 'tools',
    icon: <FaFigma />,
    color: '#F24E1E',
    tagline: 'Interface Prototyping & Design Systems',
    officialUrl: 'https://figma.com',
    relatedProjectSlugs: ['radhika-portfolio'],
  },
];

type CategoryId = 'all' | 'frontend' | 'backend' | 'database' | 'tools';

const CATEGORIES: { id: CategoryId; label: string; icon: React.ElementType }[] = [
  { id: 'all',      label: 'All Arsenal', icon: Layers },
  { id: 'frontend', label: 'Frontend',    icon: Code2 },
  { id: 'backend',  label: 'Backend',     icon: Server },
  { id: 'database', label: 'Database',    icon: Database },
  { id: 'tools',    label: 'Dev Tools',   icon: Wrench },
];

const TechStack = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [selectedTech, setSelectedTech] = useState<TechItem>(TECH_ECOSYSTEM[0]); // Default React

  const filteredTech = useMemo(() => {
    if (activeCategory === 'all') return TECH_ECOSYSTEM;
    return TECH_ECOSYSTEM.filter((t) => t.category === activeCategory);
  }, [activeCategory]);

  const connectedProjects = useMemo(() => {
    return PROJECTS_DATA.filter((p) => selectedTech.relatedProjectSlugs.includes(p.slug));
  }, [selectedTech]);

  return (
    <section className="pt-20 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-6 relative overflow-hidden" id="stack">
      {/* Background Ambience */}
      <div className="section-glow-tech" aria-hidden="true" />
      <div className="absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-secondary/15 blur-[110px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 rounded-full bg-primary/15 blur-[110px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="section-label mx-auto mb-4">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive Technology Ecosystem</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-3 tracking-tight text-white">
            Technical <span className="text-gradient">Arsenal</span>
          </h2>
          <p className="text-white/55 text-sm sm:text-base max-w-lg mx-auto font-light leading-relaxed">
            The modern tools and datastores I rely on to build production software. Select any technology to view its real-world implementation.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-7">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setActiveCategory(cat.id);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-white border border-cyan-400/50 bg-cyan-500/15 shadow-[0_0_14px_rgba(0,189,255,0.3)]'
                      : 'text-white/50 hover:text-white border border-white/[0.08] hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-white/40'}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── 2-Column Ecosystem Layout: Tech Grid on Left, Connected Real Projects on Right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left: Interactive Technology Grid */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-white/40 uppercase tracking-widest">
                SELECT A TECHNOLOGY ({filteredTech.length})
              </span>
              <span className="text-[11px] font-mono text-cyan-400/80">
                Click to inspect connected projects
              </span>
            </div>

            <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {filteredTech.map((tech) => {
                const isSelected = selectedTech.name === tech.name;

                return (
                  <button
                    key={tech.name}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setSelectedTech(tech);
                    }}
                    onMouseEnter={() => setSelectedTech(tech)}
                    className={`text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer relative overflow-hidden group ${
                      isSelected
                        ? 'border-cyan-400/50 bg-cyan-500/10 shadow-[0_0_16px_rgba(0,189,255,0.25)]'
                        : 'border-white/[0.07] hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className="text-2xl transition-transform group-hover:scale-110"
                        style={{ color: tech.color, filter: `drop-shadow(0 0 6px ${tech.color}40)` }}
                      >
                        {tech.icon}
                      </div>
                      <span className="text-[10px] font-mono text-white/30 uppercase">
                        {tech.category}
                      </span>
                    </div>

                    <p className="font-display font-bold text-sm text-white group-hover:text-cyan-300 transition-colors mb-1">
                      {tech.name}
                    </p>
                    <p className="text-[11px] text-white/50 leading-snug truncate">
                      {tech.tagline}
                    </p>
                  </button>
                );
              })}
            </motion.div>
          </div>

          {/* Right: Connected Projects Showcase (TECHNOLOGY → REAL PROJECT) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="rounded-2xl border border-white/10 bg-[#090f1d]/90 backdrop-blur-xl p-6 shadow-xl relative overflow-hidden">
              {/* Header for Selected Tech */}
              <div className="flex items-start justify-between gap-4 pb-5 border-b border-white/10 mb-6">
                <div className="flex items-center gap-3.5">
                  <div
                    className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-3xl shrink-0"
                    style={{ color: selectedTech.color }}
                  >
                    {selectedTech.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-bold text-xl text-white">
                        {selectedTech.name}
                      </h3>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/[0.04] text-white/50 border border-white/06">
                        {selectedTech.category}
                      </span>
                    </div>
                    <p className="text-xs text-white/60 mt-0.5">
                      {selectedTech.tagline}
                    </p>
                  </div>
                </div>

                <a
                  href={selectedTech.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.06] transition-colors shrink-0"
                  title={`Official documentation for ${selectedTech.name}`}
                  aria-label={`Official documentation for ${selectedTech.name}`}
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Connected Real Projects List */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-xs font-mono font-semibold tracking-wider text-cyan-300 uppercase">
                    Connected Projects ({connectedProjects.length})
                  </span>
                </div>

                {connectedProjects.length > 0 ? (
                  <div className="space-y-3">
                    {connectedProjects.map((project) => (
                      <Link
                        key={project.slug}
                        to={`/projects/${project.slug}`}
                        className="group flex items-center justify-between p-3.5 rounded-xl border border-white/[0.06] hover:border-cyan-500/35 bg-white/[0.02] hover:bg-white/[0.05] transition-all"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-12 h-9 object-cover rounded-md border border-white/10 shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="font-display font-bold text-sm text-white group-hover:text-cyan-300 transition-colors truncate">
                              {project.title.split('—')[0].trim()}
                            </p>
                            <p className="text-[11px] text-white/45 font-mono truncate">
                              {project.categoryLabel} • {project.status}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-xs font-mono text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2">
                          <span>View</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-white/40 text-xs font-mono rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    Core architectural utility supporting multiple workflow scripts.
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-[11px] font-mono text-white/40">
                  Ready to deploy in production
                </span>
                <Link
                  to="/projects"
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  <span>Explore All Projects</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;