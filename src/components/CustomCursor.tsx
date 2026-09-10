import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const [mounted, setMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isProjectHover, setIsProjectHover] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Outer ring follows with smooth spring
    const ringX = useSpring(mouseX, { stiffness: 320, damping: 26, mass: 0.4 });
    const ringY = useSpring(mouseY, { stiffness: 320, damping: 26, mass: 0.4 });

    useEffect(() => {
        setMounted(true);
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouch) {
            setIsTouchDevice(true);
            return;
        }

        const onMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            setIsVisible(true);
        };

        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target) return;
            const isClickable = target.closest('a, button, [role="button"], .cursor-pointer');
            const isInput = target.closest('input, textarea, select');
            const isProject = target.closest('[data-cursor="project"], .project-card, article');
            setIsHovering(!!isClickable && !isInput);
            setIsProjectHover(!!isProject);
        };

        const onMouseDown = () => setIsClicking(true);
        const onMouseUp = () => setIsClicking(false);

        const onMouseLeave = (e: MouseEvent) => {
            if (
                e.clientY <= 0 ||
                e.clientX <= 0 ||
                e.clientX >= window.innerWidth ||
                e.clientY >= window.innerHeight
            ) {
                setIsVisible(false);
            }
        };

        const onMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        window.addEventListener('mouseover', onMouseOver, { passive: true });
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);
        document.documentElement.addEventListener('mouseleave', onMouseLeave);
        document.documentElement.addEventListener('mouseenter', onMouseEnter);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseover', onMouseOver);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            document.documentElement.removeEventListener('mouseleave', onMouseLeave);
            document.documentElement.removeEventListener('mouseenter', onMouseEnter);
        };
    }, [mouseX, mouseY]);

    if (!mounted || isTouchDevice) return null;

    return createPortal(
        <div className="pointer-events-none select-none fixed inset-0 z-[9999999] overflow-hidden" aria-hidden="true">
            {/* Direct sharp central dot - zero lag tracking */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                    willChange: 'transform',
                }}
                animate={{
                    opacity: isVisible ? 1 : 0,
                    scale: isClicking ? 0.5 : isProjectHover ? 1.4 : 1,
                }}
                transition={{ duration: 0.08 }}
            >
                <div
                    className="w-[7px] h-[7px] rounded-full transition-colors duration-200"
                    style={{
                        background: isProjectHover ? 'hsl(var(--secondary))' : 'hsl(var(--primary))',
                        boxShadow: isProjectHover ? '0 0 12px hsl(var(--secondary))' : '0 0 8px hsl(var(--primary))',
                    }}
                />
            </motion.div>

            {/* Trailing Outer Ring with project hover highlight */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none"
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: '-50%',
                    translateY: '-50%',
                    willChange: 'transform',
                }}
                animate={{
                    opacity: isVisible ? 1 : 0,
                    scale: isClicking ? 0.8 : isProjectHover ? 2.3 : isHovering ? 1.7 : 1,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            >
                <div
                    className="w-[30px] h-[30px] rounded-full border transition-all duration-200"
                    style={{
                        borderColor: isProjectHover
                            ? 'hsl(var(--secondary))'
                            : isHovering
                            ? 'hsl(var(--primary))'
                            : 'rgba(255,255,255,0.35)',
                        background: isProjectHover
                            ? 'hsl(var(--secondary) / 0.14)'
                            : isHovering
                            ? 'hsl(var(--primary) / 0.08)'
                            : 'transparent',
                        boxShadow: isProjectHover
                            ? '0 0 24px hsl(var(--secondary) / 0.6), inset 0 0 10px hsl(var(--secondary) / 0.25)'
                            : isHovering
                            ? '0 0 15px hsl(var(--primary) / 0.35)'
                            : 'none',
                    }}
                />
            </motion.div>
        </div>,
        document.body
    );
};

export default CustomCursor;
