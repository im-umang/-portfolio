import { motion, type Variants } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { sound } from '@/lib/sound';

interface FooterProps {
  onSelectSection?: (id: string) => void;
}

const ROOMS = [
  { num: '01', label: 'Home',       path: '/'           },
  { num: '02', label: 'Stack',      path: '/stack'      },
  { num: '03', label: 'Projects',   path: '/projects'   },
  { num: '04', label: 'Experience', path: '/experience' },
  { num: '05', label: 'Education',  path: '/education'  },
  { num: '06', label: 'Awards',     path: '/awards'     },
  { num: '07', label: 'Reviews',    path: '/reviews'    },
  { num: '08', label: 'Contact',    path: '/contact'    },
];

const CONNECTIONS = [
  { label: 'Start a conversation', href: 'mailto:utrivedi80@gmail.com', isExternal: true  },
  { label: 'Resume',               href: '/resume/Umang_Trivedi_Resume.pdf', isDownload: true },
  { label: 'GitHub',               href: 'https://github.com/im-umang',  isExternal: true  },
  { label: 'LinkedIn',             href: 'https://www.linkedin.com/in/umang-trivedi31101', isExternal: true },
  { label: 'WhatsApp',             href: 'https://wa.me/916352296575',   isExternal: true  },
];

const Footer = ({ onSelectSection }: FooterProps) => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const handleNav = (path: string, id: string) => {
    sound.playClick();
    if (onSelectSection) {
      onSelectSection(id);
    }
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const containerVariants: Variants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants: Variants = {
    hidden:  { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
  };

  return (
    <footer className="relative overflow-hidden pt-10 sm:pt-14 pb-8 px-4 sm:px-6 lg:px-8 border-t border-white/[0.07]" id="footer">
      {/* Ambient Theme Background Glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 cyber-grid-bg opacity-30" />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] rounded-full blur-[140px] opacity-15"
          style={{ background: 'radial-gradient(ellipse, hsl(var(--secondary) / 0.7), hsl(var(--primary) / 0.5), transparent)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Main 3-Column Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 py-8 sm:py-12">
            {/* Column 1: Brand Info */}
            <motion.div variants={itemVariants} className="md:col-span-6 lg:col-span-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-surface/90 border border-primary/30 shadow-[0_0_20px_-3px_rgba(59,91,255,0.35)] p-1.5 backdrop-blur-md overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-transparent to-secondary/20 opacity-80" />
                    <img
                      src="/ut-logo.png"
                      alt="Umang Trivedi UT Monogram"
                      className="w-full h-full object-contain relative z-10 filter contrast-125 drop-shadow-[0_2px_8px_rgba(0,189,255,0.4)]"
                    />
                  </div>
                  <div>
                    <h3 className="flex items-center gap-2 font-display font-extrabold text-2xl sm:text-3xl tracking-tight">
                      <span className="text-white">Umang</span>
                      <span className="text-gradient-blue">Trivedi</span>
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.18em] text-white/55 font-semibold">
                        Full-Stack Dev • MERN Specialist
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-white/40 leading-relaxed max-w-md">
                  Personal engineering portfolio representing scalable full-stack applications, speech AI systems, and client software solutions.
                </p>
              </div>
            </motion.div>

            {/* Column 2: Rooms (Navigation) */}
            <motion.div variants={itemVariants} className="md:col-span-3 lg:col-span-3">
              <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-white/45 mb-6 font-semibold">
                DEDICATED PAGES
              </p>
              <ul className="space-y-3">
                {ROOMS.map(room => (
                  <li key={room.num}>
                    <button
                      type="button"
                      onClick={() => handleNav(room.path, room.label.toLowerCase())}
                      className="flex items-center gap-3 text-xs sm:text-sm text-white/60 hover:text-white group transition-colors cursor-pointer bg-transparent border-none p-0 text-left"
                    >
                      <span className="font-mono text-[11px] text-white/30 group-hover:text-cyan-400 transition-colors w-5">
                        {room.num}
                      </span>
                      <span className="group-hover:translate-x-1.5 transition-transform duration-200">
                        {room.label}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Column 3: Connection Links & Copyright */}
            <motion.div variants={itemVariants} className="md:col-span-3 lg:col-span-3 flex flex-col justify-between">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-white/45 mb-6 font-semibold">
                  CONNECTION
                </p>
                <ul className="space-y-3">
                  {CONNECTIONS.map(conn => (
                    <li key={conn.label}>
                      <a
                        href={conn.href}
                        target={conn.isExternal ? '_blank' : undefined}
                        rel={conn.isExternal ? 'noopener noreferrer' : undefined}
                        download={conn.isDownload ? true : undefined}
                        className="inline-flex items-center text-xs sm:text-sm text-white/60 hover:text-white group transition-colors"
                      >
                        <span className="group-hover:text-cyan-400 group-hover:translate-x-1 transition-all duration-200">
                          {conn.label}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-[11px] font-mono text-white/30 uppercase tracking-widest mt-8 md:mt-12">
                © {currentYear} UMANG TRIVEDI
              </p>
            </motion.div>
          </div>

          {/* Bottom Sub-Bar */}
          <div className="w-full h-px bg-white/[0.07]" />

          <motion.div
            variants={itemVariants}
            className="py-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40 tracking-wider"
          >
            <div className="text-center sm:text-left">
              AHMEDABAD, GUJARAT, INDIA • FULL-STACK & WEB APPLICATIONS
            </div>

            <div className="text-center sm:text-right text-[11px] text-white/30">
              DESIGNED & ENGINEERED FOR SCALABLE WEB
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;