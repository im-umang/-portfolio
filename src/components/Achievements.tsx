import { motion } from 'framer-motion';
import { Award, ExternalLink, Trophy, BookOpen, Sparkles, Star } from 'lucide-react';

interface Certificate {
    title: string;
    issuer: string;
    date?: string;
    type: 'hackathon' | 'certification';
    link: string;
    featured?: boolean;
    description?: string;
}

const certificates: Certificate[] = [
    {
        title: "Odoo × Adani University Hackathon '26",
        issuer: 'Odoo & Adani University',
        date: '24-25 January 2026',
        type: 'hackathon',
        link: '/certificates/Odoo_Hackathon_2026_Umang_Trivedi.pdf',
        featured: true,
        description: 'Competed in a 24-hour hackathon building GearGuard — a full-stack asset management system using React.js, Node.js & MySQL.',
    },
    {
        title: 'Introduction to Software Engineering',
        issuer: 'IBM (via Coursera)',
        type: 'certification',
        link: 'https://www.coursera.org/account/accomplishments/certificate/UM37W79OM5A1',
        description: 'Comprehensive foundation in software development lifecycle, engineering principles, and best practices.',
    },
    {
        title: 'Programming in C',
        issuer: 'CodeTantra',
        date: 'May 2025',
        type: 'certification',
        link: 'https://ljku.codetantra.com/cert/certificate.jsp?certId=CT1827-uqhl00D-cdw',
        description: 'Advanced C programming concepts including pointers, memory management, and data structures.',
    },
    {
        title: 'Generative AI: Fundamentals',
        issuer: 'IBM (via Coursera)',
        type: 'certification',
        link: 'https://www.coursera.org/account/accomplishments/specialization/certificate/RROYQPAIJNYJ',
        description: 'Specialization covering generative AI concepts, LLMs, prompt engineering, and practical AI applications.',
    },
];

// Featured (Hackathon) Card
const FeaturedCard = ({ cert }: { cert: Certificate }) => {
    return (
        <motion.a
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="group relative block rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shimmer"
            style={{
                background: 'linear-gradient(135deg, rgba(0,189,255,0.12) 0%, rgba(139,92,246,0.08) 50%, rgba(0,0,0,0.3) 100%)',
                border: '1px solid rgba(0,189,255,0.3)',
            }}
            aria-label={`View ${cert.title} certificate`}
        >
            {/* Animated border gradient */}
            <div className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'linear-gradient(135deg, rgba(0,189,255,0.08), rgba(139,92,246,0.08))' }}
            />

            {/* Top line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />

            {/* Recent badge */}
            <div className="absolute top-0 right-0 z-10">
                <div className="bg-primary text-black text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-bl-xl">
                    🏆 Hackathon Achievement
                </div>
            </div>

            <div className="relative z-10 p-6 sm:p-8 md:p-10">
                <div className="flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-8">
                    {/* Trophy Icon */}
                    <motion.div
                        animate={{ rotate: [0, -8, 8, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        className="flex-shrink-0"
                    >
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary/15 border-2 border-primary/30 flex items-center justify-center shadow-[0_0_30px_rgba(0,189,255,0.3)]">
                            <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                        </div>
                    </motion.div>

                    <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                            <span className="px-3 py-1 text-[9px] uppercase font-bold tracking-widest rounded-full bg-primary/15 text-primary border border-primary/30">
                                Hackathon
                            </span>
                            {cert.date && (
                                <span className="text-xs text-white/40 font-mono">{cert.date}</span>
                            )}
                            <div className="flex items-center gap-1 ml-auto">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                ))}
                            </div>
                        </div>

                        <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white group-hover:text-primary transition-colors mb-2">
                            {cert.title}
                        </h3>
                        <p className="text-sm sm:text-base font-semibold text-white/60 mb-3">{cert.issuer}</p>
                        {cert.description && (
                            <p className="text-xs sm:text-sm text-white/40 leading-relaxed mb-5">{cert.description}</p>
                        )}

                        <div className="flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                            <ExternalLink className="w-4 h-4" />
                            <span>View Certificate</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom glow */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        </motion.a>
    );
};

// Regular Certification Card
const CertCard = ({ cert, index }: { cert: Certificate; index: number }) => {
    const isHackathon = cert.type === 'hackathon';
    const accentColor = isHackathon ? 'rgba(0,189,255,1)' : 'rgba(139,92,246,1)';
    const accentBg = isHackathon ? 'rgba(0,189,255,0.1)' : 'rgba(139,92,246,0.1)';

    return (
        <motion.a
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
            whileTap={{ scale: 0.98 }}
            className="group relative block glass-card rounded-2xl overflow-hidden cursor-pointer shimmer"
            aria-label={`View ${cert.title}`}
        >
            {/* Top accent */}
            <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }} />

            <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between mb-4">
                    <div
                        className="p-2.5 sm:p-3 rounded-xl"
                        style={{ background: accentBg, border: `1px solid ${accentColor}30` }}
                    >
                        <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: accentColor }} />
                    </div>
                    <span
                        className="text-[9px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full"
                        style={{ background: accentBg, color: accentColor, border: `1px solid ${accentColor}30` }}
                    >
                        Certification
                    </span>
                </div>

                <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-primary transition-colors mb-1.5 leading-snug">
                    {cert.title}
                </h3>

                <div className="flex flex-wrap items-center gap-2 text-xs text-white/50 mb-3">
                    <span className="font-medium text-white/70">{cert.issuer}</span>
                    {cert.date && (
                        <>
                            <span className="w-1 h-1 rounded-full bg-white/30" />
                            <span>{cert.date}</span>
                        </>
                    )}
                </div>

                {cert.description && (
                    <p className="text-[11px] text-white/35 leading-relaxed mb-4">{cert.description}</p>
                )}

                <div
                    className="flex items-center gap-1.5 text-xs font-medium transition-colors"
                    style={{ color: accentColor }}
                >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View Certificate</span>
                </div>
            </div>
        </motion.a>
    );
};

const Achievements = () => {
    const featuredCert = certificates.find(c => c.featured);
    const otherCerts = certificates.filter(c => !c.featured);

    return (
        <section className="py-24 sm:py-28 md:py-36 px-4 sm:px-6 relative" id="achievements">
            <div className="section-glow-accent" />
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16 md:mb-20"
                >
                    <div className="section-label mx-auto mb-6">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Achievements & Certs</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4">
                        Learning &{' '}
                        <span className="text-gradient">Recognition</span>
                    </h2>
                    <p className="text-white/50 text-sm sm:text-base max-w-xl mx-auto">
                        Continuous growth through real-world challenges and certified learning
                    </p>
                </motion.div>

                {/* Featured Hackathon */}
                {featuredCert && (
                    <div className="mb-8 sm:mb-10">
                        <FeaturedCard cert={featuredCert} />
                    </div>
                )}

                {/* Other Certs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {otherCerts.map((cert, index) => (
                        <CertCard key={cert.title} cert={cert} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Achievements;
