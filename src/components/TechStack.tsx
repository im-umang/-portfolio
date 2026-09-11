import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaReact, FaNodeJs, FaFigma, FaGitAlt, FaPython, FaGithub } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiPostgresql, SiMongodb, SiExpress, SiMysql, SiVercel } from 'react-icons/si';
import { Layers, Code2, Server, Database, Wrench } from 'lucide-react';
import { sound } from '@/lib/sound';

interface Tech {
  name: string;
  icon: React.ReactNode;
  color: string;
  tag: string;
  url: string;
  category: 'frontend' | 'backend' | 'database' | 'tools';
}

const technologies: Tech[] = [
  { name: 'React',      icon: <FaReact />,      color: '#61DAFB', tag: 'Core UI',         url: 'https://react.dev',              category: 'frontend'  },
  { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6', tag: 'Type-Safe',       url: 'https://typescriptlang.org',    category: 'frontend'  },
  { name: 'Next.js',   icon: <SiNextdotjs />,  color: '#ffffff', tag: 'SSR / SSG',        url: 'https://nextjs.org',             category: 'frontend'  },
  { name: 'Tailwind',  icon: <SiTailwindcss />, color: '#06B6D4', tag: 'Design System',   url: 'https://tailwindcss.com',       category: 'frontend'  },
  { name: 'Node.js',   icon: <FaNodeJs />,     color: '#68A063', tag: 'Runtime Engine',   url: 'https://nodejs.org',             category: 'backend'   },
  { name: 'Express',   icon: <SiExpress />,    color: '#ffffff', tag: 'REST APIs',        url: 'https://expressjs.com',          category: 'backend'   },
  { name: 'Python',    icon: <FaPython />,     color: '#FFD43B', tag: 'Scripting & AI',   url: 'https://python.org',             category: 'backend'   },
  { name: 'MongoDB',   icon: <SiMongodb />,    color: '#47A248', tag: 'NoSQL Database',   url: 'https://mongodb.com',            category: 'database'  },
  { name: 'MySQL',     icon: <SiMysql />,      color: '#4479A1', tag: 'RDBMS / SQL',      url: 'https://mysql.com',              category: 'database'  },
  { name: 'PostgreSQL',icon: <SiPostgresql />, color: '#336791', tag: 'Relational DB',   url: 'https://postgresql.org',         category: 'database'  },
  { name: 'Git',       icon: <FaGitAlt />,     color: '#F05032', tag: 'Version Control',  url: 'https://git-scm.com',            category: 'tools'     },
  { name: 'GitHub',    icon: <FaGithub />,     color: '#ffffff', tag: 'CI / Collaboration', url: 'https://github.com',           category: 'tools'     },
  { name: 'Figma',     icon: <FaFigma />,      color: '#F24E1E', tag: 'UI / Wireframing', url: 'https://figma.com',              category: 'tools'     },
  { name: 'Vercel',    icon: <SiVercel />,     color: '#ffffff', tag: 'Edge Deployment',  url: 'https://vercel.com',             category: 'tools'     },
];

type Cat = 'all' | 'frontend' | 'backend' | 'database' | 'tools';

const CAT_CONFIG: { id: Cat; label: string; icon: React.ElementType }[] = [
  { id: 'all',      label: 'All Arsenal', icon: Layers },
  { id: 'frontend', label: 'Frontend',    icon: Code2 },
  { id: 'backend',  label: 'Backend',     icon: Server },
  { id: 'database', label: 'Database',    icon: Database },
  { id: 'tools',    label: 'Dev Tools',   icon: Wrench },
];

const doubled  = [...technologies, ...technologies];
const reversed = [...technologies].reverse();
const revDbl   = [...reversed, ...reversed];

/* ── Single tech card ── */
const TechChip = ({ tech }: { tech: Tech }) => (
  <motion.a
    href={tech.url}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={tech.name}
    onClick={() => sound.playClick()}
    whileHover={{ scale: 1.05, y: -4 }}
    whileTap={{ scale: 0.95 }}
    className="group relative glass-card rounded-2xl p-4 flex flex-col justify-between cursor-pointer overflow-hidden border border-white/[0.07] hover:border-cyan-500/35 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300"
  >
    {/* Subtle hover gradient background */}
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"
      style={{ background: `radial-gradient(circle at center, ${tech.color}15, transparent 70%)` }}
    />

    <div className="relative z-10 w-full">
      <div className="flex items-center justify-between mb-3">
        <div
          className="text-2xl transition-transform duration-300 group-hover:scale-110"
          style={{ color: tech.color, filter: `drop-shadow(0 0 6px ${tech.color}50)` }}
        >
          {tech.icon}
        </div>
        <span className="text-[10px] font-mono text-white/35 group-hover:text-cyan-300 transition-colors uppercase tracking-wider">
          {tech.category}
        </span>
      </div>

      <p className="text-sm font-bold text-white/85 group-hover:text-white transition-colors mb-1">
        {tech.name}
      </p>
      
      <div className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono text-white/55 bg-white/[0.04] border border-white/[0.06] group-hover:border-cyan-400/20 group-hover:text-white/80 transition-colors">
        {tech.tag}
      </div>
    </div>
  </motion.a>
);

/* ── Marquee item ── */
const MarqueeItem = ({ tech }: { tech: Tech }) => (
  <motion.a
    href={tech.url}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={tech.name}
    whileHover={{ scale: 1.08, y: -4 }}
    className="flex-shrink-0 mx-2.5 glass border border-white/[0.08] hover:border-white/20 px-5 py-3 rounded-xl flex items-center gap-3 cursor-pointer transition-all duration-200 group"
    style={{ minWidth: '130px' }}
  >
    <span className="text-xl group-hover:scale-110 transition-transform" style={{ color: tech.color }}>
      {tech.icon}
    </span>
    <span className="text-xs font-semibold text-white/55 group-hover:text-white/90 transition-colors whitespace-nowrap">
      {tech.name}
    </span>
  </motion.a>
);

const TechStack = () => {
  const [activeCategory, setActiveCategory] = useState<Cat>('all');

  const filtered = activeCategory === 'all'
    ? technologies
    : technologies.filter(t => t.category === activeCategory);

  return (
    <section className="pt-20 sm:pt-24 pb-16 sm:pb-20 overflow-hidden relative" id="stack">
      {/* ── Atmospheric Background ── */}
      <div className="section-glow-tech" aria-hidden="true" />
      <div className="absolute inset-0 cyber-dots-bg opacity-40 pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-secondary/15 blur-[110px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 rounded-full bg-primary/15 blur-[110px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12 sm:mb-14 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="text-center"
        >
          <div className="section-label mx-auto mb-4">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Technical Arsenal</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-3 tracking-tight text-white">
            My Tech <span className="text-gradient">Stack</span>
          </h2>
          <p className="text-white/55 text-sm sm:text-base max-w-md mx-auto mb-8 font-light leading-relaxed">
            The modern tools, frameworks, and datastores I rely on to build resilient systems.
          </p>

          {/* Category filter - Unified with Projects tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-8">
            {CAT_CONFIG.map((cat) => {
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
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-white border border-cyan-400/40 bg-cyan-500/15 shadow-[0_0_12px_rgba(0,189,255,0.25)]'
                      : 'text-white/50 hover:text-white border border-white/[0.07] hover:border-white/15 bg-white/[0.02] hover:bg-white/[0.05]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-white/40'}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Tech Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-16">
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3 sm:gap-4"
        >
          {filtered.map((tech, i) => (
            <motion.div
              key={`${tech.name}-${activeCategory}`}
              layout
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.35, delay: i * 0.03 }}
            >
              <TechChip tech={tech} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Marquee rows */}
      <div className="relative">
        {/* Fade masks */}
        <div className="absolute left-0 inset-y-0 w-24 sm:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-24 sm:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee mb-3">
          {doubled.map((t, i) => <MarqueeItem key={`m1-${i}`} tech={t} />)}
        </div>
        <div className="flex animate-marquee-reverse">
          {revDbl.map((t, i) => <MarqueeItem key={`m2-${i}`} tech={t} />)}
        </div>
      </div>
    </section>
  );
};

export default TechStack;