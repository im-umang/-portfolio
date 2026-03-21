import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaReact, FaNodeJs, FaFigma, FaGitAlt, FaPython, FaGithub } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiPostgresql, SiMongodb, SiExpress, SiMysql, SiVercel } from 'react-icons/si';
import { Layers } from 'lucide-react';

interface Tech {
  name: string;
  icon: React.ReactNode;
  color: string;
  level: number;
  url: string;
  category: 'frontend' | 'backend' | 'database' | 'tools';
}

const technologies: Tech[] = [
  { name: 'React',      icon: <FaReact />,     color: '#61DAFB', level: 92, url: 'https://react.dev',              category: 'frontend'  },
  { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6', level: 80, url: 'https://typescriptlang.org',    category: 'frontend'  },
  { name: 'Next.js',   icon: <SiNextdotjs />,  color: '#ffffff', level: 72, url: 'https://nextjs.org',             category: 'frontend'  },
  { name: 'Tailwind',  icon: <SiTailwindcss />, color: '#06B6D4', level: 94, url: 'https://tailwindcss.com',       category: 'frontend'  },
  { name: 'Node.js',   icon: <FaNodeJs />,     color: '#68A063', level: 87, url: 'https://nodejs.org',             category: 'backend'   },
  { name: 'Express',   icon: <SiExpress />,    color: '#ffffff', level: 86, url: 'https://expressjs.com',          category: 'backend'   },
  { name: 'Python',    icon: <FaPython />,     color: '#FFD43B', level: 65, url: 'https://python.org',             category: 'backend'   },
  { name: 'MongoDB',   icon: <SiMongodb />,    color: '#47A248', level: 86, url: 'https://mongodb.com',            category: 'database'  },
  { name: 'MySQL',     icon: <SiMysql />,      color: '#4479A1', level: 83, url: 'https://mysql.com',              category: 'database'  },
  { name: 'PostgreSQL',icon: <SiPostgresql />, color: '#336791', level: 70, url: 'https://postgresql.org',         category: 'database'  },
  { name: 'Git',       icon: <FaGitAlt />,     color: '#F05032', level: 90, url: 'https://git-scm.com',            category: 'tools'     },
  { name: 'GitHub',    icon: <FaGithub />,     color: '#ffffff', level: 92, url: 'https://github.com',             category: 'tools'     },
  { name: 'Figma',     icon: <FaFigma />,      color: '#F24E1E', level: 76, url: 'https://figma.com',              category: 'tools'     },
  { name: 'Vercel',    icon: <SiVercel />,     color: '#ffffff', level: 80, url: 'https://vercel.com',             category: 'tools'     },
];

const CATS = ['all', 'frontend', 'backend', 'database', 'tools'] as const;
type Cat = typeof CATS[number];
const CAT_LABELS: Record<Cat, string> = {
  all: 'All', frontend: 'Frontend', backend: 'Backend', database: 'Database', tools: 'Dev Tools',
};

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
    whileHover={{ scale: 1.08, y: -6 }}
    whileTap={{ scale: 0.92 }}
    className="group relative glass-card rounded-2xl p-4 flex flex-col items-start cursor-pointer overflow-hidden"
    style={{ borderColor: 'rgba(255,255,255,0.07)' }}
  >
    {/* Hover tint */}
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl"
      style={{ background: `${tech.color}12` }}
    />

    <div className="relative z-10 w-full">
      <div
        className="text-2xl mb-3 transition-transform duration-300 group-hover:scale-110"
        style={{ color: tech.color, filter: `drop-shadow(0 0 6px ${tech.color}60)` }}
      >
        {tech.icon}
      </div>
      <p className="text-xs font-semibold text-white/75 group-hover:text-white transition-colors mb-2.5">
        {tech.name}
      </p>
      {/* Skill bar */}
      <div className="h-[3px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${tech.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: 'easeOut', delay: 0.1 }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${tech.color}, ${tech.color}88)` }}
        />
      </div>
      <p className="text-[9px] text-white/25 mt-1 font-mono">{tech.level}%</p>
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
    <section className="py-24 sm:py-28 md:py-36 overflow-hidden relative" id="stack">
      <div className="absolute inset-0 bg-radial-secondary opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12 sm:mb-14">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="text-center"
        >
          <div className="section-label mx-auto mb-6">
            <Layers className="w-3.5 h-3.5" />
            <span>Technical Arsenal</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl mb-4">
            My Tech <span className="text-gradient">Stack</span>
          </h2>
          <p className="text-white/45 text-sm sm:text-base max-w-md mx-auto mb-10">
            The tools I rely on to ship fast, clean, scalable products
          </p>

          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {CATS.map(cat => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.94 }}
                className="px-4 py-2 rounded-full text-xs sm:text-[13px] font-semibold transition-all duration-300"
                style={{
                  background: activeCategory === cat
                    ? 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))'
                    : 'rgba(255,255,255,0.04)',
                  color: activeCategory === cat ? '#fff' : 'rgba(255,255,255,0.45)',
                  border: `1px solid ${activeCategory === cat ? 'transparent' : 'rgba(255,255,255,0.09)'}`,
                  boxShadow: activeCategory === cat ? '0 0 20px hsl(var(--primary)/0.4)' : 'none',
                }}
              >
                {CAT_LABELS[cat]}
              </motion.button>
            ))}
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