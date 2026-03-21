/**
 * SmoothScroll — Lenis disabled.
 * Native browser scroll is significantly more performant
 * when combined with Framer Motion and Canvas animations.
 * CSS scroll-behavior: smooth handles anchor links.
 */
const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>;
};

export default SmoothScroll;
