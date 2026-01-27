import { ReactLenis } from '@studio-freight/react-lenis';

interface SmoothScrollProps {
    children: React.ReactNode;
}

const SmoothScroll = ({ children }: SmoothScrollProps) => {
    return (
        <ReactLenis 
            root 
            options={{ 
                lerp: 0.12, 
                duration: 1.2, 
                smoothWheel: true,
                syncTouch: false // Use native high-performance scroll on mobile
            }}
        >
            {children}
        </ReactLenis>
    );
};

export default SmoothScroll;
