import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

const experiences = [
  {
    role: 'Full-Stack Web Development Intern',
    company: 'OctaNet Services Pvt. Ltd.',
    location: 'Remote',
    period: 'June 2024 – July 2024',
    description: [
      'Developed responsive web applications using React.js, Node.js, and MongoDB, improving user engagement by 40%',
      'Built RESTful APIs and integrated third-party services for seamless data flow across microservices',
      'Collaborated with cross-functional teams in an Agile environment, delivering 3 production-ready features ahead of schedule',
      'Implemented modern UI/UX practices with Tailwind CSS, ensuring mobile-first responsive design',
    ],
    logo: '🚀',
    skills: ['React.js', 'Node.js', 'MongoDB', 'REST APIs', 'Tailwind CSS'],
  },
  {
    role: 'Technical Instructor & Operations Lead',
    company: 'BECIL Training Centre',
    location: 'Ahmedabad',
    period: 'Aug 2021 – Dec 2023',
    description: [
      'Led technical training programs for 200+ students in web development fundamentals and modern JavaScript',
      'Managed end-to-end operations including student admissions, batch scheduling, and performance tracking',
      'Developed curriculum materials and hands-on projects that increased student placement rate by 35%',
      'Built strong mentorship relationships, guiding students from basics to job-ready skill levels',
    ],
    logo: '🎓',
    skills: ['JavaScript', 'HTML/CSS', 'Teaching', 'Leadership', 'Operations'],
  },
];

const Experience = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 relative" id="experience">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
            Building impactful solutions and leading teams to success
          </p>
        </motion.div>

        <div className="relative space-y-5 sm:space-y-6 md:space-y-8">
          <div className="hidden sm:block absolute left-[28px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-primary/50 via-purple-500/50 to-transparent rounded-full" />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative pl-0 sm:pl-20"
            >
              <div className="hidden sm:flex absolute left-0 top-0 w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-black/50 border border-white/10 items-center justify-center z-10 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                <div className="text-xl md:text-2xl filter drop-shadow-lg">{exp.logo}</div>
              </div>

              <motion.div
                whileHover={{ x: 8, borderColor: 'rgba(6,182,212,0.5)' }}
                transition={{ duration: 0.3 }}
                className="glass-card p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl border-l-4 border-l-primary sm:border-l-transparent transition-all duration-300 group cursor-default"
              >
                <div className="flex sm:hidden items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <span className="text-xl sm:text-2xl">{exp.logo}</span>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-mono text-muted-foreground bg-white/5 px-2 py-0.5 sm:py-1 rounded-full">
                    <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary" />
                    {exp.period}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-3 sm:mb-4">
                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-white group-hover:text-primary transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base font-medium text-white/80">
                      {exp.company} <span className="text-muted-foreground">• {exp.location}</span>
                    </p>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 text-xs sm:text-sm font-mono text-muted-foreground bg-white/5 px-2 sm:px-3 py-1 rounded-full w-fit shrink-0">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                    {exp.period}
                  </div>
                </div>

                <ul className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                  {exp.description.map((point, i) => (
                    <li key={i} className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed flex items-start gap-1.5 sm:gap-2">
                      <span className="text-primary mt-1 sm:mt-1.5 text-[10px] sm:text-xs">▸</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-3 sm:pt-4 border-t border-white/10">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;