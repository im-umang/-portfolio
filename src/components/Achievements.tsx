import { motion } from 'framer-motion';
import { ExternalLink, Trophy, BookOpen, Sparkles, Star } from 'lucide-react';

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
        link: '/certificates/CodeTantra_Programming_in_C_Umang_Trivedi.pdf',
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            whileHover={{ y: -4, scale: 1.005 }}
            whileTap={{ scale: 0.99 }}
            className="group relative block rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer border border-cyan-500/30 bg-gradient-to-br from-cyan-950/20 via-primary/5 to-black/40 p-6 sm:p-8 md:p-9 shadow-[0_8px_32px_rgba(0,189,255,0.08)] hover:border-cyan-400/50 transition-all duration-300"
            aria-label={`View ${cert.title} certificate`}
        >
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

            <div className="flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-7 relative z-10">
                {/* Trophy Insignia */}
                <div className="flex-shrink-0">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center shadow-[0_0_20px_rgba(0,189,255,0.25)] group-hover:scale-105 transition-transform duration-300">
                        <Trophy className="w-7 h-7 text-cyan-400" />
                    </div>
                </div>

                <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3">
                        <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 text-[11px] font-mono font-semibold tracking-wider rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-400/30">
                                24-Hour Hackathon
                            </span>
                            {cert.date && (
                                <span className="text-xs text-white/50 font-mono">{cert.date}</span>
                            )}
                        </div>

                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-400/20">
                            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                            Official Distinction
                        </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white group-hover:text-cyan-300 transition-colors mb-2 tracking-tight">
                        {cert.title}
                    </h3>
                    <p className="text-sm sm:text-base font-medium text-white/70 mb-3">{cert.issuer}</p>
                    {cert.description && (
                        <p className="text-xs sm:text-sm text-white/55 leading-relaxed mb-5 font-light">{cert.description}</p>
                    )}

                    <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-cyan-400 group-hover:text-cyan-300 group-hover:gap-2.5 transition-all">
                        <span>View Verified Certificate</span>
                        <ExternalLink className="w-4 h-4" />
                    </div>
                </div>
            </div>
        </motion.a>
    );
};

// Regular Certification Card
const CertCard = ({ cert, index }: { cert: Certificate; index: number }) => {
    return (
        <motion.a
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            whileHover={{ y: -4, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="group relative block rounded-2xl border border-white/[0.08] hover:border-cyan-500/35 bg-white/[0.02] hover:bg-white/[0.04] p-5 sm:p-6 transition-all duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgba(0,189,255,0.08)] cursor-pointer"
            aria-label={`View ${cert.title}`}
        >
            <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-400/25">
                    <BookOpen className="w-5 h-5 text-cyan-400" />
                </div>
                <span className="text-[10px] font-mono uppercase font-semibold tracking-wider px-2.5 py-1 rounded-full bg-white/[0.04] text-white/60 border border-white/10">
                    Certification
                </span>
            </div>

            <h3 className="font-display font-bold text-base text-white group-hover:text-cyan-300 transition-colors mb-1.5 leading-snug tracking-tight">
                {cert.title}
            </h3>

            <div className="flex flex-wrap items-center gap-2 text-xs text-white/50 mb-3">
                <span className="font-medium text-white/75">{cert.issuer}</span>
                {cert.date && (
                    <>
                        <span className="text-white/20">•</span>
                        <span className="font-mono text-[11px]">{cert.date}</span>
                    </>
                )}
            </div>

            {cert.description && (
                <p className="text-xs text-white/50 leading-relaxed mb-4 font-light">{cert.description}</p>
            )}

            <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors pt-3 border-t border-white/[0.06]">
                <span>Verify Credential</span>
                <ExternalLink className="w-3.5 h-3.5" />
            </div>
        </motion.a>
    );
};

const Achievements = () => {
    const featuredCert = certificates.find(c => c.featured);
    const otherCerts = certificates.filter(c => !c.featured);

    return (
        <section className="pt-20 sm:pt-24 pb-16 sm:pb-20 px-4 sm:px-6 relative overflow-hidden" id="achievements">
            {/* Background Ambience */}
            <div className="section-glow-accent" aria-hidden="true" />
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[550px] h-[350px] rounded-full bg-cyan-500/10 blur-[130px] pointer-events-none" aria-hidden="true" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <div className="section-label mx-auto mb-4">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Honors & Certifications</span>
                    </div>
                    <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-3 tracking-tight text-white">
                        Learning & <span className="text-gradient">Recognition</span>
                    </h2>
                    <p className="text-white/55 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
                        Continuous skill validation through hackathon execution and professional engineering courses.
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
