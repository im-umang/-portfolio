import { motion } from 'framer-motion';
import { ExternalLink, Github, Code2 } from 'lucide-react';

const projects = [
  {
    title: 'SpeakWise – AI Pronunciation',
    description: 'Developed a full-stack AI pronunciation coaching platform with real-time speech analysis, multi language support, and accuracy/fluency scoring.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Radix UI'],
    image: '/speakwise.png',
    liveUrl: 'https://speakwiseai.vercel.app/',
    githubUrl: 'https://github.com/imjayjoshi/SpeakWise.git',
  },
  {
    title: 'GearGuard',
    description: 'Full-stack equipment maintenance management system. Features role-based dashboards, Kanban board for tracking, and preventive scheduling.',
    tech: ['React.js', 'Node.js', 'MySQL', 'Material UI'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    liveUrl: '#',
    githubUrl: 'https://github.com/im-umang/odoo-hackathon-2025.git',
  },
  {
    title: 'VCS - Class Management',
    description: 'Comprehensive system for managing private class operations including attendance tracking, grade management, and user role administration.',
    tech: ['Django', 'Python', 'MySQL', 'HTML/CSS'],
    image: '/vcs.png',
    liveUrl: '#',
    githubUrl: 'https://github.com/im-umang/class-management-system.git',
  },
];

const Projects = () => {
  return (
    <section className="py-24 px-4 sm:px-6 relative" id="projects">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A selection of projects that showcase my passion for building exceptional digital experiences
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group glass-card rounded-3xl overflow-hidden flex flex-col h-full hover:border-primary/50 transition-colors duration-500"
            >
              {/* Image Container with Overlay */}
              <div className="relative h-52 overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-20" />

                <div className="absolute bottom-4 left-4 right-4 z-30 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-xl font-bold text-white mb-1 drop-shadow-md">
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow relative z-20">
                <p className="text-muted-foreground/80 text-sm mb-6 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-[10px] uppercase tracking-wider font-bold rounded-full bg-white/5 border border-white/10 text-white/70 group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/20 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  <a
                    href={project.liveUrl}
                    className="flex items-center gap-2 text-sm font-semibold text-white hover:text-primary transition-colors hover:translate-x-1 duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                  <a
                    href={project.githubUrl}
                    className="flex items-center gap-2 text-sm font-semibold text-white hover:text-primary transition-colors hover:translate-x-1 duration-300 ml-auto"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4" />
                    Source Code
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;