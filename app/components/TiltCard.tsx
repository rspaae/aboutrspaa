'use client';

import { useRef, ReactNode, useCallback } from 'react';

interface TiltCardProps {
    children: ReactNode;
    className?: string;
    maxTilt?: number;
    glareOpacity?: number;
}

export default function TiltCard({
    children,
    className = '',
    maxTilt = 15,
    glareOpacity = 0.15,
}: TiltCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const glareRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent) => {
            const el = cardRef.current;
            const glare = glareRef.current;
            if (!el) return;

            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -maxTilt;
            const rotateY = ((x - centerX) / centerX) * maxTilt;

            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;

            // Move glare
            if (glare) {
                const glareX = (x / rect.width) * 100;
                const glareY = (y / rect.height) * 100;
                glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,${glareOpacity}) 0%, transparent 60%)`;
                glare.style.opacity = '1';
            }
        },
        [maxTilt, glareOpacity]
    );

    const handleMouseLeave = useCallback(() => {
        const el = cardRef.current;
        const glare = glareRef.current;
        if (el) {
            el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        }
        if (glare) {
            glare.style.opacity = '0';
        }
    }, []);

    return (
        <div
            ref={cardRef}
            className={`relative overflow-hidden ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transition: 'transform 0.2s ease-out',
                transformStyle: 'preserve-3d',
                willChange: 'transform',
            }}
        >
            {children}
            {/* Glare overlay */}
            <div
                ref={glareRef}
                className="absolute inset-0 pointer-events-none rounded-[inherit] z-50"
                style={{
                    opacity: 0,
                    transition: 'opacity 0.3s ease-out',
                    mixBlendMode: 'overlay',
                }}
            />
        </div>
    );
}
