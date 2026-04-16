import { motion, type Variants } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, MapPin, ArrowUpRight, Heart, Code2 } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const contactInfo = [
    {
        icon: Phone,
        label: 'Phone',
        value: '+91 6352296575',
        href: 'tel:+916352296575',
        ariaLabel: 'Call +91 6352296575',
        color: 'hsl(var(--secondary))',
        bg: 'hsl(var(--secondary) / 0.1)',
        border: 'hsl(var(--secondary) / 0.25)',
    },
    {
        icon: Mail,
        label: 'Email',
        value: 'utrivedi80@gmail.com',
        href: 'mailto:utrivedi80@gmail.com',
        ariaLabel: 'Send email',
        color: 'hsl(var(--primary))',
        bg: 'hsl(var(--primary) / 0.1)',
        border: 'hsl(var(--primary) / 0.25)',
    },
    {
        icon: MapPin,
        label: 'Location',
        value: 'Ahmedabad, India',
        href: 'https://www.google.com/maps/search/Ahmedabad,+India',
        ariaLabel: 'Location on Google Maps',
        color: 'hsl(var(--accent))',
        bg: 'hsl(var(--accent) / 0.1)',
        border: 'hsl(var(--accent) / 0.25)',
    },
];

const socialLinks = [
    { icon: Github, href: 'https://github.com/im-umang', label: 'GitHub', color: 'hover:text-white hover:border-white/40' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/umang-trivedi31101', label: 'LinkedIn', color: 'hover:text-[#0A66C2] hover:border-[#0A66C2]/40' },
    { icon: FaWhatsapp, href: 'https://wa.me/916352296575', label: 'WhatsApp', color: 'hover:text-[#25D366] hover:border-[#25D366]/40' },
];

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    return (
        <footer className="relative overflow-hidden pt-24 sm:pt-28 md:pt-36 pb-10 px-4 sm:px-6" id="contact">
            {/* Ambient background glows */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[100px] opacity-15"
                    style={{ background: 'radial-gradient(ellipse, rgba(0,189,255,0.5), rgba(139,92,246,0.3), transparent)' }}
                />
            </div>

            {/* Top Section Divider */}
            <div className="section-divider mb-16 sm:mb-20" />

            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {/* Header */}
                    <motion.div variants={itemVariants} className="text-center mb-14 sm:mb-16 md:mb-20">
                        <div className="section-label mx-auto mb-6">
                            <span>📬</span>
                            <span>Get In Touch</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-black mb-4 sm:mb-6 leading-tight">
                            Let's Build Something
                            <br />
                            <span className="text-gradient">Amazing Together</span>
                        </h2>
                        <p className="text-white/50 text-sm sm:text-base md:text-lg max-w-lg mx-auto leading-relaxed">
                            I'm always excited to collaborate on new projects.
                            Whether you have an idea or just want to say hi — let's connect!
                        </p>
                    </motion.div>

                    {/* Contact Cards */}
                    <motion.div
                        variants={itemVariants}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-12 sm:mb-14 max-w-3xl mx-auto"
                    >
                        {contactInfo.map((item) => (
                            <motion.a
                                key={item.label}
                                href={item.href}
                                target={item.label === 'Location' ? '_blank' : undefined}
                                rel={item.label === 'Location' ? 'noopener noreferrer' : undefined}
                                aria-label={item.ariaLabel}
                                whileHover={{ y: -10, scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="group glass-card rounded-2xl p-5 sm:p-6 text-center block cursor-pointer relative overflow-hidden shimmer"
                                style={{ borderColor: item.border }}
                            >
                                {/* Hover glow bg */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl"
                                    style={{ background: item.bg }}
                                />

                                <div className="relative z-10">
                                    <div
                                        className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl mb-4 mx-auto transition-all duration-300 group-hover:shadow-lg"
                                        style={{
                                            background: item.bg,
                                            border: `1px solid ${item.border}`,
                                            boxShadow: `0 0 0 0 ${item.color}`,
                                        }}
                                    >
                                        <item.icon
                                            className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300"
                                            style={{ color: item.color }}
                                        />
                                    </div>
                                    <p className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold text-white/40 mb-1.5">
                                        {item.label}
                                    </p>
                                    <p className="text-xs sm:text-sm font-semibold text-white group-hover:text-white transition-colors break-all">
                                        {item.value}
                                    </p>
                                </div>
                            </motion.a>
                        ))}
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-14"
                    >
                        <motion.a
                            href="mailto:utrivedi80@gmail.com"
                            whileHover={{ scale: 1.06, boxShadow: '0 0 35px rgba(0,189,255,0.6)' }}
                            whileTap={{ scale: 0.96 }}
                            className="inline-flex items-center gap-2.5 px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-primary text-black font-bold text-sm sm:text-base transition-all w-full sm:w-auto justify-center"
                        >
                            <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                            Send Me an Email
                            <ArrowUpRight className="w-4 h-4" />
                        </motion.a>

                        <motion.a
                            href="https://wa.me/916352296575"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.06, boxShadow: '0 0 35px rgba(37,211,102,0.5)' }}
                            whileTap={{ scale: 0.96 }}
                            className="inline-flex items-center gap-2.5 px-7 sm:px-9 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base transition-all w-full sm:w-auto justify-center text-white"
                            style={{ background: '#25D366' }}
                        >
                            <FaWhatsapp className="w-4 h-4 sm:w-5 sm:h-5" />
                            Chat on WhatsApp
                        </motion.a>

                        <motion.a
                            href="/resume/Umang_Trivedi_Resume.pdf"
                            download="Umang_Trivedi_Resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.06 }}
                            whileTap={{ scale: 0.96 }}
                            className="inline-flex items-center gap-2.5 px-7 sm:px-9 py-3.5 sm:py-4 rounded-full glass-strong border border-white/15 text-white font-bold text-sm sm:text-base transition-all hover:border-white/30 w-full sm:w-auto justify-center"
                        >
                            Download CV
                        </motion.a>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        variants={itemVariants}
                        className="flex items-center justify-center gap-4 sm:gap-5 mb-16 sm:mb-20"
                    >
                        {socialLinks.map((social) => (
                            <motion.a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.2, y: -5 }}
                                whileTap={{ scale: 0.92 }}
                                className={`p-3 sm:p-4 rounded-xl glass-strong border border-white/10 text-white/50 transition-all duration-300 ${social.color}`}
                                aria-label={social.label}
                            >
                                <social.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                            </motion.a>
                        ))}
                    </motion.div>

                    {/* Divider */}
                    <div className="section-divider mb-8" />

                    {/* Bottom Bar */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-white/30"
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                                <Code2 className="w-3.5 h-3.5 text-primary" />
                            </div>
                            <span className="font-semibold text-white/50">Umang Trivedi</span>
                        </div>

                        <p className="flex items-center gap-1.5 text-center">
                            © {currentYear} — Crafted with
                            <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400 animate-pulse" />
                            by Umang Trivedi
                        </p>

                        <div className="flex items-center gap-1.5">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                            </span>
                            <span className="text-emerald-400 font-medium">Available for hire</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;