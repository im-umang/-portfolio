import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Dot follows cursor exactly
    const dotX = useSpring(mouseX, { stiffness: 600, damping: 35, mass: 0.3 });
    const dotY = useSpring(mouseY, { stiffness: 600, damping: 35, mass: 0.3 });

    // Ring follows with slight lag
    const ringX = useSpring(mouseX, { stiffness: 180, damping: 25, mass: 0.5 });
    const ringY = useSpring(mouseY, { stiffness: 180, damping: 25, mass: 0.5 });

    useEffect(() => {
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouch) { setIsTouchDevice(true); return; }

        const move = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const over = (e: MouseEvent) => {
            const el = (e.target as HTMLElement).closest('a, button, [role="button"], .cursor-pointer');
            setIsHovering(!!el);
        };

        window.addEventListener('mousemove', move, { passive: true });
        window.addEventListener('mouseover', over, { passive: true });
        window.addEventListener('mousedown', () => setIsClicking(true));
        window.addEventListener('mouseup', () => setIsClicking(false));
        document.documentElement.addEventListener('mouseleave', () => setIsVisible(false));
        document.documentElement.addEventListener('mouseenter', () => setIsVisible(true));

        return () => {
            window.removeEventListener('mousemove', move);
            window.removeEventListener('mouseover', over);
        };
    }, []);

    if (isTouchDevice) return null;

    return (
        <>
            {/* Small dot — sharp, precise */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999]"
                style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
                animate={{
                    opacity: isVisible ? 1 : 0,
                    scale: isClicking ? 0.5 : 1,
                }}
                transition={{ duration: 0.08 }}
            >
                <div
                    className="w-[7px] h-[7px] rounded-full"
                    style={{ background: 'hsl(var(--primary))' }}
                />
            </motion.div>

            {/* Outer ring — trails behind */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9998]"
                style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
                animate={{
                    opacity: isVisible ? 1 : 0,
                    scale: isHovering ? 1.8 : isClicking ? 0.8 : 1,
                    borderColor: isHovering
                        ? 'hsl(var(--primary))'
                        : 'rgba(255,255,255,0.3)',
                }}
                transition={{ type: 'spring', stiffness: 250, damping: 22 }}
            >
                <div
                    className="w-[28px] h-[28px] rounded-full border border-white/30"
                    style={{
                        borderColor: isHovering ? 'hsl(var(--primary))' : undefined,
                        background: isHovering ? 'hsl(var(--primary) / 0.06)' : 'transparent',
                    }}
                />
            </motion.div>
        </>
    );
};

export default CustomCursor;
