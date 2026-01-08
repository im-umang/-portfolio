import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Award } from 'lucide-react';

const Education = () => {
    const educationData = [
        {
            degree: 'Masters of Computer Applications',
            institution: 'LJ University',
            period: '2024 – 2026',
            description: `• Currently Pursuing Masters with a specialization in advanced computing and software architecture.
• Focusing on full-stack development and cloud technologies.
• Participating in hackathons and tech fests to enhance practical skills with a CGPA of 7.25 (Current SPI)`,
            icon: GraduationCap,
        },
        {
            degree: 'Bachelor of Computer Applications',
            institution: 'Gujarat University, Ahmedabad',
            period: '2021 – 2024',
            description: `• Completed Bachelor's degree with a focus on software engineering, data structures, and web technologies. 
• Actively involved in technical workshops and coding competitions.
• Maintaining a strong academic record with a CGPA of 6.33.`,
            icon: GraduationCap,
        },
        {
            degree: 'Higher Secondary (HSC)',
            institution: 'Muktajivan High School, Ahmedabad',
            period: '2020 – 2021',
            description: `• Completed Higher Secondary education with Science stream (PCM).
• Secured 85% in board examinations.`,
            icon: BookOpen,
        },
        {
            degree: 'Secondary School Certificate (SSC)',
            institution: 'Shree Sarasvati Kunj High School, Ahmedabad',
            period: '2019 – 2020',
            description: `• Completed Secondary education with distinction.
• Active participant in science exhibitions and extracurricular activities.`,
            icon: Award,
        },
    ];

    return (
        <section id="education" className="min-h-screen py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        <span className="text-gradient">Education Journey</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        My academic path and qualifications that have shaped my technical foundation.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative px-4">
                    {/* Central Line for Timeline effect (hidden on mobile) */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-primary/30 to-transparent hidden md:block transform -translate-x-1/2" />

                    {educationData.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className={`relative ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}
                        >
                             <div className="glass-card p-8 rounded-2xl relative overflow-hidden group hover:border-primary/50 transition-all duration-300">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <item.icon className="w-24 h-24 text-primary" />
                                </div>
                                
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 rounded-xl bg-primary/10 text-primary">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <span className="text-sm font-mono text-primary/80 bg-primary/5 px-3 py-1 rounded-full border border-primary/20">
                                        {item.period}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                                    {item.degree}
                                </h3>
                                <h4 className="text-lg text-muted-foreground mb-4 font-medium">
                                    {item.institution}
                                </h4>
                                <p className="text-muted-foreground/80 leading-relaxed whitespace-pre-line text-sm">
                                    {item.description}
                                </p>
                             </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
