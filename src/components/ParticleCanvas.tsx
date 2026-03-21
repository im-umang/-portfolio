import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
  alpha: number;
  life: number;
  maxLife: number;
}

const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ x: -9999, y: -9999 });
  const animRef   = useRef<number>(0);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isMobile  = window.innerWidth < 768;
    const isTablet  = window.innerWidth < 1024;
    const COUNT     = isMobile ? 24 : isTablet ? 48 : 72;
    const MAX_DIST  = isMobile ? 100 : 140;
    const REPEL     = 90;

    let W = canvas.width  = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Particles array
    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 1.6 + 0.6,
      alpha: Math.random() * 0.4 + 0.1,
      life: Math.random() * 200,
      maxLife: 200 + Math.random() * 200,
    }));

    // Primary color from CSS
    const root  = getComputedStyle(document.documentElement);
    const hPri  = root.getPropertyValue('--primary').trim() || '226 100% 62%';
    const hSec  = root.getPropertyValue('--secondary').trim() || '192 100% 48%';

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse repulsion
        const dx   = p.x - mx;
        const dy   = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL && dist > 0) {
          const force = (REPEL - dist) / REPEL * 0.6;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Speed limit
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 1.2) { p.vx *= 0.9; p.vy *= 0.9; }

        // Friction
        p.vx *= 0.98;
        p.vy *= 0.98;

        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0) { p.x = 0; p.vx *= -1; }
        if (p.x > W) { p.x = W; p.vx *= -1; }
        if (p.y < 0) { p.y = 0; p.vy *= -1; }
        if (p.y > H) { p.y = H; p.vy *= -1; }

        // Life cycle
        p.life += 0.4;
        if (p.life > p.maxLife) {
          p.x = Math.random() * W;
          p.y = Math.random() * H;
          p.life = 0;
        }

        // Fade in/out
        const progress = p.life / p.maxLife;
        const alpha    = Math.sin(progress * Math.PI) * 0.35 * p.alpha;

        // Alternate between primary/secondary colors
        const color = i % 3 === 0 ? `hsl(${hSec})` : `hsl(${hPri})`;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = alpha;
        ctx.fill();

        // Connection lines
        if (!isMobile) {
          for (let j = i + 1; j < particles.length; j++) {
            const q    = particles[j];
            const dx2  = p.x - q.x;
            const dy2  = p.y - q.y;
            const d2   = Math.sqrt(dx2 * dx2 + dy2 * dy2);
            if (d2 < MAX_DIST) {
              const lineAlpha = (1 - d2 / MAX_DIST) * 0.06;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(q.x, q.y);
              ctx.strokeStyle = `hsl(${hPri})`;
              ctx.globalAlpha = lineAlpha;
              ctx.lineWidth   = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    // Resize handler
    const onResize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    // Skip on touch devices to save battery
    const isTouch = 'ontouchstart' in window;
    if (isTouch) return;

    const cleanup = initCanvas();

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      cleanup?.();
    };
  }, [initCanvas]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};

export default ParticleCanvas;
