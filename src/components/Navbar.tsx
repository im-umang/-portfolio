import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Home',       href: '#home',        id: 'home'        },
  { label: 'Stack',      href: '#stack',        id: 'stack'       },
  { label: 'Projects',   href: '#projects',     id: 'projects'    },
  { label: 'Experience', href: '#experience',   id: 'experience'  },
  { label: 'Education',  href: '#education',    id: 'education'   },
  { label: 'Awards',     href: '#achievements', id: 'achievements'},
  { label: 'Contact',    href: '#contact',     id: 'contact'     },
];

const mobileVariants: Variants = {
  hidden: { opacity: 0, y: -14, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring' as const, stiffness: 340, damping: 28 } },
  exit:    { opacity: 0, y: -10, scale: 0.97, transition: { duration: 0.16, ease: 'easeIn' as const } },
};

const listVariants: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden:  { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { ease: 'easeOut' as const } },
};

interface NavbarProps {
  activeSection?: string;
  onSelectSection?: (id: string) => void;
}

const Navbar = ({ activeSection: activeSectionProp, onSelectSection }: NavbarProps) => {
  const [scrolled,          setScrolled]          = useState(false);
  const [hidden,            setHidden]            = useState(false);
  const [menuOpen,          setMenuOpen]          = useState(false);
  const [scrollActiveSection, setScrollActiveSection] = useState('home');
  const lastScrollY = useRef(0);

  const currentActive = activeSectionProp || scrollActiveSection;

  /* ── Smart hide/show on scroll direction ── */
  useEffect(() => {
    const THRESHOLD = 80;

    const onScroll = () => {
      const y    = window.scrollY;
      const diff = y - lastScrollY.current;

      if (y < THRESHOLD) {
        setHidden(false);
        setScrolled(false);
        lastScrollY.current = y;
        return;
      }

      setScrolled(true);

      if (diff > 4)  { setHidden(true);  if (menuOpen) setMenuOpen(false); }
      if (diff < -4) { setHidden(false); }

      lastScrollY.current = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [menuOpen]);

  /* ── Close menu on resize ── */
  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener('resize', close);
    return () => window.removeEventListener('resize', close);
  }, []);

  /* ── Active section via IntersectionObserver (when in full home view) ── */
  useEffect(() => {
    if (activeSectionProp && activeSectionProp !== 'home') return;

    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setScrollActiveSection(e.target.id); }),
      { threshold: 0.25, rootMargin: '-72px 0px -40% 0px' }
    );
    NAV_LINKS.forEach(({ id }) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [activeSectionProp]);

  /* ── Navigation click handler ── */
  const handleItemClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMenuOpen(false);
    if (onSelectSection) {
      onSelectSection(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* ── Main navbar ── */}
      <motion.header
        initial={{ y: -96, opacity: 0 }}
        animate={{ y: hidden ? '-110%' : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-3"
      >
        <div
          className={cn(
            'w-full max-w-5xl rounded-2xl transition-all duration-500',
            scrolled
              ? 'glass-strong shadow-[0_8px_40px_rgba(0,0,0,0.5)] border border-white/[0.07]'
              : 'bg-transparent border border-transparent'
          )}
          style={{ padding: '8px 18px' }}
        >
          <div className="flex items-center justify-between">

            {/* Branded Theme Logo */}
            <button
              type="button"
              onClick={(e) => handleItemClick(e, 'home')}
              className="flex items-center gap-2.5 sm:gap-3 group select-none text-left cursor-pointer bg-transparent border-none p-0"
              aria-label="Umang Trivedi – Home"
            >
              {/* Glowing Theme Emblem with Official UT Logo */}
              <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-surface/90 border border-primary/30 group-hover:border-primary/70 transition-all duration-300 shadow-[0_0_20px_-3px_rgba(59,91,255,0.35)] group-hover:shadow-[0_0_25px_-2px_rgba(0,189,255,0.6)] overflow-hidden backdrop-blur-md p-1.5">
                {/* Subtle gradient background shimmer */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-transparent to-secondary/20 opacity-80 group-hover:opacity-100 transition-opacity" />
                
                {/* Authentic UT Monogram Logo Image */}
                <img
                  src="/ut-logo.png"
                  alt="Umang Trivedi UT Monogram"
                  className="w-full h-full object-contain relative z-10 transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_2px_8px_rgba(0,189,255,0.4)] filter contrast-125"
                />

                {/* Subtle glowing ring on hover */}
                <div className="absolute -inset-0.5 rounded-xl border border-secondary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>

              {/* Brand Name Typography */}
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="font-display font-extrabold text-sm sm:text-base tracking-tight text-white group-hover:text-white transition-colors">
                    Umang
                  </span>
                  <span className="font-display font-extrabold text-sm sm:text-base tracking-tight text-gradient-blue">
                    Trivedi
                  </span>
                </div>
                <div className="flex items-center gap-1.5 -mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[9px] sm:text-[10px] font-mono tracking-wider uppercase text-white/45 group-hover:text-white/70 transition-colors">
                    Full-Stack Dev
                  </span>
                </div>
              </div>
            </button>

            {/* Desktop Links */}
            <nav className="hidden md:flex items-center" aria-label="Main navigation">
              <ul className="flex items-center gap-0.5">
                {NAV_LINKS.map(link => {
                  const active = currentActive === link.id || (link.id === 'home' && currentActive === 'all');
                  return (
                    <li key={link.id}>
                      <a
                        href={link.href}
                        onClick={e => handleItemClick(e, link.id)}
                        className="relative px-3.5 lg:px-4 py-2 flex items-center group cursor-pointer"
                        aria-current={active ? 'page' : undefined}
                      >
                        {active && (
                          <motion.span
                            layoutId="nav-pill"
                            className="absolute inset-0 rounded-full bg-primary/15 border border-primary/30 shadow-[0_0_12px_hsl(var(--primary)/0.25)]"
                            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                          />
                        )}
                        <span className={cn(
                          'relative z-10 text-xs lg:text-[13px] font-medium tracking-wide transition-colors duration-200',
                          active ? 'text-white font-semibold' : 'text-white/50 group-hover:text-white/90'
                        )}>
                          {link.label}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>

              <motion.button
                type="button"
                onClick={e => handleItemClick(e, 'contact')}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="ml-4 px-5 py-2 rounded-full text-xs lg:text-sm font-bold text-white cursor-pointer"
                style={{ background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 22px hsl(var(--primary)/0.55)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
              >
                Hire Me
              </motion.button>
            </nav>

            {/* Mobile Toggle */}
            <motion.button
              onClick={() => setMenuOpen(p => !p)}
              whileTap={{ scale: 0.88 }}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className="md:hidden p-2.5 rounded-xl glass-strong text-white/70 hover:text-white border border-white/[0.08]"
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen
                  ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.13 }}><X size={18} /></motion.span>
                  : <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.13 }}><Menu size={18} /></motion.span>
                }
              </AnimatePresence>
            </motion.button>

          </div>
        </div>
      </motion.header>

      {/* ── Mobile Dropdown ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            variants={mobileVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-[64px] left-4 right-4 z-40 glass-strong rounded-2xl border border-white/[0.09] overflow-hidden md:hidden shadow-2xl"
            role="dialog"
            aria-label="Navigation menu"
          >
            <motion.ul
              variants={listVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col p-2"
              role="menu"
            >
              {NAV_LINKS.map(link => {
                const active = currentActive === link.id || (link.id === 'home' && currentActive === 'all');
                return (
                  <motion.li key={link.id} variants={itemVariants} role="none">
                    <a
                      href={link.href}
                      onClick={e => handleItemClick(e, link.id)}
                      role="menuitem"
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer',
                        active
                          ? 'text-white bg-primary/20 border border-primary/35 shadow-[0_0_15px_hsl(var(--primary)/0.2)]'
                          : 'text-white/55 hover:text-white hover:bg-white/[0.05]'
                      )}
                    >
                      {active && <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />}
                      {link.label}
                    </a>
                  </motion.li>
                );
              })}

              <motion.li variants={itemVariants} className="mt-2 px-2 pb-2">
                <button
                  type="button"
                  onClick={e => handleItemClick(e, 'contact')}
                  className="flex items-center justify-center py-3 rounded-xl text-sm font-bold text-white w-full cursor-pointer"
                  style={{ background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))' }}
                >
                  Hire Me ✦
                </button>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

