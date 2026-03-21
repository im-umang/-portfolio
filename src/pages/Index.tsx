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
import Footer         from '@/components/Footer';

const Index = () => (
  <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
    {/* ── Global UI Layer (z-indexed above everything) ── */}
    <CustomCursor />
    <ScrollProgress />

    {/* ── Background layers ── */}
    <div className="noise-bg" aria-hidden="true" />
    <ParticleCanvas />

    {/* ── Navigation ── */}
    <Navbar />

    {/* ── Page Sections (in correct order matching nav) ── */}
    <main id="main-content">
      {/* 1 · Hero — id="home" is set inside the Hero component */}
      <Hero />

      {/* Section divider */}
      <div className="section-divider" aria-hidden="true" />

      {/* 2 · Tech Stack — id="stack" */}
      <TechStack />

      <div className="section-divider" aria-hidden="true" />

      {/* 3 · Projects — id="projects" */}
      <Projects />

      <div className="section-divider" aria-hidden="true" />

      {/* 4 · Experience — id="experience" */}
      <Experience />

      <div className="section-divider" aria-hidden="true" />

      {/* 5 · Education — id="education" */}
      <Education />

      <div className="section-divider" aria-hidden="true" />

      {/* 6 · Achievements — id="achievements" */}
      <Achievements />

    </main>

    {/* ── Footer / Contact — id="contact" is set inside Footer ── */}
    <Footer />
  </div>
);

export default Index;