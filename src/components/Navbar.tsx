import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Code2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Home',       href: '#home',        id: 'home'        },
  { label: 'Stack',      href: '#stack',        id: 'stack'       },
  { label: 'Projects',   href: '#projects',     id: 'projects'    },
  { label: 'Experience', href: '#experience',   id: 'experience'  },
  { label: 'Education',  href: '#education',    id: 'education'   },
  { label: 'Awards',     href: '#achievements', id: 'achievements'},
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

const Navbar = () => {
  const [scrolled,      setScrolled]      = useState(false);
  const [hidden,        setHidden]        = useState(false);
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const lastScrollY = useRef(0);

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

  /* ── Active section via IntersectionObserver ── */
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.25, rootMargin: '-72px 0px -40% 0px' }
    );
    NAV_LINKS.forEach(({ id }) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  /* ── Smooth hash scroll ── */
  const scrollTo = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const id  = href.replace('#', '');
    const el  = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: 'smooth' });
    window.history.replaceState(null, '', href);
  }, []);

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
          style={{ padding: '10px 20px' }}
        >
          <div className="flex items-center justify-between">

            {/* Logo */}
            <Link
              to="/"
              onClick={e => scrollTo(e as unknown as React.MouseEvent<HTMLAnchorElement>, '#home')}
              className="flex items-center gap-2.5 group select-none"
              aria-label="Umang Trivedi – Home"
            >
              <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-primary/10 border border-primary/25 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300">
                <Code2 className="w-4 h-4 text-primary" />
              </div>
              <span className="hidden xs:block font-display font-bold text-base text-white/90 group-hover:text-white transition-colors">
                umang<span className="text-primary">.</span>dev
              </span>
            </Link>

            {/* Desktop Links */}
            <nav className="hidden md:flex items-center" aria-label="Main navigation">
              <ul className="flex items-center gap-0.5">
                {NAV_LINKS.map(link => {
                  const active = activeSection === link.id;
                  return (
                    <li key={link.id}>
                      <a
                        href={link.href}
                        onClick={e => scrollTo(e, link.href)}
                        className="relative px-3.5 lg:px-4 py-2 flex items-center group"
                        aria-current={active ? 'page' : undefined}
                      >
                        {active && (
                          <motion.span
                            layoutId="nav-pill"
                            className="absolute inset-0 rounded-full bg-white/[0.07] border border-white/[0.09]"
                            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                          />
                        )}
                        <span className={cn(
                          'relative z-10 text-xs lg:text-[13px] font-medium tracking-wide transition-colors duration-200',
                          active ? 'text-white' : 'text-white/45 group-hover:text-white/80'
                        )}>
                          {link.label}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>

              <motion.a
                href="#contact"
                onClick={e => scrollTo(e, '#contact')}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="ml-4 px-5 py-2 rounded-full text-xs lg:text-sm font-bold text-white"
                style={{ background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 22px hsl(var(--primary)/0.55)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
              >
                Hire Me
              </motion.a>
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

      {/* ── Mobile Dropdown (rendered outside header to avoid z-index issues) ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            variants={mobileVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-[64px] left-4 right-4 z-40 glass-strong rounded-2xl border border-white/[0.09] overflow-hidden md:hidden"
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
                const active = activeSection === link.id;
                return (
                  <motion.li key={link.id} variants={itemVariants} role="none">
                    <a
                      href={link.href}
                      onClick={e => scrollTo(e, link.href)}
                      role="menuitem"
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                        active
                          ? 'text-primary bg-primary/10 border border-primary/20'
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
                <a
                  href="#contact"
                  onClick={e => scrollTo(e, '#contact')}
                  className="flex items-center justify-center py-3 rounded-xl text-sm font-bold text-white w-full"
                  style={{ background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))' }}
                >
                  Hire Me ✦
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
