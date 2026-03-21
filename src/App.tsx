import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeProvider } from "next-themes";
import SmoothScroll from "@/components/SmoothScroll";

const Index    = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5 * 60 * 1000 } },
});

/* ── Premium Loading Screen ── */
const LoadingScreen = ({ onDone }: { onDone: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [phase,    setPhase]    = useState<'loading' | 'done'>('loading');

  useEffect(() => {
    let p = 0;
    const step = () => {
      p += Math.random() * 14 + 4;
      if (p >= 100) {
        setProgress(100);
        setPhase('done');
        setTimeout(onDone, 500);
      } else {
        setProgress(Math.min(p, 99));
        setTimeout(step, 60 + Math.random() * 60);
      }
    };
    step();
  }, []);

  return (
    <motion.div
      key="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.97, filter: 'blur(4px)' }}
      transition={{ duration: 0.55, ease: 'easeInOut' }}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
      style={{ background: 'hsl(var(--background))' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 60%, hsl(var(--primary)/0.12) 0%, transparent 65%)' }}
      />

      <div className="relative flex flex-col items-center gap-8">
        {/* Logo mark */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'backOut' }}
          className="relative"
        >
          <div
            className="w-20 h-20 rounded-[22px] flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--primary)/0.12), hsl(var(--secondary)/0.08))',
              border: '1px solid hsl(var(--primary)/0.25)',
              boxShadow: '0 0 40px hsl(var(--primary)/0.2)',
            }}
          >
            <span className="font-display font-black text-3xl text-gradient-blue">U</span>
          </div>

          {/* Spinning ring */}
          <svg
            className="absolute inset-[-8px] animate-spin-slow opacity-60"
            viewBox="0 0 96 96"
            fill="none"
          >
            <circle cx="48" cy="48" r="44"
              stroke="url(#spin-g)" strokeWidth="1.5"
              strokeLinecap="round" strokeDasharray="50 230"
            />
            <defs>
              <linearGradient id="spin-g" x1="0" y1="0" x2="96" y2="96">
                <stop stopColor="hsl(226,100%,62%)" />
                <stop offset="1" stopColor="hsl(192,100%,48%)" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.45 }}
          className="text-center"
        >
          <p className="font-display font-black text-2xl text-white tracking-tight">
            Umang<span className="text-gradient-blue">Trivedi</span>
          </p>
          <p className="text-[11px] font-mono text-white/35 tracking-[0.18em] uppercase mt-1">
            Full-Stack Developer
          </p>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: '220px' }}
          transition={{ delay: 0.3 }}
          className="relative"
        >
          <div className="h-[2px] w-[220px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)))',
                boxShadow: '0 0 8px hsl(var(--primary)/0.8)',
                transition: 'width 0.12s ease-out',
              }}
            />
          </div>
          <p className="text-center mt-2 text-[10px] font-mono text-white/25">
            {Math.round(progress)}%
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

const App = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
        <TooltipProvider>
          <SmoothScroll>
            <AnimatePresence mode="wait">
              {!loaded && <LoadingScreen key="loader" onDone={() => setLoaded(true)} />}
            </AnimatePresence>

            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Suspense fallback={null}>
                <Routes>
                  <Route path="/"  element={<Index />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </SmoothScroll>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
