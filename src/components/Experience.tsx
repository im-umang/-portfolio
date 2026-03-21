import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, MapPin, Briefcase, TrendingUp } from 'lucide-react';
import { useRef } from 'react';

const experiences = [
    {
        role: 'Full-Stack Web Development Intern',
        company: 'OctaNet Services Pvt. Ltd.',
        location: 'Remote',
        period: 'June 2024 – July 2024',
        type: 'Internship',
        description: [
            'Developed responsive web applications using React.js, Node.js & MongoDB — improved user engagement by 40%',
            'Built RESTful APIs and integrated third-party services for seamless data flow across microservices',
            'Collaborated with cross-functional teams in an Agile environment, delivering 3 production-ready features ahead of schedule',
            'Implemented modern UI/UX with Tailwind CSS, ensuring mobile-first responsive design',
        ],
        skills: ['React.js', 'Node.js', 'MongoDB', 'REST APIs', 'Tailwind CSS', 'Agile'],
        color: 'from-blue-600 to-cyan-500',
        accentColor: 'hsl(var(--primary))',
        emoji: '🚀',
        impact: '+40% Engagement',
    },
    {
        role: 'Technical Instructor & Operations Lead',
        company: 'BECIL Training Centre',
        location: 'Ahmedabad, India',
        period: 'Aug 2021 – Dec 2023',
        type: 'Full-time',
        description: [
            'Led technical training programs for 200+ students in web development fundamentals and modern JavaScript',
            'Managed end-to-end operations: student admissions, batch scheduling, and performance tracking',
            'Developed curriculum materials & hands-on projects that boosted student placement rate by 35%',
            'Mentored students from basics to job-ready skill levels through strong personal guidance',
        ],
        skills: ['JavaScript', 'HTML/CSS', 'Teaching', 'Leadership', 'Operations', 'Curriculum Design'],
        color: 'from-indigo-500 to-violet-600',
        accentColor: 'hsl(var(--secondary))',
        emoji: '🎓',
        impact: '+35% Placement Rate',
    },
];

const ExperienceCard = ({ exp, index }: { exp: typeof experiences[0]; index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative pl-16 sm:pl-20 md:pl-24"
        >
            {/* Timeline Node */}
            <div className="absolute left-0 top-0 flex flex-col items-center">
                <motion.div
                    whileHover={{ scale: 1.15 }}
                    className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${exp.color} flex items-center justify-center text-lg sm:text-xl shadow-lg z-10`}
                    style={{ boxShadow: `0 0 24px ${exp.accentColor}` }}
                >
                    {exp.emoji}
                    {/* Ping ring */}
                    <div
                        className="absolute inset-0 rounded-2xl animate-ping opacity-20"
                        style={{ background: `linear-gradient(135deg, ${exp.accentColor}, transparent)` }}
                    />
                </motion.div>
            </div>

            {/* Card */}
            <motion.div
                whileHover={{ x: 6 }}
                transition={{ duration: 0.3 }}
                className="glass-card rounded-2xl sm:rounded-3xl overflow-hidden group cursor-default"
                style={{
                    borderLeft: `3px solid ${exp.accentColor}`,
                }}
            >
                {/* Top accent line */}
                <div className={`h-1 w-full bg-gradient-to-r ${exp.color} opacity-60`} />

                <div className="p-5 sm:p-6 md:p-8">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1.5">
                                <span className="text-[9px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full border"
                                    style={{ color: exp.accentColor, borderColor: exp.accentColor, background: `${exp.accentColor}15` }}>
                                    {exp.type}
                                </span>
                            </div>
                            <h3 className="text-base sm:text-lg md:text-xl font-bold text-white group-hover:text-primary transition-colors mb-1">
                                {exp.role}
                            </h3>
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-white/60">
                                <span className="flex items-center gap-1 font-medium text-white/80">
                                    <Briefcase className="w-3.5 h-3.5" style={{ color: exp.accentColor }} />
                                    {exp.company}
                                </span>
                                <span className="text-white/30">•</span>
                                <span className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {exp.location}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-row sm:flex-col items-start sm:items-end gap-2 shrink-0">
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-strong text-xs font-mono text-white/70 border border-white/10">
                                <Calendar className="w-3.5 h-3.5 text-primary" />
                                {exp.period}
                            </div>
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                                style={{ background: `${exp.accentColor}20`, color: exp.accentColor, border: `1px solid ${exp.accentColor}40` }}>
                                <TrendingUp className="w-3 h-3" />
                                {exp.impact}
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <ul className="space-y-2.5 mb-5">
                        {exp.description.map((point, i) => (
                            <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 + i * 0.07 }}
                                className="text-xs sm:text-sm text-white/60 flex items-start gap-2.5 leading-relaxed"
                            >
                                <span
                                    className="mt-[5px] w-1.5 h-1.5 rounded-full flex-shrink-0"
                                    style={{ background: exp.accentColor }}
                                />
                                {point}
                            </motion.li>
                        ))}
                    </ul>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/8">
                        {exp.skills.map((skill) => (
                            <span
                                key={skill}
                                className="px-2.5 py-1 text-[10px] sm:text-xs font-medium rounded-full"
                                style={{
                                    background: `${exp.accentColor}15`,
                                    color: exp.accentColor,
                                    border: `1px solid ${exp.accentColor}30`,
                                }}
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const Experience = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
    const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    return (
        <section ref={sectionRef} className="py-24 sm:py-28 md:py-36 px-4 sm:px-6 relative" id="experience">
            <div className="section-glow-primary" />
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16 md:mb-20"
                >
                    <div className="section-label mx-auto mb-6">
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>Work History</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4">
                        Work <span className="text-gradient">Experience</span>
                    </h2>
                    <p className="text-white/50 text-sm sm:text-base">
                        Building impactful solutions and leading teams to success
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Animated vertical line */}
                    <div className="absolute left-[22px] sm:left-[26px] top-0 bottom-0 w-[2px] bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            className="w-full timeline-line rounded-full"
                            style={{ height: lineHeight }}
                        />
                    </div>

                    <div className="space-y-8 sm:space-y-10 md:space-y-12">
                        {experiences.map((exp, index) => (
                            <ExperienceCard key={index} exp={exp} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;