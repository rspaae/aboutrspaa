'use client';

import { useEffect, useRef } from 'react';

export default function MouseSpotlight() {
    const spotlightRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === 'undefined' || window.innerWidth < 768) return;

        const el = spotlightRef.current;
        if (!el) return;

        const handleMouseMove = (e: MouseEvent) => {
            el.style.setProperty('--mx', `${e.clientX}px`);
            el.style.setProperty('--my', `${e.clientY}px`);
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div
            ref={spotlightRef}
            className="fixed inset-0 pointer-events-none z-[1] hidden md:block"
            style={{
                background: 'radial-gradient(600px circle at var(--mx, -500px) var(--my, -500px), rgba(0,245,255,0.03) 0%, rgba(139,92,246,0.015) 30%, transparent 70%)',
            }}
        />
    );
}
