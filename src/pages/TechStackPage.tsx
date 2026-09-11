import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';
import ParticleCanvas from '@/components/ParticleCanvas';
import TechStack from '@/components/TechStack';
import SEO from '@/components/SEO';

const TechStackPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden flex flex-col justify-between">
      <SEO
        title="Technical Arsenal & Tech Stack"
        description="Comprehensive tech stack, tools, frameworks, and datastores utilized by Umang Trivedi: React, TypeScript, Next.js, Node.js, Express, MongoDB, MySQL, Python, and cloud tools."
        canonical="/stack"
      />

      <CustomCursor />
      <ScrollProgress />

      {/* Atmospheric Background Layers */}
      <div className="noise-bg" aria-hidden="true" />
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 cyber-grid-bg opacity-75" />
        <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] rounded-full blur-[140px] opacity-20 bg-[radial-gradient(circle,hsl(var(--secondary)),transparent_70%)]" />
        <div className="absolute top-1/3 -right-32 w-[650px] h-[650px] rounded-full blur-[160px] opacity-25 bg-[radial-gradient(circle,hsl(var(--primary)),transparent_70%)]" />
        <div className="absolute bottom-20 left-1/3 w-[550px] h-[550px] rounded-full blur-[150px] opacity-15 bg-[radial-gradient(circle,hsl(var(--accent)),transparent_70%)]" />
      </div>
      <ParticleCanvas />

      <Navbar activeSection="stack" />

      <main className="relative z-10 flex-1 pt-12">
        <TechStack />
      </main>

      <Footer />
    </div>
  );
};

export default TechStackPage;
