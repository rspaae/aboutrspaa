'use client';

import { useEffect, useRef, ReactNode } from 'react';
import anime from 'animejs';

interface ScrollRevealProps {
    children: ReactNode;
    direction?: 'up' | 'down' | 'left' | 'right';
    delay?: number;
    duration?: number;
    className?: string;
    scale?: boolean;
}

export default function ScrollReveal({
    children,
    direction = 'up',
    delay = 0,
    duration = 1000,
    className = '',
    scale = true,
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const translateMap = {
            up: { translateY: [60, 0] },
            down: { translateY: [-60, 0] },
            left: { translateX: [80, 0] },
            right: { translateX: [-80, 0] },
        };

        // Set initial hidden state
        el.style.opacity = '0';
        el.style.transform = `translate${direction === 'left' || direction === 'right' ? 'X' : 'Y'}(${direction === 'up' || direction === 'left' ? '60px' : '-60px'
            }) ${scale ? 'scale(0.92)' : ''}`;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    anime({
                        targets: el,
                        ...translateMap[direction],
                        opacity: [0, 1],
                        ...(scale ? { scale: [0.92, 1] } : {}),
                        easing: 'easeOutCubic',
                        duration,
                        delay,
                    });
                }
            },
            { threshold: 0.15 }
        );

        observer.observe(el);

        return () => observer.disconnect();
    }, [direction, delay, duration, scale]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}
