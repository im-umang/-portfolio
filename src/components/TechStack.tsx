import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaFigma } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiPostgresql } from "react-icons/si";


const technologies = [
  { name: 'React', icon: <FaReact />, color: 'from-cyan-400 to-cyan-600' },
  { name: 'Next.js', icon: <SiNextdotjs />, color: 'from-gray-400 to-gray-600' },
  { name: 'TypeScript', icon: <SiTypescript />, color: 'from-blue-400 to-blue-600' },
  { name: 'Tailwind CSS', icon: <SiTailwindcss />, color: 'from-teal-400 to-teal-600' },
  { name: 'Node.js', icon: <FaNodeJs />, color: 'from-green-400 to-green-600' },
  { name: 'Figma', icon: <FaFigma />, color: 'from-purple-400 to-pink-600' },
  { name: 'PostgreSQL', icon: <SiPostgresql />, color: 'from-blue-500 to-indigo-600' },
  //{ name: 'GraphQL', icon: '◈', color: 'from-pink-400 to-pink-600' },
];

const TechStack = () => {
  // Double the array for seamless loop
  const duplicatedTech = [...technologies, ...technologies];

  return (
    <section className="py-24 overflow-hidden" id="stack">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Tech <span className="text-gradient">Stack</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The tools and technologies I use to bring ideas to life
          </p>
        </motion.div>
      </div>

      {/* Marquee container */}
      <div className="relative">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        {/* First row - left to right */}
        <div className="flex animate-marquee mb-8">
          {duplicatedTech.map((tech, index) => (
            <motion.div
              key={`${tech.name}-${index}`}
              className="flex-shrink-0 mx-4"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="glass-strong px-8 py-6 rounded-2xl min-w-[200px] group cursor-pointer">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{tech.icon}</span>
                  <span className="font-semibold text-lg group-hover:text-primary transition-colors">
                    {tech.name}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Second row - right to left */}
        <div className="flex animate-marquee-reverse">
          {duplicatedTech.reverse().map((tech, index) => (
            <motion.div
              key={`${tech.name}-rev-${index}`}
              className="flex-shrink-0 mx-4"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="glass-strong px-8 py-6 rounded-2xl min-w-[200px] group cursor-pointer">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{tech.icon}</span>
                  <span className="font-semibold text-lg group-hover:text-primary transition-colors">
                    {tech.name}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;