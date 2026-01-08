import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';

const experiences = [
  {
    role: 'Web Development Internship',
    company: 'OctaNet Services Pvt. Ltd. – Remote ',
    period: 'June, 2024 – July, 2024 ',
    description: '• Assisted in web development projects focusing on front-end and back-end tasks. \n• Applied HTML, CSS, JavaScript, and creating user-friendly interfaces. \n• Collaborated in an agile environment to meet project deadlines.',
    logo: '🚀',
  },
  {
    role: 'Django BootCamp',
    company: 'InfoLabz IT Services Pvt. Ltd. – On-Site - Ahmedabad',
    period: 'May 2023 (7 Days)',
    description: '• Intensive Bootcamp focused on Django framework.  \n• Mastered model creation, admin panel configuration, and ORM. \n• Developed a mini-project demonstrating CRUD operations.',
    logo: '🎨',
  },
  {
    role: 'Teaching Staff',
    company: 'BECIL Training Centre',
    period: 'August 2021 – December 2023',
    description: `• Delivered CCC, Tally, and basic web development courses.  
• Managed student admissions, class schedules, and coordinated multiple batches.
• Prepared financial records using Tally Prime and MS Office.
• Built strong communication and leadership skills while mentoring students.`,
    logo: '🏢',
  },
];

const Experience = () => {
  return (
    <section className="py-24 px-4 sm:px-6 relative" id="experience">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            My professional journey building products and leading teams
          </p>
        </motion.div>

        <div className="relative space-y-8">
          {/* Continuous Line */}
          <div className="absolute left-[28px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-primary/50 via-purple-500/50 to-transparent rounded-full" />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-20"
            >
              {/* Timeline Node */}
              <div className="absolute left-0 top-0 w-14 h-14 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center z-10 shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:border-primary/50 transition-colors">
                <div className="text-2xl filter drop-shadow-lg">{exp.logo}</div>
              </div>

              {/* Card */}
              <div className="glass-card p-6 md:p-8 rounded-2xl border-l-4 border-l-transparent hover:border-l-primary transition-all duration-300 hover:translate-x-2 group">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-lg font-medium text-white/80">
                      {exp.company}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground bg-white/5 px-3 py-1 rounded-full w-fit">
                    <Calendar className="w-4 h-4 text-primary" />
                    {exp.period}
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;