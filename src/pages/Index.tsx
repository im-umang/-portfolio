import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomCursor   from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';
import ParticleCanvas from '@/components/ParticleCanvas';
import Navbar         from '@/components/Navbar';
import Hero           from '@/components/Hero';
import TechStack      from '@/components/TechStack';
import Projects       from '@/components/Projects';
import Experience     from '@/components/Experience';
import Education      from '@/components/Education';
import Achievements   from '@/components/Achievements';
import Testimonials   from '@/components/Testimonials';
import Contact        from '@/components/Contact';
import Footer         from '@/components/Footer';

export type SectionView = 'all' | 'stack' | 'projects' | 'experience' | 'education' | 'achievements' | 'testimonials' | 'contact';

const VALID_VIEWS: SectionView[] = ['stack', 'projects', 'experience', 'education', 'achievements', 'testimonials', 'contact'];

const Index = () => {
  const getInitialView = (): SectionView => {
    if (typeof window === 'undefined') return 'all';
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (VALID_VIEWS.includes(hash as SectionView)) {
      return hash as SectionView;
    }
    return 'all';
  };

  const [activeView, setActiveView] = useState<SectionView>(getInitialView);

  const handleSelectSection = (id: string) => {
    const target: SectionView = (id === 'home' || id === 'all') ? 'all' : (id as SectionView);
    setActiveView(target);

    if (target === 'all') {
      window.history.replaceState(null, '', window.location.pathname);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.history.replaceState(null, '', `#${target}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  /* ── Hash change listener for browser navigation ── */
  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (VALID_VIEWS.includes(hash as SectionView)) {
        setActiveView(hash as SectionView);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setActiveView('all');
      }
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ── Global UI Layer (z-indexed above everything) ── */}
      <CustomCursor />
      <ScrollProgress />

      {/* ── Global Atmospheric Background Layers ── */}
      <div className="noise-bg" aria-hidden="true" />
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Cyber grid texture */}
        <div className="absolute inset-0 cyber-grid-bg opacity-75" />
        
        {/* Deep cosmic ambient orbs */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-[140px] opacity-25 bg-[radial-gradient(circle,hsl(var(--primary)),transparent_70%)]" />
        <div className="absolute top-1/3 -right-32 w-[650px] h-[650px] rounded-full blur-[160px] opacity-20 bg-[radial-gradient(circle,hsl(var(--secondary)),transparent_70%)]" />
        <div className="absolute bottom-20 left-1/4 w-[550px] h-[550px] rounded-full blur-[150px] opacity-15 bg-[radial-gradient(circle,hsl(var(--accent)),transparent_70%)]" />
      </div>
      <ParticleCanvas />

      {/* ── Navigation ── */}
      <Navbar
        activeSection={activeView === 'all' ? 'home' : activeView}
        onSelectSection={handleSelectSection}
      />

      {/* ── Main Content Area ── */}
      <main id="main-content">
        <AnimatePresence mode="wait">
          {activeView === 'all' ? (
            /* ═══ HOME VIEW: All Sections Rendered ═══ */
            <motion.div
              key="all-sections"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* 1 · Hero */}
              <Hero />

              <div className="section-divider" aria-hidden="true" />

              {/* 2 · Tech Stack */}
              <TechStack />

              <div className="section-divider" aria-hidden="true" />

              {/* 3 · Projects */}
              <Projects />

              <div className="section-divider" aria-hidden="true" />

              {/* 4 · Experience */}
              <Experience />

              <div className="section-divider" aria-hidden="true" />

              {/* 5 · Education */}
              <Education />

              <div className="section-divider" aria-hidden="true" />

              {/* 6 · Achievements */}
              <Achievements />

              <div className="section-divider" aria-hidden="true" />

              {/* 7 · Client & Peer Testimonials */}
              <Testimonials />

              <div className="section-divider" aria-hidden="true" />

              {/* 8 · Contact & Messaging Form */}
              <Contact />

              {/* Footer */}
              <Footer onSelectSection={handleSelectSection} />
            </motion.div>
          ) : (
            /* ═══ ISOLATED VIEW: Selected Section + Site Footer ═══ */
            <motion.div
              key={`isolated-${activeView}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="min-h-screen flex flex-col justify-between"
            >
              {/* Render Selected Component Only */}
              <div className="flex-1 pb-12">
                {activeView === 'stack' && <TechStack />}
                {activeView === 'projects' && <Projects />}
                {activeView === 'experience' && <Experience />}
                {activeView === 'education' && <Education />}
                {activeView === 'achievements' && <Achievements />}
                {activeView === 'testimonials' && <Testimonials />}
                {activeView === 'contact' && <Contact />}
              </div>

              {/* Footer is ALWAYS visible on every page / view */}
              <Footer onSelectSection={handleSelectSection} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Index;