import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 6352296575',
      href: 'tel:+916352296575',
      ariaLabel: 'Call +91 6352296575',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'utrivedi80@gmail.com',
      href: 'mailto:utrivedi80@gmail.com',
      ariaLabel: 'Send email to utrivedi80@gmail.com',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Ahmedabad, India',
      href: 'https://www.google.com/maps/search/Ahmedabad,+India',
      ariaLabel: 'View Ahmedabad, India on Google Maps',
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/im-umang',
      label: 'GitHub',
      hoverColor: 'hover:text-white',
    },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/umang-trivedi31101',
      label: 'LinkedIn',
      hoverColor: 'hover:text-[#0A66C2]',
    },
    {
      icon: FaWhatsapp,
      href: 'https://wa.me/916352296575',
      label: 'WhatsApp',
      hoverColor: 'hover:text-[#25D366]',
    },
  ];

  return (
    <footer className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 border-t border-border" id="contact">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            Let's Build Something <span className="text-gradient">Amazing</span>
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm md:text-base max-w-xl mx-auto mb-5 sm:mb-6 md:mb-8 px-2">
            I'm always excited to collaborate on new projects. Whether you have a question or just want to say hi, feel free to reach out!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto"
        >
          {contactInfo.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              target={item.label === 'Location' ? '_blank' : undefined}
              rel={item.label === 'Location' ? 'noopener noreferrer' : undefined}
              aria-label={item.ariaLabel}
              whileHover={{ y: -8, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="glass-card p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl text-center group cursor-pointer hover:border-primary/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all duration-300 block"
            >
              <div className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-primary/10 text-primary mb-2 sm:mb-3 md:mb-4 group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300">
                <item.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </div>
              <h3 className="text-[10px] sm:text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1 sm:mb-2">
                {item.label}
              </h3>
              <p className="text-xs sm:text-sm md:text-base font-medium text-white group-hover:text-primary transition-colors duration-300 break-all">
                {item.value}
              </p>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12"
        >
          <a
            href="mailto:utrivedi80@gmail.com"
            className="inline-flex items-center gap-2 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-full bg-primary text-primary-foreground font-semibold text-xs sm:text-sm md:text-base hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all duration-300 hover:scale-105"
          >
            <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            Get in Touch
          </a>
          <a
            href="https://wa.me/916352296575"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-full bg-[#25D366] text-white font-semibold text-xs sm:text-sm md:text-base hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] transition-all duration-300 hover:scale-105"
          >
            <FaWhatsapp className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            Chat on WhatsApp
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-10 md:mb-12"
        >
          {socialLinks.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2 sm:p-2.5 md:p-3 rounded-full glass transition-all duration-300 ${social.hoverColor}`}
              aria-label={social.label}
            >
              <social.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </motion.a>
          ))}
        </motion.div>

        <div className="text-center text-[10px] sm:text-xs md:text-sm text-muted-foreground">
          <p>© {currentYear} Umang Trivedi. Crafted with passion and code.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;