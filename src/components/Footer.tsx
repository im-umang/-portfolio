import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-24 px-4 sm:px-6 border-t border-border" id="contact">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Let's Build Something <span className="text-gradient">Amazing</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            I'm always excited to collaborate on new projects. Whether you have a question or just want to say hi, feel free to reach out!
          </p>
          <a
            href="http://mailto:utrivedi180@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:glow-cyan transition-all duration-300"
          >
            <Mail className="w-5 h-5" />
            Get in Touch
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-6 mb-12"
        >
          <a
            href="https://github.com/im-umang"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full glass hover:glow-cyan transition-all duration-300"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/umang-trivedi31101"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full glass hover:glow-cyan transition-all duration-300"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full glass hover:glow-cyan transition-all duration-300"
            aria-label="Twitter"
          >
            <Twitter className="w-5 h-5" />
          </a>
        </motion.div>

        {/* Copyright */}
        <div className="text-center text-sm text-muted-foreground">
          <p>© {currentYear} Umang Trivedi. Crafted with passion and code.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;