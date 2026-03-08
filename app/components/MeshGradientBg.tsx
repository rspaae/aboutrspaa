'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs';

export default function MeshGradientBg() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const blobs = containerRef.current.querySelectorAll('.mesh-blob');

        blobs.forEach((blob, i) => {
            anime({
                targets: blob,
                translateX: () => anime.random(-120, 120),
                translateY: () => anime.random(-120, 120),
                scale: [{ value: () => anime.random(8, 12) / 10, duration: () => anime.random(4000, 8000) }],
                easing: 'easeInOutSine',
                duration: () => anime.random(6000, 12000),
                delay: i * 500,
                direction: 'alternate',
                loop: true,
            });
        });
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
            {/* Top-left cyan blob */}
            <div
                className="mesh-blob absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-20"
                style={{
                    background: 'radial-gradient(circle, rgba(0,245,255,0.4) 0%, transparent 70%)',
                    filter: 'blur(50px)',
                }}
            />
            {/* Bottom-right magenta blob */}
            <div
                className="mesh-blob absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full opacity-15"
                style={{
                    background: 'radial-gradient(circle, rgba(255,0,229,0.4) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                }}
            />
            {/* Center violet blob */}
            <div
                className="mesh-blob absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-10"
                style={{
                    background: 'radial-gradient(circle, rgba(139,92,246,0.5) 0%, transparent 70%)',
                    filter: 'blur(50px)',
                }}
            />
            {/* Top-right blue blob */}
            <div
                className="mesh-blob absolute -top-20 right-1/4 w-[350px] h-[350px] rounded-full opacity-15"
                style={{
                    background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)',
                    filter: 'blur(45px)',
                }}
            />
            {/* Bottom-left green-teal blob */}
            <div
                className="mesh-blob absolute bottom-1/4 -left-20 w-[300px] h-[300px] rounded-full opacity-10"
                style={{
                    background: 'radial-gradient(circle, rgba(16,185,129,0.35) 0%, transparent 70%)',
                    filter: 'blur(50px)',
                }}
            />
        </div>
    );
}
