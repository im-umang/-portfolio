import { motion } from 'framer-motion';
import { Award, ExternalLink, Trophy, BookOpen } from 'lucide-react';

interface Certificate {
    title: string;
    issuer: string;
    date?: string;
    type: 'hackathon' | 'certification';
    link: string;
    featured?: boolean;
}

const certificates: Certificate[] = [
    {
        title: "Odoo × Adani University Hackathon '26",
        issuer: 'Odoo & Adani University',
        date: '24-25 January 2026',
        type: 'hackathon',
        link: '/certificates/Odoo_Hackathon_2026_Umang_Trivedi.pdf',
        featured: true,
    },
    {
        title: 'Introduction to Software Engineering',
        issuer: 'IBM',
        type: 'certification',
        link: 'https://www.coursera.org/account/accomplishments/verify/UM37W79OM5A1',
    },
    {
        title: 'Programming in C',
        issuer: 'CodeTantra',
        date: 'May 2025',
        type: 'certification',
        link: '/certificates/CodeTantra_Programming_in_C_Umang_Trivedi.pdf',
    },
    {
        title: 'Generative AI: Fundamentals',
        issuer: 'IBM',
        type: 'certification',
        link: 'https://www.coursera.org/account/accomplishments/verify/GYMS0P4RL5YF',
    },
];

const CertificateCard = ({ cert, index }: { cert: Certificate; index: number }) => {
    return (
        <motion.a
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`group relative block rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${cert.featured
                    ? 'bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border-2 border-primary/40 hover:border-primary/70 hover:shadow-[0_0_40px_rgba(6,182,212,0.2)]'
                    : 'bg-white/[0.03] border border-white/10 hover:border-white/25 hover:bg-white/[0.06]'
                }`}
            aria-label={`View ${cert.title} certificate`}
        >
            {cert.featured && (
                <div className="absolute top-0 right-0">
                    <div className="bg-primary text-black text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-lg">
                        Recent Achievement
                    </div>
                </div>
            )}

            <div className="p-4 sm:p-5 md:p-6">
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl ${cert.type === 'hackathon'
                            ? 'bg-primary/20 text-primary'
                            : 'bg-violet-500/20 text-violet-400'
                        }`}>
                        {cert.type === 'hackathon' ? (
                            <Trophy className="w-5 h-5 sm:w-6 sm:h-6" />
                        ) : (
                            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
                        )}
                    </div>
                    <span className={`px-2 py-1 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider rounded-full ${cert.type === 'hackathon'
                            ? 'bg-primary/20 text-primary border border-primary/30'
                            : 'bg-violet-500/20 text-violet-400 border border-violet-500/30'
                        }`}>
                        {cert.type === 'hackathon' ? 'Hackathon' : 'Certification'}
                    </span>
                </div>

                <h3 className={`font-bold mb-2 group-hover:text-primary transition-colors ${cert.featured ? 'text-lg sm:text-xl md:text-2xl' : 'text-base sm:text-lg'
                    }`}>
                    {cert.title}
                </h3>

                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-white/60 mb-3 sm:mb-4">
                    <span className="font-medium">{cert.issuer}</span>
                    {cert.date && (
                        <>
                            <span className="w-1 h-1 rounded-full bg-white/40" />
                            <span>{cert.date}</span>
                        </>
                    )}
                </div>

                <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-white/50 group-hover:text-primary transition-colors">
                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
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
        <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 relative" id="achievements">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10 sm:mb-14 md:mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/5 border border-white/10 mb-4 sm:mb-6">
                        <Award className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                        <span className="text-xs sm:text-sm font-medium text-white/70">Achievements & Certifications</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
                        Learning & <span className="text-gradient">Recognition</span>
                    </h2>
                    <p className="text-white/60 text-sm sm:text-base md:text-lg max-w-xl mx-auto px-2">
                        Continuous learning and real-world achievements
                    </p>
                </motion.div>

                {featuredCert && (
                    <div className="mb-6 sm:mb-8">
                        <CertificateCard cert={featuredCert} index={0} />
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {otherCerts.map((cert, index) => (
                        <CertificateCard key={cert.title} cert={cert} index={index + 1} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Achievements;
