import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaFigma } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiPostgresql, SiMongodb, SiExpress } from "react-icons/si";

const technologies = [
  { name: 'React', icon: <FaReact />, color: 'from-cyan-400 to-cyan-600', url: 'https://react.dev' },
  { name: 'Next.js', icon: <SiNextdotjs />, color: 'from-gray-400 to-gray-600', url: 'https://nextjs.org' },
  { name: 'TypeScript', icon: <SiTypescript />, color: 'from-blue-400 to-blue-600', url: 'https://www.typescriptlang.org' },
  { name: 'Tailwind CSS', icon: <SiTailwindcss />, color: 'from-teal-400 to-teal-600', url: 'https://tailwindcss.com' },
  { name: 'Node.js', icon: <FaNodeJs />, color: 'from-green-400 to-green-600', url: 'https://nodejs.org' },
  { name: 'MongoDB', icon: <SiMongodb />, color: 'from-green-500 to-green-700', url: 'https://www.mongodb.com' },
  { name: 'Express.js', icon: <SiExpress />, color: 'from-gray-400 to-gray-600', url: 'https://expressjs.com' },
  { name: 'Figma', icon: <FaFigma />, color: 'from-purple-400 to-pink-600', url: 'https://www.figma.com' },
  { name: 'PostgreSQL', icon: <SiPostgresql />, color: 'from-blue-500 to-indigo-600', url: 'https://www.postgresql.org' },
];

const TechStack = () => {
  const duplicatedTech = [...technologies, ...technologies];

  return (
    <section className="py-12 sm:py-16 md:py-24 overflow-hidden" id="stack">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 sm:mb-10 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            Tech <span className="text-gradient">Stack</span>
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm md:text-base max-w-2xl mx-auto px-2">
            The tools and technologies I use to bring ideas to life
          </p>
          <p className="text-[10px] sm:text-xs text-muted-foreground/60 mt-2">
            Click any technology to learn more
          </p>
        </motion.div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="flex animate-marquee mb-4 sm:mb-6 md:mb-8">
          {duplicatedTech.map((tech, index) => (
            <motion.a
              key={`${tech.name}-${index}`}
              href={tech.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 mx-1.5 sm:mx-2 md:mx-4"
              whileHover={{ scale: 1.1, y: -8 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              aria-label={`Learn more about ${tech.name}`}
            >
              <div className="glass-strong px-3 sm:px-4 md:px-8 py-3 sm:py-4 md:py-6 rounded-lg sm:rounded-xl md:rounded-2xl min-w-[100px] sm:min-w-[140px] md:min-w-[200px] group cursor-pointer hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all duration-300">
                <div className="flex items-center gap-1.5 sm:gap-2 md:gap-4">
                  <span className="text-base sm:text-xl md:text-3xl group-hover:scale-110 transition-transform">{tech.icon}</span>
                  <span className="font-semibold text-xs sm:text-sm md:text-lg group-hover:text-primary transition-colors">
                    {tech.name}
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="flex animate-marquee-reverse">
          {[...technologies].reverse().concat([...technologies].reverse()).map((tech, index) => (
            <motion.a
              key={`${tech.name}-rev-${index}`}
              href={tech.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 mx-1.5 sm:mx-2 md:mx-4"
              whileHover={{ scale: 1.1, y: -8 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              aria-label={`Learn more about ${tech.name}`}
            >
              <div className="glass-strong px-3 sm:px-4 md:px-8 py-3 sm:py-4 md:py-6 rounded-lg sm:rounded-xl md:rounded-2xl min-w-[100px] sm:min-w-[140px] md:min-w-[200px] group cursor-pointer hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all duration-300">
                <div className="flex items-center gap-1.5 sm:gap-2 md:gap-4">
                  <span className="text-base sm:text-xl md:text-3xl group-hover:scale-110 transition-transform">{tech.icon}</span>
                  <span className="font-semibold text-xs sm:text-sm md:text-lg group-hover:text-primary transition-colors">
                    {tech.name}
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;