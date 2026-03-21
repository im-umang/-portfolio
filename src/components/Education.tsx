import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Award, School } from 'lucide-react';

const educationData = [
    {
        degree: 'Master of Computer Applications',
        short: 'MCA',
        institution: 'LJ University',
        period: '2024 – 2026',
        cgpa: '7.25 SPI',
        status: 'Pursuing',
        description: 'Specializing in advanced computing and software architecture. Focusing on full-stack development, cloud technologies, and participating in hackathons.',
        highlights: ['Advanced Computing', 'Cloud Tech', 'Hackathons', 'Full-Stack Dev'],
        icon: GraduationCap,
        color: 'from-cyan-500/20 to-blue-500/10',
        accentColor: '#00BDFF',
        borderColor: 'rgba(0,189,255,0.25)',
    },
    {
        degree: 'Bachelor of Computer Applications',
        short: 'BCA',
        institution: 'Gujarat University, Ahmedabad',
        period: '2021 – 2024',
        cgpa: '6.33 CGPA',
        status: 'Completed',
        description: 'Focused on software engineering, data structures, and web technologies. Actively participated in technical workshops and coding competitions.',
        highlights: ['Data Structures', 'Software Eng.', 'Web Tech', 'Competitions'],
        icon: GraduationCap,
        color: 'from-violet-500/20 to-purple-500/10',
        accentColor: '#8B5CF6',
        borderColor: 'rgba(139,92,246,0.25)',
    },
    {
        degree: 'Higher Secondary Certificate',
        short: 'HSC',
        institution: 'Muktajivan High School, Ahmedabad',
        period: '2020 – 2021',
        cgpa: '85%',
        status: 'Completed',
        description: 'Science stream (PCM) with strong academic performance. Foundation in Mathematics and Physics.',
        highlights: ['Science (PCM)', '85% Score', 'Mathematics', 'Physics'],
        icon: BookOpen,
        color: 'from-pink-500/20 to-rose-500/10',
        accentColor: '#EC4899',
        borderColor: 'rgba(236,72,153,0.25)',
    },
    {
        degree: 'Secondary School Certificate',
        short: 'SSC',
        institution: 'Shree Sarasvati Kunj High School',
        period: '2019 – 2020',
        cgpa: 'Distinction',
        status: 'Completed',
        description: 'Completed with distinction. Active participant in science exhibitions and extracurricular activities.',
        highlights: ['Distinction', 'Science Expo', 'Extracurricular', 'Leadership'],
        icon: Award,
        color: 'from-amber-500/20 to-orange-500/10',
        accentColor: '#F59E0B',
        borderColor: 'rgba(245,158,11,0.25)',
    },
];

const EducationCard = ({ item, index }: { item: typeof educationData[0]; index: number }) => {
    const Icon = item.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="group relative glass-card rounded-2xl sm:rounded-3xl overflow-hidden cursor-default shimmer"
            style={{ borderColor: item.borderColor }}
        >
            {/* Top gradient strip */}
            <div className={`h-1.5 w-full bg-gradient-to-r ${item.color.replace('/20', '').replace('/10', '')}`}
                style={{ background: `linear-gradient(90deg, ${item.accentColor}, transparent)` }}
            />

            {/* Background glow */}
            <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${item.color}`}
            />

            <div className="relative z-10 p-5 sm:p-7">
                {/* Top Row */}
                <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0"
                            style={{ background: `${item.accentColor}20`, border: `1px solid ${item.accentColor}30` }}
                        >
                            <Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: item.accentColor }} />
                        </div>
                        <div>
                            <div className="text-xs font-mono font-bold uppercase tracking-widest"
                                style={{ color: item.accentColor }}>
                                {item.short}
                            </div>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <span
                                    className="text-[9px] uppercase tracking-wide px-2 py-0.5 rounded-full font-bold"
                                    style={{
                                        background: item.status === 'Pursuing' ? 'rgba(52,211,153,0.15)' : `${item.accentColor}15`,
                                        color: item.status === 'Pursuing' ? '#34D399' : item.accentColor,
                                        border: `1px solid ${item.status === 'Pursuing' ? 'rgba(52,211,153,0.3)' : item.accentColor + '30'}`
                                    }}
                                >
                                    {item.status === 'Pursuing' ? '● Pursuing' : '✓ Completed'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Period badge */}
                    <div className="text-right shrink-0">
                        <div
                            className="text-xs font-mono px-2.5 py-1.5 rounded-lg glass-strong border border-white/10 text-white/60"
                        >
                            {item.period}
                        </div>
                        <div
                            className="text-xs font-bold mt-1.5 px-2 py-1 rounded-lg text-center"
                            style={{ background: `${item.accentColor}20`, color: item.accentColor }}
                        >
                            {item.cgpa}
                        </div>
                    </div>
                </div>

                {/* Content */}
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-white group-hover:text-primary transition-colors mb-1">
                    {item.degree}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-white/50 mb-3">
                    {item.institution}
                </p>
                <p className="text-[11px] sm:text-xs text-white/40 leading-relaxed mb-4">
                    {item.description}
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-1.5">
                    {item.highlights.map((h) => (
                        <span
                            key={h}
                            className="text-[9px] sm:text-[10px] font-medium px-2 py-1 rounded-md"
                            style={{
                                background: `${item.accentColor}10`,
                                color: `${item.accentColor}cc`,
                                border: `1px solid ${item.accentColor}20`,
                            }}
                        >
                            {h}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const Education = () => {
    return (
        <section id="education" className="py-24 sm:py-28 md:py-36 relative">
            <div className="section-glow-secondary" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16 md:mb-20"
                >
                    <div className="section-label mx-auto mb-6">
                        <School className="w-3.5 h-3.5" />
                        <span>Academic Background</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4">
                        <span className="text-gradient">Education</span> Journey
                    </h2>
                    <p className="text-white/50 text-sm sm:text-base max-w-xl mx-auto">
                        My academic path that built my technical foundation and passion for development
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {educationData.map((item, index) => (
                        <EducationCard key={index} item={item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
